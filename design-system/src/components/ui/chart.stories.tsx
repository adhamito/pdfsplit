import type { Meta, StoryObj } from '@storybook/react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './chart'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const meta: Meta<typeof ChartContainer> = {
  title: 'Components/Charts',
  component: ChartContainer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { name: 'Jan', uv: 400, pv: 240, amt: 240 },
  { name: 'Feb', uv: 300, pv: 139, amt: 221 },
  { name: 'Mar', uv: 200, pv: 980, amt: 229 },
  { name: 'Apr', uv: 278, pv: 390, amt: 200 },
  { name: 'May', uv: 189, pv: 480, amt: 218 },
]

const config = {
  uv: { label: 'UV', color: 'hsl(var(--primary))' },
  pv: { label: 'PV', color: 'hsl(var(--sidebar-accent))' },
} as const

export const LineChartStory: Story = {
  render: () => (
    <ChartContainer config={config}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="uv" stroke="var(--color-uv)" />
        <Line type="monotone" dataKey="pv" stroke="var(--color-pv)" />
      </LineChart>
    </ChartContainer>
  ),
}

export const BarChartStory: Story = {
  render: () => (
    <ChartContainer config={config}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="uv" fill="var(--color-uv)" />
        <Bar dataKey="pv" fill="var(--color-pv)" />
      </BarChart>
    </ChartContainer>
  ),
}

export const PieChartStory: Story = {
  render: () => (
    <ChartContainer config={config}>
      <PieChart>
        <Pie data={data} dataKey="uv" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? 'var(--color-uv)' : 'var(--color-pv)'} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  ),
}