import type { Meta, StoryObj } from '@storybook/react'
import { DashboardBlock } from '@/blocks/dashboard-block'
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react'

const meta: Meta<typeof DashboardBlock> = {
  title: 'Blocks/Dashboard',
  component: DashboardBlock,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const navMain = [
  { title: 'Tableau de bord', url: '#', icon: LayoutDashboard, isActive: true },
  { title: 'Produits', url: '#', icon: Package },
  { title: 'Commandes', url: '#', icon: ShoppingCart },
  { title: 'Clients', url: '#', icon: Users },
  { title: 'Paramètres', url: '#', icon: Settings },
]

const user = {
  name: 'Dawa User',
  email: 'user@dawa.mg',
  avatar: '/avatars/shadcn.jpg',
}

export const Desktop: Story = {
  render: () => (
    <DashboardBlock navMain={navMain} user={user}>
      <div className="p-6">
        <h1 className="text-xl font-semibold">Dashboard Content</h1>
        <p className="mt-2 text-sm text-muted-foreground">Place your page content here.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 rounded-md border bg-muted" />
          <div className="h-24 rounded-md border bg-muted" />
          <div className="h-24 rounded-md border bg-muted" />
        </div>
      </div>
    </DashboardBlock>
  ),
}

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => (
    <DashboardBlock navMain={navMain} user={user}>
      <div className="p-3">
        <div className="grid gap-3">
          <div className="h-24 rounded-md border bg-muted" />
          <div className="h-24 rounded-md border bg-muted" />
          <div className="h-24 rounded-md border bg-muted" />
        </div>
      </div>
    </DashboardBlock>
  ),
}