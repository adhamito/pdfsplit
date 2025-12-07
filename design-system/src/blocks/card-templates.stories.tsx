import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiUser } from 'react-icons/fi'

const meta: Meta = {
  title: 'Patterns/Cards/Templates',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const ProductCard: Story = {
  render: () => (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className="w-[320px] p-3 space-y-3">
        <img src="/image.png" alt="Produit" className="h-40 w-full object-cover rounded" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium"><FiShoppingBag />Produit A</div>
          <Badge>En stock</Badge>
        </div>
        <div className="text-sm text-muted-foreground">Description courte du produit.</div>
        <div className="font-semibold">129,00 MAD</div>
      </Card>
    </motion.div>
  ),
}

export const UserProfileCard: Story = {
  render: () => (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className="w-[320px] p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/shadcn.jpg" />
            <AvatarFallback>DU</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 font-medium"><FiUser />Dawa User</div>
            <div className="text-xs text-muted-foreground">user@dawa.mg</div>
          </div>
        </div>
        <div className="text-sm">Client fidèle depuis 2022</div>
      </Card>
    </motion.div>
  ),
}

export const AppStatsCard: Story = {
  render: () => (
    <Card className="w-[320px] p-4">
      <div className="text-sm text-muted-foreground">Statistiques</div>
      <div className="mt-2 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-semibold">1240</div>
          <div className="text-xs text-muted-foreground">Ventes</div>
        </div>
        <div>
          <div className="text-lg font-semibold">380</div>
          <div className="text-xs text-muted-foreground">Clients</div>
        </div>
        <div>
          <div className="text-lg font-semibold">96</div>
          <div className="text-xs text-muted-foreground">Produits</div>
        </div>
      </div>
    </Card>
  ),
}