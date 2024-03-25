'use client'

import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { CATEGORIES, CATEGORIES_ICONS } from '@/constants/projects'
import { PARAMS_KEYS } from '@/constants/routes'

import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { Icon } from '@/components/ui/icon'
import { IconButton } from '@/components/ui/icon-button'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const CategoriesFilter = () => {
  const { t } = useDictionary('Categories')
  const setSearchParams = useSetSearchParams()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get(PARAMS_KEYS.CATEGORY)
  const ref = useRef<HTMLDivElement>(null)

  const categoriesItems = CATEGORIES(t).map((category) => ({
    ...category,
    icon: CATEGORIES_ICONS[category.value as keyof typeof CATEGORIES_ICONS],
  }))

  const handleChange = (value: string) => {
    setSearchParams({ name: PARAMS_KEYS.CATEGORY, value })
  }

  const scroll = (scrollOffset: number, duration: number = 400) => {
    if (ref.current) {
      const currentElement = ref.current
      const startTime = performance.now()
      const startScrollLeft = currentElement.scrollLeft
      const endTime = startTime + duration
      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const animateScroll = () => {
        const currentTime = performance.now()
        const elapsedTime = Math.min(1, (currentTime - startTime) / duration)
        currentElement.scrollLeft =
          startScrollLeft + scrollOffset * easeInOutQuad(elapsedTime)

        if (currentTime < endTime) {
          requestAnimationFrame(animateScroll)
        }
      }

      animateScroll()
    }
  }

  const handleScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current
      const isAtBeginning = scrollLeft === 0
      const isAtEnd = scrollLeft + clientWidth === scrollWidth
      const leftButton = document.getElementById('leftButton')
      const rightButton = document.getElementById('rightButton')
      if (leftButton)
        leftButton.style.visibility = isAtBeginning ? 'hidden' : 'visible'
      if (rightButton)
        rightButton.style.visibility = isAtEnd ? 'hidden' : 'visible'
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <span
        id="leftButton"
        className="absolute inset-y-0 left-0 z-20 hidden w-20 bg-gradient-to-r from-background from-60% to-transparent to-90% md:block"
        style={{ visibility: 'hidden' }}
      >
        <IconButton
          variant="standard"
          onClick={() => scroll(-1 * (ref.current?.clientWidth ?? 124) - 48)}
          className="absolute left-0 top-1/2 z-20 translate-y-[-50%]"
        >
          <Icon symbol="chevron_left" />
        </IconButton>
      </span>
      <div
        ref={ref}
        onScroll={handleScroll}
        className="scrollbar-hidden flex w-full flex-nowrap items-center gap-3 overflow-x-auto px-3"
      >
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
      <span
        id="rightButton"
        className="absolute inset-y-0 right-0 z-20 hidden w-20 bg-gradient-to-l from-background from-60% to-transparent to-90% md:block"
        style={{ visibility: 'visible' }}
      >
        <IconButton
          variant="standard"
          onClick={() => scroll((ref.current?.clientWidth ?? 124) - 48)}
          className="absolute right-0 top-1/2 z-20 translate-y-[-50%]"
        >
          <Icon symbol="chevron_right" />
        </IconButton>
      </span>
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
  icon: number
  checked?: boolean
  onClick: () => void
}) => {
  return (
    <button
      data-state={checked ? 'checked' : 'unchecked'}
      className="group flex h-[124px] w-28 shrink-0 flex-col items-center justify-between rounded-sm border border-transparent px-2 py-4 outline-none transition-all hover:bg-onSurface/5 focus:bg-onSurface/5 active:scale-95 data-[state=unchecked]:border-outline data-[state=checked]:bg-secondaryContainer"
      onClick={onClick}
    >
      <img
        loading="lazy"
        src="/assets/categories_sprite.webp"
        alt={label}
        className="inline-block h-14 w-14 scale-75 bg-no-repeat object-cover"
        style={{ objectPosition: `0px ${icon * 56 * -1}px` }}
      />
      <p className="balance text-label-md text-onSurface group-data-[state=checked]:text-onSecondaryContainer">
        {label}
      </p>
    </button>
  )
}
