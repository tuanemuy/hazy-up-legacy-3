"use client";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm, emptyAsNull } from "util/form";

import { Flex, styled } from "@/lib/style/system/jsx";
import { Label, Input, Button } from "@/components/ui";

type Fields = {
  email: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();
  const onSubmit: SubmitHandler<Fields> = ({ email }) => {
    signIn("email", {
      email,
      callbackUrl: "/auth/register",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="email">Email</Label>

      <Input
        id="email"
        type="email"
        w="l.100"
        {...register("email", { ...emptyAsNull, required: true })}
      />

      {errors.email && (
        <styled.p mt="s.100" color="destructive">
          ！正しく入力してください
        </styled.p>
      )}

      <Flex justify="center" mt="m.50">
        <Button fontWeight="bold">ログイン ／ 会員登録</Button>
      </Flex>
    </form>
  );
}
