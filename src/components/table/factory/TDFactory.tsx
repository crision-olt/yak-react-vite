import { FC }     from "react";
import { Column } from "@/components/table/Table";

export type TDFactoryProps = {
    col: Column,
    row: any
}

export const TDFactory: FC<TDFactoryProps> = ({ col, row }) => {

    const getResult = () => col.render ? col.render(col, row) : row[col.field];

    return <td className="px-6 py-4 whitespace-nowrap">{getResult()}</td>;
};