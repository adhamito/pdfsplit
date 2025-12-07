import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'

const meta: Meta = {
  title: 'Patterns/Data Filters',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const FilterChips: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['Tout','Actif','Archive'].map(t => <Badge key={t} variant="outline">{t}</Badge>)}
      <Button size="sm" variant="secondary">Effacer</Button>
    </div>
  ),
}

export const FilterDrawer: Story = {
  render: () => (
    <Card className="w-[520px] p-4 space-y-3">
      <div className="text-sm">Filtres rapides</div>
      <div className="flex gap-3">
        <Select defaultValue="recent">
          <option value="recent">Plus récents</option>
          <option value="price">Prix</option>
        </Select>
        <Select defaultValue="all">
          <option value="all">Tous</option>
          <option value="stock">En stock</option>
        </Select>
      </div>
      <div className="rounded-md border p-3">
        <div className="text-xs text-muted-foreground">Plage de dates</div>
        <Calendar mode="single" selected={new Date()} />
      </div>
      <Button className="w-full">Appliquer</Button>
    </Card>
  ),
}