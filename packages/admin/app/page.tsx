import NextLink from "next/link";
import { Page } from "@/components/page";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <Page name="ホーム" isRoot={true}>
      <Table w="100%">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>New　　　</TableHead>
            <TableHead>InProgress</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableHead fontWeight="bold">問い合わせ</TableHead>
            <TableCell>1</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>
              <NextLink href="/user">
                <Badge variant="outline">View</Badge>
              </NextLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Page>
  );
}
