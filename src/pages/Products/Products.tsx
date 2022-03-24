import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useForm }                                       from "react-hook-form";
import { Title }                                         from "@/components/forLayout/Title";
import { Page }                                          from "@/components/forLayout/Page";
import { Toggable, ToggableProps }                       from "@/components/toggable/Toggable";
import { FormFactory, FormFactoryProps }                 from "@/components/formFactory/FormFactory";
import { childrenToggableButtons, toggableButtons }      from "@/keys/buttons";
import { categoryInput, productsFormKeys }               from "@/keys/products/form";
import { useFirestore }                                  from "@/hooks/useFirestore";
import { showToast }                                     from "@/modulesTypes";
import { Column, Table, TableProps }                     from "@/components/table/Table";
import { Link, Outlet, useLocation, useNavigate }        from "react-router-dom";
import { FormKey }                                       from "@/types/forms";
import { productsColumns }                               from "@/keys/products/list";

const Products: FC = (): ReactElement => {
    const form = useForm();
    const filterForm = useForm();
    const cancelButton = useRef<HTMLButtonElement>();
    const [categories, setCategories] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);
    const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const { getAll: getAllCategories } = useFirestore("categories");
    const { createDocument, getAll, getById, deleteDocument, updateDocument } = useFirestore("productos");

    const getResources = () => {
        getAllCategories().then(setCategories);
        getAll().then((result) => {
            setProducts(result);
            setFilteredProducts(result);
        });
    };

    useEffect(getResources, []);
    useEffect(getResources, [useLocation()]);

    const mountSelect = () => {
        setCategoriesOptions(categories.map(({ id, name }: any) => ({ value: id, text: name })));
    };
    useEffect(mountSelect, [categories]);

    const formProps: FormFactoryProps = {
        form, cols: 12, inputs: [...productsFormKeys, { ...categoryInput, options: categoriesOptions }],
    };
    const onSubmit = async (data: any) => {
        createDocument(data).then(afterCreate);
    };
    useEffect(() => {
        if (filter != "") {
            setFilteredProducts(products.filter(({ name }) => name.includes(filter)));
        }
    }, [filter]);


    const afterCreate = (result: any) => {
        showToast({
            content: result ? "productPage.createSuccess" : "productPage.createError",
        });
        if (!result) return;
        cancelButton?.current?.click();
        form.reset();
        getResources();
    };
    const childrenButtons = { ...childrenToggableButtons };
    childrenButtons.buttons[0].ref = cancelButton;
    const toggableProps: ToggableProps = {
        buttons: toggableButtons, childrenButtons,
    };

    const filterInput: FormKey = {
        type: "text",
        size: 4,
        label: "Filtro por nombre",
        register: {
            name: "nombre",
        },
    };
    const filtering = (e) => {
        setFilter(e.target.value);
    };
    const inputProps = {
        id: "name",
        type: "text",
        placeholder: "Nombre",
        onChange: filtering,
    };
    const getCategoryName = (id: string): string => categoriesOptions.find((category: any) => category.value === id)?.text;

    // @ts-ignore
    productsColumns.find(({ field }: Column) => field === "category").render = ({ field }: Column, row: Object & { id: string }) => getCategoryName(row[field]);

    const tableProps: TableProps = {
        cols: productsColumns,
        rows: filteredProducts,
        actions: (row) => (
            <div className={"grid grid-cols-2 gap-4"}>
                <Link to={`edit/${row.id}`} state={{ element: row }}>{"general.edit"}</Link>
                <Link to={`delete/${row.id}`} state={{ element: row }}>{"general.delete"}</Link>
            </div>
        ),
    };
    const onClose = () => {
        getResources();
        navigate("/");
    };

    const getInput = (inputName: string): FormKey | undefined => formProps.inputs.find(({ register: { name } }) => name === inputName);

    return (
        <Page>
            <Title>{"productPage.title"}</Title>
            <form method="#" action="#" onSubmit={form.handleSubmit(onSubmit)} className={"m-4"}>
                <Toggable {...toggableProps} >
                    <FormFactory {...formProps}/>
                </Toggable>
            </form>

            {products.length === 0 ?
                <div className={"p-4 text-center"}>No hay elementos que mostrar</div> :
                <Table {...tableProps}/>
            }

            <Outlet context={{
                getById,
                updateDocument,
                formKeys: [getInput("price"), getInput("category")],
                editModal: {
                    header: "productPage.editHeader",
                    success: "productPage.editSuccess",
                    error: "productPage.editError",
                },
                deleteDocument,
                deleteModal: {
                    header: "productPage.deleteHeader",
                    body: "productPage.deleteBody",
                    success: "productPage.deleteSuccess",
                    error: "productPage.deleteError",
                },
                onClose,
            }}/>
            <input  {...inputProps} className={"peer input-text"}/>
        </Page>
    );
};
export default Products;