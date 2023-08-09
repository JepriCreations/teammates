'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { BellExclamationIcon, GithubIcon, HomeIcon } from '@/components/icons'
import { LinkCard } from '@/components/link-card'

export default function ComponentPage() {
  const [mounted, setMounted] = useState(false)
  const form = useForm({ defaultValues: { username: '', email: '' } })

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    } else {
      form.setError('username', { message: 'This field is required.' })
    }
  }, [mounted])

  return (
    <main className="mb-36 space-y-4 p-10">
      <h2>Typography</h2>
      <section className="mb-6 space-y-1">
        <h1>H1 tag</h1>
        <h2>H2 tag</h2>
        <p>Foreground</p>
        <p className="text-outline">Muted</p>
        <div className="muted-bg block w-fit px-4 py-2">
          <p className="text-outline">Muted foreground</p>
        </div>
      </section>
      <h2>Buttons</h2>
      <section className="mb-6">
        <div className="mb-4 flex items-start gap-3">
          <Button>Primary button</Button>
          <Button variant="ghost">Ghost button</Button>
          <Button variant="outline">Outline button</Button>
          <Button variant="destructive">Destructive button</Button>
          <Button icon={<HomeIcon />} size="icon" />
          <Button variant="secondary">Secondary button</Button>
          <Button variant="accent">Accent button</Button>
        </div>
        <div className="mb-4 flex gap-3">
          <Button disabled>Primary button</Button>
          <Button disabled variant="ghost">
            Ghost button
          </Button>
          <Button disabled variant="outline">
            Outline button
          </Button>
          <Button disabled variant="destructive">
            Destructive button
          </Button>
          <Button disabled icon={<HomeIcon />} size="icon" />
          <Button disabled variant="secondary">
            Secondary button
          </Button>
          <Button disabled variant="accent">
            Accent button
          </Button>
        </div>
        <div className="flex items-start gap-3">
          <Button size="sm">Small button</Button>
          <Button size="lg">Large button</Button>
        </div>
      </section>
      <h2>Switch</h2>
      <section className="mb-6 flex gap-3">
        <Switch />
        <Switch disabled />
        <Switch checked disabled />
      </section>
      <h2>CheckBox</h2>
      <section className="mb-6 flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" disabled />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" disabled checked />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </section>
      <h2>Radio</h2>
      <section className="mb-6 flex flex-col gap-3">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </section>
      <h2>Input</h2>
      <section className="mb-6 flex max-w-sm flex-col gap-3">
        <Input type="email" placeholder="Email" />
        <Input disabled type="email" placeholder="Email" />
        <Textarea placeholder="Content" />
        <Input
          leftSection={<GithubIcon className="text-outline" />}
          placeholder="Github username"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your user name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </section>
      <h2>Cards</h2>
      <section className="mb-6 flex items-start gap-3">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    variant="card"
                    id="name"
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger
                      id="framework"
                      className="ring-offset-surfaceContainerHighest"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost">Cancel</Button>
            <Button variant="accent">Deploy</Button>
          </CardFooter>
        </Card>

        {/* Link Card */}
        <LinkCard href="/#">
          <div className="w-[350px] p-6">I am a link card</div>
        </LinkCard>

        {/* Skeleton Card */}
        <Card className="w-[350px]">
          <CardHeader>
            <Skeleton className="h-6 w-[30%]" />
            <Skeleton className="h-4 w-[70%]" />
          </CardHeader>
        </Card>
      </section>
      <h2>Alerts</h2>
      <section className="mb-6 flex max-w-lg flex-col gap-3">
        {/* Default */}
        <Alert>
          <BellExclamationIcon className="h-6 w-6" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        {/* Success */}
        <Alert variant="success">
          <BellExclamationIcon className="h-6 w-6" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        {/* Info */}
        <Alert variant="info">
          <BellExclamationIcon className="h-6 w-6" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        {/* Warning */}
        <Alert variant="warning">
          <BellExclamationIcon className="h-6 w-6" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        {/* Error */}
        <Alert variant="error">
          <BellExclamationIcon className="h-6 w-6" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        {/* Destructive */}
        <Alert variant="destructive">
          <BellExclamationIcon className="h-6 w-6" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </section>
    </main>
  )
}
