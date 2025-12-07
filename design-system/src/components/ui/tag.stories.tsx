import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Tag',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>Tag</Badge>
      <Badge variant="outline">Chip</Badge>
    </div>
  ),
}