// Mock data store for VikingSwarm Studio v5
// All data is heuristic/mocked for immediate end-to-end demo

export interface Project {
  id: string;
  name: string;
  description: string;
  mode: 'consulting' | 'social' | 'research';
  createdAt: string;
  status: 'draft' | 'running' | 'completed';
  tags: string[];
}

export interface ConsultingRun {
  id: string;
  projectId: string;
  scenario: 'baseline' | 'upside' | 'downside';
  levers: Lever[];
  assumptions: Assumption[];
  results: ConsultingResult;
  agentDebate: AgentMessage[];
  createdAt: string;
}

export interface Lever {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  unit: string;
}

export interface Assumption {
  id: string;
  text: string;
  confidence: 'high' | 'medium' | 'low';
  source: string;
}

export interface ConsultingResult {
  roi: { low: number; mid: number; high: number };
  uplift: { low: number; mid: number; high: number };
  initiatives: Initiative[];
  rationale: string;
  evidence: string[];
}

export interface Initiative {
  id: string;
  name: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  status: 'accepted' | 'rejected' | 'pending';
  description: string;
}

export interface AgentMessage {
  id: string;
  agent: string;
  role: 'strategist' | 'skeptic' | 'analyst' | 'mediator';
  message: string;
  timestamp: string;
}

export interface SocialRun {
  id: string;
  projectId: string;
  config: SocialConfig;
  timeline: SocialTimelinePoint[];
  results: SocialResult;
  createdAt: string;
}

export interface SocialConfig {
  agentCount: number;
  rounds: number;
  influence: number;
  sentimentShock: number;
  platforms: string[];
}

export interface SocialTimelinePoint {
  round: number;
  positive: number;
  neutral: number;
  negative: number;
  viral: number;
}

export interface SocialResult {
  finalSentiment: number;
  reach: number;
  engagement: number;
  viralMoments: number;
  topPlatform: string;
}

export interface ResearchRun {
  id: string;
  projectId: string;
  clusters: ResearchCluster[];
  themes: string[];
  overallSentiment: number;
  suggestedResponses: SuggestedResponse[];
  createdAt: string;
}

export interface ResearchCluster {
  id: string;
  label: string;
  size: number;
  sentiment: number;
  keywords: string[];
}

export interface SuggestedResponse {
  id: string;
  tone: 'empathetic' | 'professional' | 'direct' | 'casual';
  text: string;
  clusterId: string;
}

export interface LearningEntry {
  id: string;
  initiative: string;
  status: 'accepted' | 'rejected';
  reason: string;
  date: string;
  pattern: string;
}

// ============ DEMO DATA ============

export const demoProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Nordic Market Entry Strategy',
    description: 'Evaluate market entry options for SaaS expansion into Scandinavian markets with competitive analysis and ROI projections.',
    mode: 'consulting',
    createdAt: '2025-03-10T09:00:00Z',
    status: 'completed',
    tags: ['strategy', 'market-entry', 'nordics'],
  },
  {
    id: 'proj-2',
    name: 'Product Launch Social Impact',
    description: 'Simulate social media response to new product launch across Twitter, LinkedIn, and Reddit channels.',
    mode: 'social',
    createdAt: '2025-03-12T14:00:00Z',
    status: 'completed',
    tags: ['social', 'product-launch', 'sentiment'],
  },
  {
    id: 'proj-3',
    name: 'Customer Feedback Analysis Q1',
    description: 'Cluster and analyze 2,400 customer feedback responses with sentiment scoring and response generation.',
    mode: 'research',
    createdAt: '2025-03-14T11:00:00Z',
    status: 'running',
    tags: ['research', 'feedback', 'NPS'],
  },
  {
    id: 'proj-4',
    name: 'Cost Optimization Review',
    description: 'Identify cost reduction levers across operations with scenario modeling for baseline, upside, and downside cases.',
    mode: 'consulting',
    createdAt: '2025-03-15T08:00:00Z',
    status: 'draft',
    tags: ['cost', 'optimization', 'operations'],
  },
];

