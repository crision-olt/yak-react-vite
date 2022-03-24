import { createElement, FC, ReactElement } from "react";
import { TextInput }                       from "@/components/formFactory/inputs";
import { FormKey, MInputProps }            from "@/types/forms";
import { StringKeys }                      from "@utils";
import { UseFormReturn }                   from "react-hook-form";
import { CheckboxInput }                   from "@/components/formFactory/inputs/CheckboxInput";
import { SelectInput }                     from "@/components/formFactory/inputs/SelectInput";
import { colSpan, gridCols }               from "@/style/grid";
import { Number12 }                        from "@/components/buttonFactory/ButtonFactory";
import { PriceInput }                      from "@/components/formFactory/inputs/PriceInput";

export type FormFactoryProps = {
    form: UseFormReturn<any>,
    cols: Number12,
    inputs: FormKey[],
    data?: any,
}
export const FormFactory: FC<FormFactoryProps> = (
    {
        form,
        cols,
        inputs,
        data,
    }) => {

    const getComponent = (Component: FC<MInputProps>) => (input: FormKey): ReactElement<any, any> => createElement(Component, {
        form,
        input,
        data,
    }, null);

    const types: StringKeys<(input: FormKey) => ReactElement<any, any>> = {
        "text": getComponent(TextInput),
        "password": getComponent(TextInput),
        "checkbox": getComponent(CheckboxInput),
        "select": getComponent(SelectInput),
        "price": getComponent(PriceInput),
    };

    const getInput = (input: FormKey): ReactElement<any, any> => types[input.type](input);

    return (
        <div className={`grid ${gridCols[cols]} gap-4`}>
            {inputs.map((input: FormKey) => (
                    <div key={input.register.name} className={colSpan[input.size]}>
                        {getInput(input)}
                    </div>
                ),
            )}
        </div>
    );
};