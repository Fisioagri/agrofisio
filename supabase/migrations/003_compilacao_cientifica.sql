-- ─── COMPILAÇÃO CIENTÍFICA AGROFÍSIO 2022–2026 ───────────────────────────────
-- Fonte: agrofisio_compilacao_cientifica.md
-- 19 artigos em 5 categorias: Nutrição Mineral, Bioestimulantes, Fitohormônios,
-- Resistência a Doenças e Dados de Campo Brasil
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.conhecimento (titulo, tipo, cultura, conteudo, fonte, tags) values

-- ─── CATEGORIA 1 — NUTRIÇÃO MINERAL E PRODUTIVIDADE ─────────────────────────

('Avanços em Nutrição de Plantas 2025 — Kajrolkar',
'artigo', 'all',
'Revisão abrangente sobre avanços em nutrição mineral, agricultura de precisão e biofortificação. Fe, Zn, Mn, Cu, B e Mo desempenham papéis essenciais em múltiplos processos fisiológicos. Deficiências de micronutrientes têm efeito dramático sobre rendimento e qualidade. As três frentes mais promissoras: agricultura de precisão, biofortificação e manejo sustentável de nutrientes.',
'Kajrolkar, A. (2025). Advancements in Plant Nutrition: Enhancing Crop Yield and Quality. Premier Journal of Plant Biology, 3, 100013.',
'{micronutrientes, precisão, Fe, Zn, Mn, Cu, B, Mo, produtividade}'),

('Nutrição Mineral e Tolerância ao Estresse — Hossain et al. 2024',
'artigo', 'all',
'Manejo nutricional adequado é uma das formas mais eficazes de reduzir estresses bióticos e abióticos em culturas. Nanopartículas de Zn e Si demonstraram melhora no perfil iônico e metabólico do milho sob estresse salino. Nanopartículas de Cu aumentaram crescimento e produtividade do milho em condições de seca. O entendimento de interações entre nutrientes pode maximizar a produtividade. Zn e Si foliar são ferramentas de pré-estresse comprovadas.',
'Hossain, M.S.; Garcia Caparros, P.; Mühling, K.H. (2024). Mineral nutrition and plant stress tolerance. Frontiers in Plant Science, 15. DOI: 10.3389/fpls.2024.1461651.',
'{estresse, Zn, Si, Cu, nanopartículas, tolerância, pré-estresse}'),

('Nutrição Vegetal e Agricultura Sustentável — Physiologia Plantarum 2024',
'artigo', 'all',
'Micronutrientes devem ser mantidos em faixa estreita de concentração — tanto deficiência quanto excesso são danosos. PGPR (bactérias promotoras de crescimento) aumentam nutrição mineral, resistência a estresse e produtividade. Rhizobactérias ativam sistemas de transporte iônico nas raízes e melhoram disponibilidade de nutrientes na rizosfera. Nanofertilizantes emergem como ferramenta de alta eficiência. Biofertilizantes e microrganismos são pilares da nutrição de precisão sustentável.',
'Plant nutrition challenges for a sustainable agriculture of the future. Physiologia Plantarum, Wiley (2024). PMC11653101.',
'{PGPR, biofertilizantes, micronutrientes, rizosfera, nanofertilizantes, sustentabilidade}'),

('Micronutrientes no Tratamento de Sementes de Soja 2025',
'artigo', 'soja',
'Tratamento de sementes com micronutrientes melhora germinação, crescimento radicular e eficiência simbiótica com Bradyrhizobium. Mo é cofator da nitrogenase — essencial para FBN (fixação biológica de N) eficiente. Co é essencial para o Bradyrhizobium (vitamina B12 bacteriana). Zn é fundamental para síntese de triptofano, precursor do AIA (auxina endógena). Deficiência de Zn afeta estrutura de membranas celulares e reduz produtividade. Micronutrientes prioritários no TS: Mo, Co, Zn, B, Mn.',
'Revisão sistemática (2010–2025). Relevância do uso de micronutrientes no tratamento de sementes da soja. Revista FT, ISSN 1678-0817 (nov/2025).',
'{tratamento sementes, Mo, Co, Zn, B, Mn, FBN, Bradyrhizobium, auxina}'),

