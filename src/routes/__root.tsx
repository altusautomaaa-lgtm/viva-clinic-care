import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import appCss from '../styles.css?url';
import { SiteHeader, SiteFooter } from '@/components/site';
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { property: 'og:site_name', content: 'VivaMed' }], links: [{ rel: 'stylesheet', href: appCss }, { rel: 'preconnect', href: 'https://fonts.googleapis.com' }, { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap' }] }),
  shellComponent: ({ children }: { children: ReactNode }) => <html lang="pt-BR"><head><HeadContent/></head><body>{children}<Scripts/></body></html>,
  component: () => <QueryClientProvider client={Route.useRouteContext().queryClient}><SiteHeader/><main><Outlet/></main><SiteFooter/></QueryClientProvider>,
  notFoundComponent: () => <div className="container-wide section"><h1>Página não encontrada</h1><p>O endereço que você procura não está disponível.</p><Link to="/">Voltar ao início</Link></div>
});
