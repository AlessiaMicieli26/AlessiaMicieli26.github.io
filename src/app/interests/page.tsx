"use client";

import React from "react";
import { SectionFrame } from "@/components/editorial/SectionFrame";
import { InterestsNetwork } from "@/components/editorial/InterestsNetwork";

export default function InterestsPage() {
  return (
    <SectionFrame
      sectionId="interests"
      index="05"
      eyebrow="Conceptual Topology"
      title="Interactive Research Network."
      lead="A relational map connecting scientific questions, multimodal benchmarks, datasets, and publications — hover or select any node to trace conceptual dependencies."
      wide
    >
      <InterestsNetwork />
    </SectionFrame>
  );
}
