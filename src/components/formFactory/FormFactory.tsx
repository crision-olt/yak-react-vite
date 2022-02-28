import { createElement, FC, ReactElement } from "react";
import { TextInput } from "@/components/formFactory/inputs";
import { FormKey } from "@/types/forms";
import { StringKeys } from "@utils";
import { UseFormReturn } from "react-hook-form";
import { CheckboxInput } from "@/components/formFactory/inputs/CheckboxInput";
import { SelectInput } from "@/components/formFactory/inputs/SelectInput";

export type FormFactoryProps = {
    form: UseFormReturn,
    cols: number,
    inputs: FormKey[],
}
export const FormFactory: FC<FormFactoryProps> = (
    {
        form,
        cols,
        inputs,
    }) => {

    const textInput = (input: FormKey): ReactElement<any, any> => createElement(TextInput, {
        form,
        input,
    }, null);

    const selectInput = (input: FormKey): ReactElement<any, any> => createElement(SelectInput, {
        form,
        input,
    }, null);

    const checkboxInput = (input: FormKey): ReactElement<any, any> => createElement(CheckboxInput, {
        form,
        input,
    }, null);

    const types: StringKeys<(input: FormKey) => ReactElement<any, any>> = {
        "text": textInput,
        "password": textInput,
        "checkbox": checkboxInput,
        "select": selectInput,
    };

    const getInput = (input: FormKey): ReactElement<any, any> => types[input.type](input);

    return (
        <div className={`grid grid-cols-${cols} gap-4`}>
            {inputs.map((input: FormKey) => (
                    <div key={input.register.name} className={`col-span-${input.size}`}>
                        {getInput(input)}
                    </div>
                ),
            )}
        </div>
    );
};