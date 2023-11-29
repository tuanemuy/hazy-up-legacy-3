"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useZodForm, emptyAsNull } from "util/form";
import { FullUser } from "core/user";
import { addCustomer } from "@/actions/user";
import { addCustomerSchema } from "@/actions/user/schema";
import { useToast } from "@/components/ui/toast";

import { Box, Flex, styled } from "@/lib/style/system/jsx";
import { Label, Input, Button } from "@/components/ui";

type Props = {
  user: FullUser;
};

export function Form({ user }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm({
    schema: addCustomerSchema,
    defaultValues: {
      userId: user.id,
      email: user.email,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof addCustomerSchema>> = async (
    value
  ) => {
    const { customer } = await addCustomer(value);
    if (customer) {
      toast({
        title: "Success",
        description: "登録が完了しました。",
      });
      router.push("/user");
    } else {
      toast({
        title: "Error",
        description:
          "うまく登録できませんでした。<br/>もう一度お試しください。",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <styled.h1 fontSize="1.25rem" fontWeight="bold" textAlign="center">
        ユーザー登録
      </styled.h1>
      <styled.p mt="s.100" textAlign="center">
        まずは情報を登録してください。
      </styled.p>

      <Box mt="s.200">
        <Label htmlFor="name">お名前（必須）</Label>
        <Input id="name" w="l.100" {...register("name", { ...emptyAsNull })} />

        {errors.name && (
          <styled.p mt="s.100" color="destructive">
            ！正しく入力してください
          </styled.p>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="tel">電話番号（必須）</Label>
        <Input id="tel" w="l.100" {...register("tel", { ...emptyAsNull })} />

        {errors.tel && (
          <styled.p mt="s.100" color="destructive">
            ！正しく入力してください
          </styled.p>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="employer-name">企業名（必須）</Label>
        <Input
          id="employer-name"
          w="l.100"
          {...register("employerName", { ...emptyAsNull })}
        />

        {errors.employerName && (
          <styled.p mt="s.100" color="destructive">
            ！正しく入力してください
          </styled.p>
        )}
      </Box>

      <Flex justify="center" mt="m.50">
        <Button type="submit" fontWeight="bold">
          登録する
        </Button>
      </Flex>
    </form>
  );
}
