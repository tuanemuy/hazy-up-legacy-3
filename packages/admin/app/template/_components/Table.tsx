"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm } from "util/form";
import { DBOrder } from "db";
import { getSchema } from "@/actions/template/schema";
import { GetResult, getAction } from "@/actions/template";

import NextLink from "next/link";
import { Box, Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";
import {
  Table as TableView,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClientPagination } from "@/components/ui/pagination";
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
import { Plus } from "lucide-react";

type Props = {
  actions: TableAction<string>[];
};

export function Table({ actions }: Props) {
  const { register, handleSubmit, watch, setValue } = useZodForm({
    schema: getSchema,
    defaultValues: {
      perPage: 30,
      page: 1,
      order: DBOrder.ASC,
      orderBy: "id",
    },
  });
  const inputs = watch();

  const onSubmit: SubmitHandler<z.infer<typeof getSchema>> = (_data) => {
    fetch();
  };

  const [templates, setTemplates] = useState<GetResult["templates"]>([]);
  const [count, setCount] = useState(0);

  const fetch = async () => {
    const result = await getAction(inputs);
    setTemplates(result.templates);
    setCount(result.count);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <TableView w="100%" mt="s.100">
        <TableHeader>
          <TableRow>
            <TableHead w="0">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {templates.map((template) => {
            return (
              <TableRow key={template.id}>
                <TableCell>{template.id}</TableCell>
                <TableCell>{template.name}</TableCell>
                <TableCell>
                  <Flex>
                    {actions.map((action, index) => {
                      return (
                        <Badge
                          key={index}
                          variant={action.variant}
                          onClick={() => action.action(template.id)}
                          cursor="pointer"
                        >
                          {action.name}
                        </Badge>
                      );
                    })}
                  </Flex>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableView>

      <Flex mt="0">
        <Button asChild w="100%" h="auto" py="s.100" variant="outline">
          <NextLink href="/template/new">
            <Plus size={16} />
          </NextLink>
        </Button>
      </Flex>

      <Box mt="s.200">
        <ClientPagination
          count={count}
          perPage={inputs.perPage}
          page={inputs.page}
          onClick={(page) => {
            setValue("page", page);
          }}
        />
      </Box>

      <Box mt="m.50">
        <Flex gap="s.200" flexShrink="0" maxW="full" wrap="wrap">
          <Flex align="center" gap="s.100">
            <Label htmlFor="id">ID</Label>
            <Input
              id="id"
              {...register("id", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
            />
          </Flex>

          <Flex align="center" gap="s.100">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
            />
          </Flex>

          <Flex align="center" gap="s.100">
            <Label>PerPage</Label>
            <Input type="number" min="1" w="m.150" {...register("perPage")} />
          </Flex>

          <Flex align="center" gap="s.100">
            <Label>Order</Label>
            <Select
              onValueChange={(value) =>
                setValue("order", value === "asc" ? "asc" : "desc")
              }
              defaultValue={DBOrder.ASC}
            >
              <SelectTrigger>
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={DBOrder.ASC}>ASC</SelectItem>
                  <SelectItem value={DBOrder.DESC}>DESC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Flex>

          <Flex align="center" gap="s.100">
            <Label>OrderBy</Label>
            <Select
              onValueChange={(value) => setValue("orderBy", value)}
              defaultValue={"id"}
            >
              <SelectTrigger>
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="id">ID</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Flex>

          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Search
          </Button>
        </Flex>
      </Box>
    </>
  );
}
