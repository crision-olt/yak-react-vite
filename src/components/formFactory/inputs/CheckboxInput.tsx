import { FC, memo, ReactElement }  from "react";
import { LabelProps, MInputProps } from "@/types/forms";
import { useInput }                from "@/hooks/useInput";


export const CheckboxInput: FC<MInputProps> = memo((
    {
        form,
        input,
        data,
    },
): ReactElement => {
    const { inputProps } = useInput({ form, input, data });
    const labelProps: LabelProps = {
        htmlFor: inputProps.id, className: "inline-flex items-center w-full cursor-pointer",
    };
    return (
        <label {...labelProps}>
            <input {...inputProps} className={"input-checkbox"}/>
            <span className="ml-2 text-sm text-gray-600">
                {input.label}
            </span>
        </label>
    );
});

