import { useTranslation }                      from "react-i18next";
import { InputProps, LabelProps, MInputProps } from "@/types/forms";
import { TFunction }                           from "i18next";

export type UseInputReturn = {
    inputProps: InputProps,
    labelProps: LabelProps,
    t: TFunction,
}
export const useInput: (props: MInputProps) => UseInputReturn = ({ form, input, data }) => {
    const [t] = useTranslation("global");
    input.label = t(input.label);
    const inputProps: InputProps = {
        id: input.register.name,
        type: input.type,
        placeholder: input.label,
        ...form.register(input.register.name, input.register.options),
    };
    const labelProps: LabelProps = {
        htmlFor: inputProps.id, className: "input-label",
    };
    data && form.setValue(inputProps.id, data[inputProps.id]);
    return { inputProps, labelProps, t };
};