export const demoConsultingRun: ConsultingRun = {
  id: 'crun-1',
  projectId: 'proj-1',
  scenario: 'baseline',
  levers: [
    { id: 'l1', name: 'Sales Team Size', value: 12, min: 5, max: 30, unit: 'headcount' },
    { id: 'l2', name: 'Marketing Spend', value: 450, min: 100, max: 1000, unit: 'K USD' },
    { id: 'l3', name: 'Price Point', value: 89, min: 49, max: 149, unit: 'USD/mo' },
    { id: 'l4', name: 'Partner Channels', value: 3, min: 0, max: 10, unit: 'partners' },
  ],
  assumptions: [
    { id: 'a1', text: 'Nordic SaaS market grows at 18% CAGR through 2027', confidence: 'high', source: 'Gartner 2024' },
    { id: 'a2', text: 'Customer acquisition cost will stabilize after 6 months', confidence: 'medium', source: 'Internal benchmarks' },
    { id: 'a3', text: 'No major competitor launches in the next 12 months', confidence: 'low', source: 'Market intelligence' },
  ],
  results: {
    roi: { low: 1.8, mid: 3.2, high: 5.1 },
    uplift: { low: 12, mid: 28, high: 45 },
    initiatives: [
      { id: 'i1', name: 'Helsinki Office Setup', impact: 'high', effort: 'high', status: 'accepted', description: 'Establish local presence with a 5-person team in Helsinki to accelerate Nordic market penetration.' },
      { id: 'i2', name: 'Partner Channel Program', impact: 'high', effort: 'medium', status: 'accepted', description: 'Launch certified partner program targeting 10 Nordic consulting firms.' },
      { id: 'i3', name: 'Localized Product Tier', impact: 'medium', effort: 'low', status: 'pending', description: 'Create a Nordic-specific pricing tier with local currency support.' },
      { id: 'i4', name: 'Enterprise Sales Motion', impact: 'medium', effort: 'high', status: 'rejected', description: 'Build enterprise sales team for large Nordic accounts. Rejected due to resource constraints.' },
    ],
    rationale: 'The Nordic SaaS market presents a strong growth opportunity with favorable unit economics. Our analysis indicates a baseline ROI of 3.2x with primary value driven by partner channels and local market presence.',
    evidence: ['Gartner Nordic SaaS Report 2024', 'Internal CAC benchmarks Q4 2024', 'Competitor analysis: 3 direct, 7 indirect competitors identified'],
  },
  agentDebate: [
    { id: 'ad1', agent: 'Strategist', role: 'strategist', message: 'The Nordic market is underpenetrated for our segment. A Helsinki office provides credibility and local relationships that are critical in Scandinavian B2B culture.', timestamp: '09:01' },
    { id: 'ad2', agent: 'Skeptic', role: 'skeptic', message: 'The fixed cost of a Helsinki office is significant. Have we considered a remote-first approach with local contractors? The ROI sensitivity to headcount is concerning.', timestamp: '09:02' },
    { id: 'ad3', agent: 'Analyst', role: 'analyst', message: 'Data supports the hybrid approach. Companies with local presence in Nordics see 2.3x faster deal cycles. However, the break-even extends to 14 months with a full office.', timestamp: '09:03' },
    { id: 'ad4', agent: 'Mediator', role: 'mediator', message: 'Compromise: Start with a co-working presence and 3 hires. Scale to a full office once pipeline reaches $2M ARR. This reduces initial burn by 40%.', timestamp: '09:04' },
    { id: 'ad5', agent: 'Strategist', role: 'strategist', message: 'Acceptable. The partner channel program can run in parallel — it\'s lower cost and tests market demand simultaneously.', timestamp: '09:05' },
  ],
  createdAt: '2025-03-10T09:00:00Z',
};

export const demoSocialRun: SocialRun = {
  id: 'srun-1',
  projectId: 'proj-2',
  config: {
    agentCount: 500,
    rounds: 20,
    influence: 0.35,
    sentimentShock: 0.2,
    platforms: ['Twitter', 'LinkedIn', 'Reddit'],
  },
  timeline: Array.from({ length: 20 }, (_, i) => ({
    round: i + 1,
    positive: Math.min(65, 30 + i * 2 + Math.random() * 5),
    neutral: Math.max(15, 40 - i * 1.2 + Math.random() * 3),
    negative: Math.max(5, 30 - i * 0.8 - Math.random() * 3),
    viral: i > 8 ? Math.floor(Math.random() * 4) : 0,
  })),
  results: {
    finalSentiment: 0.68,
    reach: 124500,
    engagement: 8.4,
    viralMoments: 3,
    topPlatform: 'LinkedIn',
  },
  createdAt: '2025-03-12T14:00:00Z',
};

