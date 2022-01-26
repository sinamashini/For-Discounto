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
import { fetchError, fetchStart, showMessage } from 'app/redux/actions';
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
  const [addContact] = useMutation(addClient);
  const [updateContact] = useMutation(updateClient);

  return (
    <AppDialog
      maxWidth="md"
      fullHeight
      open={isAddContact}
      onClose={() => handleAddContactClose()}
    >
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
              dispatch(fetchStart());
              const opration = selectContact !== undefined ? 'update' : 'add';
              if (onUpdateContact) {
                if (opration === 'add') {
                  const addedContact = await addContact(data);
                  dispatch(showMessage('کاربر جدید با موفقیت اضافه شد'));
                  onUpdateContact(addedContact, opration);
                  resetForm();
                } else {
                  if (selectContact?.id) {
                    const updatedCotact = await updateContact({ id: selectContact.id, AddClient: data });
                    dispatch(showMessage('اطلاعات کاربر با موفقیت ویرایش شد'));
                    onUpdateContact(updatedCotact, opration);
                  }
                }
              }
              handleAddContactClose()
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
    </AppDialog>
  );
};

export default CreateContact;
