import 'server-only'

import { z } from 'zod'

import { ERROR_CODES, PostgresError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/utils'
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/lib/validations/project'

export const createProject = async (
  values: z.infer<typeof createProjectSchema>
) => {
  const supabase = createRouteHandlerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new PostgresError('Unauthenticated', {
      details: error?.message,
      code: ERROR_CODES.UNAUTHENTICATED,
    })
  }

  const slug = slugify(values.name)
  const { file, ...rest } = values

  const { data, error: insertError } = await supabase
    .from('projects')
    .insert({
      slug,
      created_by: user.id,
      ...rest,
    })
    .select('id')
    .single()

  if (insertError) {
    // console.error({ insertError })
    if (insertError.code === '23505') {
      // duplicate key (name)
      throw new PostgresError('Duplicate Name.', {
        code: ERROR_CODES.DUPLICATE_NAME,
      })
    }
    throw new PostgresError('Error saving the data in the database.', {
      details: insertError.message,
    })
  }

  if (file) {
    const bucketPath = data.id
    const { error: storageError } = await supabase.storage
      .from('icons')
      .upload(bucketPath, file)

    if (storageError) {
      throw new PostgresError('Error saving image.', {
        details: storageError.message,
      })
    }

    const { data: fileUrl } = supabase.storage
      .from('icons')
      .getPublicUrl(bucketPath)

    const icon_url = fileUrl.publicUrl

    await supabase
      .from('projects')
      .update({
        icon_url,
      })
      .eq('id', data.id)

    return { ...data, icon_url }
  }

  return { data }
}

export const updateProject = async (
  id: string,
  values: z.infer<typeof updateProjectSchema>
) => {
  const supabase = createRouteHandlerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new PostgresError('Unauthenticated', {
      details: error?.message,
      code: ERROR_CODES.UNAUTHENTICATED,
    })
  }

  const { file, ...rest } = values
  let valuesToUpdate = Object.assign(rest)

  if (file) {
    const bucketPath = id

    const { error: storageError } = await supabase.storage
      .from('icons')
      .update(bucketPath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (storageError) {
      console.error({ storageError })
      throw new PostgresError('Error saving the data in the database.', {
        details: storageError.message,
      })
    }

    const { data: fileUrl } = supabase.storage
      .from('icons')
      .getPublicUrl(bucketPath)

    // Add timestamp to url to force updates in cache
    valuesToUpdate.icon_url = fileUrl.publicUrl + `?t=${Date.now()}`
  }

  const { error: updateError } = await supabase
    .from('projects')
    .update({
      ...valuesToUpdate,
      updated_at: new Date().toLocaleString(),
    })
    .eq('id', id)

  if (updateError) {
    throw new PostgresError('Error saving the data in the database.', {
      details: updateError.message,
    })
  }

  return { data: { success: true } }
}

export const removeProject = async (id: string) => {
  const supabase = createRouteHandlerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new PostgresError('Unauthenticated', {
      details: error?.message,
      code: ERROR_CODES.UNAUTHENTICATED,
    })
  }

  const { data: projectName, error: projectNameError } = await supabase
    .from('projects')
    .select('name, slug')
    .eq('id', id)
    .single()

  if (projectNameError) {
    throw new PostgresError('Error retrieving the project.', {
      details: projectNameError.message,
    })
  }

  const timestamp = new Date().getTime().toString()
  const { error: deleteError } = await supabase
    .from('projects')
    .update({
      public: false,
      archive: true,
      name: projectName.name + '-' + timestamp,
      slug: projectName.slug + '-' + timestamp,
      updated_at: new Date().toLocaleString(),
    })
    .eq('id', id)

  if (deleteError) {
    throw new PostgresError('Error deleting the project.', {
      details: deleteError.message,
    })
  }

  return { data: { success: true } }
}

export const updateProjectViews = async (id: string) => {
  const supabase = createRouteHandlerClient()
  await supabase.rpc('update_or_insert_project_view', {
    p_id: id,
  })
}

export const addLike = async (project_id: string) => {
  const supabase = createRouteHandlerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new PostgresError('You must log in.', {
      details: error?.message,
      code: ERROR_CODES.UNAUTHENTICATED,
    })
  }

  const { error: insertError } = await supabase.from('project_likes').insert({
    user_id: user.id,
    project_id,
  })

  if (insertError) {
    throw new PostgresError('Error updating likes.', {
      details: insertError.message,
    })
  }

  return { data: { success: true } }
}

export const removeLike = async (project_id: string) => {
  const supabase = createRouteHandlerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new PostgresError('You must log in.', {
      details: error?.message,
      code: ERROR_CODES.UNAUTHENTICATED,
    })
  }

  const { error: deleteError } = await supabase
    .from('project_likes')
    .delete()
    .match({ project_id, user_id: user.id })

  if (deleteError) {
    throw new PostgresError('Error updating likes.', {
      details: deleteError.message,
    })
  }

  return { data: { success: true } }
}
