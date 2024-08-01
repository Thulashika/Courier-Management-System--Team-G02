import React, { useContext, useEffect, useState } from 'react'
import { 
  CCard, 
  CCol,
  CCardHeader, 
  CRow, 
  CButton, 
  CFormLabel, 
  CFormInput,
  CImage,
  CContainer,
  CCarousel,
  CCarouselItem,
  CCardImageOverlay
} from '@coreui/react'
import axios from 'axios';
import { PARCEL_ERRORS } from '../../const';
import { useSelector } from 'react-redux';
import { AuthContext } from '../pages/register/AuthProvider';
import NFRN from '../../assets/images/NF1.avif'
import background1 from '../../assets/images/Tr.jpg'
import { useParams } from 'react-router-dom';
import track, { useTracking } from 'react-tracking';

const Track = () => {

  // const { trackingNo } = useParams()
  // const [orderData, setOrderData] = useState([])

  // useEffect(() => {
  //   async function getTrackingDetails() {
  //     try{
  //       const trackingDetails = await axios.post('http://localhost:6431/fedex/track', {trackingNo})
  //       setOrderData(trackingDetails.data.reverse())
  //     }catch (error) {
  //       console.log("Something is wrong", error)
  //     }
  //   }
  //   getTrackingDetails()
  // }, [trackingNo])

  const [trackingNumber, setTrackingNumber] = useState('');
  // const [trackingStatus, setTrackingStatus] = useState([]);
  // const [trackingInfo, setTrackingInfo] = useState(null);
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  // const handleSearchClick = () => {
    

  //   setError('');
    
    // Simulate fetching data
    // const simulatedData = [
    //   { status: 'Item accepted by Courier', date: '2024-07-17 10:00:00' },
    //   { status: 'Collected', date: '2024-07-17 12:00:00' },
    //   { status: 'Shipped', date: '2024-07-17 15:00:00' },
    //   { status: 'In-Transit', date: '2024-07-18 08:00:00' },
    //   { status: 'Delivered', date: '2024-07-18 13:00:00' }
    // ];

    // setTrackingStatus(simulatedData);
  // };

  const { userDetails } = useContext(AuthContext);
  console.log(userDetails)

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('');
    setIsValid(true);

    const BCregex = /^(?:P)?[0-9]{4}$/;

    // Validate parcel details
    // for (const item of parcel.parcelDetails) {
      if (trackingNumber.trim() === '') {
        // setError('Please enter a valid tracking number');
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
    // }

    // try {
    //   const response = await axios.get(`http://localhost:6431/track_parcels/${trackingNumber}`);
    //   console.log('API Response:', response.data); // Add this line
    //   setParcel(response.data);
    //   setError('');
    // } catch (err) {
      // setError('Parcel not found');
      // setParcel(null);
    // }
    
    if (isValid) {
      axios
        .get(`http://localhost:6431/track_parcels/${trackingNumber}`)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setParcel(res.data);
            setError('');
          } else {
            <CImage rounded src={NFRN} width={200} height={200} align="center"/>
            alert('Not found parcel');
          }
        })
        .catch((err) => {
          if (err.response?.data?.statusCode === 500) {
            setError('Parcel not found');
            setParcel(null);
            return
          }
          setError(<CImage rounded src={NFRN} width={200} height={200} align="center"/>)
          // alert('Not found');
        });
    }
  };

  return (
    <CContainer className='mb-4'>
      <CCarousel>
        <CCarouselItem>
          <CCard className='justify-content-center'>
            <CImage className="d-block w-100" src={background1} alt="slide 1" />
            <CCardImageOverlay> 
              <CCard>
                <CRow className="mb-3">
                  <CCol xs={12}>
                    <CCardHeader>
                      <strong>Track</strong>
                    </CCardHeader>
                    <CRow className="mb-3"/>
                    <CRow className="mb-3 text-center">
                      <CFormLabel htmlFor="inputTrackingNumber" className="col-sm-4 col-form-label">Enter Tracking Number</CFormLabel>
                      <CCol sm={4}>
                        <CFormInput 
                          type="text" 
                          id="inputTrackingNumber"
                          value={trackingNumber} 
                          onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <CButton color='primary' onClick={handleSearch}>Search</CButton>
                      </CCol>
                    </CRow>
                    {error && (
                      <CRow className="mb-3 text-center">
                        <p style={{ color: 'red' }}>{error}</p>
                      </CRow>
                    )}

                    {/* {parcel > 0 && parcel.status.map((trackParcel, index) => (
                      <CRow key={index} className="mb-3 text-center">
                        <p>Status: {trackParcel.status}</p>
                      </CRow>
                    ))} */}


                      {parcel && 
                        <CRow className="mb-3 text-center">
                          <p>Status: {parcel.status.status}  </p>
                        </CRow>
                      }
                  </CCol>
                </CRow>
              </CCard>
            </CCardImageOverlay>
          </CCard>
        </CCarouselItem>
      </CCarousel>
    </CContainer>
  )
}

export default Track
