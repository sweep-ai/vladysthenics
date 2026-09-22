export type ChoiceOption = {
  code: string;
  label: string;
  disqualify?: boolean;
};

export type FormStep =
  | {
      id: "situation" | "goal" | "readiness";
      type: "single";
      prompt: string;
      options: ChoiceOption[];
    }
  | {
      id: "demographics";
      type: "demographics";
      prompt: string;
    }
  | {
      id: "contact";
      type: "contact";
      prompt: string;
    };

export type LeadStatus = "qualified" | "disqualified";

export type ApplicationAnswers = {
  situation: { prompt: string; code: string; label: string } | null;
  goal: { prompt: string; code: string; label: string } | null;
  readiness: { prompt: string; code: string; label: string } | null;
  occupation: string;
  age: string;
  name: string;
  email: string;
  phone: string;
  social: string;
};

export const emptyAnswers: ApplicationAnswers = {
  situation: null,
  goal: null,
  readiness: null,
  occupation: "",
  age: "",
  name: "",
  email: "",
  phone: "",
  social: "",
};

export const formSteps: FormStep[] = [
  {
    id: "situation",
    type: "single",
    prompt: "Which sounds most like you right now?",
    options: [
      {
        code: "PLT-YEARS",
        label: "I've trained calisthenics/bodyweight for years and plateaued",
      },
      {
        code: "RESTART",
        label: "I used to train, stopped, and I'm restarting from a lower baseline",
      },
      {
        code: "SKILL-CHASE",
        label: "I have a specific skill goal and keep failing the same progressions",
      },
      {
        code: "GYM-BORED",
        label: "I come from weights and want a harder, skill-based challenge",
      },
    ],
  },
  {
    id: "goal",
    type: "single",
    prompt: "What's the primary skill you're chasing?",
    options: [
      { code: "FRONT_LEVER", label: "Front lever" },
      { code: "PLANCHE", label: "Planche" },
      { code: "HANDSTAND", label: "Handstand / one-arm handstand" },
      { code: "MULTI_SKILL", label: "Overall skill strength (multiple skills)" },
    ],
  },
  {
    id: "readiness",
    type: "single",
    prompt: "If coaching is the right fit, are you ready to invest in a structured system?",
    options: [
      {
        code: "READY_NOW",
        label: "Yes — I'm ready to invest if it's the right fit",
      },
      {
        code: "NEED_DETAILS",
        label: "I need to understand the offer first, then decide",
      },
      {
        code: "NOT_READY",
        label: "Not right now — I'm only looking for free tips",
        disqualify: true,
      },
    ],
  },
  {
    id: "demographics",
    type: "demographics",
    prompt: "A little context so the call is useful",
  },
  {
    id: "contact",
    type: "contact",
    prompt: "Where should we send your booking link?",
  },
];

export function evaluateLeadStatus(
  answers: ApplicationAnswers,
): { leadStatus: LeadStatus; dqReason: string | null } {
  if (answers.readiness?.code === "NOT_READY") {
    return {
      leadStatus: "disqualified",
      dqReason: "Not ready to invest — free tips only",
    };
  }
  return { leadStatus: "qualified", dqReason: null };
}