import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowRight, Instagram, MapPin, Menu, MessageCircle, X, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getPublicContent } from '@/lib/content.functions';
import { address, instagram, mapUrl } from '@/lib/site';

export function useSite() {
  return useQuery({ queryKey: ['public-content'], queryFn: () => getPublicContent(), staleTime: 60_000 });
}
export function useWhatsApp() {
  const { data } = useSite();
  const raw = data?.settings.find(x => x.key === 'whatsapp')?.value ?? '';
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10 ? `https://wa.me/${digits.startsWith('55') ? digits : '55' + digits}` : null;
}
export function usePhoneDisplay() {
  const { data } = useSite();
  const digits = (data?.settings.find(x => x.key === 'whatsapp')?.value ?? '').replace(/\D/g, '').replace(/^55/, '');
  return digits.length >= 10 && digits.length <= 11 ? `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}` : null;
}
export function WhatsAppCTA({ children = 'Agendar atendimento', className = '', iconOnly = false }: { children?: React.ReactNode; className?: string; iconOnly?: boolean }) {
  const url = useWhatsApp();
  return <Button asChild className={className}><a href={url ?? instagram} target="_blank" rel="noopener noreferrer" aria-label={iconOnly ? (url ? 'Falar no WhatsApp' : 'Falar pelo Instagram') : undefined}>{iconOnly ? (url ? <MessageCircle size={19}/> : <Instagram size={19}/>) : <><span>{url ? children : 'Falar pelo Instagram'}</span><ArrowRight size={16}/></>}</a></Button>;
}
const nav = [ ['/', 'Início'], ['/sobre', 'A VivaMed'], ['/especialidades', 'Especialidades'], ['/exames', 'Exames'], ['/odontologia', 'Odontologia'], ['/blog', 'Blog'], ['/contato', 'Contato'] ] as const;
export function Logo({ light = false }: { light?: boolean }) {
  return <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="VivaMed, início"><span className="brand-symbol"><HeartPulse size={25} strokeWidth={1.8}/></span><span className="brand-copy"><strong>Viva<span>Med</span></strong><small>SAÚDE E ODONTOLOGIA</small></span></Link>;
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  return <header className="site-header"><div className="header-inner container-wide"><Logo/><nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([to,label]) => <Link key={to} to={to} className={path === to ? 'nav-active' : ''}>{label}</Link>)}</nav><div className="header-actions"><div className="header-cta"><WhatsAppCTA className="desktop-contact"/><WhatsAppCTA iconOnly className="mobile-contact"/></div><Button className="menu-toggle" variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X/> : <Menu/>}</Button></div></div>{open && <nav className="mobile-nav" aria-label="Navegação mobile">{nav.map(([to,label]) => <Link key={to} to={to}>{label}</Link>)}<WhatsAppCTA/></nav>}</header>;
}
export function SiteFooter() {
  const url = useWhatsApp();
  return <><footer className="site-footer"><div className="container-wide footer-grid"><div className="footer-about"><Logo light/><p>Saúde e odontologia mais perto de você. Atendimento em Comendador Soares, Nova Iguaçu.</p></div><div><h3>Explore</h3><Link to="/sobre">A VivaMed</Link><Link to="/especialidades">Especialidades</Link><Link to="/odontologia">Odontologia</Link><Link to="/exames">Exames</Link></div><div><h3>Conteúdo</h3><Link to="/blog">Blog</Link><Link to="/contato">Contato</Link><Link to="/politica-de-privacidade">Política de Privacidade</Link><Link to="/termos-de-uso">Termos de Uso</Link></div><div><h3>Onde estamos</h3><a href={mapUrl} target="_blank" rel="noopener noreferrer">{address}</a><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram · @vivamedofc</a>{url && <a href={url} target="_blank" rel="noopener noreferrer">WhatsApp</a>}</div></div><div className="container-wide footer-bottom"><span>© 2026 VivaMed. Todos os direitos reservados.</span><span>Nova Iguaçu — RJ</span></div></footer><a className="floating-contact" href={url ?? instagram} target="_blank" rel="noopener noreferrer" aria-label={url ? 'Falar no WhatsApp' : 'Falar pelo Instagram'}>{url ? <MessageCircle size={23}/> : <Instagram size={23}/>}</a></>;
}
export function Breadcrumb({ current }: { current: string }) { return <div className="breadcrumb"><Link to="/">Início</Link><span>/</span><span>{current}</span></div>; }
export function InnerHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image?: string }) { return <section className={`inner-hero ${image ? 'inner-hero-image' : ''}`}><div className="container-wide inner-hero-content"><Breadcrumb current={eyebrow}/><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></div></div>{image && <img src={image} alt=""/>}</section>; }
export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) { return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>; }
export function ContactStrip() { return <section className="contact-strip"><div className="container-wide contact-strip-inner"><div><p className="eyebrow">ESTAMOS AQUI PARA VOCÊ</p><h2>Vamos conversar sobre o seu cuidado?</h2></div><WhatsAppCTA/></div></section>; }
export function EmptyContent({ text }: { text: string }) { return <div className="empty-content"><p>{text}</p><WhatsAppCTA children="Entre em contato"/></div>; }
