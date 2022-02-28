import { Dispatch, FC,  SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export type Styles = "none" | "primary" | "secondary" | "danger"
export type ButtonType = "button" | "submit" | "reset"
export type StylesKey = {
    [key in Styles]: string;
};
export type Button = {
    style: Styles
    type: ButtonType;
    label: string;
    onClick: Function;
}
export type ButtonFactoryProps = {
    cols:number,
    buttons: Button[],
    set?: Dispatch<SetStateAction<any>>,
}
export const ButtonFactory: FC<ButtonFactoryProps> = (
    {
        cols,
        buttons,
        set
    }) => {
    const [t] = useTranslation("global");
    const styles: StylesKey = {
        "none": "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300",
        "primary": "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300",
        "secondary": "bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300",
        "danger": "bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300",
    }
    const click = (does:Function) => set ? set(does()) : does()
    return (
        <div className={`grid grid-cols-${cols} gap-4`}>
            {buttons.map(({style,type,label,onClick}: Button) => (
                <button className={`button-style ${styles[style]}`} onClick={click(onClick)} type={type}>{t(label)}</button>
                ),
            )}
        </div>
    );
};