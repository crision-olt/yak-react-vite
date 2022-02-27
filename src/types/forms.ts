import { RegisterOptions, UseFormRegisterReturn, UseFormReturn } from "react-hook-form";

export type RegisterType = {
    name: any,
    options?: RegisterOptions,

}
export type InputType = "text" | "password"
export type FormKey = {
    type: InputType,
    size: number,
    label: string,
    register: RegisterType,
}
export type MInputProps = {
    input: FormKey,
    form: UseFormReturn,
}
export type InputProps = {
    id: string,
    type: InputType,
    placeholder: string,
    className: string,
} & UseFormRegisterReturn
export type LabelProps = {
    htmlFor: string,
    className: string,
}