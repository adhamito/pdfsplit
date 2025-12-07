import{j as e}from"./jsx-runtime-BTJTZTIL.js";import{r as d}from"./index-Cpz08K5n.js";import{c as N}from"./index-C2vczdB5.js";import{c as p}from"./utils-CDN07tui.js";import"./index-ChsGqxH_.js";const j=N("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),t=d.forwardRef(({className:r,variant:n,...i},y)=>e.jsx("div",{ref:y,role:"alert",className:p(j({variant:n}),r),...i}));t.displayName="Alert";const a=d.forwardRef(({className:r,...n},i)=>e.jsx("h5",{ref:i,className:p("mb-1 font-medium leading-none tracking-tight",r),...n}));a.displayName="AlertTitle";const s=d.forwardRef(({className:r,...n},i)=>e.jsx("div",{ref:i,className:p("text-sm [&_p]:leading-relaxed",r),...n}));s.displayName="AlertDescription";try{t.displayName="Alert",t.__docgenInfo={description:"",displayName:"Alert",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"default" | "destructive" | null | undefined'}}}}}catch{}try{a.displayName="AlertTitle",a.__docgenInfo={description:"",displayName:"AlertTitle",props:{}}}catch{}try{s.displayName="AlertDescription",s.__docgenInfo={description:"",displayName:"AlertDescription",props:{}}}catch{}const I={title:"Components/Alert",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={render:()=>e.jsxs(t,{children:[e.jsx(a,{children:"Heads up!"}),e.jsx(s,{children:"You can add components to your app using the cli."})]})},l={render:()=>e.jsxs(t,{variant:"destructive",children:[e.jsx(a,{children:"Error"}),e.jsx(s,{children:"Your session has expired. Please log in again."})]})},c={render:()=>e.jsx(t,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-lg",children:"📢"}),e.jsxs("div",{children:[e.jsx(a,{children:"Announcement"}),e.jsx(s,{children:"New features are now available in your dashboard."})]})]})})};var u,m,v;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Alert>\r
      <AlertTitle>Heads up!</AlertTitle>\r
      <AlertDescription>\r
        You can add components to your app using the cli.\r
      </AlertDescription>\r
    </Alert>
}`,...(v=(m=o.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var g,x,A;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Alert variant="destructive">\r
      <AlertTitle>Error</AlertTitle>\r
      <AlertDescription>\r
        Your session has expired. Please log in again.\r
      </AlertDescription>\r
    </Alert>
}`,...(A=(x=l.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var f,_,h;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Alert>\r
      <div className="flex items-center gap-2">\r
        <span className="text-lg">📢</span>\r
        <div>\r
          <AlertTitle>Announcement</AlertTitle>\r
          <AlertDescription>\r
            New features are now available in your dashboard.\r
          </AlertDescription>\r
        </div>\r
      </div>\r
    </Alert>
}`,...(h=(_=c.parameters)==null?void 0:_.docs)==null?void 0:h.source}}};const R=["Default","Destructive","WithIcon"];export{o as Default,l as Destructive,c as WithIcon,R as __namedExportsOrder,I as default};
