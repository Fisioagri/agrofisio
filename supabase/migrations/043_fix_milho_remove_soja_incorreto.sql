-- ─── CORREÇÃO: Remover dados de soja aplicados incorretamente ao milho ───────
-- Remove entradas com cultura='milho' que contêm conteúdo específico de soja
-- (FBN via Bradyrhizobium/nódulos, estádios V/R de soja, etc.)
-- ─────────────────────────────────────────────────────────────────────────────

-- Remove entradas de milho que mencionam FBN via nódulos (exclusivo de leguminosas)
DELETE FROM public.conhecimento
WHERE cultura = 'milho'
  AND (
    conteudo ILIKE '%bradyrhizobium%'
    OR conteudo ILIKE '%nódulo%'
    OR conteudo ILIKE '%nodulação%'
    OR conteudo ILIKE '%leghemoglobina%'
    OR (conteudo ILIKE '%FBN%' AND conteudo ILIKE '%rhizobium%')
    OR conteudo ILIKE '%fixação biológica%nódulo%'
  );

-- Remove entradas de milho que descrevem estádios fenológicos de soja
-- (VE, VC, V1...R5 com terminologia de soja: vagens, flores axilares, etc.)
DELETE FROM public.conhecimento
WHERE cultura = 'milho'
  AND (
    conteudo ILIKE '%vagem%soja%'
    OR conteudo ILIKE '%florescimento%soja%'
    OR conteudo ILIKE '%soja%estádio%V%'
    OR (titulo ILIKE '%soja%' AND cultura = 'milho')
  );

-- Corrigir entradas 'all' que descrevem FBN como se fosse aplicável ao milho via nódulos
-- (milho NÃO forma nódulos; Azospirillum faz fixação ASSOCIATIVA, não simbiótica)
UPDATE public.conhecimento
SET conteudo = REPLACE(
  conteudo,
  'fixação biológica de N₂ em milho via nódulos',
  'fixação associativa de N₂ em milho via Azospirillum (sem nódulos — associação rizosférica)'
)
WHERE cultura IN ('milho', 'all')
  AND conteudo ILIKE '%milho%nódulo%';

-- Inserir nota técnica de diferenciação FBN soja vs milho
INSERT INTO public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags, ativo) values

('Diferença entre FBN em soja e fixação associativa em milho — conceito essencial',
 'artigo', 'milho',
 'DISTINÇÃO FUNDAMENTAL: FBN SIMBIÓTICA (SOJA, FEIJÃO) vs FIXAÇÃO ASSOCIATIVA (MILHO, TRIGO, CANA). SOJA: Bradyrhizobium japonicum forma NÓDULOS nas raízes (estrutura especializada com leghemoglobina) → fixação de 100-300 kg N/ha/ciclo; processo SIMBIÓTICO = planta fornece C aos bacteróides, bactéria fornece NH₃ à planta; eficiência alta = pode substituir 100% do N mineral em soja bem inoculada. MILHO: Azospirillum brasilense coloniza RIZOSFERA e superfície radicular (SEM nódulos, SEM leghemoglobina) → fixação ASSOCIATIVA de 10-30 kg N/ha; processo NÃO-simbiótico = bactéria fixa N2 em microambientes de anaerobiose próximos à raiz; contribuição principal no milho = produção de IAA (estimula raízes) e maior eficiência de absorção de N mineral, não FBN direta. CONCLUSÃO PRÁTICA: em SOJA, inoculação com Bradyrhizobium pode SUBSTITUIR N mineral; em MILHO, inoculação com Azospirillum é um COMPLEMENTO que melhora a eficiência do N aplicado (+15-30% rendimento nos ensaios), mas NÃO substitui a adubação nitrogenada. Milho precisa de N mineral (60-180 kg N/ha dependendo do solo e produtividade esperada).',
 'Hungria, M. et al. (2010). Inoculation with Azospirillum brasilense. Plant Soil 331:413. / Döbereiner, J. (1997). Biological nitrogen fixation in tropical grasses. Soil Biol Biochem 29:771.',
 '{milho, FBN, Azospirillum, fixação associativa, nódulo, soja, Bradyrhizobium, N mineral, diferença, inoculação, rizosfera, IAA, eficiência}');