export const demoResearchRun: ResearchRun = {
  id: 'rrun-1',
  projectId: 'proj-3',
  clusters: [
    { id: 'c1', label: 'Onboarding Experience', size: 420, sentiment: 0.72, keywords: ['setup', 'getting started', 'tutorial', 'documentation'] },
    { id: 'c2', label: 'Performance Issues', size: 310, sentiment: -0.45, keywords: ['slow', 'loading', 'timeout', 'lag'] },
    { id: 'c3', label: 'Feature Requests', size: 580, sentiment: 0.35, keywords: ['integration', 'API', 'export', 'automation'] },
    { id: 'c4', label: 'Pricing Concerns', size: 290, sentiment: -0.28, keywords: ['expensive', 'value', 'tier', 'discount'] },
    { id: 'c5', label: 'Support Quality', size: 380, sentiment: 0.61, keywords: ['helpful', 'responsive', 'resolved', 'support team'] },
    { id: 'c6', label: 'Mobile Experience', size: 220, sentiment: -0.15, keywords: ['mobile', 'app', 'responsive', 'touch'] },
  ],
  themes: ['User experience improvements needed', 'Performance is a key pain point', 'Strong demand for integrations', 'Support team is well-regarded'],
  overallSentiment: 0.32,
  suggestedResponses: [
    { id: 'sr1', tone: 'empathetic', text: 'We hear your concerns about performance. Our engineering team has prioritized infrastructure improvements in our next sprint, and we expect significant speed improvements within 4 weeks.', clusterId: 'c2' },
    { id: 'sr2', tone: 'professional', text: 'Thank you for your feedback on pricing. We\'re reviewing our tier structure to ensure we offer strong value at every level. We\'d love to discuss your specific needs — please reach out to your account manager.', clusterId: 'c4' },
    { id: 'sr3', tone: 'direct', text: 'We\'re building integrations with the top 10 requested platforms. Expect Salesforce and HubSpot connectors in Q2, with Slack and Zapier following in Q3.', clusterId: 'c3' },
    { id: 'sr4', tone: 'casual', text: 'Great news — we\'re completely revamping the mobile experience! A dedicated mobile team is working on a native-feel interface that should land by end of Q2. Stay tuned! 📱', clusterId: 'c6' },
  ],
  createdAt: '2025-03-14T11:00:00Z',
};

export const demoLearningEntries: LearningEntry[] = [
  { id: 'le1', initiative: 'Helsinki Office Setup', status: 'accepted', reason: 'Strong local presence needed for Nordic B2B culture', date: '2025-03-10', pattern: 'Market entry requires physical presence in relationship-driven markets' },
  { id: 'le2', initiative: 'Enterprise Sales Motion', status: 'rejected', reason: 'Resource constraints — insufficient headcount for parallel initiative', date: '2025-03-10', pattern: 'Avoid parallel high-effort initiatives when team capacity is constrained' },
  { id: 'le3', initiative: 'Aggressive Pricing Strategy', status: 'rejected', reason: 'Risk of race to bottom in price-sensitive segment', date: '2025-03-08', pattern: 'Value-based pricing outperforms cost-based in B2B SaaS markets' },
  { id: 'le4', initiative: 'Partner Channel Program', status: 'accepted', reason: 'Low cost, high leverage approach to market expansion', date: '2025-03-10', pattern: 'Partner channels provide 2-3x ROI compared to direct sales in new markets' },
  { id: 'le5', initiative: 'Social Media Blitz Campaign', status: 'accepted', reason: 'Simulation showed 68% positive sentiment with viral potential', date: '2025-03-12', pattern: 'Multi-platform launch campaigns benefit from staggered timing' },
];

// Simple in-memory store with localStorage persistence
const STORAGE_KEY = 'vikingswarm_v5_store';

interface Store {
  projects: Project[];
  consultingRuns: ConsultingRun[];
  socialRuns: SocialRun[];
  researchRuns: ResearchRun[];
  learningEntries: LearningEntry[];
}

function loadStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    projects: [...demoProjects],
    consultingRuns: [demoConsultingRun],
    socialRuns: [demoSocialRun],
    researchRuns: [demoResearchRun],
    learningEntries: [...demoLearningEntries],
  };
}

function saveStore(store: Store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

let store = loadStore();

export const dataStore = {
  getProjects: () => store.projects,
  getProject: (id: string) => store.projects.find(p => p.id === id),
  addProject: (p: Omit<Project, 'id' | 'createdAt'>) => {
    const project: Project = { ...p, id: `proj-${Date.now()}`, createdAt: new Date().toISOString() };
    store.projects.unshift(project);
    saveStore(store);
    return project;
  },
  getConsultingRun: (projectId: string) => store.consultingRuns.find(r => r.projectId === projectId) || demoConsultingRun,
  getSocialRun: (projectId: string) => store.socialRuns.find(r => r.projectId === projectId) || demoSocialRun,
  getResearchRun: (projectId: string) => store.researchRuns.find(r => r.projectId === projectId) || demoResearchRun,
  getLearningEntries: () => store.learningEntries,
  updateInitiativeStatus: (id: string, status: 'accepted' | 'rejected') => {
    for (const run of store.consultingRuns) {
      const init = run.results.initiatives.find(i => i.id === id);
      if (init) {
        init.status = status;
        saveStore(store);
        return;
      }
    }
  },
  resetDemo: () => {
    localStorage.removeItem(STORAGE_KEY);
    store = loadStore();
  },
};
