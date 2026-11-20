import { routes } from "@/data/navigation";

export type Executive = {
  id: string;
  name: string;
  position: string;
  biography: readonly string[];
  portrait: { publicId: string; alt: string };
};

export const leadershipPortraitCloudName = "drbd1c7ub";

export const presidentGeneral: Executive = {
  id: "obiora-ifeyinwa-chinyere",
  name: "Evangelist Obiora Ifeyinwa Chinyere",
  position: "Woman President General, Nnokwa Women Association (Home and Abroad)",
  portrait: { publicId: "President_rp5qen", alt: "Portrait of Evangelist Obiora Ifeyinwa Chinyere" },
  biography: [
    "Evangelist Obiora Ifeyinwa Chinyere is the Woman President General of the Nnokwa Women Association (Home and Abroad). Born and proudly married in Nnokwa, she has deep roots in the community and a strong commitment to its heritage, values and collective progress.",
    "Her leadership is driven by a genuine passion for the welfare and empowerment of women and children. With a loving, peaceful and inclusive approach, she is committed to strengthening unity among Nnokwa women across the globe. As a humanitarian, she champions meaningful welfare initiatives and seeks to build lasting networks of support between women at home and in the diaspora, creating a foundation for future generations.",
  ],
};

export const executives: readonly Executive[] = [
  presidentGeneral,
  {
    id: "amaka-maureen-ozojie",
    name: "Mrs. Amaka Maureen Ozojie",
    position: "Vice President",
    portrait: { publicId: "Vice-president_tt0wd8", alt: "Portrait of Mrs. Amaka Maureen Ozojie" },
    biography: [
      "Mrs. Amaka Maureen Ozojie, from Eziama Village in Nnokwa, serves as the Vice President of the Nnokwa Women Association. Deeply connected to her community and its values, she is committed to supporting the association's vision and strengthening the bonds among its members, both at home and across the diaspora.",
      "Guided by her deep love and reverence for God, she is a peace-loving woman with a sincere passion for progress and sustainable development. She works alongside the association's leadership to promote unity, empower women and advance meaningful initiatives that contribute to the continued growth of Nnokwa.",
    ],
  },
  {
    id: "ekechukwu-ofolisa-regina-ifeoma",
    name: "Lolo Ekechukwu Ofolisa Regina Ifeoma",
    position: "Secretary General",
    portrait: { publicId: "secretary_General_bqyw7v", alt: "Portrait of Lolo Ekechukwu Ofolisa Regina Ifeoma" },
    biography: [
      "Lolo Ekechukwu Ofolisa Regina Ifeoma serves as the Secretary General of the Nnokwa Women Association. A devoted Christian, Catholic mother, wife and blessed mother, she values faith, family, peace and service to humanity.",
      "She is passionate about humanitarian work and believes in the importance of peaceful relationships and mutual support. Through her role, she is committed to supporting the association's activities and contributing to its continued unity, organisation and progress.",
    ],
  },
  {
    id: "oby-ajaegbu",
    name: "Lady Oby Ajaegbu",
    position: "Assistant Secretary",
    portrait: { publicId: "Asst_secretary_nu3te4", alt: "Portrait of Lady Oby Ajaegbu" },
    biography: [
      "Lady Oby Ajaegbu is a woman of faith, grace and compassion who brings a strong commitment to service, unity and excellence. Guided by her God-fearing values and a heart for others, she believes in the importance of working together towards a shared purpose.",
      "As Assistant Secretary, she looks forward to contributing meaningfully to the association's work, supporting its leadership and collaborating with members to move the organisation forward.",
    ],
  },
  {
    id: "maria-ifeoma-uzodimma",
    name: "Mrs. Maria Ifeoma Uzodimma",
    position: "Treasurer",
    portrait: { publicId: "Treasurer_awnpug", alt: "Portrait of Mrs. Maria Ifeoma Uzodimma" },
    biography: [
      "Mrs. Maria Ifeoma Uzodimma was born, raised and married in Nnokwa. She is a peace-loving woman whose compassion is reflected in her love for caring for the sick and the elderly.",
      "As Treasurer of the Nnokwa Women Association, she brings a caring spirit and a commitment to the well-being of others. Her dedication to helping vulnerable members of the community reflects her belief in compassion, peace and collective care.",
    ],
  },
  {
    id: "uche-ezejideaku",
    name: "Mrs. Uche Ezejideaku",
    position: "Financial Secretary",
    portrait: { publicId: "Financial_secretary_fy3p6p", alt: "Portrait of Mrs. Uche Ezejideaku" },
    biography: [
      "Mrs. Uche Ezejideaku is the Financial Secretary of the Nnokwa Women Association. An elegant, confident and courageous woman, she is guided by her faith in God and a genuine love for humanity.",
      "She values kindness, compassion and the importance of caring for one another. Through her role in the association, she is committed to supporting its shared objectives and contributing to the well-being and progress of the community.",
    ],
  },
  {
    id: "ifesinachi-theresa-edward",
    name: "Mrs. Ifesinachi Theresa Edward",
    position: "Public Relations Officer",
    portrait: { publicId: "Pro_iws1ph", alt: "Portrait of Mrs. Ifesinachi Theresa Edward" },
    biography: [
      "Mrs. Ifesinachi Theresa Edward, from Isimgbede Village, serves as the Public Relations Officer of the Nnokwa Women Association. She is known for her humble, loving and caring disposition and is described as a woman with a heart of gold.",
      "Her warmth and compassion reflect the values of unity and mutual respect that strengthen the association. In her role, she is committed to supporting communication and fostering positive relationships among members and the wider community.",
    ],
  },
  {
    id: "izundu-francisca-chika",
    name: "Mrs. Izundu Francisca Chika",
    position: "Chief Welfare Officer",
    portrait: { publicId: "Chief_Welfare_officer_csvkqm", alt: "Portrait of Mrs. Izundu Francisca Chika" },
    biography: [
      "Mrs. Izundu Francisca Chika serves as the Chief Welfare Officer of the Nnokwa Women Association. A God-fearing woman, she values peace, understanding and the collective progress and well-being of others.",
      "She believes in the importance of compassion, harmony and looking out for one another. With a strong sense of purpose and a vision for progress, she is committed to promoting the welfare of members and strengthening the spirit of care within the association.",
    ],
  },
];

export const leadershipPreview = {
  label: "Our leadership",
  heading: "Guided by service. United by purpose.",
  description:
    "Our leadership team provides direction and coordination for the association's work, guided by a shared commitment to women's empowerment and community development.",
  action: { href: routes.leadership, label: "Meet the Full Leadership Team" },
} as const;
