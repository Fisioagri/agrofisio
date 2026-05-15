-- ─── BASE DE CONHECIMENTO ────────────────────────────────────────────────────
-- Artigos científicos, protocolos e referências adicionadas pelo admin
-- São incluídas nos prompts da IA para enriquecer as diagnoses
-- ─────────────────────────────────────────────────────────────────────────────

create table public.conhecimento (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  tipo        text not null check (tipo in ('artigo', 'protocolo', 'referencia', 'nota')),
  cultura     text not null default 'all' check (cultura in ('soja', 'milho', 'feijao', 'all')),
  conteudo    text not null,           -- resumo técnico para o prompt
  fonte       text,                    -- ex: "Marschner (2012) p. 245"
  tags        text[] default '{}',     -- ex: '{N, deficiencia, clorose}'
  ativo       boolean default true,
  created_at  timestamp with time zone default timezone('utc'::text, now()),
  updated_at  timestamp with time zone default timezone('utc'::text, now())
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table public.conhecimento enable row level security;

-- Qualquer usuário autenticado lê entradas ativas
create policy "users_read_active"
  on public.conhecimento for select
  to authenticated
  using (ativo = true);

-- Admin lê tudo (incluindo inativos)
create policy "admin_read_all"
  on public.conhecimento for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin cria
create policy "admin_insert"
  on public.conhecimento for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin atualiza
create policy "admin_update"
  on public.conhecimento for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin deleta
create policy "admin_delete"
  on public.conhecimento for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ─── AUTO updated_at ──────────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger set_updated_at
  before update on public.conhecimento
  for each row execute procedure public.handle_updated_at();

-- ─── DADOS INICIAIS (artigos-chave) ──────────────────────────────────────────
insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

('Marschner — Interações entre nutrientes no solo e planta', 'artigo', 'all',
'Nutrientes competem por sítios de absorção na raiz. Antagonismos clássicos: Ca×Mg×K (balanço catiônico), P×Zn (excesso de P precipita Zn), Cu×Mo (competição), Fe×Mn (inibição mútua em pH extremos). Relação Ca:Mg ideal: 3:1 a 5:1. Relação K:(Ca+Mg) ideal < 0.5. Excesso de K suprime Ca e Mg. MO > 2.5% aumenta CTC e biodisponibilidade de micronutrientes.',
'Marschner, H. (2012). Mineral Nutrition of Higher Plants, 3rd ed. Academic Press.',
'{nutrição mineral, antagonismos, CTC, MO}'),

('Taiz & Zeiger — Fotossíntese e demanda de nutrientes por estádio', 'artigo', 'soja',
'Em R1-R3 (florescimento e inicio de granação) a demanda de K e B é máxima para transporte de fotoassimilados. N e P são críticos em V3-R2 para estrutura foliar e síntese de proteínas. Deficiência de Mn reduz PSII em até 40%. B é essencial para integridade de parede celular em meristemas florais. Zn controla síntese de triptofano (precursor de auxina).',
'Taiz, L. & Zeiger, E. (2017). Plant Physiology and Development, 6th ed. Sinauer.',
'{fotossíntese, estádio, K, B, Mn, Zn}'),

('Embrapa Soja — Adubação foliar corretiva', 'protocolo', 'soja',
'Janelas ideais para correção foliar: V3-V5 (micronutrientes estruturais: B, Zn, Cu), R1-R2 (K para enchimento, B para pegamento floral), R3-R5 (Mn, Fe para fotossíntese em granação). Volume de calda: 100-150 L/ha. pH da calda: 5.5-6.5 para maior eficiência de absorção. Adicionar surfactante não-iônico 0.05% v/v. Mistura B+Zn é sinérgica. Não misturar Cu+B (precipitação).',
'Embrapa Soja. Tecnologias de Produção de Soja — Região Central do Brasil (2023).',
'{foliar, B, Zn, Cu, Mn, calda, surfactante}'),

('Embrapa Milho e Sorgo — Nutrição e produtividade do milho', 'artigo', 'milho',
'Milho tem demanda crescente de N de V6 a VT (100-200 kg/ha N total). K é exportado em maior quantidade que N nos grãos de milho. Zn é o micronutriente mais limitante em solos arenosos tropicais (disponibilidade reduz 3x por unidade de pH acima de 6.0). Relação N:S deve ser 10:1 para síntese proteica eficiente. B crítico em VT para viabilidade do pólen.',
'Embrapa Milho e Sorgo. Cultivo do Milho, 9ª ed. (2021).',
'{milho, N, K, Zn, B, VT, grão}'),

('Kerbauy — Hormônios vegetais e manejo fisiológico', 'artigo', 'all',
'ABA aumenta em estresse hídrico e fecha estômatos (reduz fotossíntese até 60%). Citocininas promovem divisão celular e retardam senescência foliar. Etileno em excesso (estresse oxidativo, doenças) acelera abscisão de flores e vagens. Aplicação exógena de Brassinoesteroides (100 ppb) aumenta tolerância ao calor e à seca. Giberelinas controlam alongamento celular (internode); excesso causa acamamento. Auxinas regulam dominância apical e enraizamento.',
'Kerbauy, G.B. (2008). Fisiologia Vegetal, 2ª ed. Guanabara Koogan.',
'{hormônios, ABA, citocinina, etileno, brassinoesteroide, giberelina, auxina}'),

('CQFS RS/SC — Micronutrientes em solos de alta produtividade', 'referencia', 'all',
'Valores críticos no solo (Mehlich-1): B < 0.2 mg/dm³ = deficiente; Zn < 0.5 mg/dm³ = deficiente; Cu < 0.2 mg/dm³ = deficiente; Mn < 2 mg/dm³ = deficiente. Em solos com pH > 6.2 a disponibilidade de Mn, Fe e Zn reduz significativamente (quelação). Em solos com alto teor de P (> 60 mg/dm³) a disponibilidade de Zn é reduzida (formação de fosfato de zinco insolúvel). Calagem excessiva é principal causa de deficiência de Mn e Zn no Sul do Brasil.',
'CQFS-RS/SC (2016). Manual de Calagem e Adubação para os Estados do RS e SC, 11ª ed.',
'{micronutrientes, B, Zn, Cu, Mn, pH, calagem}');
