import { FC, ReactElement } from "react";
import { RowFactory }       from "@/components/table/factory/RowFactory";
import { useTranslation }   from "react-i18next";

export type Column = {
    field: string,
    type?: string,
    render?: (col: Column, row: Object & { id: string }) => string | ReactElement,
    header: string,
}
export type TableProps = {
    cols: Array<Column>,
    rows: Array<Object & { id: string }>,
    actions: (row: any) => ReactElement
}
export const Table: FC<TableProps> = ({ cols, rows, actions }): ReactElement => {
    const [t] = useTranslation("global");
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto w-screen">
                <div className="py-2 px-4 align-middle inline-block min-w-screen">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                                {cols && cols.map(({ field, header }) => <th key={field} id={field} scope="col"
                                    className="table-th">{t(header)}</th>)}

                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {rows.length === 0 &&
                                <div className={"p-4 text-center"}>No hay elementos que mostrar</div>}
                            {rows.map((row) => <RowFactory key={row.id} actions={actions} cols={cols} row={row}/>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
