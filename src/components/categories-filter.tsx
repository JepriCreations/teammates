'use client'

import { useSearchParams } from 'next/navigation'
import { CATEGORIES, CATEGORIES_ICONS } from '@/constants/projects'
import { PARAMS_KEYS } from '@/constants/routes'

import { fontEmoji } from '@/lib/fonts'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const CategoriesFilter = () => {
  const { t } = useDictionary('Categories')
  const setSearchParams = useSetSearchParams()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get(PARAMS_KEYS.CATEGORY)

  const categoriesItems = CATEGORIES(t).map((category) => ({
    ...category,
    icon: CATEGORIES_ICONS[category.value as keyof typeof CATEGORIES_ICONS],
  }))

  const handleChange = (value: string) => {
    setSearchParams({ name: PARAMS_KEYS.CATEGORY, value })
  }

  return (
    <div className="relative w-full overflow-hidden">
      <span className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent to-[16px]" />
      <div className="scrollbar-hidden flex w-full flex-nowrap items-center gap-3 overflow-x-auto px-3">
        {categoriesItems.map(({ value, label, icon }) => (
          <CategoryItem
            key={value}
            checked={categoryParam === value}
            label={label}
            icon={icon}
            onClick={() => handleChange(value)}
          />
        ))}
      </div>
      <span className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent to-[16px]" />
    </div>
  )
}

export const CategoryItem = ({
  label,
  icon,
  checked,
  onClick,
}: {
  label: string
  icon: string
  checked?: boolean
  onClick: () => void
}) => {
  return (
    <button
      data-state={checked ? 'checked' : 'unchecked'}
      className="group flex h-[124px] w-28 shrink-0 flex-col items-center justify-between rounded-sm border border-transparent px-2 py-4 outline-none transition-all hover:bg-onSurface/5 focus:bg-onSurface/5 active:scale-95 data-[state=unchecked]:border-outline data-[state=checked]:bg-secondaryContainer"
      onClick={onClick}
    >
      <span
        className={`${fontEmoji.className} text-4xl drop-shadow-xl transition-all group-data-[state=checked]:drop-shadow-sm`}
      >
        {icon}
      </span>
      <p className="balance text-label-md text-onSurface group-data-[state=checked]:text-onSecondaryContainer">
        {label}
      </p>
    </button>
  )
}
