const { useState, useEffect } = React;

/* ───── Hash-based Router ───── */
function useHash() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}

/* ───── Color Tokens ───── */
const C = {
  bg:       "#faf9f6",
  bgAlt:    "#f3f0ea",
  bgCard:   "#ffffff",
  purple:   "#2d1b4e",
  purpleMid:"#4a3070",
  purpleLight:"#ede8f5",
  purplePale:"#f7f4fc",
  gold:     "#b8860b",
  goldBright:"#c9a84c",
  goldPale: "#fdf6e3",
  goldBorder:"#e8d5a0",
  text:     "#1a1a2e",
  textMid:  "#4a4460",
  textLight:"#7a7090",
  white:    "#ffffff",
  green:    "#2e7d52",
  red:      "#c0392b",
  divider:  "#e8e2d8",
};

/* ───── Shared Styles ───── */
const S = {
  section: { padding:"80px 48px", borderBottom:`1px solid ${C.divider}` },
  sectionAlt: { background:C.bgAlt, padding:"80px 48px", borderBottom:`1px solid ${C.divider}` },
  inner: { maxWidth:"920px", margin:"0 auto" },
  label: { fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.gold, letterSpacing:"3px", marginBottom:"12px", fontWeight:700 },
  h2: { fontFamily:"Playfair Display,Georgia,serif", fontSize:"clamp(28px,4vw,46px)", color:C.purple, margin:"0 0 12px", lineHeight:1.2 },
  body: { fontFamily:"Inter,sans-serif", color:C.textMid, fontSize:"16px", lineHeight:1.8, maxWidth:"640px" },
  card: { background:C.white, padding:"32px", boxShadow:"0 2px 12px rgba(45,27,78,0.06)", borderTop:`3px solid ${C.gold}` },
  btnPrimary: { background:C.purple, color:C.white, padding:"14px 32px", fontFamily:"Inter,sans-serif", fontWeight:700, fontSize:"14px", letterSpacing:"0.5px", borderRadius:"2px", cursor:"pointer", border:"none" },
  btnSecondary: { background:"transparent", color:C.purple, border:`2px solid ${C.purple}`, padding:"14px 32px", fontFamily:"Inter,sans-serif", fontWeight:600, fontSize:"14px", borderRadius:"2px", cursor:"pointer" },
  breadcrumb: { fontFamily:"Inter,sans-serif", fontSize:"12px", color:C.textLight, marginBottom:"24px" },
};

/* ───── Data ───── */
const steps = [
  { key:"seeker", level:"01", title:"Seeker", price:"Free",
    tagline:"Wisdom begins with structure, not sentiment.",
    desc:"Recognize the order under which healthy building occurs. Civic literacy begins here — not with activism, but with understanding how law, governance, and inheritance function.",
    ot:"Deut. 4:5–8", nt:"Luke 14:28–30", civic:"Literacy & Foresight",
    otQ:"Observe them carefully, for this will show your wisdom and understanding to the nations.",
    ntQ:"Suppose one of you wants to build a tower. Will he not first sit down and estimate the cost?" },
  { key:"operator", level:"02", title:"Operator", price:"$27/mo",
    tagline:"Stewardship is proven in administration.",
    desc:"Faithfulness begins with competent handling of what is already entrusted. Household systems, records, budgets, and responsibilities — administered with integrity.",
    ot:"Deut. 19:14", nt:"Luke 16:10–12", civic:"Integrity & Administration",
    otQ:"Do not move your neighbor's boundary marker set up by your predecessors.",
    ntQ:"Whoever can be trusted with very little can also be trusted with much." },
  { key:"architect", level:"03", title:"Architect", price:"$97/mo",
    tagline:"Legacy requires design, not hope.",
    desc:"A mature household structures succession, witnesses transfers, and plans for continuity. The daughters of Zelophehad made a lawful claim. Ruth's redemption was witnessed at the gate.",
    ot:"Num. 27:1–11", nt:"Gal. 4:1–2", civic:"Lawful Succession",
    otQ:"Why should our father's name disappear from his clan? Give us property among our father's relatives.",
    ntQ:"The heir is subject to guardians and trustees until the time set by his father." },
  { key:"steward", level:"04", title:"Steward", price:"$197/mo",
    tagline:"Public trust is part of spiritual maturity.",
    desc:"Stewardship is fiduciary. It includes accountability before God and credibility before people. Govern for others, not only self.",
    ot:"Ruth 4:1–12", nt:"2 Cor. 8:20–21", civic:"Public Accountability",
    otQ:"Boaz said to the elders and all the people, 'You are witnesses today.'",
    ntQ:"We are taking pains to do what is right, not only in the eyes of the Lord but also in the eyes of man." },
];

const personas = [
  { label:"Overtime Worker", icon:"👷",
    has:["Consistent income","Strong work ethic","Family responsibility"],
    lacks:["Legal map for assets","Succession plan","Civic framework"],
    ot:"1 Tim. 5:8", nt:"Titus 3:14",
    quote:"He provides. But provision without structure leaves the next generation exposed." },
  { label:"Dual Income Family", icon:"👨\u200d👩\u200d👧",
    has:["Two incomes","High responsibility","Community presence"],
    lacks:["Transfer planning","Entity protection","Governance design"],
    ot:"Num. 36:1–12", nt:"Luke 16:10–12",
    quote:"They built together. But without order, what they built cannot be passed on intact." },
  { label:"First-Gen Builder", icon:"🏗️",
    has:["Asset growth","Entrepreneurial drive","Vision for legacy"],
    lacks:["Protection architecture","Legal literacy","Succession structure"],
    ot:"Ruth 4:1–12", nt:"Gal. 4:1–2",
    quote:"First generation builds. Without structure, the second generation inherits confusion." },
];

const pillars = [
  { icon:"⚖️", title:"Civic Literacy", ot:"Deut. 4:5–8", nt:"Luke 14:28–30",
    quote:"Statutes and judgments as public wisdom before the nations.",
    body:"Understand how law, governance, and civic institutions function — not as abstract theory, but as the operating system of ordered community life.",
    modules:["Constitutional foundations","Local governance structures","Civic rights and duties","Public accountability systems"] },
  { icon:"🏛️", title:"Financial Structure", ot:"Deut. 19:14", nt:"Luke 16:10–12",
    quote:"Do not move your neighbor's boundary marker.",
    body:"Boundaries are not metaphors. They are legal instruments. Learn to establish, protect, and transfer financial order across generations.",
    modules:["Household budgeting systems","Asset protection basics","Entity structures","Intergenerational transfer planning"] },
  { icon:"📜", title:"Legal Foundations", ot:"Num. 27:1–11 · Ruth 4:1–12", nt:"Gal. 4:1–2",
    quote:"Inheritance was ordered, witnessed, and law-shaped.",
    body:"The daughters of Zelophehad did not petition emotionally. They made a lawful claim. Ruth's redemption was witnessed at the gate. Legal literacy is biblical literacy.",
    modules:["Inheritance law basics","Trust instruments overview","Estate planning fundamentals","Witness and documentation standards"] },
  { icon:"🌿", title:"Governance & Stewardship", ot:"Lev. 25:23–28", nt:"1 Cor. 4:1–2 · 2 Cor. 8:20–21",
    quote:"Stewards must be found faithful — before God and before men.",
    body:"Governance is not management. It is accountable administration of what has been entrusted. Public integrity is part of spiritual maturity.",
    modules:["Family governance frameworks","Fiduciary responsibility","Charitable alignment","Legacy and succession design"] },
];

const breakdownTabs = {
  national: {
    label:"National", ot:"Deut. 27:17", nt:"Acts 6:1–7",
    otQ:"Cursed is anyone who moves their neighbor's boundary stone.",
    ntQ:"Choose seven men of good repute, full of the Spirit and of wisdom.",
    body:"When shared civic norms erode, the boundary markers of public life shift. Institutions lose legitimacy. Communities lose the shared grammar of governance. The result is not chaos — it is drift. Families operate without a map.",
    stat:"Only 17% of Americans express high trust in federal institutions." },
  community: {
    label:"Community", ot:"Deut. 19:14", nt:"2 Cor. 8:20–21",
    otQ:"Do not move your neighbor's boundary marker set up by your predecessors.",
    ntQ:"We are taking pains to do what is right, not only in the eyes of the Lord but also in the eyes of man.",
    body:"At the community level, weak civic formation produces weak accountability. When neighbors do not understand governance, they cannot hold local institutions to account. Public integrity requires public literacy.",
    stat:"Fewer than 1 in 4 adults can name all three branches of government." },
  household: {
    label:"Household", ot:"Num. 36:1–12", nt:"1 Tim. 5:4, 8",
    otQ:"Every daughter who inherits land must marry someone from the clan of her father's tribe.",
    ntQ:"Anyone who does not provide for their own household has denied the faith.",
    body:"At the household level, the absence of civic and legal literacy means families work hard but build without durable structure. Income without order. Values without transfer mechanism. Effort without succession.",
    stat:"68% of Americans have no estate plan. Most have no legal framework for transfer." },
};

