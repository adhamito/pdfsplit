import type { Meta, StoryObj } from '@storybook/react'
import { SidebarBlock } from './sidebar-block'

const meta: Meta<typeof SidebarBlock> = {
  title: 'Blocks/Sidebar',
  component: SidebarBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SidebarBlock />,
}