-- Tabela de contratos de insumos grandes
CREATE TABLE IF NOT EXISTS public.contratos (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users NOT NULL,
  nome_produto text NOT NULL,
  empresa      text,
  volume       numeric,
  unidade      text DEFAULT 'L',
  valor_total  numeric,
  preco_unit   numeric,
  data_inicio  date,
  data_fim     date,
  status       text DEFAULT 'ativo' CHECK (status IN ('ativo', 'parcial', 'encerrado')),
  notas        text,
  doc_url      text,
  produtos_json jsonb,
  vencimento   date,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own contratos" ON public.contratos
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
