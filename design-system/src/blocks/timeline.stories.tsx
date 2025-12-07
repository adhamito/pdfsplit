import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Timeline',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: () => (
    <Card className="w-[420px] p-4">
      <ol className="relative border-l">
        {["Commande créée","Payée","Expédiée","Livrée"].map((s,i)=>(
          <li key={i} className="mb-4 ml-6">
            <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary"></span>
            <h4 className="text-sm font-medium">{s}</h4>
            <p className="text-xs text-muted-foreground">12:0{i} - 2025-11-29</p>
          </li>
        ))}
      </ol>
    </Card>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="w-[520px]">
      <div className="flex items-center justify-between">
        {["Créée","Payée","Expédiée","Livrée"].map((s,i)=>(
          <div key={i} className="text-center">
            <div className="mx-auto h-2 w-2 rounded-full bg-primary" />
            <div className="mt-1 text-xs">{s}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 h-0.5 w-full bg-muted" />
    </div>
  ),
}