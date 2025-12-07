import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="message">Your Message</label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This textarea is disabled',
  },
}

export const WithValue: Story = {
  args: {
    value: 'This is a pre-filled textarea with some text content.',
  },
}

export const LargeTextarea: Story = {
  args: {
    placeholder: 'Large textarea for longer content...',
    className: 'min-h-[200px]',
  },
}