const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

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

/* ───── Signup Modal Context ───── */
const SignupModalContext = createContext({ open: function(){}, close: function(){} });

function useSignupModal() {
  return useContext(SignupModalContext);
}

/* ───── Signup API Config ───── */
const SIGNUP_ENDPOINT = "https://api.educationministry.org/signup";
const SIGNUP_TIMEOUT_MS = 10000;

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


/* ───── Professional SVG Icons ───── */
function SvgIcon({path, size, color, viewBox}) {
  size = size || 24; color = color || C.purple; viewBox = viewBox || "0 0 24 24";
  return React.createElement("svg", {width:size, height:size, viewBox:viewBox, fill:"none", stroke:color, strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round", style:{flexShrink:0}},
    typeof path === "string"
      ? React.createElement("path", {d:path})
      : path
  );
}

/* Filled variant for some icons */
function SvgIconFilled({path, size, color, viewBox}) {
  size = size || 24; color = color || C.purple; viewBox = viewBox || "0 0 24 24";
  return React.createElement("svg", {width:size, height:size, viewBox:viewBox, fill:color, stroke:"none", style:{flexShrink:0}},
    typeof path === "string"
      ? React.createElement("path", {d:path})
      : path
  );
}

const IconPaths = {
  // Scale/Justice (Civic Literacy)
  scale: "M12 3v18M4 7l8-4 8 4M4 7v3a8 8 0 004 6.93M20 7v3a8 8 0 01-4 6.93",
  // Building/Landmark (Financial Structure, Governance)
  landmark: "M3 21h18M3 10h18M12 3l9 7H3l9-7zM5 10v8M9 10v8M15 10v8M19 10v8",
  // Scroll/Document (Legal)
  scroll: "M8 21h12a2 2 0 002-2V5a2 2 0 00-2-2H8M8 21a2 2 0 01-2-2V5a2 2 0 012-2M8 21V3M12 8h4M12 12h4M12 16h2",
  // Leaf (Stewardship/Growth)
  leaf: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c5 0 9.27-3.11 11-8 0 0-2.56 2-5 2a4 4 0 01-4-4c0-2 .5-3 2-5M12 2c0 0 5 2 5 10",
  // Shield
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  // Users/Family
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  // BookOpen
  bookOpen: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z",
  // GraduationCap
  graduationCap: "M22 10l-10-5L2 10l10 5 10-5zM6 12v5c0 0 2.5 3 6 3s6-3 6-3v-5",
  // FileText (Document/Clipboard)
  fileText: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  // Home
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
  // Heart
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
  // Target/Award
  award: "M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  // TrendingUp
  trendingUp: "M23 6l-9.5 9.5-5-5L1 18",
  // Compass (navigation/direction)
  compass: "M12 22a10 10 0 100-20 10 10 0 000 20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
  // Wrench/Gear (Operator)
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  // Drafting Compass / Architect
  penTool: "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 13a2 2 0 100-4 2 2 0 000 4z",
  // Crown (Capstone)
  crown: "M2 20h20L19 8l-5 5-2-7-2 7-5-5-3 12z",
  // Lock
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  // Construction/Hammer (First-Gen Builder)
  hammer: "M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9M17.64 15L22 10.64M20.91 11.73l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V6.5a.5.5 0 00-.5-.5H16.5a3.17 3.17 0 01-2.24-.93L13 3.82",
  // HardHat / Worker
  hardHat: "M2 18a1 1 0 001 1h18a1 1 0 001-1v-2a8 8 0 00-16 0v0M12 2v8M2 18h20M4 16v-2a8 8 0 0116 0v2",
  // Community/Houses
  community: "M3 21h6v-7H3v7zM9 21h6V10H9v11zM15 21h6v-9h-6v9zM3 14l6-4M9 10l6-7M15 12l6-3",
  // Seedling
  seedling: "M7 20h10M12 20v-8M12 12C12 12 8 10 8 6c0-2 2-4 4-4s4 2 4 4c0 4-4 6-4 6z",
  // Clipboard/Checklist
  clipboard: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 2h6a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1zM9 14l2 2 4-4",
  // Cross / Medical
  medical: "M12 2v20M17 7H7v10h10V7z",
  // Handshake (Charitable)
  handshake: "M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.78.77L12 20.64l7.64-7.64.78-.77a5.4 5.4 0 000-7.65z",
  // AlertTriangle
  alertTriangle: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01",
  // Star (Bronze/Silver/Gold/Platinum)
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z",
  // Diamond
  diamond: "M6 3h12l4 6-10 13L2 9l4-6zM12 22V9M2 9h20",
  // CreditCard
  creditCard: "M1 4h22v16H1V4zM1 10h22",
  // Check circle
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3",
};

/* Icon render helper - returns React SVG element */
function Icon(name, size, color) {
  size = size || 24; color = color || C.purple;
  return SvgIcon({path: IconPaths[name], size: size, color: color});
}


/* ───── Data ───── */
const steps = [
  { key:"seeker", level:"01", title:"Seeker", price:"Free",
    tagline:"Wisdom begins with structure, not sentiment.",
    desc:"Recognize the order under which healthy building occurs. Civic literacy begins here — not with activism, but with understanding how law, governance, and inheritance function.",
    ot:"Deut. 4:5–8", nt:"Luke 14:28–30", civic:"Literacy & Foresight",
    otQ:"Observe them carefully, for this will show your wisdom and understanding to the nations.",
    ntQ:"Suppose one of you wants to build a tower. Will he not first sit down and estimate the cost?" },
  { key:"operator", level:"02", title:"Operator", price:"$97/mo",
    tagline:"Stewardship is proven in administration.",
    desc:"Faithfulness begins with competent handling of what is already entrusted. Household systems, records, budgets, and responsibilities — administered with integrity.",
    ot:"Deut. 19:14", nt:"Luke 16:10–12", civic:"Integrity & Administration",
    otQ:"Do not move your neighbor's boundary marker set up by your predecessors.",
    ntQ:"Whoever can be trusted with very little can also be trusted with much." },
  { key:"architect", level:"03", title:"Architect", price:"$298/mo",
    tagline:"Legacy requires design, not hope.",
    desc:"A mature household structures succession, witnesses transfers, and plans for continuity. The daughters of Zelophehad made a lawful claim. Ruth's redemption was witnessed at the gate.",
    ot:"Num. 27:1–11", nt:"Gal. 4:1–2", civic:"Lawful Succession",
    otQ:"Why should our father's name disappear from his clan? Give us property among our father's relatives.",
    ntQ:"The heir is subject to guardians and trustees until the time set by his father." },
  { key:"steward", level:"04", title:"Steward", price:"$599/mo",
    tagline:"Public trust is part of spiritual maturity.",
    desc:"Stewardship is fiduciary. It includes accountability before God and credibility before people. Govern for others, not only self.",
    ot:"Ruth 4:1–12", nt:"2 Cor. 8:20–21", civic:"Public Accountability",
    otQ:"Boaz said to the elders and all the people, 'You are witnesses today.'",
    ntQ:"We are taking pains to do what is right, not only in the eyes of the Lord but also in the eyes of man." },
];

const personas = [
  { label:"Overtime Worker", iconName:"hardHat",
    has:["Consistent income","Strong work ethic","Family responsibility"],
    lacks:["Legal map for assets","Succession plan","Civic framework"],
    ot:"1 Tim. 5:8", nt:"Titus 3:14",
    quote:"He provides. But provision without structure leaves the next generation exposed." },
  { label:"Dual Income Family", iconName:"users",
    has:["Two incomes","High responsibility","Community presence"],
    lacks:["Transfer planning","Entity protection","Governance design"],
    ot:"Num. 36:1–12", nt:"Luke 16:10–12",
    quote:"They built together. But without order, what they built cannot be passed on intact." },
  { label:"First-Gen Builder", iconName:"hammer",
    has:["Asset growth","Entrepreneurial drive","Vision for legacy"],
    lacks:["Protection architecture","Legal literacy","Succession structure"],
    ot:"Ruth 4:1–12", nt:"Gal. 4:1–2",
    quote:"First generation builds. Without structure, the second generation inherits confusion." },
];

const pillars = [
  { iconName:"scale", title:"Civic Literacy", ot:"Deut. 4:5–8", nt:"Luke 14:28–30",
    quote:"Statutes and judgments as public wisdom before the nations.",
    body:"Understand how law, governance, and civic institutions function — not as abstract theory, but as the operating system of ordered community life.",
    modules:["Constitutional foundations","Local governance structures","Civic rights and duties","Public accountability systems"] },
  { iconName:"landmark", title:"Financial Structure", ot:"Deut. 19:14", nt:"Luke 16:10–12",
    quote:"Do not move your neighbor's boundary marker.",
    body:"Boundaries are not metaphors. They are legal instruments. Learn to establish, protect, and transfer financial order across generations.",
    modules:["Household budgeting systems","Asset protection basics","Entity structures","Intergenerational transfer planning"] },
  { iconName:"scroll", title:"Legal Foundations", ot:"Num. 27:1–11 · Ruth 4:1–12", nt:"Gal. 4:1–2",
    quote:"Inheritance was ordered, witnessed, and law-shaped.",
    body:"The daughters of Zelophehad did not petition emotionally. They made a lawful claim. Ruth's redemption was witnessed at the gate. Legal literacy is biblical literacy.",
    modules:["Inheritance law basics","Trust instruments overview","Estate planning fundamentals","Witness and documentation standards"] },
  { iconName:"leaf", title:"Governance & Stewardship", ot:"Lev. 25:23–28", nt:"1 Cor. 4:1–2 · 2 Cor. 8:20–21",
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

/* ═══════ MODAL + SIGNUP FORM ═══════ */

function Modal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Body scroll lock & focus trap
  useEffect(function() {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.classList.add("modal-body-lock");
      // Focus first focusable element
      setTimeout(function() {
        if (containerRef.current) {
          var focusable = containerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable.length > 0) focusable[0].focus();
        }
      }, 100);
    } else {
      document.body.classList.remove("modal-body-lock");
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return function() {
      document.body.classList.remove("modal-body-lock");
    };
  }, [isOpen]);

  // ESC key handler
  useEffect(function() {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) onClose();
      // Focus trap
      if (e.key === "Tab" && isOpen && containerRef.current) {
        var focusable = containerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function() { document.removeEventListener("keydown", handleKeyDown); };
  }, [isOpen, onClose]);

  // Click overlay to close
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return React.createElement("div", {
    ref: overlayRef,
    className: "modal-overlay" + (isOpen ? " modal-open" : ""),
    onClick: handleOverlayClick,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Sign up for free civic education"
  },
    React.createElement("div", { ref: containerRef, className: "modal-container" },
      React.createElement("button", {
        className: "modal-close-btn",
        onClick: onClose,
        "aria-label": "Close modal",
        type: "button"
      }, "\u2715"),
      children
    )
  );
}

function SeekerSignupForm({ source, onClose }) {
  var _s = useState({ firstName: "", lastName: "", email: "", phone: "" });
  var form = _s[0], setForm = _s[1];
  var _e = useState({});
  var errors = _e[0], setErrors = _e[1];
  var _a = useState(false);
  var agreed = _a[0], setAgreed = _a[1];
  var _st = useState("idle"); // idle | loading | success | error
  var status = _st[0], setStatus = _st[1];
  var _em = useState("");
  var errorMsg = _em[0], setErrorMsg = _em[1];

  function handleChange(field, value) {
    var next = {}; for (var k in form) next[k] = form[k];
    next[field] = value;
    setForm(next);
    // Clear error on change
    if (errors[field]) {
      var nextErr = {}; for (var k2 in errors) nextErr[k2] = errors[k2];
      delete nextErr[field];
      setErrors(nextErr);
    }
  }

  function validate() {
    var errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (form.phone.trim() && !/^[\d\s\-\+\(\)\.]{7,20}$/.test(form.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (!agreed) errs.agreed = "You must agree to the privacy policy.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    var errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    setErrorMsg("");

    var payload = JSON.stringify({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      source: source || "seeker"
    });

    // Timeout via AbortController
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timeoutId = controller ? setTimeout(function() { controller.abort(); }, SIGNUP_TIMEOUT_MS) : null;

    fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      signal: controller ? controller.signal : undefined,
      mode: "cors"
    })
    .then(function(res) {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Server error (" + res.status + ")");
      return res.json();
    })
    .then(function() {
      setStatus("success");
    })
    .catch(function(err) {
      clearTimeout(timeoutId);
      console.error("[Seeker Signup Error]", err);
      if (err.name === "AbortError") {
        setErrorMsg("Request timed out. Please check your connection and try again.");
      } else {
        setErrorMsg("Something went wrong. Please try again or contact us at info@educationministry.org.");
      }
      setStatus("error");
    });
  }

  function handleRetry() {
    setStatus("idle");
    setErrorMsg("");
  }

  // ── Success State ──
  if (status === "success") {
    return React.createElement("div", { style: { padding: "48px 40px", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: "56px", marginBottom: "20px" } }, "\u2705"),
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "26px", color: C.purple, margin: "0 0 12px" } }, "You're In!"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", color: C.textMid, fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" } },
        "Check your email for next steps. You\u2019ll receive your welcome guide and access to the Young Civic Engagement Challenge shortly."
      ),
      React.createElement("div", { style: { background: C.purplePale, padding: "20px", border: "1px solid " + C.purpleLight, marginBottom: "24px", textAlign: "left" } },
        React.createElement("div", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.gold, letterSpacing: "2px", fontWeight: 700, marginBottom: "10px" } }, "WHAT\u2019S NEXT"),
        React.createElement("div", { style: { display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" } },
          React.createElement("span", { style: { color: C.green, fontWeight: 700 } }, "1."),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", color: C.text, fontSize: "13px" } }, "Check your inbox for the welcome email")
        ),
        React.createElement("div", { style: { display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" } },
          React.createElement("span", { style: { color: C.green, fontWeight: 700 } }, "2."),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", color: C.text, fontSize: "13px" } }, "Begin the Young Civic Engagement Challenge")
        ),
        React.createElement("div", { style: { display: "flex", gap: "8px", alignItems: "center" } },
          React.createElement("span", { style: { color: C.green, fontWeight: 700 } }, "3."),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", color: C.text, fontSize: "13px" } }, "Build your foundation \u2014 at your own pace")
        )
      ),
      React.createElement("button", {
        onClick: onClose,
        style: { background: C.purple, color: C.white, padding: "14px 32px", fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: "14px", borderRadius: "2px", border: "none", cursor: "pointer" }
      }, "Close")
    );
  }

  // ── Error State ──
  if (status === "error") {
    return React.createElement("div", { style: { padding: "48px 40px", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: "56px", marginBottom: "20px" } }, "\u26A0\uFE0F"),
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "24px", color: C.purple, margin: "0 0 12px" } }, "Something Went Wrong"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", color: C.textMid, fontSize: "14px", lineHeight: 1.7, marginBottom: "28px" } }, errorMsg),
      React.createElement("div", { style: { display: "flex", gap: "12px", justifyContent: "center" } },
        React.createElement("button", {
          onClick: handleRetry,
          style: { background: C.gold, color: C.white, padding: "14px 28px", fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: "14px", borderRadius: "2px", border: "none", cursor: "pointer" }
        }, "Try Again"),
        React.createElement("button", {
          onClick: onClose,
          style: { background: "transparent", color: C.purple, border: "2px solid " + C.divider, padding: "14px 28px", fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: "14px", borderRadius: "2px", cursor: "pointer" }
        }, "Close")
      )
    );
  }

  // ── Form State (idle / loading) ──
  var isLoading = status === "loading";

  return React.createElement("div", { style: { padding: "0" } },
    // Header
    React.createElement("div", { style: { background: "linear-gradient(135deg, " + C.purple + " 0%, " + C.purpleMid + " 100%)", padding: "36px 40px 28px", textAlign: "center" } },
      React.createElement("div", { style: { fontFamily: "Inter,sans-serif", fontSize: "10px", color: "#e8d5a0", letterSpacing: "2px", fontWeight: 700, marginBottom: "10px" } }, "FREE \u00B7 YOUNG CIVIC ENGAGEMENT CHALLENGE"),
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "24px", color: C.white, margin: "0 0 8px", lineHeight: 1.2 } }, "Begin the Young Civic Engagement Challenge"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#c8b8e8", lineHeight: 1.5, margin: 0 } }, "Start your journey with structured civic education \u2014 completely free.")
    ),
    // Form
    React.createElement("form", { onSubmit: handleSubmit, style: { padding: "32px 40px 36px" }, noValidate: true },
      // Name row
      React.createElement("div", { className: "signup-form-row", style: { display: "flex", gap: "16px" } },
        React.createElement("div", { className: "signup-form-group", style: { flex: 1 } },
          React.createElement("label", { htmlFor: "signup-first" }, "First Name *"),
          React.createElement("input", {
            id: "signup-first", type: "text", placeholder: "First name",
            value: form.firstName, disabled: isLoading,
            className: errors.firstName ? "input-error" : "",
            onChange: function(e) { handleChange("firstName", e.target.value); }
          }),
          errors.firstName && React.createElement("div", { className: "signup-form-error" }, errors.firstName)
        ),
        React.createElement("div", { className: "signup-form-group", style: { flex: 1 } },
          React.createElement("label", { htmlFor: "signup-last" }, "Last Name *"),
          React.createElement("input", {
            id: "signup-last", type: "text", placeholder: "Last name",
            value: form.lastName, disabled: isLoading,
            className: errors.lastName ? "input-error" : "",
            onChange: function(e) { handleChange("lastName", e.target.value); }
          }),
          errors.lastName && React.createElement("div", { className: "signup-form-error" }, errors.lastName)
        )
      ),
      // Email
      React.createElement("div", { className: "signup-form-group" },
        React.createElement("label", { htmlFor: "signup-email" }, "Email Address *"),
        React.createElement("input", {
          id: "signup-email", type: "email", placeholder: "you@example.com",
          value: form.email, disabled: isLoading,
          className: errors.email ? "input-error" : "",
          onChange: function(e) { handleChange("email", e.target.value); }
        }),
        errors.email && React.createElement("div", { className: "signup-form-error" }, errors.email)
      ),
      // Phone
      React.createElement("div", { className: "signup-form-group" },
        React.createElement("label", { htmlFor: "signup-phone" }, "Phone (optional)"),
        React.createElement("input", {
          id: "signup-phone", type: "tel", placeholder: "(555) 555-5555",
          value: form.phone, disabled: isLoading,
          className: errors.phone ? "input-error" : "",
          onChange: function(e) { handleChange("phone", e.target.value); }
        }),
        errors.phone && React.createElement("div", { className: "signup-form-error" }, errors.phone)
      ),
      // Privacy checkbox
      React.createElement("div", { className: "signup-checkbox-group" },
        React.createElement("input", {
          id: "signup-privacy", type: "checkbox",
          checked: agreed, disabled: isLoading,
          onChange: function(e) { setAgreed(e.target.checked); if (errors.agreed) { var ne = {}; for (var k in errors) ne[k]=errors[k]; delete ne.agreed; setErrors(ne); } }
        }),
        React.createElement("label", { htmlFor: "signup-privacy" },
          "I agree to receive educational materials and understand my data will be handled per our ",
          React.createElement("span", { style: { color: C.gold, fontWeight: 600, textDecoration: "underline", cursor: "pointer" } }, "privacy policy"),
          "."
        )
      ),
      errors.agreed && React.createElement("div", { className: "signup-form-error", style: { marginTop: "-16px", marginBottom: "16px" } }, errors.agreed),
      // Submit button
      React.createElement("button", {
        type: "submit",
        className: "signup-submit-btn",
        disabled: isLoading
      }, isLoading ? "Submitting\u2026" : "Start The Challenge \u2014 Free \u2192"),
      // Trust signals
      React.createElement("div", { style: { display: "flex", gap: "16px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" } },
        React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.textLight } }, "\uD83D\uDD12 Secure & Private"),
        React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.textLight } }, "\u2709\uFE0F No Spam, Ever"),
        React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.textLight } }, "\u2714\uFE0F 100% Free")
      )
    )
  );
}


