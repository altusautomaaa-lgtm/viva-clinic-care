import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

function client() {
  return createClient<Database>(process.env['SUPABASE_URL']!, process.env['SUPABASE_PUBLISHABLE_KEY']!, { auth: { persistSession: false, autoRefreshToken: false } });
}
export const getPublicContent = createServerFn({ method: 'GET' }).handler(async () => {
  const db = client();
  const [settings, content, posts, categories] = await Promise.all([
    db.from('site_settings').select('*'), db.from('site_content').select('*').eq('published', true).order('sort_order'),
    db.from('posts').select('*').or(`and(status.eq.published,or(published_at.is.null,published_at.lte.${new Date().toISOString()})),and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`).order('published_at', { ascending: false }),
    db.from('categories').select('*').order('sort_order')
  ]);
  return { settings: settings.data ?? [], content: content.data ?? [], posts: posts.data ?? [], categories: categories.data ?? [] };
});
export const getPublicPost = createServerFn({ method: 'GET' }).inputValidator((slug: string) => slug).handler(async ({ data }) => {
  const { data: post } = await client().from('posts').select('*').eq('slug', data).maybeSingle();
  if (!post || (post.status !== 'published' && post.status !== 'scheduled') || (post.published_at && new Date(post.published_at) > new Date())) return null;
  return post;
});
