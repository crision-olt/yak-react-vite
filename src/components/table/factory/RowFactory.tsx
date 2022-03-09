import { FC, ReactElement } from "react";
import { Column }           from "@/components/table/Table";
import { TDFactory }        from "@/components/table/factory/TDFactory";

export type RowFactoryProps = {
    cols: Column[],
    row: Object & { id: string },
    actions: (row: Object & { id: string }) => ReactElement
}
export const RowFactory: FC<RowFactoryProps> = ({ cols, row, actions }) =>
    <tr className="px-6 py-4 whitespace-nowrap">
        <td className="whitespace-nowrap text-center text-sm font-medium">
            {actions(row)}
        </td>
        {cols.map((col) => <TDFactory key={`${col.field}${row.id}`} {...{ col, row }}/>)}
    </tr>;
