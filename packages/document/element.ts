import { LucideIcon } from "lucide-react";
import { FullFile } from "core/file";
import { Responsive, generateResponsive } from "./responsive";
import { Padding } from "./attribute";
import { Template, transpileTemplate } from "./template";
import { PreTemplate } from "./pre-template";

export const Role = {
  Page: "page",
  Section: "section",
  Columns: "columns",
  Component: "component",
};
export type Role = (typeof Role)[keyof typeof Role];

export interface Element {
  role: Role;
  attributes: { [key: string]: any };
}

export type PageAttributes = {};

export function generatePageElement(attributes: PageAttributes): Element {
  return {
    role: Role.Page,
    attributes,
  };
}

export type SectionAttributes = {
  padding: Responsive<Padding>;
  isWrapped: boolean;
  background: string | null;
  backgroundImage: FullFile | null;
  isSemantic: boolean;
};

export function generateSectionElement(attributes: SectionAttributes): Element {
  return {
    role: Role.Section,
    attributes,
  };
}

export function generateDefaultSectionElement(): Element {
  return {
    role: Role.Section,
    attributes: {
      padding: generateResponsive([[30, 30]]),
      isWrapped: true,
      background: null,
      backgroundImage: null,
      isSemantic: true,
    },
  };
}

export type ColumnsAttributes = {
  spacing: Responsive<number>;
  justifyContent:
    | "stretch"
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between";
  alignItems: "stretch" | "flex-start" | "center" | "flex-end";
  repeat: Responsive<number>;
  gap: Responsive<number>;
  flexWrap: boolean;
};

export function generateColumnsElement(attributes: ColumnsAttributes): Element {
  return {
    role: Role.Columns,
    attributes,
  };
}

export function generateDefaultColumnsElement(): Element {
  return {
    role: Role.Columns,
    attributes: {
      spacing: generateResponsive([30]),
      justifyContent: "stretch",
      alignItems: "stretch",
      repeat: generateResponsive([-1]),
      gap: generateResponsive([5]),
      flexWrap: true,
    },
  };
}

export type ComponentAttributes = {
  spacing: Responsive<number>;
  width: Responsive<number | null>;
  href: string | null;
  templateId: string;
  props: Responsive<{
    [key: string]: string | number | boolean | FullFile | LucideIcon;
  }>;
};

export function generateComponentElement(
  attributes: ComponentAttributes
): Element {
  return {
    role: Role.Component,
    attributes,
  };
}

export function generateDefaultComponentElement(
  template: PreTemplate<any>
): Element {
  return {
    role: Role.Component,
    attributes: {
      spacing: generateResponsive([30]),
      width: generateResponsive([null]),
      templateId: template.id,
      props: generateResponsive([template.defaultProps]),
    },
  };
}
