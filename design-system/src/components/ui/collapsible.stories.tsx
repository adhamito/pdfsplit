import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'
import { Button } from './button'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-3 w-[420px] rounded-md border p-3 text-sm">
          Hidden content shown when expanded.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}