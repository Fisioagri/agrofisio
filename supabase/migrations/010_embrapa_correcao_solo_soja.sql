-- ─── EMBRAPA CPAC — CORREÇÃO DO SOLO E ADUBAÇÃO DA SOJA (CERRADO) ───────────
-- Sousa & Lobato, Circular Técnica 33, Embrapa CPAC (1996)
-- Calagem, adubação P/K/micronutrientes, gesso para solos do Cerrado
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

('Embrapa CPAC — Calagem para soja no Cerrado: pH alvo e métodos de cálculo',
 'protocolo', 'soja',
 'pH alvo para soja no Cerrado: 5,5 a 6,0 (nesta faixa há boa assimilação de P, K, S, N e FBN eficiente). A saturação por bases (V%) ótima para soja é em torno de 50% — produtividade estabiliza entre 40-60% de V e decresce acima de 60% (pH > 6,3). MÉTODO SATURAÇÃO DE BASES: NC (t/ha) = [(V2 - V1) × T] / 100, onde V2 = 50%, V1 = saturação atual, T = CTC total. Fator PRNT: corrigir dose dividindo 100/PRNT (ex: PRNT 80% → multiplicar por 1,25). Atenção: V% > 60% (pH > 6,3) induz deficiência de Zn, Cu e Mn — o mais frequente no Cerrado é Mn. Calcário dolomítico ou magnesiano (mínimo 5,1% MgO) é preferido pela deficiência generalizada de Mg nos solos do Cerrado. Relação Ca:Mg no solo deve ser 1:1 a 10:1; mínimo 0,5 cmolc/dm³ de Mg. Calcário tem efeito residual de 5-6 anos — considerar como investimento. Nova análise a cada 3 anos.',
 'Sousa, D.M.G.; Lobato, E. (1996). Correção do Solo e Adubação da Cultura da Soja. Embrapa CPAC, Circular Técnica 33.',
 '{calagem, pH, saturação de bases, PRNT, Mg, Zn, Mn, Cerrado, soja}'),

('Embrapa CPAC — Adubação fosfatada corretiva e de manutenção para soja',
 'protocolo', 'soja',
 'Fósforo é o nutriente mais limitante nos solos do Cerrado em condições naturais. Calagem prévia (pH 5,5-6,0) é indispensável para eficiência da adubação fosfatada. Níveis críticos de P (Mehlich-1) variam com textura: argila 61-80% = bom se P > 3 ppm; argila 41-60% = bom se P > 8 ppm; argila 21-40% = bom se P > 14 ppm; argila < 20% = bom se P > 18 ppm. ADUBAÇÃO CORRETIVA TOTAL (a lanço): para argila 61-80% com P muito baixo, aplicar 240 kg P₂O₅/ha; para argila 21-40%, 120 kg P₂O₅/ha. ADUBAÇÃO CORRETIVA GRADUAL (no sulco por até 6 anos): doses menores anuais até atingir nível suficiente. MANUTENÇÃO quando P está no nível bom: 60 kg P₂O₅/ha para meta de 3 t/ha de soja; 80 kg para 4 t/ha. Cada tonelada de grão adicional requer proporcionalmente mais P na manutenção.',
 'Sousa, D.M.G.; Lobato, E. (1996). Correção do Solo e Adubação da Cultura da Soja. Embrapa CPAC, Circular Técnica 33.',
 '{P, fósforo, adubação, corretiva, manutenção, Mehlich-1, nível crítico, textura, Cerrado, soja}'),

