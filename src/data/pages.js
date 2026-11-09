import suPublications from '../assets/su-publications.png'
import suPredictors from '../assets/su-predictors.png'
// From MentalHealth_Jar.png, cropped to the jar and its four labels.
import mentalHealthJar from '../assets/mental-health-jar.jpg'
// Drawn by scripts/imaging_art.py from Greybrain.svg and the theme bubbles.
import taskFmri from '../assets/imaging-task-fmri.svg'
import restingFmri from '../assets/imaging-resting-fmri.svg'
import diffusionMri from '../assets/imaging-diffusion-mri.svg'
import structuralMri from '../assets/imaging-structural-mri.svg'

const CEREBRA_GUIDE = 'https://cerebra.org.uk/wp-content/uploads/2023/09/Mental-health-in-children-with-rare-gentic-conditions.pdf'
const NORTON_BOOK = 'https://wwnorton.com/books/How-to-Talk-with-Families-About-Genetics-and-Psychiatric-Illness'

// One entry per topic page, reached at #<slug>. `findings` are the topic's own highlights;
// `connected` are findings from other topics, shown under "Connected from other topics".
// Optional `figures` appear under the header (headed `figuresTitle`, default "The research at
// a glance"), credited to a SOURCES key in `source` or to free text in `credit` (linked to
// `creditUrl`), or described by `caption`; a placeholder shows until one is known. An optional `explainer` sits
// beside the figures, and an optional `note` (with a "more info" link) sits under the title.
// A page can instead list `sections`, each with a `figure`, an `explainer`, and either the
// page's cards (`cards: true`) or a dashed `todo` placeholder.
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
    // One section per kind of scan: its image and explainer, then the cards or a placeholder.
    sections: [
      {
        title: 'Task fMRI: brain activity during a task',
        figure: {
          src: taskFmri,
          width: 1200,
          height: 740,
          title: 'Task fMRI',
          caption: 'Which brain areas become more active while young people do a task.',
          alt: 'A grey brain with glowing colored spots. Pink spots at the front and back of the brain are active during the memory task, a purple spot deep in the middle during the reward task, and mauve spots at the lower front and the cerebellum during the stopping task.',
        },
        explainer: {
          intro: 'During a task fMRI scan, young people do short computer tasks while the scanner tracks which brain areas become more active.',
          terms: [
            { term: 'Memory task', color: '#e6357c', text: 'Remembering pictures of faces and places. Areas at the front and back of the brain become more active.' },
            { term: 'Reward task', color: '#7f1cee', text: 'Trying to win money or avoid losing it. Areas deep in the middle of the brain become more active.' },
            { term: 'Stopping task', color: '#b02f84', text: 'Stopping an action at the last moment. Areas at the lower front of the brain and in the cerebellum become more active.' },
          ],
        },
        cards: true,
      },
      {
        title: 'Resting-state fMRI (rs-fMRI): brain activity at rest',
        figure: {
          src: restingFmri,
          width: 1200,
          height: 740,
          title: 'Resting-state fMRI (rs-fMRI)',
          caption: 'Which brain areas work in sync while young people rest.',
          alt: 'A grey brain with two networks of glowing areas, one pink and one purple. Lines join the areas in each network to show that they share the same pattern of brain activity, even without a task.',
        },
        explainer: {
          intro: 'During a resting-state scan, young people lie still and look at a cross on a screen, without doing a task.',
          terms: [
            { term: 'One network', color: '#e6357c', text: 'Brain areas that share the same pattern of activity, rising and falling together.' },
            { term: 'Another network', color: '#7d63b3', text: 'A different set of areas with its own shared pattern.' },
          ],
          outro: 'Seeing which areas work in sync helps researchers understand how the brain is organized as it develops.',
        },
        todo: 'Need to add rs-fMRI results.',
      },
      {
        title: "Diffusion MRI: the brain's wiring",
        figure: {
          src: diffusionMri,
          width: 1200,
          height: 740,
          title: 'Diffusion MRI',
          caption: "The pathways that connect brain areas, the brain's wiring.",
          alt: 'A grey brain with bundles of colored lines: a pink pathway arching from the front to the back of the brain, a short mauve pathway linking nearby areas, and a purple pathway running down to the brainstem and the body.',
        },
        explainer: {
          intro: "Diffusion MRI tracks how water moves through the brain. Water moves most easily along the brain's wiring, called white matter, so the scan can map the pathways that connect brain areas.",
          terms: [
            { term: 'Long pathways', color: '#e6357c', text: 'Link areas at the front and back of the brain.' },
            { term: 'Short pathways', color: '#b02f84', text: 'Link areas that are close to each other.' },
            { term: 'Pathways to the body', color: '#7d63b3', text: 'Carry signals between the brain and the rest of the body.' },
          ],
        },
        todo: 'Need to add diffusion MRI results.',
      },
      {
        title: "Structural MRI: the brain's size and shape",
        figure: {
          src: structuralMri,
          width: 1200,
          height: 740,
          title: 'Structural MRI',
          caption: 'The size, thickness, and shape of brain areas.',
          alt: "A grey brain with each lobe tinted a different color (frontal, parietal, occipital, and temporal lobes, and the cerebellum), and an arrow across the top showing the brain's overall size.",
        },
        explainer: {
          intro: 'A structural MRI scan takes a detailed 3D picture of the brain, so researchers can measure the size, thickness, and shape of each area.',
          terms: [
            { term: 'Frontal lobe', color: '#e6357c', text: 'Planning, making decisions, and self-control.' },
            { term: 'Parietal lobe', color: '#7d63b3', text: 'Sensing touch and knowing where things are around us.' },
            { term: 'Occipital lobe', color: '#7f1cee', text: 'Making sense of what we see.' },
            { term: 'Temporal lobe', color: '#b02f84', text: 'Hearing, memory, and understanding language.' },
            { term: 'Cerebellum', color: '#7d63b3', text: 'Balance and smooth, coordinated movement.' },
          ],
        },
        todo: 'Need to add structural MRI results.',
      },
    ],
    findings: ['img-change', 'img-cognition', 'img-memory', 'img-inhibition', 'img-reward', 'img-puberty', 'img-neighborhood', 'img-adversity'],
    connected: ['mh-complex', 'mh-adversity', 'su-social', 'su-brain'],
  },
}
