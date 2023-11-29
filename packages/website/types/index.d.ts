type TableAction<IdType> = {
  name: string;
  variant: "default" | "secondary" | "outline" | "destructive";
  action: (id: IdType) => void;
};
