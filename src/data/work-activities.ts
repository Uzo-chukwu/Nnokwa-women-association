export type WorkActivity = {
  id: string;
  heading: string;
  description: string;
  image?: { publicId: string; alt: string };
};

export const ourWork = {
  label: "Our work",
  heading: "Turning collective action into community impact.",
  description:
    "From supporting healthier households to creating opportunities for women and nurturing our environment, we believe meaningful change begins with practical action within our community.",
  activities: [
    {
      id: "fruit-tree-planting",
      heading: "Fruit Tree Planting",
      description:
        "Planting fruit trees across schools in Nnokwa to encourage environmental awareness and contribute to a healthier community.",
    },
    {
      id: "food-distribution",
      heading: "Food Distribution",
      description:
        "Supporting households through food distribution initiatives that respond to basic community needs.",
    },
    {
      id: "healthcare-outreach",
      heading: "Healthcare Outreach",
      description:
        "Promoting community well-being through healthcare outreach and health awareness initiatives.",
    },
    {
      id: "community-sanitation",
      heading: "Community Sanitation",
      description:
        "Encouraging a cleaner, healthier environment through collective community sanitation activities.",
    },
    {
      id: "womens-empowerment",
      heading: "Women's Empowerment",
      description:
        "Supporting women through empowerment initiatives that encourage participation, opportunity and self-reliance.",
    },
  ] satisfies WorkActivity[],
};
