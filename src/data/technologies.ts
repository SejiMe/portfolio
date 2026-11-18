interface TechnologyGroup {
  title: string;
  logos: Record<string,string>;
  skills: string[];
}

export const technologies: TechnologyGroup[] = [
  {
    title: 'Languages',
    logos: {'C#':'csharp', TypeScript:'typescript', JavaScript:'javascript', Python:'python', HTML:'html5', CSS:'css3', Bash:'bash'},
    skills: ['T-SQL']
  },
  {
    title: 'Frontend & desktop',
    logos: {React:'react', 'Next.js':'nextjs', Blazor:'blazor', Astro:'astro', 'Tailwind CSS':'tailwindcss', MobX:'mobx', Zustand:'zustand'},
    skills: ['Blazor WebAssembly', 'Mantine UI', 'React Context', 'Razor', 'ASP.NET Web Forms', 'WinForms']
  },
  {
    title: 'Backend & architecture',
    logos: {'ASP.NET Core':'dotnetcore', 'Node.js':'nodejs', 'Socket.IO':'socketio', JWT:'jwt', OAuth:'oauth'},
    skills: ['.NET 6–8', 'REST APIs', 'Minimal APIs', 'SignalR', 'WebSockets', 'Background services', 'Vertical slice architecture', 'Modular APIs', 'API versioning', 'Dependency injection', 'Custom middleware', 'OAuth 2.0', 'Microservices patterns']
  },
  {
    title: 'Data & reporting',
    logos: {'SQL Server':'microsoftsqlserver', PostgreSQL:'postgresql', 'Entity Framework Core':'entityframeworkcore', Prisma:'prisma'},
    skills: ['Dapper', 'SSMS', 'SSRS', 'Stored procedures', 'Views & indexes', 'Query optimization', 'Data quality', 'Database repair scripts']
  },
  {
    title: 'AI & automation',
    logos: {'Claude Code':'claudecode', Codex:'codex', 'GitHub Copilot':'githubcopilot', Gemini:'gemini', Ollama:'ollama', n8n:'n8n'},
    skills: ['ChatGPT', 'Reusable Claude skills', 'AI harnesses', 'Code auditing', 'Test generation', 'Webhooks', 'Google Sheets API', 'Discord API', 'Smart Messaging Suite', 'Microsoft 365 Exchange']
  },
  {
    title: 'Infrastructure & delivery',
    logos: {Azure:'azure', 'Azure DevOps':'azuredevops', Docker:'docker', Git:'git', GitHub:'github', 'Ubuntu Server':'ubuntu', SSH:'ssh', PM2:'pm2', OpenTelemetry:'opentelemetry', Grafana:'grafana'},
    skills: ['Azure Pipelines', 'CI/CD', 'Docker Desktop', 'Windows Server', 'IIS', 'Nutanix', 'Release validation']
  },
  {
    title: 'Testing & engineering tools',
    logos: {Playwright:'playwright', 'React Testing Library':'testinglibrary', SonarQube:'sonarqube', Postman:'postman', 'Visual Studio':'visualstudio', 'VS Code':'vscode'},
    skills: ['Jest', 'xUnit', 'bUnit', 'NUnit', 'MSTest', 'Argus', 'Thunder Client', 'Unit & integration testing', 'End-to-end testing', 'Regression testing', 'Code review', 'User acceptance testing']
  },
  {
    title: 'Support & collaboration',
    logos: {Jira:'jira', Confluence:'confluence', Slack:'slack'},
    skills: ['osTicket', 'Zoho Helpdesk', 'SharePoint', 'Microsoft Teams', 'BizBox HIS', 'Service desk & application support', 'Enterprise SaaS configuration', 'Incident triage & root cause analysis', 'Vendor escalation', 'Agile / Scrum', 'Sprint refinement & estimation', 'Retrospectives', 'Requirements clarification', 'Stakeholder coordination', 'Technical documentation & SOPs', 'User training', 'Process improvement']
  }
];
