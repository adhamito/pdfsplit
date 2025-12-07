import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Workflow & Automation',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const KanbanBoard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      {['À faire','En cours','Terminé'].map((c,i)=> (
        <Card key={i} className="p-3 space-y-2">
          <div className="text-sm font-medium">{c}</div>
          {[1,2].map(n => <Card key={n} className="p-2 text-sm">Tâche {n}</Card>)}
        </Card>
      ))}
    </div>
  ),
}