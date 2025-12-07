import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account preferences and personal information.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" className="w-[500px]">
      <div className="flex space-x-4">
        <TabsList className="flex flex-col space-y-2 w-[100px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="general">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">General Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your general application preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="privacy">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Privacy Settings</h3>
              <p className="text-sm text-muted-foreground">
                Control your privacy and data sharing preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Notification Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage how you receive notifications and alerts.
              </p>
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  ),
}