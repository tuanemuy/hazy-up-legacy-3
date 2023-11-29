type Props = {
  title: string;
  subtitle: string;
  reverse: boolean;
  className: string;
};

export const props = [
  { type: "text", key: "title", name: "タイトル" },
  { type: "text", key: "subtitle", name: "サブタイトル" },
  { type: "boolean", key: "reverse", name: "反転色" },
];

export function Template({ title, subtitle, reverse, className }: Props) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        minWidth: "100px",
      }}
    >
      <h3
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center",
          lineHeight: "1.25",
          color: reverse ? "#ffffff" : "#333333",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          position: "relative",
          zIndex: "1",
          content: '""',
          display: "block",
          width: "3rem",
          height: "3px",
          margin: "0 auto",
          marginTop: "16px",
          backgroundColor: reverse ? "#ffffff" : "#333333",
        }}
      />

      <p
        style={{
          overflow: "break-word",
          wordBreak: "break-all",
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export const defaultProps = {
  title: "Section Title",
  subtitle: "セクションタイトル",
  reverse: false,
};

export const description = "推奨表示サイズの説明等";
