import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from './sonner'
import { Button } from './button'
import { toast } from 'sonner'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <Button onClick={() => toast.success('Saved successfully')}>Success</Button>
        <Button variant="outline" onClick={() => toast.error('Something went wrong')}>Error</Button>
        <Button variant="secondary" onClick={() => toast('This is a warning', { description: 'Check your inputs' })}>Warning</Button>
      </div>
      <Toaster />
    </div>
  ),
}