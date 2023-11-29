import { LucideIcon, icons as lucideIcons } from "lucide-react";

export const icons = Object.values(lucideIcons);

export const iconsMap = Object.entries(lucideIcons).map(([key, value]) => {
  return {
    name: key,
    icon: value,
  };
});

type Props = {
  color: string;
  size: number;
  strokeWidth: number;
  icon: LucideIcon;
};

export function Icon({ color, size, strokeWidth, icon }: Props) {
  const I = icon;
  return <I color={color} size={size} strokeWidth={strokeWidth} />;
}