/* ═══════ SHARED COMPONENTS ═══════ */

function TrustBar() {
  return <div style={{background:C.purple,color:"#e8d5a0",padding:"9px 24px",textAlign:"center",fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"1.5px",fontWeight:600}}>
    508(c)(1)(a) FAITH-BASED NONPROFIT · CIVIC EDUCATION · ESTATE TRUST PLANNING · EDUCATIONMINISTRY.ORG
  </div>;
}

function Nav() {
  const hash = useHash();
  const { open: openSignup } = useSignupModal();
  const current = hash.replace("#","") || "/";
  const navItems = [
    { label:"Home", path:"/" },
    { label:"About", path:"/about" },
    { label:"Programs", path:"/programs" },
    { label:"Civic Library", path:"/civic-library" },
    { label:"Membership", path:"/membership" },
    { label:"Donate", path:"/donate" },
  ];
  return <nav style={{background:C.white,padding:"14px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.divider}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(45,27,78,0.07)"}}>
    <div style={{display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}} onClick={()=>navigate("/")}>
      <img src="assets/images/bodhi-tree-logo-header.png" alt="Bodhi Tree Logo" style={{width:"54px",height:"54px",objectFit:"contain",flexShrink:0}} />
      <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"18px",fontWeight:700,letterSpacing:"0.5px",lineHeight:1.2}}>Education Ministry</div>
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
      <button onClick={()=>openSignup("header-begin-free")} style={{background:C.purple,color:C.white,padding:"9px 20px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"0.5px",borderRadius:"2px",cursor:"pointer",border:"none"}}>Begin Free →</button>
      <a href="https://platform.btpma.org/login" target="_blank" rel="noopener noreferrer" style={{background:"transparent",color:C.purple,border:`1.5px solid ${C.divider}`,padding:"9px 18px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"13px",borderRadius:"2px",cursor:"pointer",textDecoration:"none",display:"inline-block"}}>Login</a>
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
        {title:"Resources",links:[{label:"Civic Library",path:"/civic-library"},{label:"About",path:"/about"},{label:"Membership",path:"/membership"},{label:"Donate",path:"/donate"},{label:"AEMP",path:"/programs"}]},
        {title:"Legal",links:[{label:"Privacy Policy",path:"/privacy-policy"},{label:"Terms",path:"/terms"},{label:"Disclaimer",path:"/disclaimer"},{label:"508(c)(1)(a) Status",path:"/508c1a-status"}]}
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
  const { open: openSignup } = useSignupModal();
  return <div style={{position:"relative",width:"100%",minHeight:"600px",overflow:"hidden",borderBottom:`2px solid ${C.goldBorder}`}}>
    <img src="assets/images/vFinal Heritage Bodhi Tree Hero Image Only.png" alt="Heritage Bodhi Tree" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:0}} />
    <div style={{position:"absolute",top:0,left:0,width:"60%",height:"100%",background:"linear-gradient(to right, rgba(20,10,30,0.72) 0%, rgba(20,10,30,0.55) 40%, rgba(20,10,30,0.25) 70%, transparent 100%)",zIndex:1}} />
    <div style={{position:"absolute",top:0,left:0,width:"55%",height:"100%",backdropFilter:"blur(2px)",WebkitBackdropFilter:"blur(2px)",maskImage:"linear-gradient(to right, black 0%, black 50%, transparent 100%)",WebkitMaskImage:"linear-gradient(to right, black 0%, black 50%, transparent 100%)",zIndex:1}} />
    <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"100px 48px 80px 140px",minHeight:"600px",maxWidth:"900px"}}>
      <h1 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(40px,5.5vw,72px)",color:C.white,margin:"0 0 20px",lineHeight:1.05,fontWeight:700,textShadow:"0 2px 16px rgba(0,0,0,0.4)"}}>
        <span style={{whiteSpace:"nowrap"}}>Faith-Grounded</span><br/><span style={{whiteSpace:"nowrap"}}>Civic Virtue.</span>
      </h1>
      <p style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(15px,1.5vw,18px)",color:"rgba(255,255,255,0.92)",margin:"0 0 36px",lineHeight:1.7,fontWeight:400,textShadow:"0 1px 8px rgba(0,0,0,0.3)"}}>
        <span style={{whiteSpace:"nowrap"}}>The civic education that builds and preserves families across generations</span><br/>
        <span style={{whiteSpace:"nowrap"}}>—grounded in scripture, hidden in plain view.</span>
      </p>
      <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
        <button onClick={()=>openSignup("hero-start-challenge")} style={{background:C.gold,color:C.purple,padding:"16px 32px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",letterSpacing:"0.3px",border:"none",cursor:"pointer",transition:"all 0.2s"}}>
          Start The Challenge
        </button>
        <button onClick={()=>navigate("/programs")} style={{background:"transparent",color:C.white,padding:"16px 32px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",letterSpacing:"0.3px",border:"2px solid rgba(255,255,255,0.8)",cursor:"pointer",transition:"all 0.2s"}}>
          View The Path
        </button>
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
          <button key={i} onClick={()=>setActive(i)} style={{background:active===i?C.purple:"transparent",color:active===i?C.white:C.purple,border:`1.5px solid ${C.purple}`,padding:"10px 20px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",borderRadius:"2px",cursor:"pointer"}}>{Icon(per.iconName, 16, active===i?C.white:C.purple)} {per.label}</button>
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
            <div style={{marginBottom:"16px"}}>{Icon(p.iconName, 52, C.purple)}</div>
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
  const { open: openSignup } = useSignupModal();
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
        <button onClick={()=>openSignup("path-begin-seeker")} style={S.btnPrimary}>Begin as a Seeker — Free</button>
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
            <div style={{marginBottom:"12px"}}>{Icon(p.iconName, 28, active===i?C.goldBright:C.gold)}</div>
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
  const [capstoneModalOpen,setCapstoneModalOpen]=useState(false);
  return <div style={{background:C.goldPale,padding:"80px 48px",borderTop:`3px solid ${C.goldBorder}`}}>
    <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
      <div style={S.label}>CAPSTONE · ESTATE TRUST DIRECTIVE</div>
      <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,52px)",color:C.purple,margin:"0 0 16px",lineHeight:1.2}}>Set in Order<br/><span style={{color:C.gold}}>What Must Outlive You</span></h2>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"18px",marginBottom:"8px",lineHeight:1.6}}>"The land must not be sold permanently, because the land is mine and you reside in my land as foreigners and strangers."</p>
      <p style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.gold,letterSpacing:"2px",marginBottom:"32px",fontWeight:600}}>— LEVITICUS 25:23 · OT ESTATE ORDER</p>
      <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"16px",marginBottom:"8px",lineHeight:1.6}}>"In the case of a will, it is necessary to prove the death of the one who made it, because a will is in force only when somebody has died."</p>
      <p style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.purpleMid,letterSpacing:"2px",marginBottom:"48px",fontWeight:600}}>— HEBREWS 9:16–17 · NT TRUST ORDER</p>
      <div style={{background:C.white,border:`1px solid ${C.goldBorder}`,padding:"48px",marginBottom:"40px",boxShadow:"0 4px 24px rgba(45,27,78,0.08)"}}>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textLight,letterSpacing:"2px",marginBottom:"32px"}}>ESTATE TRUST DIRECTIVE · QUALIFICATION REQUIRED</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",marginBottom:"32px",textAlign:"left"}}>
          {[{ref:"Lev. 25:23–28",label:"Land & Redemption Order"},{ref:"Num. 36:1–12",label:"Inheritance Preservation"},{ref:"1 Cor. 4:1–2",label:"Faithful Administration"}].map(({ref,label})=>(
            <div key={ref} style={{background:C.purplePale,padding:"16px",borderTop:`2px solid ${C.gold}`}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",color:C.gold,fontSize:"12px",marginBottom:"6px",fontWeight:700}}>{ref}</div>
              <div style={{fontFamily:"Inter,sans-serif",color:C.purple,fontSize:"12px"}}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"15px",lineHeight:1.8,marginBottom:"28px"}}>The Capstone is not a product. It is the final expression of ordered love — lawful transfer, protected inheritance, and intentional blessing across generations. Qualification is required.</p>
        <button onClick={()=>setCapstoneModalOpen(true)} style={{...S.btnPrimary,padding:"18px 48px",fontSize:"16px"}}>Apply for Capstone Engagement →</button>
      </div>
      <p style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"12px",lineHeight:1.6}}>BT Education Ministry is a 508(c)(1)(a) faith-based nonprofit. This engagement is educational and ministerial in nature. Not legal advice. Consult qualified legal counsel for estate planning.</p>
    </div>
    <Modal isOpen={capstoneModalOpen} onClose={()=>setCapstoneModalOpen(false)}>
      <CapstoneApplicationForm onClose={()=>setCapstoneModalOpen(false)}/>
    </Modal>
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
  const { open: openSignup } = useSignupModal();
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
            {title:"Statutory Exception",iconName:"clipboard",desc:"Tax-exempt by law — not by application. This means we operate under inherent religious and educational authority."},
            {title:"No IRS Filing Required",iconName:"landmark",desc:"Unlike 501(c)(3)s, 508(c)(1)(a) organizations do not need IRS determination letters. Our authority comes from statute, not from the agency."},
            {title:"First Amendment Protected",iconName:"scale",desc:"Our mission is grounded in religious and educational liberty — protected by the First Amendment and codified in federal tax law."},
            {title:"Charitable Purpose",iconName:"heart",desc:"We exist exclusively to provide ministry, education, and charitable services to needy and low-income families."},
          ].map(item=>(
            <div key={item.title} style={{...S.card,borderTop:`3px solid ${C.gold}`}}>
              <div style={{marginBottom:"12px"}}>{Icon(item.iconName, 28, C.gold)}</div>
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
            {iconName:"users",title:"Families in Need",desc:"Low-income and underserved families seeking structured education, civic knowledge, and practical tools for building stability."},
            {iconName:"bookOpen",title:"Individuals Seeking Foundation",desc:"People who want foundational education in civic literacy, financial structure, and governance — grounded in faith-based principles."},
            {iconName:"community",title:"Communities Underserved",desc:"Communities where financial and civic literacy are lacking — where people work hard but build without durable structure."},
            {iconName:"seedling",title:"Faith-Aligned Seekers",desc:"Those looking for guidance and structure rooted in scripture — not sentiment, but ordered principle applied to real life."},
          ].map(item=>(
            <div key={item.title} style={{...S.card,borderTop:`3px solid ${C.purpleMid}`}}>
              <div style={{marginBottom:"12px"}}>{Icon(item.iconName, 32, C.purpleMid)}</div>
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
            {step:"01",title:"Start with the Young Civic Engagement Challenge",desc:"Access free foundational education and begin building understanding."},
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
          <button onClick={()=>openSignup("about-start-challenge")} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Start Free Challenge</button>
        </div>
      </div>
    </div>
  </React.Fragment>;
}

/* ═══════ PROGRAMS PAGE ═══════ */
function ProgramsPage() {
  const { open: openSignup } = useSignupModal();
  const [activeStep, setActiveStep] = useState(0);
  const [capstoneModalOpen, setCapstoneModalOpen] = useState(false);
  return <React.Fragment>
    <PageHero
      label="PROGRAMS · STRUCTURED PROGRESSION"
      headline={<span>A Structured Path from<br/>Learning to <span style={{color:C.gold}}>Leadership</span></span>}
      sub="Our programs guide individuals and families from foundational understanding to real-world application, culminating in full stewardship and governance."
      cta="Start as Seeker — Free"
      ctaAction={()=>openSignup("programs-hero")}
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
            <button onClick={()=>openSignup("programs-civic-challenge")} style={{...S.btnPrimary,marginTop:"24px",width:"100%",textAlign:"center"}}>Start as Seeker — Free</button>
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
                {feature:"Price",civic:"Free",aemp:"$97 – $599/mo"},
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
            {iconName:"fileText",label:"Full estate trust design"},
            {iconName:"scale",label:"Fiduciary structuring"},
            {iconName:"landmark",label:"Treasury alignment"},
            {iconName:"users",label:"Beneficiary planning"},
            {iconName:"medical",label:"Healthcare directives"},
            {iconName:"leaf",label:"Custom governance architecture"},
          ].map(item=>(
            <div key={item.label} style={{background:C.white,padding:"20px",display:"flex",gap:"12px",alignItems:"center",boxShadow:"0 1px 6px rgba(45,27,78,0.06)"}}>
              <span>{Icon(item.iconName, 20, C.gold)}</span>
              <span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"13px",fontWeight:600}}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textLight,letterSpacing:"2px",marginBottom:"28px"}}>QUALIFICATION REQUIRED</div>
        <button onClick={()=>setCapstoneModalOpen(true)} style={{...S.btnPrimary,padding:"18px 48px",fontSize:"16px"}}>Apply for Capstone Engagement →</button>
      </div>
    </div>

    {/* Final CTA */}
    <div style={{background:C.purple,padding:"80px 48px",textAlign:"center"}}>
      <div style={S.inner}>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.white,margin:"0 0 16px"}}>Start Where You Are.<br/>Build Toward What Matters.</h2>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap",marginTop:"32px"}}>
          <button onClick={()=>openSignup("programs-footer-seeker")} style={{background:C.goldBright,color:C.purple,padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",borderRadius:"2px",border:"none",cursor:"pointer"}}>Start as Seeker — Free</button>
          <button onClick={()=>setCapstoneModalOpen(true)} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Apply for Capstone</button>
        </div>
      </div>
    </div>

    {/* Capstone Application Modal */}
    <Modal isOpen={capstoneModalOpen} onClose={()=>setCapstoneModalOpen(false)}>
      <CapstoneApplicationForm onClose={()=>setCapstoneModalOpen(false)}/>
    </Modal>
  </React.Fragment>;
}

/* ═══════ CIVIC LIBRARY PAGE ═══════ */
function CivicLibraryPage() {
  const { open: openSignup } = useSignupModal();
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
      ctaAction={()=>openSignup("library-hero")}
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
              <div style={{marginBottom:"12px"}}>{Icon(p.iconName, 36, C.gold)}</div>
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
          <div style={{marginBottom:"16px"}}>{Icon("bookOpen", 48, C.textLight)}</div>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"16px"}}>No resources match your search. Try a different term or filter.</p>
        </div>}
      </div>
    </div>

    {/* Locked Content */}
    <div style={S.sectionAlt}>
      <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
        <div style={{marginBottom:"20px"}}>{Icon("lock", 48, C.purple)}</div>
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

