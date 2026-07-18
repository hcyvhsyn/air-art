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
  /** Gallery images pulled from the company catalogue. First entry is the cover. */
  images: string[];
  area: number;
  year?: number;
}

/** Build the ordered `/projects/<id>/NN.jpg` paths that live in `public/`. */
function gallery(id: ProjectId, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/projects/${id}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

export const projects: Project[] = [
  { id: "babek-deniz-plaza", images: gallery("babek-deniz-plaza", 7), area: 5800 },
  { id: "ravy-tower", images: gallery("ravy-tower", 8), area: 29000 },
  { id: "ganja-prosecutor", images: gallery("ganja-prosecutor", 4), area: 4500 },
  { id: "old-town-plaza", images: gallery("old-town-plaza", 8), area: 14600, year: 2018 },
  { id: "lux-international-hospital", images: gallery("lux-international-hospital", 2), area: 5800, year: 2020 },
  { id: "agh-sheher-office", images: gallery("agh-sheher-office", 2), area: 9800, year: 2025 },
  { id: "west-hospital", images: gallery("west-hospital", 2), area: 6500, year: 2022 },
  { id: "yasmin-shopping-center", images: gallery("yasmin-shopping-center", 3), area: 17500 },
  { id: "villas", images: gallery("villas", 3), area: 3600 },
  { id: "almet-exhibition", images: gallery("almet-exhibition", 3), area: 3600 },
  { id: "narimanov-office", images: gallery("narimanov-office", 9), area: 6300 },
];
