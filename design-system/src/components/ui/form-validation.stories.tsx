import type { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './form'
import { Input } from './input'
import { Button } from './button'

const meta: Meta = {
  title: 'Components/Form/Validation',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const Default: Story = {
  render: () => {
    const form = useForm<{ email: string; password: string }>({
      resolver: zodResolver(schema),
      defaultValues: { email: '', password: '' },
    })

    return (
      <Form {...form}>
        <form className="w-[360px] space-y-4" onSubmit={form.handleSubmit(() => {})}>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}