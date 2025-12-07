import{j as e}from"./jsx-runtime-BTJTZTIL.js";import{r as t}from"./index-Cpz08K5n.js";import{C as y}from"./card-a6ibfBWk.js";import{I as p}from"./input-BgHH4hTc.js";import{B as L}from"./button-CkF7J_oo.js";import{c as x}from"./createLucideIcon-K2cgTG6C.js";import"./index-ChsGqxH_.js";import"./utils-CDN07tui.js";import"./index-B5OwL9-E.js";import"./index-C4_fb9tD.js";import"./index-C2vczdB5.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],P=x("eye-off",F);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],z=x("eye",M);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],U=x("log-in",R);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],I=x("mail",B),Q={title:"Examples/Login Form",component:y,parameters:{layout:"fullscreen"},tags:["autodocs"]},c={render:()=>{const[m,g]=t.useState(""),[o,v]=t.useState(""),[b,h]=t.useState(!1),[a,n]=t.useState(null),[i,f]=t.useState(!1),[l,d]=t.useState("none"),w=s=>{s.preventDefault(),n(null);const r=m.trim().toLowerCase();n(r==="admin"&&o==="admin"?"Login successful! (Demo mode)":"Invalid credentials. Use email admin and password admin.")};return e.jsx("div",{className:"login-bg w-full min-h-screen grid place-items-center px-4 sm:px-8 py-6 sm:py-8 m-auto",style:{backgroundImage:"url('/image.png')"},children:e.jsxs(y,{className:"w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-2xl bg-background/70 backdrop-blur-md border border-border shadow-xl",animated:!0,children:[e.jsxs("div",{className:"flex flex-col items-center gap-3 mt-2 sm:mt-3",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"/logo.svg",alt:"Pharma Coop logo",width:180,height:106,className:"object-contain"})}),e.jsx("div",{className:"h-[2px] w-20 bg-primary/30 rounded-full"})]}),a&&e.jsx("div",{className:`mt-4 rounded-md px-3 py-2 text-sm ${a.includes("successful")?"bg-green-500/10 text-green-600":"bg-destructive/10 text-destructive"}`,role:"alert",children:a}),e.jsxs("form",{onSubmit:w,className:"mt-5 sm:mt-6 space-y-4 sm:space-y-5",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-foreground mb-2",children:"Email"}),e.jsxs("div",{className:"relative",children:[e.jsx(p,{"aria-label":"Email or Username",type:"text",value:m,onChange:s=>{const r=s.target.value;g(r),r.includes("@")?d(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?"valid":"invalid"):d("none")},className:l==="invalid"?"aria-invalid pl-10":"pl-10",placeholder:"email@domaine.com"}),e.jsx(I,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",size:18,style:{}}),l==="valid"&&e.jsx("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-green-600",children:"✓"}),l==="invalid"&&e.jsx("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-destructive",children:"!"})]}),l==="invalid"&&e.jsx("p",{className:"mt-1 text-sm text-destructive",children:"Format d'email invalide"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-foreground mb-2",children:"Mot de passe"}),e.jsxs("div",{className:"relative",children:[e.jsx(p,{type:i?"text":"password",value:o,onChange:s=>v(s.target.value),className:a?"aria-invalid pr-12":"pr-12",placeholder:"admin"}),e.jsx("button",{type:"button",onClick:()=>f(s=>!s),"aria-label":i?"Hide password":"Show password",className:"absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-primary",children:i?e.jsx(P,{size:18,style:{}}):e.jsx(z,{size:18,style:{}})})]}),a&&!a.includes("successful")&&e.jsx("p",{className:"mt-1 text-sm text-destructive",children:"Échec de connexion. Vérifiez votre mot de passe."})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{id:"remember",type:"checkbox",checked:b,onChange:s=>h(s.target.checked),className:"h-4 w-4 border-input"}),e.jsx("label",{htmlFor:"remember",className:"text-sm text-muted-foreground",children:"Se souvenir de moi"})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("a",{href:"#",className:"text-sm text-primary",children:"Mot de passe oublié ?"})}),e.jsxs(L,{type:"submit",animated:!0,className:"mt-2 w-full rounded-lg p-3 font-medium inline-flex items-center gap-2",children:[e.jsx(U,{size:18,style:{}}),"Se connecter"]})]})]})})}},u={name:"Login Form with Brand Logo",render:()=>{const[m,g]=t.useState(""),[o,v]=t.useState(""),[b,h]=t.useState(!1),[a,n]=t.useState(null),[i,f]=t.useState(!1),[l,d]=t.useState("none"),w=s=>{s.preventDefault(),n(null);const r=m.trim().toLowerCase();n(r==="admin"&&o==="admin"?"✅ Login successful! (Demo mode)":"❌ Invalid credentials. Use email admin and password admin.")};return e.jsx("div",{className:"login-bg w-full min-h-screen grid place-items-center px-4 sm:px-8 py-6 sm:py-8 m-auto",style:{backgroundImage:"url('/image.png')"},children:e.jsxs(y,{className:"w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-2xl bg-background/70 backdrop-blur-md border border-border shadow-xl",animated:!0,children:[e.jsxs("div",{className:"flex flex-col items-center gap-3 mt-2 sm:mt-3",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"/Brand.svg",alt:"Brand Logo",width:200,height:80,className:"object-contain"})}),e.jsx("div",{className:"h-[2px] w-20 bg-primary/30 rounded-full"})]}),a&&e.jsx("div",{className:`mt-4 rounded-md px-3 py-2 text-sm animate-pulse ${a.includes("successful")?"bg-green-500/10 text-green-600 border border-green-500/20":"bg-destructive/10 text-destructive border border-destructive/20"}`,role:"alert",children:a}),e.jsxs("form",{onSubmit:w,className:"mt-5 sm:mt-6 space-y-4 sm:space-y-5",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-foreground mb-2",children:"Email"}),e.jsxs("div",{className:"relative",children:[e.jsx(p,{"aria-label":"Email or Username",type:"text",value:m,onChange:s=>{const r=s.target.value;g(r),r.includes("@")?d(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?"valid":"invalid"):d("none")},className:l==="invalid"?"aria-invalid pl-10":"pl-10",placeholder:"email@domaine.com"}),e.jsx(I,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",size:18,style:{}}),l==="valid"&&e.jsx("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-green-600 animate-bounce",children:"✓"}),l==="invalid"&&e.jsx("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-destructive animate-pulse",children:"!"})]}),l==="invalid"&&e.jsx("p",{className:"mt-1 text-sm text-destructive",children:"Format d'email invalide"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-foreground mb-2",children:"Mot de passe"}),e.jsxs("div",{className:"relative",children:[e.jsx(p,{type:i?"text":"password",value:o,onChange:s=>v(s.target.value),className:a?"aria-invalid pr-12":"pr-12",placeholder:"admin"}),e.jsx("button",{type:"button",onClick:()=>f(s=>!s),"aria-label":i?"Hide password":"Show password",className:"absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-primary hover:bg-primary/10 transition-colors",children:i?e.jsx(P,{size:18}):e.jsx(z,{size:18})})]}),a&&!a.includes("successful")&&e.jsx("p",{className:"mt-1 text-sm text-destructive",children:"Échec de connexion. Vérifiez votre mot de passe."})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{id:"remember",type:"checkbox",checked:b,onChange:s=>h(s.target.checked),className:"h-4 w-4 border-input rounded"}),e.jsx("label",{htmlFor:"remember",className:"text-sm text-muted-foreground",children:"Se souvenir de moi"})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("a",{href:"#",className:"text-sm text-primary hover:underline",children:"Mot de passe oublié ?"})}),e.jsxs(L,{type:"submit",animated:!0,className:"mt-2 w-full rounded-lg p-3 font-medium inline-flex items-center gap-2",children:[e.jsx(U,{size:18}),"Se connecter"]})]})]})})}};var N,j,S;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"none" | "valid" | "invalid">("none");
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const user = emailOrUsername.trim().toLowerCase();
      if (user === "admin" && password === "admin") {
        setError("Login successful! (Demo mode)");
      } else {
        setError("Invalid credentials. Use email admin and password admin.");
      }
    };
    return <div className="login-bg w-full min-h-screen grid place-items-center px-4 sm:px-8 py-6 sm:py-8 m-auto" style={{
      backgroundImage: "url('/image.png')"
    }}>\r
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-2xl bg-background/70 backdrop-blur-md border border-border shadow-xl" animated>\r
          <div className="flex flex-col items-center gap-3 mt-2 sm:mt-3">\r
            <div className="logo">\r
              <img src="/logo.svg" alt="Pharma Coop logo" width={180} height={106} className="object-contain" />\r
            </div>\r
            <div className="h-[2px] w-20 bg-primary/30 rounded-full" />\r
          </div>\r
          {error && <div className={\`mt-4 rounded-md px-3 py-2 text-sm \${error.includes("successful") ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}\`} role="alert">{error}</div>}\r
          <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">\r
            <div>\r
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>\r
              <div className="relative">\r
                <Input aria-label="Email or Username" type="text" value={emailOrUsername} onChange={e => {
                const val = e.target.value;
                setEmailOrUsername(val);
                if (val.includes("@")) {
                  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                  setEmailStatus(emailRegex.test(val) ? "valid" : "invalid");
                } else {
                  setEmailStatus("none");
                }
              }} className={emailStatus === "invalid" ? "aria-invalid pl-10" : "pl-10"} placeholder="email@domaine.com" />\r
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} style={{}} />\r
                {emailStatus === "valid" && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">✓</span>}\r
                {emailStatus === "invalid" && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">!</span>}\r
              </div>\r
              {emailStatus === "invalid" && <p className="mt-1 text-sm text-destructive">Format d'email invalide</p>}\r
            </div>\r
            <div>\r
              <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>\r
              <div className="relative">\r
                <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className={error ? "aria-invalid pr-12" : "pr-12"} placeholder="admin" />\r
                <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-primary">\r
                  {showPassword ? <EyeOff size={18} style={{}} /> : <Eye size={18} style={{}} />}\r
                </button>\r
              </div>\r
              {error && !error.includes("successful") && <p className="mt-1 text-sm text-destructive">Échec de connexion. Vérifiez votre mot de passe.</p>}\r
            </div>\r
            <div className="flex items-center gap-2">\r
              <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 border-input" />\r
              <label htmlFor="remember" className="text-sm text-muted-foreground">Se souvenir de moi</label>\r
            </div>\r
            <div className="flex justify-end">\r
              <a href="#" className="text-sm text-primary">Mot de passe oublié ?</a>\r
            </div>\r
            <Button type="submit" animated className="mt-2 w-full rounded-lg p-3 font-medium inline-flex items-center gap-2">\r
              <LogIn size={18} style={{}} />\r
              Se connecter\r
            </Button>\r
          </form>\r
        </Card>\r
      </div>;
  }
}`,...(S=(j=c.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var k,E,C;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: 'Login Form with Brand Logo',
  render: () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"none" | "valid" | "invalid">("none");
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const user = emailOrUsername.trim().toLowerCase();
      if (user === "admin" && password === "admin") {
        setError("✅ Login successful! (Demo mode)");
      } else {
        setError("❌ Invalid credentials. Use email admin and password admin.");
      }
    };
    return <div className="login-bg w-full min-h-screen grid place-items-center px-4 sm:px-8 py-6 sm:py-8 m-auto" style={{
      backgroundImage: "url('/image.png')"
    }}>\r
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-2xl bg-background/70 backdrop-blur-md border border-border shadow-xl" animated>\r
          <div className="flex flex-col items-center gap-3 mt-2 sm:mt-3">\r
            <div className="logo">\r
              <img src="/Brand.svg" alt="Brand Logo" width={200} height={80} className="object-contain" />\r
            </div>\r
            <div className="h-[2px] w-20 bg-primary/30 rounded-full" />\r
          </div>\r
          {error && <div className={\`mt-4 rounded-md px-3 py-2 text-sm animate-pulse \${error.includes("successful") ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"}\`} role="alert">{error}</div>}\r
          <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">\r
            <div>\r
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>\r
              <div className="relative">\r
                <Input aria-label="Email or Username" type="text" value={emailOrUsername} onChange={e => {
                const val = e.target.value;
                setEmailOrUsername(val);
                if (val.includes("@")) {
                  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                  setEmailStatus(emailRegex.test(val) ? "valid" : "invalid");
                } else {
                  setEmailStatus("none");
                }
              }} className={emailStatus === "invalid" ? "aria-invalid pl-10" : "pl-10"} placeholder="email@domaine.com" />\r
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} style={{}} />\r
                {emailStatus === "valid" && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 animate-bounce">✓</span>}\r
                {emailStatus === "invalid" && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive animate-pulse">!</span>}\r
              </div>\r
              {emailStatus === "invalid" && <p className="mt-1 text-sm text-destructive">Format d'email invalide</p>}\r
            </div>\r
            <div>\r
              <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>\r
              <div className="relative">\r
                <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className={error ? "aria-invalid pr-12" : "pr-12"} placeholder="admin" />\r
                <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-primary hover:bg-primary/10 transition-colors">\r
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}\r
                </button>\r
              </div>\r
              {error && !error.includes("successful") && <p className="mt-1 text-sm text-destructive">Échec de connexion. Vérifiez votre mot de passe.</p>}\r
            </div>\r
            <div className="flex items-center gap-2">\r
              <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 border-input rounded" />\r
              <label htmlFor="remember" className="text-sm text-muted-foreground">Se souvenir de moi</label>\r
            </div>\r
            <div className="flex justify-end">\r
              <a href="#" className="text-sm text-primary hover:underline">Mot de passe oublié ?</a>\r
            </div>\r
            <Button type="submit" animated className="mt-2 w-full rounded-lg p-3 font-medium inline-flex items-center gap-2">\r
              <LogIn size={18} />\r
              Se connecter\r
            </Button>\r
          </form>\r
        </Card>\r
      </div>;
  }
}`,...(C=(E=u.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};const T=["LoginForm","LoginFormWithBrand"];export{c as LoginForm,u as LoginFormWithBrand,T as __namedExportsOrder,Q as default};
