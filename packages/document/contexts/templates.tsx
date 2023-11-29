"use client";

import { createContext, useContext } from "react";
import { PreTemplate } from "../pre-template";

export const TemplatesContext = createContext<{
  [key: string]: PreTemplate<any>;
}>(null as any);

type Props = {
  templates: { [key: string]: PreTemplate<any> };
  children: React.ReactNode;
};

export function TemplatesProvider({ templates, children }: Props) {
  return (
    <TemplatesContext.Provider value={templates}>
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplatesContext() {
  return useContext(TemplatesContext);
}
