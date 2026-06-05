-- ─── FUNDAMENTOS DE FERTILIDADE DO SOLO (UEPB, 2024) ────────────────────────
-- Rocha, Silva, Santos & Severo — Macro/micronutrientes, MO, calagem, lei do mínimo
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

('UEPB — Lei do Mínimo e otimização da adubação',
 'artigo', 'all',
 'Lei do Mínimo (Liebig, 1862): O crescimento de uma planta está limitado pelo nutriente que se encontra em menor proporção relativa à necessidade da planta — independente da abundância dos demais. Representação prática: o barril com tábuas de alturas diferentes — a produção é limitada pela tábua mais curta. Aplicação: não adianta gastar com NPK se Mg, S ou micronutrientes estão deficientes. Na lavoura de milho: maiores produtividades ocorrem com doses altas de N E K combinadas — não adianta maximizar N com K insuficiente. Lei dos Incrementos Decrescentes (Mitscherlich): cada incremento de adubo gera ganhos de produção cada vez menores. Implicação econômica: a produtividade ótima economicamente situa-se entre 80-90% da produtividade física máxima — doses acima desse ponto não compensam o custo do adubo adicional e podem induzir toxicidade ou desequilíbrio nutricional.',
 'Rocha, J.L.A. et al. (2024). Fundamentos de Fertilidade do Solo. EDUEPB, Campina Grande.',
 '{Lei do Mínimo, Liebig, Mitscherlich, incrementos decrescentes, otimização, adubação, equilíbrio nutricional}'),

('UEPB — Matéria orgânica do solo: funções e manejo',
 'artigo', 'all',
 'Funções da matéria orgânica do solo (MOS): 1) CTC: em solos altamente intemperizados (Latossolos tropicais), a MOS é responsável pela maior parte da CTC — relação C/N dos resíduos determina imobilização (C/N > 30) vs. mineralização (C/N < 20) de nutrientes. 2) Complexação de metais: MOS quelata Al³⁺ (reduz toxicidade) e evita precipitação de Fe, Mn e Zn em pH elevado. 3) Redução da fixação de P: grupos funcionais da MOS bloqueiam sítios de adsorção de P em óxidos de Fe e Al, aumentando P disponível. 4) Agregação e retenção hídrica: MOS forma e estabiliza agregados, aumentando espaço para água e ar. 5) Ativação biológica: estimula micorrizas, fixadores de N, solubilizadores de P. Manejo para manter MOS: rotação de culturas (gramíneas + leguminosas), plantio direto, menor revolvimento do solo. A MOS decresce com monocultivo, arações frequentes e altas temperaturas — problema crítico no Cerrado e Caatinga.',
 'Rocha, J.L.A. et al. (2024). Fundamentos de Fertilidade do Solo. EDUEPB, Campina Grande.',
 '{matéria orgânica, CTC, complexação, P, agregação, atividade biológica, plantio direto, rotação}'),

('UEPB — Acidez do solo e efeitos nas plantas: tolerância de culturas ao Al',
 'referencia', 'all',
 'pH < 5,5: Al³⁺ solúvel torna-se fitotóxico — principal causa de raízes curtas e grossas, redução da absorção de água e nutrientes em profundidade. pH < 4,5: excesso de H⁺ pode deslocar Ca²⁺ da plasmalema, alterando permeabilidade e bloqueando crescimento radicular. Mn²⁺ também tóxico em pH < 5,0. Mo e P ficam indisponíveis em pH baixo (fixação). Níveis críticos de saturação de Al (m%) por espécie: Algodão 10%; Alfafa 15%; Soja 20%; Feijão 20%; Milho 30%; Arroz 45%. Benefícios da calagem além de neutralizar acidez: fornece Ca e Mg, estimula crescimento radicular, aumenta disponibilidade de P, reduz Al e Mn, aumenta mineralização da MOS, aumenta CTC. Supercalagem (pH > 6,8): causa deficiência de Fe, Mn, Zn, Cu — é prejudicial. Meta: pH 5,5-6,5 para a maioria das culturas tropicais.',
 'Rocha, J.L.A. et al. (2024). Fundamentos de Fertilidade do Solo. EDUEPB, Campina Grande.',
 '{acidez, Al, alumínio, pH, toxicidade, calagem, tolerância, soja, milho, feijão, Mn, P, Mo}'),

