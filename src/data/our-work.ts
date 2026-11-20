import { routes } from "@/data/navigation";

type FocusArea = {
  id: string;
  title: string;
  priorityTitle: string;
  description: string;
  goal: 1 | 2 | 3 | 4 | 5;
};

export const focusAreas: readonly FocusArea[] = [
  {
    id: "poverty",
    title: "Poverty",
    priorityTitle: "Poverty reduction",
    description: "Creating economic opportunities and financial independence for women.",
    goal: 1,
  },
  {
    id: "hunger-reduction",
    title: "Hunger Reduction",
    priorityTitle: "Hunger reduction and food security",
    description: "Supporting food security and nutritional health within Nnokwa households.",
    goal: 2,
  },
  {
    id: "health-well-being",
    title: "Health & Well-being",
    priorityTitle: "Health and well-being",
    description: "Providing direct access to healthcare, maternal support, and wellness education.",
    goal: 3,
  },
  {
    id: "training",
    title: "Training",
    priorityTitle: "Education, training and mentorship",
    description: "Delivering vocational skills training, literacy programs, and mentorship.",
    goal: 4,
  },
  {
    id: "gender-equality",
    title: "Gender Equality",
    priorityTitle: "Gender equality",
    description: "Elevating women into leadership roles and protecting their basic rights.",
    goal: 5,
  },
];

export const ourWorkPage = {
  title: "Our Work",
  introduction: "The Nnokwa Women Association works to empower women and advance sustainable community development in Nnokwa.",
  sdgIntroduction: "Our five focus areas align with the first five United Nations Sustainable Development Goals. Economic opportunity, food security, healthcare, training and women’s leadership connect these goals to the association’s work in Nnokwa.",
  support: {
    heading: "Support our work",
    description: "Help the association continue its work with women, families and the wider Nnokwa community.",
    action: { href: routes.donate, label: "Make a Donation" },
  },
} as const;
