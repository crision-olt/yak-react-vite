import { FormKey } from "@/types/forms";

export const rememberFormKey: FormKey = {
    type: "checkbox",
    size: 12,
    label: "loginPage.remember",
    register: {
        name: "remember",
    },
};
export const passwordFormKey: FormKey = {
    type: "password",
    size: 1,
    label: "loginPage.password",
    register: {
        name: "password",
        options: {
            required: { value: true, message: "general.required" },
            minLength: {
                value: 5,
                message: "general.length5",
            },
        },

    },
};
export const emailFormKey: FormKey = {
    type: "text",
    size: 1,
    label: "loginPage.email",
    register: {
        name: "email",
        options: {
            required: { value: true, message: "general.required" },
            pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "loginPage.badEmail",
            },
        },

    },
};