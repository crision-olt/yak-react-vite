import { FC, memo, ReactElement } from "react";
import { InputProps, LabelProps, MInputProps } from "@/types/forms";
import { useTranslation } from "react-i18next";


export const CheckboxInput: FC<MInputProps> = memo((
    {
        form,
        input,
    },
): ReactElement => {
    const [t] = useTranslation("global");
    input.label = t(input.label);
    const inputProps: InputProps = {
        id: input.register.name,
        type: "checkbox",
        placeholder: input.label,
        className: "input-checkbox",
        ...form.register(input.register.name, input.register.options),
    };
    const labelProps: LabelProps = {
        htmlFor: inputProps.id, className: "inline-flex items-center w-full cursor-pointer",
    };
    return (
        <label {...labelProps}>
            <input {...inputProps}/>
            <span className="ml-2 text-sm text-gray-600">
                {input.label}
            </span>
        </label>
    );
});

