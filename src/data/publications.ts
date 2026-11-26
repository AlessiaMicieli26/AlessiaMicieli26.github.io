export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string[];
  highlightAuthor: string;
  venue: string;
  venueShort: string;
  type: "conference" | "benchmark";
  status: string;
  abstract: string;
  doi?: string;
  externalUrl?: string;
  pdfUrl?: string;
  projectSlug?: string;
  projectName?: string;
  topics: string[]; // research direction ids
  plainCitation: string;
  bibtex: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: "signit-visapp-2026",
    year: 2026,
    title:
      "SignIT: A Comprehensive Dataset and Multimodal Analysis for Italian Sign Language Recognition",
    authors: ["Alessia Micieli", "Giovanni Maria Farinella", "Francesco Ragusa"],
    highlightAuthor: "Alessia Micieli",
    venue:
      "Proceedings of the 21st International Conference on Computer Vision Theory and Applications (VISAPP 2026), Vol. 2, pp. 461–468",
    venueShort: "VISAPP 2026",
    type: "conference",
    status: "Published · VISAPP 2026",
    abstract:
      "We introduce SignIT, a curated multimodal dataset and systematic benchmark for Italian Sign Language (LIS) recognition. Comprising 644 manually annotated videos spanning ~3.33 hours across 94 distinct sign classes organized into five macro-categories (Animals, Food, Colors, Emotions, and Family), SignIT pairs raw RGB visual streams with MediaPipe 2D skeletal keypoints covering hands, face, and body. We evaluate pose-based baselines (K-NN, MLP), convolutional RGB encoders (ResNet18), temporal architectures, and multimodal fusion models, demonstrating how combining articulated kinematics with visual appearance improves recognition reliability.",
    doi: "10.5220/0014480100004084",
    externalUrl: "https://arxiv.org/abs/2512.14489",
    pdfUrl: "https://arxiv.org/pdf/2512.14489",
    projectSlug: "signit",
    projectName: "SignIT",
    topics: [
      "multimodal-learning",
      "human-activity-understanding",
      "multimodal-sensor-fusion",
    ],
    plainCitation:
      "Micieli, A., Farinella, G. M., & Ragusa, F. (2026). SignIT: A Comprehensive Dataset and Multimodal Analysis for Italian Sign Language Recognition. In Proceedings of the 21st International Conference on Computer Vision Theory and Applications (VISAPP 2026), Vol. 2, pp. 461–468. DOI: 10.5220/0014480100004084. ISBN: 978-989-758-804-4.",
    bibtex: `@inproceedings{micieli2026signit,
  title={SignIT: A Comprehensive Dataset and Multimodal Analysis for Italian Sign Language Recognition},
  author={Alessia Micieli and Giovanni Maria Farinella and Francesco Ragusa},
  booktitle={Proceedings of the 21st International Conference on Computer Vision Theory and Applications (VISAPP 2026)},
  volume={2},
  pages={461-468},
  year={2026},
  doi={10.5220/0014480100004084},
  isbn={978-989-758-804-4}
}`,
  },
  {
    id: "egoextra-wacv",
    year: 2026,
    title:
      "Ego-EXTRA: Video-Language Egocentric Dataset for EXpert-TRAinee Assistance",
    authors: [
      "Francesco Ragusa",
      "Michele Mazzamuto",
      "Rosario Forte",
      "Irene D'Ambra",
      "James Fort",
      "Jakob Engel",
      "Antonino Furnari",
      "Giovanni Maria Farinella",
    ],
    highlightAuthor: "IPLab · UNICT Benchmark",
    venue:
      "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV) — LIVE@IPLab Research Ecosystem",
    venueShort: "WACV / arXiv",
    type: "benchmark",
    status: "Lab Ecosystem · arXiv:2512.13238",
    abstract:
      "Ego-EXTRA is a foundational video-language egocentric dataset developed within the IPLab ecosystem at the University of Catania to study wearable intelligent assistants guiding human trainees through complex procedural tasks. Featuring ~50 hours of unscripted first-person video and over 15,000 visual question-answering pairs collected through an expert-trainee Wizard-of-Oz protocol, it provides key methodological context for egocentric multimodal assistance research.",
    doi: "10.48550/arXiv.2512.13238",
    externalUrl: "https://arxiv.org/abs/2512.13238",
    pdfUrl: "https://arxiv.org/pdf/2512.13238",
    topics: ["egocentric-vision", "multimodal-learning", "multimodal-sensor-fusion"],
    plainCitation:
      "Ragusa, F., Mazzamuto, M., Forte, R., D'Ambra, I., Fort, J., Engel, J., Furnari, A., & Farinella, G. M. (2025). Ego-EXTRA: video-language Egocentric Dataset for EXpert-TRAinee assistance. arXiv preprint arXiv:2512.13238.",
    bibtex: `@article{ragusa2025egoextra,
  title   = {Ego-EXTRA: video-language Egocentric Dataset for EXpert-TRAinee assistance},
  author  = {Ragusa, Francesco and Mazzamuto, Michele and Forte, Rosario and D'Ambra, Irene and Fort, James and Engel, Jakob and Furnari, Antonino and Farinella, Giovanni Maria},
  journal = {arXiv preprint arXiv:2512.13238},
  year    = {2025}
}`,
  },
];
