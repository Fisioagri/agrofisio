-- ─── TABELA LAUDOS ─────────────────────────────────────────────────────────────
-- Histórico de diagnoses e protocolos fisiológicos gerados pelo wizard

CREATE TABLE IF NOT EXISTS public.laudos (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  produtor_nome  text,
  cultura        text,
  estadio        text,
  safra          text,
  diagnose_html  text,
  laudo_html     text,
  -- Campos estruturados (migration 045)
  talhao         text,
  data_plantio   text,
  hibrido        text,
  adubacao       text,
  analise_solo   jsonb,
  analise_foliar jsonb,
  deficiencias   text[],
  objetivos      text[],
  created_at     timestamp with time zone DEFAULT timezone('utc', now())
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE public.laudos ENABLE ROW LEVEL SECURITY;

-- Usuário vê apenas seus próprios laudos
CREATE POLICY "laudos_select_own" ON public.laudos
  FOR SELECT USING (auth.uid() = user_id);

-- Usuário insere seus próprios laudos
CREATE POLICY "laudos_insert_own" ON public.laudos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuário deleta seus próprios laudos
CREATE POLICY "laudos_delete_own" ON public.laudos
  FOR DELETE USING (auth.uid() = user_id);

-- Admin vê todos os laudos
CREATE POLICY "laudos_admin_all" ON public.laudos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
