import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';

import { StyledField, StyledForm, StyledLable } from './StyledForm';

import Button from '../Button/Button';
import { registerUser } from 'redux/operations';

// import { useSelector } from 'react-redux';
export default function RegisterForm() {
  const dispatch = useDispatch();
  // const modalActive = useSelector(getModalStatus);

  const ContactValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is  required'),
    email:Yup.string().email().required('Email is  required'),
    password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

  const handleSubmit = value => {
    console.log('submit');

    dispatch(
      registerUser({
        name: value.name,
        email: value.email,
        password: value.password,
      })
    );
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      // по сабміту форми буде відправлятись action
      // в payload якого буде новий обєкт контакту
      // contactsReducer буде обробляти цей action і додавати новий контакт в список сонтаків
      onSubmit={(value, action) => {
        handleSubmit(value);

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

        <StyledLable htmlFor="email">
          Email
          <StyledField
            // className={css.input}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </StyledLable>
        <ErrorMessage
          //   className={css.error}
          name="email"
          component="div"
        />

        <StyledLable htmlFor="password">
          Password
          <StyledField
            // className={css.input}
            type="password"
            name="password"
            placeholder="Create password "
          />
        </StyledLable>
        <ErrorMessage
          //   className={css.error}
          name="password"
          component="div"
        />
        <Button type="submit">Register</Button>
      </StyledForm>
    </Formik>
  );
}
