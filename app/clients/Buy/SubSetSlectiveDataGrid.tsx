import { Typography, Box, Grid } from '@mui/material';
import {
    DataGrid,
    GridRenderCellParams,
    GridRowParams,
    GridSelectionModel,
} from '@mui/x-data-grid';
import { ClientsMap } from '@prisma/client';
import { FC } from 'react';

interface Props {
    clients: ClientsMap[];
    numberOfPeopleIncluded: number;
    selectionModel: GridSelectionModel;
    setSelectionModel: (selectionModel: GridSelectionModel) => void;
    discountFn: (price: number) => void;
    price: number;
    maxPayment: number;
}

const SubSetSlectiveDataGrid: FC<Props> = ({ clients,
    numberOfPeopleIncluded,
    selectionModel,
    setSelectionModel,
    discountFn,
    price,
}) => {
    if (!clients) return null;
    const handleChangeSelectionModel = (params: GridSelectionModel) => {
        if (params.length < numberOfPeopleIncluded + 1) {
            setSelectionModel(params);
            discountFn(price);
        }
    }

    return <Box sx={{ width: '100%' }}>
        <DataGrid
            autoHeight
            rows={clients.map((client: any, index) => ({ name: client.parent.name, ...client, id: client.parentId, eachPersonPoint: price }))}
            columns={columns}
            checkboxSelection
            isRowSelectable={(params: GridRowParams) => params.row.status === 'ACTIVE'}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => handleChangeSelectionModel(newSelectionModel)}
        />
    </Box>
}


const columns = [
    {
        field: 'id',
        headerName: 'شناسه',
        hide: true,
        width: 50,
    },
    {
        field: 'name',
        headerName: 'نام',
        width: 200,
    },
    {
        field: 'level',
        headerName: 'سطح',
        width: 200,
    },
    {
        field: 'percent',
        headerName: 'درصد تخفیف',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            const level = params.row.parent.packageClients[0].package.level.find(item => item.levelNumber === params.row.level);
            return <Typography fontSize={14} fontWeight="bold">{level?.percent}%</Typography>
        }
    },
    {
        field: 'eachPersonPoint',
        headerName: 'تخفیف ',
        width: 200,
        renderCell: (params: GridRenderCellParams) => <FatherClientCell params={params} />,
    },
    {
        field: 'status',
        headerName: 'وضعیت',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return <Typography sx={{ color: (params.value === "ACTIVE") ? 'green' : "red" }}>{(params.value === "ACTIVE") ? "فعال" : "غیر فعال"}</Typography>
        }
    }
]

export default SubSetSlectiveDataGrid;

export const validatePayment = (price, maxPayment) => {
    const isHighrThanMax = price >= maxPayment;
    const result = { true: { price: maxPayment, color: 'red' }, false: { price, color: 'green' } }[isHighrThanMax.toString()];
    return result!;
}

const FatherClientCell: FC<any> = ({ params }) => {
    const level = params.row.parent.packageClients[0].package?.level?.find(item => item.levelNumber === params.row.level);
    const profit = level?.percent * params.row.eachPersonPoint / 100;
    const status = params.row.status;
    if (status === 'ACTIVE') {
        const { price, color } = validatePayment(profit, params.row.parent.packageClients[0].package.maxPayment);
        return <Typography fontSize={14} fontWeight="bold" sx={{ color }}>{price.toLocaleString()} ریال </Typography>
    }
    return <Typography fontSize={13} sx={{ color: 'grey' }}>0 ریال </Typography>
}

