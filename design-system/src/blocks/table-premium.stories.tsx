import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const meta: Meta = {
  title: 'Patterns/Table Premium',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

type Row = { id: number; name: string; price: number }
const data: Row[] = [
  { id: 1, name: 'Produit A', price: 12 },
  { id: 2, name: 'Produit B', price: 22 },
  { id: 3, name: 'Produit C', price: 18 },
]

export const SortSelectPaginate: Story = {
  render: () => {
    const [rows, setRows] = React.useState<Row[]>(data)
    const [selected, setSelected] = React.useState<number[]>([])
    const sortBy = (key: keyof Row) => setRows(r => [...r].sort((a,b)=> (a[key] as any) > (b[key] as any) ? 1 : -1))
    const toggle = (id: number) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id])
    return (
      <div className="w-[640px]">
        <div className="mb-2 flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={()=>setRows(data)}>Reset</Button>
          <Button size="sm" onClick={()=>sortBy('name')}>Sort Name</Button>
          <Button size="sm" onClick={()=>sortBy('price')}>Sort Price</Button>
          {selected.length>0 && <Button size="sm" variant="destructive">Delete ({selected.length})</Button>}
        </div>
        <div className="max-h-64 overflow-auto rounded border">
          <Table>
            <TableHeader>
              <TableRow className="sticky top-0 bg-background">
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(r => (
                <TableRow key={r.id} onClick={()=>toggle(r.id)} data-state={selected.includes(r.id)?'selected':undefined}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
}