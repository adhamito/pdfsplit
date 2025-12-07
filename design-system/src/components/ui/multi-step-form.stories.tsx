import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from './input'
import { Button } from './button'

const meta: Meta = {
  title: 'Components/Form/Multi Step',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [step, setStep] = useState(1)
    return (
      <div className="w-[360px] space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <Input placeholder="Email" />
            <Input placeholder="Phone" />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <Input placeholder="Address" />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button>Submit</Button>
            </div>
          </div>
        )}
      </div>
    )
  },
}