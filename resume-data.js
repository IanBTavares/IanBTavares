/**
 * Fonte única de verdade do currículo.
 *
 * Consumido por pdf.js para gerar o PDF otimizado para ATS.
 * O conteúdo visível em index.html espelha estes dados — ao editar
 * um dos dois, atualize o outro.
 */
window.RESUME = {
  name: 'Ian Barbosa Tavares',
  title: 'Full Stack Software Engineer',
  location: 'Brasília, DF, Brasil (disponível para remoto)',
  email: 'ianbtavares@gmail.com',
  phone: '+55 61 99151-5885',
  linkedin: 'linkedin.com/in/ianbtavares',
  github: 'github.com/IanBTavares',

  summary:
    'Engenheiro de software full stack com atuação em sistemas de missão crítica e escala nacional. ' +
    'Desenvolvo e sustento plataformas do Ministério da Saúde (Meu SUS Digital, SIPNI, RNDS) com Java, Spring Boot, ' +
    'APIs REST e integrações entre sistemas de saúde. Em paralelo, criei e opero o Atenza, um SaaS multi-tenant de ' +
    'gestão para clínicas em NestJS, React, TypeScript e PostgreSQL, com infraestrutura em Kubernetes (K3s), ' +
    'entrega contínua via GitHub Actions e cliente em produção. Perfil orientado a arquitetura, confiabilidade e ' +
    'tradução de requisitos de negócio em software que funciona em produção.',

  experience: [
    {
      role: 'Desenvolvedor Full Stack',
      company: 'Atenza',
      location: 'Brasília, DF (Remoto)',
      period: '12/2025 - atual',
      context:
        'SaaS de gestão para clínicas de saúde e estética, concebido, desenvolvido e operado por mim, com cliente pagante em produção.',
      bullets: [
        'Concebi e desenvolvi sozinho um SaaS full stack com 27 módulos de domínio, 267 endpoints REST documentados em OpenAPI e 74 entidades de dados, usando NestJS, Prisma, PostgreSQL, React e TypeScript.',
        'Projetei arquitetura multi-tenant por isolamento físico: cada clínica roda em namespace Kubernetes próprio, com banco PostgreSQL, volume persistente, NetworkPolicy, quota de recursos e certificado TLS dedicados, eliminando risco de vazamento de dados entre clientes.',
        'Implementei provisionamento declarativo no modelo GitOps, com contratos validados por JSON Schema e um resolver que gera o plano efetivo de implantação, garantindo que plan e apply consumam o mesmo bundle verificado por SHA-256.',
        'Automatizei o ciclo de operação em 15 workflows de GitHub Actions cobrindo provisionamento, deploy, health check, promoção para produção, rollback, restore e arquivamento de ambientes.',
        'Elevei a segurança da cadeia de suprimentos fixando imagens por digest com assinatura Cosign, varredura Trivy e Gitleaks no CI, e sanitização de dados pessoais antes do envio ao Sentry.',
        'Garanti continuidade do negócio com backup horário para object storage com Object Lock verificado, retenção de 14 e 60 dias e restore ensaiado em volume e workload isolados.',
        'Modelei controle de acesso granular no padrão recurso:ação, com permissões até o nível de documento de prontuário, atendendo requisitos de LGPD para dados sensíveis de saúde.',
        'Sustentei a qualidade com 259 arquivos de teste automatizado, observabilidade via OpenTelemetry e pipeline de CI que bloqueia merge em falha de lint, build, teste ou segurança.',
      ],
    },
    {
      role: 'Desenvolvedor Full Stack / Analista',
      company: 'Zello Tecnologia',
      location: 'Brasília, DF',
      period: '11/2024 - atual',
      context:
        'Desenvolvimento e sustentação de plataformas nacionais de saúde pública do Ministério da Saúde.',
      bullets: [
        'Desenvolvo e valido soluções para o Meu SUS Digital, SIPNI e RNDS, sistemas de alcance nacional usados por milhões de cidadãos.',
        'Construo e evoluo APIs REST e integrações entre sistemas de saúde com Java e Spring Boot, gerenciando dependências e builds com Maven e Gradle.',
        'Implemento fluxos assíncronos e tratamento de concorrência com multithreading para cenários de alta carga.',
        'Atuo em troubleshooting e sustentação de ambientes de produção sensíveis, investigando logs e estabilizando falhas em fluxos críticos.',
        'Conduzo o ciclo completo das demandas: levantamento de requisitos, refinamento técnico com o cliente, priorização e acompanhamento da entrega.',
      ],
    },
    {
      role: 'Desenvolvedor - Agentes Autônomos de IA',
      company: 'Startup de atendimento automatizado',
      location: 'Remoto',
      period: '2024',
      context: 'Automação de atendimento ao cliente com agentes autônomos de IA.',
      bullets: [
        'Desenvolvi agente conversacional para o setor de alimentação, capaz de responder dúvidas sobre cardápio e sugerir modos de preparo.',
        'Trabalhei com desenho de fluxos de atendimento, automação e análise do comportamento do usuário para aumentar a resolução sem intervenção humana.',
      ],
    },
    {
      role: 'Assessor Técnico - SUPREC e DMPP',
      company: 'Secretaria de Segurança Pública do Distrito Federal',
      location: 'Brasília, DF',
      period: '10/2023 - 11/2024',
      context: 'Análise de dados e melhoria de processos internos em diretorias operacionais.',
      bullets: [
        'Analisei e organizei dados operacionais para subsidiar decisões da alta gestão.',
        'Identifiquei gargalos e sistematizei fluxos de trabalho, reduzindo esforço manual nas rotinas da área.',
        'Dei apoio técnico a processos da diretoria e ao acompanhamento de indicadores.',
      ],
    },
    {
      role: 'Gerente Administrativo',
      company: 'TransPeres',
      location: 'Brasília, DF',
      period: '2020 - 2023',
      context: 'Gestão administrativa, financeira e operacional.',
      bullets: [
        'Respondi pela gestão financeira, de pessoas, compras e serviços terceirizados.',
        'Acompanhei manutenção de frota e controle de custos operacionais.',
      ],
    },
  ],

  projects: [
    {
      name: 'Atenza',
      tech: 'NestJS, React, TypeScript, PostgreSQL, Prisma, Docker, Kubernetes (K3s), Helm, Terraform',
      description:
        'SaaS multi-tenant de gestão para clínicas com agenda, prontuário eletrônico, anamnese, termos de consentimento, CRM, financeiro, comissões e estoque. Cliente em produção.',
    },
    {
      name: 'Meu SUS Digital',
      tech: 'Java, Spring Boot, APIs REST',
      description:
        'Plataforma nacional de saúde digital do Ministério da Saúde. Atuação em desenvolvimento, integrações e sustentação de fluxos críticos.',
    },
    {
      name: 'SIPNI - Sistema de Informação do Programa Nacional de Imunizações',
      tech: 'Java, Spring Boot, integrações',
      description:
        'Sistema nacional de registro de imunizações. Atuação em integração, análise de comportamento do sistema e estabilidade.',
    },
    {
      name: 'RNDS - Rede Nacional de Dados em Saúde',
      tech: 'Java, APIs REST, interoperabilidade',
      description:
        'Barramento nacional de interoperabilidade em saúde. Atuação em fluxos de integração de alta complexidade.',
    },
  ],

  skills: [
    {
      label: 'Linguagens',
      items: 'Java, TypeScript, JavaScript, Python, SQL, HTML, CSS',
    },
    {
      label: 'Backend',
      items: 'Spring Boot, NestJS, Node.js, APIs REST, Prisma, PostgreSQL, Maven, Gradle, Multithreading, Programação assíncrona',
    },
    {
      label: 'Frontend',
      items: 'React, Angular, TypeScript, Vite, HTML, CSS',
    },
    {
      label: 'Infraestrutura e DevOps',
      items: 'Docker, Kubernetes (K3s), Helm, Terraform, GitHub Actions, CI/CD, GitOps, Git, Linux',
    },
    {
      label: 'Arquitetura e Qualidade',
      items: 'Arquitetura multi-tenant, Integração de sistemas, OpenAPI, Testes automatizados (Jest), OpenTelemetry, Observabilidade, Troubleshooting em produção, LGPD',
    },
    {
      label: 'Ferramentas',
      items: 'Postman, Swagger, Jira, Sentry, FlutterFlow, MuleSoft',
    },
  ],

  languages: [
    'Português — Nativo',
    'Inglês — Intermediário',
    'Espanhol — Intermediário',
  ],
};
