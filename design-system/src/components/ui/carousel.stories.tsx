import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './carousel'
import { Card } from './card'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Images: Story = {
  render: () => {
    const [api, setApi] = React.useState<CarouselApi | null>(null)
    const [index, setIndex] = React.useState(0)
    React.useEffect(() => {
      if (!api) return
      const handler = () => setIndex(api.selectedScrollSnap())
      api.on('select', handler)
      handler()
      return () => api.off('select', handler)
    }, [api])
    const slides = ['/image.png', '/logo.svg', '/Brand.svg']
    return (
      <div className="w-[560px]">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {slides.map((src, i) => (
              <CarouselItem key={i} className="basis-full">
                <motion.img
                  src={src}
                  alt={`slide-${i}`}
                  className="h-64 w-full object-contain"
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: index === i ? 1 : 0.7, scale: index === i ? 1 : 0.98 }}
                  transition={{ duration: 0.3 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-2 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} className={`h-2 w-2 rounded-full ${index===i?'bg-primary':'bg-muted'}`} onClick={() => api?.scrollTo(i)} aria-label={`Go to ${i+1}`} />
          ))}
        </div>
      </div>
    )
  },
}

export const CardsAutoplay: Story = {
  render: () => {
    const [api, setApi] = React.useState<CarouselApi | null>(null)
    React.useEffect(() => {
      if (!api) return
      const id = setInterval(() => api.scrollNext(), 2500)
      return () => clearInterval(id)
    }, [api])
    return (
      <div className="w-[640px]">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {[1,2,3,4].map((n, i) => (
              <CarouselItem key={n} className="basis-full">
                <motion.div
                  initial={{ opacity: 0.6, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-40 p-4">Card {n}</Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  },
}