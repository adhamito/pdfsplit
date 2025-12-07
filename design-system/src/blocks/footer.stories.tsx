import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Footer',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const CreativeFooter: Story = {
  render: () => (
    <Card className="px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <img src="/Brand.svg" alt="DAWA" className="h-7 w-7" />
          <p className="mt-2 text-muted-foreground">Design system moderne pour vos apps.</p>
        </div>
        <div>
          <div className="font-medium">Produit</div>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>Fonctionnalités</li>
            <li>Tarifs</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Ressources</div>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>Blog</li>
            <li>Aide</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Légal</div>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>Confidentialité</li>
            <li>Conditions</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border-t pt-4 text-xs text-muted-foreground">© 2025 DAWA</div>
    </Card>
  ),
}