('Micronutrientes Zn, B, Mn, Cu em Soja e Milho — FAPA Sul do Brasil',
'referencia', 'all',
'Dados experimentais de campo do Sul do Brasil (FAPA/PR) com aplicação de boro, manganês, cobre e zinco em soja, milho, cevada e trigo. Produtividade média obtida: soja 2,89 ± 0,53 t/ha; milho 9,13 ± 0,91 t/ha. Resposta positiva documentada em campo brasileiro à suplementação de B, Zn, Mn e Cu. Dados reais confirmam que micronutrientes são limitantes mesmo em solos bem manejados do Sul.',
'Fundação Agrária de Pesquisa Agropecuária – FAPA. Latin American Data in Science. https://datainscience.com.br/lads/article/view/78.',
'{campo, B, Zn, Mn, Cu, soja, milho, Sul do Brasil, FAPA}'),

('Nutrição Mineral e Florescimento — Mecanismo Molecular 2025',
'artigo', 'all',
'N, P, K, S, Fe, Zn e Cu influenciam o tempo de florescimento via mecanismos moleculares específicos (transcrição, pós-transcrição e fosforilação de proteínas). Tanto baixo quanto alto suprimento de N atrasam o florescimento. Fe, Zn e Cu regulam vias de sinalização floral. Identificar genes-chave pode melhorar eficiência no uso de nutrientes e aumentar rendimento. Nutrição desequilibrada impacta diretamente a janela de R1 e pegamento de flores.',
'Chao, K. et al. (2025). Research advances in molecular mechanism of mineral nutrition-mediated regulation of plant flowering time. Journal of Plant Nutrition and Fertilizers, 31(5): 1006–1016. DOI: 10.11674/zwyf.2024401.',
'{florescimento, N, P, K, S, Fe, Zn, Cu, R1, molecular}'),

-- ─── CATEGORIA 2 — BIOESTIMULANTES E FISIOLOGIA APLICADA ─────────────────────

('Bioestimulantes em Soja: Revisão PRISMA 500+ publicações 2026',
'artigo', 'soja',
'Revisão sistemática PRISMA de 500+ publicações (2014–2025). Bioestimulantes (extrato de algas, ácidos húmicos, aminoácidos, Bradyrhizobium, PGPR, AMF) aumentaram produtividade da soja em 4% a 65%. A combinação de bioestimulantes com insumos convencionais amplifica os ganhos. Extrato de algas, aminoácidos e microrganismos foram os mais eficazes individualmente. Dados quantitativos comprovam validade científica dos bioestimulantes para soja.',
'Revisão sistemática PRISMA (2014–2025). Role of Biostimulants in Sustainable Soybean Production. MDPI Sustainability, 18(2), 636 (jan/2026). https://www.mdpi.com/2071-1050/18/2/636.',
'{bioestimulantes, soja, extrato algas, aminoácidos, PGPR, AMF, produtividade, +65%}'),

('Extrato de Algas como Bioestimulante Sustentável 2025',
'artigo', 'all',
'Extratos de Ascophyllum nodosum estimulam crescimento via fitohormônios endógenos. Milho tratado mostrou raízes significativamente mais longas (efeito comparável à aplicação exógena de AIA). Em soja, produtos ricos em zeatina (Z) e iP (citocininas naturais) aumentaram biomassa e atrasaram senescência foliar. Betaínas do extrato atuam como osmoprotetores em estresse hídrico. Algas representam 33% do mercado global de bioestimulantes. Mecanismo: citocininas naturais + betaínas + efeito auxínico.',
'Hariharan, G. et al. (2025). Seaweed-derived biostimulants for sustainable crop production: A review. ScienceDirect. https://www.sciencedirect.com/science/article/pii/S016816562500241X.',
'{extrato algas, Ascophyllum nodosum, citocinina, zeatina, betaína, auxina, osmoprotetor, senescência}'),

('Aminoácidos como Bioestimulantes — CABI 2026',
'artigo', 'all',
'Aminoácidos livres melhoram eficiência do uso de nitrogênio (NUE). Prolina: osmoprotetor natural, acumula em estresse hídrico, protege membranas e enzimas. Glicina betaína: proteção de enzimas e membranas em estresse térmico. Quelatos de Fe-aminoácido são fonte altamente eficiente de Fe para culturas. Microbial biostimulants (tratamento de sementes) reprogramam o microbioma da rizosfera para maior eficiência nutricional. Aminoácidos são base do protocolo de pré-estresse.',
'Amino acids as biostimulants: Roles in plant growth, nutrition, and stress tolerance. CABI Reviews (fev/2026). DOI: 10.1079/cabireviews.2026.0003.',
'{aminoácidos, prolina, betaína, NUE, Fe-quelato, pré-estresse, rizosfera, osmoprotetor}'),

