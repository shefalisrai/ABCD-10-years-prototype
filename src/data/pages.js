// One entry per topic page, reached at #<slug>. `findings` are the topic's own highlights;
// `connected` are findings from other topics, shown under "Connected from other topics".
export const PAGES = {
  mh: {
    slug: 'mental-health',
    title: 'Mental Health',
    intro: "ABCD's 10 years of adolescent mental health",
    findings: ['mh-activity', 'mh-screens', 'mh-sleep', 'mh-complex', 'mh-adversity', 'mh-prenatal'],
    connected: ['ffc-family', 'ffc-school', 'ffc-unfair', 'gen-ple'],
    resourcesTitle: 'Related infographics & data briefs',
    resources: [
      {
        title: 'The Importance of Sleep for Youth',
        kind: 'Infographic · PDF · English / Español',
        url: 'https://abcdstudy.org/infographics/',
      },
      {
        title: 'The Pros and Cons of Screen Use',
        kind: 'Infographic · PDF · English / Español',
        url: 'https://abcdstudy.org/infographics/',
      },
      {
        title: 'Youth Experiences During the COVID-19 Pandemic',
        kind: 'Infographic · PDF',
        url: 'https://abcdstudy.org/infographics/',
      },
      {
        title: 'Raising Resilient Teens',
        kind: 'Data brief',
        url: 'https://abcdstudy.org/data-briefs/',
      },
    ],
  },
  su: {
    slug: 'substance-use',
    title: 'Substance Use',
    intro: "ABCD's 10 years of adolescent substance use",
    findings: ['su-patterns', 'su-prenatal', 'su-family', 'su-individual', 'su-social', 'su-health', 'su-brain', 'su-consequences'],
    connected: [],
    resourcesTitle: 'Related infographics',
    resources: [
      {
        title: 'Teen Substance Use: Insights From the ABCD Study®',
        kind: 'Infographic · PDF · English / Español',
        url: 'https://abcdstudy.org/infographics/',
      },
      {
        title: 'FENTANYL: What You Need to Know',
        kind: 'Infographic · PDF · English / Español',
        url: 'https://abcdstudy.org/infographics/',
      },
    ],
  },
}
