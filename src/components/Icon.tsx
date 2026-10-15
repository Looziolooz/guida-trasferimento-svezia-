import {
  Award,
  Baby,
  Car,
  PlaneTakeoff,
  Receipt,
  School,
  ShieldCheck,
  Sunset,
  Vote,
  Zap,
  Briefcase,
  Flag,
  GraduationCap,
  Handshake,
  Hash,
  Home,
  IdCard,
  KeyRound,
  KeySquare,
  Landmark,
  PiggyBank,
  Plane,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "@/lib/guides";

const registry: Record<string, LucideIcon> = {
  Award,
  Baby,
  Car,
  PlaneTakeoff,
  Receipt,
  School,
  ShieldCheck,
  Sunset,
  Vote,
  Zap,
  Flag,
  GraduationCap,
  Handshake,
  Hash,
  Home,
  IdCard,
  KeyRound,
  KeySquare,
  Landmark,
  PiggyBank,
  Plane,
  Stethoscope,
};

export const categoryIcons: Record<CategoryId, LucideIcon> = {
  arrivo: Plane,
  casa: Home,
  famiglia: Baby,
  salute: Stethoscope,
  soldi: PiggyBank,
  vita: Briefcase,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = registry[name] ?? Landmark;
  return <Component className={className} aria-hidden />;
}
