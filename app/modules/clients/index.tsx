import React from "react";
import { useIntl } from "react-intl";
import AppsContainer from "@zhava/core/AppsContainer";
import SideBarContent from "./ContactSideBar";
import ContatctsList from "./ContactDataGrid";
import { AppInfoView } from "@zhava/index";
import { useQuery, useRouter } from "blitz";
import getClients from "app/clients/queries/getClients";
import getNestedClientById from "app/clients/queries/getNestedClientById";

const Contact = () => {
  const { messages } = useIntl();
  const { query } = useRouter();
  const [clients, { isLoading, error, setQueryData }] = useQuery(getClients, { status: query.status as string });
  const [client, { isLoading: loading }] = useQuery(getNestedClientById, { id: 1 });

  if (!loading) {
    console.log(client);
  }


  const handleDelete = (id: number) => {
    setQueryData((data) => {
      if (data) {
        return data.filter(item => item.id !== id)
      }
      return [];
    });
  }

  const handleAddOrUpdateContact = async (client: typeof clients[0], opration: 'add' | 'update') => {
    setQueryData((data) => {
      if (opration === 'add' ) {
        if (data) {
          return [...[client], ...data];
        }
        return [client];
      } else if(opration === 'update') {
        if (data) {
          const newData = [...data ];
          return newData.map(item => {
            if (item.id === client.id) {
              item = client;
            }
            return item;
          })
        }
      }
      return [client];
    })
  }

  return (
    <AppsContainer
      title={messages["contactApp.contact"]}
      fullView={false}
      sidebarContent={<SideBarContent onUpdateContact={handleAddOrUpdateContact} />}
    >
      <ContatctsList
        clients={clients}
        isLoading={isLoading}
        error={error as string}
        deleteHandle={handleDelete}
        handleAddOrUpdateContact={handleAddOrUpdateContact}
      />
      <AppInfoView />
    </AppsContainer>
  );
};

export default Contact;
