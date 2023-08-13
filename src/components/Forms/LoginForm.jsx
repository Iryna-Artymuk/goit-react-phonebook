// import AuthForm from 'components/Forms/AuthForm';
// import Layout from 'components/Layout/Layout';
import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { StyledField, StyledForm, StyledLable } from './StyledForm';

import { loginUser } from 'redux/operations';
import Button from 'components/Button/Button';

export default function LoginForm() {
  const dispatch = useDispatch();
  // const modalActive = useSelector(getModalStatus);

  const ContactValidationSchema = Yup.object().shape({});

  const handleSubmit = value => {
    console.log('submit');

    dispatch(
      loginUser({
        email: value.email,
        password: value.password,
      })
    );
  };
  return (
    <Formik
      initialValues={{
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
      <StyledForm>
        <StyledLable htmlFor="email">
          Email
          <StyledField
            type="email"
            name="email"
            placeholder="Enter email"
            autoFocus
          />
        </StyledLable>
        <ErrorMessage name="email" component="div" />

        <StyledLable htmlFor="password">
          Password
          <StyledField
            // className={css.input}
            type="password"
            name="password"
            placeholder="Type password "
          />
        </StyledLable>
        <ErrorMessage
          //   className={css.error}
          name="password"
          component="div"
        />

        <Button type="submit">Login</Button>
      </StyledForm>
    </Formik>
  );
}
