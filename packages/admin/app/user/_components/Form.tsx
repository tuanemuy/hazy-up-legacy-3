"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { User } from "db";
import { SubmitHandler, useZodForm, valueAsString } from "util/form";
import { Role, stringToRole, getRoleName } from "core/user";
import { useToast } from "@/components/ui/toast";
import { css, cx } from "@/lib/style/system/css";
import { icon } from "@/lib/style/system/recipes";
import { addOrEditSchema } from "@/actions/user/schema";
import { addOrEditAction, removeAction } from "@/actions/user";

import { Flex, Box } from "@/lib/style/system/jsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

type Props = {
  user?: User;
  readOnly?: string[];
};

export function Form({ user, readOnly }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: addOrEditSchema,
    defaultValues: user
      ? {
          ...user,
          email: user.email || undefined,
          role: stringToRole(user.role),
        }
      : undefined,
  });

  const action = user ? "更新" : "追加";

  const onSubmit: SubmitHandler<z.infer<typeof addOrEditSchema>> = async (
    value
  ) => {
    try {
      const result = await addOrEditAction(value);
      reset({
        ...result,
        email: result.email || undefined,
        role: stringToRole(result.role),
      });
      toast({
        title: "Success",
        description: `${action}しました。`,
      });
    } catch (_e) {
      toast({
        title: "Error",
        description: `${action}できませんでした。`,
      });
    }
  };

  const remove = async (id: string) => {
    try {
      await removeAction({ id });
      toast({
        title: "Success",
        description: "削除しました。",
      });
      router.push("/user");
    } catch (_e) {
      toast({
        title: "Error",
        description: "削除できませんでした。",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            {...register("id", { ...valueAsString })}
            readOnly={readOnly?.includes("id")}
          />
        </Box>

        <Box mt="s.200">
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { ...valueAsString })}
            readOnly={readOnly?.includes("email")}
          />
          {errors.email && (
            <Alert variant="destructive" mt="s.100">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>正しく入力してください</AlertDescription>
            </Alert>
          )}
        </Box>

        <Box mt="s.200">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { ...valueAsString })}
            readOnly={readOnly?.includes("name")}
          />
          {errors.name && (
            <Alert variant="destructive" mt="s.100">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>正しく入力してください</AlertDescription>
            </Alert>
          )}
        </Box>

        <Box mt="s.200">
          <Label htmlFor="role">Role*</Label>
          <Select
            onValueChange={(value) =>
              setValue("role", stringToRole(value) || Role.USER)
            }
            defaultValue={user?.role || Role.USER}
            disabled={readOnly?.includes("role")}
          >
            <SelectTrigger>
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={Role.USER}>
                  {getRoleName(Role.USER)}
                </SelectItem>
                <SelectItem value={Role.ADMIN}>
                  {getRoleName(Role.ADMIN)}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.role && (
            <Alert variant="destructive" mt="s.100">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>選択してください</AlertDescription>
            </Alert>
          )}
        </Box>

        <Flex justify="space-between" mt="s.300">
          <Button type="submit">
            {isSubmitting && (
              <Loader2 className={cx(icon(), css({ animation: "spin" }))} />
            )}
            {action}
          </Button>

          {user && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="ghost">
                  削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    削除したデータを元に戻すことはできません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => remove(user.id)}
                    variant="destructive"
                  >
                    削除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </Flex>
      </form>
    </>
  );
}
