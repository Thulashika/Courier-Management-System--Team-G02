import React, { useContext, useState } from 'react'
import { 
  CCard, 
  CCol, 
  CRow, 
  CButton, 
  CFormLabel, 
  CFormInput,
  CImage,
  CContainer,
  CCarousel,
  CCarouselItem,
  CCardImageOverlay,
} from '@coreui/react'
import axios from 'axios';
import { PARCEL_ERRORS } from '../../const';
import { AuthContext } from '../pages/register/AuthProvider';
import NFRN from '../../assets/images/NoData.png'
import background1 from '../../assets/images/tra1.jpg'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import trackImage from '../../assets/images/delivery-track.gif'

const Track = () => {

  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(null);

  const { userDetails } = useContext(AuthContext);
  console.log(userDetails)

  const statusMap = {
    ACCEPTED: 0,
    Processed_and_Ready_to_Ship: 1,
    SHIPPING: 2,
    DELIVERED: 3,
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('');
    setIsValid(true);

    const BCregex = /^(?:P)?[0-9]{4}$/;

    // for (const item of parcel.parcelDetails) {
    if (trackingNumber.trim() === '') {
      setError(PARCEL_ERRORS.NUMBER_VALIDATION)
      setIsValid(false);
      return;
    }

    if (trackingNumber.length !== 5) {
      console.log('Error: Tracking number length is not 5');
      setError(PARCEL_ERRORS.NUMBER_LENGTH_VALIDATION);
      setIsValid(false);
      return;
    }

    if (!BCregex.test(trackingNumber)) {
      console.log('Error: Tracking number format is invalid');
      setError(PARCEL_ERRORS.NUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }
    
    if (isValid) {
      axios
        .get(`http://localhost:6431/track_parcels/${trackingNumber}`)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setParcel(res.data);
            setError('');
            console.log(statusMap.label)
            console.log(res.data.status.status)
            setCurrentStep(statusMap[res.data.status.status] ?? null)
          } else {
            <CImage rounded style={{ background: 'transparent', backgroundColor: 'red' }} src={NFRN} width={200} height={200} align="center"/>
            alert('Not found parcel');
          }
        })
        .catch((err) => {
          if (err.response?.data?.statusCode === 500) {
            setError('Parcel not found');
            setParcel(null);
            return
          }
          setError(<CImage rounded style={{ background: 'transparent'}} src={NFRN} width={200} height={200} align="center"/>)
          // alert('Not found');
        });
    }
  };

  // const getStatus = (status) => {
  //   switch (status) {
  //     case 'COLLECTED':
  //       return 'primary'
  //     case 'ACCEPTED':
  //       return 'info'
  //     case 'SHIPPED':
  //       return 'secondary'
  //     case 'IN-TRANSIT':
  //       return 'warning'
  //     case 'DELIVERED':
  //       return 'success' 
  //     default:
  //       return 'danger'
  //   }
  // } 

  const steps = [
    "Accepted", "Processed_and_Ready_to_Ship", "Shipping", "Delivered"
  ];

  return (
    <CContainer className='mb-4'>
      {/* <CCarousel>
        <CCarouselItem> */}
          <CCard className='justify-content-center'>
            {/* <CImage className="d-block w-100" src={background1} alt="slide 1" />
            <CCardImageOverlay>  */}
                <CRow className="mb-3">
                  <CCol xs={12}>
                      <h2 className="text-dark"><strong>Track</strong></h2> 
                    <CRow className="mb-3"/>
                    <CRow className="mb-3 text-center">
                      <CFormLabel 
                        htmlFor="inputTrackingNumber" 
                        className="col-sm-4 col-form-label"
                        style={{ backgroundColor: 'transparent', fontSize: '1.3rem' }}
                      >
                        Enter Tracking Number
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          sx={{
                            backgroundColor: 'transparent',
                            color: 'black', 
                            fontSize: '1.2rem',
                          }}
                          type="text"
                          id="inputTrackingNumber"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <CButton color='primary' variant='outline' onClick={handleSearch} style={{fontSize: '1.2rem', padding: '10px 10px'}}>
                          <CImage src={trackImage} height={25} width={25}/>
                          Search
                        </CButton>
                      </CCol>
                    </CRow>
                    {error && (
                      <CRow className="mb-3 text-center">
                        <h5 style={{ color: 'red' }}>{error}</h5>
                      </CRow>
                    )}

                    {/* {parcel && 
                      <CRow className="mb-3 text-center">
                        <h4><span className={`badge bg-${getStatus(parcel.status.status)}`}> Status: {parcel.status.status} </span></h4>
                      </CRow>
                    } */}

                    <CRow className="mb-5"/>

                    <div
                      style={{
                        // backgroundColor: 'rgba(10, 0, 0, 0.5)',
                        padding: '20px',
                        borderRadius: '10px',
                      }}
                    >
                      <Stepper
                        activeStep={currentStep}
                        alternativeLabel
                        sx={{
                          '& .MuiStepLabel-label': { fontSize: '1.3rem', color: '#bcbcbc' }, // Default text color
                          '& .MuiSvgIcon-root': { fontSize: '2.5rem', color: '#bcbcbc' }, // Default icon color
                          '& .Mui-completed .MuiStepLabel-label': { color: 'green' }, // Completed step text color
                          '& .Mui-completed .MuiStepIcon-root': { color: 'green' }, // Completed step icon color
                          '& .Mui-active .MuiStepLabel-label': { color: 'black' }, // Active step text color
                          '& .Mui-active .MuiStepIcon-root': { color: 'black' }, // Active step icon color
                        }}
                      >
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </div>
                  </CCol>
                </CRow>
            {/* </CCardImageOverlay> */}
          </CCard>
        {/* </CCarouselItem>
      </CCarousel> */}
    </CContainer>
  )
}

export default Track
