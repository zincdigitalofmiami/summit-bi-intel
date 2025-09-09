/**
 * Auto-Diagnostic Agent for Summit BI Intel
 * Learns from application patterns and automatically detects/fixes issues
 */

export interface DiagnosticIssue {
  id: string;
  type: 'build' | 'runtime' | 'dependency' | 'routing' | 'performance' | 'security';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  pattern: string;
  autoFixAvailable: boolean;
  learnedFrom: string[];
  occurrences: number;
  lastSeen: string;
  solution?: string;
}

export interface DiagnosticKnowledge {
  commonIssues: DiagnosticIssue[];
  fixPatterns: Record<string, string>;
  preventionRules: string[];
  learningLog: Array<{
    timestamp: string;
    issue: string;
    resolution: string;
    effectiveness: number;
  }>;
}

// Learned knowledge base from Summit BI Intel development
export const diagnosticKnowledge: DiagnosticKnowledge = {
  commonIssues: [
    {
      id: "webpack-module-not-found",
      type: "build",
      severity: "critical",
      description: "Webpack cannot find module './XXX.js' - typically cache corruption",
      pattern: "Cannot find module './\\d+\\.js'",
      autoFixAvailable: true,
      learnedFrom: ["dashboard-green-screen-2025-01-20"],
      occurrences: 3,
      lastSeen: "2025-01-20T15:43:00Z",
      solution: "rm -rf .next node_modules/.cache && npm install"
    },
    {
      id: "next15-async-params",
      type: "build",
      severity: "high",
      description: "Next.js 15 requires async params in dynamic routes",
      pattern: "Type.*params.*does not satisfy.*PageProps",
      autoFixAvailable: true,
      learnedFrom: ["proposal-sign-page-build-error"],
      occurrences: 1,
      lastSeen: "2025-01-20T15:30:00Z",
      solution: "Convert params to Promise<{param: string}> and use useEffect"
    },
    {
      id: "phantom-route-conflict",
      type: "routing",
      severity: "critical", 
      description: "Next.js detects duplicate routes that don't exist in filesystem",
      pattern: "You cannot have two parallel pages that resolve to the same path",
      autoFixAvailable: true,
      learnedFrom: ["dashboard-route-group-conflict"],
      occurrences: 5,
      lastSeen: "2025-01-20T14:00:00Z",
      solution: "Clear .next cache and verify no duplicate route files exist"
    },
    {
      id: "pdf-blob-type-error",
      type: "build",
      severity: "medium",
      description: "PDF-lib Uint8Array not compatible with Blob constructor",
      pattern: "Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'BlobPart'",
      autoFixAvailable: true,
      learnedFrom: ["proposal-pdf-generation"],
      occurrences: 2,
      lastSeen: "2025-01-20T15:35:00Z",
      solution: "Wrap pdf bytes with new Uint8Array(bytes)"
    },
    {
      id: "import-sorting-conflicts",
      type: "build",
      severity: "low",
      description: "Prettier/Biome import sorting conflicts with Trunk",
      pattern: "The imports and exports are not sorted",
      autoFixAvailable: true,
      learnedFrom: ["multiple-component-files"],
      occurrences: 15,
      lastSeen: "2025-01-20T16:00:00Z",
      solution: "Run npx @biomejs/biome format --write or adjust .trunk/trunk.yaml"
    }
  ],
  
  fixPatterns: {
    "webpack-cache-clear": "rm -rf .next node_modules/.cache && npm install",
    "next15-async-params": "Convert params to Promise type and use useEffect",
    "route-conflict": "Clear Next.js cache and verify filesystem routes",
    "pdf-blob-fix": "new Blob([new Uint8Array(bytes)], { type: 'application/pdf' })",
    "import-sort": "npx @biomejs/biome format --write"
  },

  preventionRules: [
    "Always clear .next cache when seeing module resolution errors",
    "Use Promise<{param}> for all dynamic route params in Next.js 15+", 
    "Wrap PDF-lib output with Uint8Array for Blob creation",
    "Run build test before committing to catch type errors",
    "Use consistent import sorting configuration across tools"
  ],

  learningLog: [
    {
      timestamp: "2025-01-20T15:43:00Z",
      issue: "Dashboard showing green screen due to module './586.js' not found",
      resolution: "Killed multiple dev servers, cleared caches, clean reinstall",
      effectiveness: 100
    },
    {
      timestamp: "2025-01-20T15:35:00Z", 
      issue: "Build failing on PDF Blob type incompatibility",
      resolution: "Added Uint8Array wrapper for pdf-lib output",
      effectiveness: 100
    },
    {
      timestamp: "2025-01-20T15:30:00Z",
      issue: "Next.js 15 async params type error in dynamic routes",
      resolution: "Updated params interface to Promise<{token: string}>",
      effectiveness: 100
    }
  ]
};

