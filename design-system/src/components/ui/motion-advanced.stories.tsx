import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Card } from './card'
import { Checkbox } from './checkbox'
import { Switch } from './switch'

const meta: Meta = {
  title: 'Patterns/Motion Advanced',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const HoverAnimations: Story = {
  render: () => (
    <div className="w-[600px] grid grid-cols-3 gap-4">
      <motion.div whileHover={{ scale: 1.03 }}><Button className="w-full">Hover Scale</Button></motion.div>
      <Card className="p-4 transition-shadow hover:shadow-xl">Card hover shadow</Card>
      <motion.div whileHover={{ rotate: 12 }} className="flex items-center justify-center"><span className="text-2xl">★</span></motion.div>
    </div>
  ),
}

export const PageTransitionsVariants: Story = {
  render: () => {
    const [mode, setMode] = React.useState<'fade'|'slide-left'|'slide-right'|'zoom'>('fade')
    const [step, setStep] = React.useState(1)
    const variants = {
      fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
      'slide-left': { initial: { x: 24, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -24, opacity: 0 } },
      'slide-right': { initial: { x: -24, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 24, opacity: 0 } },
      zoom: { initial: { scale: 0.98, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.98, opacity: 0 } },
    } as const
    return (
      <div className="w-[520px] space-y-3">
        <div className="flex gap-2">
          {(['fade','slide-left','slide-right','zoom'] as const).map(m => (
            <Button key={m} variant={mode===m?'default':'outline'} onClick={() => setMode(m)}>{m}</Button>
          ))}
          <Button variant="secondary" onClick={() => setStep(s => s===1?2:1)}>Toggle Page</Button>
        </div>
        <div className="relative h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={variants[mode].initial} animate={variants[mode].animate} exit={variants[mode].exit} transition={{ duration: 0.25 }} className="absolute inset-0">
              <Card className="h-full p-4">Page {step} ({mode})</Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  },
}

export const ModalAndDrawerAnimations: Story = {
  render: () => (
    <div className="flex gap-4">
      {/* Modal */}
      <details className="group">
        <summary className="cursor-pointer select-none rounded-md border px-3 py-1 text-sm">Open Modal</summary>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="mt-3 rounded-md border bg-background p-4 shadow-xl">
          <div className="text-sm">Modal content</div>
        </motion.div>
      </details>
      {/* Drawer */}
      <div className="relative w-[280px]">
        <motion.div initial={{ x: 280 }} animate={{ x: 0 }} transition={{ type: 'tween', duration: 0.3 }} className="absolute inset-y-0 right-0 w-[240px] rounded-md border bg-background p-3 shadow-lg">
          Drawer (right)
        </motion.div>
      </div>
    </div>
  ),
}

export const CollapseAnimations: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="w-[480px] space-y-3">
        <Button onClick={() => setOpen(o=>!o)}>{open?'Close':'Open'} Dropdown</Button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden rounded-md border p-3 text-sm">
              Smooth dropdown content
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
}

export const ToastAndAlertAnimations: Story = {
  render: () => {
    const [show, setShow] = React.useState(false)
    return (
      <div className="w-[420px] space-y-3">
        <Button onClick={() => setShow(true)}>Show Alert</Button>
        <AnimatePresence>
          {show && (
            <motion.div initial={{ x: 220, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 220, opacity: 0 }} transition={{ duration: 0.25 }} className="ml-auto w-fit rounded-md border bg-background p-3 shadow-lg">
              <div className="text-sm">Animated alert</div>
              <Button size="sm" className="mt-2" onClick={() => setShow(false)}>Close</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
}

export const LoadingAnimations: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false)
    return (
      <div className="w-[520px] space-y-4">
        <div className="skeleton-shine h-3 w-full rounded-md bg-muted" />
        <Button onClick={() => setLoading(l=>!l)} className="inline-flex items-center gap-2">
          {loading && <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
          {loading ? 'Loading...' : 'Toggle loading'}
        </Button>
        <div className="relative h-1 w-full overflow-hidden rounded bg-muted">
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} className="h-full bg-primary" />
        </div>
      </div>
    )
  },
}

export const MicroInteractions: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    const [on, setOn] = React.useState(false)
    return (
      <div className="w-[520px] grid grid-cols-3 gap-4 items-center">
        <div className="space-y-2">
          <Checkbox checked={checked} onCheckedChange={(v:any)=>setChecked(!!v)} />
          <AnimatePresence>{checked && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-sm text-green-600">Checked!</motion.div>)}</AnimatePresence>
        </div>
        <div className="space-y-2">
          <Switch checked={on} onCheckedChange={setOn} />
          <motion.div animate={{ x: on ? 12 : 0 }} className="text-sm">Toggle</motion.div>
        </div>
        <div className="flex items-center">
          <motion.svg width="40" height="40" viewBox="0 0 24 24">
            <motion.path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          </motion.svg>
        </div>
      </div>
    )
  },
}