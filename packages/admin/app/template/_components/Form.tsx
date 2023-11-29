"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { FullTemplate } from "core/template";
import { FullFile, getPath } from "core/file";
import { SubmitHandler, useZodForm, valueAsString } from "util/form";
import { useToast } from "@/components/ui/toast";
import { css, cx } from "@/lib/style/system/css";
import { icon } from "@/lib/style/system/recipes";
import { addOrEditSchema } from "@/actions/template/schema";
import { addOrEditAction, removeAction } from "@/actions/template";
import { uploadFile, deleteFile } from "@/actions/file";

import { Flex, Box, styled } from "@/lib/style/system/jsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  template?: FullTemplate;
  readOnly?: string[];
};

export function Form({ template, readOnly }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: addOrEditSchema,
    defaultValues: template || undefined,
  });

  const action = template ? "更新" : "追加";

  const [thumbnail, setThumbnail] = useState<FullFile | null>(
    template?.thumbnail || null
  );

  const onChangeThumbnail = (currentTemplate: FullTemplate) => {
    return async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0);

      if (!file) {
        if (thumbnailRef.current) {
          thumbnailRef.current.value = "";
        }
        return;
      }

      toast({
        title: "Processing...",
        description: "画像をアップロードしています。",
      });

      if (thumbnail) {
        deleteFile(thumbnail.path).catch((_e) =>
          console.log("Failed to delete a file.")
        );
      }

      let mimeType = file.type;
      let converted: Blob = file;
      if (
        typeof window !== "undefined" &&
        (file.type === "image/heic" || file.type === "image/heif")
      ) {
        try {
          const heic2any = require("heic2any");
          const jpeg = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 1,
          });

          if (!Array.isArray(jpeg)) {
            converted = jpeg;
            mimeType = "image/jpeg";
          }
        } catch (_e) {
          console.error("Failed to convert an image.");
        }
      }

      const name = createId();
      let uploaded;
      try {
        const body = new Uint8Array(await converted.arrayBuffer());
        const result = await uploadFile({
          name,
          body,
          mimeType,
          width: 1280,
        });

        if (result.file) {
          uploaded = result.file;
        } else {
          throw new Error("Failed to upload.");
        }
      } catch (_e) {
        toast({
          title: "Error",
          description: "画像をアップロードできませんでした。",
        });
        if (thumbnailRef.current) {
          thumbnailRef.current.value = "";
        }
        return;
      }

      try {
        const result = await addOrEditAction({
          ...currentTemplate,
          thumbnailId: uploaded.id,
        });

        setThumbnail(result.thumbnail || null);

        toast({
          title: "Success",
          description: "画像を設定しました。",
        });
      } catch (_e) {
        deleteFile(uploaded.path).catch((_e) =>
          console.error("Failed to delete a file.")
        );
        toast({
          title: "Error",
          description: "画像を設定できませんでした。",
        });
      }

      if (thumbnailRef.current) {
        thumbnailRef.current.value = "";
      }
    };
  };

  const onSubmit: SubmitHandler<z.infer<typeof addOrEditSchema>> = async (
    value
  ) => {
    try {
      const result = await addOrEditAction(value);
      reset(result);
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
      router.push("/template");
    } catch (_e) {
      toast({
        title: "Error",
        description: "削除できませんでした。",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
        <Box>
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            {...register("id", { ...valueAsString })}
            readOnly={readOnly?.includes("id")}
          />
        </Box>

        <Box mt="s.200">
          <Label htmlFor="name">Name*</Label>
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
          <Label htmlFor="structure">Structure*</Label>
          <Input
            id="structure"
            {...register("structure")}
            readOnly={readOnly?.includes("structure")}
          />
          {errors.structure && (
            <Alert variant="destructive" mt="s.100">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>正しく入力してください</AlertDescription>
            </Alert>
          )}
        </Box>

        {template && (
          <Box mt="s.200">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input
              id="thumbnail"
              type="file"
              ref={thumbnailRef}
              onChange={onChangeThumbnail(template)}
              readOnly={readOnly?.includes("thumbnail")}
            />

            {thumbnail && (
              <styled.img
                src={`/api/file/${getPath(thumbnail, "webp@1280")}`}
                alt="thumbnail"
                maxW="l.100"
                h="auto"
                mt="s.100"
              />
            )}

            {errors.thumbnailId && (
              <Alert variant="destructive" mt="s.100">
                <AlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>正しく入力してください</AlertDescription>
              </Alert>
            )}
          </Box>
        )}

        <Flex justify="space-between" mt="s.300">
          <Button type="submit">
            {isSubmitting && (
              <Loader2 className={cx(icon(), css({ animation: "spin" }))} />
            )}
            {action}
          </Button>

          {template && (
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
                    onClick={() => remove(template.id)}
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
