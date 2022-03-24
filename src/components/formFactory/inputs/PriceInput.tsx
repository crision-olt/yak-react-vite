import { FC, ReactElement } from "react";
import { MInputProps }      from "@/types/forms";
import { useInput }         from "@/hooks/useInput";

export const PriceInput: FC<MInputProps> = (
    {
        form,
        input,
        data,
    },
): ReactElement => {
    const { inputProps, labelProps } = useInput({ form, input, data });
    return (
        <div className="relative">
            <div className="flex flex-row">
                <input {...inputProps}
                    className={"peer input-text"}/>
                <label {...labelProps}>{inputProps.placeholder}</label>
                <span
                    className="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker">$</span>

            </div>
            {form.formState.errors[inputProps.id] &&
                <span className={"input-span"} role="alert">{form.formState.errors[inputProps.id].message}</span>}
        </div>
    );
};
