import { Product, Template, File, Asset } from "db";

export type { Product } from "db";

export type FullProduct = Product & {
  thumbnail:
    | (File & {
        assets: Asset[];
      })
    | null;
  template:
    | (Template & {
        thumbnail:
          | (File & {
              assets: Asset[];
            })
          | null;
      })
    | null;
};

export const ProductCategory = {
  CARD: "card",
  TEMPLATE: "template",
} as const;
export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

export function stringToProductCategory(
  str: string
): ProductCategory | undefined {
  switch (str) {
    case "card":
      return ProductCategory.CARD;
    case "template":
      return ProductCategory.TEMPLATE;
    default:
      return undefined;
  }
}

export function getProductCategoryName(category?: ProductCategory): string {
  switch (category) {
    case ProductCategory.CARD:
      return "名刺";
    case ProductCategory.TEMPLATE:
      return "テンプレート";
    default:
      return "不明";
  }
}
