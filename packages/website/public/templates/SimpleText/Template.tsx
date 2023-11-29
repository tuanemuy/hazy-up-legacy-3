type Props = {
  text: string;
  color: string;
  size: number;
  weight: string;
  family: string;
  align: "left" | "center" | "right";
  className: string;
};

export const props = [
  { type: "text", key: "title", name: "タイトル" },
  { type: "color", key: "color", name: "色" },
  { type: "size", key: "size", name: "サイズ" },
  { type: "fontWeight", key: "weight", name: "ウェイト" },
  { type: "fontFamily", key: "family", name: "ファミリー" },
  { type: "textAlign", key: "align", name: "文字揃え" },
];

export function Template({
  text,
  color,
  size,
  weight,
  family,
  align,
  className,
}: Props) {
  return (
    <p
      className={className}
      style={{
        position: "relative",
        width: "100%",
        minWidth: "100px",
        overflow: "break-word",
        wordBreak: "break-all",
        color: color,
        fontSize: `${size}px`,
        fontWeight: weight,
        fontFamily: `${family} sans-serif`,
        textAlign: align,
      }}
    >
      {text}
    </p>
  );
}

export const defaultProps = {
  text: "テキスト",
  color: "#333333",
  size: "16px",
  weight: "400",
  family:
    '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  align: "left",
};

export const description = "推奨表示サイズの説明等";
