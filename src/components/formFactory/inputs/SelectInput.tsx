import { FC, ReactElement }     from "react";
import { MInputProps, Options } from "@/types/forms";
import { useInput }             from "@/hooks/useInput";

export const SelectInput: FC<MInputProps> = (
    {
        form,
        input,
        data,
    },
): ReactElement => {
    const { inputProps, labelProps, t } = useInput({ form, input, data });


    return (
        <div className={`relative`}>
            <label {...labelProps}>{t(inputProps.placeholder)}</label>
            <select {...inputProps}
                className={"peer input-text"}>
                {!input.register.options?.required &&
                    <option key={`undefined${input.label}`} value={undefined}></option>}
                {input.options?.map(({ text, value }: Options) => <option key={`${value}${text}`}
                    value={value}>{text}</option>)}
            </select>

            {form.formState.errors[inputProps.id] &&
                <span className={"input-span"} role="alert">{t(form.formState.errors[inputProps.id].message)}</span>}
        </div>
    );
};