import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption, TableFooter } from './table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#1024</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Processing</TableCell>
          <TableCell>$120.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#1023</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Completed</TableCell>
          <TableCell>$89.50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#1022</TableCell>
          <TableCell>Ahmed Ali</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>$42.10</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>$251.60</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}