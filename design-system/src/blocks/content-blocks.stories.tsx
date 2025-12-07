import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const meta: Meta = {
  title: 'Patterns/Content Blocks',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Hero: Story = {
  render: () => (
    <Card className="w-[720px] p-8 text-center">
      <img src="/Brand.svg" alt="" className="mx-auto h-10 w-10" />
      <h1 className="mt-2 text-2xl font-semibold">Plateforme moderne</h1>
      <p className="mt-1 text-sm text-muted-foreground">Construisez votre design system.</p>
    </Card>
  ),
}

export const FeaturesGrid: Story = {
  render: () => (
    <div className="grid w-[720px] grid-cols-3 gap-4">
      {[1,2,3,4,5,6].map(i => <Card key={i} className="p-4">Feature {i}</Card>)}
    </div>
  ),
}

export const FAQAccordion: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[640px]">
      <AccordionItem value="1"><AccordionTrigger>Question 1</AccordionTrigger><AccordionContent>Réponse</AccordionContent></AccordionItem>
      <AccordionItem value="2"><AccordionTrigger>Question 2</AccordionTrigger><AccordionContent>Réponse</AccordionContent></AccordionItem>
    </Accordion>
  ),
}