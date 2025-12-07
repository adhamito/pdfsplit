import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleValue: Story = {
  render: () => (
    <div className="w-[360px] space-y-2">
      <Slider defaultValue={[50]} max={100} step={1} />
      <div className="text-xs text-muted-foreground">Value: 50</div>
    </div>
  ),
}

export const WithSteps: Story = {
  render: () => (
    <div className="w-[360px] space-y-2">
      <Slider defaultValue={[10]} max={100} step={10} />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        {[0,10,20,30,40,50,60,70,80,90,100].map(n => <span key={n}>{n}</span>)}
      </div>
    </div>
  ),
}

export const WithTooltip: Story = {
  render: () => {
    const [value, setValue] = React.useState<number[]>([25])
    return (
      <div className="w-[360px] space-y-2">
        <div className="text-xs text-muted-foreground">Value: <span className="font-mono">{value[0]}</span></div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[360px]">
      <Slider defaultValue={[40]} max={100} disabled />
    </div>
  ),
}

export const DoubleRange: Story = {
  render: () => {
    const [range, setRange] = React.useState<number[]>([20, 80])
    return (
      <div className="w-[360px] space-y-2">
        <div className="text-xs">Min: {range[0]} — Max: {range[1]}</div>
        <Slider value={range} onValueChange={setRange} max={100} step={1} />
      </div>
    )
  },
}