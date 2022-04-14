import React, { FC } from 'react';
import { Formik } from 'formik';
import AddContactForm from './AddContactForm';
import AppDialog from '@zhava/core/AppDialog';
import { ContactObj } from '../types';
import { AddClient } from 'app/clients/backend/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { fetchError, fetchStart, showMessage } from 'app/redux/actions';
import { useDispatch } from 'react-redux';
interface CreateContactProps {
  isAddContact: boolean;
  handleAddContactClose: () => void;
  selectContact?: ContactObj | null;
  onUpdateContact?: (opration: 'add' | 'update', data: any) => Promise<void>;
}

const CreateContact: FC<CreateContactProps> = ({
  isAddContact,
  handleAddContactClose,
  selectContact,
  onUpdateContact,
}) => {
  const dispatch = useDispatch();

  return (
    <AppDialog
      maxWidth="md"
      open={isAddContact}
      onClose={() => handleAddContactClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectContact ? selectContact.name : '',
          email: selectContact ? selectContact.email === '' ? undefined : selectContact.email : undefined,
          contact: selectContact ? selectContact.contact : '',
          address:
            selectContact && selectContact.address ? selectContact.address : '',
          notes:
            selectContact && selectContact.notes ? selectContact.notes : '',
          nationalCode: selectContact && selectContact.nationalCode ? selectContact.nationalCode : '',
          parentId: selectContact && selectContact.parentId ? selectContact.parentId : null,
          packageId: selectContact && selectContact.packageId ? selectContact.packageId : null,
        }}
        validationSchema={toFormikValidationSchema(AddClient)}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            dispatch(fetchStart());
            const opration = selectContact !== undefined ? 'update' : 'add';
            if (onUpdateContact) {
              if (opration === 'add') {
                await onUpdateContact(opration, data);
                dispatch(showMessage("مراجع با موفقیت ثبت شد"))
                resetForm();
              } else {
                if (selectContact?.id) {
                  await onUpdateContact(opration, { id: selectContact?.id, addClient: data });
                  dispatch(showMessage("مراجع با موفقیت ویرایش شد"))
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
        {({ values, setFieldValue }) => (
          <AddContactForm
            handleAddContactClose={handleAddContactClose}
            values={values}
            setFieldValue={setFieldValue}
            selectContact={selectContact} />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateContact;
