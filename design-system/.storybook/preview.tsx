import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'
import { ThemeProvider } from 'next-themes'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Components',
          ['Button', 'Card', 'Input', 'Label', 'Badge', 'Avatar', 'Alert', 'Checkbox', 'Dialog', 'Select', 'Switch', 'Tabs', 'Progress', 'Textarea', '*'],
          'Examples',
          ['Login Form', 'Complete Form', 'Dashboard', '*'],
          'Patterns',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview