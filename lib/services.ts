export type ServiceId =
  | "hvac"
  | "vrf"
  | "chiller"
  | "ventilation"
  | "boiler"
  | "plumbing"
  | "fire"
  | "electrical"
  | "design"
  | "installation";

export type ServiceIcon =
  | "wind"
  | "snowflake"
  | "droplet"
  | "flame"
  | "fan"
  | "plug"
  | "shield"
  | "blueprint"
  | "wrench"
  | "gauge";

export interface Service {
  id: ServiceId;
  icon: ServiceIcon;
}

export const services: Service[] = [
  { id: "hvac", icon: "wind" },
  { id: "vrf", icon: "snowflake" },
  { id: "chiller", icon: "gauge" },
  { id: "ventilation", icon: "fan" },
  { id: "boiler", icon: "flame" },
  { id: "plumbing", icon: "droplet" },
  { id: "fire", icon: "shield" },
  { id: "electrical", icon: "plug" },
  { id: "design", icon: "blueprint" },
  { id: "installation", icon: "wrench" },
];
