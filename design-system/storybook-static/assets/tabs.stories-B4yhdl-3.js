import{j as e}from"./jsx-runtime-BTJTZTIL.js";import{T as t,a as u,b as r,c as a}from"./tabs-BIn5YI3t.js";import"./index-ChsGqxH_.js";import"./index-Cpz08K5n.js";import"./index-d1U86hin.js";import"./index-B3h1oP7g.js";import"./index-BEQVaB3b.js";import"./index-C4_fb9tD.js";import"./index-BP8S5wn3.js";import"./index-D3fljqLc.js";import"./index-BRq5TIsn.js";import"./index-e5GqZYSI.js";import"./index-CPyNx_2X.js";import"./utils-CDN07tui.js";const P={title:"Components/Tabs",component:t,parameters:{layout:"centered"},tags:["autodocs"]},s={render:()=>e.jsxs(t,{defaultValue:"account",className:"w-[400px]",children:[e.jsxs(u,{className:"grid w-full grid-cols-2",children:[e.jsx(r,{value:"account",children:"Account"}),e.jsx(r,{value:"password",children:"Password"})]}),e.jsx(a,{value:"account",children:e.jsxs("div",{className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Account Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Manage your account preferences and personal information."})]})}),e.jsx(a,{value:"password",children:e.jsxs("div",{className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Password Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Change your password and security settings."})]})})]})},n={render:()=>e.jsx(t,{defaultValue:"general",orientation:"vertical",className:"w-[500px]",children:e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs(u,{className:"flex flex-col space-y-2 w-[100px]",children:[e.jsx(r,{value:"general",children:"General"}),e.jsx(r,{value:"privacy",children:"Privacy"}),e.jsx(r,{value:"notifications",children:"Notifications"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx(a,{value:"general",children:e.jsxs("div",{className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"font-medium mb-2",children:"General Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Configure your general application preferences."})]})}),e.jsx(a,{value:"privacy",children:e.jsxs("div",{className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Privacy Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Control your privacy and data sharing preferences."})]})}),e.jsx(a,{value:"notifications",children:e.jsxs("div",{className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Notification Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Manage how you receive notifications and alerts."})]})})]})]})})};var o,i,d;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="w-[400px]">\r
      <TabsList className="grid w-full grid-cols-2">\r
        <TabsTrigger value="account">Account</TabsTrigger>\r
        <TabsTrigger value="password">Password</TabsTrigger>\r
      </TabsList>\r
      <TabsContent value="account">\r
        <div className="p-4 border rounded-md">\r
          <h3 className="font-medium mb-2">Account Settings</h3>\r
          <p className="text-sm text-muted-foreground">\r
            Manage your account preferences and personal information.\r
          </p>\r
        </div>\r
      </TabsContent>\r
      <TabsContent value="password">\r
        <div className="p-4 border rounded-md">\r
          <h3 className="font-medium mb-2">Password Settings</h3>\r
          <p className="text-sm text-muted-foreground">\r
            Change your password and security settings.\r
          </p>\r
        </div>\r
      </TabsContent>\r
    </Tabs>
}`,...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var c,l,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="general" orientation="vertical" className="w-[500px]">\r
      <div className="flex space-x-4">\r
        <TabsList className="flex flex-col space-y-2 w-[100px]">\r
          <TabsTrigger value="general">General</TabsTrigger>\r
          <TabsTrigger value="privacy">Privacy</TabsTrigger>\r
          <TabsTrigger value="notifications">Notifications</TabsTrigger>\r
        </TabsList>\r
        <div className="flex-1">\r
          <TabsContent value="general">\r
            <div className="p-4 border rounded-md">\r
              <h3 className="font-medium mb-2">General Settings</h3>\r
              <p className="text-sm text-muted-foreground">\r
                Configure your general application preferences.\r
              </p>\r
            </div>\r
          </TabsContent>\r
          <TabsContent value="privacy">\r
            <div className="p-4 border rounded-md">\r
              <h3 className="font-medium mb-2">Privacy Settings</h3>\r
              <p className="text-sm text-muted-foreground">\r
                Control your privacy and data sharing preferences.\r
              </p>\r
            </div>\r
          </TabsContent>\r
          <TabsContent value="notifications">\r
            <div className="p-4 border rounded-md">\r
              <h3 className="font-medium mb-2">Notification Settings</h3>\r
              <p className="text-sm text-muted-foreground">\r
                Manage how you receive notifications and alerts.\r
              </p>\r
            </div>\r
          </TabsContent>\r
        </div>\r
      </div>\r
    </Tabs>
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const V=["Default","Vertical"];export{s as Default,n as Vertical,V as __namedExportsOrder,P as default};
