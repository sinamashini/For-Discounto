import React, { FC, Suspense } from "react";
import { useIntl } from "react-intl";
import AppsContainer from "@zhava/core/AppsContainer";
import SideBarContent from "./ContactSideBar";
import ContatctsList from "./ContactDataGrid";
import { AppInfoView } from "@zhava/index";
import { Head, useMutation, useQuery, useRouter } from "blitz";
import getClients, { GetClientsQuery } from "./backend/queries/getClients";
import addClient from "./backend/mutations/addClient";
import updateClient from "./backend/mutations/updateClient";
import { useDispatch } from "react-redux";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "app/redux/actions";
import { GeneralErrors } from "shared/constants/ErrorsEnums";
import { mapStatusOfContact, createWhereQuery } from "./backend/helpers";
import { makeHeader } from "@zhava/utility/helper/Utils";
import AppLoaderTransparent from "@zhava/core/AppLoaderHandler/AppLoaderTransparent";



const createSearchQueryForClient = (keyword: string): GetClientsQuery => {
    return {
        where: {
            isActive: true,
            OR: [
                { nationalCode: { contains: keyword } },
                { name: { contains: keyword } },
                { contact: { contains: keyword } },
            ]
        }
    }
}

const Contact: FC = () => {
    const { messages } = useIntl();
    const { query } = useRouter();

    const { status = "all", keyword = "" } = query;

    const mapedStatus = mapStatusOfContact(status as string);

    const conditions = createWhereQuery(mapedStatus);

    const where = createSearchQueryForClient(keyword as string)

    const [clients, { isLoading, error, setQueryData, refetch, isFetching }] = useQuery(getClients, {
        where: {
            where: {
                ...where.where,
                ...conditions
            }
        }
    }, { suspense: false });


    const [addContact, { isLoading: addClientLoading }] = useMutation(addClient);
    const [updateContact, { isLoading: updateClientLoading }] = useMutation(updateClient, {
        onSuccess(data, variables, context) {
            dispatch(showMessage('اطلاعات کاربر با موفقیت ویرایش شد'));

        },
        onError() {
            dispatch(fetchError(GeneralErrors.UNEXPECTED));
        },
        useErrorBoundary: true
    });

    const dispatch = useDispatch();

    if (!isLoading) {
        dispatch(fetchSuccess())
    }

    if (error) {
        dispatch(fetchError(GeneralErrors.UNEXPECTED));
    }

    const addClientHandler = async (data: any) => {
        try {
            const addedResult = await addContact(data);
            dispatch(showMessage('کاربر جدید با موفقیت اضافه شد'));
            await refetch();
        } catch (err) {
            dispatch(fetchError(GeneralErrors.UNEXPECTED))
        }
    }

    const updateClientHandler = async (data: any) => {
        try {
            const updatedCotact = await updateContact({ id: data.id, AddClient: data.addClient });
            dispatch(showMessage('اطلاعات کاربر با موفقیت ویرایش شد'));
            await refetch();
        } catch (err) {
            dispatch(fetchError(GeneralErrors.UNEXPECTED))
        }
    }

    const handleAddOrUpdateContact = async (opration: 'add' | 'update', data: any) => {
        const oprationHnadler = { add: addClientHandler, update: updateClientHandler };
        oprationHnadler[opration](data);
    }

    const handleDelete = async (id: number) => {
        await setQueryData((data) => {
            if (data) {
                return data.filter(item => item.id !== id)
            }
            return [];
        });
    }

    return (<>
        <AppLoaderTransparent isLoading={addClientLoading || updateClientLoading} />
        <Head>
            <title> {makeHeader('مراجعین')} </title>
        </Head>
        <AppsContainer
            title={messages["contactApp.contact"]}
            fullView={false}
            sidebarContent={<SideBarContent onUpdateContact={handleAddOrUpdateContact} />}
        >
            <ContatctsList
                isClientLoading={isLoading}
                clients={clients}
                deleteHandle={handleDelete}
                handleAddOrUpdateContact={handleAddOrUpdateContact}
            />
            <AppInfoView />
        </AppsContainer>
    </>
    );
};

export default Contact;
