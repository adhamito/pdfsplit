import type { Meta, StoryObj } from '@storybook/react'
import { ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from '@/components/ui/item'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FiBell, FiMessageSquare } from 'react-icons/fi'

const meta: Meta<typeof ItemGroup> = {
  title: 'Patterns/Lists/Templates',
  component: ItemGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const UsersList: Story = {
  render: () => (
    <div className="w-[520px] space-y-2">
      <ItemGroup>
        {["Dawa User", "Imane", "Youssef"].map((name, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Item>
            <ItemMedia>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/shadcn.jpg" />
                <AvatarFallback>{name.slice(0,2)}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{name.toLowerCase().replace(' ', '.')}@example.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm">Voir</Button>
            </ItemActions>
          </Item>
          </motion.div>
        ))}
      </ItemGroup>
    </div>
  ),
}

export const MessagesList: Story = {
  render: () => (
    <div className="w-[520px] space-y-2">
      <ItemGroup>
        {["Nouvelle commande", "Stock bas", "Support"].map((title, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Item>
            <ItemMedia variant="icon">
              <FiMessageSquare />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>Message de notification</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline">Lire</Button>
            </ItemActions>
          </Item>
          </motion.div>
        ))}
      </ItemGroup>
    </div>
  ),
}

export const NotificationsList: Story = {
  render: () => (
    <div className="w-[520px] space-y-2">
      <ItemGroup>
        {["Paiement reçu", "Client inscrit", "Erreur serveur"].map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Item>
            <ItemContent>
              <ItemTitle><span className="inline-flex items-center gap-2"><FiBell />{n}</span></ItemTitle>
              <ItemDescription>Détails de la notification</ItemDescription>
            </ItemContent>
          </Item>
          </motion.div>
        ))}
      </ItemGroup>
    </div>
  ),
}