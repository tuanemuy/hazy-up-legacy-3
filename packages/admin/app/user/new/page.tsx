import { Page } from "@/components/page";
import { Form } from "../_components/Form";

export default function Add() {
  return (
    <Page name="ユーザー追加">
      <Form readOnly={["id"]} />
    </Page>
  );
}
