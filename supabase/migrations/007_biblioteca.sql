-- Bucket privado para PDFs de referência científica (uso interno da IA)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'biblioteca',
  'biblioteca',
  false,
  157286400,  -- 150 MB por arquivo
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Somente admins autenticados podem fazer upload
CREATE POLICY "Admin upload biblioteca" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'biblioteca'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Somente admins podem listar/baixar
CREATE POLICY "Admin read biblioteca" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'biblioteca'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Somente admins podem excluir
CREATE POLICY "Admin delete biblioteca" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'biblioteca'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
