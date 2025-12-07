import{j as l}from"./jsx-runtime-BTJTZTIL.js";import{I as F}from"./input-BgHH4hTc.js";import"./index-ChsGqxH_.js";import"./index-Cpz08K5n.js";import"./utils-CDN07tui.js";const W={title:"Components/Input",component:F,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:{type:"select"},options:["text","email","password","number","tel","url","search"]},placeholder:{control:"text"},disabled:{control:"boolean"}}},e={args:{placeholder:"Enter text..."}},r={args:{type:"email",placeholder:"Enter your email"}},a={args:{type:"password",placeholder:"Enter your password"}},s={render:()=>l.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[l.jsx("label",{htmlFor:"email",children:"Email"}),l.jsx(F,{type:"email",id:"email",placeholder:"Email"})]})},o={args:{disabled:!0,placeholder:"Disabled input"}},t={args:{type:"file"}};var n,p,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,i,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    type: 'email',
    placeholder: 'Enter your email'
  }
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,g,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter your password'
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,b,E;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">\r
      <label htmlFor="email">Email</label>\r
      <Input type="email" id="email" placeholder="Email" />\r
    </div>
}`,...(E=(b=s.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var x,w,f;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input'
  }
}`,...(f=(w=o.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var D,S,j;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    type: 'file'
  }
}`,...(j=(S=t.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};const _=["Default","Email","Password","WithLabel","Disabled","File"];export{e as Default,o as Disabled,r as Email,t as File,a as Password,s as WithLabel,_ as __namedExportsOrder,W as default};
