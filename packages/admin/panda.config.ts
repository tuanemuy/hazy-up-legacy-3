import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

export default defineConfig({
  presets: ["@shadow-panda/preset"],
  preflight: true,
  jsxFramework: "react",
  include: ["../**/*.{jsx,tsx}"],
  exclude: ["../**/node_modules/*.{js,jsx,ts,tsx}"],
  poll: true,
  theme: {
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      tokens: {
        fonts: {
          sans: {
            value:
              "'Helvetica Neue', Arial, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif",
          },
        },
        fontWeights: {
          bold: { value: 700 },
          regular: { value: 400 },
          normal: { value: 400 },
          medium: { value: 500 },
        },
        sizes: {
          s: {
            DEFAULT: { value: "8px" },
            50: { value: "4px" },
            100: { value: "8px" },
            150: { value: "12px" },
            200: { value: "16px" },
            250: { value: "24px" },
            300: { value: "32px" },
          },
          m: {
            DEFAULT: { value: "64px" },
            50: { value: "32px" },
            100: { value: "64px" },
            150: { value: "96px" },
            200: { value: "128px" },
            250: { value: "160px" },
            300: { value: "192px" },
          },
          l: {
            DEFAULT: { value: "320px" },
            50: { value: "160px" },
            100: { value: "320px" },
            150: { value: "480px" },
            200: { value: "640px" },
            250: { value: "800px" },
            300: { value: "960px" },
          },
        },
        spacing: {
          s: {
            DEFAULT: { value: "8px" },
            50: { value: "4px" },
            100: { value: "8px" },
            150: { value: "12px" },
            200: { value: "16px" },
            250: { value: "24px" },
            300: { value: "32px" },
          },
          m: {
            DEFAULT: { value: "64px" },
            50: { value: "32px" },
            100: { value: "64px" },
            150: { value: "96px" },
            200: { value: "128px" },
            250: { value: "160px" },
            300: { value: "192px" },
          },
          l: {
            DEFAULT: { value: "320px" },
            50: { value: "160px" },
            100: { value: "320px" },
            150: { value: "480px" },
            200: { value: "640px" },
            250: { value: "800px" },
            300: { value: "960px" },
          },
        },
        colors: {},
      },
      semanticTokens: {
        colors: {
          theme: { value: "#0f1e51" },
          info: { value: "#4caf50" },
          warning: { value: "#ff9800" },
          background: {
            value: {
              base: "#f5f5f5",
              _dark: "{colors.grayscale.950}",
            },
          },
          primary: {
            DEFAULT: {
              value: {
                base: "#ea9921",
                _dark: "#ffffff",
              },
            },
            foreground: {
              value: {
                base: "#ffffff",
                _dark: "#ea9921",
              },
            },
          },
          secondary: {
            DEFAULT: {
              value: {
                base: "#a4a4a4",
                _dark: "#ffffff",
              },
            },
            foreground: {
              value: {
                base: "#ffffff",
                _dark: "#a4a4a4",
              },
            },
          },
          accent: {
            DEFAULT: {
              value: {
                base: "#eaecf3",
                _dark: "#0f1e51",
              },
            },
            foreground: {
              value: {
                base: "#0f1e51",
                _dark: "#eaecf3",
              },
            },
          },
        },
      },
    },
  },
  patterns: {
    extend: {
      container: {
        transform(props) {
          return {
            position: "relative",
            px: {
              base: "s.200",
              md: "m.50",
              lg: "m.100",
            },
            ...props,
          };
        },
      },
      box: {
        transform(props) {
          return {
            position: "relative",
            ...props,
          };
        },
      },
      row: {
        transform(props) {
          return {
            position: "relative",
            display: "flex",
            width: "100%",
            ...props,
          };
        },
      },
      column: {
        properties: {
          grow: { type: "number" },
          shrink: { type: "number" },
        },
        transform(props) {
          const { grow, shrink, ...rest } = props;
          return {
            position: "relative",
            flexGrow: grow || 0,
            flexShrink: shrink || 0,
            maxWidth: "100%",
            "& > *": {
              width: "100%",
              height: "100%",
            },
            ...rest,
          };
        },
      },
      card: {
        transform(props) {
          return {
            position: "relative",
            bg: "white",
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            ...props,
          };
        },
      },
      background: {
        transform(props) {
          return {
            position: "absolute",
            zIndex: "0",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "& > img": {
              width: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              verticalAlign: "middle",
            },
            ...props,
          };
        },
      },
    },
  },
  globalCss: defineGlobalStyles({
    "html, body": {
      "*": {
        fontFamily: "sans",
        letterSpacing: "0",
        lineHeight: 1.75,
        fontFeatureSettings: '"pkna"',
      },
      "h1, h2, h3, h4, h5": {
        lineHeight: 1.5,
      },
      fontSize: {
        base: "14px",
        md: "16px",
      },
      bg: "background",
    },
    "html:has(.zoomable-frame)": {
      overscrollBehaviorX: "none",

      "& *": {
        overscrollBehaviorX: "none",
      },
    },
    td: {
      whiteSpace: "nowrap",
    },
    "input, textarea": {
      fontSize: "16px !important",
      lineHeight: "1.5 !important",
    },
    'input[type="color"]': {
      appearance: "auto !important",
      p: "0 !important",
    },
  }),
  staticCss: {
    recipes: {
      toast: [{ variant: ["*"] }],
      badge: [{ variant: ["*"] }],
      button: [{ variant: ["*"] }],
    },
  },
  outdir: "lib/style/system",
});
