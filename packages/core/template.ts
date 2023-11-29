import { Template, File, Asset } from "db";
import { FullProduct } from "./product";

export type { Template } from "db";

export type FullTemplate = Template & {
  thumbnail:
    | (File & {
        assets: Asset[];
      })
    | null;
};

export type FullTemplateWithProduct = FullTemplate & {
  product: FullProduct;
};
