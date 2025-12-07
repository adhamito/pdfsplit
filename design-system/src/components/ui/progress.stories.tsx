import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
  },
}

export const Low: Story = {
  args: {
    value: 25,
  },
}

export const High: Story = {
  args: {
    value: 75,
  },
}

export const Zero: Story = {
  args: {
    value: 0,
  },
}