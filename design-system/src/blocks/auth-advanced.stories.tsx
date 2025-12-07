import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const meta: Meta = {
  title: 'Patterns/Auth Advanced',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const MultiStepAuth: Story = {
  render: () => (
    <Card className="w-[420px] p-4 space-y-3">
      <Input placeholder="Email" />
      <Button className="w-full">Next</Button>
      <Input placeholder="Code 2FA" />
      <Button className="w-full">Verify</Button>
    </Card>
  ),
}

export const SocialLogin: Story = {
  render: () => (
    <Card className="w-[420px] p-4 space-y-3">
      <Button className="w-full" variant="secondary">Se connecter avec Google</Button>
      <Button className="w-full" variant="secondary">Se connecter avec GitHub</Button>
    </Card>
  ),
}