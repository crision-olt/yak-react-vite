import { FormKey }   from "@/types/forms";
import { nameInput } from "@/keys/form";

const priceInput: FormKey = {
    type: "price", size: 4, label: "general.price", register: {
        name: "price",
        options: {
            required: { value: true, message: "general.required" },
        },

    },
};
export const categoryInput: FormKey = {
    type: "select", size: 4, label: "productPage.category", options: undefined, register: {
        name: "category",
    },
};
export const productsFormKeys: FormKey[] = [nameInput, priceInput];