('UEPB — Nitrogênio e fixação biológica em leguminosas',
 'referencia', 'all',
 'N é o macronutriente mais dinâmico no solo — pode ser perdido por lixiviação (NO₃⁻) ou volatilização (NH₃, N₂O). 98-99% do N do solo está na forma orgânica — mineralização pela microbiota é a principal fonte para as plantas. Fixação Biológica de N₂ (FBN) por Rhizobium em leguminosas: soja fixa 60-178 kg N/ha/ciclo; feijão 2-110 kg; feijão-caupi 73-354 kg; amendoim 72-124 kg; leucena 500-600 kg/ha/ano. Condições que inibem FBN: acidez (Al tóxico inibe nodulação), estresse hídrico, N mineral em excesso, fungicidas sistêmicos. N mineral preferencialmente absorvido como NO₃⁻ em solos bem aerados. NH₄⁺ em excesso é fitotóxico e acidifica o solo. Adubação nitrogenada: N (kg/ha) = [requerimento da cultura - suprimento do solo] / eficiência de uso (0,75 para culturas bem manejadas).',
 'Rocha, J.L.A. et al. (2024). Fundamentos de Fertilidade do Solo. EDUEPB, Campina Grande.',
 '{N, nitrogênio, FBN, rhizobium, soja, feijão, fixação biológica, mineralização, nodulação, volatilização}'),

('UEPB — Fósforo no solo: frações, fixação e disponibilidade',
 'artigo', 'all',
 'P é o nutriente com maior deficiência nos solos brasileiros (> 90% das análises mostram teores baixos). Frações no solo: P-solução (prontamente disponível, < 0,05 mg/L — muito baixo); P-lábil (reserva em equilíbrio com P-solução); P-não-lábil (fortemente ligado a óxidos de Fe e Al, argilominerais 1:1 — indisponível). Solos altamente intemperizados e ácidos fixam até 90% do P aplicado. Matéria orgânica reduz fixação de P — grupos funcionais bloqueiam sítios de adsorção. Calagem (pH > 5,5) aumenta disponibilidade de P ao reduzir Al e Fe ativos. Micorrizas arbusculares captam P de regiões inacessíveis às raízes (hifas exploram 8 cm além da zona de depleção de raiz). Alto P no solo (> 60 mg/dm³) suprime micorrizas. P move-se por difusão no solo (coeficiente 10⁻¹² cm²/s) — muito imóvel. Fracionamento de P no solo: P de Al e Fe são as formas fixadas mais comuns em solos tropicais.',
 'Rocha, J.L.A. et al. (2024). Fundamentos de Fertilidade do Solo. EDUEPB, Campina Grande.',
 '{P, fósforo, fixação, óxidos de Fe e Al, micorriza, disponibilidade, solo tropical, adsorção, difusão}'),

('UEPB — Exportação de nutrientes pela soja por tonelada de grãos',
 'referencia', 'soja',
 'Quantidade de nutrientes exportados pela soja nos grãos (por tonelada de grão produzido — base para cálculo de adubação de manutenção): N: 65 kg/t; P₂O₅: 16 kg/t; K₂O: 20 kg/t; Ca: 3 kg/t; Mg: 3 kg/t; S: 4 kg/t. Valores aproximados para metas de produtividade (grão + palha extraídos da área): 3 t/ha de soja extrai ~195 kg N/ha, 48 kg P₂O₅/ha, 60 kg K₂O/ha. Importância prática: o cálculo da adubação de manutenção deve repor pelo menos a quantidade de nutrientes exportados nos grãos. Para produtividades crescentes, ajustar proporcionalmente. O não repor os nutrientes exportados leva à exaustão gradual da fertilidade — Lei da Restituição. Soja FBN eficiente supre o N — apenas P e K precisam ser repostos pela adubação mineral na maioria dos casos.',
 'Rocha, J.L.A. et al. (2024). Fundamentos de Fertilidade do Solo. EDUEPB, Campina Grande.',
 '{exportação, soja, nutrientes, grão, adubação de manutenção, N, P, K, Ca, Mg, S, lei da restituição}');
