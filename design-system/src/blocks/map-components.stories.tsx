import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Map Components',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const MapCard: Story = {
  render: () => (
    <Card className="w-[640px] h-[360px] overflow-hidden">
      <img src="/image.png" alt="Map placeholder" className="h-full w-full object-cover" />
    </Card>
  ),
}