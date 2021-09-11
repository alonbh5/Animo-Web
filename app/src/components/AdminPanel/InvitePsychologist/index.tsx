/* eslint-disable max-len */
import { useState } from 'react';
import emailjs, { init } from 'emailjs-com';
import { templateId, serviceId, userID, animoMail } from '../../api/configuration/config';
import { useAlert } from 'react-alert';
import './invitePsychologist.css';
import PageLayout from '../../../shared/UIElements/PageLayout';
init(userID);

const initialState = {
  name: '',
  email: '',
  message: 'Dear {{name}}, \n' +
  'Animo is a unique platform an enables users from all around the world to easily detected and analyze their emotional state, and offer practical ways to improve.\n' +
  'We got some warm recommendations about you and we would like you the join our platform.\n' +
  'As a psychologist, we offer you some new cool features:\n' +
  '- upload tips and articles and share your knowledge\n' +
  '- Get new patients by the SOS system\n' +
  '- Chat with more psychologists\n' +
  'And more\n' +
  'Please visit us, we are welcome you to be part of ANIMO!\n\n' +
  `${process.env.REACT_APP_FRONTEND_URL}/signup\n\n` +
  'Regards\n' +
  'Animo Team'
};

const InvitePsychologist = (props: any) => {
  const alert = useAlert();

  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const params = {
      subject: `${name}, Come to be our psychologist!`,
      from_name: 'Animo',
      reply_to: animoMail,
      message: message,
      send_to: email
    };
    try {
      await emailjs.send(serviceId, templateId, params);
      alert.success('Sent Your Email :)');
      setState(initialState);
    } catch (err) {
      alert.error('Error, please try later');
    }
  };

  return (
    <PageLayout classname='invite' title='Invite Psychologist'>
      <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
      </p>
      <form name='sentMessage' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                className='form-control'
                placeholder='Name'
                required
                onChange={handleChange}
              />
              <p className='help-block text-danger'></p>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                className='form-control'
                placeholder='Email'
                required
                onChange={handleChange}
              />
              <p className='help-block text-danger'></p>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <textarea
            style={{ height: '300px' }}
            name='message'
            id='message'
            className='form-control'
            value={message}
            placeholder='Message'
            required
            onChange={handleChange}
          ></textarea>
          <p className='help-block text-danger'></p>
        </div>
        <div id='success'></div>
        <button type='submit' className='btn btn-custom btn-lg'>
                  Send Invitation
        </button>
      </form>
    </PageLayout>
  );
};
export default InvitePsychologist;
