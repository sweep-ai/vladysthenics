"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  emptyAnswers,
  formSteps,
  type ApplicationAnswers,
  type ChoiceOption,
} from "@/data/applicationForm";
import { dq } from "@/data/copy";
import { dqResources } from "@/data/social";
import {
  isValidEmail,
  isValidPhone,
  submitApplication,
} from "@/lib/submitApplication";
import { trackSweepEvent } from "@/lib/sweep";

export function ApplicationForm() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ApplicationAnswers>(emptyAnswers);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dqState, setDqState] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const step = formSteps[stepIndex];
  const total = formSteps.length;

  useEffect(() => {
    void trackSweepEvent("quiz_page_view", { page_id: "application-form" });
  }, []);

  useEffect(() => {
    if (stepIndex === 0) {
      void trackSweepEvent("quiz_start", { form_id: "vladysthenics-application" });
    }
  }, [stepIndex]);

  const progress = useMemo(() => `${stepIndex + 1} / ${total}`, [stepIndex, total]);

  function goNext() {
    setDirection("forward");
    setSelected(null);
    setConfirmed(false);
    setError(null);
    setStepIndex((i) => Math.min(i + 1, total - 1));
  }

  function goBack() {
    if (stepIndex === 0) return;
    setDirection("back");
    setSelected(null);
    setConfirmed(false);
    setError(null);
    setStepIndex((i) => i - 1);
  }

  function pickOption(option: ChoiceOption) {
    if (!step || step.type !== "single") return;
    setSelected(option.code);
    setConfirmed(true);
    const entry = {
      prompt: step.prompt,
      code: option.code,
      label: option.label,
    };
    setAnswers((prev) => ({ ...prev, [step.id]: entry }));
    window.setTimeout(() => goNext(), 450);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!answers.occupation.trim()) {
      setError("Occupation helps us prep the call.");
      return;
    }
    if (!answers.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!isValidEmail(answers.email)) {
      setError("Enter a valid email.");
      return;
    }
    if (!isValidPhone(answers.phone)) {
      setError("Enter a valid phone number.");
      return;
    }
    if (!answers.social.trim()) {
      setError("Add an Instagram or social handle.");
      return;
    }

    setSubmitting(true);
    const result = await submitApplication(answers);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Something went wrong. Try again.");
      return;
    }

    if (result.leadStatus === "disqualified") {
      setDqState(true);
      return;
    }

    router.push("/booking");
  }

  if (dqState) {
    return (
      <section id="application-form" className="application">
        <div className="application__panel application__panel--dq">
          <h2>{dq.headline}</h2>
          <p>{dq.body}</p>
          <p className="application__resources-label">{dq.resourcesLabel}</p>
          <ul className="application__resources">
            {dqResources.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" className="application">
      <div className="application__panel">
        <div className="application__meta">
          <span>Application</span>
          <span>{progress}</span>
        </div>
        <div
          className="application__progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={stepIndex + 1}
          aria-label="Application progress"
        >
          <span style={{ width: `${((stepIndex + 1) / total) * 100}%` }} />
        </div>

        <div
          key={step.id}
          className={`application__step application__step--${direction}`}
        >
          <h2 className="application__prompt">{step.prompt}</h2>

          {step.type === "single" && (
            <div className="application__options" role="listbox" aria-label={step.prompt}>
              {step.options.map((option) => {
                const isSelected = selected === option.code;
                return (
                  <button
                    key={option.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`application__option${isSelected ? " is-selected" : ""}${
                      isSelected && confirmed ? " is-confirmed" : ""
                    }`}
                    onClick={() => pickOption(option)}
                  >
                    <span>{option.label}</span>
                    {isSelected && confirmed ? <span className="application__check">✓</span> : null}
                  </button>
                );
              })}
            </div>
          )}

          {step.type === "demographics" && (
            <form
              className="application__fields"
              onSubmit={(e) => {
                e.preventDefault();
                if (!answers.occupation.trim()) {
                  setError("Occupation is required.");
                  return;
                }
                goNext();
              }}
            >
              <label>
                Occupation
                <input
                  value={answers.occupation}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, occupation: e.target.value }))
                  }
                  autoComplete="organization-title"
                  required
                />
              </label>
              <label>
                Age <span className="optional">(optional)</span>
                <input
                  value={answers.age}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, age: e.target.value }))}
                  inputMode="numeric"
                />
              </label>
              {error ? <p className="application__error">{error}</p> : null}
              <div className="application__nav">
                <button type="button" className="application__back" onClick={goBack}>
                  Back
                </button>
                <button type="submit" className="apply-btn">
                  Continue
                </button>
              </div>
            </form>
          )}

          {step.type === "contact" && (
            <form className="application__fields" onSubmit={onSubmit}>
              <label>
                Full name
                <input
                  value={answers.name}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, name: e.target.value }))}
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, email: e.target.value }))}
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={answers.phone}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, phone: e.target.value }))}
                  autoComplete="tel"
                  required
                />
              </label>
              <label>
                Instagram / social
                <input
                  value={answers.social}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, social: e.target.value }))}
                  placeholder="@handle"
                  required
                />
              </label>
              {error ? <p className="application__error">{error}</p> : null}
              <div className="application__nav">
                <button type="button" className="application__back" onClick={goBack}>
                  Back
                </button>
                <button type="submit" className="apply-btn" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          )}

          {step.type === "single" && stepIndex > 0 ? (
            <button type="button" className="application__back application__back--solo" onClick={goBack}>
              Back
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}