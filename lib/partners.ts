export interface Partner {
  id: string;
  name: string;
  logo?: {
    src: string;
    width: number;
    height: number;
    className?: string;
  };
}

export const partners: Partner[] = [
  {
    id: "toshiba",
    name: "Toshiba",
    logo: {
      src: "/toshiba.png",
      width: 3000,
      height: 2000,
      className: "scale-[2.15]",
    },
  },
  { id: "air-plus", name: "Air Plus" },
  {
    id: "carrier",
    name: "Carrier",
    logo: {
      src: "/carrier.png",
      width: 1280,
      height: 517,
      className: "scale-100",
    },
  },
  {
    id: "mitsubishi-electric",
    name: "Mitsubishi Electric",
    logo: {
      src: "/mitsubishi.png",
      width: 3840,
      height: 1171,
      className: "scale-[1.05]",
    },
  },
  {
    id: "gree",
    name: "Gree",
    logo: {
      src: "/gree.png",
      width: 3840,
      height: 2160,
      className: "scale-[1.95]",
    },
  },
];
