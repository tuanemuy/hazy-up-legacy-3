export const ActionError = {
  DuplicateNameError: "duplicate-name",
  NotFoundError: "not-found",
  DatabaseError: "database-error",
  S3Error: "s3-error",
  ImageConversionError: "image-conversion-error",
  StripeError: "stripe-error",
} as const;
export type ActionError = (typeof ActionError)[keyof typeof ActionError];