export class AutoDiagnosticAgent {
  private knowledge: DiagnosticKnowledge;
  
  constructor() {
    this.knowledge = diagnosticKnowledge;
  }

  /**
   * Analyze error message and return known issue if found
   */
  analyzeError(errorMessage: string): DiagnosticIssue | null {
    for (const issue of this.knowledge.commonIssues) {
      const regex = new RegExp(issue.pattern, 'i');
      if (regex.test(errorMessage)) {
        // Update occurrence count and last seen
        issue.occurrences += 1;
        issue.lastSeen = new Date().toISOString();
        return issue;
      }
    }
    return null;
  }

  /**
   * Get auto-fix command for a known issue
   */
  getAutoFix(issueId: string): string | null {
    const issue = this.knowledge.commonIssues.find(i => i.id === issueId);
    if (issue?.autoFixAvailable && issue.solution) {
      return issue.solution;
    }
    return null;
  }

  /**
   * Learn from new issue and resolution
   */
  learnFromIssue(issue: string, resolution: string, effectiveness: number) {
    this.knowledge.learningLog.push({
      timestamp: new Date().toISOString(),
      issue,
      resolution, 
      effectiveness
    });

    // If effectiveness > 90%, consider adding to common issues
    if (effectiveness > 90) {
      console.log(`🧠 Agent learned new high-effectiveness solution: ${resolution}`);
    }
  }

  /**
   * Generate preventive recommendations
   */
  getPreventiveActions(): string[] {
    const recentIssues = this.knowledge.learningLog
      .filter(log => new Date(log.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .map(log => log.issue);

    const recommendations = [...this.knowledge.preventionRules];
    
    if (recentIssues.some(issue => issue.includes('cache'))) {
      recommendations.push("Consider implementing automated cache clearing in CI/CD");
    }
    
    if (recentIssues.some(issue => issue.includes('module'))) {
      recommendations.push("Add webpack bundle analyzer to detect module issues early");
    }

    return recommendations;
  }

  /**
   * Generate diagnostic report
   */
  generateReport(): string {
    const criticalIssues = this.knowledge.commonIssues.filter(i => i.severity === 'critical');
    const recentLearning = this.knowledge.learningLog.slice(-5);
    
    return `
# 🤖 Auto-Diagnostic Agent Report

## Critical Issues Tracked: ${criticalIssues.length}
${criticalIssues.map(issue => `- **${issue.id}**: ${issue.description} (${issue.occurrences} occurrences)`).join('\n')}

## Recent Learning:
${recentLearning.map(log => `- ${log.issue} → ${log.resolution} (${log.effectiveness}% effective)`).join('\n')}

## Prevention Recommendations:
${this.getPreventiveActions().map(rule => `- ${rule}`).join('\n')}

Generated: ${new Date().toISOString()}
    `.trim();
  }
}

// Singleton instance for the application
export const diagnosticAgent = new AutoDiagnosticAgent();