/* ═══════ MEMBERSHIP PAGE ═══════ */

const membershipTiers = [
  {
    key: "seeker", level: "01", title: "Seeker", price: "Free", period: "",
    tagline: "Begin your journey with foundational civic education.",
    iconName: "seedling",
    popular: false, premium: false,
    benefits: [
      "Access to Young Civic Engagement Challenge",
      "Basic Civic Library resources",
      "Scripture & governance foundations",
      "Community forum access (read-only)",
      "Monthly newsletter",
      "Self-paced learning modules",
    ],
  },
  {
    key: "operator", level: "02", title: "Operator", price: "$97", period: "/month",
    tagline: "Execute with competence. Administer with integrity.",
    iconName: "gear",
    popular: true, premium: false,
    benefits: [
      "Everything in Seeker, plus:",
      "Full Civic Library access",
      "Monthly live workshops",
      "Private community access",
      "Member dashboard & progress tracking",
      "Downloadable templates & tools",
      "Administrative training modules",
      "Email support",
    ],
  },
  {
    key: "architect", level: "03", title: "Architect", price: "$298", period: "/month",
    tagline: "Design legacy structures that outlast you.",
    iconName: "penTool",
    popular: false, premium: false,
    benefits: [
      "Everything in Operator, plus:",
      "Legal templates & frameworks",
      "Estate planning introduction course",
      "1-on-1 monthly coaching session",
      "Entity structure guidance",
      "Family governance frameworks",
      "Priority email & chat support",
      "Quarterly strategy review",
    ],
  },
  {
    key: "steward", level: "04", title: "Steward", price: "$599", period: "/month",
    tagline: "Govern for others. Steward with public accountability.",
    iconName: "landmark",
    popular: false, premium: true,
    benefits: [
      "Everything in Architect, plus:",
      "Advanced estate planning education",
      "Family governance architecture",
      "Fiduciary responsibility training",
      "Weekly 1-on-1 coaching sessions",
      "Priority phone & video support",
      "Custom implementation roadmap",
      "Capstone eligibility pathway",
      "Private mastermind group access",
    ],
  },
];

