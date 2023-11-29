"use client";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm, emptyAsNull } from "util/form";
import { css, cx } from "@/lib/style/system/css";
import { icon } from "@/lib/style/system/recipes";

import { Flex, Box } from "@/lib/style/system/jsx";
import { Page } from "@/components/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

type Fields = {
  email: string;
};

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = ({ email }) => {
    signIn("email", {
      email,
      callbackUrl: "/",
    });
  };

  return (
    <Page name="ログイン" isRoot={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email", { ...emptyAsNull, required: true })}
          />

          {errors.email && (
            <Alert variant="destructive" mt="s.100">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>正しく入力してください</AlertDescription>
            </Alert>
          )}
        </Box>

        <Flex mt="s.300">
          <Button type="submit">
            {isSubmitting && (
              <Loader2 className={cx(icon(), css({ animation: "spin" }))} />
            )}
            ログイン
          </Button>
        </Flex>
      </form>
    </Page>
  );
}
