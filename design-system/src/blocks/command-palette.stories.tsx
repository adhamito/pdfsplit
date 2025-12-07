import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Command } from 'cmdk'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Command Palette',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[520px] p-0">
      <Command>
        <Command.Input placeholder="Rechercher des commandes..." />
        <Command.List>
          <Command.Empty>Rien trouvé.</Command.Empty>
          <Command.Group heading="Actions">
            <Command.Item>Nouvelle page</Command.Item>
            <Command.Item>Importer des données</Command.Item>
            <Command.Item>Paramètres</Command.Item>
          </Command.Group>
          <Command.Group heading="Raccourcis">
            <Command.Item>Ctrl + K Palette</Command.Item>
            <Command.Item>Ctrl + B Basculer Sidebar</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </Card>
  ),
}