# Deploy na Vercel + Supabase próprio

O projeto é independente de plataforma: `vite.config.ts` usa o preset `vercel` do nitro no `vite build`, gerando `.vercel/output` (Build Output API v3), que a Vercel publica sem configuração extra.

## 1. Supabase

1. Crie um projeto em https://supabase.com.
2. No **SQL Editor**, rode em ordem:
   - `supabase/setup.sql` (schema, RLS e policies; equivale a `drizzle/migrations/`)
   - `supabase/seed.sql` (conteúdo migrado: categorias, posts, especialidades e WhatsApp)
3. Em **Authentication → URL Configuration**, defina **Site URL** e **Redirect URLs** com o domínio da Vercel.
4. Crie sua conta em `/admin` (aba "Criar conta"), confirme o e-mail e dê o papel de admin no SQL Editor:

   ```sql
   insert into public.user_roles (user_id, role)
   select id, 'admin' from auth.users where email = 'SEU_EMAIL';
   ```

## 2. Vercel

1. **Add New → Project** e importe o repositório.
2. Confirme: **Build Command** `bun run build`, **Install Command** `bun install`, **Output Directory** em branco.
3. Em **Environment Variables**, cadastre (valores em Supabase → Project Settings → API):

   | Variável | Valor |
   |---|---|
   | `VITE_SUPABASE_URL` | URL do projeto |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | chave publishable (anon) |
   | `VITE_SUPABASE_PROJECT_ID` | ID do projeto |
   | `SUPABASE_URL` | mesmo valor de `VITE_SUPABASE_URL` |
   | `SUPABASE_PUBLISHABLE_KEY` | mesmo valor de `VITE_SUPABASE_PUBLISHABLE_KEY` |

4. Clique em **Deploy**.

## Imagens

As imagens ficam em `public/images/` e são servidas em `/images/<arquivo>`. Arquivos esperados: `hero.jpg`, `consultation.jpg`, `care.jpg`, `dentistry.jpg`, `doctor.jpg`, `vivamed-fachada.png`, `blog-checkup.jpg`, `blog-exames.jpg`, `blog-rotina-saudavel.jpg`, `blog-saude-bucal.jpg`.

## Observações

- Nunca commite o `.env` nem use a chave `service_role` em variáveis `VITE_*`.
- `.vercel/` é saída de build local — não commitar.
