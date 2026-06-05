-- ─── TAIZ & ZEIGER — FISIOLOGIA VEGETAL 3ª EDIÇÃO ───────────────────────────
-- Entradas derivadas dos capítulos 3, 4 e 5 (pgs 1-100)
-- Foco: diagnose de deficiências, relações hídricas, fisiologia estomática
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

-- ─── NUTRIÇÃO MINERAL — CONCENTRAÇÕES ADEQUADAS NO TECIDO FOLIAR ─────────────
('Taiz & Zeiger — Concentrações suficientes de nutrientes no tecido foliar',
 'referencia', 'all',
 'Concentrações foliares adequadas para crescimento normal (base em peso seco): Macronutrientes — N: 1,5%; K: 1,0%; Ca: 0,5%; Mg: 0,2%; P: 0,2%; S: 0,1%. Micronutrientes — Cl: 100 ppm; Fe: 100 ppm; Mn: 50 ppm; B: 20 ppm; Zn: 20 ppm; Cu: 6 ppm; Mo: 0,1 ppm. Valores abaixo dessas faixas indicam deficiência provável. Diagnose foliar deve comparar tecido de referência (folha mais recente completamente expandida) com esses padrões. Excesso de N acima de 4% pode indicar desequilíbrio e aumenta suscetibilidade a fungos.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Tabela 5.1.',
 '{nutrição mineral, concentração foliar, diagnose, N, K, Ca, Mg, P, S, Fe, Mn, B, Zn, Cu, Mo}'),

-- ─── GRUPOS BIOQUÍMICOS DOS NUTRIENTES ───────────────────────────────────────
('Taiz & Zeiger — Grupos bioquímicos e funções dos nutrientes minerais',
 'artigo', 'all',
 'Nutrientes minerais são classificados em 4 grupos funcionais. 1) Compostos orgânicos: N (proteínas, ácidos nucleicos, clorofila) e S (cisteína, metionina, ferredoxina, coenzimas). Deficiência causa falha estrutural e metabólica ampla. 2) Energia e estrutura: P (ATP, fosfolipídeos, ácidos nucleicos) e Si/B (parede celular, integridade estrutural). 3) Atividade iônica osmótica: K (potencial osmótico, abertura estomática, ativação enzimática), Ca (sinalização, parede celular pectínica, divisão celular), Mg (centro da clorofila, cofator enzimático), Cl e Mn (fotólise da água no PSII). 4) Óxido-redução: Fe, Zn, Cu, Ni, Mo (cofatores de enzimas redox — nitrogenase, catalase, plastocianina, ferredoxina). Conhecer o grupo funcional orienta o diagnóstico: deficiências do grupo 1 são as mais amplas; do grupo 4 afetam diretamente a fotossíntese e fixação de N.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Tabela 5.2.',
 '{grupos bioquímicos, N, S, P, K, Ca, Mg, Fe, Zn, Cu, Mo, Mn, fotossíntese, enzimas}'),

-- ─── MOBILIDADE DOS NUTRIENTES — LOCALIZAÇÃO DOS SINTOMAS ────────────────────
('Taiz & Zeiger — Mobilidade de nutrientes no floema e diagnose visual',
 'artigo', 'all',
 'A localização dos sintomas de deficiência (folha velha vs. folha nova) é determinada pela mobilidade do nutriente no floema. ELEMENTOS MÓVEIS (sintomas aparecem primeiro em folhas velhas/basais, pois o nutriente é remobilizado para órgãos novos): N, K, Mg, P, Cl, Zn, Mo. Clorose internerval em folhas velhas com folhas jovens verdes = típico de Mg. Clorose generalizada em folhas velhas = típico de N. Manchas necróticas em bordas de folhas velhas = típico de K. ELEMENTOS IMÓVEIS (sintomas aparecem primeiro em folhas jovens/ápice, pois não há remobilização): Ca, S, Fe, B, Cu. Clorose em folhas jovens com nervuras verdes = Fe. Morte de meristema apical e malformação de folhas jovens = B. Folhas jovens deformadas ou enroladas = Ca. Esta regra é a ferramenta mais rápida de triagem em campo.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Tabela 5.4 e Cap. 5.',
 '{mobilidade, floema, sintomas, diagnose visual, folha velha, folha nova, N, K, Mg, P, Zn, Mo, Ca, S, Fe, B, Cu}'),

