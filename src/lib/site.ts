export const address = 'Rua Presidente Vargas, 586 - Comendador Soares, Rio de Janeiro - RJ';
export const instagram = 'https://www.instagram.com/vivamedofc/';
export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rua Presidente Vargas, 586, Comendador Soares, Nova Iguaçu, RJ');
export const metadata = (title: string, description: string, path: string) => ({
  meta: [ { title: `${title} | VivaMed` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | VivaMed` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: path }, { name: 'twitter:card', content: 'summary_large_image' } ],
  links: [{ rel: 'canonical', href: path }]
});
