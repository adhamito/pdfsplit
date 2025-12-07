import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

const meta: Meta = {
  title: 'Patterns/Authentication/Register',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [showPw, setShowPw] = React.useState(false)
    const [showPw2, setShowPw2] = React.useState(false)
    const [terms, setTerms] = React.useState(false)
    return (
      <div className="relative min-h-[620px] w-full">
        <img
          src="image.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        <div className="relative z-10 grid min-h-[620px] place-items-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="w-[480px] rounded-2xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <img src="/logo.svg" alt="DAWA MAGHREB" className="mx-auto h-auto w-1/2" />
                  
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="name">Nom</Label>
                    <InputGroup>
                      <InputGroupAddon>
                        <FiUser />
                      </InputGroupAddon>
                      <InputGroupInput id="name" placeholder="Nom" />
                    </InputGroup>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <InputGroup>
                      <InputGroupAddon>
                        <FiMail />
                      </InputGroupAddon>
                      <InputGroupInput id="email" placeholder="Email" />
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
                        type={showPw ? 'text' : 'password'}
                        placeholder="Mot de passe"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton aria-label="Afficher le mot de passe" onClick={() => setShowPw((v) => !v)}>
                          {showPw ? <FiEyeOff /> : <FiEye />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password2">Confirmer le mot de passe</Label>
                    <InputGroup>
                      <InputGroupAddon>
                        <FiLock />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password2"
                        type={showPw2 ? 'text' : 'password'}
                        placeholder="Confirmer le mot de passe"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton aria-label="Afficher le mot de passe" onClick={() => setShowPw2((v) => !v)}>
                          {showPw2 ? <FiEyeOff /> : <FiEye />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={terms} onCheckedChange={(v:any)=>setTerms(!!v)} id="terms" />
                    <Label htmlFor="terms" className="text-sm">J'accepte les conditions</Label>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button className="w-full h-10 rounded-lg bg-teal-700 hover:bg-teal-600">S'inscrire</Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  },
}