import type { Meta, StoryObj } from '@storybook/react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, LineChart, Line, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Patterns/Charts Advanced',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const radarData = [
  { subject: 'Qualité', A: 120 },
  { subject: 'Vitesse', A: 98 },
  { subject: 'Fiabilité', A: 86 },
  { subject: 'Coût', A: 99 },
]

export const RadarChartStory: Story = {
  render: () => (
    <ChartContainer config={{ A: { label: 'Score', color: 'hsl(var(--primary))' } }}>
      <RadarChart cx="50%" cy="50%" outerRadius={80} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="A" dataKey="A" stroke="var(--color-A)" fill="var(--color-A)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  ),
}

export const ProgressRing: Story = {
  render: () => (
    <Card className="w-[240px] p-4 text-center">
      <svg viewBox="0 0 36 36" className="mx-auto h-24 w-24">
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-muted)" strokeWidth="2" />
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="75, 100" />
      </svg>
      <div className="mt-2 text-sm">75%</div>
    </Card>
  ),
}

export const Sparkline: Story = {
  render: () => (
    <ChartContainer config={{ val: { label: 'val', color: 'hsl(var(--primary))' } }}>
      <LineChart width={240} height={80} data={[{val:1},{val:2},{val:1.2},{val:3},{val:2.4}] as any}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="val" stroke="var(--color-val)" dot={false} />
      </LineChart>
    </ChartContainer>
  ),
}

export const Heatmap: Story = {
  render: () => {
    const rows = 7
    const cols = 12
    const cells: JSX.Element[] = []
    for (let ri = 0; ri < rows; ri++) {
      for (let ci = 0; ci < cols; ci++) {
        const v = Math.round(Math.random() * 5)
        const lightness = 92 - v * 10
        cells.push(
          <div key={`${ri}-${ci}`} className="h-4 rounded" style={{ backgroundColor: `hsl(200 70% ${lightness}%)` }} />
        )
      }
    }
    return (
      <div className="w-[720px] space-y-2">
        <div className="text-sm text-muted-foreground">Activité (heures × jours)</div>
        <div className="grid grid-cols-12 gap-1">
          {cells}
        </div>
      </div>
    )
  },
}

export const KPIWithSparkline: Story = {
  render: () => (
    <div className="grid w-[720px] grid-cols-3 gap-4">
      {[{label:'Ventes',data:[2,3,2.4,3.5,4]},{label:'Clients',data:[1,1.4,1.6,1.2,1.8]},{label:'Panier',data:[120,140,130,150,160]}].map((k, i) => (
        <Card key={i} className="p-4">
          <div className="text-sm text-muted-foreground">{k.label}</div>
          <div className="mt-1 text-xl font-semibold">{k.data[k.data.length-1]}</div>
          <ChartContainer config={{ s: { label: k.label, color: 'hsl(var(--primary))' } }}>
            <LineChart width={240} height={60} data={k.data.map(v=>({s:v})) as any}>
              <Line dataKey="s" stroke="var(--color-s)" dot={false} />
            </LineChart>
          </ChartContainer>
        </Card>
      ))}
    </div>
  ),
}

export const BarLineCombo: Story = {
  render: () => (
    <ChartContainer config={{ uv:{label:'UV', color:'hsl(var(--primary))'}, pv:{label:'PV', color:'hsl(var(--sidebar-accent))'} }}>
      <ComposedChart data={[{name:'Jan',uv:400,pv:240},{name:'Feb',uv:300,pv:139},{name:'Mar',uv:200,pv:980},{name:'Apr',uv:278,pv:390}] as any}>
        <XAxis dataKey="name" /><YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="pv" fill="var(--color-pv)" />
        <Line dataKey="uv" stroke="var(--color-uv)" />
      </ComposedChart>
    </ChartContainer>
  ),
}