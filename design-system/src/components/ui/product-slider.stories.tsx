import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { motion } from 'framer-motion'

const meta: Meta = {
  title: 'Components/Product Slider',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalSnap: Story = {
  render: () => (
    <div className="relative w-[640px]">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 p-2">
        {[1,2,3,4,5].map((n) => (
          <div key={n} className="snap-start shrink-0 w-[220px]">
            <Card className="p-3">
              <img src="/image.png" alt="Produit" className="h-28 w-full object-cover rounded" />
              <div className="mt-2 text-sm">Produit {n}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const AutoScroll: Story = {
  render: () => (
    <div className="relative w-[640px] overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-4 w-[200%] p-2"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[1,2,3,4,5,1,2,3,4,5].map((n, i) => (
          <div key={i} className="shrink-0 w-[220px]">
            <Card className="p-3">
              <img src="/image.png" alt="Produit" className="h-28 w-full object-cover rounded" />
              <div className="mt-2 text-sm">Produit {n}</div>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  ),
}