import { associationIntro, homeHero } from "@/data/home";
import { siteInfo } from "@/data/site";

type AboutContent = {
  introduction: string;
  purpose: string;
  mission: string;
  vision: string;
  motto: string;
  image: { publicId?: string; alt: string };
  pillars: readonly { id: string; heading: string; description: string }[];
  histories: readonly {
    id: string;
    title: string;
    introduction: string;
    sections: readonly { heading: string; body: string }[];
  }[];
};

export const aboutContent: AboutContent = {
  introduction: `${siteInfo.name} is a community-based women's development organization.`,
  purpose: associationIntro.body,
  mission: "The Nnokwa Women Association unites and equips women to uplift our community by preserving cultural assets, delivering impactful mentorship, and providing skills training. We actively advocate for women’s health as a human right and implement localized solutions to meet basic needs, ensuring sustainable development and gender equality.",
  vision: "To build a united, prosperous Nnokwa rooted in the enduring strength of our heritage, where every daughter and wife is equipped to thrive, lead, and uplift future generations.",
  motto: siteInfo.tagline.charAt(0) + siteInfo.tagline.slice(1).toLowerCase(),
  image: associationIntro.image.publicId ? associationIntro.image : homeHero.image,
  pillars: [
    {
      id: "cultural-preservation",
      heading: "Cultural Preservation",
      description: "Strengthening and safeguarding local identity and communal assets.",
    },
    {
      id: "capacity-building",
      heading: "Capacity Building",
      description: "Fostering sustainable development through targeted training, active mentorship, and strategic partnerships.",
    },
    {
      id: "health-advocacy",
      heading: "Health Advocacy",
      description: "Prioritizing women’s health initiatives as an essential, non-negotiable human right.",
    },
    {
      id: "sdg-alignment",
      heading: "SDG Alignment",
      description: "Championing UN Sustainable Development Goals 1 through 5 to secure basic human needs.",
    },
  ],
  histories: [
    {
      id: "history-of-nnokwa",
      title: "History of Nnokwa",
      introduction: "Nnokwa is a town in the Idemili South Local Government Area of Anambra State, Nigeria. It shares borders with Nnobi, Awka-Etiti, Alor, and Nimo. An ancient Nri settlement, Nnokwa is rooted in Igbo history and closely tied to the Idemili cultural bloc.",
      sections: [
        {
          heading: "Geography and infrastructure",
          body: "Nnokwa is approximately 30 kilometres from Awka, the state capital. The area has become more urban, with modern housing and access roads. Infrastructure investments include road rehabilitation and construction along routes such as the Nnokwa Center to Awka-Etiti road.",
        },
        {
          heading: "Culture and economy",
          body: "Agriculture and commerce are central to life in Nnokwa, including at Eke market. The town celebrates the Ahiaolu Festival, a traditional harvest celebration marked by masquerade parades and community gatherings. Local organizations such as the Nnokwa United Brothers support community development and residents in need.",
        },
      ],
    },
    {
      id: "history-of-the-association",
      title: `History of ${siteInfo.name}`,
      introduction: "The Nnokwa Women Association is rooted in Igbo social and cultural traditions. As the local women’s wing of the Nnokwa Progress Union (NPU), it has supported community development, conflict resolution, and mutual aid.",
      sections: [
        {
          heading: "Traditional roots",
          body: "Nnokwa’s women historically organized through the Umuada and Inyom. The Umuada, daughters born into the community, helped settle domestic disputes and maintain peace. The Inyom, women married into Nnokwa, organized communal labour, agricultural cooperation, and welfare funds.",
        },
        {
          heading: "Formalization",
          body: "As Nnokwa indigenes moved to cities such as Lagos, Onitsha, and Port Harcourt for trade in the mid-20th century, the women’s wing formalized as a recognized town union branch. Members could send remittances, fund local infrastructure, and support women’s economic empowerment in Nnokwa.",
        },
        {
          heading: "The August Meeting",
          body: "The association takes part in the August Meeting (Nzuko Umu Nwanyi), an annual gathering where women return home to discuss social and economic development, organize charitable projects, and promote girls’ and women’s education.",
        },
        {
          heading: "Community development",
          body: "The association has historically worked with local councils and state initiatives, including Better Life for Rural Women programmes, to promote sanitation, basic healthcare, and micro-enterprises in Nnokwa.",
        },
      ],
    },
  ],
};
