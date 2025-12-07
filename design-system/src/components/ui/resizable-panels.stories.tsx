import type { Meta, StoryObj } from '@storybook/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Panels',
  component: ResizablePanelGroup,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-[300px] border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <div className="h-full p-3">Left panel</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div className="h-full p-3">Right panel</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}