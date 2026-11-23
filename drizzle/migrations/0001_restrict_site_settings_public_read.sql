DROP POLICY IF EXISTS "Settings public" ON public.site_settings;
CREATE POLICY "Public contact settings readable" ON public.site_settings FOR SELECT TO anon, authenticated USING (key IN ('whatsapp','address','instagram','email'));
CREATE POLICY "Admins read all settings" ON public.site_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));