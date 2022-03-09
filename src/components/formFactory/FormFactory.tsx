import { createElement, FC, ReactElement } from "react";
import { TextInput }                       from "@/components/formFactory/inputs";
import { FormKey }                         from "@/types/forms";
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
    const textInput = (input: FormKey): ReactElement<any, any> => createElement(TextInput, {
        form,
        input,
        data,
    }, null);

    const selectInput = (input: FormKey): ReactElement<any, any> => createElement(SelectInput, {
        form,
        input,
        data,
    }, null);

    const checkboxInput = (input: FormKey): ReactElement<any, any> => createElement(CheckboxInput, {
        form,
        input,
        data,
    }, null);
    const priceInput = (input: FormKey): ReactElement<any, any> => createElement(PriceInput, {
        form,
        input,
        data,
    }, null);

    const types: StringKeys<(input: FormKey) => ReactElement<any, any>> = {
        "text": textInput,
        "password": textInput,
        "checkbox": checkboxInput,
        "select": selectInput,
        "price": priceInput,
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