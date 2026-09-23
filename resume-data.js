/**
 * Fonte única de verdade do currículo.
 *
 * Consumido por pdf.js para gerar o PDF otimizado para ATS.
 * O conteúdo visível em index.html espelha estes dados — ao editar
 * um dos dois, atualize o outro.
 */
window.RESUME = {
  name: 'Ian Barbosa Tavares',
  title: 'Engenheiro de Software Full Stack | Java, Spring Boot, Node.js, React',
  location: 'Brasília, DF, Brasil (aberto a remoto)',
  email: 'ianbtavares@gmail.com',
  phone: '+55 61 99151-5885',
  linkedin: 'linkedin.com/in/ianbtavares',
  github: 'github.com/IanBTavares',

  summary:
    'Engenheiro de Software Full Stack com experiência em sistemas de missão crítica e escala nacional. ' +
    'Desenvolvo APIs REST e integrações em Java e Spring Boot para plataformas do Ministério da Saúde ' +
    '(Meu SUS Digital, SIPNI e RNDS), usadas por milhões de cidadãos. Criei e opero o Atenza, SaaS multi-tenant ' +
    'para clínicas em Node.js (NestJS), React, TypeScript e PostgreSQL, com Docker, Kubernetes e CI/CD em ' +
    'GitHub Actions e cliente pagante em produção.',

  skills: [
    {
      label: 'Linguagens',
      items: 'Java, TypeScript, JavaScript, Python, SQL',
    },
    {
      label: 'Backend',
      items: 'Spring Boot, Node.js, NestJS, APIs REST, Prisma, Maven, Gradle, Multithreading, Programação assíncrona',
    },
    {
      label: 'Frontend',
      items: 'React, Angular, Vite, HTML, CSS',
    },
    {
      label: 'Banco de dados',
      items: 'PostgreSQL, Modelagem de dados, ORM',
    },
    {
      label: 'DevOps e Cloud',
      items: 'Docker, Kubernetes (K3s), Helm, Terraform, GitHub Actions, CI/CD, GitOps, Git, Linux',
    },
    {
      label: 'Arquitetura e Qualidade',
      items: 'Arquitetura multi-tenant, Integração de sistemas, OpenAPI/Swagger, Testes automatizados (Jest), OpenTelemetry, Observabilidade, Segurança de aplicações, LGPD',
    },
    {
      label: 'Ferramentas',
      items: 'Postman, Jira, Sentry, MuleSoft, FlutterFlow',
    },
  ],

  experience: [
    {
      role: 'Desenvolvedor Full Stack',
      company: 'Atenza (projeto próprio)',
      location: 'Brasília, DF - Remoto',
      period: '12/2025 - Atual',
      context:
        'SaaS de gestão para clínicas de saúde e estética: agenda, prontuário eletrônico, CRM, financeiro e estoque.',
      bullets: [
        'Desenvolvi sozinho, do banco de dados à infraestrutura, um SaaS com 27 módulos, 267 endpoints REST documentados em OpenAPI e 74 entidades, usando NestJS, Prisma, PostgreSQL, React e TypeScript.',
        'Projetei arquitetura multi-tenant com isolamento por cliente em Kubernetes (namespace, banco PostgreSQL, rede e certificado TLS dedicados), eliminando o risco de vazamento de dados entre clínicas.',
        'Automatizei deploy, rollback, restore e provisionamento de novos clientes em 15 pipelines de CI/CD com GitHub Actions, Helm e Terraform no modelo GitOps.',
        'Implementei segurança da cadeia de suprimentos com imagens assinadas (Cosign), varredura de vulnerabilidades (Trivy) e de segredos (Gitleaks) no pipeline de CI.',
        'Garanti continuidade do negócio com backup horário imutável em object storage e procedimento de restore testado.',
        'Modelei controle de acesso granular (RBAC) até o nível de documento de prontuário, em conformidade com a LGPD para dados sensíveis de saúde.',
        'Mantive a qualidade com testes automatizados (Jest), observabilidade com OpenTelemetry e Sentry, e CI que bloqueia merge em falha de lint, build, teste ou segurança.',
      ],
    },
    {
      role: 'Desenvolvedor Full Stack',
      company: 'Zello Tecnologia',
      location: 'Brasília, DF',
      period: '11/2024 - Atual',
      context: 'Plataformas nacionais de saúde pública do Ministério da Saúde.',
      bullets: [
        'Desenvolvo e mantenho funcionalidades do Meu SUS Digital, SIPNI e RNDS, sistemas de alcance nacional usados por milhões de cidadãos.',
        'Construo APIs REST e integrações entre sistemas de saúde em Java e Spring Boot, com build e dependências em Maven e Gradle.',
        'Implemento processamento assíncrono e concorrente com multithreading para cenários de alta carga.',
        'Investigo e corrijo incidentes em produção por análise de logs, estabilizando fluxos críticos de integração.',
        'Conduzo demandas de ponta a ponta: levantamento de requisitos, refinamento técnico com o cliente, desenvolvimento e entrega.',
      ],
    },
    {
      role: 'Desenvolvedor de Agentes de IA',
      company: 'Startup de atendimento automatizado',
      location: 'Remoto',
      period: '2024',
      context: '',
      bullets: [
        'Desenvolvi agente conversacional de IA para o setor de alimentação, respondendo dúvidas sobre cardápio e modos de preparo.',
        'Desenhei fluxos de atendimento automatizado e analisei o comportamento dos usuários para aumentar a resolução sem intervenção humana.',
      ],
    },
    {
      role: 'Assessor Técnico',
      company: 'Secretaria de Segurança Pública do Distrito Federal',
      location: 'Brasília, DF',
      period: '10/2023 - 11/2024',
      context: '',
      bullets: [
        'Analisei dados operacionais e produzi indicadores para apoiar decisões da alta gestão.',
        'Mapeei gargalos e padronizei fluxos de trabalho, reduzindo esforço manual nas rotinas das diretorias.',
      ],
    },
    {
      role: 'Gerente Administrativo',
      company: 'TransPeres',
      location: 'Brasília, DF',
      period: '2020 - 2023',
      context: '',
      bullets: [
        'Geri finanças, compras, pessoas, contratos terceirizados e custos de manutenção de frota.',
      ],
    },
  ],

  // Formação é uma das seções que os ATS mais procuram. Preencha e ela
  // aparece no PDF automaticamente. Ex.:
  // { degree: 'Bacharelado em Ciência da Computação', school: 'Universidade X', period: '2021 - 2025' }
  education: [],

  // Certificações também entram no PDF quando preenchidas.
  // Ex.: { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025' }
  certifications: [],

  languages: [
    'Português - Nativo',
    'Inglês - Intermediário',
    'Espanhol - Intermediário',
  ],
};