/* Civic Library sample resources */
const libraryResources = [
  { title:"Understanding Your Constitutional Rights", type:"Guide", category:"Civic Education", access:"free", desc:"An introductory guide to the foundational rights and responsibilities outlined in the U.S. Constitution." },
  { title:"Household Budgeting Framework", type:"Template", category:"Financial Literacy", access:"free", desc:"A practical template for building a structured household budget grounded in stewardship principles." },
  { title:"Introduction to Estate Planning", type:"Document", category:"Financial Literacy", access:"member", desc:"Overview of estate planning fundamentals — trusts, wills, and transfer mechanisms." },
  { title:"Civic Literacy Self-Assessment", type:"Tool", category:"Civic Education", access:"free", desc:"A diagnostic tool to measure your current civic knowledge and identify areas for growth." },
  { title:"Scripture & Governance: A Study Guide", type:"Guide", category:"Scripture", access:"free", desc:"Explore the biblical foundations of governance, stewardship, and public accountability." },
  { title:"Entity Structure Basics", type:"Document", category:"Financial Literacy", access:"member", desc:"Introduction to LLCs, trusts, and corporate structures for household protection." },
  { title:"Local Government Participation Guide", type:"Guide", category:"Civic Education", access:"free", desc:"How to engage meaningfully with local governance — from town halls to school boards." },
  { title:"Family Governance Charter Template", type:"Template", category:"Family Structure", access:"member", desc:"A framework for establishing governance within your family unit — roles, meetings, and decisions." },
  { title:"The Inheritance Principle in Scripture", type:"Guide", category:"Scripture", access:"free", desc:"How the Old and New Testaments frame inheritance, succession, and generational transfer." },
  { title:"Trust Instruments Overview", type:"Document", category:"Financial Literacy", access:"member", desc:"An educational overview of revocable and irrevocable trusts and their civic applications." },
  { title:"Fiduciary Responsibility Explained", type:"Guide", category:"Civic Education", access:"member", desc:"What fiduciary duty means in both biblical and legal contexts — stewardship made practical." },
  { title:"Tools & Templates Starter Kit", type:"Template", category:"Tools & Templates", access:"free", desc:"A curated collection of worksheets and frameworks to begin structuring your household." },
];

/* ═══════ SHARED COMPONENTS ═══════ */

function TrustBar() {
  return <div style={{background:C.purple,color:"#e8d5a0",padding:"9px 24px",textAlign:"center",fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"1.5px",fontWeight:600}}>
    508(c)(1)(a) FAITH-BASED NONPROFIT · CIVIC EDUCATION · ESTATE TRUST PLANNING · EDUCATIONMINISTRY.ORG
  </div>;
}

