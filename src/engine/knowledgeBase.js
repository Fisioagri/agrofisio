/**
 * AgroFísio Knowledge Base — Motor de Conhecimento Agronômico Offline
 *
 * Fontes primárias codificadas:
 *  - Marschner, H. (2012) Mineral Nutrition of Higher Plants, 3rd ed. Academic Press.
 *  - Taiz, L. & Zeiger, E. (2013) Plant Physiology, 5th ed. Sinauer.
 *  - Malavolta, E. et al. (1997) Avaliação do Estado Nutricional das Plantas. Potafos.
 *  - Embrapa Soja (2013) Tecnologias de Produção de Soja. Embrapa.
 *  - CQFS RS/SC (2016) Manual de Calagem e Adubação. SBCS/NEPAR.
 *  - Sfredo, G.J. (2008) Soja no Brasil: Calagem e Adubação. Embrapa Soja.
 *  - Epstein, E. & Bloom, A.J. (2005) Mineral Nutrition of Plants. Sinauer.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. PERFIS NUTRICIONAIS COMPLETOS
// ─────────────────────────────────────────────────────────────────────────────

export const NUTRIENT_PROFILES = {
  N: {
    nome: 'Nitrogênio', simbolo: 'N', classe: 'macronutriente', mobilidade: 'móvel',
    funcoes: [
      'Componente de proteínas, clorofila, ácidos nucleicos e enzimas',
      'Essencial para fotossíntese (proteína do complexo Rubisco)',
      'Forma parte da clorofila (N representa 6.25% da estrutura)',
      'Regula balanço vegetativo/reprodutivo via citocininas e auxinas',
      'Ativador da divisão celular e elongação de células meristemáticas',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Clorose generalizada das folhas mais velhas (mobilidade alta)',
        'Amarelecimento uniforme que avança para ápice da planta',
        'Redução do crescimento vegetativo e área foliar',
        'Hastes finas e entrenós curtos',
        'Folhas pequenas de coloração verde-pálido a amarelada',
      ],
      folhas_afetadas: 'velhas (móvel)',
      padrao: 'uniforme, de baixo para cima',
      gravidade_fisiologica: 'crítico — reduz fotossíntese e fixação de N2',
      impacto_produtivo: 'redução de 10–35% no rendimento por limitação fotossintética e proteica',
    },
    toxicidade: {
      sintomas_visuais: [
        'Crescimento vegetativo excessivo (luxúria)',
        'Folhas verde-escuro intenso',
        'Atraso no florescimento (dominância vegetativa)',
        'Maior susceptibilidade a doenças fúngicas',
        'Acamamento em cereais',
      ],
      mecanismo: 'Excesso de NH4+ causa acidificação rizosférica e inibe absorção de Ca, Mg, K',
    },
    estagios_criticos: ['V3', 'V4', 'V5', 'R1', 'R2', 'R3', 'R4', 'R5'],
    hormonios_relacionados: ['citocinina', 'auxina', 'giberelina'],
    fonte_ref: 'Marschner (2012) Cap. 8; Embrapa Soja (2013)',
  },

  P: {
    nome: 'Fósforo', simbolo: 'P', classe: 'macronutriente', mobilidade: 'móvel',
    funcoes: [
      'Componente de ATP — moeda energética da célula',
      'Integra fosfolipídios das membranas celulares',
      'Parte do DNA e RNA (esqueleto fosfodiéster)',
      'Ativador de mais de 60 enzimas (quinases, ATPases)',
      'Essencial para desenvolvimento radicular inicial',
      'Favorece fixação biológica de N2 (FBN) em leguminosas',
      'Envolvido no carregamento de fotoassimilados no floema',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Coloração verde-escura ou púrpura/avermelhada (acúmulo de antocianinas)',
        'Folhas velhas com bordas avermelhadas em soja e milho',
        'Sistema radicular pouco desenvolvido, raízes curtas',
        'Crescimento retardado, plantas atrofiadas',
        'Atraso no florescimento e maturação',
        'Folhas pequenas e hastes finas',
      ],
      folhas_afetadas: 'velhas (móvel)',
      padrao: 'difuso, tendência a avermelhamento',
      gravidade_fisiologica: 'crítico em emergência e estabelecimento',
      impacto_produtivo: 'redução de 5–25% por limitação energética e radicular',
    },
    toxicidade: {
      sintomas_visuais: [
        'Clorose internerval similar à deficiência de Fe, Zn, Mn (antagonismos)',
        'Necroses em bordas foliares (raramente observado diretamente)',
      ],
      mecanismo: 'Excesso de P precipita Zn, Fe, Cu e Mn — causa deficiências secundárias',
    },
    estagios_criticos: ['VE', 'VC', 'V1', 'V2', 'V3', 'R3', 'R4'],
    hormonios_relacionados: ['auxina', 'citocinina'],
    fonte_ref: 'Marschner (2012) Cap. 9; CQFS RS/SC (2016)',
  },

  K: {
    nome: 'Potássio', simbolo: 'K', classe: 'macronutriente', mobilidade: 'muito móvel',
    funcoes: [
      'Principal cátion intracelular — regula potencial osmótico',
      'Ativa mais de 60 enzimas (piruvato quinase, starch synthase)',
      'Regula abertura/fechamento de estômatos (via bomba K+ nas células guarda)',
      'Essencial para transporte de assimilados no floema (acompanha sacarose)',
      'Atua no carregamento de amido nos grãos (fase enchimento)',
      'Aumenta resistência a doenças e estresses abióticos',
      'Regula turgescência celular e elongação de células',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Necrose marginal nas folhas velhas (bordas queimadas)',
        'Clorose começando nas bordas das folhas mais velhas',
        'Plantas murchas mesmo com umidade adequada (perda de turgescência)',
        'Grãos mal formados, chochos',
        'Hastes fracas, maior acamamento',
        'Manchas cloróticas irregulares progredindo para necrose',
      ],
      folhas_afetadas: 'velhas (muito móvel)',
      padrao: 'marginal, de bordas para dentro',
      gravidade_fisiologica: 'crítico no enchimento de grãos',
      impacto_produtivo: 'redução de 8–30% por limitação no enchimento e sanidade',
    },
    toxicidade: {
      sintomas_visuais: ['Inibição de Mg e Ca (antagonismo catiônico)', 'Sintomas de deficiência de Mg'],
      mecanismo: 'Competição direta com Mg e Ca nos transportadores de membrana (NSCC, HKT)',
    },
    estagios_criticos: ['R3', 'R4', 'R5', 'R5.5'],
    hormonios_relacionados: ['aba', 'brassinosteroide'],
    fonte_ref: 'Marschner (2012) Cap. 8; Taiz & Zeiger (2013) Cap. 6',
  },

  Ca: {
    nome: 'Cálcio', simbolo: 'Ca', classe: 'macronutriente', mobilidade: 'imóvel',
    funcoes: [
      'Componente estrutural da parede celular (pectato de cálcio)',
      'Segundo mensageiro intracelular — ativa proteínas quinases',
      'Essencial para divisão celular (placa celular na citocinese)',
      'Manutenção da integridade de membranas celulares',
      'Regula sinal de ABA via calmodulina',
      'Retenção de flores e vagens (BER — podridão apical)',
      'Neutraliza ácidos orgânicos nos vacúolos',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Necrose de tecidos jovens (ponteiros, meristemas, folhas novas)',
        'Morte do ápice radicular e radicular lateral',
        'Retenção deficiente de flores e vagens (aborto)',
        'Folhas novas deformadas, enroladas',
        'Pontas e bordas de folhas jovens necrosadas',
        'Bordas de folhas em "gancho" nas gramíneas',
      ],
      folhas_afetadas: 'jovens (imóvel — não remobiliza)',
      padrao: 'meristemas e órgãos jovens',
      gravidade_fisiologica: 'crítico para formação e retenção de vagens/grãos',
      impacto_produtivo: 'redução de 5–20% por aborto de flores e vagens',
    },
    toxicidade: {
      sintomas_visuais: ['Induz deficiência de Mg, K, Mn, Fe', 'pH alto associado reduz P, micronutrientes'],
      mecanismo: 'Excesso compete com Mg, K; solos calcários elevam pH comprometendo micronutrientes',
    },
    estagios_criticos: ['R1', 'R2', 'R3', 'R4'],
    hormonios_relacionados: ['aba', 'etileno', 'jasmonate'],
    fonte_ref: 'Marschner (2012) Cap. 9; Taiz & Zeiger (2013) Cap. 14',
  },

  Mg: {
    nome: 'Magnésio', simbolo: 'Mg', classe: 'macronutriente', mobilidade: 'moderadamente móvel',
    funcoes: [
      'Átomo central da clorofila — indispensável para fotossíntese',
      'Ativador de mais de 300 enzimas (ATPases, Rubisco, sintetases)',
      'Carreador de P no floema (Mg-P complexo no transporte)',
      'Regula síntese de proteínas (ligação ribossomo-mRNA)',
      'Importante no metabolismo de carboidratos e exportação de assimilados',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Clorose internerval nas folhas velhas (nervuras verdes, tecido internerval amarelo)',
        'Folhas velhas com aspecto "espinha de peixe" (nervuras verdes)',
        'Manchas avermelhadas na clorose avançada (acúmulo de antocianinas)',
        'Queda prematura de folhas velhas em casos severos',
        'Plantas com aparência "cansada" em solos arenosos',
      ],
      folhas_afetadas: 'velhas (moderadamente móvel)',
      padrao: 'internerval, início nas velhas',
      gravidade_fisiologica: 'crítico — toda a fotossíntese depende do Mg na clorofila',
      impacto_produtivo: 'redução de 5–20% pela limitação fotossintética',
    },
    toxicidade: {
      sintomas_visuais: ['Induz deficiência de Ca e K por competição', 'Raro em condições normais de campo'],
      mecanismo: 'Solos com alto Mg:Ca diminuem absorção de Ca',
    },
    estagios_criticos: ['V3', 'V4', 'R1', 'R2', 'R3', 'R5'],
    hormonios_relacionados: ['citocinina'],
    fonte_ref: 'Marschner (2012) Cap. 8; Malavolta et al. (1997)',
  },

  S: {
    nome: 'Enxofre', simbolo: 'S', classe: 'macronutriente', mobilidade: 'moderado',
    funcoes: [
      'Componente de aminoácidos sulfurados (cisteína, metionina)',
      'Essencial para síntese de proteínas e enzimas',
      'Componente de coenzima A, tiamina, biotina, ferredoxina',
      'Necessário para síntese de glucosinolatos e defesa',
      'Essencial para nitrogenase na FBN (S faz parte do cofator Fe-Mo)',
      'Papel na formação de pontes dissulfeto (estrutura proteica)',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Clorose generalizada das folhas jovens (imóvel em condições de deficiência)',
        'Amarelecimento uniforme começando pelas folhas novas',
        'Plantas com crescimento reduzido e coloração verde-pálida',
        'Em soja: folhas jovens uniformemente amarelas, similar a N mas nas novas',
        'Atraso na nodulação e fixação de N2',
      ],
      folhas_afetadas: 'jovens (relativa imobilidade do sulfato)',
      padrao: 'uniforme nas novas',
      gravidade_fisiologica: 'importante — compromete proteínas e FBN',
      impacto_produtivo: 'redução de 5–18% por limitação proteica e FBN',
    },
    toxicidade: {
      sintomas_visuais: ['Incomum; excesso de SO4 compete com Mo', 'Folhas com bordas avermelhadas'],
      mecanismo: 'Altas doses de sulfato inibem absorção de Mo',
    },
    estagios_criticos: ['V2', 'V3', 'R1', 'R3'],
    hormonios_relacionados: ['aba', 'etileno'],
    fonte_ref: 'Marschner (2012) Cap. 8; Embrapa Soja (2013)',
  },

  B: {
    nome: 'Boro', simbolo: 'B', classe: 'micronutriente', mobilidade: 'imóvel',
    funcoes: [
      'Essencial para síntese de parede celular (complexo borato-RG-II)',
      'Necessário para elongação do tubo polínico e fertilização',
      'Regula transporte polar de auxina (via PIN proteins)',
      'Manutenção da integridade de membranas celulares',
      'Requerido para divisão celular em meristemas',
      'Importante para metabolismo de açúcares e transporte no floema (B-sorbitol)',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Morte de ponteiros e meristemas apicais',
        'Folhas jovens deformadas, enrugadas e espessas',
        'Hastes ocas, internódios curtos',
        'Aborto de flores — queda de botões florais',
        'Retenção deficiente de vagens (soja: baixo número de vagens)',
        'Raízes engrossadas e escuras na ponta',
        '"Couve-rábano" em couve-flor; "coração negro" em beterraba',
      ],
      folhas_afetadas: 'jovens (imóvel)',
      padrao: 'meristemas, ponteiros, flores',
      gravidade_fisiologica: 'crítico no florescimento e pegamento',
      impacto_produtivo: 'redução de 5–25% por aborto floral e queda de vagens',
    },
    toxicidade: {
      sintomas_visuais: ['Necrose marginal das folhas velhas', 'Manchas marrons nas bordas', 'Clorose das pontas'],
      mecanismo: 'Acúmulo de B nas bordas foliares (transpiração); tóxico acima de 5 mg/L foliar',
    },
    estagios_criticos: ['R1', 'R2', 'R3'],
    hormonios_relacionados: ['auxina', 'brassinosteroide'],
    fonte_ref: 'Marschner (2012) Cap. 9; Taiz & Zeiger (2013) Cap. 5',
  },

  Zn: {
    nome: 'Zinco', simbolo: 'Zn', classe: 'micronutriente', mobilidade: 'parcialmente móvel',
    funcoes: [
      'Cofator de mais de 300 enzimas (RNA polimerase, anidrase carbônica, SOD)',
      'Essencial para síntese de auxina IAA (via triptofano sintase)',
      'Componente de Cu/Zn-SOD — antioxidante primário',
      'Necessário para síntese e estabilização de proteínas (domínios zinc-finger)',
      'Regula desenvolvimento de cloroplastos',
      'Importante para divisão celular e enraizamento',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Folhas novas com clorose internerval (em solos com alto P)',
        '"Folha pequena" — entrenós encurtados e folhas pequenas (roseta)',
        'Atraso no crescimento e desenvolvimento',
        'Clorose bronze-avermelhada em milho ("mancha branca do milho")',
        'Redução do sistema radicular (falta de auxina)',
        'Maturação desuniforme',
      ],
      folhas_afetadas: 'jovens a intermediárias',
      padrao: 'internerval nas novas; "roseta" em árvores',
      gravidade_fisiologica: 'importante — compromete raiz, antioxidação e crescimento',
      impacto_produtivo: 'redução de 5–20% por limitação radicular e antioxidativa',
    },
    toxicidade: {
      sintomas_visuais: ['Clorose e necrose em folhas velhas', 'Inibe absorção de Fe e Mn'],
      mecanismo: 'Excesso de Zn compete com Fe e Cu na absorção via ZIP/IRT transporters',
    },
    estagios_criticos: ['VE', 'V1', 'V2', 'V3', 'R1'],
    hormonios_relacionados: ['auxina', 'jasmonate'],
    fonte_ref: 'Marschner (2012) Cap. 9; Taiz & Zeiger (2013) Cap. 19',
  },

  Cu: {
    nome: 'Cobre', simbolo: 'Cu', classe: 'micronutriente', mobilidade: 'imóvel',
    funcoes: [
      'Componente de plastocianina (transporte de elétrons no PSII)',
      'Componente de Cu/Zn-SOD — defesa antioxidante',
      'Essencial para lignificação e resistência estrutural das hastes',
      'Cofator da ACC oxidase (síntese de etileno)',
      'Importante para metabolismo energético via citocromo c oxidase',
      'Regula síntese de proteínas de reserva',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Folhas novas com coloração azul-esverdeada, clorose',
        'Hastes fracas, tendência ao tombamento',
        'Grãos mal formados, estéreis',
        'Inflorescências deformadas (espiga deficiente em grãos — milho)',
        'Redução da lignificação — hastes moles e flácidas',
        'Manchas cinza ou azuladas nas folhas jovens',
      ],
      folhas_afetadas: 'jovens (imóvel)',
      padrao: 'folhas novas, pontas, hastes',
      gravidade_fisiologica: 'importante — compromete fotossíntese e antioxidação',
      impacto_produtivo: 'redução de 3–12% por limitação fotossintética e estrutural',
    },
    toxicidade: {
      sintomas_visuais: ['Raízes marrons e atrofiadas', 'Clorose foliar', 'Inibe absorção de Fe, Mn, Zn, Mo'],
      mecanismo: 'Cu em excesso gera ROS via reação de Fenton e inibe transportadores de Fe',
    },
    estagios_criticos: ['V2', 'V3', 'R1', 'R3'],
    hormonios_relacionados: ['etileno', 'auxina'],
    fonte_ref: 'Marschner (2012) Cap. 9; Taiz & Zeiger (2013) Cap. 7',
  },

  Mn: {
    nome: 'Manganês', simbolo: 'Mn', classe: 'micronutriente', mobilidade: 'moderado',
    funcoes: [
      'Ativador do complexo de oxidação da água no PSII (OEC)',
      'Componente de Mn-SOD nas mitocôndrias',
      'Ativador de enzimas do ciclo de Krebs (malato desidrogenase)',
      'Necessário para síntese de giberelinas (Mn-hidroxilases)',
      'Envolvido na síntese de clorofila (ativação de enzimas)',
      'Importante para síntese de fenólicos e lignina',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Clorose internerval nas folhas jovens a intermediárias',
        '"Doença dos pantânos" em aveia — manchas cinza nas folhas',
        '"Mancha de talo" em leguminosas',
        'Necrose de tecidos internervais em casos severos',
        'Clorose semelhante à de Fe mas com padrão diferente',
      ],
      folhas_afetadas: 'jovens a intermediárias',
      padrao: 'internerval, início nas folhas mais novas/intermediárias',
      gravidade_fisiologica: 'importante — compromete PSII e metabolismo mitocondrial',
      impacto_produtivo: 'redução de 3–12% por limitação fotossintética',
    },
    toxicidade: {
      sintomas_visuais: [
        'Manchas marrons nas folhas velhas ("escoriose")',
        'Pontos necróticos nas margens',
        'Clorose generalizada com pontos oxidados',
        'Frequente em solos ácidos (pH < 5.5)',
      ],
      mecanismo: 'Mn2+ em excesso bloqueia absorção de Fe, Mg, Cu, Zn, Mo; inibe clorofilase',
    },
    estagios_criticos: ['V2', 'V3', 'V4', 'R1'],
    hormonios_relacionados: ['giberelina'],
    fonte_ref: 'Marschner (2012) Cap. 9; Taiz & Zeiger (2013) Cap. 13',
  },

  Fe: {
    nome: 'Ferro', simbolo: 'Fe', classe: 'micronutriente', mobilidade: 'imóvel',
    funcoes: [
      'Essencial para síntese de clorofila (ativação de glutamil-tRNA redutase)',
      'Componente de ferredoxina (transporte de elétrons na fotossíntese)',
      'Cofator de Fe-SOD, catalase e peroxidases',
      'Parte dos citocromos (cadeia respiratória)',
      'Componente da nitrogenase (cofator Fe-proteína)',
      'Envolvido na síntese de lipooxigenases (jasmonatos)',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Clorose internerval severa das folhas jovens (folha branca-amarela com nervuras verdes)',
        'Folhas novas completamente amarelas em casos severos',
        '"Amarelão da soja" em solos calcários ou compactados',
        'Plantas anêmicas, crescimento reduzido',
        'Raízes com exsudação de fitossideróforos (estratégia I plantas)',
      ],
      folhas_afetadas: 'jovens (muito imóvel)',
      padrao: 'internerval intenso nas folhas novas, base verde → verde pálido → amarelo',
      gravidade_fisiologica: 'crítico — compromete toda a fotossíntese',
      impacto_produtivo: 'redução de 5–25% pela limitação fotossintética severa',
    },
    toxicidade: {
      sintomas_visuais: [
        'Manchas marrom-ferrugem nas folhas velhas',
        '"Bronzeamento" foliar',
        'Pontos necróticos oxidados',
        'Comum em solos alagados (Fe2+ reduzido em alta concentração)',
      ],
      mecanismo: 'Fe2+ em excesso (solos gleizados) gera ROS via Fenton; inibe Mn, Zn',
    },
    estagios_criticos: ['V1', 'V2', 'V3', 'R1', 'R3'],
    hormonios_relacionados: ['auxina', 'etileno', 'jasmonate'],
    fonte_ref: 'Marschner (2012) Cap. 9; Taiz & Zeiger (2013) Cap. 7',
  },

  Mo: {
    nome: 'Molibdênio', simbolo: 'Mo', classe: 'micronutriente', mobilidade: 'moderado',
    funcoes: [
      'Cofator da nitrogenase — fixação biológica de N2 (FBN)',
      'Cofator da nitrato redutase (assimilação de N-NO3)',
      'Cofator da sulfito oxidase (metabolismo de S)',
      'Cofator da xantina desidrogenase (metabolismo de purinas)',
      'Necessário para síntese de ABA (aldeído oxidase — Mo-dependente)',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Clorose internerval similar a N (Mo necessário para assimilação de N)',
        '"Copo" ou enrolamento das folhas marginais em couve-flor ("whiptail")',
        'Sintomas de deficiência de N (N não é assimilado sem Mo)',
        'Nódulos pequenos e ineficientes em leguminosas (FBN comprometida)',
        'Manchas amarelas/laranja nas folhas velhas',
      ],
      folhas_afetadas: 'velhas a intermediárias (confunde com N)',
      padrao: 'internerval, similar a N/Mg',
      gravidade_fisiologica: 'crítico para FBN em soja — impacto no N total da planta',
      impacto_produtivo: 'redução de 8–30% por comprometimento da FBN',
    },
    toxicidade: {
      sintomas_visuais: ['Amarelecimento (induz carência de Cu)', 'Raro em condições normais'],
      mecanismo: 'Excesso compete com Cu (molibdato inibe absorção de cobre)',
    },
    estagios_criticos: ['VE', 'VC', 'V1', 'V2', 'R1'],
    hormonios_relacionados: ['aba'],
    fonte_ref: 'Marschner (2012) Cap. 9; Embrapa Soja (2013)',
  },

  Ni: {
    nome: 'Níquel', simbolo: 'Ni', classe: 'micronutriente', mobilidade: 'moderado',
    funcoes: [
      'Cofator da urease — hidrólise de ureia a NH3 + CO2',
      'Componente de hidrolases e desidrogenases',
      'Necessário para metabolismo de N em leguminosas',
    ],
    deficiencia: {
      sintomas_visuais: [
        'Acúmulo de ureia nos tecidos (necrose de pontas — urea burn)',
        'Ponteiros necrosados sem causa aparente (planta com alto N-ureia)',
      ],
      folhas_afetadas: 'jovens (meristemas)',
      padrao: 'pontas necrosadas, acúmulo de ureia',
      gravidade_fisiologica: 'moderado — relevante quando N-ureia é a fonte principal',
      impacto_produtivo: 'redução menor — raramente limitante em campo',
    },
    toxicidade: { sintomas_visuais: ['Clorose e necrose'], mecanismo: 'Interfere com Fe e Zn' },
    estagios_criticos: ['V2', 'V3'],
    hormonios_relacionados: [],
    fonte_ref: 'Marschner (2012) Cap. 9',
  },

  Si: {
    nome: 'Silício', simbolo: 'Si', classe: 'benéfico', mobilidade: 'imóvel',
    funcoes: [
      'Deposição na parede celular (silicificação) — aumenta rigidez',
      'Melhora resistência a doenças fúngicas (barreiras físicas)',
      'Reduz toxicidade de Al e Mn (precipitação)',
      'Melhora tolerância à seca (reduz transpiração)',
      'Estimula síntese de compostos de defesa',
    ],
    deficiencia: {
      sintomas_visuais: ['Folhas moles e prostradas', 'Maior susceptibilidade a doenças e pragas'],
      folhas_afetadas: 'gerais',
      padrao: 'fragilidade estrutural, não há clorose específica',
      gravidade_fisiologica: 'moderado em plantas acumuladoras (arroz, cana)',
      impacto_produtivo: 'redução indireta por maior ataque de doenças',
    },
    toxicidade: { sintomas_visuais: ['Praticamente não tóxico'], mecanismo: 'Insolúvel em pH normal' },
    estagios_criticos: ['V2', 'V3', 'R1'],
    hormonios_relacionados: ['jasmonate', 'salicilato'],
    fonte_ref: 'Epstein & Bloom (2005); Marschner (2012) Cap. 10',
  },

  Co: {
    nome: 'Cobalto', simbolo: 'Co', classe: 'benéfico', mobilidade: 'moderado',
    funcoes: [
      'Componente da cobalamina (vitamina B12) em bactérias fixadoras de N',
      'Essencial para a FBN via Rhizobium/Bradyrhizobium',
      'Ativa enzimas em leguminosas (menor papel direto na planta)',
    ],
    deficiencia: {
      sintomas_visuais: ['Nódulos ineficientes', 'Sintomas de deficiência de N'],
      folhas_afetadas: 'gerais',
      padrao: 'comprometimento da FBN, similar à carência de N',
      gravidade_fisiologica: 'moderado apenas em leguminosas com FBN',
      impacto_produtivo: 'redução de 5–15% pela limitação da FBN',
    },
    toxicidade: { sintomas_visuais: ['Clorose', 'Inibe absorção de Fe'], mecanismo: 'Compete com Fe' },
    estagios_criticos: ['VE', 'VC', 'V1', 'V2'],
    hormonios_relacionados: ['etileno'],
    fonte_ref: 'Marschner (2012) Cap. 10',
  },

  Cl: {
    nome: 'Cloro', simbolo: 'Cl', classe: 'micronutriente', mobilidade: 'muito móvel',
    funcoes: [
      'Cofator do complexo de oxidação da água no PSII',
      'Regulação osmótica e balanço catiônico',
      'Ativador de ATPases de membrana',
    ],
    deficiencia: {
      sintomas_visuais: ['Murcha foliar sem déficit hídrico', 'Clorose nas pontas das folhas'],
      folhas_afetadas: 'jovens e velhas',
      padrao: 'murcha difusa — raramente limitante',
      gravidade_fisiologica: 'baixo em campo (Cl abundante em solos)',
      impacto_produtivo: 'raramente limitante em condições normais',
    },
    toxicidade: { sintomas_visuais: ['Queima de pontas foliares', 'Necrose marginal'], mecanismo: 'Salinidade por KCl ou NaCl' },
    estagios_criticos: ['R3', 'R4'],
    hormonios_relacionados: [],
    fonte_ref: 'Marschner (2012) Cap. 9',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MATRIZ DE INTERAÇÕES NUTRICIONAIS
// Tipo: 'antagonismo' | 'sinergismo'
// Mecanismo: explicação do processo bioquímico/fisiológico
// Severidade: 1 (leve) | 2 (moderado) | 3 (forte)
// ─────────────────────────────────────────────────────────────────────────────

export const INTERACTIONS = {
  // K → reduz absorção de Mg e Ca (competição catiônica)
  'K→Mg': { tipo: 'antagonismo', severidade: 3, mecanismo: 'K+ e Mg2+ compartilham transportadores NSCC; excesso de K+ satura o carregador e inibe Mg2+. pH baixo agrava.', fonte: 'Marschner (2012) p.167' },
  'K→Ca': { tipo: 'antagonismo', severidade: 2, mecanismo: 'K+ compete com Ca2+ nos sítios de troca catiônica da CTC do solo e nos transportadores de membrana.', fonte: 'Marschner (2012) p.168' },
  'K→N':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'K+ co-transportado com NO3- via NRT1 e NRT2; K suficiente melhora absorção de N-nitrato.', fonte: 'Epstein & Bloom (2005) p.112' },

  // Ca → reduz absorção de Mg, K, micronutrientes
  'Ca→Mg': { tipo: 'antagonismo', severidade: 3, mecanismo: 'Ca2+ compete com Mg2+ nos transportadores divalentes de membrana plasmática.', fonte: 'Marschner (2012) p.170' },
  'Ca→Mn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Alta saturação de Ca na CTC reduz disponibilidade de Mn2+ no solo.', fonte: 'CQFS RS/SC (2016) p.89' },
  'Ca→Fe': { tipo: 'antagonismo', severidade: 2, mecanismo: 'pH elevado por calagem reduz Fe3+→Fe2+ (processo de redução necessário para absorção).', fonte: 'Marschner (2012) p.352' },
  'Ca→Zn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Calagem excessiva eleva pH e precipita Zn como hidróxido, reduzindo disponibilidade.', fonte: 'CQFS RS/SC (2016) p.91' },
  'Ca→B':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'B facilita mobilidade e distribuição de Ca na planta via complexo borato-pectina.', fonte: 'Marschner (2012) p.287' },

  // Mg → reduz Ca, K
  'Mg→Ca': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Excesso de Mg desloca Ca nos sítios de troca; relação Mg:Ca > 0.3:1 (CTC) é prejudicial.', fonte: 'CQFS RS/SC (2016) p.88' },
  'Mg→K':  { tipo: 'antagonismo', severidade: 2, mecanismo: 'Mg2+ compete com K+ nos transportadores de alta afinidade em solos com baixo K.', fonte: 'Marschner (2012) p.169' },
  'Mg→P':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'Mg é cofator necessário para o carregamento de P no floema (Mg-ATP fosfotransferase).', fonte: 'Taiz & Zeiger (2013) p.84' },

  // P → reduz micronutrientes (precipitação insolúvel)
  'P→Zn':  { tipo: 'antagonismo', severidade: 3, mecanismo: 'Fosfato reage com Zn2+ formando Zn3(PO4)2 insolúvel no solo e inibe transporte radicular de Zn via ZIP.', fonte: 'Marschner (2012) p.367' },
  'P→Fe':  { tipo: 'antagonismo', severidade: 3, mecanismo: 'Fosfato precipita Fe3+ como FePO4; alto P inibe redução de Fe3+ pela ferri-reductase radicular.', fonte: 'Marschner (2012) p.350' },
  'P→Cu':  { tipo: 'antagonismo', severidade: 2, mecanismo: 'Alto P reduz mobilidade de Cu no solo e interfere com transportador COPT.', fonte: 'Marschner (2012) p.372' },
  'P→Mn':  { tipo: 'antagonismo', severidade: 2, mecanismo: 'Fosfato pode precipitar Mn no solo; menor efeito que com Fe e Zn.', fonte: 'Marschner (2012) p.365' },
  'P→N':   { tipo: 'sinergismo',  severidade: 2, mecanismo: 'P essencial para FBN — componente de ATP para nitrogenase e nódulos; P melhora captação de N.', fonte: 'Embrapa Soja (2013) p.44' },
  'P→Mo':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'P supre energia (ATP) para assimilação de Mo e ativação da nitrato-redutase.', fonte: 'Marschner (2012) p.383' },

  // N → interações complexas
  'N→Mg':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'Alto N aumenta síntese de clorofila e demanda por Mg (átomo central da clorofila).', fonte: 'Malavolta et al. (1997) p.201' },
  'N→S':   { tipo: 'sinergismo',  severidade: 3, mecanismo: 'N e S são co-essenciais para síntese de proteínas (aminoácidos sulfurados Cys, Met). Razão N:S ideal = 17:1.', fonte: 'Marschner (2012) p.246' },
  'N→Fe':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'N-NH4+ estimula acidificação rizosférica via ATPases H+, melhorando disponibilidade de Fe3+.', fonte: 'Marschner (2012) p.354' },
  'N(NH4)→Ca': { tipo: 'antagonismo', severidade: 2, mecanismo: 'NH4+ compete com Ca2+, Mg2+ e K+ nos sítios de troca CTC e transportadores de membrana.', fonte: 'Marschner (2012) p.172' },
  'N(NH4)→Mg': { tipo: 'antagonismo', severidade: 2, mecanismo: 'NH4+ compete com Mg2+ via canais NSCC; fertilização amoniacal excessiva pode causar carência de Mg.', fonte: 'Marschner (2012) p.172' },

  // S → interações
  'S→Mo':  { tipo: 'antagonismo', severidade: 2, mecanismo: 'Sulfato (SO4²-) e molibdato (MoO4²-) são estruturalmente semelhantes; competem pelo mesmo transportador (MOT).', fonte: 'Marschner (2012) p.383' },
  'S→N':   { tipo: 'sinergismo',  severidade: 3, mecanismo: 'S essencial para síntese de aminoácidos sulfurados que integram proteínas com N; razão N:S = 17:1 ideal.', fonte: 'Epstein & Bloom (2005) p.164' },
  'S→FBN': { tipo: 'sinergismo',  severidade: 3, mecanismo: 'S é componente do cofator Fe-Mo da nitrogenase — carência de S compromete FBN diretamente.', fonte: 'Embrapa Soja (2013) p.47' },

  // Mn → reduz micronutrientes
  'Mn→Fe': { tipo: 'antagonismo', severidade: 3, mecanismo: 'Mn2+ e Fe2+ são transportados pelo mesmo transportador IRT1 (ZIP family); excesso de Mn inibe Fe.', fonte: 'Marschner (2012) p.358' },
  'Mn→Mg': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Mn2+ compete com Mg2+ nos transportadores NSCC de baixa especificidade.', fonte: 'Marschner (2012) p.364' },
  'Mn→Cu': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Excesso de Mn interfere com absorção de Cu via transportadores divalentes.', fonte: 'Marschner (2012) p.372' },
  'Mn→Zn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Mn2+ compete com Zn2+ via ZIP transporters em condições de alta concentração.', fonte: 'Marschner (2012) p.368' },
  'Mn→Mo': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Excesso de Mn inibe enzimas que dependem de Mo (nitrato redutase, nitrogenase).', fonte: 'Marschner (2012) p.384' },

  // Fe → reduz outros micronutrientes
  'Fe→Mn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Fe2+ compete com Mn2+ via IRT1; excesso de Fe em solos alagados causa deficiência de Mn.', fonte: 'Marschner (2012) p.365' },
  'Fe→Zn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Alto Fe2+ inibe absorção de Zn via ZIP/IRT transporters.', fonte: 'Marschner (2012) p.369' },
  'Fe→Cu': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Excesso de Fe interfere com enzimas Cu-dependentes na cadeia respiratória.', fonte: 'Marschner (2012) p.373' },

  // Cu → reduz outros micronutrientes
  'Cu→Fe': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Cu em excesso inibe redutase de Fe3+ na raiz e compete com Fe2+ via IRT1.', fonte: 'Marschner (2012) p.354' },
  'Cu→Zn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Cu e Zn compartilham ZIP transporters; excesso de um reduz absorção do outro.', fonte: 'Marschner (2012) p.368' },
  'Cu→Mo': { tipo: 'antagonismo', severidade: 3, mecanismo: 'Cu em excesso precipita Mo (CuMoO4) no solo; inibe molibdato reductase.', fonte: 'Marschner (2012) p.384' },

  // Zn → reduz Fe, Mn
  'Zn→Fe': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Zn compete com Fe via IRT1 em pH neutro-alcalino; alto Zn foliar via adubação excessiva.', fonte: 'Marschner (2012) p.354' },
  'Zn→Mn': { tipo: 'antagonismo', severidade: 2, mecanismo: 'Zn2+ e Mn2+ competem em transportadores ZIP em condições de excesso.', fonte: 'Marschner (2012) p.366' },
  'Zn→P':  { tipo: 'sinergismo',  severidade: 2, mecanismo: 'Zn ativa enzimas do metabolismo de P (fosfatases); Zn adequado melhora utilização de P.', fonte: 'Epstein & Bloom (2005) p.172' },

  // B → interações
  'B→Ca':  { tipo: 'sinergismo',  severidade: 3, mecanismo: 'B forma complexo com RG-II (pectina de parede celular) que ancora Ca; B adequado permite distribuição normal de Ca.', fonte: 'Marschner (2012) p.287' },
  'B→auxina': { tipo: 'sinergismo', severidade: 2, mecanismo: 'B necessário para transporte polar de auxina via proteínas PIN na membrana plasmática.', fonte: 'Taiz & Zeiger (2013) p.504' },

  // Mo → FBN
  'Mo→FBN': { tipo: 'sinergismo',  severidade: 3, mecanismo: 'Mo é cofator obrigatório da nitrogenase (Fe-Mo cofator); sem Mo, FBN não ocorre.', fonte: 'Embrapa Soja (2013) p.47' },
  'Mo→N':   { tipo: 'sinergismo',  severidade: 3, mecanismo: 'Mo ativa nitrato redutase — enzima que converte NO3- em NH4+; carência de Mo = carência funcional de N.', fonte: 'Marschner (2012) p.383' },
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BANCO DE DADOS HORMONAL
// ─────────────────────────────────────────────────────────────────────────────

export const HORMONE_DATABASE = {
  auxina: {
    nome: 'Auxina (AIA)', abrev: 'IAA',
    funcoes: [
      'Elongação celular (ativação de expansinas via acidificação)',
      'Dominância apical (inibe brotação lateral)',
      'Iniciação e crescimento radicular (primórdios de raízes)',
      'Tropismos (fototropismo e gravitropismo)',
      'Desenvolvimento de frutos e flores',
      'Transporte polar mediado por PIN proteins',
    ],
    sintese_precursores: ['Triptofano', 'Zn (triptofano sintase)', 'B (transporte polar PIN)'],
    dependencia_nutricional: {
      Zn: { nivel: 'crítico', mecanismo: 'Zn é cofator da triptofano sintase, enzima limitante da síntese de IAA via via triptofano' },
      B:  { nivel: 'importante', mecanismo: 'B necessário para transporte polar de IAA via PIN proteins; deficiência de B = IAA mal distribuído' },
      N:  { nivel: 'moderado', mecanismo: 'N é parte do triptofano (aminoácido precursor de IAA)' },
      Cu: { nivel: 'moderado', mecanismo: 'Cu ativa enzimas oxidativas que metabolizam IAA; deficiência altera degradação de IAA' },
    },
    impacto_deficiencia: 'Redução do crescimento radicular, ausência de dominância apical, menor engalhamento',
    relacao_nutricional: ['Zn', 'B'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 19; Marschner (2012) p.278',
  },

  citocinina: {
    nome: 'Citocinina (CK)', abrev: 'CK',
    funcoes: [
      'Divisão celular (ativação de CDKs)',
      'Atraso da senescência foliar',
      'Iniciação de brotações laterais',
      'Sinal de N para parte aérea (CK produzida em raízes ricas em N)',
      'Desenvolvimento de cloroplastos',
      'Regulação do sink em grãos',
    ],
    sintese_precursores: ['N (estrutura adenina-isoprenóide)', 'Mg (ativador de enzimas de síntese)'],
    dependencia_nutricional: {
      N:  { nivel: 'crítico', mecanismo: 'CK são derivadas de adenina (base nitrogenada); N suficiente ativa síntese de CK nas raízes' },
      Mg: { nivel: 'moderado', mecanismo: 'Mg ativa adenilato quinase e outras enzimas do metabolismo de purinas usadas na síntese de CK' },
      K:  { nivel: 'moderado', mecanismo: 'K regula potencial osmótico da célula; influencia sinalização de CK' },
      P:  { nivel: 'moderado', mecanismo: 'P em forma de ATP fornece esqueleto energético para síntese de isoprenóides nas CK' },
    },
    impacto_deficiencia: 'Aceleração da senescência foliar, redução da divisão celular, menor sink em grãos',
    relacao_nutricional: ['N', 'Mg'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 20; Marschner (2012) p.290',
  },

  giberelina: {
    nome: 'Giberelina (GA)', abrev: 'GA',
    funcoes: [
      'Elongação do caule e internódios',
      'Germinação de sementes (ativação de amilases)',
      'Florescimento (quebra de dormência)',
      'Divisão celular em meristemas intercalares',
      'Desenvolvimento de frutos partenocárpicos',
    ],
    sintese_precursores: ['Mn (Mn-hidroxilases na via de síntese)', 'Fe (ferredoxina)'],
    dependencia_nutricional: {
      Mn: { nivel: 'importante', mecanismo: 'Mn é cofator de ent-copalil difosfato sintase e ent-caureno oxidase na via de síntese de GA' },
      Fe: { nivel: 'moderado', mecanismo: 'Fe como cofator de dioxigenases (GA3ox, GA20ox) que ativam GA' },
      B:  { nivel: 'moderado', mecanismo: 'B regula divisão celular meristemática onde GAs atuam' },
    },
    impacto_deficiencia: 'Internódios curtos, planta anã, florescimento tardio',
    relacao_nutricional: ['Mn', 'Fe'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 20; Marschner (2012) p.292',
  },

  aba: {
    nome: 'Ácido Abscísico (ABA)', abrev: 'ABA',
    funcoes: [
      'Fechamento de estômatos durante déficit hídrico',
      'Dormência de sementes',
      'Resposta ao estresse hídrico, salino e térmico',
      'Regulação da maturação de frutos',
      'Inibição do crescimento radicular em excesso',
    ],
    sintese_precursores: ['S (cisteína para biossíntese)', 'Mo (aldeído oxidase)', 'Ca (segundo mensageiro)'],
    dependencia_nutricional: {
      S:  { nivel: 'moderado', mecanismo: 'Cisteína (S-aminoácido) é precursora de etileno e interatua com ABA na regulação estomática' },
      Mo: { nivel: 'importante', mecanismo: 'Aldeído oxidase (Mo-dependente) é enzima final na síntese de ABA' },
      Ca: { nivel: 'crítico', mecanismo: 'Ca2+ como segundo mensageiro amplifica sinal de ABA nos estômatos; Ca intracelular ativa proteínas SLAC1' },
    },
    impacto_deficiencia: 'Estômatos não fecham adequadamente; planta perde água excessivamente em estresse',
    relacao_nutricional: ['Mo', 'Ca', 'S'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 23; Marschner (2012) p.311',
  },

  etileno: {
    nome: 'Etileno (ET)', abrev: 'ET',
    funcoes: [
      'Maturação e amadurecimento de frutos',
      'Abscisão foliar e floral',
      'Resposta a estresse (patógenos, ferimentos)',
      'Inibição do crescimento em estresse — triple response',
      'Senescência acelerada',
    ],
    sintese_precursores: ['S-adenosilmetionina (SAM, contém S)', 'Cu (ACC oxidase)', 'Fe (ACC sintase)'],
    dependencia_nutricional: {
      S:  { nivel: 'crítico', mecanismo: 'SAM (S-adenosilmetionina) é precursor direto de ACC, que é convertido em etileno pela ACC oxidase' },
      Cu: { nivel: 'crítico', mecanismo: 'Cu é cofator da ACC oxidase (enzima que converte ACC em etileno); deficiência de Cu reduz síntese de etileno' },
      Fe: { nivel: 'moderado', mecanismo: 'Fe é cofator de ACC sintase e ACC oxidase' },
    },
    impacto_deficiencia: 'Menor abscisão, menor resposta a estresse, frutos com maturação irregular',
    relacao_nutricional: ['Cu', 'S'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 22; Marschner (2012) p.308',
  },

  brassinosteroide: {
    nome: 'Brassinosteroides (BR)', abrev: 'BR',
    funcoes: [
      'Elongação e divisão celular (sinérgicos com auxina)',
      'Resistência ao estresse (tolerância a frio, calor, seca)',
      'Desenvolvimento do pólen e fertilidade',
      'Maturação de vagens e sementes',
      'Regulação da senescência e imunidade',
    ],
    sintese_precursores: ['K (modulação da sinalização)', 'B (integridade de membrana)'],
    dependencia_nutricional: {
      K:  { nivel: 'moderado', mecanismo: 'K regula a expressão de genes de sinalização de BR; adequado K melhora respostas a BR' },
      B:  { nivel: 'moderado', mecanismo: 'B mantém integridade das membranas onde receptores BRI1 de BR estão ancorados' },
      Zn: { nivel: 'moderado', mecanismo: 'Zn co-regula vias de desenvolvimento junto com BR' },
    },
    impacto_deficiencia: 'Menor tolerância a estresses, redução do desenvolvimento reprodutivo',
    relacao_nutricional: ['K', 'B'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 24; Hayat et al. (2012)',
  },

  jasmonate: {
    nome: 'Jasmonatos (JA)', abrev: 'JA',
    funcoes: [
      'Resposta a injúrias mecânicas e herbivoria',
      'Indução de defesas antipatogênicas',
      'Inibição do crescimento vegetativo em estresse',
      'Senescência foliar (em coordenação com ET)',
      'Formação de tricomas e compostos fenólicos',
    ],
    sintese_precursores: ['Fe (lipooxigenase LOX)', 'Zn (cofator LOX)', 'Si (induz síntese)'],
    dependencia_nutricional: {
      Fe: { nivel: 'importante', mecanismo: 'Fe é cofator das lipooxigenases (LOX1, LOX2) que iniciam a via de síntese de JA a partir de ácidos graxos' },
      Zn: { nivel: 'moderado', mecanismo: 'Zn influencia atividade de LOX e enzimas da via do octadecanóide' },
      Si: { nivel: 'moderado', mecanismo: 'Si induz síntese de JA e compostos de defesa via ativação de LOX' },
    },
    impacto_deficiencia: 'Menor resposta a pragas e doenças; vulnerabilidade aumentada',
    relacao_nutricional: ['Fe', 'Zn'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 13; Marschner (2012) p.298',
  },

  salicilato: {
    nome: 'Ácido Salicílico (SA)', abrev: 'SA',
    funcoes: [
      'Indução de SAR (resistência sistêmica adquirida)',
      'Inibição de patógenos (ativa PR-proteínas)',
      'Regulação de NPR1 — fator de transcrição imune',
      'Antagonismo com JA e ET em resposta a necrotróficos',
    ],
    sintese_precursores: ['Fenilalanina (N-dependente)', 'S (compostos de defesa)'],
    dependencia_nutricional: {
      N:  { nivel: 'moderado', mecanismo: 'Fenilalanina (N-aminoácido) é precursora de SA via fenilalanina amônia liase (PAL)' },
      Si: { nivel: 'moderado', mecanismo: 'Si estimula acumulação de SA e ativa resposta imune via PAL' },
      Mn: { nivel: 'moderado', mecanismo: 'Mn ativa PAL (fenilalanina amônia liase) — enzima da via fenilpropanóide' },
    },
    impacto_deficiencia: 'Maior susceptibilidade a patógenos biotróficos; menor SAR',
    relacao_nutricional: ['N', 'Si', 'Mn'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 13',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BANCO DE SINTOMAS VISUAIS
// Chave: sintoma → lista de causas prováveis (ordenadas por frequência)
// ─────────────────────────────────────────────────────────────────────────────

export const SYMPTOMS_DB = {
  clorose_folhas_velhas_uniforme: {
    descricao: 'Amarelecimento uniforme começando pelas folhas mais velhas (basais)',
    causas: [
      { nut: 'N',  prob: 0.45, mecanismo: 'N altamente móvel — remobilizado das velhas para as novas; deficiência clássica' },
      { nut: 'Mg', prob: 0.25, mecanismo: 'Mg moderadamente móvel; remobilizado das velhas para novas em carência' },
      { nut: 'Mo', prob: 0.15, mecanismo: 'Mo — carência impede assimilação de NO3-, mimicando deficiência de N' },
      { nut: 'S',  prob: 0.10, mecanismo: 'S — em deficiência moderada, pode mostrar amarelamento nas velhas' },
      { nut: 'K',  prob: 0.05, mecanismo: 'K — quando em carência severa, clorose precede necrose marginal' },
    ],
    diferenciacao: 'N: uniforme; Mg: internerval; K: marginal começando necrose; Mo: confunde com N',
  },

  clorose_internerval_folhas_velhas: {
    descricao: 'Clorose entre as nervuras, nervuras permanecem verdes, nas folhas velhas',
    causas: [
      { nut: 'Mg', prob: 0.60, mecanismo: 'Padrão clássico de Mg — "espinha de peixe", nervuras verdes, internerval amarelo' },
      { nut: 'K',  prob: 0.25, mecanismo: 'K em deficiência moderada antes de progredir para necrose marginal' },
      { nut: 'Mo', prob: 0.15, mecanismo: 'Mo — carência causa amarelamento internerval nas folhas velhas/intermediárias' },
    ],
    diferenciacao: 'Mg: padrão internerval claro e simétrico; K: tende a progredir para margem',
  },

  clorose_internerval_folhas_novas: {
    descricao: 'Clorose entre as nervuras nas folhas jovens e novas (meristemas)',
    causas: [
      { nut: 'Fe', prob: 0.40, mecanismo: 'Fe imóvel — severa clorose internerval nas folhas novas; nervuras verde-claro ou brancas' },
      { nut: 'Mn', prob: 0.30, mecanismo: 'Mn imóvel — clorose internerval nas folhas novas, mais leve que Fe' },
      { nut: 'Zn', prob: 0.20, mecanismo: 'Zn — clorose internerval em solos com excesso de P; folhas pequenas' },
      { nut: 'S',  prob: 0.10, mecanismo: 'S — uniforme nas novas quando em carência severa' },
    ],
    diferenciacao: 'Fe: clorose mais intensa (quase branca); Mn: mais leve; Zn: folha pequena + internerval',
  },

  necrose_marginal_folhas_velhas: {
    descricao: 'Queima ou necrose começando pelas margens/bordas das folhas velhas',
    causas: [
      { nut: 'K',  prob: 0.65, mecanismo: 'K deficiente → incapacidade de manter turgescência → necrose marginal das velhas' },
      { nut: 'Mn', prob: 0.20, mecanismo: 'Mn em toxicidade (pH ácido) → manchas marrons-ferrugem nas margens' },
      { nut: 'B',  prob: 0.15, mecanismo: 'B em toxicidade → necrose das pontas e margens das velhas' },
    ],
    diferenciacao: 'K: marginal progressivo das velhas; Mn tóxico: pontos escuros + manchas irregulares',
  },

  necrose_meristemas_ponteiros: {
    descricao: 'Morte dos ponteiros, meristemas apicais ou folhas jovens deformadas',
    causas: [
      { nut: 'Ca', prob: 0.50, mecanismo: 'Ca imóvel — não remobilizado; meristemas em crescimento ativo não recebem Ca suficiente' },
      { nut: 'B',  prob: 0.40, mecanismo: 'B imóvel — ponteiros mortos, flores abortadas, frutos deformados' },
      { nut: 'Cu', prob: 0.10, mecanismo: 'Cu — deformações em meristemas reprodutivos' },
    ],
    diferenciacao: 'Ca: ponteiro enrolado/curvado; B: morte súbita do ápice + flores caindo',
  },

  manchas_marrons_necroticas: {
    descricao: 'Manchas marrons necróticas dispersas ou irregulares nas folhas',
    causas: [
      { nut: 'Mn', prob: 0.35, mecanismo: 'Mn tóxico (pH < 5.5) → pontos marrons oxidados nas folhas (escoriose)' },
      { nut: 'Fe', prob: 0.25, mecanismo: 'Fe tóxico (solo alagado) → bronzeamento e manchas ferrugem' },
      { nut: 'Ca', prob: 0.20, mecanismo: 'Ca — necrose localizada em tecidos de crescimento rápido' },
      { nut: 'B',  prob: 0.20, mecanismo: 'B tóxico → manchas cloróticas progredindo a necróticas nas margens velhas' },
    ],
    diferenciacao: 'Mn tóxico: solo ácido, pontos pequenos; Fe tóxico: solo encharcado; Ca: sem relação com pH',
  },

  coloracao_purpura_avermelhada: {
    descricao: 'Folhas ou hastes com coloração roxa, vinho ou avermelhada',
    causas: [
      { nut: 'P',  prob: 0.65, mecanismo: 'Deficiência de P → acúmulo de antocianinas; clássico em soja e milho' },
      { nut: 'Mg', prob: 0.20, mecanismo: 'Mg em carência avançada → acúmulo de antocianinas nas velhas' },
      { nut: 'N',  prob: 0.15, mecanismo: 'N — deficiência severa pode levar a acúmulo de antocianinas' },
    ],
    diferenciacao: 'P: roxo intenso em folhas velhas e hastes; Mg: após clorose internerval; N: pálido-amarelo antes',
  },

  roseta_folhas_pequenas: {
    descricao: 'Entrenós muito curtos, folhas pequenas agrupadas (efeito roseta)',
    causas: [
      { nut: 'Zn', prob: 0.70, mecanismo: 'Zn essencial para síntese de IAA (auxina); sem IAA não há elongação celular' },
      { nut: 'B',  prob: 0.20, mecanismo: 'B — folhas novas deformadas, enrugadas, internódios curtos' },
      { nut: 'Fe', prob: 0.10, mecanismo: 'Fe — em deficiência severa, crescimento prejudicado com folhas pequenas' },
    ],
    diferenciacao: 'Zn: roseta clássica + clorose internerval; B: folhas distorcidas + aborto floral',
  },

  murcha_sem_deficit_hidrico: {
    descricao: 'Planta murchando mesmo com umidade adequada no solo',
    causas: [
      { nut: 'K',  prob: 0.50, mecanismo: 'K regula abertura de estômatos e turgescência celular; carência → murcha' },
      { nut: 'Ca', prob: 0.30, mecanismo: 'Ca — membranas instáveis, raízes danificadas não absorvem água' },
      { nut: 'B',  prob: 0.20, mecanismo: 'B — colapso de paredes celulares em raízes e vasos' },
    ],
    diferenciacao: 'K: murcha diurna nas folhas velhas; Ca: ponteiros murchos + deformados',
  },

  raizes_mal_desenvolvidas: {
    descricao: 'Sistema radicular pequeno, curto ou com raízes marrons/danificadas',
    causas: [
      { nut: 'P',  prob: 0.35, mecanismo: 'P — essencial para desenvolvimento radicular inicial (energia ATP)' },
      { nut: 'Zn', prob: 0.25, mecanismo: 'Zn — baixa síntese de IAA → redução de raízes laterais' },
      { nut: 'Ca', prob: 0.20, mecanismo: 'Ca — ápice radicular morre sem Ca (morte de células meristemáticas)' },
      { nut: 'B',  prob: 0.15, mecanismo: 'B — raízes grossas e escuras na ponta, pouco desenvolvimento' },
      { nut: 'Cu', prob: 0.05, mecanismo: 'Cu — em toxicidade, raízes marrons e atrofiadas' },
    ],
    diferenciacao: 'P: raízes curtas uniformes; Ca: pontas marrons e mortas; B: raízes grossas',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. DEMANDAS POR ESTÁDIO FENOLÓGICO (SOJA)
// Fontes: Embrapa Soja (2013); Sfredo (2008); Taiz & Zeiger (2013)
// ─────────────────────────────────────────────────────────────────────────────

export const PHENOLOGY_DEMANDS = {
  // ── Germinação e Emergência ──
  VE: {
    label: 'Emergência',
    foco_fisiologico: 'Mobilização de reservas do cotilédone → estabelecimento de raiz e haste',
    nutrientes_criticos: [
      { nut: 'P', peso: 10, razao: 'P essencial para síntese de ATP, membranas e DNA nas células em divisão rápida' },
      { nut: 'Mo', peso: 9, razao: 'Mo necessário para nitrogenase logo que nódulos são formados' },
      { nut: 'Zn', peso: 8, razao: 'Zn necessário para síntese de IAA que drive o crescimento radicular inicial' },
      { nut: 'Ca', peso: 7, razao: 'Ca estrutural para paredes celulares em formação' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'giberelina'],
    vulnerabilidades: ['Solo frio (< 12°C) bloqueia P', 'pH ácido inativa Mo', 'Compactação impede raiz primária'],
    manipulacoes: ['Tratamento de sementes com Co+Mo (FBN)', 'Starter P no sulco', 'Zn no sulco'],
  },

  VC: {
    label: 'Cotilédones expandidos',
    foco_fisiologico: 'Transição de autotrofia de cotilédone para fotossíntese foliar',
    nutrientes_criticos: [
      { nut: 'N',  peso: 9, razao: 'Início da demanda por N fotossintético (proteína Rubisco)' },
      { nut: 'P',  peso: 9, razao: 'P para ATP e síntese de DNA nas células em divisão' },
      { nut: 'Mo', peso: 8, razao: 'Mo para eficiência da FBN (nódulos iniciam formação)' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'giberelina'],
    vulnerabilidades: ['Stress hídrico bloqueia nodulação', 'Deficiência de Mo compromete FBN desde o início'],
    manipulacoes: ['Inoculação de Bradyrhizobium', 'Co+Mo semente/foliar'],
  },

  V1: {
    label: 'Primeiro nó (unifólios)',
    foco_fisiologico: 'Crescimento vegetativo inicial + estabelecimento do sistema radicular',
    nutrientes_criticos: [
      { nut: 'N',  peso: 9, razao: 'N para clorofila e expansão de área foliar' },
      { nut: 'P',  peso: 9, razao: 'P para desenvolvimento radicular e energético' },
      { nut: 'Zn', peso: 8, razao: 'Zn essencial para IAA e crescimento radicular lateral' },
      { nut: 'Mo', peso: 8, razao: 'Mo para FBN e assimilação de NO3-' },
      { nut: 'B',  peso: 7, razao: 'B para divisão celular e integridade de parede' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'giberelina'],
    vulnerabilidades: ['Compactação limita raiz', 'pH < 5.5 inativa Mo e Zn', 'Alumínio tóxico'],
    manipulacoes: ['Aplicação de Zn foliar ou solo', 'Mo via tratamento de sementes ou foliar precoce'],
  },

  V2: {
    label: 'Segundo nó (1º trifoliolado)',
    foco_fisiologico: 'Crescimento acelerado de folhas, raízes laterais e nódulos',
    nutrientes_criticos: [
      { nut: 'N',  peso: 9, razao: 'N para fotossíntese e crescimento vegetativo rápido' },
      { nut: 'K',  peso: 8, razao: 'K para osmorrregulação e transporte de assimilados' },
      { nut: 'Mg', peso: 8, razao: 'Mg para clorofila — planta cresce rápido, demanda aumenta' },
      { nut: 'S',  peso: 8, razao: 'S para aminoácidos sulfurados e apoio à FBN' },
      { nut: 'Fe', peso: 7, razao: 'Fe para clorofila e ferredoxina fotossintética' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'giberelina'],
    vulnerabilidades: ['Solo compactado reduz N e P', 'Solos arenosos lixiviam K e Mg'],
    manipulacoes: ['N foliar em solos pobres', 'K solo ou foliar', 'Mg foliar em carência'],
  },

  V3: {
    label: 'Terceiro nó (2º trifoliolado)',
    foco_fisiologico: 'Expansão de área foliar + início de acúmulo de MS vegetativa',
    nutrientes_criticos: [
      { nut: 'N',  peso: 10, razao: 'N máxima demanda vegetativa — fotossíntese intensa' },
      { nut: 'K',  peso: 9, razao: 'K para osmorrregulação, transporte e resistência' },
      { nut: 'Mg', peso: 8, razao: 'Mg para clorofila em expansão máxima foliar' },
      { nut: 'B',  peso: 7, razao: 'B para parede celular e iniciação meristemática' },
      { nut: 'Mn', peso: 7, razao: 'Mn para PSII (oxidação da água na fotossíntese)' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'giberelina', 'brassinosteroide'],
    vulnerabilidades: ['Estresse hídrico impacta K', 'Solos compactados limitam N, P, K, Mg'],
    manipulacoes: ['Aplicação foliar de K + Mg', 'B preventivo', 'Mn foliar em solos ácidos corrigidos'],
  },

  V4: { label: 'Quarto nó', foco_fisiologico: 'Continuação do crescimento vegetativo; início de dominância apical', nutrientes_criticos: [{ nut: 'N', peso: 10 }, { nut: 'K', peso: 9 }, { nut: 'Mg', peso: 8 }, { nut: 'B', peso: 8 }, { nut: 'Ca', peso: 7 }], hormonios_ativos: ['auxina', 'citocinina', 'giberelina'], vulnerabilidades: ['Calor > 35°C reduz FBN', 'Seca limita absorção de K'], manipulacoes: ['B preventivo pré-florescimento', 'Aminoácidos para reduzir estresse térmico'] },

  V5: { label: 'Quinto nó', foco_fisiologico: 'Pré-florescimento — acúmulo máximo de MS vegetativa', nutrientes_criticos: [{ nut: 'N', peso: 10 }, { nut: 'K', peso: 9 }, { nut: 'B', peso: 9 }, { nut: 'Mg', peso: 8 }, { nut: 'Ca', peso: 8 }, { nut: 'Zn', peso: 7 }], hormonios_ativos: ['auxina', 'citocinina', 'giberelina', 'brassinosteroide'], vulnerabilidades: ['B crítico — deficiência aqui = aborto floral em R1', 'Estresse hídrico compromete absorção'], manipulacoes: ['B obrigatório + Ca foliar', 'Aminoácidos', 'Bioestimulantes K-húmico'] },

  V6: { label: 'Sexto nó', foco_fisiologico: 'Transição vegetativo→reprodutivo; iniciação floral', nutrientes_criticos: [{ nut: 'B', peso: 10 }, { nut: 'Ca', peso: 9 }, { nut: 'N', peso: 9 }, { nut: 'K', peso: 9 }, { nut: 'Mg', peso: 8 }], hormonios_ativos: ['auxina', 'citocinina', 'brassinosteroide'], vulnerabilidades: ['Sem B = aborto floral garantido', 'Estresse hídrico compromete pegamento'], manipulacoes: ['B + Ca foliar (obrigatório)', 'Bioestimulantes para equilíbrio vegetativo/reprodutivo'] },

  R1: {
    label: 'Início do florescimento',
    foco_fisiologico: 'Abertura das primeiras flores — crítico para pegamento',
    nutrientes_criticos: [
      { nut: 'B',  peso: 10, razao: 'B para crescimento do tubo polínico e pegamento (fertilização)' },
      { nut: 'Ca', peso: 10, razao: 'Ca para divisão celular no embrião e retenção de flores' },
      { nut: 'Zn', peso: 9, razao: 'Zn para IAA e formação de primórdios reprodutivos' },
      { nut: 'K',  peso: 9, razao: 'K para osmorregulação e transporte de assimilados às flores' },
      { nut: 'Mo', peso: 8, razao: 'Mo para FBN que fornece N para síntese proteica das flores' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'brassinosteroide', 'giberelina', 'aba'],
    vulnerabilidades: ['Temperatura > 35°C aborta flores', 'Seca severa causa aborto floral em massa', 'B insuficiente = sem pegamento'],
    manipulacoes: ['B + Ca + Zn foliar obrigatório', 'Aminoácidos para reduzir estresse', 'Controle de temperatura (irrigação)'],
  },

  R2: {
    label: 'Pleno florescimento',
    foco_fisiologico: 'Florescimento pleno + início de formação de vagens',
    nutrientes_criticos: [
      { nut: 'B',  peso: 10, razao: 'B para pegamento e formação de vagens' },
      { nut: 'Ca', peso: 10, razao: 'Ca para divisão celular nas vagens em formação' },
      { nut: 'K',  peso: 9, razao: 'K para transporte de assimilados às vagens' },
      { nut: 'N',  peso: 9, razao: 'N para síntese proteica nas sementes em formação' },
      { nut: 'Mo', peso: 8, razao: 'Mo para FBN fornecendo N contínuo' },
    ],
    hormonios_ativos: ['auxina', 'citocinina', 'giberelina', 'aba'],
    vulnerabilidades: ['Seca = queda de flores e vagens jovens', 'Temperatura > 35°C = aborto floral'],
    manipulacoes: ['B + Ca + K foliar', 'Mo + aminoácidos', 'Irrigação se necesário'],
  },

  R3: {
    label: 'Início da formação de vagens',
    foco_fisiologico: 'Vagens com 5mm+ — sink forte estabelecido',
    nutrientes_criticos: [
      { nut: 'Ca', peso: 10, razao: 'Ca para parede celular das vagens e sementes em formação' },
      { nut: 'K',  peso: 10, razao: 'K para transporte de sacarose para vagens (acompanha sucrose no floema)' },
      { nut: 'N',  peso: 9, razao: 'N para síntese de proteínas de reserva nas sementes' },
      { nut: 'S',  peso: 8, razao: 'S para aminoácidos sulfurados (metionina, cisteína) nas proteínas de soja' },
      { nut: 'Zn', peso: 7, razao: 'Zn para enzimas de síntese proteica nas sementes' },
    ],
    hormonios_ativos: ['citocinina', 'giberelina', 'auxina', 'aba'],
    vulnerabilidades: ['Seca reduz transporte de K e Ca', 'N insuficiente limita proteína final da soja'],
    manipulacoes: ['K + Ca foliar', 'N foliar (aminoácidos ou ureia)', 'S foliar (tiosulfato)'],
  },

  R4: {
    label: 'Vagens cheias',
    foco_fisiologico: 'Grãos ocupam totalmente a vagem — enchimento de amido e proteína',
    nutrientes_criticos: [
      { nut: 'K',  peso: 10, razao: 'K co-transportado com sacarose no floema (K:sucrose loading)' },
      { nut: 'N',  peso: 10, razao: 'N para síntese de proteínas de reserva (glicinina, β-conglicinina)' },
      { nut: 'S',  peso: 9, razao: 'S para metionina e cisteína nas proteínas de soja (razão N:S = 17:1)' },
      { nut: 'Mg', peso: 8, razao: 'Mg para fotossíntese e exportação de assimilados' },
      { nut: 'P',  peso: 8, razao: 'P para ATP no processo de enchimento ativo de grãos' },
    ],
    hormonios_ativos: ['aba', 'citocinina', 'etileno'],
    vulnerabilidades: ['Seca severa reduz enchimento (grãos chochos)', 'Doença foliar reduz área fotossintética'],
    manipulacoes: ['K foliar (KNO3 ou KCl)', 'N foliar (aminoácidos)', 'Manutenção foliar saudável'],
  },

  R5: {
    label: 'Início do enchimento de grãos',
    foco_fisiologico: 'Acúmulo de proteína e óleo nas sementes',
    nutrientes_criticos: [
      { nut: 'K',  peso: 10, razao: 'K máxima demanda no enchimento' },
      { nut: 'N',  peso: 10, razao: 'N para proteína final' },
      { nut: 'S',  peso: 10, razao: 'S para qualidade proteica (metionina, cisteína)' },
      { nut: 'Mg', peso: 9, razao: 'Mg para fotossíntese residual' },
      { nut: 'P',  peso: 8, razao: 'P para fosfolipídios e ATP' },
    ],
    hormonios_ativos: ['aba', 'etileno'],
    vulnerabilidades: ['Perda antecipada de folhas = grãos chochos', 'K insuficiente = sacarose não enche grãos'],
    manipulacoes: ['K + N foliar', 'Manutenção de área foliar (fungicida)', 'Aminoácidos'],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. RESPOSTAS A ESTRESSE CLIMÁTICO
// ─────────────────────────────────────────────────────────────────────────────

export const STRESS_RESPONSES = {
  seca: {
    limiar_dias: 7,
    limiar_critico: 14,
    resposta_hormonal: ['↑ ABA (fecha estômatos)', '↓ Citocinina (acelera senescência)', '↑ Etileno (abscisão)'],
    impacto_nutricional: {
      K:  'Absorção via fluxo de massa reduzida — deficiência funcional de K',
      Ca: 'Menor fluxo de transpiração = menos Ca chegando às folhas novas (xilema-dependente)',
      N:  'FBN comprometida por déficit de água nos nódulos',
      Mn: 'Menos disponível (oxidado em solo seco)',
      B:  'Mobilidade no solo reduz — menos B disponível',
    },
    recomendacao_geral: 'Aplicação foliar de K + aminoácidos + B + Ca antes ou durante período seco',
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 23',
  },

  calor_extremo: {
    limiar_temp: 32,
    critico_temp: 35,
    resposta_hormonal: ['↑ ABA (proteção)', '↓ Citocinina', '↑ Etileno (abscisão de flores)', '↑ Jasmonatos (defesa)'],
    impacto_nutricional: {
      N:  'FBN inibida acima de 35°C (nitrogenase sensível ao calor)',
      B:  'Pegamento floral comprometido — tubo polínico sensível ao calor',
      Ca: 'Divisão celular reduzida; menor formação de vagens',
      K:  'Fechamento estomático excessivo → reduz absorção hídrica → menor fluxo de massa',
    },
    recomendacao_geral: 'B + Ca + aminoácidos + irrigação para reduzir temperatura foliar',
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26',
  },

  chuva_excessiva: {
    limiar_mm_7d: 80,
    resposta_hormonal: ['↑ Etileno (raízes anaerobiose)', '↓ ABA', '↑ Citocinina radicular'],
    impacto_nutricional: {
      Mn: 'Mn2+ aumenta com encharcamento (redução de Mn4+ → Mn2+ em anaerobiose)',
      Fe: 'Fe2+ aumenta em anaerobiose — risco de toxicidade',
      N:  'Desnitrificação — perda de N-NO3- para atmosfera',
      Mo: 'Lixiviação de Mo em solos arenosos',
      K:  'Lixiviação de K em solos argilosos pouco estruturados',
    },
    recomendacao_geral: 'Monitorar toxicidade de Mn e Fe; repor K e N após período chuvoso',
    fonte_ref: 'Marschner (2012) p.455',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. PROTOCOLOS DE RECOMENDAÇÃO
// ─────────────────────────────────────────────────────────────────────────────

export const RECOMMENDATION_PROTOCOLS = {
  // Por objetivo fisiológico
  enraizamento: {
    objetivo: 'Estimular crescimento e ramificação radicular',
    nutrientes: [
      { nut: 'P',  dose: '30–60 kg/ha P₂O₅ (solo) ou 1–2 kg/ha P foliar MAP', prioridade: 1, razao: 'P é energia (ATP) para crescimento radicular' },
      { nut: 'Zn', dose: '2–5 kg/ha sulfato de Zn (solo) ou 200–400 g/ha foliar', prioridade: 2, razao: 'Zn → IAA → raízes laterais' },
      { nut: 'Ca', dose: '1–2 kg/ha Ca foliar (nitrato de Ca)', prioridade: 3, razao: 'Ca para integridade das células do ápice radicular' },
      { nut: 'B',  dose: '100–300 g/ha B foliar (ácido bórico)', prioridade: 4, razao: 'B para divisão celular e integridade de raízes novas' },
    ],
    bioestimulantes: 'Auxinas exógenas (IBA) + Humates + Co+Mo (nódulos) no tratamento de sementes',
    estagios_aplicacao: ['VE', 'VC', 'V1', 'V2'],
    fonte_ref: 'Sfredo (2008); Taiz & Zeiger (2013) Cap. 19',
  },

  florescimento_pegamento: {
    objetivo: 'Maximizar pegamento de flores e formação de vagens',
    nutrientes: [
      { nut: 'B',  dose: '200–400 g/ha B foliar (ácido bórico 17%)', prioridade: 1, razao: 'B para tubo polínico e fertilização' },
      { nut: 'Ca', dose: '1–2 kg/ha Ca foliar (nitrato de Ca 15% Ca)', prioridade: 2, razao: 'Ca para divisão celular nos embriões' },
      { nut: 'Zn', dose: '300–500 g/ha Zn foliar (sulfato ou EDTA-Zn)', prioridade: 3, razao: 'Zn para IAA e desenvolvimento reprodutivo' },
      { nut: 'Mo', dose: '30–50 g/ha Mo foliar (molibdato de sódio)', prioridade: 4, razao: 'Mo para FBN fornecendo N às flores' },
    ],
    bioestimulantes: 'Aminoácidos (cisteína, prolina) + Brassinolídeo + Poliaminas (espermidina)',
    estagios_aplicacao: ['V5', 'V6', 'R1', 'R2'],
    fonte_ref: 'Embrapa Soja (2013); Marschner (2012) Cap. 11',
  },

  enchimento_graos: {
    objetivo: 'Maximizar enchimento e qualidade de grãos',
    nutrientes: [
      { nut: 'K',  dose: '1–3 kg/ha K foliar (KNO3 ou K₂SO₄)', prioridade: 1, razao: 'K co-transportado com sacarose para grãos' },
      { nut: 'N',  dose: '0.5–1% ureia foliar (2–4 kg/ha) ou 300–500 mL/ha aminoácidos', prioridade: 2, razao: 'N para síntese de proteínas de reserva (glicinina)' },
      { nut: 'S',  dose: '1–2 kg/ha S foliar (tiosulfato de amônio)', prioridade: 3, razao: 'S para metionina e cisteína — qualidade proteica da soja' },
      { nut: 'Mg', dose: '0.5–1 kg/ha Mg foliar (sulfato de Mg)', prioridade: 4, razao: 'Mg para fotossíntese contínua e exportação de assimilados' },
    ],
    bioestimulantes: 'Aminoácidos + Citocitinas exógenas (N6-benzilaminopurina) para manter sink ativo',
    estagios_aplicacao: ['R4', 'R5', 'R5.5'],
    fonte_ref: 'Sfredo (2008); Taiz & Zeiger (2013) Cap. 11',
  },

  reducao_estresse_oxidativo: {
    objetivo: 'Reduzir estresse oxidativo e dano por ROS',
    nutrientes: [
      { nut: 'Zn', dose: '200–400 g/ha Zn foliar', prioridade: 1, razao: 'Zn é componente de Cu/Zn-SOD — principal defesa antioxidante' },
      { nut: 'Cu', dose: '100–200 g/ha Cu foliar', prioridade: 2, razao: 'Cu componente de Cu/Zn-SOD e plastocianina' },
      { nut: 'Mn', dose: '300–500 g/ha Mn foliar', prioridade: 3, razao: 'Mn componente de Mn-SOD mitocondrial' },
      { nut: 'Fe', dose: '500 g/ha Fe-EDTA ou similar', prioridade: 4, razao: 'Fe para catalase (CAT) e peroxidase (POD)' },
    ],
    bioestimulantes: 'Glicina betaína + Prolina + Vitamina E + Extrato de algas (betaínas)',
    estagios_aplicacao: ['V3', 'V4', 'V5', 'R1', 'R2', 'R3'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26; Marschner (2012) Cap. 5',
  },

  equilibrio_vegetativo_reprodutivo: {
    objetivo: 'Equilibrar crescimento vegetativo e reprodutivo na transição',
    nutrientes: [
      { nut: 'K',  dose: '1–2 kg/ha K foliar', prioridade: 1, razao: 'K regula fechamento estomático e balanço hídrico — controla vigor' },
      { nut: 'Ca', dose: '1 kg/ha Ca foliar', prioridade: 2, razao: 'Ca para divisão celular em órgãos reprodutivos' },
      { nut: 'B',  dose: '200 g/ha B foliar', prioridade: 3, razao: 'B para iniciação floral e transporte de auxina' },
    ],
    bioestimulantes: 'Brassinolídeo + Poliaminas (espermidina) + Co para reduzir dominância apical',
    estagios_aplicacao: ['V5', 'V6', 'R1'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 20',
  },

  recuperacao_estresse: {
    objetivo: 'Recuperação rápida após período de estresse',
    nutrientes: [
      { nut: 'N',  dose: '0.5% ureia foliar + 200 mL/ha aminoácidos', prioridade: 1, razao: 'N para rápida síntese de clorofila e proteínas de defesa' },
      { nut: 'K',  dose: '1–2 kg/ha K foliar', prioridade: 2, razao: 'K para restabelecer turgescência e abertura de estômatos' },
      { nut: 'Mg', dose: '500 g–1 kg/ha Mg foliar', prioridade: 3, razao: 'Mg para clorofila — recuperação fotossintética' },
    ],
    bioestimulantes: 'Aminoácidos + Glicina betaína + Extrato de algas + Silício (Si)',
    estagios_aplicacao: ['Qualquer estádio pós-estresse'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26',
  },

  mitigacao_fitotoxicidade: {
    objetivo: 'Reduzir danos por toxicidade de nutriente ou herbicida',
    abordagem: [
      'Identificar o nutriente em excesso e reduzir/suspender aplicação',
      'Calcário dolomítico (eleva pH) — reduz toxicidade de Mn e Fe em solo ácido',
      'Enxofre (reduz pH) — reduz toxicidade de Mo em solo alcalino',
      'Ca foliar — estabiliza membranas danificadas',
      'Aminoácidos + antioxidantes — reduz dano oxidativo secundário',
      'Silício — reduz absorção de Mn e Al tóxicos',
    ],
    nutrientes_antídoto: {
      'Mn tóxico': ['Calagem para pH 6.0', 'Ca foliar', 'Si foliar'],
      'Fe tóxico': ['Drenagem do solo', 'Ca foliar', 'Si foliar'],
      'B tóxico':  ['Irrigação pesada para lixiviar B', 'Ca foliar'],
      'Cu tóxico': ['Calagem', 'Mo foliar', 'Composto orgânico'],
      'Zn excessivo': ['Reduzir aplicações de P', 'Calagem moderada'],
    },
    fonte_ref: 'Marschner (2012) Cap. 10; CQFS RS/SC (2016)',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. ANTIOXIDANTES ENZIMÁTICOS — Componentes nutricionais
// ─────────────────────────────────────────────────────────────────────────────

export const ANTIOXIDANT_ENZYMES = {
  SOD: {
    nome: 'Superóxido Dismutase',
    isozimas: [
      { tipo: 'Cu/Zn-SOD', localizacao: 'Cloroplasto e citossol', nutrientes: ['Cu', 'Zn'] },
      { tipo: 'Mn-SOD',    localizacao: 'Mitocôndria',            nutrientes: ['Mn'] },
      { tipo: 'Fe-SOD',    localizacao: 'Cloroplasto',             nutrientes: ['Fe'] },
    ],
    reacao: 'O₂•⁻ + O₂•⁻ + 2H⁺ → H₂O₂ + O₂',
    importancia: 'Primeira linha de defesa contra ROS',
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26; Marschner (2012) Cap. 5',
  },
  CAT: {
    nome: 'Catalase',
    nutrientes: ['Fe', 'Mn'],
    localizacao: 'Peroxissomo',
    reacao: '2H₂O₂ → 2H₂O + O₂',
    importancia: 'Remove H₂O₂ produzido por SOD e fotorespiration',
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26',
  },
  POD: {
    nome: 'Peroxidase',
    nutrientes: ['Fe', 'Mn', 'Cu'],
    localizacao: 'Parede celular e vacúolos',
    reacao: 'H₂O₂ + substrato redutor → H₂O + substrato oxidado',
    importancia: 'Lignificação, defesa, oxidação de fenólicos',
    fonte_ref: 'Marschner (2012) Cap. 5',
  },
  APOD: {
    nome: 'Ascorbato Peroxidase (APX)',
    nutrientes: ['Fe'],
    localizacao: 'Cloroplasto, citossol',
    reacao: 'H₂O₂ + Ascorbato → 2H₂O + Deidroascorbato',
    importancia: 'Principal defesa antioxidante no cloroplasto — protege fotossíntese',
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. REFERÊNCIAS BIBLIOGRÁFICAS
// ─────────────────────────────────────────────────────────────────────────────

export const BIBLIOGRAPHY = {
  'Marschner (2012)':    'Marschner, P. (Ed.) (2012). Marschner\'s Mineral Nutrition of Higher Plants, 3rd ed. Academic Press, London.',
  'Taiz & Zeiger (2013)': 'Taiz, L. & Zeiger, E. (2013). Plant Physiology, 5th ed. Sinauer Associates, Sunderland.',
  'Malavolta et al. (1997)': 'Malavolta, E., Vitti, G.C. & Oliveira, S.A. (1997). Avaliação do Estado Nutricional das Plantas: Princípios e Aplicações. Potafos, Piracicaba.',
  'Embrapa Soja (2013)': 'Embrapa Soja (2013). Tecnologias de Produção de Soja: Região Central do Brasil 2014. Embrapa, Londrina.',
  'CQFS RS/SC (2016)':   'SBCS/NEPAR (2016). Manual de Calagem e Adubação para os Estados do Rio Grande do Sul e de Santa Catarina. SBCS, Porto Alegre.',
  'Sfredo (2008)':       'Sfredo, G.J. (2008). Soja no Brasil: Calagem e Adubação. Embrapa Soja, Londrina.',
  'Epstein & Bloom (2005)': 'Epstein, E. & Bloom, A.J. (2005). Mineral Nutrition of Plants: Principles and Perspectives. Sinauer Associates.',
}
