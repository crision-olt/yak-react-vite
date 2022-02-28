import { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FormKey } from "@/types/forms";
import { FormFactory, FormFactoryProps } from "@/components/formFactory/FormFactory";
import { CheckboxInput } from "@/components/formFactory/inputs/CheckboxInput";

const Login: FC = (): ReactElement => {
    const [t] = useTranslation("global");
    const form = useForm();
    const onSubmit = (data: any) => console.log({ data });
    const emailProps: FormKey = {
        type: "text",
        size: 12,
        label: "loginPage.email",
        register: {
            name: "email",
            options: {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "El email no tiene el formato correcto.",
                },
            },

        },
    };
    const passwordProps: FormKey = {
        type: "password",
        size: 12,
        label: "loginPage.password",
        register: {
            name: "password",
            options: {
                required: { value: true, message: "Campo requerido" },
                minLength: {
                    value: 5,
                    message: "5 caracteres minimo",
                },
            },

        },
    };
    const rememberProps: FormKey = {
        type: "checkbox",
        size: 12,
        label: "loginPage.remember",
        register: {
            name: "remember",
        },
    };
    const formFactoryProps: FormFactoryProps = { form, cols: 1, inputs: [emailProps, passwordProps] };

    return (
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
            <div className="relative sm:max-w-sm w-full">
                <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                    <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                        {t("loginPage.login")}
                    </label>
                    <form method="#" action="#" className="mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormFactory {...formFactoryProps}/>

                        <div className="mt-7 flex">
                            <CheckboxInput input={rememberProps} form={form}/>

                            <div className="w-full text-right">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                    ¿Olvidó su contraseña?
                                </a>
                            </div>
                        </div>
                        <div className="mt-7">
                            <button type={"submit"} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                Login
                            </button>
                        </div>

                        <div className="mt-7">
                            <div className="flex justify-center items-center">
                                <label className="mr-2">¿Eres nuevo?</label>
                                <a href="#" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Crea una cuenta
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;