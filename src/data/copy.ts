export const brand = {
  name: "Vladysthenics",
  founder: "Vlad",
  callName: "Strategy Call",
  callDuration: "45 minutes",
  slotsLabel: "Limited slots available",
  scarcity: "Limited coaching slots, application only",
} as const;

export const cta = {
  apply: "Apply for Coaching",
  sticky: "Book a Strategy Call",
  watch: "Watch",
  book: "Book Your Call",
} as const;

export const hero = {
  eyebrow: "For calisthenics athletes",
  headline: ["You've Put In", "The Hours.", "But Still No Skill", "To Show For It."],
  accentLineIndex: 2,
  subhead:
    "Watch the video below to learn the system that landed the front lever, handstand, and planche without another year of guesswork for me and my clients.",
} as const;

export const clientStories = {
  title: "Real Client Stories",
  subhead: "Hear from people doing the work. More clips coming as we collect them.",
} as const;

export const exclusive = {
  eyebrow: "Not for everyone",
  headline: "This is for people are ready to unlock skills, not collect another workout.",
  body: "If you're ready to stop hopping progressions and run a measurable system toward a specific skill you can name, apply below. We'll map your goal and see if the structure fits where you're stuck.",
  whoFor: [
    "You've plateaued on a skill for over a year",
    "You're restarting and refuse to waste another year on guesswork",
    "You want structure you can measure, not more motivation",
  ],
} as const;

export const manifesto = {
  lines: [
    { text: "Talent wasn't the ceiling.", emphasize: false },
    { text: "Method was.", emphasize: true },
    { text: "Years of unstructured training.", emphasize: false },
    { text: "Then a front lever in 4 months.", emphasize: true },
    { text: "Same body. Different system.", emphasize: false },
  ],
  tagline: "M-SYSTEM: volume + activation + weighted progression",
} as const;

export const finalCta = {
  headline: "A year from now, you'll still be somewhere.",
  subhead:
    "Same stuck skill, or a skill you can finally film. If you're ready to stop guessing and see if structured skill work fits your training, apply below. The call is 45 minutes. We'll map your goal, diagnose where you're stuck, and see if the system is a fit.",
} as const;

export const booking = {
  label: "You qualified",
  headline: `Book your ${brand.callName}`,
  subhead: `Pick a time below. The call is ${brand.callDuration}. We'll map your skill goal, review where your training has stalled, and see if the system fits. If it's not a fit, you'll leave with clarity, not a hard pitch.`,
} as const;

export const dq = {
  headline: "Not the right fit yet",
  body: "Based on your answers, coaching isn't the move right now. No shame in that. Build the foundation first, then come back when you're ready to invest in structured skill work.",
  resourcesLabel: "Helpful starting points",
} as const;

export const postBooking = {
  title: "You're Almost There",
  mandatory:
    "Complete these MANDATORY steps to lock in your call. Skipping them is the number one reason people no-show. Don't leave your spot half-set.",
  prefaceLabel: "Watch this first",
  step1: {
    title: "Expect a confirmation call or text",
    body: "We may reach out before your appointment to confirm. Answer if you can. It protects your slot.",
  },
  step2: {
    title: "Confirm your appointment",
    body: "RSVP in your calendar invite and save the meeting link so you're not scrambling day-of.",
  },
  faqTitle: "Quick answers before the call",
  checklistTitle: "Day-of prep",
  checklist: [
    "Be somewhere quiet with 45 minutes blocked. No gym mid-set multitasking.",
    "Know your primary skill goal: front lever, planche, handstand, or other.",
    "Have a recent training week in mind. What you did, how often, where you stalled.",
  ],
} as const;

export const faq = [
  {
    q: "Is this just another list of progressions?",
    a: "No. The coaching structure is built around volume management, specific muscle activation for the skill, and weighted progression when bodyweight stalls. Variety without stacking is exactly what this replaces.",
  },
  {
    q: "What if I've already tried structured programs?",
    a: "Most programs marketed as structured are still fixed exercise lists with no adjustment for how your volume and recovery actually track. Structure without measurement is just a schedule. That's what we diagnose on the call.",
  },
  {
    q: "Do I need more training hours?",
    a: "Usually no. The method is about the right volume for the right activation. A smaller, more specific ask than train harder.",
  },
  {
    q: `What happens on the ${brand.callName}?`,
    a: `We'll clarify your skill goal, review where your training has been stuck, and see if the system is a fit. The call is ${brand.callDuration}. If it's not a fit, you'll leave with clarity, not a hard pitch for the sake of it.`,
  },
] as const;

export const seo = {
  title: "Vladysthenics: Land the Skill Without Another Year of Guessing",
  description:
    "Weighted-calisthenics coaching for people who've trained for years with nothing to show. Watch the video and apply for a strategy call.",
} as const;