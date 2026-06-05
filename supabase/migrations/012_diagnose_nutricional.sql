-- ─── FAQUIN — DIAGNOSE DO ESTADO NUTRICIONAL DAS PLANTAS (UFLA/FAEPE, 2002) ──
-- Métodos de diagnose, fome oculta, DRIS, faixas de suficiência
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

('Faquin/UFLA — Fome oculta: sintomas subclínicos e produção já comprometida',
 'artigo', 'all',
 'A sintomatologia visual de deficiência ou toxicidade é o ÚLTIMO passo de uma série de problemas metabólicos. Quando os sintomas aparecem, de maneira geral, a produção já foi comprometida. Isso é chamado de "fome oculta" ou "toxidez oculta" — ocorre quando a carência ou excesso são mais leves e o crescimento e produção são limitados sem que a sintomatologia típica se manifeste. Sequência de anormalidades: 1) Alteração molecular (ex: acúmulo de compostos tóxicos, redução de enzimas); 2) Lesão subcelular (membranas, organelas); 3) Alteração celular (células menores, em menor número); 4) Modificação no tecido (órgãos menores); 5) Manifestação visível (sintoma visual). Implicação prática: Análise de solo e foliar antes do surgimento de sintomas é mais eficiente que diagnose visual reativa. Lavouras com sintomas já perderam produção que não será recuperada mesmo com correção imediata.',
 'Faquin, V. (2002). Diagnose do Estado Nutricional das Plantas. UFLA/FAEPE, Lavras.',
 '{fome oculta, sintoma subclínico, diagnose precoce, análise foliar, análise de solo, produção}'),

('Faquin/UFLA — Diagnose visual: princípios e limitações no campo',
 'artigo', 'all',
 'A diagnose visual compara o aspecto (coloração, tamanho, forma) da folha com padrões conhecidos. A folha é o órgão que melhor reflete o estado nutricional — é onde ocorrem os principais processos metabólicos. Princípios fundamentais: 1) Localização dos sintomas: folhas basais (nutrientes móveis: N, K, Mg, P) vs. folhas apicais (imóveis: Ca, B, S, Fe, Mn); 2) Gradiente de intensidade: sintomas se intensificam dos tecidos normais para os afetados; 3) Simetria: sintomas nutricionais são simétricos nas duas faces da folha (ao contrário de doenças); 4) Distribuição na lavoura: deficiência nutricional tende a ser uniforme ou com gradiente; pragas e doenças formam focos. LIMITAÇÕES: diagnose visual não distingue deficiências múltiplas ou antagonismos; não identifica fome oculta; pode ser confundida com sintomas de doenças, herbicidas, ou excesso de salinidade. Confirmação laboratorial é indispensável para diagnose definitiva.',
 'Faquin, V. (2002). Diagnose do Estado Nutricional das Plantas. UFLA/FAEPE, Lavras.',
 '{diagnose visual, sintomas, mobilidade, simetria, distribuição, lavoura, doenças, herbicidas}'),

('Faquin/UFLA — DRIS: Sistema Integrado de Diagnose e Recomendação',
 'artigo', 'all',
 'O DRIS (Diagnosis and Recommendation Integrated System) é um método de interpretação da análise foliar que considera o equilíbrio nutricional, não apenas os teores individuais. Conceito central: A nutrição adequada não depende apenas dos teores isolados de cada nutriente, mas também das RELAÇÕES entre eles. Índices DRIS positivos = nutriente em excesso relativo; índices negativos = deficiência relativa; índice zero = teor ótimo em relação aos outros. O nutriente com índice mais negativo é o mais limitante. Índice de Equilíbrio Nutricional (IEN): somatório absoluto de todos os índices — quanto menor, melhor o equilíbrio nutricional. Aplicação prática: o DRIS identifica casos onde a produção é limitada por desequilíbrio nutricional MESMO quando nenhum nutriente está individualmente abaixo do nível crítico — situação comum em lavouras intensificadas com adubações NPK pesadas mas sem reposição adequada de micronutrientes.',
 'Faquin, V. (2002). Diagnose do Estado Nutricional das Plantas. UFLA/FAEPE, Lavras.',
 '{DRIS, equilíbrio nutricional, relação entre nutrientes, índice, nível crítico, diagnose foliar}'),

('Faquin/UFLA — Deficiência de zinco: sequência de eventos fisiológicos',
 'artigo', 'all',
 'A deficiência de Zn é uma das mais comuns em solos tropicais. Sequência de eventos que conduz aos sintomas visíveis: 1) Alteração molecular: redução de AIA (auxina) por menor síntese de triptofano; aumento de hidrólise de proteínas. 2) Lesão subcelular: paredes celulares mais rígidas; menor teor de proteínas. 3) Alteração celular: células menores e em menor número. 4) Modificação no tecido: órgãos menores. 5) Manifestação visível: internódios curtos, folhas novas pequenas, clorose internerval. Zn atua como cofator da anidrase carbônica (CO₂ ↔ HCO₃⁻ nas células), desidrogenase, e sintetase do triptofano. A deficiência de Zn compromete a produção de auxina, resultando em internódios encurtados e roseta. Em milho: faixas brancas nos bordos das folhas jovens. Nível crítico foliar: 15-20 ppm Zn (abaixo = deficiência). Verificar pH, excesso de P e uso de fungicidas como fatores predisponentes.',
 'Faquin, V. (2002). Diagnose do Estado Nutricional das Plantas. UFLA/FAEPE, Lavras.',
 '{Zn, zinco, deficiência, sequência, AIA, auxina, triptofano, internódio, roseta, milho, anidrase carbônica}');
