import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

const meta: Meta = {
  title: 'Patterns/Authentication/Forgot Password',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-[360px]">
      <Card className="p-4 space-y-4">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo.svg" alt="DAWA" className="h-auto w-1/2" />
          <h2 className="text-lg font-semibold">Réinitialiser le mot de passe</h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-md border px-3"><FiMail className="text-muted-foreground" /><Input placeholder="Email" className="border-0 px-0" /></div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Button className="w-full">Envoyer le lien</Button>
        </motion.div>
      </Card>
    </motion.div>
  ),
}