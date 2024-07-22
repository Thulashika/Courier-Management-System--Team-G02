import React from 'react';
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
  CFormLabel,
  CInputGroup,
  CFormInput,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
  phoneNumber: yup.string().length(10, 'Phone number should be 10 characters').required('Please enter your registered phone number'),
});

const ForgotPhoneScreen = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/get-otp', data);
      alert(response.data.message);
      reset();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <h3>Forgot Password</h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CInputGroup>
                <CFormLabel htmlFor="phoneNumber">Enter Phone Number</CFormLabel>
                <CFormInput
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  innerRef={register}
                  invalid={errors.phoneNumber ? true : false}
                />
                {errors.phoneNumber && <CAlert color="danger">{errors.phoneNumber.message}</CAlert>}
              </CInputGroup>
              <CButton type="submit" color="primary">Get OTP</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ForgotPhoneScreen;