('Bioestimulantes em Feijão: Extrato de Algas + Aminoácidos — Scientific Reports 2020',
'artigo', 'feijao',
'Bioestimulantes com extrato de algas e aminoácidos aumentaram rentabilidade e margem do cultivo do feijão. Bons efeitos fisiológicos podem ser obtidos com doses pequenas de bioestimulantes. Efeitos dependem da composição e doses dos produtos. Combinação extrato de algas + aminoácidos demonstrou sinergismo bioquímico no feijão.',
'Biochemical and economical effect of biostimulants containing seaweed extracts and amino acids as element of agroecological management of bean cultivation. Scientific Reports / Nature (out/2020). https://www.nature.com/articles/s41598-020-74959-0.',
'{feijão, bioestimulante, extrato algas, aminoácidos, rentabilidade, sinergismo}'),

('Extrato de Algas em Milho sob Seca — Metabolômica PMC 2022',
'artigo', 'milho',
'Extrato de Kappaphycus alvarezii upregulou genes de crescimento radicular, sinalização de auxina e metabolismo de N no milho. Melhorou crescimento radicular, produtividade e conteúdo de nutrientes sob déficit hídrico. Reprogramação metabólica comprovada por ferramentas de metabolômica computacional. Extrato de algas age molecularmente ativando rotas de eficiência nutricional e tolerância à seca.',
'Computational Metabolomics Tools Reveal Metabolic Reconfigurations Underlying the Effects of Biostimulant Seaweed Extracts on Maize Plants under Drought Stress. PMC (2022). https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9231236/.',
'{milho, extrato algas, Kappaphycus, seca, auxina, metabolômica, raiz, N}'),

-- ─── CATEGORIA 3 — FITOHORMÔNIOS E REGULAÇÃO DO CRESCIMENTO ─────────────────

('Auxina e Citocinina em Culturas — Vasileva 2023',
'artigo', 'all',
'Reguladores de crescimento podem aumentar rendimento de culturas em 29–34% em condições adversas. Auxinas sintéticas (IBA, NAA) superam as naturais na estimulação de raízes e rendimento. Citocininas afetam divisão celular, estrutura foliar e função de cloroplastos. O equilíbrio hormonal é determinante: desequilíbrio em um hormônio ativa/desativa outros em cascata. Manejo hormonal é ferramenta de alta eficiência para condições de estresse.',
'Vasileva, V. (2023). The Impact of Auxin and Cytokinin on the Growth and Development of Selected Crops. Agriculture, MDPI, 13, 724. https://www.mdpi.com/2077-0472/13/3/724.',
'{auxina, citocinina, reguladores crescimento, raiz, cloroplasto, +34%, estresse}'),

('9 Classes de Fitohormônios e Estresse por Seca — PMC 2025',
'artigo', 'all',
'9 classes de fitohormônios interagem com metabolismo redox durante seca: (1) Auxinas, (2) Brassinoesteróides, (3) Citocininas, (4) Giberelinas — promovem crescimento; (5) ABA — fecha estômatos, reduz transpiração; (6) Etileno — acelera senescência em excesso; (7) Ácido Jasmônico — defesa contra patógenos; (8) Ácido Salicílico — resistência sistêmica; (9) Estrigolactonas — sinalização de estresse. ABA aumenta em déficit hídrico e pode reduzir fotossíntese em até 60%. Equilíbrio entre hormônios de crescimento e resposta é a chave para resiliência.',
'Dressed Up to the Nines: The Interplay of Phytohormones Signaling and Redox Metabolism During Plant Response to Drought. PMC (jan/2025). PMC11768152.',
'{fitohormônios, ABA, etileno, jasmônico, salicílico, estrigolactona, seca, redox, 9 classes}'),

('Citocininas e Desenvolvimento de Sementes — Frontiers in Genetics 2022',
'artigo', 'soja',
'Citocininas têm forte influência sobre rendimento de grãos de leguminosas e oleaginosas. Regulam divisão celular, tamanho e número de sementes (pods). Genes CKX (citoquinina oxidase) são alvos para melhoramento genético de produtividade. A expressão espacial de genes de citocinina em soja é mapeada ao longo do desenvolvimento da semente. Citocininas externas (via extrato de algas) podem modular enchimento de grãos em R3–R5.',
'Sharma, S.; Kaur, P.; Gaikwad, K. (2022). Role of cytokinins in seed development in pulses and oilseed crops. Frontiers in Genetics, 13. DOI: 10.3389/fgene.2022.940660.',
'{citocinina, soja, enchimento, grão, semente, CKX, R3, R5, leguminosas}'),

