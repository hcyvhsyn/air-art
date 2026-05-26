export type ProjectId =
  | "babek-deniz-plaza"
  | "ravy-tower"
  | "ganja-prosecutor"
  | "old-town-plaza"
  | "lux-international-hospital"
  | "agh-sheher-office"
  | "west-hospital"
  | "yasmin-shopping-center"
  | "villas"
  | "almet-exhibition"
  | "narimanov-office";

export interface Project {
  id: ProjectId;
  image: string;
  area: number;
  year?: number;
}

export const projects: Project[] = [
  { id: "babek-deniz-plaza", image: "/projects/project-1.jpg", area: 5800 },
  { id: "ravy-tower", image: "/projects/project-2.jpg", area: 29000 },
  { id: "ganja-prosecutor", image: "/projects/project-3.jpg", area: 4500 },
  { id: "old-town-plaza", image: "/projects/project-4.jpg", area: 14600 },
  { id: "lux-international-hospital", image: "/projects/project-5.jpg", area: 5800 },
  { id: "agh-sheher-office", image: "/projects/project-6.jpg", area: 9800 },
  { id: "west-hospital", image: "/projects/project-7.jpg", area: 6500 },
  { id: "yasmin-shopping-center", image: "/projects/project-8.jpg", area: 17500 },
  { id: "villas", image: "/projects/project-9.jpg", area: 3600 },
  { id: "almet-exhibition", image: "/projects/project-10.jpg", area: 3600 },
  { id: "narimanov-office", image: "/projects/project-11.jpg", area: 6300 },
];
