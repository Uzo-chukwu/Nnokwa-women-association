export type SustainableDevelopmentGoal = {
  number: number;
  title: string;
  description: string;
  accent: `#${string}`;
};

type SdgCommitmentContent = {
  label: string;
  heading: string;
  description: string;
  goals: readonly SustainableDevelopmentGoal[];
};

export const sdgCommitment: SdgCommitmentContent = {
  label: "Our global commitment",
  heading: "Local action. Global aspirations.",
  description:
    "Our work is guided by the United Nations Sustainable Development Goals. We focus on five goals that closely align with our commitment to improving lives, empowering women and building a sustainable community.",
  goals: [
    {
      number: 1,
      title: "No Poverty",
      description: "Supporting economic opportunities and women's financial independence.",
      accent: "#E5243B",
    },
    {
      number: 2,
      title: "Zero Hunger",
      description: "Promoting food security and better nutrition for households.",
      accent: "#DDA63A",
    },
    {
      number: 3,
      title: "Good Health and Well-being",
      description: "Advocating for women's health and community healthcare.",
      accent: "#4C9F38",
    },
    {
      number: 4,
      title: "Quality Education",
      description: "Encouraging learning, skills development and mentorship.",
      accent: "#C5192D",
    },
    {
      number: 5,
      title: "Gender Equality",
      description: "Advancing women's participation, rights and leadership.",
      accent: "#FF3A21",
    },
  ],
};
