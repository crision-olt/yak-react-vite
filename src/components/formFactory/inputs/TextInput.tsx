import { FC, memo, ReactElement } from "react";
import { InputProps, LabelProps, MInputProps } from "@/types/forms";
import { useTranslation } from "react-i18next";


export const TextInput: FC<MInputProps> = memo((
    {
        form,
        input,
    },
): ReactElement => {
    const [t] = useTranslation("global");
    input.label = t(input.label);
    const inputProps: InputProps = {
        id: input.register.name,
        type: input.type,
        placeholder: input.label,
        className: "peer input-text",
        ...form.register(input.register.name, input.register.options),
    };
    const labelProps: LabelProps = {
        htmlFor: inputProps.id, className: "input-label",
    };
    return (
        <div className={`relative`}>
            <input  {...inputProps}/>
            <label {...labelProps}>{inputProps.placeholder}</label>
            {form.formState.errors[inputProps.id] &&
                <span className={"input-span"} role="alert">{t(form.formState.errors[inputProps.id].message)}</span>}
        </div>
    );
});

