import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function FormikForm() {
  return React.createElement(
    Formik,
    {
      initialValues: { username: '', email: '', password: '' },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => {
        console.log('Submitted:', values);
        resetForm();
      }
    },
    ({ errors, touched }) =>
      React.createElement(
        Form,
        null,
        React.createElement(
          'div',
          null,
          React.createElement('label', null, 'Username:'),
          React.createElement(Field, { name: 'username', type: 'text' }),
          React.createElement(ErrorMessage, { name: 'username', component: 'div', style: { color: 'red' } })
        ),
        React.createElement(
          'div',
          null,
          React.createElement('label', null, 'Email:'),
          React.createElement(Field, { name: 'email', type: 'email' }),
          React.createElement(ErrorMessage, { name: 'email', component: 'div', style: { color: 'red' } })
        ),
        React.createElement(
          'div',
          null,
          React.createElement('label', null, 'Password:'),
          React.createElement(Field, { name: 'password', type: 'password' }),
          React.createElement(ErrorMessage, { name: 'password', component: 'div', style: { color: 'red' } })
        ),
        React.createElement('button', { type: 'submit' }, 'Register')
      )
  );
}

export default FormikForm;
