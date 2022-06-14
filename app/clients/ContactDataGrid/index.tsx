import React, { FC, createRef, useState } from 'react';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import { DataGrid, GridFilterPanel, GridToolbar } from '@mui/x-data-grid';
import contactsColumns from './columns';
import { Box } from '@mui/material';
import { GetClientResult } from '../types';
import AppsHeader from '@zhava/core/AppsContainer/AppsHeader';
import { AppSearchBar } from '@zhava/index';
import { useRouter } from 'blitz';
import LoaderSpinner from '@zhava/core/AppLoader/LoaderSpiner';

interface Props {
    clients?: GetClientResult;
    isClientLoading?: boolean;
    deleteHandle: (id: number) => Promise<void>;
    handleAddOrUpdateContact: (opration: 'add' | 'update', data: any) => Promise<void>;
}

const ContatctsList: FC<Props> = ({ clients, deleteHandle, handleAddOrUpdateContact, isClientLoading }) => {
    const contentRef = createRef();
    const [keyword, setKeyword] = useState('');

    const router = useRouter();

    const { status = "all" } = router.query;

    const handleSearch = (filterText: string) => {
        setKeyword(filterText);
        setTimeout(() => router.push({
            pathname: "/clients/[status]", query: {
                status,
                keyword: filterText
            }
        }), 1000);
    }


    return <Box
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
        ref={contentRef}
    >
        <AppsHeader>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "100%", sm: "auto" },
                }}
            >
                <Box sx={{ mr: 5 }}>
                    <AppSearchBar
                        iconPosition="right"
                        overlap={false}
                        value={keyword}
                        sx={{ pointerEvents: isClientLoading ? 'none' : 'auto' }}
                        onChange={(event: any) => handleSearch(event.target.value)}
                        placeholder={"جستجوی کاربر"}
                    />
                </Box>
            </Box>
        </AppsHeader>
        {isClientLoading && <Box sx={{ mt: { xs: 10, md: 30 } }}><LoaderSpinner /></Box>}
        <AppsContent sx={{ pt: 0 }}>
            <Box sx={{ width: '100%', px: 0.5, pb: 5 }}>
                {clients &&
                    <DataGrid
                        sx={{ border: 'unset', width: '100%' }}
                        rows={clients}
                        autoHeight
                        columns={contactsColumns({
                            handleDelete: deleteHandle,
                            handleAddOrUpdateContact
                        })}
                        density="comfortable"
                    />
                }
            </Box>
        </AppsContent>
    </Box>
}

export default ContatctsList;
