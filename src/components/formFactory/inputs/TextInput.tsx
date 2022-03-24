import { FC, ReactElement } from "react";
import { MInputProps }      from "@/types/forms";
import { useInput }         from "@/hooks/useInput";


export const TextInput: FC<MInputProps> = (
    {
        form,
        input,
        data,
    },
): ReactElement => {
    const { inputProps, labelProps } = useInput({ form, input, data });
    return (
        <div className={`relative`}>
            <input  {...inputProps}
                className={"peer input-text"}/>
            <label {...labelProps}>{inputProps.placeholder}</label>
            {form.formState.errors[inputProps.id] &&
                <span className={"input-span"} role="alert">{form.formState.errors[inputProps.id].message}</span>}
        </div>
    );
};

