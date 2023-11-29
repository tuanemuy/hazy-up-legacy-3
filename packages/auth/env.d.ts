namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    EMAIL_FROM: string;
  }
}
