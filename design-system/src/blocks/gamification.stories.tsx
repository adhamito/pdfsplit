import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const meta: Meta = {
  title: 'Patterns/Gamification',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const ProgressBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>Débutant</Badge>
      <Badge variant="secondary">Intermédiaire</Badge>
      <Badge variant="outline">Expert</Badge>
    </div>
  ),
}

export const LevelSystem: Story = {
  render: () => (
    <Card className="w-[420px] p-4">
      <div className="text-sm">Niveau 3</div>
      <Progress value={60} className="mt-2" />
    </Card>
  ),
}

export const AchievementsModal: Story = {
  render: () => (
    <Card className="w-[420px] p-4 space-y-2">
      <div className="text-sm">Succès débloqués</div>
      <div className="flex gap-2">
        <Badge>100 ventes</Badge>
        <Badge>50 clients</Badge>
      </div>
    </Card>
  ),
}

export const XPProgressBar: Story = {
  render: () => (
    <Card className="w-[420px] p-4">
      <div className="text-sm">XP: 820 / 1000</div>
      <Progress value={82} className="mt-2" />
    </Card>
  ),
}