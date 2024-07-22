import React, { useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CAlert,
  CFormInput,
  CFormLabel,
  CInputGroup
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
  otp: yup.string().length(6, 'OTP number should be 6 digits').required('Please enter your OTP'),
});

const ForgotVerificationScreen = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/verify-otp', data);
      setMessage(response.data.message);
      reset();
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await axios.post('/resend-otp', { phoneNumber: 'yourPhoneNumber' });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <h3>Verification Code</h3>
          </CCardHeader>
          <CCardBody>
            <p>A text with a 6-digit verification code was just sent to your phone number</p>
            {message && <CAlert color="info">{message}</CAlert>}
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CInputGroup>
                <CFormLabel htmlFor="otp">OTP Number</CFormLabel>
                <CFormInput
                  id="otp"
                  name="otp"
                  type="text"
                  innerRef={register}
                  invalid={errors.otp ? true : false}
                />
                {errors.otp && <CAlert color="danger">{errors.otp.message}</CAlert>}
              </CInputGroup>
              <CButton type="submit" color="primary" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </CButton>
            </CForm>
            <CButton color="link" onClick={resendOTP}>Resend</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ForgotVerificationScreen;
