export function nl2br(str: string) {
  return str.replace(/\r\n/g, "<br />").replace(/(\n|\r)/g, "<br />");
}

const jpy = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});
export function numberToYen(price: number) {
  return jpy.format(price);
}
