import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useForm }                                       from "react-hook-form";
import { Title }                                         from "@/components/forLayout/Title";
import { Page }                                          from "@/components/forLayout/Page";
import { Toggable, ToggableProps }                       from "@/components/toggable/Toggable";
import { FormFactory, FormFactoryProps }                 from "@/components/formFactory/FormFactory";
import { useFirestore }                                  from "@/hooks/useFirestore";
import { showToast }                                     from "@/modulesTypes";
import { categoriesFormKey }                             from "@/keys/categories/form";
import { childrenToggableButtons, toggableButtons }      from "@/keys/buttons";
import { Table, TableProps }                             from "@/components/table/Table";
import { categoriesColumns }                             from "@/keys/categories/list";

const Categories: FC = (): ReactElement => {
    const cancelButton = useRef<HTMLButtonElement>();
    const form = useForm();
    const { createDocument, getAll } = useFirestore("categories");
    const [categories, setCategories] = useState<any[]>([]);

    const reloadCategories = () => {
        getAll().then(setCategories);
    };

    useEffect(reloadCategories, []);

    const onSubmit = async (data: any) => {
        createDocument(data).then(afterCreate);
    };

    const afterCreate = (result: any) => {
        showToast({
            content: result ? "categoryPage.createSuccess" : "categoryPage.createError",
        });
        if (!result) return;
        cancelButton?.current?.click();
        form.reset();
        reloadCategories();
    };
    const childrenButtons = { ...childrenToggableButtons };
    childrenButtons.buttons[0].ref = cancelButton;
    const toggableProps: ToggableProps = {
        buttons: toggableButtons, childrenButtons,
    };

    const formProps: FormFactoryProps = {
        form, cols: 12, inputs: categoriesFormKey,
    };
    const tableProps: TableProps = {
        cols: categoriesColumns,
        rows: categories,
        actions: (row) => <></>,
    };

    return (
        <Page>
            <Title>{"categoryPage.title"}</Title>
            <form method="#" action="#" onSubmit={form.handleSubmit(onSubmit)} className={"m-4"}>
                <Toggable {...toggableProps} >
                    <FormFactory {...formProps}/>
                </Toggable>
            </form>
            <Table {...tableProps}/>
        </Page>
    );
};
export default Categories;