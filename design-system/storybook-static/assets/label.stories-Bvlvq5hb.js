import{j as e}from"./jsx-runtime-BTJTZTIL.js";import{L as i}from"./label-DdllTzeE.js";import{I as l}from"./input-BgHH4hTc.js";import"./index-ChsGqxH_.js";import"./index-Cpz08K5n.js";import"./index-BfIVvxkU.js";import"./index-D3fljqLc.js";import"./index-BRq5TIsn.js";import"./index-B5OwL9-E.js";import"./index-C4_fb9tD.js";import"./index-C2vczdB5.js";import"./utils-CDN07tui.js";const R={title:"Components/Label",component:i,parameters:{layout:"centered"},tags:["autodocs"]},r={args:{children:"Label"}},a={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(i,{htmlFor:"name",children:"Name"}),e.jsx(l,{type:"text",id:"name",placeholder:"Enter your name"})]})},s={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(i,{htmlFor:"email",children:"Email *"}),e.jsx(l,{type:"email",id:"email",placeholder:"Enter your email",required:!0})]})},t={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(i,{htmlFor:"disabled",children:"Disabled Field"}),e.jsx(l,{type:"text",id:"disabled",placeholder:"Disabled input",disabled:!0})]})};var m,d,o;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Label'
  }
}`,...(o=(d=r.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};var n,p,c;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">\r
      <Label htmlFor="name">Name</Label>\r
      <Input type="text" id="name" placeholder="Enter your name" />\r
    </div>
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,x,b;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">\r
      <Label htmlFor="email">Email *</Label>\r
      <Input type="email" id="email" placeholder="Enter your email" required />\r
    </div>
}`,...(b=(x=s.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var h,g,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">\r
      <Label htmlFor="disabled">Disabled Field</Label>\r
      <Input type="text" id="disabled" placeholder="Disabled input" disabled />\r
    </div>
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const W=["Default","WithInput","Required","Disabled"];export{r as Default,t as Disabled,s as Required,a as WithInput,W as __namedExportsOrder,R as default};
