import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Bell, User, Sun } from 'lucide-react'

const meta: Meta = {
  title: 'Patterns/Navbar',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const CreativeNavbar: Story = {
  render: () => (
    <Card className="flex items-center gap-3 px-4 py-2">
      <img src="/Brand.svg" alt="DAWA" className="h-7 w-7" />
      <div className="hidden md:flex items-center gap-3 text-sm">
        <Button variant="ghost">Accueil</Button>
        <Button variant="ghost">Produits</Button>
        <Button variant="ghost">Clients</Button>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 rounded-md border px-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="border-0 px-0" />
        </div>
        <Button variant="ghost" size="icon"><Sun className="h-4 w-4" /></Button>
        <div className="relative">
          <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
          <Badge className="absolute -right-1 -top-1">3</Badge>
        </div>
        <Button variant="outline" size="sm" className="inline-flex items-center gap-2"><User className="h-4 w-4" /> Profil</Button>
      </div>
    </Card>
  ),
}