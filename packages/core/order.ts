import { Order, Customer, Product, Billing, Shipping } from "db";
import {
  LucideIcon,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  Check,
  X,
} from "lucide-react";

export type { Order } from "db";

export type FullOrder = Order & {
  customer: Customer | null;
  product: Product | null;
  billing: Billing | null;
  shipping: Shipping | null;
};

export const OrderStatus = {
  ORDERED: 0,
  PAID: 1,
  PREPARED: 2,
  SHIPPED: 3,
  COMPLETED: 4,
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export function numberToOrderStatus(num: number): OrderStatus | undefined {
  switch (num) {
    case 0:
      return OrderStatus.ORDERED;
    case 1:
      return OrderStatus.PAID;
    case 2:
      return OrderStatus.PREPARED;
    case 3:
      return OrderStatus.SHIPPED;
    case 4:
      return OrderStatus.COMPLETED;
    default:
      return undefined;
  }
}

export function getOrderStatusAction(status?: OrderStatus): string {
  switch (status) {
    case OrderStatus.ORDERED:
      return "注文";
    case OrderStatus.PAID:
      return "支払い";
    case OrderStatus.PREPARED:
      return "商品準備";
    case OrderStatus.SHIPPED:
      return "発送";
    case OrderStatus.COMPLETED:
      return "完了";
    default:
      return "不明";
  }
}

export function getOrderStatusIcon(status?: OrderStatus): LucideIcon {
  switch (status) {
    case OrderStatus.ORDERED:
      return ShoppingCart;
    case OrderStatus.PAID:
      return CreditCard;
    case OrderStatus.PREPARED:
      return Package;
    case OrderStatus.SHIPPED:
      return Truck;
    case OrderStatus.COMPLETED:
      return Check;
    default:
      return X;
  }
}
