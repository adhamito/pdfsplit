import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FiActivity, FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const meta: Meta = {
  title: 'Patterns/Motion',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Hover: Story = {
  render: () => (
    <motion.div whileHover={{ scale: 1.03 }} className="w-[360px]">
      <Card className="p-4 flex items-center gap-3">
        <img src="/Brand.svg" alt="DAWA" className="h-6 w-6" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><FiActivity />Survoler la carte</div>
      </Card>
    </motion.div>
  ),
}

export const Tap: Story = {
  render: () => (
    <motion.div className="flex gap-3">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button>Appuyer</Button>
      </motion.div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button variant="outline" className="inline-flex items-center gap-2">Continuer <FiArrowRight /></Button>
      </motion.div>
    </motion.div>
  ),
}

export const Focus: Story = {
  render: () => {
    const [focused, setFocused] = React.useState(false)
    return (
      <motion.button
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{ scale: focused ? 1.03 : 1 }}
        className="rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Focus animé
      </motion.button>
    )
  },
}

export const PageTransitions: Story = {
  render: () => {
    const [step, setStep] = React.useState(1)
    return (
      <div className="w-[420px]">
        <div className="mb-3 flex gap-2">
          <Button variant={step === 1 ? 'default' : 'outline'} onClick={() => setStep(1)}>Page 1</Button>
          <Button variant={step === 2 ? 'default' : 'outline'} onClick={() => setStep(2)}>Page 2</Button>
        </div>
        <div className="relative h-[160px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="p1"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Card className="h-full p-4">Contenu de la page 1</Card>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="p2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Card className="h-full p-4">Contenu de la page 2</Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  },
}

export const AnimationVariants: Story = {
  render: () => {
    const items = ['Élément A', 'Élément B', 'Élément C']
    const list = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }
    const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }
    return (
      <motion.ul variants={list} initial="hidden" animate="show" className="w-[360px] space-y-2">
        {items.map((t, i) => (
          <motion.li key={i} variants={item} className="rounded-md border p-3 text-sm flex items-center gap-2">
            <FiCheckCircle className="text-muted-foreground" /> {t}
          </motion.li>
        ))}
      </motion.ul>
    )
  },
}