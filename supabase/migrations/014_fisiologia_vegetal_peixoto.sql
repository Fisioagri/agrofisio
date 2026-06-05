-- ─── PEIXOTO — PRINCÍPIOS DE FISIOLOGIA VEGETAL (POD EDITORA, 2020) ──────────
-- Déficit hídrico, transpiração, estômatos, fotossíntese C3/C4
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

('Peixoto — Déficit hídrico e sensibilidade dos processos fisiológicos',
 'artigo', 'all',
 'O estresse hídrico afeta os processos fisiológicos em ordem crescente de tolerância (Hsiao, 1973): MAIS SENSÍVEIS (primeiros a serem afetados, déficit leve -0,1 MPa): crescimento celular (raiz e parte aérea); síntese proteica. MODERADAMENTE SENSÍVEIS: abertura estomática; acúmulo de ABA. MENOS SENSÍVEIS (afetados por déficit mais severo): fotossíntese, respiração, translocação de solutos; acúmulo de prolina e açúcares (ajuste osmótico). Implicação prática: PLANTAS PARAM DE CRESCER ANTES DE MURCHAREM — o crescimento cessa com diminuição de -0,1 MPa no potencial hídrico externo, muito antes de qualquer sintoma visual de murcha. Lavouras em estresse hídrico subclínico têm produção comprometida sem sintomas visíveis. Indicadores de campo de estresse subclínico: folhas enroladas ao meio-dia, temperatura foliar > 2°C acima do ar (estômatos fechados), menor taxa de expansão foliar.',
 'Peixoto, C.P. (org.) (2020). Princípios de Fisiologia Vegetal: Teoria e Prática. Pod Editora, Rio de Janeiro.',
 '{déficit hídrico, estresse, crescimento celular, ABA, fotossíntese, prolina, ajuste osmótico, subclínico, temperatura foliar}'),

('Peixoto — Mecanismo estomático: abertura por K⁺ e fechamento por ABA',
 'artigo', 'all',
 'Mecanismo de abertura estomática: 1) Luz estimula fotossíntese nas células-guarda → consumo de CO₂ → aumento do pH intracelular; 2) Enzima fosforilase converte amido + Pi → glicose-6-P → síntese de ácido málico → dissociação em H⁺ + malato⁻; 3) H⁺ é exportado para células adjacentes e K⁺ entra nas células-guarda ("bomba de potássio"); 4) Acúmulo de K⁺ (pode atingir 0,5M = redução osmótica de 2,0 MPa) → entrada de água → turgor → abertura. Mecanismo de fechamento por ABA: déficit hídrico → síntese de ABA nas raízes → transporte via xilema até folhas → ABA bloqueia a troca iônica H⁺/K⁺ (inibe H⁺-ATPase) → K⁺ sai das células-guarda → perda de turgor → fechamento. Efeito: estômatos fechados = CO₂ não entra = fotossíntese cai até 60%. Citocininas promovem abertura; redução de citocinina em estresse hídrico contribui para o fechamento.',
 'Peixoto, C.P. (org.) (2020). Princípios de Fisiologia Vegetal: Teoria e Prática. Pod Editora, Rio de Janeiro.',
 '{estômato, K, potássio, ABA, abertura, fechamento, bomba de potássio, fotossíntese, déficit hídrico, citocinina}'),

('Peixoto — Transpiração: funções e relação com estresse hídrico',
 'artigo', 'all',
 'Transpiração via estômatos (85-90% do total) é inevitável durante a fotossíntese: para captar CO₂, a folha expõe superfície que perde água. Pico de perda hídrica: 11-14h (máxima demanda evaporativa). Potencial hídrico foliar é mínimo no período de maior calor e se restabelece ao entardecer quando a transpiração diminui. Nível interno de água flutua entre máximo (ao amanhecer) e mínimo (ao meio-dia). Efeitos refrigerantes da transpiração: reduz temperatura foliar — sem transpiração, folha pode aquecer 10-15°C acima do ar. Ciclos fotossintéticos comparados: C3 (soja, feijão, trigo): abertura estomática diurna; alta transpiração; WUE menor. C4 (milho, sorgo, cana): concentram CO₂ nas células do mesofilo via C4 (ácido oxaloacético → malato), reduzindo abertura estomática necessária; WUE 2-3× maior que C3. CAM (suculentas): abrem estômatos à noite; WUE muito alta. Diagnose de estresse: temperatura foliar > 2°C acima do ar indica estômatos fechados.',
 'Peixoto, C.P. (org.) (2020). Princípios de Fisiologia Vegetal: Teoria e Prática. Pod Editora, Rio de Janeiro.',
 '{transpiração, estômato, C3, C4, WUE, milho, soja, temperatura foliar, déficit hídrico, fotossíntese}');