-- ─── SINTOMAS POR ELEMENTO — MACRONUTRIENTES ─────────────────────────────────
('Taiz & Zeiger — Sintomas visuais de deficiência de macronutrientes',
 'artigo', 'all',
 'Deficiência de N: clorose amarela uniforme começando pelas folhas mais velhas, progressão ascendente; crescimento reduzido; em gramíneas, folhas inferiores ficam amarelo-palha com nervuras amarelas. Deficiência de K: necrose marginal e pontas das folhas velhas (queima de bordas), depois internervura; plantas flácidas com turgescência reduzida; acúmulo de carboidratos nas folhas; acamamento em cereais. Deficiência de P: folhas velhas com coloração verde-escura a púrpura-avermelhada (acúmulo de antocianinas, especialmente em soja e milho); pecíolos avermelhados; raízes mais longas (exploração compensatória). Deficiência de Ca: morte de gemas apicais e radicelas; folhas jovens enroladas ou deformadas; necrose de pontas em alface e tomate ("tip burn"); não há remobilização, sintomas sempre em tecidos jovens. Deficiência de Mg: clorose internerval clássica em folhas velhas (nervuras verdes, internervura amarela); mais intensa em soja em solos arenosos; folhas avermelhadas em estádios avançados. Deficiência de S: clorose uniforme em folhas jovens (similar a N mas começando nas folhas novas); afeta síntese de proteínas sulfuradas.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{sintomas, deficiência, N, K, P, Ca, Mg, S, clorose, necrose, antocianina, diagnose}'),

-- ─── SINTOMAS POR ELEMENTO — MICRONUTRIENTES ─────────────────────────────────
('Taiz & Zeiger — Sintomas visuais de deficiência de micronutrientes',
 'artigo', 'all',
 'Deficiência de Fe: clorose internerval acentuada em folhas jovens (nervuras verdes nítidas, internervura amarelo-esverdeada a branca); comum em pH alto (> 6.5) e solos calcários; ferrugem foliar não deve ser confundida. Deficiência de Mn: clorose internerval em folhas jovens (similar a Fe mas menos intensa); manchas cinza-marrom em aveia (doença da mancha cinza); redução da fotólise da água no PSII em até 40%. Deficiência de Zn: folhas jovens pequenas e deformadas; entrenós encurtados (roseta em milho); internervura clorótica em milho; redução de síntese de triptofano (precursor de auxina) causa dominância apical reduzida. Deficiência de B: morte de meristemas apicais (falha no florescimento, aborto floral); folhas jovens espessas, quebradiças, distorcidas; vagens vazias em soja; B essencial para integridade de parede celular e transporte de sacarose. Deficiência de Cu: folhas jovens azul-esverdeadas, depois amarelas e murchas; necroses nas pontas; Cu é cofator de plastocianina (cadeia fotossintética) e de enzimas de lignificação. Deficiência de Mo: clorose internerval em folhas velhas em dicotiledôneas; malformação de bordas em couve-flor ("whiptail"); Mo é cofator da nitrogenase e nitrato redutase.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{micronutrientes, Fe, Mn, Zn, B, Cu, Mo, deficiência, clorose, meristema, PSII, diagnose}'),

-- ─── EFEITO DO pH NA DISPONIBILIDADE DE NUTRIENTES ────────────────────────────
('Taiz & Zeiger — pH do solo e disponibilidade de nutrientes minerais',
 'referencia', 'all',
 'A disponibilidade de nutrientes no solo é fortemente dependente do pH. Faixa ótima geral: pH 5,5–6,5 (solo mineral tropical). Abaixo de pH 5,5: Al³⁺ e Mn²⁺ tornam-se fitotóxicos; P precipita com Al e Fe (fosfato de alumínio insolúvel); Mo fica indisponível. Acima de pH 6,5: Fe, Mn, Zn e Cu precipitam como óxidos/hidróxidos (solubilidade cai 100x por unidade de pH para Fe e Mn); B lixivia em pH ácido mas precipita em pH muito alto. Calagem excessiva (pH > 6,8) é a principal causa de deficiência induzida de Mn e Zn em solos tropicais do Brasil. Mo aumenta disponibilidade com pH crescente (comportamento oposto aos demais micronutrientes). Fósforo tem disponibilidade máxima em pH 6,0–6,5. Em solos com alto P (> 60 mg/dm³ Mehlich-1), excesso de P precipita Zn (fosfato de zinco). Diagnose deve sempre correlacionar pH do solo com os sintomas observados.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5, Fig. 5.4.',
 '{pH, disponibilidade, calagem, Fe, Mn, Zn, Cu, B, Mo, P, Al, toxidez, solo tropical}'),

