import type { Meta, StoryObj } from '@storybook/react'
import { DashboardBlock } from '@/blocks/dashboard-block'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiUsers, FiBox } from 'react-icons/fi'
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react'

const meta: Meta<typeof DashboardBlock> = {
  title: 'Patterns/Dashboard/Widgets',
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

const user = { name: 'Dawa User', email: 'user@dawa.mg', avatar: '/avatars/shadcn.jpg' }

export const Default: Story = {
  render: () => (
    <DashboardBlock navMain={navMain} user={user}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><FiShoppingCart />Ventes</div>
            <div className="mt-2 text-2xl font-semibold">1 240</div>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><FiUsers />Clients</div>
            <div className="mt-2 text-2xl font-semibold">380</div>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><FiBox />Produits</div>
            <div className="mt-2 text-2xl font-semibold">96</div>
          </Card>
        </motion.div>
      </div>
    </DashboardBlock>
  ),
}