const capstoneTier = {
  key: "capstone", title: "Capstone", price: "By Qualification", period: "",
  tagline: "The ultimate expression of ordered love — lawful transfer, protected inheritance, and intentional blessing across generations.",
  iconName: "crown",
  benefits: [
    "Full Estate Trust Directive service",
    "Complete fiduciary structuring",
    "Treasury alignment & optimization",
    "Beneficiary design & planning",
    "Healthcare directives",
    "Custom governance architecture",
    "Dedicated advisor team",
    "Lifetime priority support",
    "Annual review & adjustment sessions",
    "Legacy documentation & succession plan",
  ],
};

const comparisonFeatures = [
  { feature: "Civic Engagement Challenge", seeker: true, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Basic Civic Library", seeker: true, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Full Civic Library", seeker: false, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Monthly Workshops", seeker: false, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Private Community", seeker: false, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Member Dashboard", seeker: false, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Templates & Tools", seeker: false, operator: true, architect: true, steward: true, capstone: true },
  { feature: "Legal Templates", seeker: false, operator: false, architect: true, steward: true, capstone: true },
  { feature: "Estate Planning Intro", seeker: false, operator: false, architect: true, steward: true, capstone: true },
  { feature: "1-on-1 Coaching", seeker: false, operator: false, architect: "Monthly", steward: "Weekly", capstone: "Dedicated" },
  { feature: "Entity Structure Guidance", seeker: false, operator: false, architect: true, steward: true, capstone: true },
  { feature: "Advanced Estate Planning", seeker: false, operator: false, architect: false, steward: true, capstone: true },
  { feature: "Family Governance Frameworks", seeker: false, operator: false, architect: false, steward: true, capstone: true },
  { feature: "Priority Support", seeker: false, operator: false, architect: "Email/Chat", steward: "Phone/Video", capstone: "Dedicated Team" },
  { feature: "Capstone Eligibility", seeker: false, operator: false, architect: false, steward: true, capstone: "—" },
  { feature: "Full Estate Trust Directive", seeker: false, operator: false, architect: false, steward: false, capstone: true },
  { feature: "Custom Governance Architecture", seeker: false, operator: false, architect: false, steward: false, capstone: true },
];

const membershipFAQ = [
  { q: "Can I start for free?", a: "Yes. The Seeker tier is completely free and gives you access to the Young Civic Engagement Challenge and foundational civic education resources. No credit card required." },
  { q: "How does the progression system work?", a: "Our membership follows a structured progression: Seeker → Operator → Architect → Steward → Capstone. Each level builds on the previous, moving you from learning to applying to building to governing. You advance when you're ready." },
  { q: "Can I upgrade or downgrade at any time?", a: "Yes. You can upgrade your membership tier at any time. When you upgrade, you immediately gain access to all benefits of the new tier. You can also downgrade at the end of any billing cycle." },
  { q: "What is the Capstone tier?", a: "The Capstone is not a subscription — it's a private engagement for qualified members seeking comprehensive Estate Trust Directive services. It includes full estate trust design, fiduciary structuring, and custom governance architecture. Qualification is required." },
  { q: "Is this a religious organization?", a: "BT Education Ministry is a 508(c)(1)(a) faith-based nonprofit. Our education is grounded in scriptural principles of governance, stewardship, and civic virtue, applied practically to real-life civic and financial literacy." },
  { q: "Are payments tax-deductible?", a: "As a 508(c)(1)(a) organization, contributions and membership payments may be tax-deductible. Consult your tax advisor for guidance specific to your situation." },
  { q: "How do I qualify for Capstone?", a: "Capstone eligibility is available to Steward-level members who demonstrate readiness for comprehensive estate trust planning. An application and qualification review process is required." },
];

/* ═══════ CAPSTONE APPLICATION FORM (multi-step) ═══════ */
const CAPSTONE_GOALS = [
  "Estate Trust Design & Asset Protection",
  "Fiduciary Structuring & Compliance",
  "Beneficiary & Succession Planning",
  "Healthcare Directives",
  "Custom Governance Architecture",
  "Treasury Alignment & Optimization",
  "Legacy Documentation",
  "Family Council Formation",
];

function CapstoneApplicationForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    estateValue: "", familySize: "", currentMembership: "",
    primaryGoals: [], additionalGoals: "", timeline: "", referral: ""
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    var next = {}; for (var k in form) next[k] = form[k];
    next[field] = value;
    setForm(next);
    if (errors[field]) {
      var nextErr = {}; for (var k2 in errors) nextErr[k2] = errors[k2];
      delete nextErr[field];
      setErrors(nextErr);
    }
  }

  function toggleGoal(goal) {
    var goals = form.primaryGoals.slice();
    var idx = goals.indexOf(goal);
    if (idx >= 0) goals.splice(idx, 1);
    else goals.push(goal);
    update("primaryGoals", goals);
  }

  function validateStep(s) {
    var errs = {};
    if (s === 1) {
      if (!form.firstName.trim()) errs.firstName = "First name is required.";
      if (!form.lastName.trim()) errs.lastName = "Last name is required.";
      if (!form.email.trim()) errs.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Valid email required.";
      if (!form.phone.trim()) errs.phone = "Phone is required for Capstone.";
      else if (!/^[\d\s\-\+\(\)\.]{7,20}$/.test(form.phone.trim())) errs.phone = "Valid phone required.";
    }
    if (s === 2) {
      if (!form.estateValue) errs.estateValue = "Please select an estimate.";
      if (!form.familySize) errs.familySize = "Please select family size.";
    }
    if (s === 3) {
      if (form.primaryGoals.length === 0) errs.primaryGoals = "Select at least one goal.";
    }
    return errs;
  }

  function nextStep() {
    var errs = validateStep(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStep(step + 1);
  }

  function prevStep() { setStep(step - 1); }

  function handleSubmit(e) {
    e.preventDefault();
    var errs = validateStep(3);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    setErrorMsg("");

    var payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      estateValue: form.estateValue,
      familySize: form.familySize,
      currentMembership: form.currentMembership,
      primaryGoals: form.primaryGoals,
      additionalGoals: form.additionalGoals.trim(),
      timeline: form.timeline,
      referral: form.referral.trim(),
      source: "capstone-application",
      type: "capstone_application",
      timestamp: new Date().toISOString()
    };

    // Dual-action: 1) Email endpoint 2) AEMP /measure
    var emailReq = fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors"
    }).catch(function(err) { console.warn("[Capstone email error]", err); });

    var measureReq = fetch("https://api.educationministry.org/measure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "capstone_application",
        user: {
          name: form.firstName.trim() + " " + form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim()
        },
        data: {
          estateValue: form.estateValue,
          familySize: form.familySize,
          goals: form.primaryGoals,
          timeline: form.timeline
        },
        timestamp: new Date().toISOString()
      }),
      mode: "cors"
    }).catch(function(err) { console.warn("[Capstone measure error]", err); });

    Promise.all([emailReq, measureReq])
      .then(function() { setStatus("success"); })
      .catch(function(err) {
        console.error("[Capstone submit error]", err);
        setErrorMsg("Something went wrong. Please try again or contact us at info@educationministry.org.");
        setStatus("error");
      });
  }

  // ── Success ──
  if (status === "success") {
    return React.createElement("div", { style: { padding: "48px 40px", textAlign: "center" } },
      React.createElement("div", { style: { marginBottom: "20px" } }, Icon("crown", 56, C.gold)),
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "28px", color: C.purple, marginBottom: "12px" } }, "Application Received"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", color: C.textMid, fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" } },
        "Thank you, " + form.firstName + ". Your Capstone Estate Trust Directive application has been submitted. Our team will review your information and reach out within 2 business days to discuss next steps."),
      React.createElement("div", { style: { background: C.goldPale, padding: "20px", border: "1px solid " + C.goldBorder, marginBottom: "24px", textAlign: "left" } },
        React.createElement("div", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.gold, fontWeight: 700, letterSpacing: "2px", marginBottom: "12px" } }, "WHAT HAPPENS NEXT"),
        React.createElement("div", { style: { display: "flex", gap: "8px", marginBottom: "8px" } },
          React.createElement("span", { style: { color: C.gold, fontWeight: 700 } }, "1."),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid } }, "Application review by our advisory team")
        ),
        React.createElement("div", { style: { display: "flex", gap: "8px", marginBottom: "8px" } },
          React.createElement("span", { style: { color: C.gold, fontWeight: 700 } }, "2."),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid } }, "Qualification call scheduled within 2 business days")
        ),
        React.createElement("div", { style: { display: "flex", gap: "8px" } },
          React.createElement("span", { style: { color: C.gold, fontWeight: 700 } }, "3."),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid } }, "Custom engagement proposal & onboarding")
        )
      ),
      React.createElement("button", { onClick: onClose, style: S.btnSecondary }, "Close")
    );
  }

  // ── Error ──
  if (status === "error") {
    return React.createElement("div", { style: { padding: "48px 40px", textAlign: "center" } },
      React.createElement("div", { style: { marginBottom: "16px" } }, Icon("alertTriangle", 48, C.red)),
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "24px", color: C.purple, marginBottom: "12px" } }, "Submission Error"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", color: C.textMid, fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" } }, errorMsg),
      React.createElement("div", { style: { display: "flex", gap: "12px", justifyContent: "center" } },
        React.createElement("button", { onClick: function() { setStatus("idle"); setErrorMsg(""); }, style: S.btnPrimary }, "Try Again"),
        React.createElement("button", { onClick: onClose, style: S.btnSecondary }, "Close")
      )
    );
  }

  // Step indicators
  var stepIndicator = React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" } },
    [1,2,3].map(function(s) {
      var active = s === step;
      var done = s < step;
      return React.createElement("div", { key: s, style: { display: "flex", alignItems: "center", gap: "8px" } },
        React.createElement("div", { style: {
          width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          background: active ? C.purple : done ? C.green : C.bgAlt,
          color: active || done ? C.white : C.textLight,
          fontFamily: "Inter,sans-serif", fontSize: "13px", fontWeight: 700,
          transition: "all 0.3s"
        } }, done ? "✓" : s),
        React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "12px", color: active ? C.purple : C.textLight, fontWeight: active ? 700 : 400, display: s === 3 ? "inline" : undefined } },
          s === 1 ? "Personal" : s === 2 ? "Estate" : "Goals"),
        s < 3 && React.createElement("div", { style: { width: "24px", height: "2px", background: done ? C.green : C.divider } })
      );
    })
  );

  function renderField(label, field, type, placeholder, required) {
    return React.createElement("div", { className: "signup-form-group" },
      React.createElement("label", null, label, required && " *"),
      React.createElement("input", {
        type: type || "text",
        placeholder: placeholder || "",
        value: form[field],
        onChange: function(e) { update(field, e.target.value); },
        className: errors[field] ? "input-error" : ""
      }),
      errors[field] && React.createElement("div", { className: "signup-form-error" }, errors[field])
    );
  }

  function renderSelect(label, field, options, required) {
    return React.createElement("div", { className: "signup-form-group" },
      React.createElement("label", null, label, required && " *"),
      React.createElement("select", {
        value: form[field],
        onChange: function(e) { update(field, e.target.value); },
        style: {
          width: "100%", padding: "12px 16px", fontFamily: "Inter,sans-serif", fontSize: "14px",
          border: "1.5px solid " + (errors[field] ? C.red : C.divider), borderRadius: "2px",
          background: C.bg, color: form[field] ? C.text : C.textLight, outline: "none"
        }
      },
        React.createElement("option", { value: "" }, "Select..."),
        options.map(function(opt) { return React.createElement("option", { key: opt.value, value: opt.value }, opt.label); })
      ),
      errors[field] && React.createElement("div", { className: "signup-form-error" }, errors[field])
    );
  }

  // Steps content
  var stepContent;
  if (step === 1) {
    stepContent = React.createElement("div", null,
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "22px", color: C.purple, marginBottom: "4px" } }, "Personal Information"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid, marginBottom: "24px" } }, "Tell us about yourself so our advisory team can prepare for your consultation."),
      React.createElement("div", { style: { display: "flex", gap: "16px" } },
        React.createElement("div", { style: { flex: 1 } }, renderField("First Name", "firstName", "text", "John", true)),
        React.createElement("div", { style: { flex: 1 } }, renderField("Last Name", "lastName", "text", "Smith", true))
      ),
      renderField("Email Address", "email", "email", "john@example.com", true),
      renderField("Phone Number", "phone", "tel", "(555) 123-4567", true)
    );
  } else if (step === 2) {
    stepContent = React.createElement("div", null,
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "22px", color: C.purple, marginBottom: "4px" } }, "Estate Details"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid, marginBottom: "24px" } }, "This helps us understand the scope and tailor our approach to your situation."),
      renderSelect("Estimated Estate Value", "estateValue", [
        { value: "under-250k", label: "Under $250,000" },
        { value: "250k-500k", label: "$250,000 – $500,000" },
        { value: "500k-1m", label: "$500,000 – $1,000,000" },
        { value: "1m-5m", label: "$1,000,000 – $5,000,000" },
        { value: "5m-plus", label: "$5,000,000+" },
        { value: "prefer-not", label: "Prefer not to say" },
      ], true),
      renderSelect("Family Size (Household)", "familySize", [
        { value: "1", label: "1 (Individual)" },
        { value: "2", label: "2" },
        { value: "3-4", label: "3–4" },
        { value: "5-6", label: "5–6" },
        { value: "7-plus", label: "7+" },
      ], true),
      renderSelect("Current Membership Level", "currentMembership", [
        { value: "none", label: "Not a member" },
        { value: "seeker", label: "Seeker" },
        { value: "operator", label: "Operator" },
        { value: "architect", label: "Architect" },
        { value: "steward", label: "Steward" },
      ], false)
    );
  } else {
    stepContent = React.createElement("div", null,
      React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "22px", color: C.purple, marginBottom: "4px" } }, "Your Goals"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid, marginBottom: "24px" } }, "Select your primary objectives for the Capstone engagement."),
      React.createElement("div", { className: "signup-form-group" },
        React.createElement("label", null, "Primary Goals *"),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" } },
          CAPSTONE_GOALS.map(function(goal) {
            var selected = form.primaryGoals.indexOf(goal) >= 0;
            return React.createElement("button", {
              key: goal, type: "button",
              onClick: function() { toggleGoal(goal); },
              style: {
                padding: "10px 14px", textAlign: "left",
                background: selected ? C.purplePale : C.white,
                border: "1.5px solid " + (selected ? C.purple : C.divider),
                fontFamily: "Inter,sans-serif", fontSize: "12px", color: selected ? C.purple : C.textMid,
                cursor: "pointer", borderRadius: "2px", transition: "all 0.2s",
                fontWeight: selected ? 600 : 400
              }
            },
              React.createElement("span", { style: { marginRight: "6px" } }, selected ? "✓" : "○"),
              goal
            );
          })
        ),
        errors.primaryGoals && React.createElement("div", { className: "signup-form-error" }, errors.primaryGoals)
      ),
      React.createElement("div", { className: "signup-form-group" },
        React.createElement("label", null, "Additional Goals or Notes"),
        React.createElement("textarea", {
          value: form.additionalGoals,
          onChange: function(e) { update("additionalGoals", e.target.value); },
          placeholder: "Describe any specific needs or circumstances...",
          rows: 3,
          style: {
            width: "100%", padding: "12px 16px", fontFamily: "Inter,sans-serif", fontSize: "14px",
            border: "1.5px solid " + C.divider, borderRadius: "2px", background: C.bg, color: C.text,
            outline: "none", resize: "vertical"
          }
        })
      ),
      renderSelect("Preferred Timeline", "timeline", [
        { value: "asap", label: "As soon as possible" },
        { value: "1-3-months", label: "Within 1–3 months" },
        { value: "3-6-months", label: "Within 3–6 months" },
        { value: "6-12-months", label: "Within 6–12 months" },
        { value: "exploring", label: "Just exploring options" },
      ], false),
      renderField("How did you hear about us?", "referral", "text", "e.g. Church, friend, social media", false)
    );
  }

  return React.createElement("form", { onSubmit: step === 3 ? handleSubmit : function(e) { e.preventDefault(); nextStep(); }, style: { padding: "40px" } },
    React.createElement("div", { style: { textAlign: "center", marginBottom: "8px" } },
      React.createElement("div", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.gold, letterSpacing: "3px", fontWeight: 700, marginBottom: "8px" } }, "CAPSTONE APPLICATION"),
      React.createElement("h2", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "26px", color: C.purple, margin: "0 0 4px" } }, "Estate Trust Directive"),
      React.createElement("p", { style: { fontFamily: "Inter,sans-serif", fontSize: "12px", color: C.textLight } }, "Step " + step + " of 3")
    ),
    stepIndicator,
    stepContent,
    React.createElement("div", { style: { display: "flex", gap: "12px", marginTop: "28px", justifyContent: step > 1 ? "space-between" : "flex-end" } },
      step > 1 && React.createElement("button", { type: "button", onClick: prevStep, style: { ...S.btnSecondary, padding: "14px 28px" } }, "← Back"),
      step < 3 && React.createElement("button", { type: "submit", style: { ...S.btnPrimary, padding: "14px 28px" } }, "Continue →"),
      step === 3 && React.createElement("button", {
        type: "submit",
        disabled: status === "loading",
        style: { ...S.btnPrimary, padding: "14px 28px", opacity: status === "loading" ? 0.7 : 1 }
      }, status === "loading" ? "Submitting..." : "Submit Application →")
    )
  );
}


/* ═══════ STRIPE CHECKOUT PLACEHOLDER ═══════ */
/*
 * Stripe Integration Notes:
 * ─────────────────────────
 * 1. Set STRIPE_PUBLISHABLE_KEY below to your Stripe publishable key
 * 2. Create a backend endpoint to generate Stripe Checkout sessions
 * 3. Wire the StripeCheckout component to redirect to Stripe Checkout
 * 4. Subscription price IDs needed:
 *    - Operator: $97/mo  → price_operator_monthly
 *    - Architect: $298/mo → price_architect_monthly
 *    - Steward: $599/mo  → price_steward_monthly
 * 5. For donations, use Stripe Payment Links or custom Checkout sessions
 */
var STRIPE_PUBLISHABLE_KEY = ""; // TODO: Add your Stripe publishable key

function StripeCheckout({ tier, onClose }) {
  const [loading, setLoading] = useState(false);

  function handleCheckout() {
    if (!STRIPE_PUBLISHABLE_KEY) {
      alert("Stripe integration coming soon! Our team is finalizing secure payment processing. For immediate assistance, contact us at info@educationministry.org.");
      return;
    }
    setLoading(true);
    // Future: call backend to create Stripe Checkout session, then redirect
    // var stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    // fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ tier: tier.key }) })
    //   .then(res => res.json())
    //   .then(session => stripe.redirectToCheckout({ sessionId: session.id }));
  }

  return React.createElement("div", { style: { padding: "48px 40px", textAlign: "center" } },
    React.createElement("div", { style: { marginBottom: "16px" } }, Icon(tier.iconName || "creditCard", 48, C.purple)),
    React.createElement("h3", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "26px", color: C.purple, marginBottom: "8px" } },
      "Join " + tier.title),
    React.createElement("div", { style: { fontFamily: "Playfair Display,Georgia,serif", fontSize: "36px", color: C.gold, fontWeight: 700, marginBottom: "4px" } }, tier.price),
    React.createElement("div", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textLight, marginBottom: "24px" } }, tier.period || "/month"),
    React.createElement("div", { style: { background: C.goldPale, padding: "20px", border: "1px solid " + C.goldBorder, marginBottom: "24px", textAlign: "left" } },
      React.createElement("div", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.gold, fontWeight: 700, letterSpacing: "2px", marginBottom: "12px" } }, "INCLUDED"),
      tier.benefits && tier.benefits.slice(0, 5).map(function(b, i) {
        return React.createElement("div", { key: i, style: { display: "flex", gap: "8px", marginBottom: "6px" } },
          React.createElement("span", { style: { color: C.green, fontWeight: 700, fontSize: "13px" } }, "✓"),
          React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid } }, b)
        );
      })
    ),
    React.createElement("div", { style: { background: C.bgAlt, padding: "16px 20px", marginBottom: "24px", borderRadius: "2px" } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" } },
        React.createElement("span", null, Icon("lock", 18, C.textLight)),
        React.createElement("span", { style: { fontFamily: "Inter,sans-serif", fontSize: "13px", color: C.textMid } }, "Secure payment processing via Stripe — coming soon")
      )
    ),
    React.createElement("button", {
      onClick: handleCheckout,
      disabled: loading,
      style: { ...S.btnPrimary, padding: "16px 40px", fontSize: "15px", width: "100%", marginBottom: "12px" }
    }, loading ? "Processing..." : "Upgrade to " + tier.title + " →"),
    React.createElement("button", { onClick: onClose, style: { ...S.btnSecondary, padding: "12px 28px" } }, "Maybe Later"),
    React.createElement("p", { style: { fontFamily: "Inter,sans-serif", fontSize: "11px", color: C.textLight, marginTop: "16px", lineHeight: 1.6 } },
      "Secure payment processing will be enabled via Stripe. Cancel anytime. 508(c)(1)(a) organization.")
  );
}


