import { Dispatch, FC, MutableRefObject, SetStateAction } from "react";
import { colSpan, gridCols }                              from "@/style/grid";

export type Styles = "none" | "primary" | "secondary" | "danger"
export type ButtonType = "button" | "submit" | "reset"
export type StylesKey = {
    [key in Styles]: string;
};
export type Number12 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Button = {
    ref?: MutableRefObject<any>;
    style: Styles;
    type: ButtonType;
    label: string;
    onClick?: () => any;
    size: Number12;
}
export type ButtonFactoryProps = {
    cols: Number12,
    buttons: Button[],
    set?: Dispatch<SetStateAction<any>>,
}
export const ButtonFactory: FC<ButtonFactoryProps> = (
    {
        cols,
        buttons,
        set,
    }) => {
    const styles: StylesKey = {
        "none": "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300",
        "primary": "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300",
        "secondary": "bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300",
        "danger": "bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300",
    };
    const click = (does: Function | undefined) => (): Function => does && set ? set(does()) : does && does();
    return (
        <div className={`grid ${gridCols[cols]} gap-4`}>
            {buttons.map(({ style, type, label, onClick, size, ref }: Button) => (
                    <button ref={ref} key={`${type}${label}`} className={`button-style ${colSpan[size]} ${styles[style]}`}
                        onClick={click(onClick)} type={type}>{label}</button>
                ),
            )}
        </div>
    );
};