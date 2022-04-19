import React, { FC } from "react";
import { useIntl } from "react-intl";
import AppsContainer from "@zhava/core/AppsContainer";
import SideBarContent from "./ContactSideBar";
import ContatctsList from "./ContactDataGrid";
import { AppInfoView, AppLoader } from "@zhava/index";
import { useMutation, useQuery, useRouter } from "blitz";
import getClients, { GetClientsQuery } from "./backend/queries/getClients";
import addClient from "./backend/mutations/addClient";
import updateClient from "./backend/mutations/updateClient";
import { useDispatch } from "react-redux";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "app/redux/actions";
import { GeneralErrors } from "shared/constants/ErrorsEnums";
// import getPaginatedClients from "./backend/queries/getPaginatedClients";
import { mapStatusOfContact, createWhereQuery } from "./backend/helpers";



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
  });

  const [addContact] = useMutation(addClient);
  const [updateContact] = useMutation(updateClient);

  const dispatch = useDispatch();

  if (isLoading && !isFetching) {
    dispatch(fetchStart());
  }

  if (!isLoading) {
    dispatch(fetchSuccess())
  }

  if (error) {
    dispatch(fetchError(GeneralErrors.UNEXPECTED));
  }

  const addClientHandler = async (data: any) => {
    const addedResult = await addContact(data);
    dispatch(showMessage('کاربر جدید با موفقیت اضافه شد'));
    await refetch();
  }

  const updateClientHandler = async (data: any) => {
    const updatedCotact = await updateContact({ id: data.id, AddClient: data.addClient });
    await refetch();
    dispatch(showMessage('اطلاعات کاربر با موفقیت ویرایش شد'));
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
    <AppsContainer
      title={messages["contactApp.contact"]}
      fullView={false}
      sidebarContent={<SideBarContent onUpdateContact={handleAddOrUpdateContact} />}
    >
      <ContatctsList
        clients={clients}
        deleteHandle={handleDelete}
        handleAddOrUpdateContact={handleAddOrUpdateContact}
      />
    </AppsContainer>
    <AppInfoView />
  </>
  );
};

export default Contact;
