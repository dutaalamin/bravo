import { useState, useEffect, useRef } from 'react';

/* ─── tiny SVG icons ─── */
const ChevronDown = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>;
const ArrowRight = ({ className = '' }) => <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const Globe = ({ className = "w-6 h-6" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const XIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const ChevronLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevronRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>;
const StarIcon = ({ filled = true }) => <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#004B35' : 'none'} stroke="#004B35" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const MailIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004B35" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 4 12 13 2 4" /></svg>;
const PhoneIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004B35" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const BellIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004B35" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
const HeartIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004B35" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const WalletIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004B35" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>;
const CheckCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#00A862" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="9 12 11.5 14.5 16 9.5" /></svg>;
const SparkleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004B35" strokeWidth="2"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></svg>;
const MegaphoneIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>;
const SettingsIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const FunnelIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
const DataIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
const LinkIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
const ChatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const BotIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>;
const BagIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
const BriefcaseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
const CartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
const CodeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const PenIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>;
const BookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const TemplateIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>;
const TrendIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const HandshakeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0z" /><path d="M7.7 13.5L12 9.2l4.3 4.3" /><line x1="12" y1="9.2" x2="12" y2="17" /></svg>;
const HelpIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
const BarChartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
const CalculatorIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="14" /></svg>;

/* ─── scroll animation hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ══════════════════════════════════════════════
   MEGA MENU DATA
   ══════════════════════════════════════════════ */
const megaMenuData = {
  Platform: {
    cols: [
      {
        title: 'Capabilities',
        type: 'detailed',
        items: [
          { title: 'Campaigns & automation', desc: 'Boost conversions with automated multichannel customer journeys.', icon: <MegaphoneIcon /> },
          { title: 'Transactional messaging', desc: 'Send real-time email, SMS, & WhatsApp messages triggered via SMTP relay and API.', icon: <SettingsIcon /> },
          { title: 'Sales management', desc: 'Accelerate revenue with custom pipelines, sales automation, chat & more.', icon: <FunnelIcon /> },
          { title: 'Bravo Data Platform', desc: 'Unify and activate customer data for smarter marketing and faster time-to-value.', icon: <DataIcon /> },
          { title: 'Customer loyalty', desc: 'Turn customers into loyal fans with a fully integrated rewards program.', icon: <HeartIcon /> },
          { title: 'Integrations', desc: 'Connect Bravo with 150+ digital tools like Shopify, WordPress, Stripe, Zapier and more.', icon: <LinkIcon /> },
        ]
      },
      {
        title: 'Channels',
        type: 'simple',
        items: [
          { title: 'Email', icon: <MailIcon /> },
          { title: 'SMS', icon: <PhoneIcon /> },
          { title: 'WhatsApp', icon: <ChatIcon /> },
          { title: 'Web & mobile push', icon: <BellIcon /> },
          { title: 'Live chat', icon: <ChatIcon /> },
          { title: 'Chatbot', icon: <BotIcon /> },
          { title: 'Wallet', icon: <WalletIcon /> },
          { title: 'Phone', icon: <PhoneIcon /> }
        ]
      }
    ]
  },
  Solutions: {
    cols: [
      {
        title: 'Solutions',
        type: 'detailed',
        items: [
          { title: 'Entrepreneurs & small business', desc: 'Run campaigns, automate marketing and manage contacts easily.', icon: <BagIcon /> },
          { title: 'Mid-market & enterprise', desc: 'Get custom solutions, tailored onboarding, full data control and enterprise-grade security.', icon: <BriefcaseIcon /> },
          { title: 'Ecommerce & retail', desc: 'Recover abandoned carts, personalize product recommendations and boost loyalty.', icon: <CartIcon /> },
          { title: 'Developers', desc: "Build, extend, and integrate with Bravo's developer guides, open API, SDKs, and code recipes.", icon: <CodeIcon /> },
        ]
      }
    ]
  },
  Resources: {
    cols: [
      {
        title: 'Resource center',
        type: 'simple',
        items: [
          { title: 'Blog', icon: <PenIcon /> },
          { title: 'Ebooks', icon: <BookIcon /> },
          { title: 'Case studies', icon: <SearchIcon /> },
          { title: 'Email templates', icon: <TemplateIcon /> },
          { title: 'Email marketing platforms', icon: <TrendIcon /> },
          { title: 'Mailchimp alternatives', icon: <LinkIcon /> },
          { title: 'Tools & Calculators', icon: <CalculatorIcon /> },
        ]
      },
      {
        title: 'Ecosystem',
        type: 'simple',
        items: [
          { title: 'Integrations', icon: <LinkIcon /> },
          { title: 'Product updates', icon: <SparkleIcon /> },
          { title: 'Community', icon: <UsersIcon /> },
          { title: 'Events', icon: <CalendarIcon /> },
          { title: 'Partner programs', icon: <HandshakeIcon /> },
          { title: 'Find an expert', icon: <SearchIcon /> },
        ]
      },
      {
        title: 'Support',
        type: 'simple',
        items: [
          { title: 'Help center', icon: <HelpIcon /> },
          { title: 'Contact us', icon: <PhoneIcon /> },
          { title: 'API docs', icon: <CodeIcon /> },
          { title: 'Platform status', icon: <BarChartIcon /> },
        ]
      }
    ]
  }
};

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bravo-mintBg/95 backdrop-blur-md shadow-sm' : 'bg-bravo-mintBg'}`}>
      <div className="max-w-full px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
        {/* left: logo + links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <a href="#" className="text-bravo-green text-3xl md:text-[34px] font-extrabold tracking-tight flex items-center gap-1 select-none">
            Bravo
          </a>
          <div className="hidden lg:flex items-center gap-1 h-full">
            {['Platform', 'Solutions', 'Pricing', 'Resources'].map((l) => (
              <div key={l} className="group relative h-full flex flex-col justify-center">
                <a href={`#${l.toLowerCase()}`} className="flex items-center gap-1.5 px-4 py-2.5 text-[18px] font-medium text-bravo-dark hover:text-bravo-green group-hover:bg-white group-hover:rounded-t-xl transition-colors relative z-20">
                  {l} {l !== 'Pricing' && <ChevronDown className="w-4 h-4 opacity-70 stroke-2 group-hover:-rotate-180 transition-transform duration-300" />}
                </a>
                
                {/* Mega Menu Dropdown */}
                {l !== 'Pricing' && megaMenuData[l] && (
                  <div className={`absolute top-full left-0 rounded-tr-xl hidden group-hover:flex w-max min-w-[500px] ${l === 'Resources' ? 'min-w-[800px]' : ''} bg-white rounded-b-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-8 z-10 pt-8 -mt-1`} >
                    <div className="flex gap-10 w-full">
                      {megaMenuData[l].cols.map((col, idx) => (
                        <div key={col.title} className="flex gap-10">
                          {idx > 0 && <div className="w-px bg-gray-100"></div>}
                          <div className={col.type === 'detailed' ? 'w-[380px]' : 'w-[220px]'}>
                            <h4 className="text-gray-500 font-semibold mb-6 text-[15px]">{col.title}</h4>
                            <div className={`grid ${col.type === 'simple' && l === 'Resources' ? 'gap-y-5' : 'gap-y-6'}`}>
                              {col.items.map((item, i) => (
                                <a href="#" key={i} className="flex gap-4 items-start group/item">
                                  <div className="w-10 h-10 rounded border border-gray-100 bg-gray-50 shrink-0 flex items-center justify-center text-xl group-hover/item:border-gray-300 group-hover/item:shadow-sm transition-all shadow-sm">
                                    {item.icon}
                                  </div>
                                  <div className={col.type === 'detailed' ? 'pt-0.5' : 'pt-2.5'}>
                                    <div className="text-[15px] font-semibold text-gray-800 group-hover/item:text-bravo-green transition-colors leading-tight mb-1">{item.title}</div>
                                    {item.desc && <div className="text-[13px] text-gray-500 leading-relaxed pr-2">{item.desc}</div>}
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-1">
            <button className="p-1 text-bravo-dark hover:text-bravo-green transition-colors" aria-label="Select language">
              <Globe className="w-6 h-6" />
            </button>
            <div className="h-4 w-[1px] bg-bravo-dark/30"></div>
            <a href="#" className="text-[16px] font-semibold text-bravo-dark hover:text-bravo-green transition-colors px-1.5 py-2">
              Log in
            </a>
          </div>

          <a href="#" className="btn-dark">
            Sign Up Free
          </a>
          <a href="#" className="btn-outline">
            Get a demo
          </a>
        </div>
        {/* mobile toggle */}
        <button className="lg:hidden text-bravo-dark p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
      {/* mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4 shadow-lg">
          {['Platform', 'Solutions', 'Pricing', 'Resources'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block py-2 text-base font-semibold text-bravo-dark" onClick={() => setMobileOpen(false)}>{l}</a>
          ))}
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
            <a href="#" className="text-center py-2.5 text-base font-semibold text-bravo-dark">Log in</a>
            <a href="#" className="btn-dark text-center py-3">Sign Up Free</a>
            <a href="#" className="btn-outline text-center py-3">Get a demo</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="bg-bravo-mintBg relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-8 pb-10 md:pt-10 md:pb-0">
        <div className="grid lg:grid-cols-[50%_50%] gap-8 lg:gap-12 items-center">
          {/* left text */}
          <div className="animate-on-scroll">
            <h1 className="font-serif text-bravo-dark text-4xl md:text-[3.2rem] leading-[1.15] mb-6">
              Turn Every Order<br />
              into a Lifetime Customer
            </h1>
            <p className="text-bravo-body text-base md:text-[17px] leading-relaxed mb-8 max-w-[660px]">
              One AI-powered customer platform for all your marketing and sales needs. From email marketing, SMS, WhatsApp, and beyond, drive business growth and lasting loyalty.
            </p>
            <a href="#" className="btn-dark mb-8 inline-block">Sign up free</a>
            <div className="mt-6">
              <p className="text-bravo-muted text-sm mb-2">Loved by users everywhere</p>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <CheckCircle />
                <span className="text-sm font-semibold text-bravo-dark">4.5</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map(i => <StarIcon key={i} />)}
                  <StarIcon filled={false} />
                </div>
              </div>
            </div>
          </div>

          {/* right: floating UI cards */}
          <div className="relative h-[420px] md:h-[480px] animate-on-scroll hidden md:block self-end translate-y-8 lg:translate-x-64 scale-110 origin-bottom-right z-10">
            {/* Background window (Dashboard) */}
            <div className="absolute top-4 bottom-0 -left-6 right-0 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl shadow-2xl p-5 overflow-hidden animate-float-slow">
              <div className="flex items-center gap-2 mb-6 border-b border-white/50 pb-3">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-28 space-y-4">
                  {['Home', 'CRM', 'Campaigns', 'Automations', 'Conversations'].map((item, idx) => (
                    <div key={idx} className={`h-6 rounded-md w-full flex items-center px-2 text-[10px] font-medium ${idx === 0 ? 'bg-bravo-green text-white' : 'bg-white/50 text-bravo-dark/70'}`}>
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-end gap-3">
                    <h3 className="text-xl font-serif font-bold text-bravo-dark/90">Hello Adrian</h3>
                  </div>
                  <div className="flex gap-4">
                    {/* Calendar Mock */}
                    <div className="flex-1 bg-white/50 rounded-xl p-3 border border-white/40">
                      <div className="text-[11px] font-bold text-bravo-dark mb-2 px-1 bg-white/50 rounded inline-block">June</div>
                      <div className="grid grid-cols-7 gap-1 text-[8px] text-bravo-muted text-center mb-1">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-[9px] text-center font-medium">
                        <span className="text-gray-300">27</span><span className="text-gray-300">28</span><span className="text-gray-300">29</span><span className="text-gray-300">30</span><span className="text-gray-300">31</span>
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                        <span className="bg-[#5B6BF9] text-white rounded">10</span>
                        <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
                      </div>
                    </div>
                    {/* Stats Mock */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="bg-white/50 rounded-xl p-3 flex items-center gap-3 border border-white/40">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <MailIcon />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-bravo-dark/90 leading-tight">5,200</div>
                          <div className="text-[9px] text-bravo-muted/90">New contacts added</div>
                        </div>
                      </div>
                      <div className="bg-white/50 rounded-xl p-3 flex-1 border border-white/40">
                        <div className="flex justify-between text-[10px] mb-2 border-b border-gray-200/50 pb-1">
                          <span className="text-bravo-muted font-medium">Loyal Customers</span>
                          <span className="text-bravo-dark font-bold">3,321</span>
                        </div>
                        <div className="flex justify-between text-[10px] mb-2 border-b border-gray-200/50 pb-1">
                          <span className="text-bravo-muted font-medium">New Customers</span>
                          <span className="text-bravo-dark font-bold">2,905</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-bravo-muted font-medium">Win-back</span>
                          <span className="text-bravo-dark font-bold">1,678</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* main dashboard card (Customer Data) */}
            <div className="absolute top-0 right-0 w-[280px] bg-white rounded-2xl shadow-xl p-5 animate-float border border-gray-100 z-10">
              <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">AH</div>
                <div>
                  <p className="text-sm font-bold text-bravo-dark">Anna Howard</p>
                  <p className="text-xs text-bravo-muted">Very loyal</p>
                </div>
              </div>
              <div className="space-y-3">
                {['Laura Manning', 'Courtney Grant'].map((name, i) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${['bg-blue-400', 'bg-purple-400'][i]}`}>
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-medium text-bravo-dark">{name}</span>
                    </div>
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                      {i === 0 ? 'Very loyal' : 'Potentially loyal'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email campaign card */}
            <div className="absolute bottom-4 left-0 w-[240px] bg-white rounded-2xl shadow-xl p-4 animate-float border border-gray-100 z-20">
              <p className="text-sm font-bold text-bravo-dark mb-1">Summer Collection</p>
              <p className="text-[10px] text-bravo-muted mb-4 border-b border-gray-100 pb-2">Sent on June 27, 2025</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-bravo-muted mb-1">Delivered</p>
                  <p className="text-sm font-bold text-bravo-dark">22,490</p>
                </div>
                <div>
                  <p className="text-[10px] text-bravo-muted mb-1">Orders</p>
                  <p className="text-sm font-bold text-bravo-dark">30</p>
                </div>
              </div>
              <div className="bg-bravo-mintLight/50 p-2 rounded-lg">
                <p className="text-[10px] font-semibold text-bravo-dark mb-2">Clicks by hour</p>
                <div className="flex gap-1 h-12 items-end">
                  {[40, 55, 35, 70, 100, 60, 80, 50, 65, 75].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t ${h === 100 ? 'bg-bravo-green' : 'bg-bravo-green/30'}`} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* revenue card */}
            <div className="absolute bottom-12 -right-4 w-[220px] bg-white rounded-xl shadow-xl p-4 animate-float-slow border border-gray-100 z-30">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-bravo-dark">Revenue</p>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">↑ 30%</span>
              </div>
              <p className="text-2xl font-black text-bravo-dark mb-3">$190.00</p>
              <div className="w-full h-12 flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <path d="M0 30 Q 20 10, 40 25 T 70 15 T 100 5" fill="none" stroke="#004B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 30 Q 20 10, 40 25 T 70 15 T 100 5 L 100 30 L 0 30 Z" fill="rgba(0,75,53,0.1)" stroke="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   TRUSTED BY
   ══════════════════════════════════════════════ */
function TrustedBy() {
  const brands = ['GoNoodle', 'Volkswagen', 'Dynata', 'BrandWatch', 'Michelin', 'Carrefour', 'Louis Vuitton', 'Sodexo'];
  return (
    <section className="py-7 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-5 animate-on-scroll">
        <p className="text-bravo-dark font-medium text-sm md:text-[15px] max-w-xl leading-snug">
          Join <span className="font-bold">600,000+</span> customers around the world who trust Bravo
        </p>

        {/* Centered Ticker Container with fade edges */}
        <div className="relative w-full max-w-4xl overflow-hidden py-1">
          {/* Gradient fade masks on left & right */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex items-center gap-16 animate-ticker-right">
            {[...brands, ...brands, ...brands].map((b, i) => (
              <span key={i} className="text-bravo-muted/50 font-bold text-lg whitespace-nowrap tracking-tight select-none hover:text-bravo-dark transition-colors duration-200">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   STICKY FEATURES (scroll-driven image switching)
   ══════════════════════════════════════════════ */
function StickyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = sectionRefs.current;
      const triggerLine = window.innerHeight * 0.45; // trigger line at 45% of viewport height

      let active = 0;
      elements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // If the top of the element has passed the trigger line, this element is considered active
        if (rect.top <= triggerLine) {
          active = index;
        }
      });

      setActiveIndex(active);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      label: 'MULTICHANNEL MARKETING & AUTOMATION',
      title: 'Grow your business easily',
      description: 'Launch marketing campaigns in minutes and drive more revenue. Skip the learning curve with ready-made templates, guided automation and intuitive tools anyone can master.',
      linkText: 'Learn more',
    },
    {
      label: 'ALL-IN-ONE-SOLUTION',
      title: 'Built to scale with you',
      description: 'As your business expands, send more, automate more and engage across new channels. Manage the entire customer journey from one powerful platform — for marketing, sales, CRM and loyalty.',
      linkText: 'Sign up free',
    },
    {
      label: 'AI-FIRST PLATFORM',
      title: 'Accelerate with AI',
      description: 'Work smarter and faster with Bravo AI. Optimize every campaign with personalized product recommendations, ideal send times, and clear insights into what drives results.',
      linkText: 'Learn more',
    },
  ];

  /* ─── the 3 visuals ─── */
  const visuals = [
    /* Multichannel Marketing visual */
    <div key="multichannel" className="relative w-full h-[450px] flex items-center justify-center">
      {/* Connecting Lines (Simulated with div borders for simplicity, but very faint) */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-t border-l border-gray-300 rounded-tl-3xl z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 border-t border-r border-gray-300 rounded-tr-3xl z-0"></div>

      {/* Main Image Container */}
      <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-lg z-10 border border-gray-100">
        <img
          src="/woman_mirror.png"
          alt="Woman doing skincare"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Badges */}
      {[
        { text: 'Email', pos: 'top-6 left-1/2 -translate-x-1/2', icon: '✉️', style: 'bg-purple-100 border-purple-200 text-purple-900 shadow-md' },
        { text: 'Mobile Push', pos: 'top-16 left-6', icon: '📱', style: 'bg-white border-gray-200 shadow-sm' },
        { text: 'SMS', pos: 'top-32 left-4', icon: '💬', style: 'bg-white border-gray-200 shadow-sm' },
        { text: 'WhatsApp', pos: 'top-48 left-10', icon: '📞', style: 'bg-white border-gray-200 shadow-sm' },
        { text: 'Wallet', pos: 'bottom-20 left-4', icon: '💳', style: 'bg-white border-gray-200 shadow-sm' },

        { text: 'Live chat', pos: 'top-16 right-6', icon: '💬', style: 'bg-white border-gray-200 shadow-sm' },
        { text: 'Web Push', pos: 'top-36 right-10', icon: '🔔', style: 'bg-white border-gray-200 shadow-sm' },
        { text: 'Chatbot', pos: 'top-56 right-6', icon: '🤖', style: 'bg-white border-gray-200 shadow-sm' },
      ].map((b) => (
        <div key={b.text} className={`absolute ${b.pos} border px-3 py-1.5 rounded-lg flex items-center gap-2 z-20 transition-transform hover:scale-105 cursor-pointer ${b.style}`}>
          <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center text-[10px]">{b.icon}</div>
          <span className="text-[11px] font-semibold text-gray-700">{b.text}</span>
        </div>
      ))}

      {/* Phone Mockup at Bottom */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[150px] h-[200px] bg-white rounded-t-[1.5rem] border-[5px] border-gray-900 border-b-0 shadow-2xl z-30 flex flex-col overflow-hidden">
        <div className="w-10 h-2 bg-gray-900 rounded-full mx-auto mt-2 mb-1"></div>
        <div className="flex-1 bg-[#f0e6e0] p-3 text-center flex flex-col items-center">
          <p className="font-serif text-gray-900 text-sm leading-tight mt-2">New this<br />winter season</p>
          <div className="mt-2 bg-gray-900 text-white text-[7px] font-bold px-2 py-1 rounded">GET 15% OFF</div>
          <div className="mt-4 w-6 h-16 bg-orange-300 rotate-12 rounded-sm shadow-sm"></div>
        </div>
      </div>

      {/* Floating Email Icon on Phone */}
      <div className="absolute bottom-16 left-[calc(50%-85px)] w-8 h-8 bg-purple-100 border border-purple-200 rounded flex items-center justify-center shadow-lg rotate-[-10deg] z-40">
        <MailIcon className="w-4 h-4 text-purple-700" />
      </div>
    </div>,

    /* All-in-One Solution visual */
    <div key="allinone" className="relative w-full h-[450px] flex items-center justify-center">
      {/* 1. Sales Pipeline Card */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[340px] bg-white border border-gray-200 rounded-xl shadow-sm p-3 z-10">
        <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px]">👥</div>
            <div>
              <p className="text-[11px] font-bold text-gray-900 leading-none">Sales Pipeline</p>
              <p className="text-[9px] text-gray-500">7 Deals</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button className="text-[9px] border border-gray-200 px-2 py-0.5 rounded-full font-medium text-gray-700">Import deals</button>
            <button className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full font-medium">Create deals</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Column 1 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-bold text-gray-900">New</p>
              <span className="text-[8px] bg-gray-100 text-gray-500 px-1 rounded">1</span>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500 mb-2">
              <span>Est. revenue</span>
              <span className="font-semibold text-gray-800">$200.00</span>
            </div>
            <div className="bg-purple-100 rounded p-1.5 border border-purple-200">
              <p className="text-[8px] font-medium text-gray-800 mb-1">Art & Co - Analytics</p>
              <div className="flex gap-1">
                <span className="bg-white border border-purple-200 text-gray-600 px-1 py-0.5 rounded text-[7px] flex items-center gap-0.5"><span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span> Jane</span>
                <span className="bg-white border border-purple-200 text-gray-600 px-1 py-0.5 rounded text-[7px]">Todo</span>
              </div>
            </div>
          </div>
          {/* Column 2 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-bold text-gray-900">Qualifying</p>
              <span className="text-[8px] bg-gray-100 text-gray-500 px-1 rounded">2</span>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500 mb-2">
              <span>Est. revenue</span>
              <span className="font-semibold text-gray-800">$116.25</span>
            </div>
            <div className="bg-purple-100/70 rounded p-1.5 border border-purple-200/70">
              <p className="text-[8px] font-medium text-gray-800 mb-1">iCapital - Consulting</p>
              <div className="flex gap-1">
                <span className="bg-white border border-purple-200 text-gray-600 px-1 py-0.5 rounded text-[7px] flex items-center gap-0.5"><span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span> John</span>
                <span className="bg-white border border-purple-200 text-gray-600 px-1 py-0.5 rounded text-[7px]">Call</span>
              </div>
            </div>
          </div>
          {/* Column 3 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-bold text-gray-900">Demo</p>
              <span className="text-[8px] bg-gray-100 text-gray-500 px-1 rounded">1</span>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500 mb-2">
              <span>Est. revenue</span>
              <span className="font-semibold text-gray-800">$1,300.00</span>
            </div>
            <div className="bg-purple-100/50 rounded p-1.5 border border-purple-200/50">
              <p className="text-[8px] font-medium text-gray-800 mb-1">Cascade Vent.</p>
              <div className="flex gap-1">
                <span className="bg-white border border-purple-200 text-gray-600 px-1 py-0.5 rounded text-[7px] flex items-center gap-0.5"><span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span> Lisa</span>
                <span className="bg-white border border-purple-200 text-gray-600 px-1 py-0.5 rounded text-[7px]">Email</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Managed Campaigns Card */}
      <div className="absolute top-[160px] left-6 w-[170px] bg-white border border-gray-200 rounded-xl shadow-sm p-3 z-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-[10px]">✉️</div>
          <div>
            <p className="text-[10px] font-bold text-gray-900 leading-none">Managed Camp.</p>
            <p className="text-[8px] text-gray-500">12 ongoing</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1 w-full mr-2">
              <p className="text-[8px] text-gray-800 font-medium">Summer Campaign</p>
              <div className="w-full h-1 bg-gray-200 rounded-full"></div>
              <div className="w-2/3 h-1 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex gap-1 shrink-0">
              <span className="text-[7px] border border-gray-200 rounded-full px-1.5 py-0.5">SMS</span>
              <span className="text-[7px] border border-gray-200 rounded-full px-1.5 py-0.5 bg-gray-50">Draft</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1 w-full mr-2">
              <p className="text-[8px] text-gray-800 font-medium">New arrivals</p>
              <div className="w-full h-1 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex gap-1 shrink-0">
              <span className="text-[7px] border border-gray-200 rounded-full px-1.5 py-0.5">Email</span>
              <span className="text-[7px] border border-gray-200 rounded-full px-1.5 py-0.5 bg-gray-50">Draft</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Customer Data Card */}
      <div className="absolute top-[160px] right-6 w-[160px] bg-white border border-gray-200 rounded-xl shadow-sm p-3 z-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-[10px]">👥</div>
          <div>
            <p className="text-[10px] font-bold text-gray-900 leading-none">Customer Data</p>
            <p className="text-[8px] text-gray-500">Best customers</p>
          </div>
        </div>
        <div className="space-y-2">
          {['Maria S.', 'Anna H.', 'Courtney', 'Laura M.'].map((n, i) => (
            <div key={n} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                <img src={`https://picsum.photos/50/50?random=${i + 10}`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] font-medium text-gray-800 flex-1">{n}</span>
              {i === 0 && <span className="text-[7px] border border-gray-200 rounded-full px-1.5 py-0.5 whitespace-nowrap">Potentially loyal</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Overlapping Revenue Card */}
      <div className="absolute bottom-8 left-4 w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-[10px]">📊</div>
            <div>
              <p className="text-[9px] font-bold text-gray-900 leading-none">Revenue</p>
              <p className="text-[7px] text-gray-500">June</p>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-900">$190.00</p>
        </div>
        <div className="h-16 w-full relative mb-3 overflow-hidden rounded">
          {/* Simulate chart */}
          <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-green-100 to-transparent"></div>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,30 L20,20 L40,25 L60,10 L80,15 L100,0" fill="none" stroke="#22c55e" strokeWidth="2" />
          </svg>
        </div>
        <div className="text-[8px] text-gray-500 flex items-center gap-1">
          <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded-full flex items-center font-bold">↑ 30% up</span>
          from previous period
        </div>
      </div>

      {/* 5. Overlapping Anna Howard Profile */}
      <div className="absolute bottom-10 right-4 w-[140px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-inner">
            <img src={`https://picsum.photos/100/100?random=11`} alt="Anna" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900 mb-1">Anna Howard</p>
            <div className="flex gap-1">
              <span className="w-4 h-4 bg-green-100 text-green-700 rounded flex items-center justify-center text-[8px]">✉</span>
              <span className="w-4 h-4 bg-green-100 text-green-700 rounded flex items-center justify-center text-[8px]">📞</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-[9px] font-bold text-gray-800 mb-1">History</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mb-1"></div>
            <div className="w-3/4 h-1 bg-gray-200 rounded-full"></div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-800 mb-1">Purchases</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mb-1"></div>
            <div className="w-1/2 h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>,

    <div key="aifirst" className="relative w-full h-[450px] flex items-center justify-center">

      {/* Curved connecting line from top node to window */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 400 450">
        <path d="M 230,100 C 230,130 250,150 250,180" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
        <path d="M 120,60 C 160,60 230,60 230,90" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
      </svg>

      {/* Floating Node: Sara bought goggles */}
      <div className="absolute top-8 left-12 bg-white border border-gray-300 rounded-xl shadow-sm p-1.5 flex items-center gap-2 z-10">
        <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden shrink-0">
          <img src="https://picsum.photos/50/50?random=20" alt="Goggles" className="w-full h-full object-cover" />
        </div>
        <div className="pr-2">
          <p className="text-[8px] text-gray-500 leading-none mb-0.5">04.10.25</p>
          <p className="text-[10px] font-medium text-gray-900 leading-none">Sara bought goggles</p>
        </div>
      </div>

      {/* Floating Node: AURA AI bubble */}
      <div className="absolute top-10 left-[180px] bg-purple-50 text-purple-600 border border-purple-200 rounded-full px-2 py-0.5 text-[8px] font-bold z-10 flex items-center gap-1">
        ✨ AURA AI
      </div>

      {/* Floating Node: Personalized recommendations */}
      <div className="absolute top-24 left-[160px] bg-white border border-purple-200 shadow-sm rounded-lg px-3 py-1.5 text-[9px] font-medium text-gray-800 z-10 flex items-center gap-1">
        <span className="text-purple-500">❖</span> Personalized product recommendations
      </div>

      {/* Floating Badge: AI content creation */}
      <div className="absolute top-[200px] left-6 bg-white border border-gray-200 shadow-md rounded-lg px-2 py-1.5 text-[9px] font-medium text-gray-700 z-30 flex items-center gap-1.5">
        <span className="text-blue-500 text-[10px]">≡</span> AI content creation
      </div>

      {/* Floating Badge: AI optimized send time */}
      <div className="absolute bottom-[80px] right-2 bg-white border border-gray-200 shadow-md rounded-lg px-2 py-1.5 text-[9px] font-medium text-gray-700 z-30 flex items-center gap-1.5">
        <span className="text-blue-500 text-[10px]">🕒</span> AI optimized send time
      </div>

      {/* Main Window */}
      <div className="absolute bottom-12 w-[300px] bg-white border border-gray-300 rounded-t-xl rounded-b-md shadow-xl z-20 flex flex-col overflow-hidden">
        {/* Browser header */}
        <div className="border-b border-gray-200 px-3 py-2 flex items-center gap-1 bg-gray-50/50">
          <div className="w-2 h-2 rounded-full border border-gray-300"></div>
          <div className="w-2 h-2 rounded-full border border-gray-300"></div>
          <div className="w-2 h-2 rounded-full border border-gray-300"></div>
        </div>

        {/* Window content */}
        <div className="p-4 flex flex-col items-center bg-white">
          <div className="border border-dashed border-purple-300 rounded-lg py-2 px-4 mb-3 w-[220px] text-center bg-purple-50/30">
            <p className="text-purple-500 text-sm font-serif font-medium leading-tight">We think you might<br />like these!</p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Product 1 */}
            <div className="border border-gray-100 rounded-lg p-2 pb-3 flex flex-col">
              <div className="w-full h-20 rounded-md overflow-hidden bg-gray-100 mb-2 relative">
                <img src="https://picsum.photos/120/100?random=21" alt="Beanie" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[8px]">↗</div>
              </div>
              <p className="text-[10px] font-bold text-gray-900 mb-0.5">Wool Beanie</p>
              <p className="text-[7px] text-gray-500 mb-2 leading-tight flex-1">Knit beanie with soft insulation & workwear-inspired comfort.</p>
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold border border-gray-200 px-1.5 py-1 rounded">$35</span>
                <button className="text-[9px] font-bold bg-black text-white px-2 py-1 rounded flex-1">Shop now</button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="border border-gray-100 rounded-lg p-2 pb-3 flex flex-col">
              <div className="w-full h-20 rounded-md overflow-hidden bg-gray-100 mb-2">
                <img src="https://picsum.photos/120/100?random=22" alt="Jacket" className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] font-bold text-gray-900 mb-0.5">Snow Thermal Jacket</p>
              <p className="text-[7px] text-gray-500 mb-2 leading-tight flex-1">Thermal jacket with water-resistant build and loose style.</p>
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold border border-gray-200 px-1.5 py-1 rounded">$160</span>
                <button className="text-[9px] font-bold bg-black text-white px-2 py-1 rounded flex-1">Shop now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Sticky image area */}
          <div className="hidden lg:block self-stretch">
            <div className="sticky top-28 h-[480px] w-full flex items-center justify-center relative">
              {visuals.map((visual, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${activeIndex === i
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
                >
                  {visual}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Scrollable text sections */}
          <div className="space-y-0 lg:pr-12 pt-4">
            {features.map((feat, i) => (
              <div
                key={i}
                ref={el => sectionRefs.current[i] = el}
                className={`py-16 first:pt-0 last:pb-32 flex flex-col justify-start lg:pt-8 min-h-[40vh] transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'lg:opacity-30'
                  }`}
              >
                {/* Show visual inline on mobile */}
                <div className="lg:hidden mb-8">{visuals[i]}</div>

                <p className="text-bravo-green font-semibold text-xs uppercase tracking-[0.15em] mb-4">{feat.label}</p>
                <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] leading-tight mb-6">{feat.title}</h2>
                <p className="text-bravo-body text-base leading-relaxed mb-6 max-w-md">{feat.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-bravo-green font-semibold text-sm hover:gap-3 transition-all">
                  {feat.linkText} <ArrowRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   ENGAGE YOUR AUDIENCE
   ══════════════════════════════════════════════ */
function EngageAudience() {
  const channels = [
    { name: 'Email marketing', icon: <MailIcon />, visual: '📧', bg: 'bg-bravo-mintLight' },
    { name: 'SMS marketing', icon: <PhoneIcon />, visual: '📱', bg: 'bg-blue-50' },
    { name: 'WhatsApp campaigns', icon: null, visual: '💬', bg: 'bg-green-50', whatsapp: true },
    { name: 'Push notifications', icon: <BellIcon />, visual: '🔔', bg: 'bg-orange-50' },
    { name: 'Loyalty', icon: <HeartIcon />, visual: '❤️', bg: 'bg-pink-50' },
    { name: 'Mobile Wallet', icon: <WalletIcon />, visual: '💳', bg: 'bg-purple-50' },
  ];

  const scrollRef = useRef(null);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] text-center mb-16 animate-on-scroll">
          Engage your audience your way
        </h2>
        
        <div className="relative group/scroll">
          {/* Left Arrow */}
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: -250, behavior: 'smooth' })}
            className="absolute left-0 top-[40%] -translate-y-1/2 -ml-5 z-10 w-10 h-10 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 hidden md:flex items-center justify-center text-bravo-dark hover:text-bravo-green hover:scale-110 transition-all opacity-0 group-hover/scroll:opacity-100"
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 -mx-2 scrollbar-hide" ref={scrollRef}>
            {channels.map((ch) => (
              <div key={ch.name} className="feature-card flex-shrink-0 w-[180px] md:w-[200px] text-center group cursor-pointer animate-on-scroll">
                <div className={`w-16 h-16 ${ch.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  {ch.whatsapp ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  ) : ch.icon}
                </div>
                <p className="text-sm font-semibold text-bravo-dark">{ch.name}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: 250, behavior: 'smooth' })}
            className="absolute right-0 top-[40%] -translate-y-1/2 -mr-5 z-10 w-10 h-10 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 hidden md:flex items-center justify-center text-bravo-dark hover:text-bravo-green hover:scale-110 transition-all opacity-0 group-hover/scroll:opacity-100"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   AI AGENTS
   ══════════════════════════════════════════════ */
function AIAgents() {
  const [activeAgent, setActiveAgent] = useState(0);
  const agents = [
    {
      name: 'Marketing Agent',
      desc: 'Create high-converting campaigns effortlessly — generate copy, auto-segment audiences, optimize send times, and deliver dynamic product recommendations.',
      btn: 'Discover Aura AI',
      visual: (
        <div className="bg-bravo-mintLight rounded-2xl p-5 h-[260px] flex flex-col items-center justify-center">
          <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-[240px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-bravo-green">◆</span>
              <p className="text-xs text-bravo-muted">I'm here to help you with your writing.</p>
            </div>
            <p className="text-xs text-bravo-dark font-medium">What is your favourite item?</p>
            <div className="mt-3 bg-bravo-mint rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-bravo-green">Sale!</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Sales Assistant',
      desc: 'Instantly enrich contacts and accounts, automate deal creation, and send sales emails in seconds — keeping your pipeline moving.',
      btn: 'Discover Aura AI',
      visual: (
        <div className="bg-gray-50 rounded-2xl p-5 h-[260px] flex flex-col items-center justify-center">
          <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-[240px]">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle />
              <p className="text-xs text-bravo-dark font-medium">Your contact data has been enriched successfully</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-bravo-green text-xs">◆</span>
                <p className="text-[10px] text-bravo-muted">I found the following details:</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-[10px] text-bravo-body space-y-1">
                <p>History</p>
                <p>Purchases</p>
              </div>
            </div>
            <button className="mt-3 text-[10px] bg-bravo-dark text-white px-3 py-1.5 rounded-lg font-semibold">Find more</button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* left: heading + navigation */}
          <div className="animate-on-scroll">
            <div className="inline-flex items-center gap-1.5 bg-bravo-mintLight border border-bravo-mint rounded-full px-3 py-1 text-xs font-medium text-bravo-green mb-6">
              <span className="text-bravo-green">◆</span> Powered by Aura
            </div>
            <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] leading-tight mb-4">
              AI agents that work with you,<br />and for you
            </h2>
            <p className="text-bravo-body text-base leading-relaxed mb-8 max-w-md">
              Meet Aura, your always-on marketing, sales, and support team. Aura Agents eliminate the busywork so you can focus on strategy.
            </p>
            <div className="flex gap-3">
              <button
                className="w-10 h-10 rounded-full bg-bravo-dark text-white flex items-center justify-center hover:bg-bravo-green transition-colors"
                onClick={() => setActiveAgent((prev) => (prev - 1 + agents.length) % agents.length)}
              >
                <ChevronLeft />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-bravo-dark text-white flex items-center justify-center hover:bg-bravo-green transition-colors"
                onClick={() => setActiveAgent((prev) => (prev + 1) % agents.length)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* right: agent cards */}
          <div className="flex gap-4 animate-on-scroll">
            {agents.map((agent, i) => (
              <div
                key={agent.name}
                className={`flex-1 rounded-2xl transition-all duration-500 cursor-pointer ${activeAgent === i
                  ? 'border-2 border-bravo-green shadow-lg'
                  : 'border border-gray-200 opacity-60 hover:opacity-80'
                  }`}
                onClick={() => setActiveAgent(i)}
              >
                {agent.visual}
                <div className="p-5">
                  <h3 className="font-bold text-bravo-dark text-base mb-2">{agent.name}</h3>
                  <p className="text-xs text-bravo-body leading-relaxed mb-4">{agent.desc}</p>
                  <a href="#" className="btn-dark text-xs">{agent.btn}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   BUILT FOR EVERY BUSINESS
   ══════════════════════════════════════════════ */
function BuiltForBusiness() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Small Business', 'Enterprise', 'Developers'];
  const tabContent = [
    {
      badge: 'FOR ENTREPRENEURS & SMALL BUSINESSES',
      title: 'Powerful tools, simple setup',
      desc: 'Start fast. Grow confidently. Launch polished campaigns without complexity.',
      features: [
        'Drag-and-drop campaign editor',
        'Ready-to-use templates',
        'No-code marketing automation',
        'Advanced segmentation including web tracking'
      ],
      btnText: 'Explore Bravo for SMBs',
      testimonial: {
        logo: (
          <div className="flex flex-col items-center">
            <span className="font-serif italic font-black text-[#E0533C] text-sm md:text-base leading-tight">Vintage</span>
            <span className="font-mono uppercase tracking-[0.15em] text-[#3BA9D6] text-[8px] md:text-[9px] font-bold">Camper Trailers</span>
          </div>
        ),
        quote: "Bravo gives me all the tools I need to stay connected with my audience in one place—without spending hours learning how to use them.",
        author: "Paul Lacitinola",
        role: "Vintage Camper Trailers",
        image: "/vintage-camper.png"
      }
    },
    {
      badge: 'FOR LARGE & MID-MARKET COMPANIES',
      title: 'Custom solutions for your scale',
      desc: 'Power your growth with dedicated infrastructure, enterprise stability, and expert support.',
      features: [
        'Custom integration & custom API limits',
        'SSO (SAML) & advanced role permissions',
        'Dedicated IP addresses & warm-up guidance',
        'Enterprise-grade security and SOC2 compliance'
      ],
      btnText: 'Explore Bravo for Enterprise',
      testimonial: {
        logo: (
          <div className="flex items-center">
            <span className="font-sans font-black text-blue-600 text-lg">Suntransfers</span>
          </div>
        ),
        quote: "Bravo has transformed how we engage with customers at scale, giving us the perfect mix of speed, reliability, and security.",
        author: "Sarah Jenkins",
        role: "Head of Marketing, Suntransfers",
        image: "/suntransfers.png"
      }
    },
    {
      badge: 'FOR DEVELOPERS & TECH TEAMS',
      title: 'Built by developers, for developers',
      desc: 'Integrate in minutes using our RESTful APIs, SDKs, or high-performance SMTP relay.',
      features: [
        '99.9% reliable transactional SMTP relay',
        'Robust RESTful APIs with multi-language SDKs',
        'Real-time webhooks for delivery, opens, & clicks',
        'Detailed documentation and error monitoring'
      ],
      btnText: 'Explore developer tools',
      testimonial: {
        logo: (
          <div className="flex items-center gap-1.5 text-gray-800">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
            <span className="font-mono font-bold text-sm tracking-tight">TechFlow</span>
          </div>
        ),
        quote: "Bravo's API documentation and reliability made integration seamless. The SMTP relay runs incredibly fast and securely.",
        author: "David Chen",
        role: "Lead Engineer, TechFlow",
        image: "/adbloom.png"
      }
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] leading-tight text-center mb-10 animate-on-scroll">
          Built for every business — from the first send to enterprise
        </h2>

        {/* tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-50 rounded-full p-1 border border-gray-100 shadow-sm animate-on-scroll">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === i
                  ? 'bg-[#C6F7D2] text-[#004B35] shadow-sm'
                  : 'text-bravo-dark hover:text-bravo-green'
                  }`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left: text and features */}
          <div className="animate-on-scroll space-y-6">
            <p className="text-bravo-green font-bold text-xs uppercase tracking-wider">{tabContent[activeTab].badge}</p>
            <h3 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] leading-tight">{tabContent[activeTab].title}</h3>
            <p className="text-bravo-body text-base leading-relaxed max-w-md">{tabContent[activeTab].desc}</p>

            <ul className="space-y-3.5 pt-2">
              {tabContent[activeTab].features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-medium text-bravo-dark">
                  <span className="text-bravo-green font-bold text-base mt-0.5">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a href="#" className="inline-flex items-center justify-center bg-bravo-dark text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-bravo-green transition-all shadow-sm">
                {tabContent[activeTab].btnText}
              </a>
            </div>
          </div>

          {/* right: beautiful testimonial card with overlapping image */}
          <div className="animate-on-scroll relative pt-12 lg:pt-0">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 relative min-h-[300px]">
              {/* Left container: logo + picture */}
              <div className="flex flex-col justify-between w-full md:w-1/3 space-y-8">
                {/* Customer logo */}
                <div className="h-10 flex items-center">
                  {tabContent[activeTab].testimonial.logo}
                </div>

                {/* Author picture (absolute/relative layout to look nice) */}
                <div className="w-36 md:w-40 h-44 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg relative z-10 self-center md:self-auto md:absolute md:-bottom-6 md:left-8">
                  <img
                    src={tabContent[activeTab].testimonial.image}
                    alt={tabContent[activeTab].testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right container: quote info */}
              <div className="w-full md:w-2/3 flex flex-col justify-between space-y-4 md:pl-4">
                <span className="text-bravo-green font-serif text-[4rem] leading-none select-none h-4">“</span>
                <p className="text-bravo-dark font-medium text-sm md:text-base leading-relaxed italic pt-2">
                  {tabContent[activeTab].testimonial.quote}
                </p>

                <div className="pt-4">
                  <p className="font-bold text-bravo-dark text-sm leading-tight">{tabContent[activeTab].testimonial.author},</p>
                  <p className="text-bravo-muted text-xs font-semibold">{tabContent[activeTab].testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SUCCESS STORIES (case studies)
   ══════════════════════════════════════════════ */
function SuccessStories() {
  const stories = [
    {
      logo: (
        <div className="flex items-center gap-1.5 text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4zm0 12a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4zm-6-6a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4zm12 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" /></svg>
          <span className="font-sans font-bold text-lg tracking-tight lowercase">adbloom</span>
        </div>
      ),
      image: "/adbloom.png",
      title: "Adbloom grows revenue by $1M/year",
      desc: "Discover how this marketing agency used Bravo's all-in-one platform to turn their Ed-Tech business into a major growth engine."
    },
    {
      logo: (
        <div className="flex items-center gap-2 text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5c6 0 9 4 10 7 1-3 4-7 10-7v2c-5 0-7 3-8 6h-4c-1-3-3-6-8-6v-2z" /><path d="M12 12c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z" /></svg>
          <span className="font-sans font-black text-base tracking-wider uppercase">BUFFALO GRILL</span>
        </div>
      ),
      image: "/buffalo-grill.png",
      title: "Buffalo Grill achieves 47% repeat restaurant visits",
      desc: "After digitizing their loyalty program with Bravo, this popular restaurant chain activated 500K loyalty cards in just 6 months."
    },
    {
      logo: (
        <div className="flex items-center gap-1.5 text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span className="font-sans font-bold text-lg tracking-tight">Suntransfers</span>
        </div>
      ),
      image: "/suntransfers.png",
      title: "Suntransfers drives 40% revenue growth with Bravo",
      desc: "By personalizing the entire traveler journey with advanced segmentation, this airline boosted both revenue and open rates."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] leading-tight text-center mb-16 animate-on-scroll">
          Real stories, real success
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.title} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col animate-on-scroll group">
              {/* image header with overlay logo */}
              <div className="h-56 relative overflow-hidden bg-gray-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center p-6">
                  {story.logo}
                </div>
              </div>

              {/* body */}
              <div className="p-8 flex flex-col flex-grow space-y-4">
                <span className="bg-[#C6F7D2] text-[#004B35] font-bold text-[10px] tracking-wider uppercase rounded-full px-3 py-1 w-fit">
                  Success Story
                </span>
                <h3 className="font-serif text-bravo-dark text-xl font-bold leading-snug">
                  {story.title}
                </h3>
                <p className="text-bravo-body text-sm leading-relaxed flex-grow">
                  {story.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════

   INTEGRATIONS
   ══════════════════════════════════════════════ */
function Integrations() {
  const integrations = [
    { name: 'PayPal', logo: <span className="font-sans font-black italic text-[#003087] text-lg tracking-tight">PayPal</span> },
    {
      name: 'GoogleAnalytics', logo: (
        <div className="flex items-center gap-1.5 text-gray-700">
          <div className="flex gap-0.5 items-end">
            <div className="w-1.5 h-3 bg-yellow-500 rounded-sm"></div>
            <div className="w-1.5 h-4.5 bg-yellow-600 rounded-sm"></div>
            <div className="w-1.5 h-6 bg-yellow-700 rounded-sm"></div>
          </div>
          <span className="font-sans text-[13px] font-bold">Google Analytics</span>
        </div>
      )
    },
    {
      name: 'GoogleAds', logo: (
        <div className="flex items-center gap-1.5 text-gray-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 3H8L2 15h8l6-12z" fill="#4285F4" /><path d="M8 15h8l6-12h-8L8 15z" fill="#FBBC05" /><path d="M20 15H12l-6 12h8l6-12z" fill="#34A853" /></svg>
          <span className="font-sans text-[13px] font-bold">Google Ads</span>
        </div>
      )
    },
    {
      name: 'elementor', logo: (
        <div className="flex items-center gap-1 text-gray-700">
          <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">E</div>
          <span className="font-sans text-[13px] font-bold">elementor</span>
        </div>
      )
    },
    { name: 'zapier', logo: <span className="font-sans font-extrabold text-[#FF4F00] text-lg">zapier</span> },
    { name: 'OpenAI', logo: <span className="font-sans font-bold text-gray-800 text-lg tracking-tight">OpenAI</span> },
    { name: 'Make', logo: <span className="font-sans font-black text-[#5B6BF9] text-base italic">/// make</span> },
    {
      name: 'ElementorLogo', logo: (
        <div className="w-7 h-7 bg-red-500 rounded flex items-center justify-center text-white font-bold text-base">E</div>
      )
    },
    {
      name: 'OutlookLogo', logo: (
        <div className="w-7 h-7 bg-[#0078d4] rounded flex items-center justify-center text-white font-bold text-base">O</div>
      )
    },
    {
      name: 'Typeform', logo: (
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold">T</span>
          <span className="font-sans text-xs font-semibold text-gray-700">Typeform</span>
        </div>
      )
    },
    {
      name: 'Bravo', logo: (
        <div className="flex items-center gap-1 bg-bravo-green text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
          <span>B</span> Bravo
        </div>
      )
    },
  ];

  return (
    <section className="bg-[#EAF7EE] rounded-t-[40px] pt-16 pb-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] mb-4 animate-on-scroll">
          Bravo connects to the tools you already use
        </h2>
        <p className="text-bravo-body text-base mb-12 animate-on-scroll">
          Bravo runs alongside more than 150 leading digital tools, from CRM to CMS, ecommerce, and more.
        </p>
      </div>

      <div className="relative w-full py-4 mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#EAF7EE] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#EAF7EE] to-transparent z-10 pointer-events-none"></div>

        <div className="flex items-center gap-12 md:gap-20 animate-ticker-right">
          {[...integrations, ...integrations, ...integrations, ...integrations].map((t, i) => (
            <div key={i} className="flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all cursor-pointer shrink-0">
              {t.logo}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <a href="#" className="text-bravo-green font-semibold text-base hover:underline animate-on-scroll inline-block">
          See integrations
        </a>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CTA SECTION
   ══════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-bravo-mintBg rounded-t-[40px] py-10 md:py-12 text-center">
      <div className="max-w-[800px] mx-auto px-6 animate-on-scroll">
        <h2 className="font-serif text-bravo-dark text-3xl md:text-[2.5rem] mb-4 leading-tight">
          Ready to grow with Bravo?
        </h2>
        <p className="text-bravo-body text-base mb-8 max-w-md mx-auto leading-relaxed">
          Connect with customers, convert more leads, and drive repeat business — all from one platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <a href="#" className="btn-dark text-base px-8 py-3">Sign up free</a>
          <a href="#" className="btn-outline text-base px-8 py-3">Get a demo</a>
        </div>
        <p className="text-bravo-muted text-xs">No credit card required.</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
function Footer() {
  const columns = [
    { title: 'PRODUCT', links: ['Email marketing', 'Transactional email', 'Wallet', 'Enterprise solution', 'Marketing automation'] },
    { title: 'COMPARE', links: ['Bulk email service', 'Email marketing platforms', 'Bravo vs Mailchimp', 'Bravo vs HubSpot', 'Bravo vs Klaviyo'] },
    { title: 'RESOURCES', links: ['Help center', 'Platform status', 'Community', 'Blog', 'Templates'] },
    { title: 'PARTNERS', links: ['All partner programs', 'Affiliates', 'Agency partners', 'Startups & VCs'] },
    { title: 'COMPANY', links: ['About us', 'Contact us', 'Leadership', 'Careers', 'Press'] },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* top: logo + socials */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <a href="#" className="font-serif text-bravo-green text-3xl font-bold tracking-tight mb-4 md:mb-0">Bravo</a>
          <div className="flex items-center gap-4">
            {/* social icons as text */}
            {['𝕏', 'in', '📷', '▶', 'f', '♪'].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-bravo-dark text-sm hover:bg-bravo-green hover:text-white transition-all">
                {icon}
              </a>
            ))}
          </div>
        </div>
        {/* columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-bold text-bravo-green text-xs uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-bravo-body hover:text-bravo-green transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* bottom */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-xs text-bravo-muted">© 2026 Bravo, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════ */
export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustedBy />
      <StickyFeatures />
      <EngageAudience />
      <AIAgents />
      <BuiltForBusiness />
      <SuccessStories />
      <Integrations />
      <CTASection />
      <Footer />
    </div>
  );
}
