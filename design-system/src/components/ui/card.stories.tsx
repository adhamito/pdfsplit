import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. You can add any content you want.</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">Deploy</button>
      </CardFooter>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Product Card</CardTitle>
        <CardDescription>Beautiful product showcase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-md mb-4" />
        <p className="text-sm text-muted-foreground">
          This card includes an image section with gradient background.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <span className="text-2xl font-bold">$99</span>
        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">Add to Cart</button>
      </CardFooter>
    </Card>
  ),
}

export const Minimal: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">Simple card with just content.</p>
      </CardContent>
    </Card>
  ),
}

export const Animated: Story = {
  render: () => (
    <Card className="w-[350px]" animated>
      <CardHeader>
        <CardTitle>Animated Card</CardTitle>
        <CardDescription>This card has entrance animation</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card uses the custom cardEntrance animation from globals.css for a smooth entrance effect.</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">Deploy</button>
      </CardFooter>
    </Card>
  ),
}

export const AnimatedWithImage: Story = {
  render: () => (
    <Card className="w-[350px]" animated>
      <CardHeader>
        <CardTitle>Animated Product Card</CardTitle>
        <CardDescription>Beautiful animated showcase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-md mb-4" />
        <p className="text-sm text-muted-foreground">
          This animated card includes an image section with gradient background.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <span className="text-2xl font-bold">$99</span>
        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">Add to Cart</button>
      </CardFooter>
    </Card>
  ),
}