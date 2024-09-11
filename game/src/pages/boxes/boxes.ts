import { Img } from '@/utilitiy/images';

export interface Box {
  icon: string;
  title: string;
  description: string;
}

export const boxes: Box[] = [
  {
    icon: Img.GuardianBox,
    title: "Guardian box",
    description: "A special box, only for Guardians",
  },
  {
    icon: Img.BronzeBox,
    title: "Bronze box",
    description: "Humble start with simple treasures",
  },
  {
    icon: Img.SilverBox,
    title: "Silver box",
    description: "A step up with a bit more sparkle",
  },
  {
    icon: Img.GoldBox,
    title: "Gold box",
    description: "Gleaming with mid-tier rewards",
  },
  {
    icon: Img.PlatinumBox,
    title: "Platinum box",
    description: "Packed with shiny surprises",
  },
  {
    icon: Img.OsmiumBox,
    title: "Osmium box",
    description: "Premium prizes await inside",
  },
  {
    icon: Img.ConetiumBox,
    title: "CoNETium box",
    description: "A rare find with legendary loot",
  },
];