('Auxina Regula Source-Sink em Arroz — PNAS 2022',
'artigo', 'all',
'Cascata OsARF18-OsARF2-OsSUT1 mediada por auxina regula transporte de sacarose entre source (folhas) e sink (grãos). Essencial para desenvolvimento correto dos órgãos reprodutivos. A coordenação source-sink mediada por auxina é mecanismo conservado entre gramíneas (arroz, milho) e dicotiledôneas (soja, feijão). Manejo que favorece síntese de auxina (Zn adequado, aplicação foliar de fitoreguladores) melhora partição de fotoassimilados para grãos.',
'Zhao, Z. et al. (2022). Auxin regulates source-sink carbohydrate partitioning and reproductive organ development in rice. PNAS, 119(36). DOI: 10.1073/pnas.2121671119.',
'{auxina, source-sink, sacarose, grão, partição fotoassimilados, enchimento, Zn}'),

('Citocininas e Relações Source-Sink — Frontiers in Plant Science 2021',
'artigo', 'all',
'Citocininas regulam alocação de carboidratos E aminoácidos entre source e sink. Papel importante nas interações planta-patógeno e microrganismos benéficos. Regulação source-sink é processo essencial para crescimento e desenvolvimento de grãos. Citocininas promovidas por extrato de algas (zeatina, iP) aumentam capacidade sink e reduzem senescência foliar precoce, mantendo fotossíntese ativa mais tempo.',
'McIntyre, K.E.; Bush, D.R.; Argueso, C.T. (2021). Cytokinin Regulation of Source-Sink Relationships in Plant-Pathogen Interactions. Frontiers in Plant Science, 12. DOI: 10.3389/fpls.2021.677585.',
'{citocinina, source-sink, carboidratos, aminoácidos, senescência, extrato algas}'),

-- ─── CATEGORIA 4 — NUTRIÇÃO MINERAL E RESISTÊNCIA A DOENÇAS ─────────────────

('Nutrição Mineral e Resistência a Doenças — Frontiers 2022',
'artigo', 'all',
'Balanço nutricional adequado é componente essencial da resistência a doenças. Deficiências nutricionais enfraquecem barreiras físicas (espessura da parede celular, lignificação) e bioquímicas (enzimas antioxidantes SOD, CAT, POD). Si aumenta espessura da epiderme e dificulta penetração de fungos. B é essencial para integridade de parede celular. Mn e Cu são cofatores de enzimas antioxidantes. Nutrição equilibrada reduz necessidade de fungicidas e é a primeira linha de defesa.',
'Tripathi, R. et al. (2022). Plant mineral nutrition and disease resistance: A significant linkage for sustainable crop protection. Frontiers in Plant Science. DOI: 10.3389/fpls.2022.883970.',
'{resistência, doença, parede celular, Si, B, Mn, Cu, antioxidante, ferrugem, fungicida}'),

-- ─── CATEGORIA 5 — DADOS DE CAMPO BRASIL ─────────────────────────────────────

('Extração de Micronutrientes pelo Milho em Alta Produtividade — Coelho 2006',
'referencia', 'milho',
'Para 9 t/ha de milho (alta produtividade), a extração de micronutrientes é: Fe=2.100 g/ha, Zn=400 g/ha, Mn=340 g/ha, B=170 g/ha, Cu=110 g/ha, Mo=9 g/ha. Esses valores indicam a demanda mínima que deve ser reposta pelo solo ou via foliar para manter produtividade. Em sequências de alta produção, a reposição de Zn, Mn e B via foliar é frequentemente necessária.',
'Coelho, A.M. (2006). Nutrição e adubação do milho. Embrapa Milho e Sorgo. Citado em Stoller.com.br (2025).',
'{milho, extração, micronutrientes, Fe, Zn, Mn, B, Cu, Mo, alta produtividade, reposição}'),

('Micronutrientes Mais Deficientes na Soja Brasileira 2025',
'referencia', 'soja',
'Micronutrientes com maior frequência de deficiência na soja brasileira: 1º Boro (B) — essencial para florescimento e integridade de parede; 2º Zinco (Zn) — auxina e membrana celular; 3º Molibdênio (Mo) — cofator da nitrogenase na FBN; 4º Cobre e Manganês (principalmente em Cerrado e solos arenosos). Fator agravante: pH elevado (>6.2) reduz disponibilidade de Cu, Fe, Mn, Ni e Zn (micronutrientes catiônicos). Calagem excessiva é principal causa de deficiência de Mn no Brasil. Monitoramento foliar é essencial.',
'Especialistas citados em Portal do Agronegócio (jun/2025). Dados CONAB: safra soja 2024/2025 = 168,3 mi t (+14%).',
'{soja, B, Zn, Mo, Cu, Mn, Brasil, deficiência, pH, calagem, Cerrado, FBN}');
