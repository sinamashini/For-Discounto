import React, { useState, FC } from 'react';
import {Formik} from 'formik';
import AddContactForm from './AddContactForm';
import AppDialog from '@zhava/core/AppDialog';
import { ContactObj, UpdateContactCache } from '../types';
import { AddClient } from 'app/clients/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMutation } from 'blitz';
import addClient from 'app/clients/mutations/addClient';
import InfoViewGraphql from '@zhava/core/AppInfoView/InfoGraphql';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { fetchError } from 'app/redux/actions';
import { useDispatch } from 'react-redux';
import updateClient from 'app/clients/mutations/updateClient';

interface CreateContactProps {
  isAddContact: boolean;
  handleAddContactClose: () => void;
  selectContact?: ContactObj | null;
  onUpdateContact?: (client: UpdateContactCache, opration: 'add' | 'update') => void;
}

const CreateContact: FC<CreateContactProps> = ({
  isAddContact,
  handleAddContactClose,
  selectContact,
  onUpdateContact,
}) => {
  const dispatch = useDispatch();
  const [addContact, { isLoading: addContactLoading, error }] = useMutation(addClient);
  const [updateContact, { isLoading: updateLoading, error: updateError }] = useMutation(updateClient);
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <AppDialog
      maxWidth="md"
      fullHeight
      open={isAddContact}
      onClose={() => handleAddContactClose()}
    >
      <InfoViewGraphql loading={addContactLoading || updateLoading} error={error as string || updateError as string} message={successMessage} >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectContact ? selectContact.name : '',
          email: selectContact ? selectContact.email : '',
          contact: selectContact ? selectContact.contact : '',
          address:
            selectContact && selectContact.address ? selectContact.address : '',
          notes:
            selectContact && selectContact.notes ? selectContact.notes : '',
          nationalCode: selectContact && selectContact.nationalCode ? selectContact.nationalCode : '',
          parentId: selectContact && selectContact.parentId ? selectContact.parentId : null,
        }}
        validationSchema={toFormikValidationSchema(AddClient)}
          onSubmit={async(data, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              const opration = selectContact !== undefined ? 'update' : 'add';
              if (onUpdateContact) {
                if (opration === 'add') {
                  const addedContact = await addContact(data);
                  setSuccessMessage('کاربر جدید با موفقیت اضافه شد');
                  onUpdateContact(addedContact, opration);
                } else {
                  if (selectContact?.id) {
                    const addedContact = await updateContact({ id: selectContact.id, AddClient: data });
                    setSuccessMessage('اطلاعات کاربر با موفقیت ویرایش شد');
                    onUpdateContact(addedContact, opration);
                  }
                }
              }
              resetForm();
              setSubmitting(false);
            } catch (err) {
              dispatch(fetchError(GeneralErrors.UNEXPECTED))
            }
        }}
      >
        {({values, setFieldValue}) => (
          <AddContactForm handleAddContactClose={handleAddContactClose} values={values}/>
        )}
        </Formik>
        </InfoViewGraphql>
    </AppDialog>
  );
};

export default CreateContact;