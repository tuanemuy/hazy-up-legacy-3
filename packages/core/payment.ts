export function statusToString(status: string): string {
  switch (status) {
    case "processing":
      return "処理中";
    case "succeeded":
      return "完了";
    case "requires_action":
      return "追加のアクションが必要です";
    case "required_payment_method":
      return "支払い方法が指定されていません";
    case "payment_failed":
      return "失敗";
    default:
      return "不明";
  }
}
