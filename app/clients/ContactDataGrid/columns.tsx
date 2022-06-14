import { Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import getClientMap from "app/clientMap/queries/getClientMap";
import { useQuery } from "blitz";
import { FC } from "react";
import ContactTools from "./ContactTools";
interface ColsInput {
    handleAddOrUpdateContact: (opration: 'add' | 'update', data: any) => Promise<void>;
    handleDelete: (id: number) => Promise<void>
}

const contactsColumns = ({ handleAddOrUpdateContact, handleDelete }: ColsInput) => [
    {
        field: 'id',
        headerName: 'ID',
        hide: true,
        width: 200,
    },
    {
        field: 'name',
        headerName: 'نام',
        width: 200,
    },
    {
        field: 'contact',
        headerName: 'تلفن',
        width: 100,
    },
    {
        field: 'nationalCode',
        headerName: 'کد ملی',
        hide: false,
        width: 100,
    },
    {
        field: 'parent',
        headerName: 'معرف',
        width: 120,
        renderCell: (params: GridRenderCellParams) => {
            if (params.row.parent === null) return <Typography variant="body1" sx={{ color: 'orange' }}>ندارد</Typography>
            return <Typography variant="body1" sx={{ color: 'green' }}>{params.row?.parent?.name}</Typography>
        }
    },
    {
        field: 'packageClients',
        headerName: 'پکیج',
        width: 120,
        renderCell: (params: GridRenderCellParams) => {
            const packageName = params.value[0].package.name;
            if (!packageName) return <Typography variant="body1" sx={{ color: 'orange' }}>ندارد</Typography>
            return <Typography variant="body1">{packageName}</Typography>
        }
    },
    {
        field: 'remainDiscountAmount',
        headerName: 'مقدار کل تخفیف قابل استفاده',
        width: 220,
        renderCell: (params: GridRenderCellParams) => <Typography variant="body1" sx={{ color: 'green' }}>{params.value.toLocaleString()} ریال </Typography>
    },
    {
        field: 'tools',
        headerName: 'ابزار',
        filterable: false,
        sortable: false,
        width: 300,
        renderCell: (params: GridRenderCellParams) => <ContactTools
            client={params.row}
            onDelete={handleDelete}
            onUpdate={handleAddOrUpdateContact}
        />
    },
]

export default contactsColumns;
