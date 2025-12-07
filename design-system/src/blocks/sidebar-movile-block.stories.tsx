import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DashboardLayout from './sidebar-movile-block'
import { ShoppingCart, Package, AlertTriangle, FileText, User, LogOut } from 'lucide-react'

const meta: Meta<typeof DashboardLayout> = {  
  title: 'Blocks/Sidebar Mobile',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile2' },
  },    
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const navMain = [
  { title: 'Commandes', url: '#', icon: ShoppingCart, isActive: true },
  { title: 'Stock', url: '#', icon: Package },
  { title: 'Réclamation', url: '#', icon: AlertTriangle },
  { title: 'Documents', url: '#', icon: FileText, notify: true },
  { title: 'Profil', url: '#', icon: User },
  { title: 'Déconnexion', url: '#', icon: LogOut },
]

const user = {
  name: 'Dawa User',
  email: 'user@dawa.mg',
  avatar: '/avatars/shadcn.jpg',
}

export const Default: Story = {
  render: () => (
    <DashboardLayout navMain={navMain} user={user}>
      <div className="grid gap-3">
        <div className="h-24 rounded-md border bg-muted" />
        <div className="h-24 rounded-md border bg-muted" />
        <div className="h-24 rounded-md border bg-muted" />
      </div>
    </DashboardLayout>
  ),
}