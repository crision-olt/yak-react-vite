import { FC, memo, ReactElement } from "react";
import { InputProps, MInputProps, Options } from "@/types/forms";
import { useTranslation } from "react-i18next";

export const SelectInput: FC<MInputProps> = memo((
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
    return (
        <>
            <select {...inputProps}>
                {!input.register.options?.required  && <option key={`undefined${input.label}`} value={undefined}>{input.label}</option>}
                {input.options?.map(({text,value}: Options) => <option key={`${value}${text}`} value={value}>{text}</option>)}
            </select>
            {form.formState.errors[inputProps.id] &&
                <span className={"input-span"} role="alert">{t(form.formState.errors[inputProps.id].message)}</span>}
        </>
    );
});