function Nav() {
  const hash = useHash();
  const current = hash.replace("#","") || "/";
  const navItems = [
    { label:"Home", path:"/" },
    { label:"About", path:"/about" },
    { label:"Programs", path:"/programs" },
    { label:"Civic Library", path:"/civic-library" },
  ];
  return <nav style={{background:C.white,padding:"14px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.divider}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(45,27,78,0.07)"}}>
    <div style={{display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}} onClick={()=>navigate("/")}>
      <div style={{width:"44px",height:"44px",position:"relative",flexShrink:0}}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"44px",height:"44px"}}>
          <path d="M22 34 Q18 38 14 42" stroke="#5a8a3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M22 34 Q22 39 22 43" stroke="#5a8a3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M22 34 Q26 38 30 42" stroke="#5a8a3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M22 34 Q16 37 12 40" stroke="#5a8a3c" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M22 34 Q28 37 32 40" stroke="#5a8a3c" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <rect x="20.5" y="20" width="3" height="14" rx="1.5" fill="#5a8a3c"/>
          <ellipse cx="22" cy="14" rx="10" ry="8" fill="#6aaa44" opacity="0.9"/>
          <ellipse cx="14" cy="17" rx="7" ry="5.5" fill="#5a9a38" opacity="0.85"/>
          <ellipse cx="30" cy="17" rx="7" ry="5.5" fill="#5a9a38" opacity="0.85"/>
          <ellipse cx="22" cy="10" rx="7" ry="6" fill="#7aba54" opacity="0.9"/>
          <ellipse cx="16" cy="13" rx="5" ry="4" fill="#6aaa44" opacity="0.8"/>
          <ellipse cx="28" cy="13" rx="5" ry="4" fill="#6aaa44" opacity="0.8"/>
          <circle cx="19" cy="11" r="1.5" fill="#9ad870" opacity="0.7"/>
          <circle cx="25" cy="9" r="1.2" fill="#9ad870" opacity="0.6"/>
          <circle cx="14" cy="16" r="1" fill="#9ad870" opacity="0.5"/>
        </svg>
      </div>
      <div>
        <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"15px",fontWeight:700,letterSpacing:"0.5px",lineHeight:1.1}}>BODHI TREE</div>
        <div style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"10px",letterSpacing:"1.5px",fontWeight:600}}>EDUCATION MINISTRY</div>
      </div>
    </div>
    <div style={{display:"flex",gap:"28px",fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textMid,alignItems:"center"}}>
      {navItems.map(item=>{
        const isActive = current === item.path || (item.path !== "/" && current.startsWith(item.path));
        const isHome = item.path === "/" && current === "/";
        const active = isActive || isHome;
        return <span key={item.label} onClick={()=>navigate(item.path)} style={{cursor:"pointer",fontWeight:active?700:500,letterSpacing:"0.2px",color:active?C.purple:C.textMid,borderBottom:active?`2px solid ${C.gold}`:"2px solid transparent",paddingBottom:"4px",transition:"all 0.2s"}}>{item.label}</span>;
      })}
    </div>
    <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
      <button onClick={()=>navigate("/")} style={{background:C.purple,color:C.white,padding:"9px 20px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"0.5px",borderRadius:"2px",cursor:"pointer",border:"none"}}>Begin Free →</button>
      <button style={{background:"transparent",color:C.purple,border:`1.5px solid ${C.divider}`,padding:"9px 18px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"13px",borderRadius:"2px",cursor:"pointer"}}>Login</button>
    </div>
  </nav>;
}

function Breadcrumb({ items }) {
  return <div style={S.breadcrumb}>
    {items.map((item,i)=>(
      <span key={i}>
        {i>0&&<span style={{margin:"0 8px"}}>›</span>}
        {item.path ? <span style={{cursor:"pointer",color:C.gold,fontWeight:600}} onClick={()=>navigate(item.path)}>{item.label}</span> : <span>{item.label}</span>}
      </span>
    ))}
  </div>;
}

function PageHero({ label, headline, sub, cta, ctaAction, ctaSecondary, ctaSecondaryAction }) {
  return <div style={{background:`linear-gradient(170deg,#fffdf7 0%,${C.purplePale} 55%,#ede8f5 100%)`,padding:"80px 48px 70px",textAlign:"center",borderBottom:`2px solid ${C.goldBorder}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"10%",right:"5%",opacity:0.04,pointerEvents:"none"}}>
      <svg viewBox="0 0 200 200" width="280" height="280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="70" rx="60" ry="50" fill="#2d1b4e"/><ellipse cx="65" cy="90" rx="40" ry="30" fill="#2d1b4e"/><ellipse cx="135" cy="90" rx="40" ry="30" fill="#2d1b4e"/><rect x="94" y="110" width="12" height="60" rx="6" fill="#2d1b4e"/><path d="M100 170 Q85 185 70 195" stroke="#2d1b4e" strokeWidth="6" strokeLinecap="round" fill="none"/><path d="M100 170 Q100 185 100 198" stroke="#2d1b4e" strokeWidth="6" strokeLinecap="round" fill="none"/><path d="M100 170 Q115 185 130 195" stroke="#2d1b4e" strokeWidth="6" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
    <div style={{position:"relative",zIndex:1}}>
      {label && <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"3px",marginBottom:"20px",fontWeight:700}}>{label}</div>}
      <h1 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(32px,5vw,60px)",color:C.purple,margin:"0 0 16px",lineHeight:1.15,fontWeight:700}}>{headline}</h1>
      {sub && <p style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(15px,1.6vw,18px)",color:C.textMid,maxWidth:"640px",margin:"0 auto 36px",lineHeight:1.8}}>{sub}</p>}
      {(cta || ctaSecondary) && <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
        {cta && <button onClick={ctaAction} style={S.btnPrimary}>{cta}</button>}
        {ctaSecondary && <button onClick={ctaSecondaryAction} style={S.btnSecondary}>{ctaSecondary}</button>}
      </div>}
    </div>
  </div>;
}

function Footer() {
  return <div style={{background:C.purple,padding:"56px 48px 32px"}}>
    <div style={{maxWidth:"920px",margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"40px",marginBottom:"40px"}}>
      <div>
        <div style={{fontFamily:"Playfair Display,Georgia,serif",color:"#e8d5a0",fontSize:"20px",fontWeight:700,marginBottom:"12px"}}>BT Education Ministry</div>
        <p style={{fontFamily:"Inter,sans-serif",color:"#b0a8c0",fontSize:"13px",lineHeight:1.7,marginBottom:"16px"}}>Faith-grounded civic education for needy and low-income families. 508(c)(1)(a) nonprofit.</p>
        <div style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:"#c8b8e8",fontSize:"13px"}}>"Civic virtue begins where biblical order governs inheritance, stewardship, and public trust."</div>
      </div>
      {[
        {title:"Programs",links:[{label:"Seeker",path:"/programs"},{label:"Operator",path:"/programs"},{label:"Architect",path:"/programs"},{label:"Steward",path:"/programs"},{label:"Capstone",path:"/programs"}]},
        {title:"Resources",links:[{label:"Civic Library",path:"/civic-library"},{label:"About",path:"/about"},{label:"Donate",path:"/"},{label:"AEMP",path:"/programs"}]},
        {title:"Legal",links:[{label:"Privacy Policy"},{label:"Terms"},{label:"Disclaimer"},{label:"508(c)(1)(a) Status"}]}
      ].map(({title,links})=>(
        <div key={title}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:"#e8d5a0",letterSpacing:"2px",marginBottom:"16px",fontWeight:700}}>{title.toUpperCase()}</div>
          {links.map(link=><div key={link.label} onClick={link.path?()=>navigate(link.path):undefined} style={{fontFamily:"Inter,sans-serif",color:"#9a8abf",fontSize:"13px",marginBottom:"8px",cursor:"pointer"}}>{link.label}</div>)}
        </div>
      ))}
    </div>
    <div style={{maxWidth:"920px",margin:"0 auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
      <div style={{fontFamily:"Inter,sans-serif",color:"#7a6a9a",fontSize:"12px"}}>© 2025 BT Education Ministry · educationministry.org · All rights reserved</div>
      <div style={{fontFamily:"Inter,sans-serif",color:"#7a6a9a",fontSize:"12px"}}>508(c)(1)(a) · Faith-Based Nonprofit · Not Legal Advice</div>
    </div>
  </div>;
}

/* ═══════ HOMEPAGE SECTIONS ═══════ */

function Hero() {
  return <div style={{background:`linear-gradient(170deg,#fffdf7 0%,${C.purplePale} 55%,#ede8f5 100%)`,padding:"110px 48px 90px",textAlign:"center",borderBottom:`2px solid ${C.goldBorder}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"10%",right:"5%",opacity:0.04,pointerEvents:"none"}}>
      <svg viewBox="0 0 200 200" width="320" height="320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="70" rx="60" ry="50" fill="#2d1b4e"/><ellipse cx="65" cy="90" rx="40" ry="30" fill="#2d1b4e"/><ellipse cx="135" cy="90" rx="40" ry="30" fill="#2d1b4e"/><rect x="94" y="110" width="12" height="60" rx="6" fill="#2d1b4e"/><path d="M100 170 Q85 185 70 195" stroke="#2d1b4e" strokeWidth="6" strokeLinecap="round" fill="none"/><path d="M100 170 Q100 185 100 198" stroke="#2d1b4e" strokeWidth="6" strokeLinecap="round" fill="none"/><path d="M100 170 Q115 185 130 195" stroke="#2d1b4e" strokeWidth="6" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
    <div style={{position:"relative",zIndex:1}}>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.textLight,letterSpacing:"3px",marginBottom:"28px",fontWeight:600}}>EDUCATIONMINISTRY.ORG · CIVIC FORMATION · ESTATE ORDER</div>
      <div style={{background:C.white,border:`1px solid ${C.goldBorder}`,display:"inline-block",padding:"10px 24px",marginBottom:"32px",boxShadow:"0 2px 12px rgba(45,27,78,0.07)"}}>
        <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"clamp(14px,1.8vw,18px)",margin:0,lineHeight:1.5}}>
          "You were taught to be a good citizen.<br/>You were never taught to be a free people."
        </p>
      </div>
      <h1 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(38px,6vw,76px)",color:C.purple,margin:"0 0 16px",lineHeight:1.08,fontWeight:700}}>
        Faith Grounded<br/><span style={{color:C.gold}}>Civic Virtue</span>
      </h1>
      <p style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(15px,1.6vw,19px)",color:C.textMid,maxWidth:"640px",margin:"0 auto 40px",lineHeight:1.8,fontWeight:400}}>
        The civic education that builds and preserves families across generations —<br/>
        <span style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.purple}}>grounded in scripture, hidden in plain view.</span>
      </p>
      <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap",marginBottom:"72px"}}>
        <button style={{...S.btnPrimary,padding:"16px 36px",fontSize:"15px",display:"flex",alignItems:"center",gap:"10px"}}>
          Take the Challenge <span style={{fontSize:"18px"}}>→</span>
        </button>
        <button onClick={()=>navigate("/programs")} style={{...S.btnSecondary,padding:"16px 32px",fontSize:"15px"}}>View the Path</button>
      </div>
      <div style={{display:"flex",gap:"0",justifyContent:"center",flexWrap:"wrap",maxWidth:"700px",margin:"0 auto"}}>
        {[{stat:"17%",label:"Public trust in institutions"},{stat:"22%",label:"Civic proficiency, U.S. adults"},{stat:"30%",label:"Religious attendance decline"}].map(({stat,label},i,arr)=>(
          <div key={stat} style={{textAlign:"center",padding:"0 40px",borderRight:i<arr.length-1?`1px solid ${C.divider}`:"none"}}>
            <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"44px",color:C.purple,fontWeight:700,lineHeight:1}}>{stat}</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textLight,letterSpacing:"0.3px",maxWidth:"120px",margin:"6px auto 0",lineHeight:1.4}}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

function Breakdown() {
  const [tab,setTab]=useState("national");
  const a=breakdownTabs[tab];
  return <div style={{background:C.bgAlt,padding:"80px 48px",borderBottom:`1px solid ${C.divider}`}}>
    <div style={{maxWidth:"920px",margin:"0 auto"}}>
      <div style={S.label}>THE BREAKDOWN</div>
      <h2 style={S.h2}>When Boundaries Move,<br/>Families Lose More Than Property</h2>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"17px",marginBottom:"40px",maxWidth:"600px"}}>The crisis facing families is deeper than economics. It is a crisis of order.</p>
      <div style={{display:"flex",gap:"8px",marginBottom:"36px",flexWrap:"wrap"}}>
        {Object.entries(breakdownTabs).map(([key,val])=>(
          <button key={key} onClick={()=>setTab(key)} style={{background:tab===key?C.purple:"transparent",color:tab===key?C.white:C.purple,border:`1.5px solid ${C.purple}`,padding:"10px 24px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"1px",borderRadius:"2px",cursor:"pointer"}}>{val.label.toUpperCase()}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
        <div style={{background:C.white,padding:"32px",borderLeft:`4px solid ${C.gold}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.gold,letterSpacing:"2px",marginBottom:"12px",fontWeight:700}}>OLD TESTAMENT · ESTATE ORDER · {a.ot}</div>
          <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.text,fontSize:"16px",lineHeight:1.7,margin:"0 0 12px"}}>"{a.otQ}"</p>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,fontWeight:600}}>{a.ot}</div>
        </div>
        <div style={{background:C.white,padding:"32px",borderLeft:`4px solid ${C.purpleMid}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"12px",fontWeight:700}}>NEW TESTAMENT · TRUST ORDER · {a.nt}</div>
          <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.text,fontSize:"16px",lineHeight:1.7,margin:"0 0 12px"}}>"{a.ntQ}"</p>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,fontWeight:600}}>{a.nt}</div>
        </div>
      </div>
      <div style={{background:C.white,padding:"32px",marginTop:"20px",borderTop:`3px solid ${C.gold}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
        <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"16px",lineHeight:1.8,margin:"0 0 16px"}}>{a.body}</p>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"14px",color:C.purple,fontWeight:700}}>{a.stat}</div>
      </div>
    </div>
  </div>;
}

function RealLives() {
  const [active,setActive]=useState(0);
  const p=personas[active];
  return <div style={{background:C.bg,padding:"80px 48px",borderBottom:`1px solid ${C.divider}`}}>
    <div style={{maxWidth:"920px",margin:"0 auto"}}>
      <div style={S.label}>REAL LIVES · SAME OUTCOME</div>
      <h2 style={S.h2}>Good People Can Still Be<br/>Structurally Exposed</h2>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"17px",marginBottom:"40px"}}>"Anyone who does not provide for their own household has denied the faith." — 1 Tim. 5:8</p>
      <div style={{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap"}}>
        {personas.map((per,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{background:active===i?C.purple:"transparent",color:active===i?C.white:C.purple,border:`1.5px solid ${C.purple}`,padding:"10px 20px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",borderRadius:"2px",cursor:"pointer"}}>{per.icon} {per.label}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
        <div>
          <div style={{background:C.white,padding:"28px",marginBottom:"16px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${C.gold}`}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.green,letterSpacing:"2px",marginBottom:"16px",fontWeight:700}}>WHAT THEY HAVE</div>
            {p.has.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}><span style={{color:C.green,fontSize:"16px",fontWeight:700}}>✓</span><span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"14px"}}>{item}</span></div>)}
          </div>
          <div style={{background:C.white,padding:"28px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:"3px solid #c0392b"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.red,letterSpacing:"2px",marginBottom:"16px",fontWeight:700}}>WHAT IS MISSING</div>
            {p.lacks.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}><span style={{color:C.red,fontSize:"16px",fontWeight:700}}>✗</span><span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"14px"}}>{item}</span></div>)}
          </div>
        </div>
        <div style={{background:C.purplePale,padding:"36px",display:"flex",flexDirection:"column",justifyContent:"space-between",border:`1px solid ${C.purpleLight}`}}>
          <div>
            <div style={{fontSize:"52px",marginBottom:"16px"}}>{p.icon}</div>
            <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.purple,fontSize:"19px",lineHeight:1.7,marginBottom:"32px"}}>"{p.quote}"</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            <div style={{background:C.white,padding:"16px",borderTop:`2px solid ${C.gold}`}}>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"9px",color:C.gold,letterSpacing:"2px",marginBottom:"6px",fontWeight:700}}>OT · ESTATE ORDER</div>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"13px",fontWeight:700}}>{p.ot}</div>
            </div>
            <div style={{background:C.white,padding:"16px",borderTop:`2px solid ${C.purpleMid}`}}>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"9px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"6px",fontWeight:700}}>NT · TRUST ORDER</div>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"13px",fontWeight:700}}>{p.nt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

