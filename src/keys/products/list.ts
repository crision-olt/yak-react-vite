import { Column }               from "@/components/table/Table";
import { idColumn, nameColumn } from "@/keys/list";

const categoryColumn: Column = {
    field: "category",
    type: "string",
    header: "productPage.category",
};

const priceColumn: Column = {
    field: "price",
    type: "string",
    header: "productPage.price",
    render: ({ field }, row) => `${row[field]} $`,
};

export const productsColumns: Column[] = [idColumn, nameColumn, categoryColumn, priceColumn];