-- Add doc_url column to insumos and movimentacoes
ALTER TABLE public.insumos ADD COLUMN IF NOT EXISTS doc_url text;
ALTER TABLE public.movimentacoes ADD COLUMN IF NOT EXISTS doc_url text;

-- Create storage bucket for estoque documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('estoque-docs', 'estoque-docs', true)
ON CONFLICT (id) DO NOTHING;

-- RLS: authenticated users can upload their own files
CREATE POLICY IF NOT EXISTS "Authenticated upload estoque-docs"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'estoque-docs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- RLS: authenticated users can read all files in bucket
CREATE POLICY IF NOT EXISTS "Authenticated read estoque-docs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'estoque-docs');

-- RLS: users can delete their own files
CREATE POLICY IF NOT EXISTS "Authenticated delete estoque-docs"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'estoque-docs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
