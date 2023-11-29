namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    EMAIL_FROM: string;
    NEXT_PUBLIC_AWS_REGION: string;
    NEXT_PUBLIC_AWS_S3_BUCKET: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_API_KEY: string;
    STRIPE_API_SECRET: string;
  }
}
