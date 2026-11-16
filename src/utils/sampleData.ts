import { ResumeAnalysis } from '../types';

export const SAMPLE_RESUME_TEXT = `ALEXANDER VANCE
San Francisco, CA • alex.vance.dev@gmail.com • (415) 890-4421 • linkedin.com/in/alexandervance • github.com/avance

SUMMARY
Full Stack Software Engineer with 5+ years of experience engineering high-throughput web applications, microservices, and AI-enabled product workflows. Proven track record optimizing React/TypeScript frontends and distributed Node.js/Python backends serving 2M+ monthly active users. Passionate about automated testing, cloud-native scalability, and developer tooling.

PROFESSIONAL EXPERIENCE
Senior Frontend & Full Stack Engineer | ApexCloud Solutions | San Francisco, CA
03/2022 – Present
- Led engineering of core SaaS customer analytics portal utilizing React 18, TypeScript, Tailwind CSS, and TanStack Query, improving Largest Contentful Paint (LCP) by 42%.
- Architected resilient GraphQL and REST microservices in Node.js/Express deployed onto AWS ECS (Fargate), handling 4,500 requests/sec with 99.98% uptime.
- Spearheaded integration of LLM-based smart query assistant using OpenAI and LangChain, cutting tier-1 support tickets by 31%.
- Mentored 4 junior engineers, established weekly architecture reviews, and instituted automated CI/CD GitHub Actions reducing release cycle time from 3 days to 45 minutes.

Software Engineer | PulseMedia Digital | New York, NY
08/2019 – 02/2022
- Developed responsive web interfaces for media publishing platform using React, Redux Toolkit, and Webpack, boosting user engagement time by 18%.
- Built internal editorial content management system in Python/Django and PostgreSQL, automating digital asset processing for 80,000+ weekly articles.
- Implemented Redis caching layer for top-tier content endpoints, slashing average database query latency from 320ms to 24ms.
- Collaborated closely with product designers and QA engineers to achieve WCAG 2.1 AA accessibility compliance across all public web apps.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2015 – 2019
Relevant Coursework: Distributed Systems, Data Structures & Algorithms, Database Design, Artificial Intelligence

TECHNICAL SKILLS
- Languages: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
- Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Vite, Webpack, TanStack Query, Jest, Playwright
- Backend & Cloud: Node.js, Express, Django, PostgreSQL, Redis, AWS (ECS, S3, CloudFront, Lambda), Docker, Git, CI/CD
- Concepts: RESTful APIs, GraphQL, Microservices, System Design, CI/CD Pipelines, Performance Optimization, Agile/Scrum

KEY PROJECTS
- PromptMatrix (Open Source): Visual prompt engineering workbench built with React, FastAPI, and ChromaDB. 1,400+ GitHub stars.
- HyperMetrics CLI: Open-source developer performance benchmarking utility written in TypeScript and Go.`;

export const SAMPLE_TARGET_ROLE = "Senior Full Stack Engineer (Cloud & AI Platforms)";

export const SAMPLE_JOB_DESCRIPTION = `About the Role:
We are seeking a Senior Full Stack Engineer to build next-generation AI-powered cloud applications. You will drive both client-facing web architectures and scalable backend services that power intelligent automation workflows.

Requirements:
- 5+ years of production experience with modern TypeScript, React, and responsive frontend frameworks.
- Deep expertise in backend services utilizing Node.js, Python, and relational/NoSQL databases (PostgreSQL, Redis).
- Strong experience with cloud architectures (AWS/GCP), containerization (Docker, Kubernetes), and modern CI/CD pipelines.
- Hands-on experience integrating generative AI models, vector databases, or LLM orchestration frameworks is a major plus.
- Proven ability to write clean, testable code, lead architectural discussions, and mentor team members.`;