('Embrapa CPAC — Adubação potássica para soja no Cerrado',
 'protocolo', 'soja',
 'Os solos do Cerrado são pobres em K. Soja exporta ~20 kg de K₂O por tonelada de grãos. Resposta potássica: incremento de 24 para 45 ppm de K no solo propiciou +0,8 t/ha de grãos. Nível de suficiência de K (Mehlich-1): 50 ppm para solos com teor de argila > 20%; 25 ppm para solos arenosos. ADUBAÇÃO CORRETIVA: solos argilosos (> 20% argila): 100 kg K₂O/ha se K baixo (< 26 ppm); 50 kg se K médio (26-50 ppm). Solos arenosos (< 20% argila): metade das doses acima. MANUTENÇÃO: 20 kg K₂O por tonelada de grão esperada. Em solos arenosos: parcelar — 50% no sulco de semeadura + 50% em cobertura (30 dias após emergência) para reduzir perdas por lixiviação. Preferir aplicação a lanço nos solos argilosos. Alta concentração de KCl no sulco favorece perdas por lixiviação em solos arenosos.',
 'Sousa, D.M.G.; Lobato, E. (1996). Correção do Solo e Adubação da Cultura da Soja. Embrapa CPAC, Circular Técnica 33.',
 '{K, potássio, adubação, manutenção, lixiviação, Mehlich-1, solo arenoso, Cerrado, soja}'),

('Embrapa CPAC — Micronutrientes para soja no Cerrado: doses e teores foliares suficientes',
 'referencia', 'soja',
 'Zn é o micronutriente mais deficiente nos solos do Cerrado para soja. Teores foliares suficientes (análise em R1, 3ª folha do ápice): Zn 20-50 ppm; Cu 10-30 ppm; Mn 20-100 ppm; B 20-55 ppm; Mo 1-5 ppm; Fe 50-350 ppm. Níveis críticos no solo (Mehlich-1): Zn 1,0 ppm; Cu 0,5 ppm; Mn 5,0 ppm (a pH 6,0); B 0,5 ppm (água quente). Recomendação de aplicação a lanço (efeito residual ~4 anos): 4-6 kg Zn/ha (sulfato de zinco), 0,5-1,0 kg B/ha, 0,5-1,0 kg Cu/ha, 2,5-6,0 kg Mn/ha, 50-250 g Mo/ha, 50-250 g Co/ha. Alternativa: 1/4 da dose a lanço, aplicada no sulco por 4 anos consecutivos. Cada 9 kg Zn/ha a lanço aumentou 1,5 t/ha de soja em experimento no Cerrado. Fórmulas NPK com micronutrientes incorporados são convenientes pela facilidade de aplicação.',
 'Sousa, D.M.G.; Lobato, E. (1996). Correção do Solo e Adubação da Cultura da Soja. Embrapa CPAC, Circular Técnica 33.',
 '{Zn, zinco, B, boro, Cu, cobre, Mn, manganês, Mo, molibdênio, Co, cobalto, micronutrientes, diagnose foliar, Cerrado, soja}'),

('Embrapa CPAC — Nitrogênio e inoculação com rizóbio na soja do Cerrado',
 'protocolo', 'soja',
 'O N mineral é dispensável para a soja com inoculação eficiente de Bradyrhizobium japonicum. Inoculante deve ser específico para soja, com mínimo de 10 milhões de células vivas de rizóbio por grama (exigência legal brasileira). Dose: 1 kg de inoculante para 40 kg de sementes em solos de primeiro cultivo. Manter a mesma dose nos anos seguintes. Matéria orgânica é responsável por ~90% da CTC do solo — soja produz MO com baixa relação C/N (fácil decomposição); para manter MO ativa, alternar soja com gramíneas (milho, sorgo) no sistema de rotação. Soja em rotação com gramíneas: aumenta MO, mantém estrutura do solo e estoque de N biológico. Não aplicar N mineral junto à semeadura — inibe nodulação.',
 'Sousa, D.M.G.; Lobato, E. (1996). Correção do Solo e Adubação da Cultura da Soja. Embrapa CPAC, Circular Técnica 33.',
 '{N, nitrogênio, FBN, rizóbio, inoculação, bradyrhizobium, nodulação, matéria orgânica, rotação de culturas, soja}');
