import{j as l}from"./jsx-runtime-BTJTZTIL.js";import{r as j}from"./index-Cpz08K5n.js";import{c as L}from"./utils-CDN07tui.js";import"./index-ChsGqxH_.js";const e=j.forwardRef(({className:n,...w},N)=>l.jsx("textarea",{className:L("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",n),ref:N,...w}));e.displayName="Textarea";try{e.displayName="Textarea",e.__docgenInfo={description:"",displayName:"Textarea",props:{}}}catch{}const F={title:"Components/Textarea",component:e,parameters:{layout:"centered"},tags:["autodocs"]},r={args:{placeholder:"Type your message here..."}},a={render:()=>l.jsxs("div",{className:"grid w-full gap-2",children:[l.jsx("label",{htmlFor:"message",children:"Your Message"}),l.jsx(e,{id:"message",placeholder:"Type your message here..."})]})},s={args:{disabled:!0,placeholder:"This textarea is disabled"}},t={args:{value:"This is a pre-filled textarea with some text content."}},o={args:{placeholder:"Large textarea for longer content...",className:"min-h-[200px]"}};var c,d,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type your message here...'
  }
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var p,m,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="grid w-full gap-2">\r
      <label htmlFor="message">Your Message</label>\r
      <Textarea id="message" placeholder="Type your message here..." />\r
    </div>
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,x,h;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'This textarea is disabled'
  }
}`,...(h=(x=s.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var f,b,y;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    value: 'This is a pre-filled textarea with some text content.'
  }
}`,...(y=(b=t.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var T,_,v;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    placeholder: 'Large textarea for longer content...',
    className: 'min-h-[200px]'
  }
}`,...(v=(_=o.parameters)==null?void 0:_.docs)==null?void 0:v.source}}};const M=["Default","WithLabel","Disabled","WithValue","LargeTextarea"];export{r as Default,s as Disabled,o as LargeTextarea,a as WithLabel,t as WithValue,M as __namedExportsOrder,F as default};
