'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Alert } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Chip } from '@/components/ui/chip'
import { Dropzone, IMAGE_MIME_TYPE } from '@/components/ui/drop-zone'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { IconButton } from '@/components/ui/icon-button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SearchBar } from '@/components/ui/search-bar'
import { FilledSelect, OutlinedSelect } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { FilledTextField, OutlinedTextField } from '@/components/ui/text-field'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/combobox'
import { Icons } from '@/components/icons'
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
    <main className="p-10">
      <h2 className="mb-4">Typography</h2>
      <section className="mb-20 space-y-1">
        <h1>H1 tag</h1>
        <h2>H2 tag</h2>
        <p>Foreground</p>
        <p className="text-outline">Muted</p>
        <div className="muted-bg block w-fit px-4 py-2">
          <p className="text-outline">Muted foreground</p>
        </div>
      </section>
      <h2 className="mb-4">Buttons</h2>
      <section className="mb-20">
        <div className="mb-4 flex flex-wrap items-start gap-3">
          <Button variant="brutalist">Brutalist button</Button>

          <Button variant="filled">Filled button</Button>
          <Button variant="elevated">Elevated button</Button>
          <Button variant="outlined">Outlined button</Button>
          <Button variant="text">Text button</Button>
          <Button variant="tonal">Tonal button</Button>
        </div>
        <div className="mb-4 flex flex-wrap gap-3">
          <Button variant="brutalist" disabled>
            Brutalist button
          </Button>

          <Button variant="filled" disabled>
            Filled button
          </Button>
          <Button variant="elevated" disabled>
            Elevated button
          </Button>
          <Button variant="outlined" disabled>
            Outlined button
          </Button>
          <Button variant="text" disabled>
            Text button
          </Button>
          <Button variant="tonal" disabled>
            Tonal button
          </Button>
        </div>
        <div className="mb-4 flex flex-wrap items-start gap-3">
          <IconButton asChild>
            <a href="#">
              <Icons.home />
            </a>
          </IconButton>
          <IconButton variant="outlined">
            <Icons.home />
          </IconButton>
          <IconButton variant="standard">
            <Icons.home />
          </IconButton>
          <IconButton variant="tonal">
            <Icons.home />
          </IconButton>
        </div>
      </section>
      <h2 className="mb-4">Chips</h2>
      <section className="mb-20 flex flex-wrap gap-3">
        <Chip>
          <Chip.Label>Assist chip</Chip.Label>
        </Chip>
        <Chip>
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
        </Chip>
        <Chip>
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
          <Chip.Button>
            <Icons.close size={18} />
          </Chip.Button>
        </Chip>
        <Chip
          onClick={() => {
            console.log('Clicked')
          }}
        >
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
        </Chip>
        <Chip
          disabled
          onClick={() => {
            console.log('Clicked')
          }}
        >
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
        </Chip>
        <Chip disabled>
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Disabled chip</Chip.Label>
        </Chip>
        <Chip selected>
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
        </Chip>
        <Chip selected disabled>
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
        </Chip>
        <Chip disabled selected>
          <Chip.Icon>
            <Icons.check size="100%" />
          </Chip.Icon>
          <Chip.Label>Assist chip</Chip.Label>
          <Chip.Button>
            <Icons.close size={18} />
          </Chip.Button>
        </Chip>
      </section>

      <h2 className="mb-4">Dropdown</h2>
      <section className="mb-20 flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="outlined">Open</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-56" align="start">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Divider />
            <DropdownMenu.Group>
              <DropdownMenu.MenuItem>
                <Icons.credit className="mr-4 h-5 w-5" />
                <span>Profile</span>
                <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem>
                <Icons.archive className="mr-4 h-5 w-5" />
                <span>Billing</span>
                <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem>
                <Icons.menu className="mr-4 h-5 w-5" />
                <span>Settings</span>
                <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem>
                <Icons.systemMode className="mr-4 h-5 w-5" />
                <span>Keyboard shortcuts</span>
                <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
              </DropdownMenu.MenuItem>
            </DropdownMenu.Group>
            <DropdownMenu.Divider />
            <DropdownMenu.Group>
              <DropdownMenu.MenuItem>
                <Icons.archive className="mr-4 h-5 w-5" />
                <span>Team</span>
                <DropdownMenu.CheckBoxItem checked />
              </DropdownMenu.MenuItem>
              <DropdownMenu.SubMenu>
                <DropdownMenu.SubTrigger>
                  <Icons.home className="mr-4 h-5 w-5" />
                  <span>Invite users</span>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.MenuItem>
                      <Icons.email className="mr-4 h-5 w-5" />
                      <span>Email</span>
                    </DropdownMenu.MenuItem>
                    <DropdownMenu.MenuItem>
                      <Icons.add className="mr-4 h-5 w-5" />
                      <span>Message</span>
                    </DropdownMenu.MenuItem>
                    <DropdownMenu.Divider />
                    <DropdownMenu.MenuItem>
                      <Icons.add className="mr-4 h-5 w-5" />
                      <span>More...</span>
                    </DropdownMenu.MenuItem>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.SubMenu>
              <DropdownMenu.MenuItem>
                <Icons.contract className="mr-4 h-5 w-5" />
                <span>New Team</span>
                <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
              </DropdownMenu.MenuItem>
            </DropdownMenu.Group>
            <DropdownMenu.Divider />
            <DropdownMenu.MenuItem>
              <Icons.github className="mr-4 h-5 w-5" />
              <span>GitHub</span>
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuItem>
              <Icons.hits className="mr-4 h-5 w-5" />
              <span>Support</span>
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuItem disabled>
              <Icons.apple className="mr-4 h-5 w-5" />
              <span>API</span>
            </DropdownMenu.MenuItem>
            <DropdownMenu.Divider />
            <DropdownMenu.Label>Radiogroup</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value="pedro">
              <DropdownMenu.RadioItem value="pedro">
                Pedro Duarte
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="colm">
                Colm Tuite
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Divider />

            <DropdownMenu.MenuItem>
              <Icons.logout className="mr-4 h-5 w-5" />
              <span>Log out</span>
              <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
            </DropdownMenu.MenuItem>
          </DropdownMenu.Content>
        </DropdownMenu>
      </section>

      <h2 className="mb-4">Switch</h2>
      <section className="mb-20 flex flex-wrap gap-3">
        <Switch />
        <Switch disabled />
        <Switch checked disabled />
        <Switch withIcons />
        <Switch disabled withIcons />
        <Switch checked disabled withIcons />
        <Switch widthIconOnSelected />
      </section>
      <h2 className="mb-4">CheckBox</h2>
      <section className="mb-20 flex flex-col gap-3">
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
      <h2 className="mb-4">Radio</h2>
      <section className="mb-20 flex flex-col gap-3">
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
      <h2 className="mb-4">Input</h2>
      <section className="mb-20 max-w-sm space-y-3">
        <p className="text-title-lg">Search bar</p>
        <SearchBar>
          <SearchBar.LeftSection>
            <IconButton variant="standard" className="-ml-2">
              <Icons.menu />
            </IconButton>
          </SearchBar.LeftSection>
          <SearchBar.Input placeholder="Hinted search text" />
          <SearchBar.RightSection>
            <IconButton variant="standard" className="-mr-2">
              <Avatar className="h-8">
                <Avatar.Image src="https://github.com/jepricreations.png" />
                <Avatar.Fallback>JC</Avatar.Fallback>
              </Avatar>
            </IconButton>
          </SearchBar.RightSection>
        </SearchBar>
        <SearchBar>
          <SearchBar.LeftSection>
            <IconButton variant="standard" className="-ml-2">
              <Icons.menu />
            </IconButton>
          </SearchBar.LeftSection>
          <SearchBar.Input placeholder="Hinted search text" />
          <SearchBar.RightSection>
            <Icons.search />
          </SearchBar.RightSection>
        </SearchBar>
        <SearchBar>
          <SearchBar.LeftSection>
            <IconButton variant="standard" className="-ml-2">
              <Icons.menu />
            </IconButton>
          </SearchBar.LeftSection>
          <SearchBar.Input placeholder="Hinted search text" />
          <SearchBar.RightSection>
            <Icons.search />
            <IconButton variant="standard" className="-mr-2">
              <Avatar className="h-8">
                <Avatar.Image src="https://github.com/jepricreations.png" />
                <Avatar.Fallback>JC</Avatar.Fallback>
              </Avatar>
            </IconButton>
          </SearchBar.RightSection>
        </SearchBar>
        <SearchBar>
          <SearchBar.LeftSection>
            <Icons.search />
          </SearchBar.LeftSection>
          <SearchBar.Input placeholder="Hinted search text" />
        </SearchBar>
      </section>
      <section className="mb-20 flex max-w-3xl flex-col gap-3">
        <div className="grid grid-cols-2 gap-6">
          {/* Filled examples */}
          <div className="mb-12 space-y-4">
            <p className="text-title-lg">Filled</p>
            <FilledTextField>
              <FilledTextField.Input type="email" placeholder="Your email" />
              <FilledTextField.Label>Email</FilledTextField.Label>
            </FilledTextField>
            <FilledTextField>
              <FilledTextField.Input
                disabled
                type="email"
                placeholder="Your email"
              />
              <FilledTextField.Label>Disabled Email</FilledTextField.Label>
            </FilledTextField>
            <FilledTextField error>
              <FilledTextField.Input type="email" placeholder="Your email" />
              <FilledTextField.Label>Error Email</FilledTextField.Label>
            </FilledTextField>
            <FilledTextField>
              <FilledTextField.Input
                disabled
                value="your_email@mail.com"
                type="email"
                placeholder="Your email"
                readOnly
              />
              <FilledTextField.Label>Email</FilledTextField.Label>
            </FilledTextField>
            <FilledTextField>
              <FilledTextField.Input
                type="email"
                placeholder="Email with no label"
              />
            </FilledTextField>
            <FilledTextField>
              <FilledTextField.Decoration>
                <Icon symbol="email" />
              </FilledTextField.Decoration>
              <FilledTextField.Input type="email" placeholder="Your email" />
              <FilledTextField.Label>Email</FilledTextField.Label>
            </FilledTextField>
            <FilledTextField>
              <FilledTextField.Input type="email" placeholder="Your email" />
              <FilledTextField.Label>Email</FilledTextField.Label>
              <FilledTextField.Decoration>
                <Icon symbol="email" />
              </FilledTextField.Decoration>
            </FilledTextField>
          </div>

          {/* Outlined Examples */}
          <div className="mb-12 space-y-4">
            <p className="text-title-lg">Outline</p>
            <OutlinedTextField>
              <OutlinedTextField.Input type="email" placeholder="Your email" />
              <OutlinedTextField.Label>Email</OutlinedTextField.Label>
            </OutlinedTextField>
            <OutlinedTextField>
              <OutlinedTextField.Input
                disabled
                type="email"
                placeholder="Your email"
              />
              <OutlinedTextField.Label>Disabled Email</OutlinedTextField.Label>
            </OutlinedTextField>
            <OutlinedTextField error>
              <OutlinedTextField.Input type="email" placeholder="Your email" />
              <OutlinedTextField.Label>Error Email</OutlinedTextField.Label>
            </OutlinedTextField>
            <OutlinedTextField>
              <OutlinedTextField.Input
                disabled
                value="your_email@mail.com"
                type="email"
                placeholder="Your email"
                readOnly
              />
              <OutlinedTextField.Label>Email</OutlinedTextField.Label>
            </OutlinedTextField>
            <OutlinedTextField>
              <OutlinedTextField.Input
                type="email"
                placeholder="Email with no label"
              />
            </OutlinedTextField>
            <OutlinedTextField>
              <OutlinedTextField.Decoration>
                <Icon symbol="email" />
              </OutlinedTextField.Decoration>
              <OutlinedTextField.Input type="email" placeholder="Your email" />
              <OutlinedTextField.Label>Email</OutlinedTextField.Label>
            </OutlinedTextField>
            <OutlinedTextField>
              <OutlinedTextField.Input type="email" placeholder="Your email" />
              <OutlinedTextField.Label>Email</OutlinedTextField.Label>
              <OutlinedTextField.Decoration>
                <Icon symbol="email" />
              </OutlinedTextField.Decoration>
            </OutlinedTextField>
          </div>
          {/* Filled Textarea examples */}
          <div className="mb-12 space-y-4">
            <p className="text-title-lg">Filled</p>
            <Textarea placeholder="Placeholder" label="Label" />
            <Textarea placeholder="No Label Placeholder" />
            <Textarea
              placeholder="No Label Placeholder"
              label="Label"
              error="required"
            />
            <Textarea
              placeholder="Placeholder"
              label="Disabled placeholder"
              disabled
            />

            <Textarea
              placeholder="Placeholder"
              label="Disabled placeholder"
              disabled
              value="Disabled with value"
              readOnly
            />

            <Textarea
              disabled
              placeholder="Disabled with error"
              label="Label"
              error="required"
            />
          </div>
          {/* Outlined Textarea examples */}
          <div className="mb-12 space-y-4">
            <p className="text-title-lg">Outlined</p>
            <Textarea
              variant="outlined"
              placeholder="Placeholder"
              label="Label"
            />
            <Textarea variant="outlined" placeholder="No Label Placeholder" />
            <Textarea
              variant="outlined"
              placeholder="No Label Placeholder"
              label="Label"
              error="required"
            />
            <Textarea
              variant="outlined"
              placeholder="Placeholder"
              label="Disabled placeholder"
              disabled
            />

            <Textarea
              variant="outlined"
              placeholder="Placeholder"
              label="Disabled placeholder"
              disabled
              value="Disabled with value"
            />

            <Textarea
              variant="outlined"
              disabled
              placeholder="Disabled with error"
              label="Label"
              error="required"
            />
          </div>
        </div>

        {/* Select examples */}
        <div className="grid grid-cols-2 gap-6">
          {/* Filled examples */}
          <div className="mb-12 space-y-4">
            <FilledSelect>
              <FilledSelect.Trigger id="framework">
                <FilledSelect.Value placeholder="Select a framework" />
                <FilledSelect.Label>Framework Select</FilledSelect.Label>
              </FilledSelect.Trigger>
              <FilledSelect.Content>
                {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                  <FilledSelect.Item key={value} value={value}>
                    {value}
                  </FilledSelect.Item>
                ))}
              </FilledSelect.Content>
            </FilledSelect>

            <FilledSelect>
              <FilledSelect.Trigger error>
                <FilledSelect.Value placeholder="Select a framework" />
                <FilledSelect.Label>Framework Select</FilledSelect.Label>
              </FilledSelect.Trigger>
              <FilledSelect.Content>
                {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                  <FilledSelect.Item key={value} value={value}>
                    {value}
                  </FilledSelect.Item>
                ))}
              </FilledSelect.Content>
            </FilledSelect>

            <FilledSelect value="Next.js">
              <FilledSelect.Trigger disabled>
                <FilledSelect.Value placeholder="Select a framework" />
                <FilledSelect.Label>Framework Select</FilledSelect.Label>
              </FilledSelect.Trigger>
              <FilledSelect.Content>
                {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                  <FilledSelect.Item key={value} value={value}>
                    {value}
                  </FilledSelect.Item>
                ))}
              </FilledSelect.Content>
            </FilledSelect>
          </div>
          {/* Outlined examples */}
          <div className="mb-12 space-y-4">
            <OutlinedSelect>
              <OutlinedSelect.Trigger id="framework">
                <OutlinedSelect.Value placeholder="Select a framework" />
                <OutlinedSelect.Label>Framework Select</OutlinedSelect.Label>
              </OutlinedSelect.Trigger>
              <OutlinedSelect.Content>
                {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                  <OutlinedSelect.Item key={value} value={value}>
                    {value}
                  </OutlinedSelect.Item>
                ))}
              </OutlinedSelect.Content>
            </OutlinedSelect>

            <OutlinedSelect>
              <OutlinedSelect.Trigger error>
                <OutlinedSelect.Value placeholder="Select a framework" />
                <OutlinedSelect.Label>Framework Select</OutlinedSelect.Label>
              </OutlinedSelect.Trigger>
              <OutlinedSelect.Content>
                {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                  <OutlinedSelect.Item key={value} value={value}>
                    {value}
                  </OutlinedSelect.Item>
                ))}
              </OutlinedSelect.Content>
            </OutlinedSelect>

            <OutlinedSelect value="Next.js">
              <OutlinedSelect.Trigger disabled>
                <OutlinedSelect.Value placeholder="Select a framework" />
                <OutlinedSelect.Label>Framework Select</OutlinedSelect.Label>
              </OutlinedSelect.Trigger>
              <OutlinedSelect.Content>
                {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                  <OutlinedSelect.Item key={value} value={value}>
                    {value}
                  </OutlinedSelect.Item>
                ))}
              </OutlinedSelect.Content>
            </OutlinedSelect>
          </div>

          {/* Combobox examples */}
          <div className="mb-12 space-y-4">
            <Combobox
              label="Framework Combobox"
              placeholder="Select a framework"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
            <Combobox
              disabled
              label="Framework Combobox"
              placeholder="Select a framework"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
            <Combobox
              placeholder="Select a framework no label"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
            <Combobox
              placeholder="Select a framework no label"
              emptyState="Nothing have been found."
              label="Framework Combobox"
              displayValue={(value: string) => value}
              error="Required"
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
          </div>

          <div className="mb-12 space-y-4">
            <Combobox
              variant="outlined"
              label="Framework Combobox"
              placeholder="Select a framework"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
            <Combobox
              variant="outlined"
              disabled
              label="Framework Combobox"
              placeholder="Select a framework"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
            <Combobox
              variant="outlined"
              placeholder="Select a framework no label"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
            <Combobox
              variant="outlined"
              label="Framework Combobox"
              placeholder="Select a framework"
              emptyState="Nothing have been found."
              displayValue={(value: string) => value}
              error="Required"
            >
              {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map((value) => (
                <Combobox.Item key={value} value={value}>
                  {value}
                </Combobox.Item>
              ))}
            </Combobox>
          </div>
        </div>

        <Dropzone accept={IMAGE_MIME_TYPE} className="flex gap-3">
          <Dropzone.Preview>
            {/* <img
                src="https://via.placeholder.com/80"
                className="h-full w-full object-fill"
              /> */}
            <Dropzone.Idle>
              <Icons.imageUpload />
            </Dropzone.Idle>
            <Dropzone.Accept>
              <Icons.checkSquare />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Icons.errorSquare />
            </Dropzone.Reject>
          </Dropzone.Preview>
          <Dropzone.Content>
            <Dropzone.Label>Project icon</Dropzone.Label>
            <p>
              <span className="font-medium underline">Click to upload</span>{' '}
              <span className="opacity-50">or drag and drop</span>
            </p>
            <p className="text-body-sm opacity-50">
              PNG, JPG or WEBP (max. 250kb)
            </p>
          </Dropzone.Content>
        </Dropzone>

        <Dropzone
          accept={IMAGE_MIME_TYPE}
          className="flex gap-3"
          variant="outlined"
        >
          <Dropzone.Preview>
            <Dropzone.Idle>
              <Icons.imageUpload />
            </Dropzone.Idle>
            <Dropzone.Accept>
              <Icons.checkSquare />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Icons.errorSquare />
            </Dropzone.Reject>
          </Dropzone.Preview>
          <Dropzone.Content>
            <Dropzone.Label>Project icon</Dropzone.Label>
            <p>
              <span className="font-medium underline">Click to upload</span>{' '}
              <span className="opacity-50">or drag and drop</span>
            </p>
            <p className="text-body-sm opacity-50">
              PNG, JPG or WEBP (max. 250kb)
            </p>
          </Dropzone.Content>
        </Dropzone>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FilledTextField>
                      <FilledTextField.Input
                        placeholder="Your user name"
                        {...field}
                      />
                      <FilledTextField.Label>Username</FilledTextField.Label>
                    </FilledTextField>
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
      <h2 className="mb-4">Cards</h2>
      <section className="mb-20 flex flex-col items-start gap-6">
        <Card className="w-[350px]" variant="elevated">
          <Card.Header>
            <Card.Title>Elevated card</Card.Title>
            <Card.Description>
              Deploy your new project in one-click.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex justify-end">
            <Button variant="tonal">Action</Button>
          </Card.Footer>
        </Card>

        <Card className="w-[350px]">
          <Card.Header>
            <Card.Title>Filled card</Card.Title>
            <Card.Description>
              Deploy your new project in one-click.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex justify-end">
            <Button variant="outlined">Action</Button>
          </Card.Footer>
        </Card>

        <Card className="w-[350px]" variant="outlined">
          <Card.Header>
            <Card.Title>Outlined card</Card.Title>
            <Card.Description>
              Deploy your new project in one-click.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex justify-end">
            <Button variant="tonal">Action</Button>
          </Card.Footer>
        </Card>

        <Card className="w-[350px]" variant="elevated">
          <Card.Header>
            <Card.Title>Create project</Card.Title>
            <Card.Description>
              Deploy your new project in one-click.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {/* <form>
              <div className="grid w-full items-center gap-4">
                <Select>
                  <Select.Trigger
                    id="framework"
                    placeholder="Select a framework"
                    label="Framework Select"
                  />
                  <Select.Content position="popper">
                    {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map(
                      (value) => (
                        <Select.Item key={value} value={value}>
                          {value}
                        </Select.Item>
                      )
                    )}
                  </Select.Content>
                </Select>

                <Select variant="outlined">
                  <Select.Trigger
                    id="framework"
                    placeholder="Select a framework"
                    label="Framework Select"
                  />
                  <Select.Content position="popper">
                    {['Next.js', 'SvelteKit', 'Astro', 'Nuxt.js'].map(
                      (value) => (
                        <Select.Item key={value} value={value}>
                          {value}
                        </Select.Item>
                      )
                    )}
                  </Select.Content>
                </Select>
              </div>
            </form> */}
          </Card.Content>
          <Card.Footer className="flex justify-between">
            <Button variant="text">Cancel</Button>
            <Button variant="tonal">Deploy</Button>
          </Card.Footer>
        </Card>

        {/* Link Card */}
        <LinkCard href="#">
          <Card.Header>
            <Card.Title>Card title</Card.Title>
          </Card.Header>
          <Card.Content>I am a link card</Card.Content>
        </LinkCard>

        {/* Skeleton Card */}
        <Card className="w-[350px]">
          <Card.Header>
            <Skeleton className="h-6 w-[30%]" />
            <Skeleton className="h-4 w-[70%]" />
          </Card.Header>
        </Card>
      </section>
      <h2 className="mb-4">Alerts</h2>
      <section className="mb-20 flex max-w-lg flex-col gap-3">
        {/* Default */}
        <Alert>
          <Icons.notification className="h-6 w-6" />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert>
        {/* Success */}
        <Alert variant="success">
          <Icons.notification className="h-6 w-6" />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert>
        {/* Info */}
        <Alert variant="info">
          <Icons.notification className="h-6 w-6" />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert>
        {/* Warning */}
        <Alert variant="warning">
          <Icons.notification className="h-6 w-6" />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert>
        {/* Error */}
        <Alert variant="error">
          <Icons.notification className="h-6 w-6" />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert>
        {/* Destructive */}
        <Alert variant="destructive">
          <Icons.notification className="h-6 w-6" />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert>
      </section>
    </main>
  )
}
