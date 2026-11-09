import suPublications from '../assets/su-publications.png'
import suPredictors from '../assets/su-predictors.png'
// From MentalHealth_Jar.png, cropped to the jar and its four labels.
import mentalHealthJar from '../assets/mental-health-jar.jpg'

const CEREBRA_GUIDE = 'https://cerebra.org.uk/wp-content/uploads/2023/09/Mental-health-in-children-with-rare-gentic-conditions.pdf'
const NORTON_BOOK = 'https://wwnorton.com/books/How-to-Talk-with-Families-About-Genetics-and-Psychiatric-Illness'

// One entry per topic page, reached at #<slug>. `findings` are the topic's own highlights;
// `connected` are findings from other topics, shown under "Connected from other topics".
// Optional `figures` appear under the header (headed `figuresTitle`, default "The research at
// a glance"), credited to a SOURCES key in `source` or to free text in `credit` (linked to
// `creditUrl`); a placeholder shows until the citation is known. An optional `explainer` sits
// beside the figures, and an optional `note` (with a "more info" link) sits under the title.
export const PAGES = {
  mh: {
    slug: 'mental-health',
    title: 'Mental Health',
    intro: "ABCD's 10 years of adolescent mental health",
    findings: ['mh-activity', 'mh-screens', 'mh-sleep', 'mh-complex', 'mh-adversity', 'mh-prenatal'],
    connected: ['ffc-family', 'ffc-school', 'ffc-unfair', 'gen-ple'],
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
        alt: 'Wheel of predictors of early substance use initiation in nine areas: physical health and screen time, sociocultural factors, parenting factors, brain features, genetics, psychopathology, personality, and cognition, with arrows showing the direction of each link.',
      },
    ],
    resources: [
      {
        title: 'Substance Use Information and Resources',
        kind: 'Youth resources · ABCD Study',
        url: 'https://abcdstudy.org/youth-resources/youth-resources-prevention/',
      },
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
  gen: {
    slug: 'genetics',
    title: 'Genetics',
    intro: "ABCD's 10 years of genetics and adolescent development",
    findings: ['gen-destiny', 'gen-su', 'gen-cognition', 'gen-sleep', 'gen-ple'],
    connected: ['mh-sleep', 'su-brain', 'mh-screens'],
    figuresTitle: 'Understanding genetic risk: the mental health jar',
    figures: [
      {
        src: mentalHealthJar,
        width: 1200,
        height: 740,
        title: 'The mental health jar',
        credit: 'Adapted from Peay & Austin (2011), How to Talk with Families About Genetics and Psychiatric Illness, W. W. Norton',
        creditUrl: NORTON_BOOK,
        alt: 'A jar partly filled with marbles. Pink marbles at the bottom are genetic factors and purple marbles on top are environmental factors; larger marbles have a moderate effect and smaller ones a small effect.',
      },
    ],
    // Plain-language summary of the Mental Health Jar section of the Cerebra guide (pages 8–12),
    // reworded rather than quoted.
    explainer: {
      intro: 'Everyone has a mental health jar. The fuller it gets, the more vulnerable a person is to a mental health condition.',
      terms: [
        { term: 'Genetic factors', color: '#e85a6a', text: "The genes we're born with that cannot be changed and are responsible for how we are built from the inside." },
        { term: 'Environmental factors', color: 'var(--violet)', text: 'Life experiences and stresses. These can be reduced or removed entirely, and some can build up over time.' },
        { term: 'Protective factors', color: 'var(--abcd-green)', text: 'These support wellbeing, like sleeping and eating well, time with friends and family, and hobbies. They make the jar itself bigger.' },
      ],
      outro: "Each factor can be small or large, like the different-sized marbles in the jar. The same experience can take up more room in one person's jar than in another's, which is why genes alone can't tell us who will develop a mental health condition.",
      sources: [
        { title: 'Mental Health in Children with Rare Genetic Conditions: A Guide for Parents and Carers', note: "O'Donovan et al., 2023 · Cerebra and Cardiff University", url: CEREBRA_GUIDE },
        { title: 'How to Talk with Families About Genetics and Psychiatric Illness', note: 'Peay & Austin, 2011 · W. W. Norton', url: NORTON_BOOK },
      ],
    },
    resources: [
      {
        title: 'Genetic Testing and Results',
        kind: 'Youth resources · ABCD Study',
        url: 'https://abcdstudy.org/youth-resources/youth-resources-genetic-testing/',
      },
      {
        title: 'A decade of discovery: genomic data in the ABCD Study',
        kind: 'Review paper · Hernandez et al., 2026',
        url: 'https://doi.org/10.1016/j.dcn.2026.101723',
      },
      {
        title: 'Mental Health in Children with Rare Genetic Conditions',
        kind: 'Guide for families · PDF · Cerebra',
        url: CEREBRA_GUIDE,
      },
    ],
  },
  img: {
    slug: 'brain-imaging',
    title: 'Brain Imaging',
    intro: "ABCD's 10 years of adolescent brain imaging",
    note: {
      lead: 'What is an MRI?',
      text: 'An MRI (magnetic resonance imaging) scan is a safe way to get a clear picture of the brain.',
      link: { text: 'more info', href: 'https://abcdstudy.org/families/faqs/' },
    },
    findings: ['img-change', 'img-cognition', 'img-memory', 'img-inhibition', 'img-reward', 'img-puberty', 'img-neighborhood', 'img-adversity'],
    // The cards so far cover task fMRI only.
    todo: 'Need to add rs-fMRI, diffusion MRI, and structural MRI results.',
    connected: ['mh-complex', 'mh-adversity', 'su-social', 'su-brain'],
  },
}