-- ─── ABSORÇÃO FOLIAR E APLICAÇÕES FOLIARES ────────────────────────────────────
('Taiz & Zeiger — Absorção foliar de nutrientes e eficiência de aplicações',
 'protocolo', 'all',
 'A folha absorve nutrientes principalmente via cutícula e estômatos. Fatores que aumentam absorção foliar: 1) Surfactantes não-iônicos reduzem ângulo de contato da gota (0,05% v/v recomendado); 2) Temperatura amena (15–25°C) e umidade alta (> 60% UR) mantêm cutícula mais permeável; 3) Pulverização nas horas frescas do dia (manhã ou fim de tarde); 4) Formulações com quelatos orgânicos (EDTA, EDDHMA) têm maior penetração que sulfatos. Fe, Mn e Cu são mais eficientemente corrigidos via foliar que via solo em pH alto, pois no solo precipitam antes de chegar à raiz. B é altamente eficiente via foliar (ácido bórico penetra lipídeos). Zn como sulfato de zinco (0,5–1%) ou quelato tem boa absorção foliar. Mistura B+Zn é sinérgica. Não misturar Cu+B (precipitação). Soja: janelas ótimas — V3-V5 para B, Zn, Cu; R1-R2 para K e B (florescimento); R3-R5 para Mn e Fe. Calda: 100–150 L/ha, pH 5,5–6,5.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{absorção foliar, surfactante, cutícula, quelato, Fe, Mn, Cu, B, Zn, pH calda, estádio}'),

-- ─── MICORRIZAS E ABSORÇÃO DE NUTRIENTES ─────────────────────────────────────
('Taiz & Zeiger — Associações micorrízicas e nutrição mineral',
 'artigo', 'all',
 'Micorrizas arbusculares (MA) formam associação com 83% das dicotiledôneas e praticamente todas as gramíneas cultivadas. O fungo coloniza raízes e estende hifas externas até 8 cm além da zona de depleção da raiz. Benefícios principais: 1) Absorção de P: hifas chegam a microregiões com P imóvel inacessível a raízes; plantas micorrizadas absorvem P 3–5× mais eficientemente; 2) Zn e Cu: também absorvidos mais eficientemente via hifas; 3) Tolerância ao estresse hídrico: hifas aumentam contato com solo úmido. Fatores que reduzem colonização micorrízica: alto P no solo (> 60 mg/dm³ suprime esporulação), fungicidas sistêmicos aplicados no sulco, uso intensivo de fosfato solúvel. Em lavouras com P alto e intenso uso de fungicidas, a nutrição de Zn e Cu fica comprometida mesmo com solo bem suprido porque a rede micorrízica está suprimida. Diagnose deve considerar histórico de fungicidas e nível de P do solo.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{micorriza, P, Zn, Cu, fungicida, absorção, hifa, estresse hídrico, colonização}'),

-- ─── RELAÇÕES HÍDRICAS — POTENCIAL HÍDRICO ───────────────────────────────────
('Taiz & Zeiger — Potencial hídrico e relações hídricas nas plantas',
 'artigo', 'all',
 'O potencial hídrico (Ψw) determina o fluxo de água entre células e entre planta e solo. Ψw = Ψs (osmótico) + Ψp (pressão de turgor). Água move sempre de Ψw alto (menos negativo) para Ψw baixo (mais negativo). Valores típicos: folha bem hidratada Ψw ≈ –0,2 a –0,8 MPa; folha em estresse hídrico Ψw ≈ –1,5 a –3,0 MPa; solo na capacidade de campo Ψw ≈ –0,01 a –0,03 MPa; ponto de murcha permanente Ψw ≈ –1,5 MPa. Ajuste osmótico: plantas em estresse acumulam solutos compatíveis (prolina, glicina-betaína, sacarose) reduzindo Ψs sem perder turgor — mecanismo de tolerância à seca. Turgor (Ψp > 0) é essencial para expansão celular, abertura estomática e manutenção da forma do tecido. Plantas com turgor perdido fecham estômatos, param crescimento e reduzem fotossíntese antes da murcha visível — sintomas de estresse subclínico.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Caps. 3-4.',
 '{potencial hídrico, turgor, osmótico, estresse hídrico, ajuste osmótico, prolina, murcha, expansão celular}'),

