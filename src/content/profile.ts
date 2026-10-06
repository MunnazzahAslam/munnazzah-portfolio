/**
 * Everything the site says about Munnazzah: one source for the home page, the
 * about page and (later) the CV PDF, so they never disagree.
 */

export const profile = {
  name: "Munnazzah Aslam",
  role: "Senior frontend engineer",
  positioning: "I build fast, accessible React products, with AI that can't make things up.",
  subline: "Senior frontend engineer with five years in production. I design what I build, too.",
  status: ["UAE", "Open to frontend roles"],
  // Logos are one-colour versions in the site's ink, in public/previously. Each
  // has its own height so wordmarks and marks-with-wordmarks look the same size.
  previously: [
    { name: "NymCard", logo: "/previously/nymcard.svg", width: 852, height: 108, show: 15 },
    { name: "10Pearls", logo: "/previously/10pearls.svg", width: 150, height: 47, show: 26 },
    { name: "SpurSol", logo: "/previously/spursol.png", width: 508, height: 120, show: 24 },
    { name: "TransformX", logo: "/previously/transformx.png", width: 856, height: 120, show: 20 },
  ],
  email: "aslammunnazzah@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/munnazzahaslam" },
    { label: "GitHub", href: "https://github.com/MunnazzahAslam" },
  ],
  location: "Sharjah, UAE",

  intro: [
    "I'm a frontend engineer with five years in production: fintech at NymCard, enterprise products at 10Pearls, and early-stage builds before that. React, Angular and TypeScript are home, and I'm comfortable a long way down the stack.",
    "AI is part of how I work every day. I brought Claude Code into a production team at NymCard, and I build AI features where the model has one narrow job and the server checks what it returns.",
    "I'm looking for a senior frontend role in the UAE, on a team that cares how things look, how fast they load and who can use them.",
  ],

  strengths: [
    {
      name: "Frontend",
      text: "Five years of React, Angular and TypeScript in production, from payment dashboards to component libraries. Fast, accessible and tested.",
    },
    {
      name: "AI",
      text: "AI features with a real job and guardrails: the model sets filters or books a slot, and the server checks everything it returns.",
    },
    {
      name: "Design",
      text: "I design what I build: type, grid, motion, and the restraint to leave things out. This site is the sample.",
    },
  ],

  // Newest first. One line of impact per role.
  experience: [
    {
      years: "2023 – 2026",
      company: "NymCard",
      title: "Senior Software Engineer, fintech",
      impact: "Led the year-long rebuild of Neo, NymCard's longest-standing client, across some 50 stakeholders, and owned the core modules of the client platform.",
    },
    {
      years: "2022 – 2023",
      company: "10Pearls",
      title: "Software Engineer",
      impact: "Led internationalisation for Sophos and built its component library and Storybook from scratch.",
    },
    {
      years: "2021 – 2022",
      company: "SpurSol",
      title: "Software Engineer",
      impact: "Helped ship the Knoccs MVP in six months, on a team of eight.",
    },
    {
      years: "2020 – 2021",
      company: "TransformX",
      title: "Full Stack Engineer",
      impact: "Built a CPaaS aggregator from Figma to a live AWS deployment, then hired and trained two engineers.",
    },
  ],

  skills: [
    { name: "Frontend", items: ["React", "TypeScript", "Next.js", "Angular"] },
    { name: "AI", items: ["Claude API", "Claude Code", "LangChain", "OpenAI SDK"] },
    { name: "Backend I'm comfortable in", items: ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Supabase"] },
  ],

  education: [
    { years: "2022 – 2024", what: "M.Sc. Computer Science", where: "Institute of Business Administration (IBA)" },
    { years: "2017 – 2021", what: "B.Eng. Software Engineering", where: "NED University of Engineering & Technology" },
  ],

  languages: ["English", "German", "Urdu", "Hindi"],
} as const;
