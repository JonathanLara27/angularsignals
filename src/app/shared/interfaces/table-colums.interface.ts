export interface TableColumn {
    columnDef: string;
    header: string;
    cell: (element: any) => string;
    class?: (element:any) => string;
}