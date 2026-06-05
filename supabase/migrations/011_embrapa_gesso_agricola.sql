-- ─── EMBRAPA CERRADOS — USO DO GESSO AGRÍCOLA ────────────────────────────────
-- Sousa, Lobato & Rein, Circular Técnica 32, Embrapa Cerrados (2005)
-- Diagnóstico, doses, resposta de culturas e gesso como fonte de S
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

('Embrapa Cerrados — Diagnóstico da necessidade de gesso agrícola',
 'protocolo', 'all',
 'Gesso agrícola (CaSO₄·2H₂O) corrige a acidez da subsuperfície (20-60 cm) onde o calcário não alcança em tempo razoável. O problema de acidez subsuperficial afeta 70% da área agricultável do Cerrado (saturação de Al > 10% abaixo de 20 cm) e 86% tem Ca < 0,4 cmolc/dm³ na subsuperfície. DIAGNÓSTICO: coletar e analisar solo nas profundidades 20-40 cm e 40-60 cm. SE saturação de Al > 20% OU Ca < 0,5 cmolc/dm³ na subsuperfície → aplicar gesso. TESTE BIOLÓGICO de campo: comparar comprimento de raízes em solo com e sem gesso após 4 dias — se índice (raiz com gesso / raiz sem gesso) > 1,15 → usar gesso. Sintomas de sistema radicular superficial: plantas murcham rapidamente em veranicos; absorção de N, P e outros nutrientes da subsuperfície comprometida. Gesso NÃO neutraliza acidez — ele carreia Ca para profundidade junto ao sulfato.',
 'Sousa, D.M.G.; Lobato, E.; Rein, T.A. (2005). Uso de Gesso Agrícola nos Solos do Cerrado. Embrapa Cerrados, Circular Técnica 32.',
 '{gesso, CaSO4, subsuperfície, Al, alumínio, Ca, cálcio, acidez, enraizamento, Cerrado, diagnóstico}'),

('Embrapa Cerrados — Dose e aplicação do gesso agrícola por textura do solo',
 'protocolo', 'all',
 'Doses de gesso agrícola (15% S) recomendadas para culturas anuais por textura: Solo arenoso: 700 kg/ha. Solo de textura média: 1.200 kg/ha. Solo argiloso: 2.200 kg/ha. Solo muito argiloso: 3.200 kg/ha. Fórmula: D.G. (kg/ha) = 50 × Argila (%) para culturas anuais; 75 × Argila (%) para culturas perenes. Modo de aplicação: a lanço após a calagem (ou imediatamente antes) — pode ser deixado na superfície pois dissolve e infiltra junto com a água, fixando-se na subsuperfície até 60-80 cm. Efeito residual: mínimo 5 anos, podendo chegar a 15 anos — não há necessidade de reaplicação neste período. Parcelamento não é necessário. Gypsum dissolve mais lentamente que o calcário, mas seus efeitos são perceptíveis já no primeiro ano após a aplicação.',
 'Sousa, D.M.G.; Lobato, E.; Rein, T.A. (2005). Uso de Gesso Agrícola nos Solos do Cerrado. Embrapa Cerrados, Circular Técnica 32.',
 '{gesso, dose, textura, argila, aplicação, efeito residual, Cerrado, subsuperfície}'),

('Embrapa Cerrados — Resposta de soja, milho e trigo ao gesso agrícola',
 'referencia', 'all',
 'Experimentos com veranico na época da floração mostraram os seguintes aumentos de produtividade com gesso agrícola: Soja: de 2,1 para 2,4 t/ha (+0,3 t/ha = +10 sacos/ha); Milho: de 3,2 para 5,5 t/ha (+2,3 t/ha = +20 sacos/ha); Trigo: de 2,2 para 3,5 t/ha (+1,3 t/ha). O mecanismo é o aprofundamento das raízes na subsuperfície corrigida — em veranicos de 25 dias, plantas com gesso absorvem água e nutrientes de camadas mais profundas. Absorção de nutrientes aumenta em média 50% com gesso (experimento com trigo: N 80→120 kg/ha, P 15→22, K 53→80, Ca 12→16, Mg 11→16, S 7→12 kg/ha absorvidos). Em áreas sob plantio direto, ganhos de até 20 sacos/ha de milho. O gesso também corrige deficiência de S (fornece ~20 kg S/ha/ano nas doses recomendadas para culturas anuais).',
 'Sousa, D.M.G.; Lobato, E.; Rein, T.A. (2005). Uso de Gesso Agrícola nos Solos do Cerrado. Embrapa Cerrados, Circular Técnica 32.',
 '{gesso, produtividade, soja, milho, trigo, veranico, S, enxofre, raiz, profundidade, Cerrado}');
