import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Media Components',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const VideoPlayer: Story = {
  render: () => (
    <Card className="w-[640px] p-3">
      <video controls className="w-full">
        <source src="" type="video/mp4" />
      </video>
    </Card>
  ),
}

export const AudioPlayer: Story = {
  render: () => (
    <Card className="w-[640px] p-3">
      <audio controls className="w-full" />
    </Card>
  ),
}

export const ImageGallery: Story = {
  render: () => (
    <div className="grid w-[640px] grid-cols-3 gap-2">
      {[1,2,3,4,5,6].map(i => <img key={i} src="/image.png" alt="" className="h-32 w-full rounded object-cover" />)}
    </div>
  ),
}