function RootCause() {
  return <div style={{background:C.bgAlt,padding:"80px 48px",borderBottom:`1px solid ${C.divider}`}}>
    <div style={{maxWidth:"920px",margin:"0 auto"}}>
      <div style={S.label}>ROOT CAUSE</div>
      <h2 style={S.h2}>What Disappeared Was Not<br/>Religion Alone. It Was Governance.</h2>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"17px",marginBottom:"48px",maxWidth:"600px"}}>The Bible trains households to preserve inheritance and administer trust faithfully.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"24px"}}>
        <div style={{background:C.white,padding:"36px",borderTop:`4px solid ${C.gold}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"2px",marginBottom:"20px",fontWeight:700}}>OLD TESTAMENT · ESTATE ORDER</div>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,marginBottom:"24px"}}>Inheritance was not casual. It was ordered, witnessed, and law-shaped. Boundaries were protected by covenant. Succession was governed by statute. Transfer required witnesses at the gate.</p>
          {[{ref:"Lev. 25:23–34",desc:"Land, redemption, and limits on alienation"},{ref:"Num. 27:1–11",desc:"Lawful inheritance claims — Zelophehad's daughters"},{ref:"Num. 36:1–12",desc:"Preserving inheritance order within structure"},{ref:"Ruth 4:1–12",desc:"Transfer, redemption, witnesses at the gate"},{ref:"Deut. 19:14",desc:"Boundary protection as covenant obligation"}].map(({ref,desc})=>(
            <div key={ref} style={{display:"flex",gap:"12px",marginBottom:"12px",alignItems:"flex-start"}}>
              <span style={{color:C.gold,fontFamily:"Playfair Display,Georgia,serif",fontSize:"13px",minWidth:"110px",fontWeight:700}}>{ref}</span>
              <span style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"13px"}}>{desc}</span>
            </div>
          ))}
        </div>
        <div style={{background:C.white,padding:"36px",borderTop:`4px solid ${C.purpleMid}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"20px",fontWeight:700}}>NEW TESTAMENT · TRUST ORDER</div>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,marginBottom:"24px"}}>The New Testament deepens the logic of stewardship, trusteeship, and accountable administration. Entrusted things require faithful administration and public integrity.</p>
          {[{ref:"Gal. 4:1–2",desc:"Heirs under guardians and trustees"},{ref:"Luke 16:10–12",desc:"Faithful in another's property"},{ref:"1 Cor. 4:1–2",desc:"Stewards must be found faithful"},{ref:"2 Cor. 8:20–21",desc:"Honorable before God and men"},{ref:"Heb. 9:15–17",desc:"Inheritance and testament logic"}].map(({ref,desc})=>(
            <div key={ref} style={{display:"flex",gap:"12px",marginBottom:"12px",alignItems:"flex-start"}}>
              <span style={{color:C.purpleMid,fontFamily:"Playfair Display,Georgia,serif",fontSize:"13px",minWidth:"110px",fontWeight:700}}>{ref}</span>
              <span style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"13px"}}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.purple,padding:"28px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px"}}>
        <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"18px",color:C.white,fontWeight:700,maxWidth:"600px"}}>Civic Virtue = Public Honesty + Household Order + Faithful Transfer</div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:"#e8d5a0",letterSpacing:"1px",fontWeight:700}}>THE SYNTHESIS</div>
      </div>
    </div>
  </div>;
}

function ThePath() {
  const [active,setActive]=useState(0);
  const s=steps[active];
  return <div style={{background:C.bg,padding:"80px 48px",borderBottom:`1px solid ${C.divider}`}}>
    <div style={{maxWidth:"920px",margin:"0 auto"}}>
      <div style={S.label}>THE PATH · STRUCTURED PROGRESSION</div>
      <h2 style={S.h2}>A Structured Path Forward</h2>
      <div style={{display:"flex",gap:"8px",marginBottom:"40px",marginTop:"28px",flexWrap:"wrap"}}>
        {steps.map((st,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{background:active===i?C.purple:C.white,color:active===i?C.white:C.purple,border:`1.5px solid ${active===i?C.purple:C.divider}`,padding:"12px 20px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"0.5px",borderRadius:"2px",boxShadow:active===i?"none":"0 1px 4px rgba(45,27,78,0.08)",cursor:"pointer"}}>{st.level} {st.title}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
        <div style={{background:C.purplePale,padding:"36px",borderLeft:`4px solid ${C.gold}`,border:`1px solid ${C.purpleLight}`}}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"2px",marginBottom:"8px",fontWeight:700}}>LEVEL {s.level}</div>
          <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"34px",color:C.purple,margin:"0 0 6px"}}>{s.title}</h3>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"14px",color:C.gold,marginBottom:"20px",fontWeight:700}}>{s.price}</div>
          <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"16px",lineHeight:1.6,marginBottom:"20px"}}>"{s.tagline}"</p>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,marginBottom:"28px"}}>{s.desc}</p>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"1px",marginBottom:"6px",fontWeight:700}}>CIVIC OUTCOME</div>
          <div style={{fontFamily:"Inter,sans-serif",color:C.purple,fontSize:"14px",fontWeight:700}}>{s.civic}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          <div style={{background:C.white,padding:"28px",borderTop:`3px solid ${C.gold}`,flex:1,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.gold,letterSpacing:"2px",marginBottom:"12px",fontWeight:700}}>OLD TESTAMENT · ESTATE ORDER · {s.ot}</div>
            <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.text,fontSize:"15px",lineHeight:1.7,margin:"0 0 8px"}}>"{s.otQ}"</p>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,fontWeight:600}}>{s.ot}</div>
          </div>
          <div style={{background:C.white,padding:"28px",borderTop:`3px solid ${C.purpleMid}`,flex:1,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"12px",fontWeight:700}}>NEW TESTAMENT · TRUST ORDER · {s.nt}</div>
            <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.text,fontSize:"15px",lineHeight:1.7,margin:"0 0 8px"}}>"{s.ntQ}"</p>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,fontWeight:600}}>{s.nt}</div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:"16px",marginTop:"32px",flexWrap:"wrap"}}>
        <button style={S.btnPrimary}>Begin as a Seeker — Free</button>
        <button onClick={()=>navigate("/programs")} style={S.btnSecondary}>View Full Curriculum →</button>
      </div>
    </div>
  </div>;
}

