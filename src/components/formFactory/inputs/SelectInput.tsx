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
    const { inputProps, labelProps } = useInput({ form, input, data });


    return (
        <div className={`relative`}>
            <label {...labelProps}>{inputProps.placeholder}</label>
            <select {...inputProps}
                className={"peer input-text"}>
                {!input.register.options?.required &&
                    <option key={`undefined${input.label}`} value={undefined}/>}
                {input.options?.map(({ text, value }: Options) => <option key={`${value}${text}`}
                    value={value}>{text}</option>)}
            </select>

            {form.formState.errors[inputProps.id] &&
                <span className={"input-span"} role="alert">{form.formState.errors[inputProps.id].message}</span>}
        </div>
    );
};