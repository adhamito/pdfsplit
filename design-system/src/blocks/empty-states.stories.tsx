import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const meta: Meta = {
  title: 'Patterns/Empty States',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const NoResults: Story = {
  render: () => (
    <Card className="w-[420px] p-6 text-center space-y-2">
      <img src="/Brand.svg" alt="" className="mx-auto h-12 w-12 opacity-60" />
      <div className="text-lg font-medium">Aucun résultat</div>
      <div className="text-sm text-muted-foreground">Essayez une autre recherche.</div>
      <Input placeholder="Rechercher..." />
    </Card>
  ),
}

export const NoNotifications: Story = {
  render: () => (
    <Card className="w-[420px] p-6 text-center space-y-2">
      <div className="text-lg font-medium">Aucune notification</div>
      <div className="text-sm text-muted-foreground">Nous vous avertirons ici.</div>
    </Card>
  ),
}

export const FirstTimeOnboarding: Story = {
  render: () => (
    <Card className="w-[520px] p-6 text-center space-y-3">
      <img src="/image.png" alt="" className="mx-auto h-24 w-auto rounded" />
      <div className="text-lg font-medium">Bienvenue</div>
      <div className="text-sm text-muted-foreground">Commencez par ajouter vos premiers éléments.</div>
    </Card>
  ),
}