export const SAMPLE_ANALYSIS_RESULT: ResumeAnalysis = {
  overallScore: 84,
  breakdown: {
    atsCompatibility: 92,
    keywords: 85,
    formatting: 88,
    impactMetrics: 81,
    clarity: 79,
  },
  strengths: [
    "Quantified business achievements in nearly every experience bullet (e.g., 'improving LCP by 42%', 'slashing latency from 320ms to 24ms').",
    "Strong technical synergy with modern stack standards: TypeScript, React 18, AWS ECS, Docker, and CI/CD.",
    "Clean, standard section headers that ATS parsers parse without structural confusion or dropped tokens.",
    "Credible hands-on AI integration experience (LLMs, LangChain, ChromaDB) paired with an established open-source footprint."
  ],
  weaknesses: [
    "Summary section is slightly generic and misses explicit alignment with cloud architecture certifications or team leadership scale.",
    "Projects section lacks live deployment links or business impact context relative to high-scale enterprise environments.",
    "Could better highlight Kubernetes, Terraform, or infrastructure-as-code given the target Senior Cloud role.",
    "Soft skills and cross-functional leadership under ApexCloud could emphasize budget, executive presentation, or system resilience."
  ],
  skillsFound: [
    "TypeScript", "React 18", "Node.js", "Python", "AWS (ECS, S3, Lambda)", "PostgreSQL",
    "Redis", "Docker", "CI/CD", "GraphQL", "Tailwind CSS", "RESTful APIs", "Jest", "Microservices"
  ],
  skillsMissing: [
    "Kubernetes (K8s)", "Terraform / IaC", "Distributed Tracing (OpenTelemetry)", "Vector Search / RAG Architecture",
    "Kafka / Event Streaming", "System Security & Compliance (SOC2)"
  ],
  sectionFeedback: {
    summary: "Strong opening that highlights 5+ years and 2M+ MAU, but could be enhanced by including target architectural keywords like 'Cloud-Native Distributed Systems' and 'Generative AI Workflows'.",
    experience: "Excellent impact framing using the Google X-Y-Z formula. The latency and support-ticket metrics stand out vividly to hiring managers. Adding mention of infrastructure scaling limits would seal the senior bar.",
    projects: "PromptMatrix (1.4k stars) is an impressive project highlight. Ensure you link the live repository and describe specific latency, concurrency, or user traction figures.",
    education: "UC Berkeley B.S. CS is prominent and well-formatted. Graduated in 2019, so keeping coursework brief is appropriate for a senior candidate.",
    skills: "Comprehensive and modern. Grouping by Languages, Frontend, Backend & Cloud, and Concepts makes it easily scannable for both ATS algorithms and human recruiters."
  },
  bulletRewrites: [
    {
      before: "Led engineering of core SaaS customer analytics portal utilizing React 18, TypeScript, Tailwind CSS, and TanStack Query, improving Largest Contentful Paint (LCP) by 42%.",
      after: "Spearheaded front-end re-architecture of customer analytics portal using React 18, TypeScript, and TanStack Query; reduced LCP by 42% and increased data query throughput by 3.5x for 2M+ active accounts.",
      reason: "Adds concrete scale context (2M+ accounts) and reinforces throughput gains alongside client-side rendering speed."
    },
    {
      before: "Architected resilient GraphQL and REST microservices in Node.js/Express deployed onto AWS ECS (Fargate), handling 4,500 requests/sec with 99.98% uptime.",
      after: "Architected fault-tolerant GraphQL/REST microservices on AWS ECS (Fargate) handling 4,500 req/sec at 99.98% availability, saving $40K in annual compute costs through container auto-scaling.",
      reason: "Connects operational reliability directly to financial impact and resource optimization."
    },
    {
      before: "Spearheaded integration of LLM-based smart query assistant using OpenAI and LangChain, cutting tier-1 support tickets by 31%.",
      after: "Designed and deployed enterprise LLM semantic search agent using OpenAI API, LangChain, and vector embeddings; automated 31% of tier-1 support queries with a 94% user satisfaction rating.",
      reason: "Highlights technical design (vector embeddings) and user satisfaction metrics to substantiate ticket reduction."
    }
  ],
  jobMatch: {
    score: 87,
    missingKeywords: [
      "Kubernetes",
      "Terraform",
      "Vector Databases (Pinecone/Milvus)",
      "Observability / Prometheus",
      "API Gateway"
    ],
    matchedKeywords: [
      "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "Redis", "AWS", "Docker", "CI/CD", "System Design"
    ],
    summary: "Your background matches 87% of the requirements for this Senior role. Bridging Kubernetes, Terraform, and advanced RAG architectures will position you in the top 5% of candidates."
  },
  suggestedRoles: [
    {
      title: "Senior Full Stack Engineer (AI Platforms)",
      match: 94,
      reason: "Direct match with your React, TypeScript, Node.js, and emerging LLM integration background."
    },
    {
      title: "Lead Frontend Systems Architect",
      match: 89,
      reason: "Strong fit based on your LCP performance tuning, enterprise design system skills, and mentoring track record."
    },
    {
      title: "Cloud Application Engineer",
      match: 83,
      reason: "Matches your AWS ECS, microservices, and Docker containerization experience with high request concurrency."
    }
  ],
  roadmap: {
    days30: [
      "Deep-dive into Kubernetes container orchestration (Pods, Deployments, Services, Helm charts).",
      "Audit existing resume bullets to weave in Terraform infrastructure-as-code terminology where applicable.",
      "Publish an updated live demo and architecture diagram for PromptMatrix on GitHub."
    ],
    days60: [
      "Build a production-grade RAG pipeline using Python, LangChain, and a managed vector DB (Pinecone/Qdrant).",
      "Attain AWS Certified Solutions Architect - Associate or HashiCorp Certified Terraform Associate.",
      "Conduct 5 mock technical system design interviews focusing on distributed caching and event streaming."
    ],
    days90: [
      "Contribute a feature or fix to an upstream open-source AI or cloud infrastructure repository.",
      "Network directly with 15 Engineering Managers and Directors at target Series B to enterprise tech firms.",
      "Finalize personalized behavioral stories emphasizing cross-functional leadership, mentoring, and incident post-mortems."
    ]
  },
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      provider: "Amazon Web Services",
      relevance: "Validates cloud infrastructure design, multi-tier reliability, and cost-optimized compute patterns."
    },
    {
      name: "Certified Kubernetes Application Developer (CKAD)",
      provider: "Cloud Native Computing Foundation",
      relevance: "Fills the single largest infrastructure gap identified in the target Senior Engineer profile."
    },
    {
      name: "Terraform Associate (003)",
      provider: "HashiCorp",
      relevance: "Demonstrates production-ready Infrastructure as Code (IaC) governance."
    }
  ],
  projectIdeas: [
    {
      title: "Multi-Tenant Enterprise RAG Knowledge Hub",
      description: "Build an end-to-end document question-answering platform using Next.js 14, FastAPI, Qdrant vector database, and hybrid keyword/dense semantic search.",
      techStack: ["Next.js", "FastAPI", "Qdrant", "Docker", "LangChain"]
    },
    {
      title: "Distributed Microservices Resiliency Benchmark",
      description: "Create an open-source chaos engineering harness testing circuit breakers, rate limiters, and Redis failovers under 10k RPS load.",
      techStack: ["Node.js", "Redis Cluster", "AWS ECS", "Grafana", "k6"]
    }
  ],
  interviewQuestions: [
    {
      question: "You reduced Largest Contentful Paint (LCP) by 42% at ApexCloud. Walk me through your diagnostic process and specific browser optimizations.",
      category: "Frontend Architecture & Performance",
      tip: "Mention Chrome Performance DevTools, bundle splitting, critical CSS, image optimization, and TanStack query caching strategies."
    },
    {
      question: "How did you ensure 99.98% uptime while serving 4,500 req/sec on AWS ECS Fargate? How did you handle sudden traffic spikes?",
      category: "Backend & Cloud Scalability",
      tip: "Discuss ALB health checks, target tracking autoscaling policies, container memory/CPU limits, and database connection pooling."
    },
    {
      question: "Describe the architecture of the LLM query assistant you integrated. How did you handle latency, token costs, and hallucinations?",
      category: "Generative AI Systems",
      tip: "Explain prompt templating, response streaming via WebSockets/SSE, context window truncation, and caching frequently asked queries."
    },
    {
      question: "How do you approach decomposing a monolithic service into microservices without breaking existing client contracts?",
      category: "System Design",
      tip: "Reference the Strangler Fig pattern, database-per-service challenges, eventual consistency, and API gateway versioning."
    },
    {
      question: "You implemented a Redis caching layer that reduced latency from 320ms to 24ms. What was your cache invalidation strategy?",
      category: "Data & Caching",
      tip: "Detail TTL settings, Write-Through vs Cache-Aside patterns, and how you prevented thundering herd/cache stampede issues."
    },
    {
      question: "Tell me about a time when you disagreed with a product manager or senior architect on a technical tradeoff. How was it resolved?",
      category: "Behavioral & Leadership",
      tip: "Use the STAR method: emphasize data-driven evaluation, risk assessments, user impact, and commitment to the team's final consensus."
    },
    {
      question: "How do you evaluate whether to build custom infrastructure versus adopting managed third-party cloud services?",
      category: "Engineering Strategy",
      tip: "Discuss engineering headcount costs, vendor lock-in risks, compliance requirements, maintenance burden, and time-to-market."
    },
    {
      question: "As a mentor to junior engineers, how do you balance giving guidance with allowing them autonomy to solve hard technical problems?",
      category: "Team Leadership & Culture",
      tip: "Share a specific example of pair programming, code review constructive feedback, and setting up architectural guardrails."
    }
  ]
};
