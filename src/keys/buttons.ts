import { Button, ButtonFactoryProps } from "@/components/buttonFactory/ButtonFactory";

export const toggableButtons: ButtonFactoryProps = {
    cols: 6,
    buttons: [{ style: "primary", label: "Nuevo", type: "button", onClick: () => true, size: 1 }],
};
export const cancelButton: Button = {
    style: "danger",
    type: "button",
    label: "general.cancel",
    size: 1,
};
export const saveButton: Button = {
    style: "secondary",
    label: "general.save",
    type: "submit",
    size: 1,
};
export const childrenToggableButtons: ButtonFactoryProps = {
    cols: 6,
    buttons: [
        {
            ...cancelButton,
            onClick: () => false,
        },
        { ...saveButton }],
};


export const confirmButton: Button = {
    style: "primary",
    type: "button",
    label: "general.confirm",
    size: 1,
};


