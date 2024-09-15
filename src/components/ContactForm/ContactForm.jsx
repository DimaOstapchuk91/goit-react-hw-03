import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import s from './ContactForm.module.css';

const ContactForm = ({ setUserContacts }) => {
  const userId = nanoid();

  const orderSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Must be filled'),
    number: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .min(3, 'Minimum 3 digits')
      .max(50, 'Maximum 50 digits')
      .required('Must be filled'),
  });

  const handleForm = (values, options) => {
    setUserContacts(prev => [
      ...prev,
      { id: userId, name: values.username, number: values.number },
    ]);
    options.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ username: '', number: '' }}
        onSubmit={handleForm}
        validationSchema={orderSchema}
      >
        <Form className={s.contactForm}>
          <label>
            Name
            <Field className={s.formInput} name='username' />
            <ErrorMessage
              className={s.inputErr}
              name='username'
              component='p'
            />
          </label>
          <label>
            Number
            <Field className={s.formInput} name='number' />
            <ErrorMessage className={s.inputErr} name='number' component='p' />
          </label>
          <button className={s.formBtn} type='submit'>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
