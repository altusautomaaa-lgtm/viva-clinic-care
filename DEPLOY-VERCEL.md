# Deploy na Vercel

O projeto já está configurado para buildar na Vercel: o `vite.config.ts` usa o preset `vercel` do nitro fora do sandbox da Lovable, gerando `.vercel/output` (Build Output API v3) — a Vercel detecta e publica sem configuração extra.

## Passo a passo

1. **Suba o código para o GitHub** (botão "Connect to GitHub" no editor da Lovable, ou push manual do repositório).
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta o build automaticamente. Confirme:
   - **Build Command:** `bun run build` (ou `npm run build`)
   - **Install Command:** `bun install` (ou `npm install`)
   - **Output Directory:** deixe em branco — o nitro gera `.vercel/output`, que tem prioridade.
4. Em **Environment Variables**, cadastre (valores disponíveis em Project Settings → Cloud no editor da Lovable):

   | Variável | Onde aparece |
   |---|---|
   | `VITE_SUPABASE_URL` | URL do backend |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | chave pública (publishable) |
   | `VITE_SUPABASE_PROJECT_ID` | ID do projeto de backend |
   | `SUPABASE_URL` | mesmo valor de `VITE_SUPABASE_URL` |
   | `SUPABASE_PUBLISHABLE_KEY` | mesmo valor de `VITE_SUPABASE_PUBLISHABLE_KEY` |

   As três primeiras alimentam o app no navegador; as duas últimas são usadas pelas funções de servidor (login do painel admin, envio do formulário de contato).

5. Clique em **Deploy**.

## Observações

- **Banco de dados e autenticação continuam na Lovable Cloud.** A Vercel hospeda apenas o site; os dados (posts, especialidades, mensagens, login do admin) seguem no backend atual. Nada precisa ser migrado.
- O login do painel admin (`/admin`) funciona normalmente, desde que as variáveis acima estejam corretas.
- O domínio configurado na Vercel deve ser adicionado às URLs permitidas de autenticação do backend (Project Settings → Cloud → Authentication), caso o login apresente erro de redirect.
- `.vercel/` é saída de build local — não commitar.
- O preview dentro da Lovable continua funcionando normalmente; o preset da Vercel só é usado em builds fora do sandbox.
