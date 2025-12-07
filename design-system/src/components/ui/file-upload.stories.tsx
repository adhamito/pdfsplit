import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta = {
  title: 'Components/Form/File Upload',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[360px] space-y-3">
      <input type="file" className="block w-full rounded-md border p-2 text-sm" />
      <Button>Upload</Button>
    </div>
  ),
}