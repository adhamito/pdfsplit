import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Notifications System',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const BadgeIndicator: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <img src="/Brand.svg" alt="" className="h-8 w-8" />
        <Badge className="absolute -right-2 -top-2">3</Badge>
      </div>
    </div>
  ),
}

export const PanelDropdown: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge variant="outline" className="cursor-pointer">Notifications</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-64">
        {['Paiement reçu','Message support','Stock bas'].map((n,i)=>(
          <DropdownMenuItem key={i}>{n}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const ListPage: Story = {
  render: () => (
    <Card className="w-[520px] p-4 space-y-2">
      {['Paiement reçu','Message support','Stock bas'].map((n,i)=>(
        <div key={i} className="flex items-center justify-between rounded-md border p-2 text-sm">
          <span>{n}</span>
          <Badge variant="secondary">Non lu</Badge>
        </div>
      ))}
    </Card>
  ),
}