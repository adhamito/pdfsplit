import type { Meta, StoryObj } from '@storybook/react'
import { EnhancedLoginCard, AnimatedFeatureCards, AnimatedCTASection } from './enhanced-components'

const meta: Meta = {
  title: 'Examples/Enhanced Components',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const LoginCard: Story = {
  name: 'Enhanced Login Card',
  render: () => <EnhancedLoginCard />,
}

export const FeatureCards: Story = {
  name: 'Animated Feature Cards',
  render: () => <AnimatedFeatureCards />,
}

export const CTASection: Story = {
  name: 'Animated CTA Section',
  render: () => <AnimatedCTASection />,
}

export const CompleteShowcase: Story = {
  name: 'Complete Animation Showcase',
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <AnimatedCTASection />
      <AnimatedFeatureCards />
    </div>
  ),
}