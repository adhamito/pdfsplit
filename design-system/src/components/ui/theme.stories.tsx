import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Theme',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Switcher: Story = {
  render: () => {
    const setTheme = (t: string) => {
      const root = document.documentElement
      if (t === 'light') root.classList.remove('dark')
      if (t === 'dark') root.classList.add('dark')
      root.classList.remove('theme-ocean', 'theme-sunset')
    }
    const setCustom = (name: string) => {
      const root = document.documentElement
      root.classList.remove('theme-ocean', 'theme-sunset')
      root.classList.add(name)
    }
    return (
      <div className="w-[520px] space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={() => setTheme('light')}>Light</Button>
          <Button variant="outline" onClick={() => setTheme('dark')}>Dark</Button>
          <Button variant="secondary" onClick={() => setCustom('theme-ocean')}>Ocean</Button>
          <Button variant="secondary" onClick={() => setCustom('theme-sunset')}>Sunset</Button>
        </div>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Preview</div>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <div className="h-10 rounded-md bg-primary" />
            <div className="h-10 rounded-md bg-accent" />
            <div className="h-10 rounded-md bg-muted" />
          </div>
        </Card>
      </div>
    )
  },
}