-- ─── FISIOLOGIA ESTOMÁTICA E ABA ─────────────────────────────────────────────
('Taiz & Zeiger — Abertura estomática, ABA e eficiência do uso da água',
 'artigo', 'all',
 'Estômatos regulam a troca de CO₂ (fotossíntese) e H₂O (transpiração). Abertura estomática é promovida por: luz azul (ativa H⁺-ATPase das células-guarda), CO₂ baixo, citocininas. Fechamento é promovido por: ABA (ácido abscísico), CO₂ alto, temperatura extrema, déficit hídrico. Mecanismo de fechamento por ABA: raízes sob estresse hídrico produzem ABA → ABA transportado via xilema até folhas → ativa canais de saída de K⁺ e anions das células-guarda → perda de turgor → fechamento estomático em minutos. Redução de Ψw de –0,5 para –1,0 MPa já dispara síntese de ABA. Fotossíntese reduz 60% com estômatos fechados. Eficiência do uso da água (WUE = CO₂ fixado / H₂O transpirada): culturas C4 (milho) têm WUE 2–3× maior que C3 (soja, feijão) por concentrar CO₂ nas células do mesofilo. Em situação de déficit hídrico subclínico (antes da murcha), o diagnóstico pode ser confirmado por: folhas enroladas ao meio-dia, cor verde mais intensa (ausência de expansão), temperatura foliar elevada (> 2°C acima do ar = estômatos fechados).',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Caps. 3-4.',
 '{estômato, ABA, transpiração, fotossíntese, WUE, estresse hídrico, C3, C4, milho, soja}'),

-- ─── TOXIDEZ POR ALUMÍNIO E MANGANÊS ─────────────────────────────────────────
('Taiz & Zeiger — Toxidez por alumínio e manganês em solos ácidos',
 'referencia', 'all',
 'Em pH < 5,5, Al³⁺ e Mn²⁺ atingem concentrações fitotóxicas. Toxidez por Al³⁺: afeta primariamente as radicelas (inibição da divisão celular na zona meristemática), causando raízes curtas, grossas e marrons; absorção de Ca, Mg e P é bloqueada mesmo com oferta adequada no solo; sintomas foliares são secundários (deficiências induzidas). Diagnose: raízes marrons e curtas em solo ácido = Al fitotóxico até prova em contrário. Toxidez por Mn²⁺: manchas necróticas marrom-escuras em folhas velhas (diferentes das manchas de K pela distribuição internervural difusa); afeta atividade de enzimas dependentes de Fe. Correção: calagem para pH 5,8–6,0 (solo mineral) resolve Al e Mn simultaneamente. Atenção: calagem excessiva para pH > 6,5 troca a toxidez por Al por deficiência de Mn, Zn e Fe — o ponto de equilíbrio é crítico.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{Al, alumínio, Mn, manganês, toxidez, solo ácido, pH, raiz, calagem, deficiência induzida}'),

-- ─── NITROGÊNIO — CICLO E EFICIÊNCIA ─────────────────────────────────────────
('Taiz & Zeiger — Metabolismo do nitrogênio: absorção, assimilação e eficiência',
 'artigo', 'all',
 'N é o nutriente mais demandado em quantidade pelas culturas. Formas absorvidas: NO₃⁻ (nitrato, predominante em solos bem aerados e com pH neutro) e NH₄⁺ (amônio, predominante em solos ácidos e alagados). NH₄⁺ em excesso é fitotóxico (inibe fosforilação oxidativa); solos bem manejados mantêm relação NO₃⁻:NH₄⁺ > 5:1. Assimilação: NO₃⁻ → NO₂⁻ (nitrato redutase, dependente de Mo) → NH₄⁺ → glutamina (GS/GOGAT, dependente de Fe e S). Relação N:S = 10:1 para síntese proteica eficiente; deficiência de S compromete assimilação de N. Fixação biológica de N₂ (FBN) em soja: rhizobia formam nódulos; nitrogenase (Mo-Fe) converte N₂ em NH₃. FBN supre 80–100% do N na soja bem nodulada. Nódulos devem ser cor rosa-vermelho internamente (leghemoglobina ativa); nódulos brancos ou verdes = fixação inativa. Estresse hídrico e Al inibem nodulação.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{N, nitrogênio, nitrato, amônio, fixação biológica, FBN, nódulo, rhizobium, Mo, S, assimilação}'),

