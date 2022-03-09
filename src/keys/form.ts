import { FormKey } from "@/types/forms";

export const nameInput: FormKey = {
    type: "text", size: 4, label: "general.name", register: {
        name: "name",
        options: {
            required: { value: true, message: "general.required" },
            minLength: {
                value: 5,
                message: "general.length5",
            },
        },

    },
};