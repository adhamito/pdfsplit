import type { Meta, StoryObj } from '@storybook/react'
import { ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemSeparator } from './item'
import { Button } from './button'
import { Badge } from './badge'

const meta: Meta<typeof ItemGroup> = {
  title: 'Components/Data List',
  component: ItemGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[560px]">
      <ItemGroup>
        <Item>
          <ItemMedia variant="image">
            <img src="/image.png" alt="Product" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              Product A <Badge>New</Badge>
            </ItemTitle>
            <ItemDescription>
              A short description of the product.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">View</Button>
            <Button size="sm" variant="outline">Edit</Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Service B</ItemTitle>
            <ItemDescription>
              Helpful details and links <a href="#">Learn more</a>.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">Open</Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
}