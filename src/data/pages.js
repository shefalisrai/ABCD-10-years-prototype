import suPublications from '../assets/su-publications.png'
import suPredictors from '../assets/su-predictors.png'

// One entry per topic page, reached at #<slug>. `findings` are the topic's own highlights;
// `connected` are findings from other topics, shown under "Connected from other topics".
// Optional `figures` appear under the header, credited to a SOURCES key in `source`
// (a placeholder shows until the citation is known).
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
    findings: ['su-patterns', 'su-prenatal', 'su-individual', 'su-social', 'su-health', 'su-brain', 'su-consequences'],
    connected: [],
    figures: [
      {
        src: suPublications,
        width: 616,
        height: 830,
        title: 'ABCD substance use publications and key findings',
        alt: 'Number of ABCD substance use publications by area, with key findings: 52 on prenatal substance exposure, 15 on family history, 9 on patterns of substance use, 25 on attitudes, 60 on predictors of substance use, and 18 on consequences of substance use.',
      },
      {
        src: suPredictors,
        width: 746,
        height: 742,
        title: 'Predictors of early substance use initiation',
        alt: 'Wheel of predictors of early substance use initiation in nine areas: physical health and screen time, sociocultural factors, parenting factors, brain features, genetics, psychopathology, personality and cognition, with arrows showing the direction of each link.',
      },
    ],
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
