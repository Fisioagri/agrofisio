-- ─── Adiciona campos estruturados à tabela laudos ───────────────────────────
-- Permite exibir histórico detalhado sem depender de parse de HTML

ALTER TABLE public.laudos
  ADD COLUMN IF NOT EXISTS talhao         text,
  ADD COLUMN IF NOT EXISTS data_plantio   text,
  ADD COLUMN IF NOT EXISTS hibrido        text,
  ADD COLUMN IF NOT EXISTS adubacao       text,
  ADD COLUMN IF NOT EXISTS analise_solo   jsonb,
  ADD COLUMN IF NOT EXISTS analise_foliar jsonb,
  ADD COLUMN IF NOT EXISTS deficiencias   text[],
  ADD COLUMN IF NOT EXISTS objetivos      text[];
