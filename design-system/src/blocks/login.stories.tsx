import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

const meta: Meta = {
  title: 'Patterns/Authentication/Login',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [remember, setRemember] = React.useState(true)
    return (
      <div className="relative min-h-[620px] w-full">
        <img
          src="/image.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        <div className="relative z-10 grid min-h-[620px] place-items-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="w-[440px] rounded-2xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5">
              <div className="space-y-4">
                <div className="text-center space-y-2 px-4">
                  <img src="/logo.svg" alt="DAWA MAGHREB" className="mx-auto h-auto w-1/2" />
                  
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <InputGroup>
                      <InputGroupAddon>
                        <FiMail />
                      </InputGroupAddon>
                      <InputGroupInput id="email" placeholder="Email" defaultValue="admin" />
                    </InputGroup>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Mot de passe</Label>
                    <InputGroup>
                      <InputGroupAddon>
                        <FiLock />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe"
                        defaultValue="•••••"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton aria-label="Afficher le mot de passe" onClick={() => setShowPassword((v) => !v)}>
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={remember} onCheckedChange={(v:any)=>setRemember(!!v)} id="remember" />
                      <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
                    </div>
                    <Button variant="link" className="text-sm p-0">Mot de passe oublié ?</Button>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button className="w-full h-10 rounded-lg bg-teal-700 hover:bg-teal-600">Se connecter</Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  },
}