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
  'Embrapa Milho (2010)': 'Embrapa Milho e Sorgo (2010). Tecnologias de Produção de Milho. Sete Lagoas: Embrapa.',
  'DuPont Pioneer (2015)': 'DuPont Pioneer (2015). Corn Growth and Development. Pioneer, Johnston, IA.',
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. DEMANDAS FENOLÓGICAS — MILHO (Zea mays L.)
//
// Fontes: DuPont Pioneer (2015); Embrapa Milho e Sorgo (2010);
//         Marschner (2012); Taiz & Zeiger (2013)
// ─────────────────────────────────────────────────────────────────────────────

export const PHENOLOGY_DEMANDS_MILHO = {

  VE: {
    label: 'Emergência — coleóptilo rompe o solo',
    foco_fisiologico: 'Elongação do coleóptilo e mesocótilo via reservas do endosperma; mesocótilo posiciona a coroa a ~2 cm de profundidade; raízes nodais primárias iniciam; luz inibe mesocótilo e fixa posição da coroa',
    nutrientes_criticos: [
      { nut: 'P', peso: 10, razao: 'P essencial para ATP durante elongação do coleóptilo; raízes precisam absorver P imediatamente — endosperma tem reservas limitadas' },
      { nut: 'Zn', peso: 9, razao: 'Zn necessário para síntese de IAA (triptofano sintase) que dirige crescimento radicular; deficiência em VE = mancha branca precoce em V2-V4' },
      { nut: 'Ca', peso: 7, razao: 'Ca estrutural para parede celular das raízes nodais em formação e do coleóptilo em elongação' },
      { nut: 'N', peso: 6, razao: 'N para proteínas foliares da 1ª folha; parcialmente suprido pelo endosperma, mas absorção radicular inicia' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'citocinina'],
    vulnerabilidades: [
      'Solo frio (< 10°C) bloqueia absorção de P e elongação do coleóptilo',
      'Profundidade de plantio > 7.5 cm retarda emergência e aumenta risco de podridão de semente',
      'Compactação superficial impede emergência; crosta superficial pode quebrar o coleóptilo',
      'Déficit hídrico impede imbibição da semente (requer ~30% do peso em água)',
    ],
    manipulacoes: ['Zn no tratamento de sementes (0.5-1.5 g Zn/kg semente)', 'Starter P no sulco (20-30 kg P₂O₅/ha)', 'Plantio a 3.8-5 cm de profundidade', 'Temperatura solo > 10°C no plantio'],
  },

  V1: {
    label: 'V1 — 1ª Folha com Colar Visível',
    foco_fisiologico: 'Primeira folha verdadeira distinguível pela ponta arredondada; raízes nodais iniciando; ponto de crescimento ~2 cm abaixo do solo; raiz seminal ainda ativa',
    nutrientes_criticos: [
      { nut: 'P', peso: 10, razao: 'P máxima demanda por unidade de biomassa — raízes dependentes de P para crescimento e ATP; temperatura < 10°C bloqueia P mesmo com solo adequado' },
      { nut: 'Zn', peso: 9, razao: 'Zn para IAA radicular + prevenção da mancha branca (V2-V4); cerrado = Zn o micronutriente mais limitante no milho' },
      { nut: 'N', peso: 7, razao: 'N para clorofila e proteínas da 1ª folha; demanda cresce rapidamente a partir de V1' },
      { nut: 'K', peso: 6, razao: 'K para osmorregulação e ativação de enzimas iniciais' },
    ],
    hormonios_ativos: ['auxina', 'giberelina', 'citocinina'],
    vulnerabilidades: ['Solo frio bloqueia P mesmo com P adequado', 'Al tóxico impede raízes nodais (pH < 5.0)', 'Zn < 0.5 mg/dm³ solo = risco de mancha branca'],
    manipulacoes: ['Zn no sulco (2-3 kg/ha ZnSO₄)', 'Starter P no sulco', 'Ajustar pH solo para 5.5-6.5'],
  },

  V2: {
    label: 'V2 — Mancha Branca (alerta Zn)',
    foco_fisiologico: 'Raízes nodais crescendo e passando a dominar absorção; raiz seminal ainda ativa; ponto de crescimento abaixo do solo; RISCO DE MANCHA BRANCA se Zn baixo',
    nutrientes_criticos: [
      { nut: 'Zn', peso: 10, razao: 'Zn CRÍTICO — mancha branca (white stripe, faixas esbranquiçadas paralelas à nervura central) = deficiência de Zn; Zn necessário para IAA via triptofano sintase; < 15 mg Zn/kg foliar = deficiência' },
      { nut: 'P', peso: 9, razao: 'P para energia das raízes nodais em rápido desenvolvimento; P alto pode induzir deficiência de Zn por antagonismo (P×Zn)' },
      { nut: 'N', peso: 8, razao: 'N para fotossíntese nas folhas em expansão; plantas dependem de N mineral (milho não faz FBN simbiótica)' },
      { nut: 'K', peso: 7, razao: 'K para turgescência e crescimento; mobilidade alta = sensível a lixiviação em solos arenosos' },
    ],
    hormonios_ativos: ['auxina', 'giberelina', 'brassinoesteroide', 'citocinina'],
    vulnerabilidades: ['Zn foliar < 15 mg/kg = mancha branca com retardo de 2-3 semanas no ciclo', 'P > 40 mg/dm³ solo pode induzir deficiência de Zn (antagonismo P×Zn)', 'pH < 5.5 precipita Zn como Zn₃(PO₄)₂'],
    manipulacoes: ['Zn foliar 300 g Zn/ha em V2 se sintomas visíveis', 'Manutenção do pH solo 5.5-6.5 para disponibilidade de Zn', 'Evitar excesso de P quando Zn solo é marginal'],
  },

  V3: {
    label: 'V3 — Crescimento Vegetativo Inicial',
    foco_fisiologico: 'Ponto de crescimento ainda abaixo do solo; protegido de geada e injúria mecânica; primórdios foliares iniciando nos meristemas; demanda hídrica e nutricional crescendo',
    nutrientes_criticos: [
      { nut: 'N', peso: 9, razao: 'N fotossintético cresce com a área foliar; N mineral do solo essencial — milho sem FBN simbiótica' },
      { nut: 'P', peso: 8, razao: 'P para ATP e DNA nas células em divisão dos meristemas; temperatura solo < 10°C bloqueia P mesmo com solo adequado' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA e crescimento radicular lateral; prevenção de mancha branca' },
      { nut: 'K', peso: 7, razao: 'K para osmorregulação e transporte de assimilados' },
    ],
    hormonios_ativos: ['auxina', 'giberelina', 'brassinoesteroide', 'citocinina'],
    vulnerabilidades: ['Geada severa ainda pode matar o meristema apical abaixo do solo em V1-V5 se T < -2°C prolongado', 'Compactação limita N, P, K, Zn'],
    manipulacoes: ['Adubação de cobertura de N em V3-V4 se solo com baixo teor de MO', 'Zn foliar preventivo se histórico de mancha branca'],
  },

  V4: {
    label: 'V4 — Crescimento Vegetativo Acelerado',
    foco_fisiologico: 'Crescimento vegetativo intenso; raiz seminal completamente inativa; raízes nodais dominam; ponto de crescimento ainda abaixo do solo até ~V5-V6; primórdios de todas as folhas iniciados',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N demanda cresce rapidamente; fotossíntese em expansão; N disponível no solo deve ser garantido antes de V6 (pico de absorção)' },
      { nut: 'K', peso: 8, razao: 'K para osmorregulação, transporte e resistência mecânica do colmo futuro; K é o nutriente mais absorvido em quantidade pelo milho de alta produção' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA e crescimento radicular; última oportunidade eficiente de aplicação foliar de Zn antes de V6' },
      { nut: 'Mg', peso: 7, razao: 'Mg para clorofila em expansão; demanda cresce com área foliar' },
      { nut: 'S', peso: 6, razao: 'S para aminoácidos sulfurados (metionina, cisteína) em proteínas foliares' },
    ],
    hormonios_ativos: ['auxina', 'giberelina', 'brassinoesteroide', 'citocinina'],
    vulnerabilidades: ['Déficit hídrico em V4-V5 compromete absorção de K', 'Calor > 35°C por vários dias reduz eficiência de N'],
    manipulacoes: ['Zn foliar (última chance eficiente) se < 20 mg Zn/kg foliar', 'Manutenção de N disponível no solo para V6', 'Mg foliar se solo arenoso com K/Mg > 5'],
  },

  V5: {
    label: 'V5 — Pré-Crescimento Rápido',
    foco_fisiologico: 'Raízes escora (brace roots) emergindo nos nós acima do solo; ponto de crescimento prestes a emergir acima do solo; todas as folhas e espigas potenciais iniciadas neste período',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N para fotossíntese e proteínas; absorção de N escala rapidamente rumo ao pico em V6-V12' },
      { nut: 'K', peso: 9, razao: 'K para elongação de internós (iminente a partir de V6); qualidade do colmo = resistência ao acamamento' },
      { nut: 'Zn', peso: 8, razao: 'Zn crítico — última chance de correção foliar antes da fase vegetativa intensa' },
      { nut: 'Ca', peso: 7, razao: 'Ca para raízes escora em formação e divisão celular do meristema apical' },
      { nut: 'Mg', peso: 7, razao: 'Mg para clorofila; área foliar máxima se aproximando' },
    ],
    hormonios_ativos: ['auxina', 'giberelina', 'brassinoesteroide', 'citocinina'],
    vulnerabilidades: ['Compactação limita raízes escora (brace roots)', 'Zn < 15 mg/kg = impacto residual na espiga futura'],
    manipulacoes: ['Adubação de cobertura N em V4-V6 (principal janela)', 'Zn foliar preventivo', 'K solo se K < 90 mg/dm³'],
  },

  V6: {
    label: 'V6 — Ponto de Crescimento Acima do Solo',
    foco_fisiologico: 'MARCO CRÍTICO: ponto de crescimento emerge acima do solo (~V6); planta agora vulnerável a injúrias mecânicas, granizo e geada; elongação intensa de internós; N absorção escala para >50% do total do ciclo a partir daqui',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N FASE CRÍTICA — >60% do N total do ciclo é absorvido entre V6-R1; topdress de N deve estar no solo por V6; N insuficiente aqui = redução permanente de produtividade' },
      { nut: 'K', peso: 9, razao: 'K para elongação de internós (V6-VT = período de máxima absorção de K); K essencial para qualidade do colmo e resistência ao acamamento' },
      { nut: 'Mg', peso: 8, razao: 'Mg para clorofila em área foliar máxima; Mg co-fator de Rubisco em C4; K alto pode antagonizar Mg' },
      { nut: 'S', peso: 8, razao: 'S para proteínas (metionina, cisteína) e nitrato redutase; razão N:S deve ser ≤17:1 para síntese proteica eficiente' },
      { nut: 'Zn', peso: 7, razao: 'Zn para IAA e produtividade do pendão; última janela de alta eficiência foliar' },
      { nut: 'B', peso: 7, razao: 'B para divisão celular no meristema agora exposto; prevenção de problemas no pendão futuro' },
    ],
    hormonios_ativos: ['auxina', 'giberelina', 'citocinina', 'brassinoesteroide'],
    vulnerabilidades: [
      'Ponto de crescimento exposto = granizo, geada e equipamentos podem destruir a planta',
      'Topdress de N atrasado após V6 = perda de eficiência de 20-30%',
      'Déficit hídrico em V6-V10 = maior impacto em produtividade',
    ],
    manipulacoes: ['Topdress de N em V4-V6 (obrigatório antes de V8)', 'K + Mg foliar se solo arenoso', 'S foliar ou solo se S < 10 mg/dm³', 'B preventivo (primeiros sinais do pendão)'],
  },

  V7: {
    label: 'V7 — Definição do Número de Fileiras da Espiga',
    foco_fisiologico: 'ESTÁDIO MAIS CRÍTICO PARA NÚMERO DE FILEIRAS: divisões celulares na circunferência do primórdio da espiga determinam o número de fileiras (sempre par: 12-20); número definido em ~V7 e NÃO pode ser aumentado depois; estresse severo aqui = perda permanente de fileiras',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N ESSENCIAL — N insuficiente em V7 reduz número de fileiras permanentemente; N para divisão celular meristemática na espiga primária' },
      { nut: 'K', peso: 9, razao: 'K para osmorregulação das células em divisão; K transporta assimilados para o meristema da espiga' },
      { nut: 'Zn', peso: 9, razao: 'Zn para IAA que coordena divisão celular; Zn < 15 mg/kg foliar em V7 = menos fileiras e menos grãos por fileira' },
      { nut: 'Ca', peso: 8, razao: 'Ca para paredes celulares das células em divisão na espiga; Ca participa da sinalização de divisão celular' },
      { nut: 'Mg', peso: 7, razao: 'Mg para fotossíntese e fornecimento de assimilados para os meristemas reprodutivos' },
    ],
    hormonios_ativos: ['citocinina', 'auxina', 'giberelina'],
    vulnerabilidades: [
      'ESTRESSE DE N, K, SECA OU CALOR EM V7 = redução permanente de fileiras na espiga',
      'Herbicidas em V7 podem causar malformação da espiga',
      'Granizo destrói folhas que alimentam meristema da espiga',
    ],
    manipulacoes: ['N disponível no solo — verificar se topdress foi aplicado', 'K solo adequado (> 120 mg/dm³)', 'Zn foliar se < 20 mg Zn/kg foliar', 'Irrigação para evitar seca em V7-V10'],
  },

  V8: {
    label: 'V8 — Início da Definição de Grãos por Fileira',
    foco_fisiologico: 'Número de fileiras definido; início da determinação do número de grãos por fileira; espiga primária visível em dissecção; taxa de crescimento da planta próxima ao máximo; internós se elongando visivelmente',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N para divisão celular dos óvulos da espiga (= futuros grãos); N insuficiente = menos grãos por fileira' },
      { nut: 'K', peso: 9, razao: 'K absorção no pico — K máximo entre V6-VT; elongação de internós depende de K; qualidade do colmo' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA nos meristemas reprodutivos; Zn = cofator de enzimas de divisão celular' },
      { nut: 'B', peso: 8, razao: 'B para divisão celular no meristema; prevenção antecipada de problemas no pendão e espiga' },
      { nut: 'S', peso: 7, razao: 'S para proteínas e atividade de nitrato redutase; razão N:S ideal 15-17:1' },
    ],
    hormonios_ativos: ['citocinina', 'giberelina', 'auxina', 'brassinoesteroide'],
    vulnerabilidades: ['Déficit hídrico em V8-V10 = impacto direto em grãos por fileira', 'N insuficiente = menos grãos permanentemente'],
    manipulacoes: ['Verificar disponibilidade de N no solo', 'B + Zn foliar preventivo', 'K solo > 120 mg/dm³'],
  },

  V9: {
    label: 'V9 — Primórdio da Espiga Visível',
    foco_fisiologico: 'Espiga primária visível em dissecção (~5-7 cm); elongação máxima de internós; máxima taxa de crescimento diário; nó de raízes escora visíveis acima do solo',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N absorção máxima — V6-R1 = período de maior absorção de N; N para todos os meristemas ativos' },
      { nut: 'K', peso: 10, razao: 'K absorção ainda em pico; K para qualidade do colmo (resistência ao acamamento) e elongação de internós' },
      { nut: 'S', peso: 8, razao: 'S para proteínas e enzimas de assimilação de N (nitrato redutase + glutamina sintetase)' },
      { nut: 'Mg', peso: 8, razao: 'Mg para fotossíntese C4 em alta atividade; Mg co-fator da Rubisco e ATP-sintase' },
      { nut: 'Mn', peso: 7, razao: 'Mn para PSII (oxidação da água) em C4 — fotossíntese de alta eficiência requer Mn' },
    ],
    hormonios_ativos: ['citocinina', 'auxina', 'giberelina'],
    vulnerabilidades: ['Seca severa em V9-V12 = maior impacto em rendimento de qualquer período vegetativo'],
    manipulacoes: ['N foliar urgente se deficiência visual', 'K + Mg foliar preventivo', 'S solo ou foliar'],
  },

  V10: {
    label: 'V10 — Crescimento Rápido de Internós',
    foco_fisiologico: 'Elongação intensa de internós centrais; planta pode crescer 8-12 cm/dia; comprimento da espiga sendo determinado; lignificação dos internós basais iniciando',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N absorção em pico máximo — máximo fluxo de N para todos os tecidos; topdress de N deve estar no solo' },
      { nut: 'K', peso: 9, razao: 'K para elongação e espessamento dos internós; lignificação da parede celular depende de K' },
      { nut: 'Ca', peso: 8, razao: 'Ca para parede celular dos internós em elongação rápida; Ca para divisão celular na espiga em crescimento' },
      { nut: 'S', peso: 8, razao: 'S para atividade de nitrato redutase e síntese proteica; S crítico junto com N para síntese eficiente' },
      { nut: 'Mg', peso: 7, razao: 'Mg para fotossíntese; alta área foliar = alta demanda de Mg para clorofila' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'citocinina', 'brassinoesteroide'],
    vulnerabilidades: ['Seca em V10-VT = maior impacto em rendimento (crítico)', 'N insuficiente aqui = clorose internerval imediata'],
    manipulacoes: ['N foliar emergencial se clorose visível (ureia 0.5%)', 'K + Ca + Mg foliar preventivo', 'B foliar antecipando VT-R1'],
  },

  V11: {
    label: 'V11 — Máxima Taxa de Crescimento',
    foco_fisiologico: 'Máxima taxa de crescimento diário da planta; internós medianos em elongação máxima; pendão iniciando formação completa; comprimento da espiga em definição final',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N para fotossíntese em IAF máximo e síntese de proteínas enzimáticas' },
      { nut: 'K', peso: 9, razao: 'K absorção ainda alta; K para qualidade do colmo e transporte de sacarose' },
      { nut: 'B', peso: 9, razao: 'B CRÍTICO PREVENTIVO — pendão em formação; B para tubo polínico e divisão celular; deficiência agora = falha na polinização em VT' },
      { nut: 'Ca', peso: 8, razao: 'Ca para parede celular do pendão em formação e divisão celular na espiga' },
      { nut: 'S', peso: 8, razao: 'S para zeínas (proteínas do endosperma do milho) já em síntese preparatória' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'brassinoesteroide'],
    vulnerabilidades: ['B insuficiente aqui = falha de polinização inevitável em VT-R1', 'Seca em V11-VT = aborto de grãos na base da espiga'],
    manipulacoes: ['B + Ca + Zn foliar obrigatório (aplique antes de VT)', 'K + N foliar se necessário', 'Irrigação preventiva antes de VT'],
  },

  V12: {
    label: 'V12 — Primórdios Florais na Espiga',
    foco_fisiologico: 'Primórdios florais femininos (óvulos) visíveis na espiga em dissecção; número final de grãos por fileira próximo do definitivo; elongação do pedúnculo da espiga iniciando',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N para síntese de proteínas nos primórdios florais; N ainda em absorção intensa' },
      { nut: 'K', peso: 9, razao: 'K para transporte de assimilados para a espiga em diferenciação' },
      { nut: 'B', peso: 9, razao: 'B OBRIGATÓRIO — divisão celular nos primórdios florais; B para integridade da parede celular das células-mãe dos óvulos' },
      { nut: 'Ca', peso: 9, razao: 'Ca para divisão celular nos primórdios florais; Ca para formação de Ca-pectato nas paredes' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA dos primórdios reprodutivos e viabilidade futura do pólen' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'citocinina', 'brassinoesteroide'],
    vulnerabilidades: ['B deficiente aqui = flores femininas malformadas = menos fertilização em R1'],
    manipulacoes: ['B + Ca + Zn foliar (última aplicação antes de VT)', 'N disponível no solo'],
  },

  V13: {
    label: 'V13 — Comprimento Final da Espiga',
    foco_fisiologico: 'COMPRIMENTO DA ESPIGA (= nº de grãos por fileira) sendo definido nas últimas semanas antes do pendoamento; pedúnculo da espiga em elongação; silk (estigmas) em desenvolvimento',
    nutrientes_criticos: [
      { nut: 'N', peso: 10, razao: 'N para desenvolvimento dos silk (estigmas) que devem estar funcionais em R1' },
      { nut: 'B', peso: 10, razao: 'B CRÍTICO — silk em desenvolvimento; B para crescimento do estigma e do canal que o grão de pólen deve percorrer' },
      { nut: 'K', peso: 9, razao: 'K para elongação da espiga e transporte de assimilados' },
      { nut: 'Ca', peso: 9, razao: 'Ca para divisão celular dos silk; Ca-pectato estrutura o canal do estigma' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA dos silk e viabilidade do pólen que está sendo formado no pendão' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'brassinoesteroide'],
    vulnerabilidades: ['Temperatura > 35°C por 3+ dias = desenvolvimento de silk comprometido', 'B insuficiente = silk não receptivo em R1'],
    manipulacoes: ['B + Ca + Zn foliar (aplicar antes de VT)', 'Irrigação para evitar seca e calor extremo'],
  },

  V14: {
    label: 'V14 — Pré-Pendoamento',
    foco_fisiologico: 'Pendão quase completamente desenvolvido internamente; silk (estigmas) próximos de emergir; elongação dos últimos internós antes do pendoamento; planta próxima da altura final',
    nutrientes_criticos: [
      { nut: 'N', peso: 9, razao: 'N absorção ainda ativa — grãos de pólen em formação no pendão requerem N para proteínas' },
      { nut: 'B', peso: 10, razao: 'B OBRIGATÓRIO — grãos de pólen em formação; B essencial para viabilidade do pólen e fertilização; deficiência de B = pólen inviável' },
      { nut: 'K', peso: 9, razao: 'K para elongação final dos internós e posicionamento correto do pendão acima da espiga' },
      { nut: 'Ca', peso: 8, razao: 'Ca para divisão celular no pendão e espiga' },
      { nut: 'Zn', peso: 8, razao: 'Zn para viabilidade do pólen (IAA na maturação do grão de pólen)' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'etileno'],
    vulnerabilidades: ['Seca aqui = silk atrasado = falha de sincronia com liberação de pólen (NICK comprometido)', 'B < 20 mg/kg foliar = risco de falha de polinização'],
    manipulacoes: ['Última aplicação de B + Ca + Zn se não fez antes', 'Irrigação para sincronismo VT-R1', 'Monitorar relação Ca:Mg:K no solo'],
  },

  V15: {
    label: 'V15 — Emergência do Pendão',
    foco_fisiologico: 'Pendão emergindo ou já emergido; elongação do caule quase completa; silk prestes a emergir; início da liberação de pólen em 1-3 dias',
    nutrientes_criticos: [
      { nut: 'B', peso: 10, razao: 'B para viabilidade do pólen e receptividade do silk; deficiência aqui = comprometimento direto da fertilização' },
      { nut: 'N', peso: 9, razao: 'N para síntese de proteínas do grão de pólen (> 1 milhão/planta); N suficiente = pólen mais viável' },
      { nut: 'K', peso: 9, razao: 'K para osmorregulação do grão de pólen; K essencial para germinação do tubo polínico' },
      { nut: 'Ca', peso: 9, razao: 'Ca para integridade do grão de pólen e do canal do estigma; Ca-pectato no estigma é essencial para adesão do pólen' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA na fertilização e desenvolvimento inicial do endosperma' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'etileno'],
    vulnerabilidades: ['Temperatura > 35°C inibe germinação do grão de pólen (vida do pólen = 20 min)', 'Seca severa = desidratação dos silk = silk não receptivo'],
    manipulacoes: ['Irrigação para temperatura foliar < 32°C', 'B foliar emergencial se não aplicado antes'],
  },

  V16: {
    label: 'V16 — Pendão Pleno / Silk Emergindo',
    foco_fisiologico: 'Pendão completamente expandido; início da liberação de pólen; silk emergindo pela palha da espiga; plena altura atingida',
    nutrientes_criticos: [
      { nut: 'B', peso: 10, razao: 'B para tubo polínico percorrer o estigma até o óvulo (~20-30 cm); B deficiente = tubo polínico não completa o percurso = não fertiliza' },
      { nut: 'Ca', peso: 10, razao: 'Ca para adesão do grão de pólen ao estigma e crescimento do tubo polínico' },
      { nut: 'K', peso: 9, razao: 'K para germinação do grão de pólen e crescimento do tubo polínico' },
      { nut: 'N', peso: 9, razao: 'N para proteínas do pólen e do embrião em formação' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA que previne aborto precoce após fertilização' },
    ],
    hormonios_ativos: ['giberelina', 'auxina', 'etileno'],
    vulnerabilidades: ['Esta semana = MAIS CRÍTICA do ciclo do milho', 'Temperatura > 35°C = inibe germinação do pólen', 'Seca = desseca o silk = falha de fertilização'],
    manipulacoes: ['Irrigação imediata se solo seco', 'Nenhuma intervenção que estresse a planta (defensivos com efeito fitotóxico)'],
  },

  VT: {
    label: 'VT — Pendoamento e Liberação de Pólen',
    foco_fisiologico: 'Último ramo do pendão emergido e estendido; pico de liberação de pólen = meio da manhã; >1 milhão grãos de pólen/planta; vida do pólen = ~20 min; alcance = 6-15 m; ~97% dos grãos fertilizados por pólen de outra planta',
    nutrientes_criticos: [
      { nut: 'B', peso: 10, razao: 'B ABSOLUTAMENTE CRÍTICO — crescimento do tubo polínico (20-30 cm de comprimento) depende de B; sem B = tubo não completa o percurso = sem fertilização' },
      { nut: 'Ca', peso: 10, razao: 'Ca para adesão e reconhecimento do pólen pelo estigma; Ca-pectato no estigma permite a fertilização' },
      { nut: 'N', peso: 9, razao: 'N para produção de > 1 milhão de grãos de pólen por planta; N foliar suficiente = maior viabilidade do pólen' },
      { nut: 'K', peso: 9, razao: 'K para osmorregulação do grão de pólen; K essencial para que o grão de pólen gérmine no estigma úmido' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA — previne aborto precoce dos grãos fertilizados; Zn para viabilidade do pólen via triptofano sintase' },
      { nut: 'Mo', peso: 7, razao: 'Mo para nitrato redutase — assimilação de N mineral para síntese de proteínas do pólen' },
    ],
    hormonios_ativos: ['auxina', 'etileno', 'giberelina'],
    vulnerabilidades: [
      'Temperatura > 35°C inibe germinação do grão de pólen (crítico)',
      'Seca severa = dessecação dos silk = silk não receptivo antes do pólen cair',
      'Chuva contínua impede liberação e transporte de pólen',
      'NICK comprometido (assincronia pendão-silk) = espiga incompleta permanente',
    ],
    manipulacoes: ['Irrigação para manter temperatura foliar < 32°C', 'EVITAR aplicação de produtos fitotóxicos', 'Monitorar NICK — silk deve emergir 1-2 dias antes do pico de pólen'],
  },

  R1: {
    label: 'R1 — Silking — Fertilização',
    foco_fisiologico: 'PERÍODO MAIS CRÍTICO DO CICLO: silk emergem ao longo de 3-5 dias (base → ponta da espiga); grão de pólen pousa no estigma → forma tubo polínico em 24h → fertiliza o óvulo → grain set; 2 semanas após R1 = máxima sensibilidade a aborto de grãos',
    nutrientes_criticos: [
      { nut: 'B', peso: 10, razao: 'B OBRIGATÓRIO — tubo polínico cresce pelo canal do estigma até o óvulo (~20-30 cm); sem B = tubo não completa o percurso = grain gap (posição vaga) na espiga' },
      { nut: 'Ca', peso: 10, razao: 'Ca para reconhecimento e adesão do pólen no silk; Ca sinaliza início de divisão celular no óvulo fertilizado; Ca para embrião em formação' },
      { nut: 'K', peso: 9, razao: 'K para transporte de assimilados da planta para a espiga em fertilização; K para manter turgescência do silk receptivo' },
      { nut: 'N', peso: 9, razao: 'N para proteínas do embrião em divisão; N insuficiente = menos grãos fertilizados = grain gaps' },
      { nut: 'Zn', peso: 8, razao: 'Zn para IAA que PREVINE ABORTO DOS GRÃOS RECÉM FERTILIZADOS; Zn foliar foliar em R1 aumenta grain set em condições de estresse' },
    ],
    hormonios_ativos: ['citocinina', 'auxina', 'brassinoesteroide'],
    vulnerabilidades: [
      'Temperatura > 35°C em R1 = aborto de grãos mesmo com fertilização correta',
      'Seca em R1 = silk dessecam antes do pólen = grain gaps na ponta da espiga',
      '2 semanas após R1 = MÁXIMO RISCO de aborto de grãos: qualquer estresse severo = grãos chochos',
      'B insuficiente = grain gaps distribuídos em toda a espiga',
    ],
    manipulacoes: ['Irrigação PRIORITÁRIA em R1', 'B + Ca + Zn foliar se não aplicado', 'Aminoácidos para reduzir estresse térmico'],
  },

  R2: {
    label: 'R2 — Blister (85% umidade)',
    foco_fisiologico: 'Blister (10-14 dias após R1): grãos com 85% umidade; endosperma claro; comprimento máximo da espiga atingido; aborto de grãos ainda possível (grãos da ponta abortam primeiro); divisão celular intensa no endosperma',
    nutrientes_criticos: [
      { nut: 'K', peso: 10, razao: 'K para transporte de sacarose pelo floema até os grãos; K co-transportado com sacarose (symporter K⁺/H⁺-sucrose); K insuficiente = enchimento lento = grãos leves' },
      { nut: 'N', peso: 9, razao: 'N para síntese de proteínas do endosperma (zeínas, glutelinas); N para divisão celular intensa no endosperma' },
      { nut: 'S', peso: 8, razao: 'S para zeínas ricas em cisteína/metionina (15% das proteínas do endosperma); razão N:S = 15-17:1 para qualidade proteica' },
      { nut: 'Mg', peso: 8, razao: 'Mg para fotossíntese — área foliar ainda ativa exporta assimilados para os grãos' },
      { nut: 'Ca', peso: 7, razao: 'Ca para divisão celular no endosperma; aborto de grãos ainda possível' },
    ],
    hormonios_ativos: ['citocinina', 'aba', 'auxina'],
    vulnerabilidades: ['Aborto de grãos ainda possível com estresse severo', 'Seca reduz transporte de sacarose para os grãos'],
    manipulacoes: ['K + N + Mg foliar se deficiência visual', 'Manutenção de área foliar saudável (fungicida se necessário)', 'Irrigação para evitar déficit'],
  },

  R3: {
    label: 'R3 — Milk (80% umidade)',
    foco_fisiologico: 'Milk (18-22 dias após R1): grãos com 80% umidade; fluido leitoso branco = amido em suspensão no endosperma; cor final do grão visível (amarelo, branco); embrião distinguível; aborto ainda possível (mas raro)',
    nutrientes_criticos: [
      { nut: 'K', peso: 10, razao: 'K máxima demanda para transporte de sacarose para grãos; K co-transportado com sucrose no floema; K absorção em pico máximo do ciclo reprodutivo' },
      { nut: 'N', peso: 9, razao: 'N para síntese de zeínas e glutelinas no endosperma; N via remobilização foliar começa a contribuir' },
      { nut: 'S', peso: 8, razao: 'S para zeínas sulfuradas — qualidade proteica e valor nutricional do grão' },
      { nut: 'Mg', peso: 8, razao: 'Mg para fotossíntese residual e exportação de Mg-sacarose pelo floema para os grãos' },
      { nut: 'P', peso: 7, razao: 'P para ATP no enchimento ativo; P componente do fitato no endosperma' },
    ],
    hormonios_ativos: ['citocinina', 'aba', 'auxina'],
    vulnerabilidades: ['Perda de área foliar (doenças, granizo) = grãos chochos', 'Seca severa = transporte de sacarose reduzido'],
    manipulacoes: ['K + N foliar se deficiência', 'Proteção foliar (fungicida para maximizar área foliar até R5)', 'Irrigação'],
  },

  R4: {
    label: 'R4 — Dough (70% umidade)',
    foco_fisiologico: 'Dough (24-28 dias após R1): grãos com 70% umidade, consistência pastosa; ~50% do peso seco final acumulado; cor do sabugo visível; folhas externas da palha começam a escurecer; estresse reduz amido acumulado mas não causa aborto',
    nutrientes_criticos: [
      { nut: 'K', peso: 10, razao: 'K MÁXIMA DEMANDA ACUMULADA — K co-transportado com sacarose; K regula síntese de amido via ativação de ADP-glicose pirofosforilase' },
      { nut: 'N', peso: 9, razao: 'N para síntese de zeínas finais; N de remobilização foliar agora domina sobre absorção radicular' },
      { nut: 'S', peso: 8, razao: 'S para aminoácidos sulfurados das zeínas; qualidade proteica do grão definida nesta fase' },
      { nut: 'Mg', peso: 7, razao: 'Mg para fotossíntese residual; Mg remobilizado das folhas velhas para os grãos' },
    ],
    hormonios_ativos: ['aba', 'citocinina'],
    vulnerabilidades: ['Estresse reduz peso de grão (não aborto)', 'Doença foliar = menor fotossíntese = grão mais leve'],
    manipulacoes: ['K foliar se deficiência visual', 'Manutenção de área foliar saudável', 'Irrigação para manter turgor das folhas'],
  },

  R5: {
    label: 'R5 — Dent — Milk Line Avançando',
    foco_fisiologico: 'Dent (35-42 dias após R1): amido duro externo + núcleo mole; "dent" quando núcleo perde umidade; milk line avança da coroa para a base; R5.5 (½ milk line) = 90% da MS final; 35-55% umidade; estresse reduz peso mas não aborta',
    nutrientes_criticos: [
      { nut: 'K', peso: 9, razao: 'K ainda transporta sacarose residual para o grão em finalização do amido duro externo' },
      { nut: 'N', peso: 8, razao: 'N de remobilização foliar — folhas exportam N para proteínas finais do grão' },
      { nut: 'Mg', peso: 7, razao: 'Mg remobilizado das clorofilas foliares para os grãos; senescência foliar programada libera Mg' },
      { nut: 'S', peso: 7, razao: 'S residual para zeínas finais e para proteínas do embrião' },
    ],
    hormonios_ativos: ['aba', 'etileno'],
    vulnerabilidades: ['Perda antecipada de folhas = grão mais leve e menor qualidade', 'Seca severa = milk line para de avançar temporariamente'],
    manipulacoes: ['Manutenção de área foliar saudável (último fungicida se IAF ainda ativo)', 'Sem intervenção nutricional urgente nesta fase'],
  },

  R6: {
    label: 'R6 — Maturidade Fisiológica — Camada Negra',
    foco_fisiologico: 'Maturidade fisiológica (60-65 dias após R1): ~35% umidade; milk line chega à base; camada negra (black layer) forma na ponta do grão → impede entrada/saída de amido; peso seco máximo; senescência total do colmo; colheita quando 15-18% umidade',
    nutrientes_criticos: [
      { nut: 'K', peso: 5, razao: 'K absorção encerrada; K no grão já depositado; K residual nos resíduos culturais (baixa exportação de K)' },
      { nut: 'N', peso: 5, razao: 'N remobilização foliar concluída; N no grão (proteína) determinado; N de adubo não mais disponível para o grão' },
    ],
    hormonios_ativos: ['aba', 'etileno'],
    vulnerabilidades: ['Senescência prematura do colmo = colheita precoce forçada', 'Geada antes da black layer = redução de MS final'],
    manipulacoes: ['Monitorar umidade para colheita no momento correto', 'Sem intervenção agronômica efetiva após black layer'],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. PERFIS DE PRODUTIVIDADE — MILHO (100 a 350 sc/ha)
//
// Referência base: Embrapa Milho e Sorgo (2010) para 8 t/ha (~133 sc/ha):
//   N=144 kg/ha extraído (18 kg/t), P₂O₅=65 (8.1/t), K₂O=180 (22.5/t)
//   Ca=32 (4/t), Mg=22 (2.75/t), S=16 (2/t)
//   Zn=280 g/ha (35 g/t), B=100 g/ha (12.5 g/t)
// ─────────────────────────────────────────────────────────────────────────────

export const CORN_PRODUCTIVITY_PROFILES = {
  100: {
    meta_sc: 100, meta_kg: 6000,
    populacao_ideal: '55.000–62.000 plantas/ha',
    exigencia_hidrica_mm: '450–550 mm (boa distribuição)',
    extracao: { N: 108, P2O5: 49, K2O: 135, Ca: 24, Mg: 17, S: 12, Zn: 210, B: 75 },
    exportacao: { N: 90, P2O5: 41, K2O: 22, Ca: 8, Mg: 10, S: 8 },
    n_total_recomendado: '90–120 kg N/ha (plantio + cobertura)',
    estrategia: 'Solo com boa fertilidade residual; variedades simples ou híbrido duplo; sem irrigação; adubação de manutenção padrão; 1-2 aplicações foliares de micronutrientes',
    nivel: 'Média nacional',
  },
  120: {
    meta_sc: 120, meta_kg: 7200,
    populacao_ideal: '58.000–65.000 plantas/ha',
    exigencia_hidrica_mm: '500–600 mm',
    extracao: { N: 130, P2O5: 58, K2O: 162, Ca: 29, Mg: 20, S: 14, Zn: 252, B: 90 },
    exportacao: { N: 108, P2O5: 50, K2O: 26, Ca: 10, Mg: 12, S: 10 },
    n_total_recomendado: '110–140 kg N/ha',
    estrategia: 'Híbrido simples; solo com V% 60-70%; K solo > 100 mg/dm³; 2 aplicações foliares preventivas; Zn no sulco; controle de doenças folha',
    nivel: 'Boa produtividade',
  },
  150: {
    meta_sc: 150, meta_kg: 9000,
    populacao_ideal: '60.000–68.000 plantas/ha',
    exigencia_hidrica_mm: '550–650 mm',
    extracao: { N: 162, P2O5: 73, K2O: 203, Ca: 36, Mg: 25, S: 18, Zn: 315, B: 113 },
    exportacao: { N: 135, P2O5: 62, K2O: 32, Ca: 12, Mg: 14, S: 12 },
    n_total_recomendado: '140–170 kg N/ha (cobertura parcelada V4-V8)',
    estrategia: 'Híbrido simples de alto potencial; calagem para V% 68-72%; K+Mg+S no sulco; B+Ca+Zn foliar em V8-V10 e VT-R1; controle de doenças + proteção da área foliar até R4',
    nivel: 'Alta produtividade',
  },
  180: {
    meta_sc: 180, meta_kg: 10800,
    populacao_ideal: '65.000–72.000 plantas/ha',
    exigencia_hidrica_mm: '600–700 mm (ou complementação por irrigação)',
    extracao: { N: 194, P2O5: 87, K2O: 243, Ca: 43, Mg: 30, S: 22, Zn: 378, B: 135 },
    exportacao: { N: 162, P2O5: 74, K2O: 38, Ca: 14, Mg: 16, S: 14 },
    n_total_recomendado: '170–210 kg N/ha (parcelado em 3 aplicações)',
    estrategia: 'Híbrido com resistência a doenças + alto potencial; V% ≥ 70%; P+K+Ca+Mg+S+Zn+B corrigidos; N parcelado (semeadura + V4 + V8); irrigação suplementar em VT-R1; 3 aplicações foliares de micronutrientes',
    nivel: 'Muito alta produtividade',
  },
  200: {
    meta_sc: 200, meta_kg: 12000,
    populacao_ideal: '68.000–78.000 plantas/ha',
    exigencia_hidrica_mm: '650–750 mm (irrigação necessária em veranicos)',
    extracao: { N: 216, P2O5: 97, K2O: 270, Ca: 48, Mg: 33, S: 24, Zn: 420, B: 150 },
    exportacao: { N: 180, P2O5: 83, K2O: 43, Ca: 16, Mg: 18, S: 16 },
    n_total_recomendado: '200–240 kg N/ha (3-4 parcelamentos)',
    estrategia: 'Sistema de alta performance: híbrido de ponta + irrigação suplementar + solo com V% ≥ 72% + P alto + K alto + micronutrientes corrigidos; protocolo nutricional completo com foliares de micronutrientes em V4, V8, V12, VT-R1; MIP integrado; colheita monitorada',
    nivel: 'Elite — alta performance',
  },
  250: {
    meta_sc: 250, meta_kg: 15000,
    populacao_ideal: '72.000–82.000 plantas/ha',
    exigencia_hidrica_mm: '750–900 mm (irrigação ou chuvas bem distribuídas)',
    extracao: { N: 270, P2O5: 122, K2O: 338, Ca: 60, Mg: 41, S: 30, Zn: 525, B: 188 },
    exportacao: { N: 225, P2O5: 104, K2O: 54, Ca: 20, Mg: 23, S: 20 },
    n_total_recomendado: '250–300 kg N/ha (inibidor de urease + parcelamento cuidadoso)',
    estrategia: 'Gestão integrada de alto nível: irrigação controlada; nutrição baseada em análise foliar; foliares regulares (V4, V8, V12, VT, R1, R2-R3); micronutrientes via solo+foliar; NBPT na ureia; monitoramento de SPAD; híbrido com stay-green; manejo de pragas e doenças rigoroso',
    nivel: 'Competitivo nacional',
  },
  300: {
    meta_sc: 300, meta_kg: 18000,
    populacao_ideal: '78.000–88.000 plantas/ha',
    exigencia_hidrica_mm: '900–1100 mm (irrigação completa recomendada)',
    extracao: { N: 324, P2O5: 146, K2O: 405, Ca: 72, Mg: 50, S: 36, Zn: 630, B: 225 },
    exportacao: { N: 270, P2O5: 124, K2O: 65, Ca: 24, Mg: 28, S: 24 },
    n_total_recomendado: '300–360 kg N/ha (ureia+NBPT parcelada 4-5× ou fertirrigação)',
    estrategia: 'Produção de altíssima performance: irrigação por gotejamento ou pivô; fertirrigação de N e K; análise foliar quinzenal; manejo hormonal (bioestimulantes em V6, VT, R1); micronutrientes em solo+foliar+fertirrigação; variedade de elite stay-green; IPM; colheita mecânica precisa',
    nivel: 'Safra recorde regional',
  },
  350: {
    meta_sc: 350, meta_kg: 21000,
    populacao_ideal: '82.000–95.000 plantas/ha',
    exigencia_hidrica_mm: '1.100–1.300 mm (irrigação total precisa)',
    extracao: { N: 378, P2O5: 170, K2O: 473, Ca: 84, Mg: 58, S: 42, Zn: 735, B: 263 },
    exportacao: { N: 315, P2O5: 145, K2O: 76, Ca: 28, Mg: 33, S: 28 },
    n_total_recomendado: '380–450 kg N/ha (fertirrigação ou N-parcelado 5-6× com inibidores)',
    estrategia: 'Nível de competição mundial: gestão de solo de precisão; irrigação controlada por sensor; fertirrigação de alta frequência; monitoramento NDVI por drone; micronutrientes via solo+foliar+fertirrigação; bioestimulantes e reguladores hormonais em todos os estádios críticos; híbrido de ponta stay-green; manejo de estresses múltiplos; colheita no ponto exato',
    nivel: 'Recorde de produtividade',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. PROTOCOLOS DE MANIPULAÇÃO FISIOLÓGICA — MILHO
//
// Quatro objetivos manipuláveis: raiz, polinização, N-assimilation, antioxidante
// Fontes: Marschner (2012); Taiz & Zeiger (2013); DuPont Pioneer (2015);
//         Embrapa Milho e Sorgo (2010); Biswas et al. (2016) – Azospirillum
// ─────────────────────────────────────────────────────────────────────────────

export const MANIPULATION_PROTOCOLS_MILHO = {

  crescimento_radicular: {
    objetivo: 'Maximizar profundidade e volume radicular para absorção de água e nutrientes em alta produtividade',
    janela_critica: 'VE → VT (ponto de crescimento ainda formando raízes escora até VT)',
    mecanismo_fisiologico: 'Auxinas (IAA) são o principal regulador do crescimento e ramificação radicular. IAA é sintetizado via triptofano (dependente de Zn). Citocininas das raízes sinalizam N e P disponíveis para as folhas. P é a energia (ATP) para todas as divisões celulares nas raízes nodais. Ca estrutura a parede das raízes em elongação. Em milho, raízes escora (brace roots) V6-VT contribuem com 15-20% da absorção de nutrientes em alta produção.',
    nutrientes: [
      { nut: 'P', prioridade: 1, dose_solo: '30-60 kg P₂O₅/ha no sulco (starter)', dose_foliar: null, mecanismo_bioquimico: 'P → ATP → ATPases de membrana → bomba de prótons → força motriz de absorção de todos os ions; P para RNA/DNA nas células em divisão dos meristemas radiculares' },
      { nut: 'Zn', prioridade: 2, dose_solo: '3-5 kg Zn/ha como ZnSO₄ 7H₂O no sulco', dose_foliar: '300-500 g Zn/ha (EDTA-Zn ou sulfato) em V2-V4', mecanismo_bioquimico: 'Zn → cofator de triptofano sintase → síntese de triptofano → substrato para IAA; Zn também ativa ATPases de membrana radicular; deficiência = mancha branca (white stripe) V2-V4' },
      { nut: 'Ca', prioridade: 3, dose_solo: 'Calagem para V% 68-72% (garantia de Ca++ ativo)', dose_foliar: '500 g-1 kg Ca/ha como nitrato de Ca em VE-V2', mecanismo_bioquimico: 'Ca² ⁺ é componente estrutural da lâmina média (Ca-pectato) e atua como segundo mensageiro em divisão celular; Ca essencial para elongação das raízes escora (brace roots) em V6-VT' },
      { nut: 'B', prioridade: 4, dose_solo: '1-2 kg B/ha como borato ou ulexita', dose_foliar: '150-300 g B/ha em V2-V4', mecanismo_bioquimico: 'B para integridade da parede celular das raízes novas (complexo B-ramnogalacturonana II); deficiência = ápice radicular necrosado, cessação do crescimento' },
      { nut: 'Mo', prioridade: 5, dose_solo: null, dose_foliar: '20-40 g Mo/ha (molibdato de sódio) no tratamento de sementes', mecanismo_bioquimico: 'Mo para nitrato redutase → assimilação de NO₃⁻ → aminoácidos → auxinas; Mo para Azospirillum (fixação associativa superficial das raízes em milho)' },
    ],
    bioestimulantes: [
      'Triptofano exógeno (0.5-1 kg/ha foliar em VE-V2): precursor direto do IAA, amplifica o efeito do Zn',
      'Azospirillum brasilense (inoculante): coloniza rizosfera + raízes → produz IAA → estimula raízes laterais; contribuição: +10-30% raízes laterais; aplicar no tratamento de sementes',
      'Ácido húmico (5-10 L/ha no sulco): estimula crescimento radicular via auxina-like e melhora CTC rizosférica',
      'IBA (ácido indolbutírico) em tratamento de sementes: auxina exógena → raízes adventícias',
    ],
    alertas: [
      'Solo compactado (densidade > 1.6 g/cm³ em argiloso, > 1.8 em arenoso) neutraliza todos os protocolos de raiz — descompactar fisicamente é prioritário',
      'Al³⁺ livre (saturação Al > 15%) impede elongação das raízes nodais — calagem é pré-requisito',
      'Solo frio (< 10°C) bloqueia P mesmo com P adequado — plantio antes da temperatura ideal perde o efeito do starter',
      'Excesso de P induz deficiência de Zn (precipita Zn como Zn₃(PO₄)₂) — monitorar relação P:Zn solo',
    ],
    ganho_produtivo_estimado: 'Sistema radicular profundo contribui com 15-25 sc/ha adicionais em condições de veranico; raízes escora saudáveis reduzem acamamento em 30-50%',
    estagios_aplicacao: ['VE', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'],
    fonte_ref: 'Marschner (2012) Cap. 15; DuPont Pioneer (2015); Embrapa Milho e Sorgo (2010); Hungria et al. (2010) Plant Soil 331:413',
  },

  pegamento_floral: {
    objetivo: 'Maximizar fertilização, grain set e uniformidade da espiga (minimizar grain gaps)',
    janela_critica: 'V11 → R2 (pré-aplicação em V11-V13 é essencial; aplicação em VT-R1 para efeito direto)',
    mecanismo_fisiologico: 'O milho é monoécico: pendão (macho) libera >1 milhão de grãos de pólen/planta; espiga (fêmea) tem >1000 estigmas (silk). Fertilização = grão de pólen pousa no silk → germina → tubo polínico cresce pelo canal do estigma (~20 cm em 24h) → fertiliza o óvulo. Falhas acontecem por: (1) pólen não viável; (2) silk não receptivo; (3) assincronia pendão-silk (NICK comprometido); (4) aborto de grãos após fertilização (2 semanas após R1). B é OBRIGATÓRIO para crescimento do tubo polínico. Ca para reconhecimento pólen-estigma. Zn para IAA que previne aborto.',
    nutrientes: [
      { nut: 'B', prioridade: 1, dose_foliar: '200-400 g B/ha como ácido bórico 17% ou borogluconato', dose_solo: '1-2 kg B/ha como ulexita ou borato', mecanismo_bioquimico: 'B é cofator obrigatório do crescimento do tubo polínico: B forma complexo com mannitol e apiose no canal do estigma; sem B = tubo polínico para de crescer antes de atingir o óvulo = grain gap; B também necessário para síntese do grão de pólen viável no pendão' },
      { nut: 'Ca', prioridade: 2, dose_foliar: '1-1.5 kg Ca/ha como nitrato de Ca 15.5% Ca em V12-VT', dose_solo: 'Calagem para Ca trocável > 2.0 cmolc/dm³', mecanismo_bioquimico: 'Ca mediates pollen-silk recognition (Ca-dependent protein kinases no silk reconhecem proteínas do pólen); Ca-pectato no canal do estigma é o substrato para crescimento do tubo polínico; Ca para divisão celular do embrião em R1-R2' },
      { nut: 'K', prioridade: 3, dose_foliar: '1-2 kg K/ha como KNO₃ 13.5% K em VT-R1', dose_solo: 'K solo > 120 mg/dm³ antes de VT', mecanismo_bioquimico: 'K para osmorregulação do grão de pólen durante germinação; K para manutenção do turgore do silk receptivo; K co-transportado com sacarose para os grãos em R1-R2' },
      { nut: 'N', prioridade: 4, dose_foliar: '0.3-0.5% ureia foliar em VT-R1 apenas em deficiência visual', dose_solo: 'Topdress de N completado antes de V8', mecanismo_bioquimico: 'N para síntese de proteínas do grão de pólen (>1 milhão de grãos/planta); N insuficiente = pólen menos viável e silk menos receptivo; N para primórdios reprodutivos em V12-V14' },
      { nut: 'Zn', prioridade: 5, dose_foliar: '300-400 g Zn/ha em V8-V12 (preventivo)', dose_solo: 'Zn solo > 1.6 mg/dm³', mecanismo_bioquimico: 'Zn → IAA nos grãos fertilizados previne aborto precoce; Zn cofator de enzimas de divisão celular no endosperma nascente; Zn deficiente = grain gaps distribuídos por toda a espiga' },
    ],
    bioestimulantes: [
      'Poliaminas (espermidina, espermina) 200 mL/ha em VT-R1: regulam crescimento do tubo polínico e germinação do pólen; reduzem aborto de grãos',
      'Brassinolídeo 5-10 mL/ha em VT-R1: aumenta receptividade do silk e viabilidade do pólen',
      'Aminoácidos (cisteína + glicina) 300-500 mL/ha em VT: reduzem estresse térmico no pólen; temperatura > 35°C é o maior killer de pegamento floral',
      'Silício 1-2 kg Si/ha foliar em VT: fortalece parede celular do silk e reduz dessecação por calor',
    ],
    alertas: [
      'TEMPERATURA > 35°C em VT-R1 = inibe germinação do grão de pólen (vida = 20 min) = PRINCIPAL causa de falha — irrigação para reduzir T é mais eficaz que qualquer foliar',
      'SECA em R1 = dessecação dos silks = silk não receptivo antes de receber pólen = grain gaps na ponta da espiga (mais vulnerável)',
      'NICK comprometido (silk emerge > 5 dias após pico de pólen) = espiga incompleta permanente — híbrido ou data de plantio a verificar',
      'Aplique B+Ca+Zn ANTES de VT (em V11-V13) — em VT já é tarde para B atingir os tecidos reprodutivos via floema',
    ],
    ganho_produtivo_estimado: 'Protocolo completo em condições de estresse térmico/hídrico: +15-30 sc/ha por redução de grain gaps; em condições ideais: +5-10 sc/ha por melhora de grain set',
    estagios_aplicacao: ['V11', 'V12', 'V13', 'VT', 'R1'],
    fonte_ref: 'DuPont Pioneer (2015) Corn Growth and Development; Marschner (2012) Cap. 11; Taiz & Zeiger (2013) Cap. 21',
  },

  assimilacao_nitrogenio: {
    objetivo: 'Maximizar assimilação de N mineral, síntese proteica e enchimento de grãos em alta produtividade',
    janela_critica: 'V6 → R5 (>60% do N total é absorvido entre V6-R1; síntese de zeínas = R2-R4)',
    mecanismo_fisiologico: 'O milho absorve N principalmente como NO₃⁻ (nitrato) e NH₄⁺ (amônio). NO₃⁻ é reduzido a NH₄⁺ pela nitrato redutase (NR) nas folhas — reação que consome Mo e Mg. NH₄⁺ é incorporado em aminoácidos pela glutamina sintetase (GS) → glutamato + glutamina (reação dependente de Mn e Mg). Os aminoácidos formam proteínas foliares (Rubisco, clorofila) e de reserva nos grãos (zeínas: α, β, γ, δ — ricas em prolina; zeínas sulfuradas dependem de S). Razão N:S ideal = 15-17:1 para síntese eficiente de proteínas do endosperma. Mg é cofator da ATP-sintase e Rubisco. S para enzimas NR e GS. Mo para NR (molibdo-flavoenzima). Fe para ferredoxina-NR e síntese de clorofila.',
    nutrientes: [
      { nut: 'Mo', prioridade: 1, dose_foliar: '20-50 g Mo/ha como molibdato de sódio ou amônio em V4-V6', dose_solo: 'Calagem para pH ≥ 5.8 aumenta disponibilidade natural de Mo', mecanismo_bioquimico: 'Mo é o cofator metálico da nitrato redutase (NR): NO₃⁻ + 2H⁺ + 2e⁻ → NO₂⁻ (reação NR); sem Mo = NO₃⁻ acumula foliarmente (tóxico) + síntese proteica comprometida; deficiência de Mo em pH < 5.5 é comum em cerrado' },
      { nut: 'Mg', prioridade: 2, dose_foliar: '500 g-1 kg Mg/ha como sulfato de Mg (Mg 9.6%, S 12%) em V6-VT', dose_solo: 'Calcário dolomítico para Mg > 0.8 cmolc/dm³', mecanismo_bioquimico: 'Mg é cofator da ATP-sintase (gera ATP para GS), da Rubisco (CO₂ + RuBP → 2 3-PGA), e ativa glutamina sintetase; Mg transportador de fotoassimilados no floema (Mg-sacarose); K alto antagoniza Mg — relação K/Mg > 5 na CTC = risco de deficiência de Mg' },
      { nut: 'S', prioridade: 3, dose_foliar: '1-2 kg S/ha como tiosulfato de amônio (26% S) em V6-V12', dose_solo: '20-30 kg S/ha como gesso ou superfosfato simples', mecanismo_bioquimico: 'S para cisteína e metionina nas zeínas sulfuradas (β e γ zeínas = 35% das proteínas do endosperma do milho); S para atividade de NR (pontes dissulfeto); relação N:S foliar deve ser ≤ 17:1 — se > 20 = S limitante para síntese proteica' },
      { nut: 'Fe', prioridade: 4, dose_foliar: '500 g-1 kg Fe-EDTA/ha em V6-V10 se deficiência visual', dose_solo: 'pH < 7.0 mantém Fe disponível', mecanismo_bioquimico: 'Fe para ferredoxina-NR (reduz NO₂⁻ → NH₄⁺ nos cloroplastos); Fe para síntese de clorofila (Fe para proto-heme); deficiência de Fe = clorose internerval em folhas jovens (Fe imóvel) + NR comprometida' },
      { nut: 'Mn', prioridade: 5, dose_foliar: '300-500 g Mn/ha como sulfato de Mn em V6-V12 se pH > 6.5', dose_solo: 'pH 5.8-6.2 mantém Mn disponível', mecanismo_bioquimico: 'Mn para Mn-cluster do PSII (oxidação da água: 2H₂O → 4H⁺ + 4e⁻ + O₂); Mn para isocitrato desidrogenase (ciclo do citrato → aminoácidos); em pH > 6.4: Mn precipita como MnO₂ = deficiência induzida' },
    ],
    bioestimulantes: [
      'Aminoácidos (glutamina + asparagina) 300-500 mL/ha em V6-V10: fornecem N orgânico diretamente assimilável; reduzem custo metabólico de redução de NO₃⁻',
      'Uréia foliar 0.5-1% (1-2 kg N/ha) em V8-VT: N foliar de rápida assimilação via GS-GOGAT; aplicar à tarde (< 30°C) para evitar dano de amônia',
      'Extrato de algas (Ascophyllum nodosum): citocininas + betaínas que estimulam GS e aumentam assimilação de N em condições de estresse térmico',
    ],
    alertas: [
      'Topdress de N atrasado após V8 perde 20-35% de eficiência — N precisa estar no solo quando a demanda máxima começa em V6',
      'Ureia a lanço em solo quente (> 25°C) sem incorporação = volatilização de 20-40% do N como NH₃ — usar NBPT ou ureia revestida',
      'Deficiência de S (N:S foliar > 20:1) compromete síntese de zeínas mesmo com N adequado — verificar S antes de interpretar deficiência de N',
      'Mo deficiente em solo ácido (pH < 5.8) = NR inativa = sintoma visual similar a deficiência de N mas não responde a N mineral',
      'Excesso de N mineral (> 50 kg N/ha em cobertura única) pode causar salinidade local + queima foliar + desequilíbrio hormonal',
    ],
    ganho_produtivo_estimado: 'Protocolo completo em alta produtividade: +20-40 sc/ha por melhora na eficiência de uso de N; razão N:S correta = +5-10 sc/ha de qualidade proteica no grão',
    estagios_aplicacao: ['V6', 'V8', 'V10', 'V12', 'VT', 'R1', 'R2', 'R3'],
    fonte_ref: 'Marschner (2012) Cap. 8,13; Taiz & Zeiger (2013) Cap. 12; Embrapa Milho e Sorgo (2010)',
  },

  defesa_antioxidante: {
    objetivo: 'Reduzir acúmulo de ROS (espécies reativas de oxigênio), proteger clorofila e otimizar enchimento de grãos sob estresse',
    janela_critica: 'V6 → R5 (estresse em qualquer fase gera ROS; maior impacto em VT-R2)',
    mecanismo_fisiologico: 'Em condições de estresse (seca, calor, excesso de luz, deficiências), a fotossíntese gera ROS: O₂•⁻ (superóxido), H₂O₂ (peróxido), OH• (radical hidroxila). ROS danificam membranas, enzimas e DNA. O sistema antioxidante enzimático neutraliza ROS: SOD (superóxido dismutase) → dismuta O₂•⁻ em H₂O₂; CAT (catalase) e POD (peroxidase) → reduzem H₂O₂ a H₂O. SOD existe em 3 isoformas: Cu/Zn-SOD (cloroplasto + citossol), Mn-SOD (mitocôndria), Fe-SOD (cloroplasto). Cada isoforma requer seu metal cofator. Em milho C4, a fotossíntese de alta eficiência é mais suscetível a dano por ROS quando os cofatores metálicos estão deficientes.',
    nutrientes: [
      { nut: 'Mn', prioridade: 1, dose_foliar: '300-600 g Mn/ha como sulfato de Mn em V6-V12 e R1-R2', dose_solo: 'pH 5.5-6.2 para disponibilidade; calagem excessiva (pH > 6.5) = Mn deficiente', mecanismo_bioquimico: 'Mn: (1) Cofator de Mn-SOD mitocondrial → dismuta O₂•⁻ nas mitocôndrias; (2) Cluster Mn₄Ca do PSII → oxida H₂O na fotossíntese; (3) cofator de isocitrato desidrogenase (ciclo TCA); deficiência de Mn = PSII inativo = fotoinibição severa em milho C4' },
      { nut: 'Zn', prioridade: 2, dose_foliar: '300-500 g Zn/ha como EDTA-Zn em V6-V12', dose_solo: 'Zn solo > 1.6 mg/dm³ Mehlich-1', mecanismo_bioquimico: 'Zn cofator de Cu/Zn-SOD (isoforma mais abundante no cloroplasto) → principal defesa antioxidante em células fotossintéticas; Zn também protege estrutura de proteínas via zinc fingers; Zn para RNA polimerase (síntese de enzimas antioxidantes)' },
      { nut: 'Cu', prioridade: 3, dose_foliar: '100-200 g Cu/ha como sulfato de Cu ou Cu-EDTA em V6-V10', dose_solo: 'Cu solo > 0.2 mg/dm³ Mehlich-1', mecanismo_bioquimico: 'Cu cofator de Cu/Zn-SOD (junto com Zn, tanto Cu quanto Zn são necessários no sítio ativo); Cu para plastocianina (transferência de elétrons entre PSII e PSI); Cu para citocromo c oxidase mitocondrial; deficiência de Cu = fotossíntese comprometida + SOD inativo' },
      { nut: 'Fe', prioridade: 4, dose_foliar: '500 g-1 kg Fe-EDTA em V6-V10 se clorose visível', dose_solo: 'pH < 7.0 mantém Fe³⁺ redutível', mecanismo_bioquimico: 'Fe para Fe-SOD (cloroplasto); Fe para CAT (heme-enzima; 2H₂O₂ → 2H₂O + O₂); Fe para ferredoxina (transferência de elétrons no PSI); Fe para síntese de clorofila; deficiência de Fe = clorose internerval folhas jovens (imóvel) + SOD+CAT inativas' },
    ],
    enzimas_alvo: {
      SOD: { nome: 'Superóxido Dismutase', reacao: 'O₂•⁻ → H₂O₂', isoformas: { 'Cu/Zn-SOD': ['Cu','Zn'], 'Mn-SOD': ['Mn'], 'Fe-SOD': ['Fe'] }, importancia_milho: 'Isoforma Cu/Zn-SOD é a mais importante em cloroplastos de milho C4 sob alta irradiância' },
      CAT: { nome: 'Catalase', reacao: '2H₂O₂ → 2H₂O + O₂', cofatores: ['Fe','Mn'], importancia_milho: 'CAT em peroxissomos remove H₂O₂ da fotorrespiração; milho C4 tem menor fotorrespiração mas CAT crítica em estresse' },
      POD: { nome: 'Peroxidase', reacao: 'H₂O₂ + fenol → H₂O + fenoxil radical', cofatores: ['Fe','Mn','Cu'], importancia_milho: 'POD na parede celular → lignificação do colmo (resistência mecânica) + resposta a patógenos; POD ativa em milho sob estresse hídrico-térmico em VT-R2' },
    },
    bioestimulantes: [
      'Glicina betaína 1-2 kg/ha foliar em VT-R2: osmoprotetor + estabilizador do PSII sob calor; reduz ROS em condições de seca + calor simultâneos',
      'Prolina foliar 200-400 mL/ha em R1-R2: osmoprotetor + scavenger de OH• (radical hidroxila, o mais danoso); precursor: L-prolina ou extrato de algas rico em prolina',
      'Vitamina C (ácido ascórbico) 1-2 kg/ha foliar em VT-R2: substrato da ascorbato peroxidase (APX); regenera ascorbato oxidado para manter ciclo antioxidante',
      'Silício 2-3 kg Si/ha foliar ou via fertirrigação V6-R2: Si fortalece parede celular → reduz penetração de patógenos → reduz necessidade de ativação de SOD/POD defensivas; Si reduz acúmulo de ROS por fotoinibição',
    ],
    alertas: [
      'Calagem excessiva (pH > 6.5) pode precipitar Mn (MnO₂) e comprometer Mn-SOD — monitorar pH do solo, não apenas Ca e Mg',
      'Excesso de Fe em solo ácido encharcado (Fe²⁺ livre) → toxicidade de Fe → ROS pró-oxidante → dano oposto ao desejado',
      'Aplicação de Cu + Mn foliar juntos pode causar precipitação — aplicar separados ou usar formulações queladas',
      'Deficiência simultânea de Zn + Cu = SOD completamente inativa = planta sem defesa antioxidante enzimática primária',
    ],
    ganho_produtivo_estimado: 'Em condições de estresse hídrico-térmico: protocolo antioxidante evita 10-25 sc/ha de perda por dano oxidativo; melhora stay-green pós-R2 = +5-15 sc/ha de enchimento mais completo',
    estagios_aplicacao: ['V6', 'V8', 'V10', 'V12', 'VT', 'R1', 'R2', 'R3'],
    fonte_ref: 'Taiz & Zeiger (2013) Cap. 26; Marschner (2012) Cap. 5; Blokhina et al. (2003) Ann Bot 91:179',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. PERFIS DE PRODUTIVIDADE — SOJA (40 a 150 sc/ha)
//
// Base: Embrapa Soja (2013); SBCS/NEPAR (2016); Sfredo (2008)
// Referência: 3 t/ha (50 sc) → N=210 kg extraído (FBN 70%), P₂O₅=66, K₂O=111
// Per tonne grain: N=70, P₂O₅=22, K₂O=37, Ca=13, Mg=7, S=9
// FBN: ~70-80% do N em soja bem inoculada; mineral supplement = resto
// ─────────────────────────────────────────────────────────────────────────────

export const SOJA_PRODUCTIVITY_PROFILES = {
  40: {
    meta_sc: 40, meta_kg: 2400,
    populacao_ideal: '250.000–280.000 plantas/ha',
    exigencia_hidrica_mm: '400–500 mm (bem distribuídos em R1-R6)',
    extracao: { N: 168, P2O5: 53, K2O: 89, Ca: 31, Mg: 17, S: 22, Zn: 96, B: 72, Mo: 0.7 },
    exportacao: { N: 132, P2O5: 43, K2O: 52, Ca: 7, Mg: 10, S: 14 },
    fbn_contribuicao_estimada: '~120-135 kg N/ha (FBN cobre ~80%, sem necessidade de N mineral se bem inoculada)',
    n_mineral_recomendado: '0-20 kg N/ha (apenas starter de 20 kg N no sulco para arranque)',
    estrategia: 'Solo de fertilidade média; calagem para V% 60%; inoculação padrão Bradyrhizobium; adubação P+K na expectativa; 1 aplicação de micronutrientes foliar (B+Mo+Co)',
    nivel: 'Média nacional',
  },
  50: {
    meta_sc: 50, meta_kg: 3000,
    populacao_ideal: '280.000–310.000 plantas/ha',
    exigencia_hidrica_mm: '450–550 mm',
    extracao: { N: 210, P2O5: 66, K2O: 111, Ca: 39, Mg: 21, S: 27, Zn: 120, B: 90, Mo: 0.9 },
    exportacao: { N: 165, P2O5: 54, K2O: 65, Ca: 9, Mg: 12, S: 17 },
    fbn_contribuicao_estimada: '~150-170 kg N/ha',
    n_mineral_recomendado: '0-20 kg N/ha starter',
    estrategia: 'Solo adequado; calagem V% 62-65%; inoculação de qualidade; P+K+S+Zn+B no sulco; Co+Mo no tratamento de sementes; 1-2 foliares de micronutrientes',
    nivel: 'Boa produtividade',
  },
  60: {
    meta_sc: 60, meta_kg: 3600,
    populacao_ideal: '290.000–320.000 plantas/ha',
    exigencia_hidrica_mm: '500–600 mm',
    extracao: { N: 252, P2O5: 79, K2O: 133, Ca: 47, Mg: 25, S: 32, Zn: 144, B: 108, Mo: 1.1 },
    exportacao: { N: 198, P2O5: 65, K2O: 78, Ca: 11, Mg: 15, S: 20 },
    fbn_contribuicao_estimada: '~180-205 kg N/ha',
    n_mineral_recomendado: '20 kg N/ha starter; Re-inoculação e Co+Mo obrigatórios',
    estrategia: 'Solo fértil; calagem V% 65-68%; inoculação dupla (Bradyrhizobium + Co+Mo); P+K+Ca+Mg+S+Zn+B no plantio; B+Ca+Zn foliar em V4-V6 e R1; controle de doenças para manter área foliar até R6',
    nivel: 'Alta produtividade',
  },
  70: {
    meta_sc: 70, meta_kg: 4200,
    populacao_ideal: '300.000–330.000 plantas/ha',
    exigencia_hidrica_mm: '550–650 mm',
    extracao: { N: 294, P2O5: 92, K2O: 155, Ca: 55, Mg: 29, S: 38, Zn: 168, B: 126, Mo: 1.3 },
    exportacao: { N: 231, P2O5: 76, K2O: 91, Ca: 13, Mg: 17, S: 23 },
    fbn_contribuicao_estimada: '~210-240 kg N/ha (FBN altamente eficiente requerida)',
    n_mineral_recomendado: '20-30 kg N/ha starter; reaplicar Co+Mo foliar em V4',
    estrategia: 'Solo de alta fertilidade; calagem V% 68-70%; inoculação com estirpes elite + Co+Mo; nutrição completa (macro + micro); B+Ca+Zn foliar em V4-V5 e R1; programas fitossanitários intensivos; cultivar de alto potencial genético',
    nivel: 'Muito alta produtividade',
  },
  80: {
    meta_sc: 80, meta_kg: 4800,
    populacao_ideal: '300.000–340.000 plantas/ha',
    exigencia_hidrica_mm: '580–700 mm',
    extracao: { N: 336, P2O5: 106, K2O: 178, Ca: 62, Mg: 34, S: 43, Zn: 192, B: 144, Mo: 1.5 },
    exportacao: { N: 264, P2O5: 87, K2O: 104, Ca: 15, Mg: 19, S: 27 },
    fbn_contribuicao_estimada: '~240-275 kg N/ha (FBN no limite fisiológico)',
    n_mineral_recomendado: '30-40 kg N/ha (starter + foliar se FBN insuficiente visualmente)',
    estrategia: 'Sistema de produção avançado; solo com V% ≥ 70%; análise foliar para ajuste fino de micronutrientes; B+Ca+Zn+Mo foliar em 3 momentos (V4, R1, R3); controle rigoroso de nematoides (limitante em alta população); gestão de MO do solo',
    nivel: 'Elite',
  },
  100: {
    meta_sc: 100, meta_kg: 6000,
    populacao_ideal: '310.000–350.000 plantas/ha',
    exigencia_hidrica_mm: '650–750 mm (distribuição crítica em R1-R5)',
    extracao: { N: 420, P2O5: 132, K2O: 222, Ca: 78, Mg: 42, S: 54, Zn: 240, B: 180, Mo: 1.8 },
    exportacao: { N: 330, P2O5: 108, K2O: 130, Ca: 18, Mg: 24, S: 34 },
    fbn_contribuicao_estimada: '~300-340 kg N/ha (máximo fisiológico FBN ~ 300 kg N/ha/ciclo)',
    n_mineral_recomendado: '40-60 kg N/ha (FBN provavelmente insuficiente; foliar N em R1-R3 se análise indicar)',
    estrategia: 'Alta tecnologia: cultivares de alto potencial + populações elevadas + solo de alta fertilidade com MO > 3% + análise foliar quinzenal + protocolos nutricionais por estádio + MIP + fungicidas preventivos + monitoramento de FBN por noduloscopia',
    nivel: 'Record nacional',
  },
  120: {
    meta_sc: 120, meta_kg: 7200,
    populacao_ideal: '320.000–380.000 plantas/ha',
    exigencia_hidrica_mm: '720–850 mm',
    extracao: { N: 504, P2O5: 158, K2O: 266, Ca: 94, Mg: 50, S: 65, Zn: 288, B: 216, Mo: 2.2 },
    exportacao: { N: 396, P2O5: 130, K2O: 156, Ca: 22, Mg: 29, S: 41 },
    fbn_contribuicao_estimada: '~340-380 kg N/ha + N mineral necessário',
    n_mineral_recomendado: '60-80 kg N/ha (FBN+mineral; N foliar em V4 e R1-R3)',
    estrategia: 'Gestão integrada de altíssimo nível: análise foliar sistemática + correção por nutriente individualmente + irrigação suplementar preventiva + protocolos hormonais (bioestimulantes) + cultivares stay-green + monitoramento constante',
    nivel: 'Competição de produtividade',
  },
  150: {
    meta_sc: 150, meta_kg: 9000,
    populacao_ideal: '340.000–420.000 plantas/ha',
    exigencia_hidrica_mm: '850–1000 mm (irrigação recomendada)',
    extracao: { N: 630, P2O5: 198, K2O: 333, Ca: 117, Mg: 63, S: 81, Zn: 360, B: 270, Mo: 2.7 },
    exportacao: { N: 495, P2O5: 162, K2O: 195, Ca: 27, Mg: 36, S: 51 },
    fbn_contribuicao_estimada: '~400-440 kg N/ha + suplemento mineral significativo',
    n_mineral_recomendado: '80-120 kg N/ha (FBN no limite; N mineral necessário para o delta)',
    estrategia: 'Nível de recordes mundiais: irrigação plena + fertilização de alta frequência + monitoramento por sensores + cultivares de elite + análise foliar semanal + todos os protocolos nutricionais em sequência. Requer condições edafoclimáticas excepcionais.',
    nivel: 'Recorde mundial de produtividade',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. INTELIGÊNCIA CRUZADA — SOJA × MILHO
//
// Base de conhecimento comparativa para reconhecimento automático de
// diferenças fisiológicas, nutricionais e de manejo entre as culturas.
// Fontes: Taiz & Zeiger (2013); Marschner (2012); Embrapa Soja (2013);
//         Embrapa Milho (2010); DuPont Pioneer (2015)
// ─────────────────────────────────────────────────────────────────────────────

export const CROP_INTELLIGENCE = {

  fotossintese: {
    soja: { via: 'C3 (Calvin ciclo direto)', eficiencia_agua: 'baixa (400-500 mol H₂O / mol CO₂)', otimo_temp: '25-30°C', saturacao_luz: '600-800 µmol/m²/s', fotorrespiracao: 'alta (20-40% da fotossíntese bruta)', limitante: 'CO₂ e temperatura são mais limitantes' },
    milho: { via: 'C4 (Hatch-Slack; CO₂ concentrado nos feixes vasculares)', eficiencia_agua: 'alta (200-300 mol H₂O / mol CO₂)', otimo_temp: '30-35°C', saturacao_luz: '1500-2000 µmol/m²/s (não satura)', fotorrespiracao: 'mínima (<5%)', limitante: 'N e água são mais limitantes que CO₂; alta resposta a luz' },
    implicacao_diagnostica: 'Milho responde mais a N (via maior Rubisco e clorofila por unidade de área foliar) e é mais sensível a seca em VT-R2 que soja. Clorose por N em milho = amarelecimento em "V" na folha velha (mobilidade alta). Clorose por Fe em milho = internerval em folhas jovens (imóvel). Soja clorótica por N pode ser FBN comprometida.',
  },

  nitrogenio: {
    soja: { fonte_principal: 'FBN simbiótica via Bradyrhizobium japonicum (nódulos; fixação 100-300 kg N/ha/ciclo)', dependencia_mineral: 'baixa em solo bem inoculado (0-40 kg N/ha)', sintoma_deficiencia: 'Clorose uniforme de baixo para cima; verificar nódulos (cor interna rosa/vermelha = ativo; branco = inativo)', critico: 'Mo (cofator nitrogenase), Co (cobalamina), Fe (ferredoxina-nitrogenase), P (ATP para nitrogenase)' },
    milho: { fonte_principal: 'Absorção mineral de NO₃⁻ e NH₄⁺ do solo (milho NÃO faz FBN simbiótica)', dependencia_mineral: 'alta (60-400 kg N/ha total aplicado conforme meta produtiva)', sintoma_deficiencia: 'Clorose em "V" invertido a partir da ponta da folha velha; começa em folhas inferiores', critico: 'Mo (nitrato redutase), S (relação N:S para zeínas), Mg (Rubisco, GS, ATP-sintase), Fe (ferredoxina-NR)' },
    diferenca_chave: 'DIAGNÓSTICO: clorose em soja pode ser FBN comprometida (checar nódulos) ou N foliar; em milho é SEMPRE deficiência de N mineral ou de cofatores da assimilação. TRATAMENTO: em soja, checar inoculante + Mo + Co antes de aplicar N mineral; em milho, verificar se topdress foi aplicado em V4-V6.',
  },

  micronutrientes_criticos: {
    soja: {
      mais_criticos: ['Mo (FBN + NR)', 'Co (cobalamina de Bradyrhizobium)', 'B (florescimento + tubos polínicos)', 'Mn (PSII + metabolismo C3)', 'Zn (IAA + divisão celular)'],
      caracteristica_especial: 'Mo e Co são exclusivamente críticos para soja devido à FBN simbiótica; sem Mo+Co = nódulos inativos mesmo com Bradyrhizobium',
    },
    milho: {
      mais_criticos: ['Zn (mancha branca + IAA; o mais limitante no cerrado)', 'B (tubo polínico + pegamento floral)', 'Mn (PSII C4 + Mn-SOD)', 'Mo (nitrato redutase, não FBN)', 'Cu (Cu/Zn-SOD + plastocianina)'],
      caracteristica_especial: 'Zn é o micronutriente mais limitante em milho no cerrado brasileiro (precipitação por P alto + pH incorreto); deficiência de Zn = mancha branca V2-V4 = perda permanente de 15-30% de produtividade',
    },
    implicacao_diagnostica: 'Soja com baixa nodulação: verificar Mo+Co antes de N. Milho com listras brancas em V2-V4: Zn deficiente. Sintoma internerval em folhas jovens de ambas as culturas: Fe deficiente (imóvel). Sintoma internerval em folhas velhas de ambas: Mg deficiente (móvel).',
  },

  periodos_criticos: {
    soja: [
      { periodo: 'VE-V2', critico: 'Estabelecimento de nódulos (Mo+Co+P)', impacto_max: '20-30% rendimento' },
      { periodo: 'V4-R1', critico: 'Definição de estruturas reprodutivas (B+Ca+Zn)', impacto_max: '25-35% rendimento' },
      { periodo: 'R1-R3', critico: 'Pegamento de flores e formação de vagens (B+Ca+K+Mo)', impacto_max: '30-40% rendimento' },
      { periodo: 'R3-R5.3', critico: 'Enchimento de grãos (K+N+S+Mg)', impacto_max: '25-35% rendimento' },
    ],
    milho: [
      { periodo: 'VE-V5', critico: 'Estabelecimento radicular (P+Zn+Ca)', impacto_max: '10-20% rendimento' },
      { periodo: 'V6-V10', critico: 'N absorção máxima + definição de fileiras (N+K+Zn)', impacto_max: '30-40% rendimento' },
      { periodo: 'VT-R2', critico: 'Polinização e grain set (B+Ca+K+Zn)', impacto_max: '40-60% rendimento' },
      { periodo: 'R2-R5', critico: 'Enchimento de grãos (K+N+S+Mg)', impacto_max: '20-30% rendimento' },
    ],
    implicacao_diagnostica: 'Milho tem período crítico VT-R2 mais curto e mais impactante que soja (60% vs 40% do rendimento em risco). Soja tem maior capacidade de compensação pós-estresse (pode recuperar vagens de nós superiores). Milho não compensa — grain gaps são permanentes.',
  },

  hormonal_key_differences: {
    soja: 'CK das raízes + nódulos sustentam crescimento vegetativo-reprodutivo. ABA regula enchimento de R5-R6. Etileno controla senescência. FBN usa Ethileno para comunicação Bradyrhizobium-planta.',
    milho: 'CK em V7 define fileiras (crítico). GA domina V10-VT (elongação). ET controla abertura de anteras (VT). IAA previne aborto de grãos (R1-R2). ABA finaliza enchimento (R4-R6).',
    diferenca_chave: 'Em milho, CK em V7 é insubstituível para número de fileiras. Em soja, CK em R2-R4 sustenta divisão celular nas sementes. Ambas dependem de Zn para IAA mas em momentos diferentes.',
  },

  antagonismos_exclusivos_por_cultura: {
    soja: ['S×Mo (sulfato do gesso compete com molibdato — compromete FBN)', 'P×Zn (P alto inibe Zn — reduz IAA e FBN)', 'Ca×calagem×Mn (pH > 6.5 precipita Mn — PSII comprometido em C3)'],
    milho: ['P×Zn (P alto cerrado precipita Zn → mancha branca — mais crítico que soja)', 'K×Mg (K alto→Mg baixo→Rubisco+GS+ATP-sintase comprometidos no ciclo C4)', 'N×S (topdress N sem S = síntese de zeínas comprometida — qualidade do grão reduzida)'],
    compartilhados: ['Ca×Mn (calagem excessiva)', 'Fe×Mn (pH ácido: toxicidade simultânea)', 'Zn×Fe (excesso de Fe→menos Zn no grão)', 'K×Ca (excesso K inibe Ca)'],
  },

  diagnostico_diferencial_visual: {
    'Clorose uniforme folhas velhas → base para cima': { soja: 'N deficiente ou FBN inativa — checar nódulos', milho: 'N deficiente — checar data de topdress' },
    'Listras brancas paralelas à nervura em V2-V4': { soja: 'Não ocorre — sintoma exclusivo de milho', milho: 'Mancha branca = Zn deficiente (DIAGNÓSTICO PATOGNOMÔNICO)' },
    'Clorose internerval folhas jovens': { soja: 'Fe deficiente (solo calcário) ou Mn excessivo', milho: 'Fe deficiente (solo calcário ou pH > 7.0)' },
    'Clorose internerval folhas velhas': { soja: 'Mg deficiente (K/Mg alta) ou Zn deficiente', milho: 'Mg deficiente (K alto ou Ca/Mg baixa)' },
    'Necrose marginal folhas velhas': { soja: 'K deficiente', milho: 'K deficiente' },
    'Morte apical meristemática (crescente)': { soja: 'Ca deficiente + B deficiente', milho: 'Ca+B deficientes (em VT = espiga malformada)' },
    'Espiga incompleta/grain gaps': { soja: 'Não aplicável (vagens)',  milho: 'B+Ca deficiente em VT-R1 OU estresse térmico/hídrico em R1-R2' },
    'Nódulos brancos/pequenos em soja': { soja: 'FBN inativa: Mo+Co deficiente, pH < 5.5, Al³⁺, seca, nematoide', milho: 'Não aplicável — milho não faz FBN simbiótica' },
  },
}
