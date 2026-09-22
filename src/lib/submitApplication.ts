import type { ApplicationAnswers, LeadStatus } from "@/data/applicationForm";
import { evaluateLeadStatus } from "@/data/applicationForm";
import { fireLeadConversion, storeApplicant } from "./conversionTracking";
import { getSessionId, getVisitorId } from "./identity";
import { submitSweepLead, SWEEP_FUNNEL_ID, trackSweepEvent } from "./sweep";

export type SubmitResult = {
  ok: boolean;
  leadStatus: LeadStatus;
  dqReason: string | null;
  error?: string;
};

export async function submitApplication(
  answers: ApplicationAnswers,
): Promise<SubmitResult> {
  const { leadStatus, dqReason } = evaluateLeadStatus(answers);

  const payload = {
    name: answers.name.trim(),
    email: answers.email.trim(),
    phone: answers.phone.trim(),
    social: answers.social.trim(),
    occupation: answers.occupation.trim(),
    age: answers.age.trim() || undefined,
    situation: answers.situation,
    goal: answers.goal,
    readiness: answers.readiness,
    leadStatus,
    dqReason,
    submittedAt: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    answers: {
      situation_code: answers.situation?.code,
      situation_label: answers.situation?.label,
      goal_code: answers.goal?.code,
      goal_label: answers.goal?.label,
      readiness_code: answers.readiness?.code,
      readiness_label: answers.readiness?.label,
      occupation: answers.occupation.trim(),
      age: answers.age.trim(),
      name: answers.name.trim(),
      email: answers.email.trim(),
      phone: answers.phone.trim(),
      social: answers.social.trim(),
      leadStatus,
    },
  };

  storeApplicant({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  });

  const res = await fetch("/api/submit-application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return {
      ok: false,
      leadStatus,
      dqReason,
      error: data.error || "Submit failed",
    };
  }

  await trackSweepEvent(
    "form_submit",
    { form_id: "vladysthenics-application", leadStatus },
    `${SWEEP_FUNNEL_ID}_form_submit_${getSessionId()}`,
  );

  await submitSweepLead({
    email: payload.email,
    name: payload.name,
    phone: payload.phone,
    instagram: payload.social,
    quiz_answers: payload.answers,
    funnel_step_reached: "form_submit",
    tags: [leadStatus === "qualified" ? "Qualified Lead" : "Disqualified Lead"],
  });

  await fireLeadConversion();

  return { ok: true, leadStatus, dqReason };
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}