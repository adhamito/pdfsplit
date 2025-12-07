import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const meta: Meta = {
  title: 'Patterns/AI Components',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const ChatBubbles: Story = {
  render: () => (
    <div className="w-[520px] space-y-2">
      <div className="rounded-lg bg-muted p-2 w-fit">Bonjour !</div>
      <div className="rounded-lg bg-primary/10 p-2 w-fit ml-auto">Salut 👋</div>
    </div>
  ),
}

export const PromptBox: Story = {
  render: () => (
    <Card className="w-[520px] p-3 space-y-2">
      <Textarea placeholder="Décrivez votre requête..." />
      <Button>Envoyer</Button>
    </Card>
  ),
}

export const FileDropPreview: Story = {
  render: () => (
    <Card className="w-[520px] p-3 space-y-2">
      <input type="file" multiple className="block w-full rounded-md border p-2 text-sm" />
      <div className="text-xs text-muted-foreground">Prévisualisations s'affichent ici.</div>
    </Card>
  ),
}

export const CodeBlock: Story = {
  render: () => (
    <Card className="w-[520px] p-3">
      <pre className="overflow-auto rounded bg-muted p-3 text-xs"><code>{`function greet(name) {\n  return 'Hello ' + name\n}`}</code></pre>
    </Card>
  ),
}