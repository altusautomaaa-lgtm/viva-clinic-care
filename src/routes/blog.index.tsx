import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InnerHero, SectionHeading, useSite } from '@/components/site';
import { metadata } from '@/lib/site';
import care from '@/assets/care.jpg.asset.json';
import doctor from '@/assets/doctor.jpg.asset.json';
import dentistry from '@/assets/dentistry.jpg.asset.json';
import hero from '@/assets/hero.jpg.asset.json';
export const Route=createFileRoute('/blog/')({head:()=>metadata('Blog de saúde e bem-estar','Conteúdos da VivaMed sobre saúde, odontologia, prevenção e bem-estar.','/blog'),component:Blog});
const covers=[care.url, dentistry.url, doctor.url, hero.url];
export function ArticleCard({post,index=0}:{post:{id:string;title:string;subtitle:string;slug:string;category:string;cover_url:string|null;published_at:string|null;body:string};index?:number}){return <Link to="/blog/$slug" params={{slug:post.slug}} className="article-card"><img src={post.cover_url??covers[index%covers.length]} alt="" loading="lazy"/><div className="article-card-body"><small>{post.category} · {post.published_at?new Date(post.published_at).toLocaleDateString('pt-BR'):'Em breve'} · {Math.max(1,Math.ceil(post.body.split(/\s+/).length/220))} min</small><h3>{post.title}</h3><p>{post.subtitle}</p></div></Link>}
function Blog(){const {data}=useSite();const [q,setQ]=useState('');const [cat,setCat]=useState('Todos');const posts=(data?.posts??[]).filter(p=>(cat==='Todos'||p.category===cat)&&`${p.title} ${p.subtitle}`.toLowerCase().includes(q.toLowerCase()));return <><InnerHero eyebrow="Blog" title="Conversas sobre o que importa: você." description="Saúde, cuidado e bem-estar em conteúdos para acompanhar o seu dia a dia."/><section className="section section-white"><div className="container-wide"><SectionHeading eyebrow="CONTEÚDO VIVAMED" title="Para ler com calma"/><div className="blog-tools"><div className="category-list"><Button variant="outline" onClick={()=>setCat('Todos')} className={cat==='Todos'?'selected':''}>Todos</Button>{(data?.categories??[]).map(x=><Button variant="outline" key={x.id} onClick={()=>setCat(x.name)} className={cat===x.name?'selected':''}>{x.name}</Button>)}</div><input aria-label="Buscar artigos" value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar artigos..."/></div>{posts.length?<div className="editorial-row">{posts.map((p,i)=><ArticleCard key={p.id} post={p} index={i}/>)}</div>:<p>Nenhum artigo encontrado.</p>}</div></section></>}
