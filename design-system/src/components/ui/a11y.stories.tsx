import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Patterns/Accessibility',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AriaLive: Story = {
  render: () => (
    <div role="status" aria-live="polite" className="rounded-md border p-3 text-sm">
      Mise à jour: 3 nouvelles notifications
    </div>
  ),
}

export const FocusHelpers: Story = {
  render: () => (
    <button className="focus-ring rounded-md border px-4 py-2 text-sm">Bouton accessible</button>
  ),
}