function MembershipPage() {
  const { open: openSignup } = useSignupModal();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [hoveredTier, setHoveredTier] = useState(null);
  const [capstoneModalOpen, setCapstoneModalOpen] = useState(false);
  const [stripeModal, setStripeModal] = useState(null); // null or tier object

  return <React.Fragment>
    <PageHero
      label="MEMBERSHIP · STRUCTURED PROGRESSION"
      headline={<span>Grow at Your Pace.<br/>Build with <span style={{color:C.gold}}>Purpose.</span></span>}
      sub="From foundational civic education to full estate trust planning — choose the level of depth, support, and structure that fits your journey."
      cta="Start Free as Seeker"
      ctaAction={()=>document.getElementById('tier-cards') && document.getElementById('tier-cards').scrollIntoView({behavior:'smooth'})}
      ctaSecondary="Compare All Tiers"
      ctaSecondaryAction={()=>document.getElementById('comparison-table') && document.getElementById('comparison-table').scrollIntoView({behavior:'smooth'})}
    />

    <div style={{padding:"20px 48px 0"}}>
      <div style={S.inner}><Breadcrumb items={[{label:"Home",path:"/"},{label:"Membership"}]}/></div>
    </div>

    {/* Progression Overview */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>THE PROGRESSION</div>
        <h2 style={S.h2}>A Path Designed for Growth</h2>
        <p style={{...S.body,marginBottom:"40px"}}>Our membership system mirrors a structured journey: from awareness to execution, from design to governance. Each tier unlocks deeper tools, richer content, and more personal guidance.</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0",flexWrap:"wrap"}}>
          {[
            {label:"Seeker",sub:"Awareness",iconName:"seedling",color:C.gold},
            {label:"Operator",sub:"Execution",iconName:"gear",color:C.purpleMid},
            {label:"Architect",sub:"Design",iconName:"penTool",color:C.purpleMid},
            {label:"Steward",sub:"Governance",iconName:"landmark",color:C.gold},
            {label:"Capstone",sub:"Legacy",iconName:"crown",color:C.gold},
          ].map((item,i,arr)=>(
            <React.Fragment key={i}>
              <div style={{background:C.white,padding:"20px 24px",textAlign:"center",minWidth:"120px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${item.color}`,transition:"transform 0.2s"}}>
                <div style={{marginBottom:"8px"}}>{Icon(item.iconName, 28, item.color)}</div>
                <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"15px",color:C.purple,fontWeight:700}}>{item.label}</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:item.color,fontWeight:700,marginTop:"4px",letterSpacing:"1px"}}>{item.sub.toUpperCase()}</div>
              </div>
              {i<arr.length-1 && <div style={{fontFamily:"Inter,sans-serif",fontSize:"20px",color:C.goldBright,padding:"0 6px",fontWeight:700}}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

    {/* Tier Cards */}
    <div id="tier-cards" style={S.sectionAlt}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <div style={S.label}>CHOOSE YOUR TIER</div>
          <h2 style={{...S.h2,textAlign:"center"}}>Membership That Grows With You</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"20px",alignItems:"stretch"}}>
          {membershipTiers.map((tier,i)=>{
            const isHovered = hoveredTier === tier.key;
            const isPremium = tier.premium;
            return <div
              key={tier.key}
              onMouseEnter={()=>setHoveredTier(tier.key)}
              onMouseLeave={()=>setHoveredTier(null)}
              style={{
                background: isPremium ? `linear-gradient(170deg, ${C.purple} 0%, #1a0f30 100%)` : C.white,
                padding: "36px 28px",
                boxShadow: isHovered ? "0 12px 40px rgba(45,27,78,0.18)" : "0 2px 12px rgba(45,27,78,0.06)",
                borderTop: `4px solid ${isPremium ? C.goldBright : C.gold}`,
                display: "flex", flexDirection: "column",
                transition: "all 0.3s ease",
                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                position: "relative",
              }}
            >
              {tier.popular && <div style={{position:"absolute",top:"-14px",left:"50%",transform:"translateX(-50)",background:C.goldBright,color:C.purple,padding:"4px 16px",fontFamily:"Inter,sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"1px"}}>MOST POPULAR</div>}
              <div style={{marginBottom:"12px"}}>{Icon(tier.iconName, 36, isPremium?C.goldBright:C.purple)}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",color:isPremium?"#e8d5a0":C.gold,letterSpacing:"2px",fontWeight:700,marginBottom:"8px"}}>LEVEL {tier.level}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"26px",color:isPremium?C.white:C.purple,margin:"0 0 8px"}}>{tier.title}</h3>
              <div style={{marginBottom:"16px"}}>
                <span style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"36px",color:isPremium?C.goldBright:C.purple,fontWeight:700}}>{tier.price}</span>
                {tier.period && <span style={{fontFamily:"Inter,sans-serif",fontSize:"14px",color:isPremium?"#b0a8c0":C.textLight}}>{tier.period}</span>}
              </div>
              <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:isPremium?"#d8d0e8":C.textMid,fontSize:"13px",lineHeight:1.6,marginBottom:"24px"}}>{tier.tagline}</p>
              <div style={{flex:1}}>
                {tier.benefits.map((b,j)=>(
                  <div key={j} style={{display:"flex",gap:"10px",marginBottom:"10px",alignItems:"flex-start"}}>
                    <span style={{color:isPremium?"#e8d5a0":C.green,fontSize:"14px",fontWeight:700,marginTop:"2px"}}>{b.startsWith("Everything")?"↑":"✓"}</span>
                    <span style={{fontFamily:"Inter,sans-serif",color:isPremium?"#d8d0e8":C.text,fontSize:"13px",lineHeight:1.5}}>{b}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={()=>{}}
                style={{
                  marginTop:"24px", width:"100%", textAlign:"center",
                  background: tier.price === "Free" ? C.purple : isPremium ? C.goldBright : "transparent",
                  color: tier.price === "Free" ? C.white : isPremium ? C.purple : C.purple,
                  border: tier.price === "Free" || isPremium ? "none" : `2px solid ${C.purple}`,
                  padding: "14px 24px",
                  fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: "13px",
                  letterSpacing: "0.5px", borderRadius: "2px", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              onClick={tier.price === "Free" ? ()=>openSignup("membership-tier-free") : ()=>setStripeModal(tier)}
              >{tier.price === "Free" ? "Start Free →" : `Join ${tier.title} →`}</button>
            </div>;
          })}
        </div>
      </div>
    </div>

    {/* Capstone Tier - Special */}
    <div style={{background:C.goldPale,padding:"80px 48px",borderTop:`3px solid ${C.goldBorder}`}}>
      <div style={{maxWidth:"900px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px",alignItems:"center"}}>
          <div>
            <div style={S.label}>CAPSTONE · PREMIUM ENGAGEMENT</div>
            <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.purple,margin:"0 0 12px",lineHeight:1.2}}>Estate Trust<br/><span style={{color:C.gold}}>Directive</span></h2>
            <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"16px",lineHeight:1.7,marginBottom:"24px"}}>{capstoneTier.tagline}</p>
            <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"48px",color:C.purple,fontWeight:700,marginBottom:"4px"}}>{capstoneTier.price}</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textLight,letterSpacing:"2px",marginBottom:"28px"}}>ONE-TIME · QUALIFICATION REQUIRED</div>
            <button onClick={()=>setCapstoneModalOpen(true)} style={{...S.btnPrimary,padding:"16px 40px",fontSize:"15px"}}>Apply for Capstone →</button>
          </div>
          <div>
            <div style={{background:C.white,padding:"32px",boxShadow:"0 4px 24px rgba(45,27,78,0.08)",border:`1px solid ${C.goldBorder}`}}>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"2px",fontWeight:700,marginBottom:"20px"}}>WHAT'S INCLUDED</div>
              {capstoneTier.benefits.map((b,j)=>(
                <div key={j} style={{display:"flex",gap:"10px",marginBottom:"12px",alignItems:"flex-start"}}>
                  <span style={{color:C.gold,fontSize:"14px",fontWeight:700,marginTop:"2px"}}>✓</span>
                  <span style={{fontFamily:"Inter,sans-serif",color:C.text,fontSize:"13px",lineHeight:1.5}}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Comparison Table */}
    <div id="comparison-table" style={S.section}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <div style={S.label}>FULL COMPARISON</div>
          <h2 style={{...S.h2,textAlign:"center"}}>Compare All Tiers</h2>
        </div>
        <div style={{background:C.white,boxShadow:"0 2px 12px rgba(45,27,78,0.06)",overflow:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"Inter,sans-serif",minWidth:"700px"}}>
            <thead>
              <tr style={{background:C.purple}}>
                <th style={{padding:"16px 20px",textAlign:"left",color:"#e8d5a0",fontSize:"11px",letterSpacing:"1px",fontWeight:700}}>FEATURE</th>
                {["Seeker","Operator","Architect","Steward","Capstone"].map(t=>(
                  <th key={t} style={{padding:"16px 14px",textAlign:"center",color:"#e8d5a0",fontSize:"11px",letterSpacing:"1px",fontWeight:700}}>{t.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row,i)=>(
                <tr key={i} style={{borderBottom:`1px solid ${C.divider}`,background:i%2===0?C.bg:C.white}}>
                  <td style={{padding:"12px 20px",fontSize:"13px",color:C.text,fontWeight:600}}>{row.feature}</td>
                  {["seeker","operator","architect","steward","capstone"].map(tier=>{
                    const val = row[tier];
                    const display = val === true ? "✓" : val === false ? "—" : val;
                    const color = val === true ? C.green : val === false ? C.textLight : C.purpleMid;
                    return <td key={tier} style={{padding:"12px 14px",fontSize:"12px",color,textAlign:"center",fontWeight:val===true?700:400}}>{display}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* FAQ */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <div style={S.label}>FREQUENTLY ASKED QUESTIONS</div>
          <h2 style={{...S.h2,textAlign:"center"}}>Common Questions About Membership</h2>
        </div>
        {membershipFAQ.map((faq,i)=>(
          <div key={i} style={{background:C.white,marginBottom:"8px",boxShadow:"0 1px 6px rgba(45,27,78,0.04)",overflow:"hidden",transition:"all 0.3s"}}>
            <div
              onClick={()=>setOpenFAQ(openFAQ===i?null:i)}
              style={{padding:"20px 28px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}
            >
              <span style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"16px",color:C.purple,fontWeight:700}}>{faq.q}</span>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:"20px",color:C.gold,fontWeight:700,transition:"transform 0.3s",transform:openFAQ===i?"rotate(45deg)":"rotate(0)"}}> + </span>
            </div>
            {openFAQ===i && <div style={{padding:"0 28px 20px"}}>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px",lineHeight:1.8,margin:0}}>{faq.a}</p>
            </div>}
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div style={{background:C.purple,padding:"80px 48px",textAlign:"center"}}>
      <div style={S.inner}>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.white,margin:"0 0 16px"}}>Start Where You Are.<br/>Grow at Your Own Pace.</h2>
        <p style={{fontFamily:"Inter,sans-serif",color:"#b0a8c0",fontSize:"16px",lineHeight:1.8,maxWidth:"500px",margin:"0 auto 32px"}}>Begin with free civic education. Upgrade when you're ready for deeper tools, guided support, and structured growth.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>openSignup("membership-footer-seeker")} style={{background:C.goldBright,color:C.purple,padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",borderRadius:"2px",border:"none",cursor:"pointer"}}>Start Free as Seeker</button>
          <button onClick={()=>navigate("/donate")} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Support Our Mission</button>
        </div>
      </div>
    </div>

    {/* Capstone Application Modal */}
    <Modal isOpen={capstoneModalOpen} onClose={()=>setCapstoneModalOpen(false)}>
      <CapstoneApplicationForm onClose={()=>setCapstoneModalOpen(false)}/>
    </Modal>

    {/* Stripe Checkout Modal */}
    <Modal isOpen={!!stripeModal} onClose={()=>setStripeModal(null)}>
      {stripeModal && <StripeCheckout tier={stripeModal} onClose={()=>setStripeModal(null)}/>}
    </Modal>
  </React.Fragment>;
}


/* ═══════ DONATE PAGE ═══════ */

const donationLevels = [
  { amount: 25, label: "Seed", desc: "Supports one family's civic education materials" },
  { amount: 50, label: "Foundation", desc: "Funds a workshop for 5 families" },
  { amount: 100, label: "Builder", desc: "Provides full curriculum access for 10 families" },
  { amount: 250, label: "Champion", desc: "Sponsors a Young Civic Engagement Challenge cohort" },
  { amount: 500, label: "Architect", desc: "Enables advanced estate planning education" },
];

const donorRecognitionTiers = [
  { name: "Bronze", min: 25, max: 99, iconName: "star", color: "#cd7f32", perks: ["Name in monthly newsletter", "Digital thank-you certificate"] },
  { name: "Silver", min: 100, max: 499, iconName: "star", color: "#a8a8a8", perks: ["All Bronze benefits", "Quarterly impact report", "Donor badge on community profile"] },
  { name: "Gold", min: 500, max: 2499, iconName: "award", color: C.goldBright, perks: ["All Silver benefits", "Annual recognition event invite", "Direct line to leadership team"] },
  { name: "Platinum", min: 2500, max: null, iconName: "diamond", color: C.purpleMid, perks: ["All Gold benefits", "Named scholarship sponsorship", "Private strategy session", "Legacy wall recognition"] },
];

const impactStats = [
  { stat: "1,200+", label: "Families served through civic education" },
  { stat: "85%", label: "Report improved civic understanding" },
  { stat: "340+", label: "Workshop sessions completed" },
  { stat: "$0", label: "Cost to Seeker-level families" },
];

const donateTestimonials = [
  { quote: "This ministry gave our family the structure we didn't even know we were missing. Our children now understand governance, stewardship, and why it all matters.", name: "The Williams Family", location: "Newark, NJ" },
  { quote: "For the first time, I feel like I have a map — not just for finances, but for how to pass something real to my kids.", name: "Marcus T.", location: "Atlanta, GA" },
  { quote: "The civic education here is unlike anything I've found in public schools or even churches. It's practical, biblical, and built to last.", name: "Sandra & David R.", location: "Houston, TX" },
];

function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : selectedAmount;

  const currentDonorTier = donorRecognitionTiers.find(t =>
    effectiveAmount >= t.min && (t.max === null || effectiveAmount <= t.max)
  ) || null;

  return <React.Fragment>
    <PageHero
      label="DONATE · SUPPORT THE MISSION"
      headline={<span>Invest in Families.<br/>Build Civic <span style={{color:C.gold}}>Virtue.</span></span>}
      sub="Your gift supports free and low-cost civic education for families who need it most — grounded in scripture, built with structure, delivered with purpose."
      cta="Give Now"
      ctaAction={()=>document.getElementById('donate-form') && document.getElementById('donate-form').scrollIntoView({behavior:'smooth'})}
    />

    <div style={{padding:"20px 48px 0"}}>
      <div style={S.inner}><Breadcrumb items={[{label:"Home",path:"/"},{label:"Donate"}]}/></div>
    </div>

    {/* Why Give */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={S.label}>WHY GIVE</div>
        <h2 style={S.h2}>Your Generosity Builds What Lasts</h2>
        <p style={{...S.body,marginBottom:"40px"}}>BT Education Ministry exists to provide structured civic education to needy and low-income families. Every dollar supports materials, workshops, tools, and direct ministry — equipping families to build with order, not just effort.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"}}>
          {impactStats.map((item,i)=>(
            <div key={i} style={{background:C.white,padding:"28px",textAlign:"center",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${C.gold}`}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"36px",color:C.purple,fontWeight:700,lineHeight:1}}>{item.stat}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textMid,marginTop:"8px",lineHeight:1.5}}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Impact Section */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={S.label}>YOUR IMPACT</div>
        <h2 style={S.h2}>What Your Gift Accomplishes</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginTop:"32px"}}>
          {donationLevels.map((level,i)=>(
            <div key={i} style={{background:C.white,padding:"28px",display:"flex",gap:"20px",alignItems:"flex-start",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderLeft:`4px solid ${C.gold}`}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"32px",color:C.purple,fontWeight:700,minWidth:"90px",flexShrink:0}}>${level.amount}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"16px",color:C.purple,fontWeight:700,marginBottom:"4px"}}>{level.label}</div>
                <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"13px",lineHeight:1.6,margin:0}}>{level.desc}</p>
              </div>
            </div>
          ))}
          <div style={{background:C.purplePale,padding:"28px",display:"flex",gap:"20px",alignItems:"flex-start",border:`1px solid ${C.purpleLight}`,borderLeft:`4px solid ${C.purpleMid}`}}>
            <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"28px",color:C.purple,fontWeight:700,minWidth:"90px",flexShrink:0}}>Custom</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"16px",color:C.purple,fontWeight:700,marginBottom:"4px"}}>Your Choice</div>
              <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"13px",lineHeight:1.6,margin:0}}>Every gift — large or small — furthers our mission of civic education</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Donation Form */}
    <div id="donate-form" style={S.section}>
      <div style={S.inner}>
        {!submitted ? <React.Fragment>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <div style={S.label}>MAKE YOUR GIFT</div>
            <h2 style={{...S.h2,textAlign:"center"}}>Support Faith-Grounded Civic Education</h2>
          </div>

          <div style={{background:C.white,padding:"48px",boxShadow:"0 4px 24px rgba(45,27,78,0.08)",maxWidth:"640px",margin:"0 auto"}}>
            {/* Monthly vs One-Time Toggle */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:"32px"}}>
              <div style={{display:"inline-flex",background:C.bgAlt,padding:"4px",gap:"0"}}>
                <button onClick={()=>setIsMonthly(false)} style={{padding:"10px 28px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"0.5px",border:"none",cursor:"pointer",background:!isMonthly?C.purple:"transparent",color:!isMonthly?C.white:C.textMid,transition:"all 0.2s"}}>One-Time</button>
                <button onClick={()=>setIsMonthly(true)} style={{padding:"10px 28px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"0.5px",border:"none",cursor:"pointer",background:isMonthly?C.purple:"transparent",color:isMonthly?C.white:C.textMid,transition:"all 0.2s"}}>Monthly</button>
              </div>
            </div>

            {/* Amount Selection */}
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"2px",fontWeight:700,marginBottom:"16px"}}>SELECT AMOUNT</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px",marginBottom:"16px"}}>
              {donationLevels.map(level=>(
                <button key={level.amount} onClick={()=>{setSelectedAmount(level.amount);setIsCustom(false);}} style={{
                  padding:"16px",textAlign:"center",
                  background:!isCustom && selectedAmount===level.amount ? C.purple : C.white,
                  color:!isCustom && selectedAmount===level.amount ? C.white : C.purple,
                  border:`2px solid ${!isCustom && selectedAmount===level.amount ? C.purple : C.divider}`,
                  fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"18px",cursor:"pointer",
                  borderRadius:"2px",transition:"all 0.2s",
                }}>
                  ${level.amount}
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:"10px",fontWeight:500,marginTop:"4px",color:!isCustom && selectedAmount===level.amount?"#d8d0e8":C.textLight}}>{level.label}</div>
                </button>
              ))}
              <button onClick={()=>setIsCustom(true)} style={{
                padding:"16px",textAlign:"center",
                background:isCustom ? C.purple : C.white,
                color:isCustom ? C.white : C.purple,
                border:`2px solid ${isCustom ? C.purple : C.divider}`,
                fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"14px",cursor:"pointer",
                borderRadius:"2px",transition:"all 0.2s",
              }}>Custom Amount</button>
            </div>
            {isCustom && <div style={{marginBottom:"20px"}}>
              <input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={e=>setCustomAmount(e.target.value)}
                style={{width:"100%",padding:"14px 20px",fontFamily:"Inter,sans-serif",fontSize:"18px",fontWeight:700,border:`1.5px solid ${C.divider}`,borderRadius:"2px",outline:"none",color:C.purple}}
              />
            </div>}

            {/* Donor Tier Preview */}
            {currentDonorTier && <div style={{background:C.goldPale,padding:"16px 20px",marginBottom:"24px",border:`1px solid ${C.goldBorder}`,display:"flex",alignItems:"center",gap:"12px"}}>
              <span>{Icon(currentDonorTier.iconName, 24, currentDonorTier.color)}</span>
              <div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.gold,fontWeight:700,letterSpacing:"1px"}}>{currentDonorTier.name.toUpperCase()} DONOR</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.textMid}}>Your {isMonthly?"monthly ":""}gift of ${effectiveAmount} qualifies you for {currentDonorTier.name} recognition</div>
              </div>
            </div>}

            {/* Form Fields */}
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.gold,letterSpacing:"2px",fontWeight:700,marginBottom:"16px",marginTop:"24px"}}>YOUR INFORMATION</div>
            <div style={{marginBottom:"16px"}}>
              <input
                type="text" placeholder="Full Name"
                value={formData.name}
                onChange={e=>setFormData({...formData, name:e.target.value})}
                style={{width:"100%",padding:"14px 20px",fontFamily:"Inter,sans-serif",fontSize:"14px",border:`1.5px solid ${C.divider}`,borderRadius:"2px",outline:"none",color:C.text}}
              />
            </div>
            <div style={{marginBottom:"24px"}}>
              <input
                type="email" placeholder="Email Address"
                value={formData.email}
                onChange={e=>setFormData({...formData, email:e.target.value})}
                style={{width:"100%",padding:"14px 20px",fontFamily:"Inter,sans-serif",fontSize:"14px",border:`1.5px solid ${C.divider}`,borderRadius:"2px",outline:"none",color:C.text}}
              />
            </div>

            {/* Summary */}
            <div style={{background:C.bgAlt,padding:"20px",marginBottom:"24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                <span style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px"}}>Donation Amount</span>
                <span style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,fontSize:"18px",fontWeight:700}}>${effectiveAmount}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"14px"}}>Frequency</span>
                <span style={{fontFamily:"Inter,sans-serif",color:C.purple,fontSize:"14px",fontWeight:700}}>{isMonthly?"Monthly":"One-Time"}</span>
              </div>
            </div>

            <button
              onClick={()=>setSubmitted(true)}
              style={{...S.btnPrimary,width:"100%",textAlign:"center",padding:"18px",fontSize:"16px"}}
            >Complete Donation →</button>

            {/* Tax Info */}
            <p style={{fontFamily:"Inter,sans-serif",fontSize:"11px",color:C.textLight,textAlign:"center",marginTop:"16px",lineHeight:1.6}}>
              BT Education Ministry is a 508(c)(1)(a) faith-based nonprofit. Your donation may be tax-deductible. Consult your tax advisor. Secure payment processing will be enabled via Stripe.
            </p>
          </div>
        </React.Fragment> : <div style={{textAlign:"center",maxWidth:"600px",margin:"0 auto"}}>
          <div style={{marginBottom:"20px"}}>{Icon("leaf", 64, C.green)}</div>
          <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,40px)",color:C.purple,margin:"0 0 16px"}}>Thank You for Your Generosity</h2>
          <p style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"16px",lineHeight:1.8,marginBottom:"24px"}}>Your {isMonthly?"monthly ":""}gift of ${effectiveAmount} will directly support civic education for families who need it most. A confirmation will be sent to your email.</p>
          <div style={{background:C.goldPale,padding:"20px",border:`1px solid ${C.goldBorder}`,marginBottom:"32px"}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:"12px",color:C.gold,fontWeight:700,letterSpacing:"1px"}}>508(c)(1)(a) TAX-DEDUCTIBLE GIFT</div>
            <p style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.textMid,margin:"8px 0 0"}}>A receipt for your records will be emailed within 24 hours.</p>
          </div>
          <button onClick={()=>{setSubmitted(false);setFormData({name:"",email:""});}} style={S.btnSecondary}>Make Another Gift</button>
        </div>}
      </div>
    </div>

    {/* Donor Recognition Tiers */}
    <div style={S.sectionAlt}>
      <div style={S.inner}>
        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <div style={S.label}>DONOR RECOGNITION</div>
          <h2 style={{...S.h2,textAlign:"center"}}>Every Gift Is Honored</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"}}>
          {donorRecognitionTiers.map((tier,i)=>(
            <div key={i} style={{background:C.white,padding:"28px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`4px solid ${tier.color}`,textAlign:"center"}}>
              <div style={{marginBottom:"8px"}}>{Icon(tier.iconName, 36, tier.color)}</div>
              <h3 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"20px",color:C.purple,margin:"0 0 6px"}}>{tier.name}</h3>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"13px",color:C.gold,fontWeight:700,marginBottom:"16px"}}>
                ${tier.min}{tier.max ? `–$${tier.max}` : "+"}
              </div>
              {tier.perks.map((p,j)=>(
                <div key={j} style={{display:"flex",gap:"8px",marginBottom:"8px",alignItems:"flex-start",textAlign:"left"}}>
                  <span style={{color:tier.color,fontSize:"12px",fontWeight:700,marginTop:"2px"}}>✓</span>
                  <span style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"12px",lineHeight:1.5}}>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Testimonials */}
    <div style={S.section}>
      <div style={S.inner}>
        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <div style={S.label}>FAMILIES IMPACTED</div>
          <h2 style={{...S.h2,textAlign:"center"}}>Stories of Transformation</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"20px"}}>
          {donateTestimonials.map((t,i)=>(
            <div key={i} style={{background:C.white,padding:"32px",boxShadow:"0 2px 12px rgba(45,27,78,0.06)",borderTop:`3px solid ${C.gold}`,display:"flex",flexDirection:"column"}}>
              <div style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"32px",color:C.goldBorder,marginBottom:"12px"}}>"</div>
              <p style={{fontFamily:"Playfair Display,Georgia,serif",fontStyle:"italic",color:C.textMid,fontSize:"15px",lineHeight:1.7,flex:1,margin:"0 0 20px"}}>{t.quote}</p>
              <div>
                <div style={{fontFamily:"Inter,sans-serif",color:C.purple,fontSize:"14px",fontWeight:700}}>{t.name}</div>
                <div style={{fontFamily:"Inter,sans-serif",color:C.textLight,fontSize:"12px"}}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA */}
    <div style={{background:C.purple,padding:"80px 48px",textAlign:"center"}}>
      <div style={S.inner}>
        <h2 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.white,margin:"0 0 16px"}}>Your Gift Builds<br/>What Money Alone Cannot.</h2>
        <p style={{fontFamily:"Inter,sans-serif",color:"#b0a8c0",fontSize:"16px",lineHeight:1.8,maxWidth:"500px",margin:"0 auto 32px"}}>Civic virtue. Family structure. Ordered inheritance. These are built through education — and your generosity makes it possible.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>document.getElementById('donate-form') && document.getElementById('donate-form').scrollIntoView({behavior:'smooth'})} style={{background:C.goldBright,color:C.purple,padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:"15px",borderRadius:"2px",border:"none",cursor:"pointer"}}>Give Now</button>
          <button onClick={()=>navigate("/membership")} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.3)",padding:"16px 36px",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:"15px",borderRadius:"2px",cursor:"pointer"}}>Explore Membership</button>
        </div>
      </div>
    </div>
  </React.Fragment>;
}


/* ═══════ ROUTER + APP ═══════ */
/* ═══════ LEGAL PAGES ═══════ */

function LegalPage({ title, children }) {
  return <div style={{background:C.bg,padding:"80px 48px",minHeight:"60vh"}}>
    <div style={{maxWidth:"760px",margin:"0 auto"}}>
      <div style={S.label}>LEGAL</div>
      <h1 style={{fontFamily:"Playfair Display,Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:C.purple,margin:"0 0 24px",lineHeight:1.2}}>{title}</h1>
      <div style={{fontFamily:"Inter,sans-serif",color:C.textMid,fontSize:"15px",lineHeight:1.9}}>{children}</div>
    </div>
  </div>;
}

function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy">
    <p style={{marginBottom:"20px"}}><strong>Effective Date:</strong> January 1, 2025</p>
    <p style={{marginBottom:"20px"}}>BT Education Ministry ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website educationministry.org.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Information We Collect</h3>
    <p style={{marginBottom:"20px"}}>We may collect personal information that you voluntarily provide to us when you register on the website, express interest in our programs, or otherwise contact us. This includes name, email address, and other contact details you provide through our signup forms.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>How We Use Your Information</h3>
    <p style={{marginBottom:"20px"}}>We use the information we collect to provide, maintain, and improve our educational services; to communicate with you about programs, updates, and resources; and to comply with legal obligations.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Data Security</h3>
    <p style={{marginBottom:"20px"}}>We implement appropriate technical and organizational measures to protect your personal information. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Contact Us</h3>
    <p>If you have questions about this Privacy Policy, please contact us at educationministry.org.</p>
  </LegalPage>;
}

function TermsPage() {
  return <LegalPage title="Terms & Conditions">
    <p style={{marginBottom:"20px"}}><strong>Effective Date:</strong> January 1, 2025</p>
    <p style={{marginBottom:"20px"}}>By accessing and using the BT Education Ministry website and services, you agree to be bound by these Terms & Conditions.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Use of Services</h3>
    <p style={{marginBottom:"20px"}}>Our programs and content are provided for educational and ministerial purposes only. You agree to use our services in accordance with all applicable laws and regulations.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Intellectual Property</h3>
    <p style={{marginBottom:"20px"}}>All content, materials, and resources provided through our programs are the intellectual property of BT Education Ministry. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Limitation of Liability</h3>
    <p style={{marginBottom:"20px"}}>BT Education Ministry provides educational content and is not a substitute for professional legal, financial, or tax advice. We shall not be liable for any decisions made based on the information provided through our programs.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Modifications</h3>
    <p>We reserve the right to modify these Terms at any time. Continued use of our services constitutes acceptance of updated Terms.</p>
  </LegalPage>;
}

function DisclaimerPage() {
  return <LegalPage title="Disclaimer">
    <p style={{marginBottom:"20px"}}><strong>Important Notice:</strong> The information provided by BT Education Ministry is for general educational and ministerial purposes only.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Not Legal Advice</h3>
    <p style={{marginBottom:"20px"}}>Nothing on this website or in our programs constitutes legal, tax, financial, or professional advice. The educational content regarding estate planning, trust structures, civic governance, and related topics is presented for informational and ministerial purposes only.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Consult Qualified Professionals</h3>
    <p style={{marginBottom:"20px"}}>You should consult with qualified legal counsel, tax advisors, and financial professionals before making any decisions related to estate planning, trust formation, or civic governance structures.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>No Warranties</h3>
    <p style={{marginBottom:"20px"}}>We make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or suitability of the information provided.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Faith-Based Context</h3>
    <p>Our educational content is grounded in scriptural principles and presented within a faith-based ministerial context. Interpretations and applications are educational in nature.</p>
  </LegalPage>;
}

function Status508c1aPage() {
  return <LegalPage title="508(c)(1)(a) Status">
    <p style={{marginBottom:"20px"}}>BT Education Ministry operates as a 508(c)(1)(a) faith-based organization under the Internal Revenue Code.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>What Is a 508(c)(1)(a) Organization?</h3>
    <p style={{marginBottom:"20px"}}>A 508(c)(1)(a) organization is a church or convention or association of churches that is mandatorily excepted from taxation under federal law. Unlike 501(c)(3) organizations, a 508(c)(1)(a) entity is not required to apply for tax-exempt status with the IRS — its authority comes from statute, not from the agency.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Key Distinctions</h3>
    <p style={{marginBottom:"12px"}}>• <strong>No IRS determination letter required</strong> — Recognition comes from statutory mandate, not IRS approval.</p>
    <p style={{marginBottom:"12px"}}>• <strong>No Form 990 filing obligation</strong> — 508(c)(1)(a) organizations are exempt from annual reporting requirements.</p>
    <p style={{marginBottom:"12px"}}>• <strong>Donor contributions may be tax-deductible</strong> — Consult your tax advisor for guidance specific to your situation.</p>
    <p style={{marginBottom:"20px"}}>• <strong>Constitutional protections</strong> — First Amendment protections apply to the organization's ministerial activities.</p>
    <h3 style={{fontFamily:"Playfair Display,Georgia,serif",color:C.purple,margin:"28px 0 12px"}}>Our Mission</h3>
    <p>As a 508(c)(1)(a) faith-based nonprofit, BT Education Ministry is dedicated to providing faith-grounded civic education for needy and low-income families, with a focus on civic virtue, stewardship, and generational inheritance.</p>
  </LegalPage>;
}

function App() {
  const hash = useHash();
  const route = hash.replace("#","") || "/";
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupSource, setSignupSource] = useState("seeker");

  const openSignup = useCallback(function(source) {
    setSignupSource(source || "seeker");
    setSignupOpen(true);
  }, []);

  const closeSignup = useCallback(function() {
    setSignupOpen(false);
  }, []);

  const signupCtx = { open: openSignup, close: closeSignup };

  let Page;
  switch(route) {
    case "/about": Page = AboutPage; break;
    case "/programs": Page = ProgramsPage; break;
    case "/civic-library": Page = CivicLibraryPage; break;
    case "/membership": Page = MembershipPage; break;
    case "/donate": Page = DonatePage; break;
    case "/privacy-policy": Page = PrivacyPolicyPage; break;
    case "/terms": Page = TermsPage; break;
    case "/disclaimer": Page = DisclaimerPage; break;
    case "/508c1a-status": Page = Status508c1aPage; break;
    default: Page = HomePage;
  }

  return <SignupModalContext.Provider value={signupCtx}>
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <TrustBar/>
      <Nav/>
      <Page/>
      <Footer/>
    </div>
    <Modal isOpen={signupOpen} onClose={closeSignup}>
      <SeekerSignupForm source={signupSource} onClose={closeSignup}/>
    </Modal>
  </SignupModalContext.Provider>;
}

ReactDOM.render(<App/>, document.getElementById("root"));
