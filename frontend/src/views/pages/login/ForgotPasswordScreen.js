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
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CFormInput,
  CFormLabel,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
  password: yup.string().min(8, 'Password should contain at least 8 characters').required('Please enter your new password'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Please confirm your new password'),
});

const ForgotPasswordScreen = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/reset-password', data);
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
            <h3>Reset Password</h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CInputGroup>
                <CFormLabel htmlFor="password">New Password</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    innerRef={register}
                    invalid={errors.password ? true : false}
                  />
                  {/* <CInputGroupAppend> */}
                    <CInputGroupText onClick={() => setPasswordVisible(!passwordVisible)}>
                      <i className={passwordVisible ? 'cil-lock-locked' : 'cil-lock-unlocked'} />
                    </CInputGroupText>
                  {/* </CInputGroupAppend> */}
                </CInputGroup>
                {errors.password && <CAlert color="danger">{errors.password.message}</CAlert>}
              </CInputGroup>
              <CInputGroup>
                <CFormLabel htmlFor="confirmPassword">Confirm New Password</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    innerRef={register}
                    invalid={errors.confirmPassword ? true : false}
                  />
                  {/* <CInputGroupAppend> */}
                    <CInputGroupText onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                      <i className={confirmPasswordVisible ? 'cil-lock-locked' : 'cil-lock-unlocked'} />
                    </CInputGroupText>
                  {/* </CInputGroupAppend> */}
                </CInputGroup>
                {errors.confirmPassword && <CAlert color="danger">{errors.confirmPassword.message}</CAlert>}
              </CInputGroup>
              <CButton type="submit" color="primary">Change Password</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ForgotPasswordScreen;
