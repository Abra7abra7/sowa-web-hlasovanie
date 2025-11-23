"use client";

import { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

interface WizardContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function WizardContainer({
  children,
  currentStep,
  totalSteps,
}: WizardContainerProps) {
  return (
    <div className="min-h-screen bg-midnight">
      <ProgressBar current={currentStep} total={totalSteps} />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