function CompetencyPillars() {
  const [active,setActive]=useState(null);
  return <div style={{background:C.bgAlt,padding:"80px 48px",borderBottom:`1px solid ${C.divider}`}}>
    <div style={{maxWidth:"920px",margin:"0 auto"}}>
      <div style={S.label}>COMPETENCY PILLARS</div>
      <h2 style={S.h2}>What You Will Learn</h2>
      <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"16px",marginBottom:"48px",maxWidth:"600px",lineHeight:1.7}}>Each pillar is grounded in both biblical order and civic application. Click any pillar to expand the full framework.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
        {pillars.map((p,i)=>(
          <div key={i} onClick={()=>setActive(active===i?null:i)} style={{background:active===i?C.purple:C.white,padding:"28px",cursor:"pointer",borderLeft:`4px solid ${active===i?C.goldBright:C.gold}`,transition:"all 0.2s",boxShadow:"0 2px 12px rgba(45,27,78,0.07)"}}>
            <div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div>
            <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"20px",color:active===i?C.white:C.purple,margin:"0 0 8px"}}>{p.title}</h3>
            <div style={{display:"flex",gap:"12px",marginBottom:"12px",flexWrap:"wrap"}}>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:active===i?"#e8d5a0":C.gold,letterSpacing:"1px",fontWeight:700}}>{p.ot}</span>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:active===i?"#c8b8e8":C.purpleMid,letterSpacing:"1px"}}>{p.nt}</span>
            </div>
            <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:active===i?"#e8e0f0":C.textMid,fontSize:"13px",lineHeight:1.6,margin:"0 0 8px"}}>"{p.quote}"</p>
            {active===i&&<div style={{marginTop:"16px",borderTop:"1px solid rgba(255,255,255,0.2)",paddingTop:"16px"}}>
              <p style={{fontFamily:"Inter,sans-serif",color:"#d8d0e8",fontSize:"14px",lineHeight:1.7,marginBottom:"16px"}}>{p.body}</p>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:"#e8d5a0",letterSpacing:"1px",fontWeight:700,marginBottom:"10px"}}>CORE MODULES</div>
              {p.modules.map((m,j)=><div key={j} style={{display:"flex",gap:"8px",marginBottom:"8px",alignItems:"center"}}><span style={{color:"#e8d5a0",fontSize:"14px"}}>→</span><span style={{fontFamily:"Inter,sans-serif",color:"#e8e0f0",fontSize:"13px"}}>{m}</span></div>)}
            </div>}
          </div>
        ))}
      </div>
    </div>
  </div>;
}

function Capstone() {
  const [submitted,setSubmitted]=useState(false);
  return <div style={{background:C.goldPale,padding:"80px 48px",borderTop:`3px solid ${C.goldBorder}`}}>
    <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
      <div style={S.label}>CAPSTONE · ESTATE TRUST DIRECTIVE</div>
      <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,52px)",color:C.purple,margin:"0 0 16px",lineHeight:1.2}}>Set in Order<br/><span style={{color:C.gold}}>What Must Outlive You</span></h2>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"18px",marginBottom:"8px",lineHeight:1.6}}>"The land must not be sold permanently, because the land is mine and you reside in my land as foreigners and strangers."</p>
      <p style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.gold,letterSpacing:"2px",marginBottom:"32px",fontWeight:600}}>— LEVITICUS 25:23 · OT ESTATE ORDER</p>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"16px",marginBottom:"8px",lineHeight:1.6}}>"In the case of a will, it is necessary to prove the death of the one who made it, because a will is in force only when somebody has died."</p>
      <p style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"48px",fontWeight:600}}>— HEBREWS 9:16–17 · NT TRUST ORDER</p>
      <div style={{background:C.white,border:`1px solid ${C.goldBorder}`,padding:"48px",marginBottom:"40px",boxShadow:"0 4px 24px rgba(45,27,78,0.08)"}}>
        <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(36px,6vw,64px)",color:C.purple,fontWeight:700,marginBottom:"8px"}}>$55,000</div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textLight,letterSpacing:"2px",marginBottom:"32px"}}>ESTATE TRUST DIRECTIVE · QUALIFICATION REQUIRED</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",marginBottom:"32px",textAlign:"left"}}>
          {[{ref:"Lev. 25:23–28",label:"Land & Redemption Order"},{ref:"Num. 36:1–12",label:"Inheritance Preservation"},{ref:"1 Cor. 4:1–2",label:"Faithful Administration"}].map(({ref,label})=>(
            <div key={ref} style={{background:C.purplePale,padding:"16px",borderTop:`2px solid ${C.gold}`}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.gold,fontSize:"12px",marginBottom:"6px",fontWeight:700}}>{ref}</div>
              <div style={{fontFamily:"Inter,sans-serif",color:C.purple,fontSize:"12px"}}>{label}</div>
            </div>
          ))}
        </div>
        {!submitted?<div>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"15px",lineHeight:1.8,marginBottom:"28px"}}>The Capstone is not a product. It is the final expression of ordered love — lawful transfer, protected inheritance, and intentional blessing across generations. Qualification is required.</p>
          <button onClick={()=>setSubmitted(true)} style={{...S.btnPrimary,padding:"18px 48px",fontSize:"16px"}}>Apply for Capstone Engagement →</button>
        </div>:<div style={{background:C.purplePale,padding:"28px",borderTop:`2px solid ${C.gold}`}}>
          <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"22px",color:C.purple,marginBottom:"12px"}}>Application Received</div>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.7}}>Your application has been logged. A qualified advisor will contact you within 3 business days to assess fit and next steps.</p>
        </div>}
      </div>
      <p style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"12px",lineHeight:1.6}}>BT Education Ministry is a 508(c)(1)(a) faith-based nonprofit. This engagement is educational and ministerial in nature. Not legal advice. Consult qualified legal counsel for estate planning.</p>
    </div>
  </div>;
}

/* ═══════ HOME PAGE ═══════ */
function HomePage() {
  return <React.Fragment>
    <Hero/><Breakdown/><RealLives/><RootCause/><ThePath/><CompetencyPillars/><Capstone/>
  </React.Fragment>;
}

