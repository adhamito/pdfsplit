import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './card'

const meta: Meta = {
  title: 'Components/Testimonial Slider',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const testimonials = [
  { author: 'Imane', text: 'Service excellent et rapide.' },
  { author: 'Youssef', text: 'Produit de qualité, je recommande.' },
  { author: 'Dawa User', text: 'Support très réactif.' },
]

export const AutoSlide: Story = {
  render: () => {
    const [i, setI] = React.useState(0)
    const [hover, setHover] = React.useState(false)
    React.useEffect(() => {
      if (hover) return
      const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 3000)
      return () => clearInterval(id)
    }, [hover])
    const variants = {
      enter: { opacity: 0, y: 8, scale: 0.98 },
      center: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -8, scale: 0.98 },
    }
    return (
      <div className="w-[480px]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <AnimatePresence mode="wait">
          <motion.div key={i} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">{testimonials[i].author}</div>
              <div className="mt-2 text-base">{testimonials[i].text}</div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  },
}