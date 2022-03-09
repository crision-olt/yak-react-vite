import { FC, useState }                      from "react";
import { ButtonFactory, ButtonFactoryProps } from "@/components/buttonFactory/ButtonFactory";

export type ToggableProps = {
    buttons: ButtonFactoryProps,
    childrenButtons: ButtonFactoryProps,
}
export const Toggable: FC<ToggableProps> = (
    {
        buttons,
        childrenButtons,
        children,
    }) => {
    const [visible, setVisible] = useState(false);
    buttons.set = setVisible;
    childrenButtons.set = setVisible;
    const hideIt = (val: boolean) => ({ display: val ? "none" : "" });
    return (
        <div>
            <div style={hideIt(visible)}>
                <ButtonFactory {...buttons}/>
            </div>
            <div style={hideIt(!visible)} className={""}>
                <ButtonFactory {...childrenButtons}/>
                <div className={"mt-4"}>
                    {children}
                </div>
            </div>

        </div>
    );
};