-- ─── FÓSFORO — ABSORÇÃO E CICLAGEM ───────────────────────────────────────────
('Taiz & Zeiger — Fósforo: absorção, mobilidade e papel na energia celular',
 'artigo', 'all',
 'P é absorvido como H₂PO₄⁻ (pH ácido-neutro) e HPO₄²⁻ (pH alcalino). É o elemento de menor mobilidade no solo por difusão (coeficiente de difusão 10⁻¹² cm²/s vs. 10⁻⁵ para NO₃⁻). Esgotamento na rizosfera: raízes criam zona de depleção de P em 1–4 mm ao redor — daí a importância das micorrizas. Funções centrais: ATP (energia), fosfolipídeos (membranas), ácidos nucleicos (DNA/RNA), metabolismo do carbono (glicolise, ciclo de Calvin). Sintoma clássico de deficiência: acúmulo de antocianinas → coloração púrpura/avermelhada em folhas velhas e pecíolos; crescimento reduzido antes de qualquer sintoma visual (deficiência subclínica). Raízes se tornam mais longas e ramificadas como resposta adaptativa à deficiência de P (maior exploração do solo). Excesso de P no solo (> 60 mg/dm³) precipita Zn como fosfato de zinco insolúvel e suprime micorrizas — causa deficiência secundária de Zn.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{P, fósforo, antocianina, micorriza, ATP, deficiência, Zn, solo, difusão, rizosfera}'),

-- ─── POTÁSSIO — FUNÇÕES E ESTÔMATOS ─────────────────────────────────────────
('Taiz & Zeiger — Potássio: funções osmóticas, enzimáticas e estomáticas',
 'artigo', 'all',
 'K é o cátion mais abundante no citoplasma (100–200 mM) e o nutriente mais demandado depois de N. Funções: 1) Regulação osmótica e turgor celular (principal soluto inorgânico); 2) Abertura estomática (células-guarda acumulam K⁺ para abrir estômatos); 3) Ativação de > 60 enzimas (piruvato quinase, H⁺-ATPase); 4) Transporte de fotoassimilados no floema (carga e descarga de sacarose). Deficiência: bordas necróticas em folhas velhas ("queima de margens") — K é móvel, remobilizado de folhas velhas; plantas com menor resistência a doenças e ao acamamento; enchimento de grãos prejudicado. Em soja, K é crítico em R1-R5 para transporte de sacarose às vagens. Relação K:(Ca+Mg) deve ser < 0,5 no solo (equilíbrio catiônico); excesso de K suprime absorção de Ca e Mg (antagonismo). Milho exporta mais K nos grãos do que N.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{K, potássio, estômato, turgor, floema, fotoassimilado, soja, milho, deficiência, antagonismo, Ca, Mg}'),

-- ─── CÁLCIO E MAGNÉSIO — PAPÉIS ESTRUTURAIS ──────────────────────────────────
('Taiz & Zeiger — Cálcio e magnésio: funções estruturais e de sinalização',
 'artigo', 'all',
 'Cálcio (Ca): imóvel no floema — sintomas sempre em tecidos jovens e meristemas. Funções: 1) Parede celular pectínica (cimentação de lamela média); 2) Sinalização celular (Ca²⁺ como segundo mensageiro); 3) Integridade de membrana; 4) Inibição de Al³⁺ (Ca compete com Al em sítios de absorção). Deficiência: morte de gemas apicais, enrolamento de folhas jovens, podridão apical (tomate, pimentão), tip burn (alface). Ca é transportado exclusivamente pelo xilema — transpiração ativa o fluxo. Baixa transpiração (umidade alta, noturna) = menor Ca entregue às folhas jovens. Magnésio (Mg): o único nutriente mineral central da molécula de clorofila (íon Mg²⁺ no anel porfirínico). Funções: ativação de ATPases, rubisco, e enzimas da glicolise; forma do ribossomo. Deficiência: clorose internerval clássica em folhas velhas (Mg é móvel); comum em solos arenosos com alta lixiviação e em solos com alto K (antagonismo K-Mg). Relação Ca:Mg ideal = 3:1 a 5:1 no solo.',
 'Taiz, L.; Zeiger, E. (2013). Fisiologia Vegetal, 5ª ed. Artmed. Cap. 5.',
 '{Ca, cálcio, Mg, magnésio, clorofila, parede celular, sinalização, deficiência, K, antagonismo, xilema}');