/* ═══════ ABOUT PAGE ═══════ */
function AboutPage() {
  return <React.Fragment>
    <PageHero
      label="ABOUT · BT EDUCATION MINISTRY"
      headline={<span>A Ministry Built on Education,<br/>Structure, and <span style={{color:C.gold}}>Service</span></span>}
      sub="BT Education Ministry exists to provide families with access to structured education, practical guidance, and faith-based principles that support long-term stability and growth."
    />

    {/* Breadcrumb */}
    <div style={{padding:"20px 48px 0"}}>
      <div style={S.inner}><Breadcrumb items={[{label:"Home",path:"/"},{label:"About"}]}/></div>
    </div>

    {/* Mission */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>OUR MISSION</div>
        <h2 style={S.h2}>Ministry, Education, and Charitable Service</h2>
        <p style={{...S.body,marginBottom:"32px"}}>We provide ministry, education, and charitable services designed to equip individuals and families — especially those in need — with the tools, knowledge, and structure necessary to move forward with clarity and purpose.</p>
        <div style={{background:C.purplePale,padding:"32px",border:`1px solid ${C.purpleLight}`,maxWidth:"640px"}}>
          <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.purple,fontSize:"17px",lineHeight:1.7,margin:0}}>
            "Observe them carefully, for this will show your wisdom and understanding to the nations, who will hear about all these decrees and say, 'Surely this great nation is a wise and understanding people.'"
          </p>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.gold,marginTop:"12px",fontWeight:700}}>— Deuteronomy 4:6</div>
        </div>
      </div>
    </div>

    {/* 508(c)(1)(a) Status */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>NONPROFIT STATUS</div>
        <h2 style={S.h2}>What Is a 508(c)(1)(a) Organization?</h2>
        <p style={{...S.body,marginBottom:"32px"}}>A 508(c)(1)(a) organization is a faith-based nonprofit recognized under federal law. Unlike 501(c)(3) organizations, a 508(c)(1)(a) entity is not required to apply for tax-exempt status — it is mandatorily excepted from taxation by statute.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
          {[
            {title:"Statutory Exception",icon:"📋",desc:"Tax-exempt by law — not by application. This means we operate under inherent religious and educational authority."},
            {title:"No IRS Filing Required",icon:"🏛️",desc:"Unlike 501(c)(3)s, 508(c)(1)(a) organizations do not need IRS determination letters. Our authority comes from statute, not from the agency."},
            {title:"First Amendment Protected",icon:"⚖️",desc:"Our mission is grounded in religious and educational liberty — protected by the First Amendment and codified in federal tax law."},
            {title:"Charitable Purpose",icon:"🤝",desc:"We exist exclusively to provide ministry, education, and charitable services to needy and low-income families."},
          ].map(item=>(
            <div key={item.title} style={{...S.card,borderTop:`3px solid ${C.gold}`}}>
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{item.icon}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"18px",color:C.purple,margin:"0 0 10px"}}>{item.title}</h3>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.7,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Faith-Grounded Civic Virtue Philosophy */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>OUR PHILOSOPHY</div>
        <h2 style={S.h2}>Faith-Grounded Civic Virtue</h2>
        <p style={{...S.body,marginBottom:"32px"}}>Civic virtue is not a modern invention. It is a biblical principle — the disciplined commitment to public honesty, household order, and faithful transfer. We believe that the foundations of good governance, stewardship, and inheritance are found in scripture — hidden in plain view.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"32px"}}>
          <div style={{background:C.white,padding:"32px",borderLeft:`4px solid ${C.gold}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.gold,letterSpacing:"2px",marginBottom:"12px",fontWeight:700}}>OLD TESTAMENT · ESTATE ORDER</div>
            <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,margin:0}}>The Old Testament establishes an ordered system of inheritance, boundaries, and public accountability — governance structures designed to protect families across generations.</p>
          </div>
          <div style={{background:C.white,padding:"32px",borderLeft:`4px solid ${C.purpleMid}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"12px",fontWeight:700}}>NEW TESTAMENT · TRUST ORDER</div>
            <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,margin:0}}>The New Testament deepens stewardship into trusteeship — faithful administration, fiduciary accountability, and the principle that what is entrusted must be managed with integrity.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Why This Matters */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>WHY THIS MATTERS</div>
        <h2 style={S.h2}>Scripture and Civic Education<br/>Are Not Separate</h2>
        <p style={{...S.body,marginBottom:"32px"}}>The crisis facing families today is not only economic — it is a crisis of order. When civic norms erode and biblical principles of governance are forgotten, families work hard but build without durable structure. Income without order. Values without a transfer mechanism. Effort without succession.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",marginBottom:"32px"}}>
          {[
            {stat:"17%",label:"Public trust in federal institutions",ref:"Declining civic engagement threatens the social fabric"},
            {stat:"68%",label:"Americans without an estate plan",ref:"Most families lack legal frameworks for transfer"},
            {stat:"30%",label:"Decline in religious attendance",ref:"The structures that taught governance are disappearing"},
          ].map(item=>(
            <div key={item.stat} style={{background:C.white,padding:"28px",textAlign:"center",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${C.gold}`}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"42px",color:C.purple,fontWeight:700,lineHeight:1}}>{item.stat}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textMid,fontWeight:600,margin:"8px 0"}}>{item.label}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textLight,lineHeight:1.5}}>{item.ref}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Who We Serve */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>WHO WE SERVE</div>
        <h2 style={S.h2}>Families Seeking Clarity and Direction</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginTop:"32px"}}>
          {[
            {icon:"👨‍👩‍👧‍👦",title:"Families in Need",desc:"Low-income and underserved families seeking structured education, civic knowledge, and practical tools for building stability."},
            {icon:"📚",title:"Individuals Seeking Foundation",desc:"People who want foundational education in civic literacy, financial structure, and governance — grounded in faith-based principles."},
            {icon:"🏘️",title:"Communities Underserved",desc:"Communities where financial and civic literacy are lacking — where people work hard but build without durable structure."},
            {icon:"🌱",title:"Faith-Aligned Seekers",desc:"Those looking for guidance and structure rooted in scripture — not sentiment, but ordered principle applied to real life."},
          ].map(item=>(
            <div key={item.title} style={{...S.card,borderTop:`3px solid ${C.purpleMid}`}}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>{item.icon}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"18px",color:C.purple,margin:"0 0 10px"}}>{item.title}</h3>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.7,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* How It Works */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>HOW IT WORKS</div>
        <h2 style={S.h2}>A Clear Path Forward</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px",marginTop:"32px"}}>
          {[
            {step:"01",title:"Start with Offer 0",desc:"Access free foundational education and begin building understanding."},
            {step:"02",title:"Structured Learning",desc:"Engage with courses, workshops, and guided materials designed for application."},
            {step:"03",title:"Implement with Support",desc:"Utilize tools, resources, and guidance to apply what you've learned in real-world situations."},
            {step:"04",title:"Grow with Community",desc:"Connect with a structured environment that supports ongoing development and accountability."},
          ].map(item=>(
            <div key={item.step} style={{background:C.white,padding:"28px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",position:"relative"}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"42px",color:C.goldBorder,fontWeight:700,lineHeight:1,marginBottom:"16px"}}>{item.step}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"16px",color:C.purple,margin:"0 0 8px"}}>{item.title}</h3>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"13px",lineHeight:1.7,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Team / Leadership */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>LEADERSHIP</div>
        <h2 style={S.h2}>Established and Structured</h2>
        <p style={{...S.body,marginBottom:"32px"}}>BT Education Ministry operates as a religious organization dedicated to education and charitable service.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
          <div style={{background:C.purplePale,padding:"36px",border:`1px solid ${C.purpleLight}`}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.gold,letterSpacing:"2px",marginBottom:"16px",fontWeight:700}}>ORGANIZATION DETAILS</div>
            {[
              {label:"Established",value:"July 14, 2025"},
              {label:"Location",value:"Branchburg, New Jersey"},
              {label:"NAICS",value:"813110 — Religious Organizations"},
              {label:"SIC",value:"8661"},
              {label:"Status",value:"508(c)(1)(a) Faith-Based Nonprofit"},
            ].map(item=>(
              <div key={item.label} style={{display:"flex",justifyContent:"space-between",marginBottom:"12px",paddingBottom:"12px",borderBottom:`1px solid ${C.divider}`}}>
                <span style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"13px",fontWeight:600}}>{item.label}</span>
                <span style={{fontFamily:"Inter,sans-serif",color:C.purple,fontSize:"13px",fontWeight:700}}>{item.value}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.white,padding:"36px",borderTop:`4px solid ${C.gold}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.gold,letterSpacing:"2px",marginBottom:"16px",fontWeight:700}}>CONTACT</div>
            <div style={{marginBottom:"16px"}}>
              <div style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"12px",fontWeight:600,marginBottom:"4px"}}>ADDRESS</div>
              <div style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"14px"}}>971 US Highway 202 N, Ste N<br/>Branchburg, NJ 08876</div>
            </div>
            <div style={{marginBottom:"16px"}}>
              <div style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"12px",fontWeight:600,marginBottom:"4px"}}>PHONE</div>
              <div style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"14px"}}>(732) 375-9474</div>
            </div>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"12px",fontWeight:600,marginBottom:"4px"}}>FAX</div>
              <div style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"14px"}}>(732) 860-1389</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div style={{background:C.purple,padding:"80px 48px",textAlign:"center"}}>
      <div style={S.inner}>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.white,margin:"0 0 16px",lineHeight:1.2}}>Start Where You Are</h2>
        <p style={{fontFamily:"Inter,sans-serif",color:"#b0a8c0",fontSize:"16px",lineHeight:1.8,maxWidth:"500px",margin:"0 auto 32px"}}>Access free education and begin building a structured path forward.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>navigate("/programs")} style={{background:C.goldBright,color:C.purple,padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",borderRadius:"2px",border:"none",cursor:"pointer"}}>Explore Programs</button>
          <button onClick={()=>navigate("/")} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Start Free Challenge</button>
        </div>
      </div>
    </div>
  </React.Fragment>;
}

/* ═══════ PROGRAMS PAGE ═══════ */
function ProgramsPage() {
  const [activeStep, setActiveStep] = useState(0);
  return <React.Fragment>
    <PageHero
      label="PROGRAMS · STRUCTURED PROGRESSION"
      headline={<span>A Structured Path from<br/>Learning to <span style={{color:C.gold}}>Leadership</span></span>}
      sub="Our programs guide individuals and families from foundational understanding to real-world application, culminating in full stewardship and governance."
      cta="Start as Seeker — Free"
    />

    <div style={{padding:"20px 48px 0"}}>
      <div style={S.inner}><Breadcrumb items={[{label:"Home",path:"/"},{label:"Programs"}]}/></div>
    </div>

    {/* Overview */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>EDUCATION APPROACH</div>
        <h2 style={S.h2}>Education That Builds, Not Just Informs</h2>
        <p style={{...S.body,marginBottom:0}}>Each program is designed to move you forward with clarity, discipline, and purpose — progressing from awareness to execution, then into design and long-term governance.</p>
      </div>
    </div>

    {/* Flagship Programs */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>FLAGSHIP PROGRAMS</div>
        <h2 style={S.h2}>Two Pathways, One System</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginTop:"32px"}}>
          {/* Young Civic Engagement Challenge */}
          <div style={{background:C.white,padding:"40px",boxShadow:"0 4px 20px rgba(45,27,78,0.08)",borderTop:`4px solid ${C.gold}`,display:"flex",flexDirection:"column"}}>
            <div style={{background:C.goldPale,display:"inline-block",padding:"6px 16px",marginBottom:"20px",alignSelf:"flex-start"}}>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,fontWeight:700,letterSpacing:"1px"}}>FREE · PUBLIC ACCESS</span>
            </div>
            <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"24px",color:C.purple,margin:"0 0 8px"}}>Young Civic Engagement Challenge</h3>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textLight,marginBottom:"20px",fontWeight:600}}>Foundation · Entry Program</div>
            <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,marginBottom:"24px",flex:1}}>Begin your journey with structured civic education grounded in discipline, awareness, and understanding. This is a gamified, self-paced challenge designed to build civic literacy from the ground up.</p>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"1px",fontWeight:700,marginBottom:"12px"}}>WHAT YOU'LL LEARN</div>
            {["Civic literacy and foundational systems","Jurisdictional awareness and language","Structured thinking and discipline","Scripture-anchored civic principles"].map(item=>(
              <div key={item} style={{display:"flex",gap:"10px",marginBottom:"8px",alignItems:"center"}}>
                <span style={{color:C.green,fontSize:"14px",fontWeight:700}}>✓</span>
                <span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"13px"}}>{item}</span>
              </div>
            ))}
            <div style={{marginTop:"24px",padding:"16px",background:C.purplePale,border:`1px solid ${C.purpleLight}`}}>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,letterSpacing:"1px",fontWeight:700,marginBottom:"4px"}}>OUTCOME</div>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"15px",fontStyle:"italic"}}>Move from uncertainty → clarity</div>
            </div>
            <button style={{...S.btnPrimary,marginTop:"24px",width:"100%",textAlign:"center"}}>Start as Seeker — Free</button>
          </div>

          {/* AEMP */}
          <div style={{background:C.white,padding:"40px",boxShadow:"0 4px 20px rgba(45,27,78,0.08)",borderTop:`4px solid ${C.purpleMid}`,display:"flex",flexDirection:"column"}}>
            <div style={{background:C.purplePale,display:"inline-block",padding:"6px 16px",marginBottom:"20px",alignSelf:"flex-start"}}>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,fontWeight:700,letterSpacing:"1px"}}>MEMBER ACCESS · STRUCTURED</span>
            </div>
            <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"24px",color:C.purple,margin:"0 0 8px"}}>Applied Education Ministry Project</h3>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textLight,marginBottom:"20px",fontWeight:600}}>Execution → Structuring → Governance</div>
            <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,marginBottom:"24px",flex:1}}>Apply what you've learned through real-world execution, structured design, and guided implementation. AEMP is the operational backbone of the progression system.</p>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,letterSpacing:"1px",fontWeight:700,marginBottom:"12px"}}>WHAT YOU'LL DO</div>
            {["Execute administrative processes","Build structured systems and records","Apply knowledge to real-life scenarios","Develop frameworks for long-term use","Access member dashboard and tools"].map(item=>(
              <div key={item} style={{display:"flex",gap:"10px",marginBottom:"8px",alignItems:"center"}}>
                <span style={{color:C.purpleMid,fontSize:"14px",fontWeight:700}}>→</span>
                <span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"13px"}}>{item}</span>
              </div>
            ))}
            <div style={{marginTop:"24px",padding:"16px",background:C.purplePale,border:`1px solid ${C.purpleLight}`}}>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.purpleMid,letterSpacing:"1px",fontWeight:700,marginBottom:"4px"}}>OUTCOME</div>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"15px",fontStyle:"italic"}}>Move from execution → design → leadership</div>
            </div>
            <button style={{...S.btnSecondary,marginTop:"24px",width:"100%",textAlign:"center"}}>Access AEMP →</button>
          </div>
        </div>
      </div>
    </div>

    {/* Comparison Table */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>PROGRAM COMPARISON</div>
        <h2 style={S.h2}>What Each Program Offers</h2>
        <div style={{marginTop:"32px",background:C.white,boxShadow:"0 2px 12px rgba(45,27,78,0.06)",overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"Inter,sans-serif"}}>
            <thead>
              <tr style={{background:C.purple}}>
                <th style={{padding:"16px 24px",textAlign:"left",color:"#e8d5a0",fontSize:"12px",letterSpacing:"1px",fontWeight:700}}>FEATURE</th>
                <th style={{padding:"16px 24px",textAlign:"center",color:"#e8d5a0",fontSize:"12px",letterSpacing:"1px",fontWeight:700}}>CIVIC CHALLENGE</th>
                <th style={{padding:"16px 24px",textAlign:"center",color:"#e8d5a0",fontSize:"12px",letterSpacing:"1px",fontWeight:700}}>AEMP</th>
              </tr>
            </thead>
            <tbody>
              {[
                {feature:"Price",civic:"Free",aemp:"$27 – $197/mo"},
                {feature:"Civic Literacy Modules",civic:"✓",aemp:"✓"},
                {feature:"Scripture Integration",civic:"✓",aemp:"✓"},
                {feature:"Gamified Challenges",civic:"✓",aemp:"—"},
                {feature:"Real-World Application",civic:"Limited",aemp:"✓"},
                {feature:"Member Dashboard",civic:"—",aemp:"✓"},
                {feature:"Administrative Training",civic:"—",aemp:"✓"},
                {feature:"Entity Structure Guidance",civic:"—",aemp:"✓"},
                {feature:"Estate Planning Education",civic:"—",aemp:"✓"},
                {feature:"Capstone Eligibility",civic:"—",aemp:"✓"},
                {feature:"Community Access",civic:"Public",aemp:"Private"},
              ].map((row,i)=>(
                <tr key={i} style={{borderBottom:`1px solid ${C.divider}`,background:i%2===0?C.bg:C.white}}>
                  <td style={{padding:"14px 24px",fontSize:"13px",color:C.text,fontWeight:600}}>{row.feature}</td>
                  <td style={{padding:"14px 24px",fontSize:"13px",color:row.civic==="✓"?C.green:row.civic==="—"?C.textLight:C.textMid,textAlign:"center",fontWeight:row.civic==="✓"?700:400}}>{row.civic}</td>
                  <td style={{padding:"14px 24px",fontSize:"13px",color:row.aemp==="✓"?C.green:row.aemp==="—"?C.textLight:C.textMid,textAlign:"center",fontWeight:row.aemp==="✓"?700:400}}>{row.aemp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Competency Progression */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>COMPETENCY PROGRESSION</div>
        <h2 style={S.h2}>From Seeker to Steward</h2>
        <p style={{...S.body,marginBottom:"32px"}}>This progression represents a shift from learning → applying → building → governing. Each level reflects a higher degree of competency, responsibility, and impact.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"}}>
          {steps.map((s,i)=>(
            <div key={i} onClick={()=>setActiveStep(i)} style={{background:activeStep===i?C.purple:C.white,padding:"28px",cursor:"pointer",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${activeStep===i?C.goldBright:C.gold}`,transition:"all 0.2s"}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"32px",color:activeStep===i?"#e8d5a0":C.goldBorder,fontWeight:700,marginBottom:"12px"}}>{s.level}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"20px",color:activeStep===i?C.white:C.purple,margin:"0 0 6px"}}>{s.title}</h3>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:activeStep===i?"#e8d5a0":C.gold,fontWeight:700,marginBottom:"12px"}}>{s.price}</div>
              <p style={{fontFamily:"Inter,sans-serif",color:activeStep===i?"#d8d0e8":C.textMid,fontSize:"13px",lineHeight:1.6,margin:0}}>{s.civic}</p>
            </div>
          ))}
        </div>
        {/* Expanded detail */}
        <div style={{background:C.white,padding:"32px",marginTop:"20px",borderLeft:`4px solid ${C.gold}`,boxShadow:"0 2px 12px rgba(45,27,78,0.06)"}}>
          <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.purple,fontSize:"17px",lineHeight:1.6,marginBottom:"12px"}}>"{steps[activeStep].tagline}"</p>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,margin:0}}>{steps[activeStep].desc}</p>
        </div>
      </div>
    </div>

    {/* Program Flow */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>PROGRAM FLOW</div>
        <h2 style={S.h2}>A Complete System — Start to Finish</h2>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0",marginTop:"40px",flexWrap:"wrap"}}>
          {[
            {label:"Young Civic\nChallenge",sub:"Seeker",color:C.gold},
            {label:"AEMP\nOperator",sub:"Execution",color:C.purpleMid},
            {label:"AEMP\nArchitect",sub:"Design",color:C.purpleMid},
            {label:"Stewardship",sub:"Governance",color:C.purple},
            {label:"Estate Trust\nDirective",sub:"Capstone",color:C.gold},
          ].map((item,i,arr)=>(
            <React.Fragment key={i}>
              <div style={{background:C.white,padding:"24px",textAlign:"center",minWidth:"140px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${item.color}`}}>
                <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"15px",color:C.purple,fontWeight:700,whiteSpace:"pre-line",lineHeight:1.3}}>{item.label}</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:item.color,fontWeight:700,marginTop:"8px",letterSpacing:"1px"}}>{item.sub.toUpperCase()}</div>
              </div>
              {i<arr.length-1 && <div style={{fontFamily:"Inter,sans-serif",fontSize:"20px",color:C.goldBright,padding:"0 8px",fontWeight:700}}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

    {/* Capstone Preview */}
    <div style={{background:C.goldPale,padding:"80px 48px",borderTop:`3px solid ${C.goldBorder}`}}>
      <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
        <div style={S.label}>CAPSTONE ENGAGEMENT</div>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.purple,margin:"0 0 16px",lineHeight:1.2}}>Estate Trust Directive</h2>
        <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"16px",lineHeight:1.8,maxWidth:"600px",margin:"0 auto 32px"}}>The capstone private engagement for qualified members seeking full life-cycle estate trust planning, fiduciary structuring, treasury alignment, beneficiary design, healthcare directives, and custom governance architecture.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",marginBottom:"32px",textAlign:"left"}}>
          {[
            {icon:"📋",label:"Full estate trust design"},
            {icon:"⚖️",label:"Fiduciary structuring"},
            {icon:"🏛️",label:"Treasury alignment"},
            {icon:"👨‍👩‍👧‍👦",label:"Beneficiary planning"},
            {icon:"🏥",label:"Healthcare directives"},
            {icon:"🌿",label:"Custom governance architecture"},
          ].map(item=>(
            <div key={item.label} style={{background:C.white,padding:"20px",display:"flex",gap:"12px",alignItems:"center",boxShadow:"0 1px 6px rgba(45,27,78,0.06)"}}>
              <span style={{fontSize:"20px"}}>{item.icon}</span>
              <span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"13px",fontWeight:600}}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"48px",color:C.purple,fontWeight:700,marginBottom:"8px"}}>$55,000</div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textLight,letterSpacing:"2px",marginBottom:"28px"}}>QUALIFICATION REQUIRED</div>
        <button style={{...S.btnPrimary,padding:"18px 48px",fontSize:"16px"}}>Apply for Capstone Engagement →</button>
      </div>
    </div>

    {/* Final CTA */}
    <div style={{background:C.purple,padding:"80px 48px",textAlign:"center"}}>
      <div style={S.inner}>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.white,margin:"0 0 16px"}}>Start Where You Are.<br/>Build Toward What Matters.</h2>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap",marginTop:"32px"}}>
          <button style={{background:C.goldBright,color:C.purple,padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",borderRadius:"2px",border:"none",cursor:"pointer"}}>Start as Seeker — Free</button>
          <button style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Apply for Capstone</button>
        </div>
      </div>
    </div>
  </React.Fragment>;
}

/* ═══════ CIVIC LIBRARY PAGE ═══════ */
function CivicLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All","Civic Education","Scripture","Financial Literacy","Family Structure","Tools & Templates"];

  const filtered = libraryResources.filter(r => {
    const matchesSearch = search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || r.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return <React.Fragment>
    <PageHero
      label="CIVIC LIBRARY · KNOWLEDGE HUB"
      headline={<span>Civic Knowledge.<br/>Structured for <span style={{color:C.gold}}>Clarity.</span></span>}
      sub="Explore foundational resources designed to provide insight, direction, and practical understanding. All materials are curated from our private Knowledge Vault."
      cta="Start Your Civic Education Journey"
      ctaAction={()=>navigate("/")}
    />

    <div style={{padding:"20px 48px 0"}}>
      <div style={S.inner}><Breadcrumb items={[{label:"Home",path:"/"},{label:"Civic Library"}]}/></div>
    </div>

    {/* Intro */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>START WITH WHAT MATTERS</div>
        <h2 style={S.h2}>Curated Resources for Foundation Building</h2>
        <p style={{...S.body,marginBottom:0}}>The Civic Library provides selected materials to help you begin building clarity and understanding. These resources represent a portion of the full system available inside our private learning platform.</p>
      </div>
    </div>

    {/* Category Cards */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>KNOWLEDGE CATEGORIES</div>
        <h2 style={S.h2}>Four Pillars of Understanding</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px",marginTop:"32px"}}>
          {pillars.map((p,i)=>(
            <div key={i} onClick={()=>setActiveFilter(p.title==="Governance & Stewardship"?"Civic Education":p.title==="Legal Foundations"?"Financial Literacy":p.title)} style={{background:C.white,padding:"28px",cursor:"pointer",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${C.gold}`,transition:"all 0.2s",textAlign:"center"}}>
              <div style={{fontSize:"36px",marginBottom:"12px"}}>{p.icon}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"16px",color:C.purple,margin:"0 0 8px"}}>{p.title}</h3>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"12px",lineHeight:1.6,margin:0}}>{p.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Search + Filter + Grid */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>RESOURCE LIBRARY</div>
        <h2 style={S.h2}>Browse Resources</h2>

        {/* Search */}
        <div style={{marginTop:"24px",marginBottom:"20px"}}>
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",maxWidth:"480px",padding:"14px 20px",fontFamily:"Inter,sans-serif",fontSize:"14px",border:`1.5px solid ${C.divider}`,borderRadius:"2px",outline:"none",background:C.white,color:C.text}}
          />
        </div>

        {/* Filters */}
        <div style={{display:"flex",gap:"8px",marginBottom:"32px",flexWrap:"wrap"}}>
          {filters.map(f=>(
            <button key={f} onClick={()=>setActiveFilter(f)} style={{background:activeFilter===f?C.purple:"transparent",color:activeFilter===f?C.white:C.purple,border:`1.5px solid ${C.purple}`,padding:"8px 18px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"12px",letterSpacing:"0.5px",borderRadius:"2px",cursor:"pointer"}}>{f}</button>
          ))}
        </div>

        {/* Resource Grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"20px"}}>
          {filtered.map((r,i)=>(
            <div key={i} style={{background:C.white,padding:"28px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${r.access==="free"?C.gold:C.purpleMid}`,display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:r.access==="free"?C.green:C.purpleMid,fontWeight:700,letterSpacing:"1px",background:r.access==="free"?"#e8f5e9":C.purplePale,padding:"4px 10px"}}>{r.access==="free"?"FREE ACCESS":"MEMBER ONLY"}</span>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:C.textLight,fontWeight:600,letterSpacing:"1px"}}>{r.type.toUpperCase()}</span>
              </div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"16px",color:C.purple,margin:"0 0 8px",lineHeight:1.3}}>{r.title}</h3>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"13px",lineHeight:1.6,margin:"0 0 16px",flex:1}}>{r.desc}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,fontWeight:600}}>{r.category}</span>
                <button style={{background:r.access==="free"?C.purple:C.purpleMid,color:C.white,padding:"8px 16px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"11px",borderRadius:"2px",border:"none",cursor:"pointer"}}>{r.access==="free"?"View Resource":"Unlock Access"}</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:"48px",marginBottom:"16px"}}>📚</div>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"16px"}}>No resources match your search. Try a different term or filter.</p>
        </div>}
      </div>
    </div>

    {/* Locked Content */}
    <div style={S.sectionAlt}>
      <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:"48px",marginBottom:"20px"}}>🔒</div>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(24px,3vw,36px)",color:C.purple,margin:"0 0 16px"}}>Access the Full Knowledge Vault</h2>
        <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"16px",lineHeight:1.8,marginBottom:"32px"}}>The Civic Library provides a limited selection of resources. Full access is available through our private learning platform — with advanced tools, structured learning paths, and guided implementation.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <button style={S.btnPrimary}>Access Full Library →</button>
          <button onClick={()=>navigate("/programs")} style={S.btnSecondary}>Explore Programs</button>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div style={{background:C.purple,padding:"80px 48px",textAlign:"center"}}>
      <div style={S.inner}>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.white,margin:"0 0 16px"}}>Build with Clarity.<br/>Move with Purpose.</h2>
        <p style={{fontFamily:"Inter,sans-serif",color:"#b0a8c0",fontSize:"16px",lineHeight:1.8,maxWidth:"500px",margin:"0 auto 32px"}}>Continue your progress. Move beyond foundational knowledge into structured learning, application, and implementation.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>navigate("/")} style={{background:C.goldBright,color:C.purple,padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",borderRadius:"2px",border:"none",cursor:"pointer"}}>Start Your Journey</button>
          <button onClick={()=>navigate("/programs")} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Join Membership</button>
        </div>
      </div>
    </div>
  </React.Fragment>;
}

/* ═══════ ROUTER + APP ═══════ */
function App() {
  const hash = useHash();
  const route = hash.replace("#","") || "/";

  let Page;
  switch(route) {
    case "/about": Page = AboutPage; break;
    case "/programs": Page = ProgramsPage; break;
    case "/civic-library": Page = CivicLibraryPage; break;
    default: Page = HomePage;
  }

  return <div style={{background:C.bg,minHeight:"100vh"}}>
    <TrustBar/>
    <Nav/>
    <Page/>
    <Footer/>
  </div>;
}

ReactDOM.render(<App/>, document.getElementById("root"));
