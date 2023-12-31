import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';

import { StyledField, StyledForm, StyledLable } from './StyledForm';

import { addContact } from '../../redux/operations';
import Button from '../Button/Button';
// import { useSelector } from 'react-redux';
export default function AddContactForm({ toggleModal, deActivateAddForm }) {
  const dispatch = useDispatch();
  // const modalActive = useSelector(getModalStatus);
  const phoneRegExp =
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

  const ContactValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is  required'),

    number: Yup.string()
      .required('Phone is  required')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const handleSubmit = value => {
    console.log(value);

    dispatch(addContact(value));
    toggleModal();
  };
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      // по сабміту форми буде відправлятись action
      // в payload якого буде новий обєкт контакту
      // contactsReducer буде обробляти цей action і додавати новий контакт в список сонтаків
      onSubmit={(value, action) => {
        handleSubmit(value);
        deActivateAddForm();
        action.resetForm();
      }}
      validationSchema={ContactValidationSchema}
    >
      <StyledForm
      //   className={css.form}
      >
        <StyledLable>
          Name
          <StyledField
            // className={css.input}
            type="text"
            name="name"
            placeholder="Enter name"
            autoFocus
          />
        </StyledLable>
        <ErrorMessage
          // className={css.error}
          name="name"
          component="div"
        />
        <StyledLable htmlFor="number">
          Phone number
          <StyledField
            // className={css.input}
            type="tel"
            name="number"
            placeholder="Enter phone number"
          />
        </StyledLable>
        <ErrorMessage
          //   className={css.error}
          name="number"
          component="div"
        />
        <Button type="submit">Add contact</Button>
      </StyledForm>
    </Formik>
  );
}
