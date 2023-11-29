"use client";

import { FullFile } from "core/file";
import { Screen } from "./screen";

export type GenerateTemplateArgs = {
  name: string;
  url: string;
  thumbnail?: FullFile;
};

export interface Template {
  name: string;
  url: string;
  thumbnail: FullFile | null;
}

export function generateTemplate({
  name,
  url,
  thumbnail,
}: GenerateTemplateArgs): Template {
  return {
    name,
    url,
    thumbnail: thumbnail || null,
  };
}

export async function transpileTemplate(
  template: Template
): Promise<TemplateModule> {
  try {
    const res = await fetch(template.url, {
      method: "GET",
      headers: {
        "Content-Type": "text/javascript",
      },
    });
    const text = await res.text();
    const code = await transpile(text);
    const args: GenerateTemplateModuleArgs = await import(
      `data:text/javascript,${encodeURIComponent(code)}`
    );
    return generateTemplateModule(args);
  } catch (e: any) {
    throw new Error(`Failed to transpile: ${e.message}`);
  }
}

export type PropsType =
  | "text"
  | "textarea"
  | "image"
  | "icon"
  | "boolean"
  | "size"
  | "color"
  | "fontFamily"
  | "fontWeight"
  | "textAlign";

export type GenerateTemplatePropsArgs = {
  type: PropsType;
  key: string;
  name: string;
};

export interface TemplateProps {
  type: PropsType;
  key: string;
  name: string;
}

export function generateTemplateProps({
  type,
  key,
  name,
}: GenerateTemplatePropsArgs): TemplateProps {
  return { type, key, name };
}

export type GenerateTemplateModuleArgs = {
  Template: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  styles: { [key: string]: string };
  props: TemplateProps;
  defaultProps: { [key: string]: any };
  description: string;
};

export interface TemplateModule {
  Template: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  styles: { [key: string]: string };
  props: TemplateProps;
  defaultProps: { [key: string]: any };
  description: string;
}

export function generateTemplateModule({
  Template,
  styles,
  props,
  defaultProps,
  description,
}: GenerateTemplateModuleArgs): TemplateModule {
  if (!Template || !styles || !props || !defaultProps || !description) {
    throw new Error("Invalid argument");
  }

  return {
    Template,
    styles,
    props,
    defaultProps,
    description,
  };
}

export function getStyle(
  templateModule: TemplateModule,
  screen: Screen
): string {
  let style = templateModule.styles.base;

  if (screen === Screen.Base) {
    return style;
  }

  style = `${style} ${templateModule.styles.sm}`;
  if (screen === Screen.Sm) {
    return style;
  }

  style = `${style} ${templateModule.styles.md}`;
  if (screen === Screen.Md) {
    return style;
  }

  style = `${style} ${templateModule.styles.lg}`;
  if (screen === Screen.Lg) {
    return style;
  }

  style = `${style}\n${templateModule.styles.xl}`;
  if (screen === Screen.Xl) {
    return style;
  }

  style = `${style}\n${templateModule.styles.xxl}`;

  return style;
}

export type GenerateTemplateCollectionArgs = {
  slug: string;
  name: string;
  templates: Template[];
};

export class TemplateCollection {
  constructor(
    public readonly slug: string,
    public readonly name: string,
    public readonly templates: Template[]
  ) {}

  static generate({
    slug,
    name,
    templates,
  }: GenerateTemplateCollectionArgs): TemplateCollection {
    return new TemplateCollection(slug, name, templates);
  }
}

import {
  CompilerOptions,
  JsxEmit,
  ModuleKind,
  ScriptTarget,
  transpileModule,
} from "typescript";

const defaultCompilerOptions: CompilerOptions = {
  jsx: JsxEmit.React,
  target: ScriptTarget.ESNext,
  module: ModuleKind.ESNext,
};

// @ts-ignore
window.process = {
  // @ts-ignore
  versions: {
    pnp: "undefined",
  },
};

const transpile = async (code: string): Promise<string> => {
  const opt = { ...defaultCompilerOptions };
  const { outputText } = transpileModule(code, {
    compilerOptions: opt,
  });

  const importReactRegex = /import\s+React\s+from\s+['"]react['"];?/g;
  const importAllRegex = /import\s+.*\s+from\s+['"].*['"];?/g;
  const importRegex = /import\s+.*\s+from\s+['"][^.].*['"];?/g;
  const matches = code.replace(importReactRegex, "").match(importRegex);

  const imports =
    matches?.reduce((acc, current) => {
      const converted = current.replace(
        /from\s*['"]([^'"]*)['"]/g,
        function (_match, p1) {
          return `from "https://esm.sh/${p1}"`;
        }
      );
      return `${acc}${converted}\n`;
    }, "") || "";

  const withoutImports = outputText.replace(importAllRegex, "");

  return `import React from "https://esm.sh/react";\n${imports}${withoutImports}`;
};
