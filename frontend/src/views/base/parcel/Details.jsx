import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CContainer, CFormCheck, CFormInput, CFormLabel, CImage, CRow  } from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { PARCEL_ERRORS } from '../../../const';
import { AuthContext } from '../../pages/register/AuthProvider';
import NFRN from '../../../assets/images/NF1.avif'
import { useLocation, useParams } from 'react-router-dom';

function useQuery() {
  const {search} = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const Details = () => {

  const query = useQuery()

  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcel, setParcel] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  // const { userDetails } = useContext(AuthContext);
  // console.log(userDetails)

  useEffect(() => {
    axios(`http://localhost:6431/QRCode/${query.get('id')}`, {
      method:'GET'
    }).then(res => {
      console.log(res.data)
      setParcel(res.data)
    }).catch((error) => {
      console.error('Error fetching parcel:', error);
    })
  },[])

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('');
    setIsValid(true);

    const BCregex = /^(?:P)?[0-9]{4}$/;

    
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
        });
    }
  };
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="p-4">
            <CCardTitle>
              <h3><strong>Parcel Details</strong></h3>
            </CCardTitle>
            <CCardBody>
              <CCardText>
                <CRow>
                Recipient : <br/>
                    FullName:<br/>
                    Address:<br/>
                    Telphone Number:
                </CRow>
                {/* <CRow>
                  <>parcel & parcel.map((data, index) => ()
                    {`${data.recipientDetails ? JSON.parse(data.recipientDetails).firstName : ''} ${data.recipientDetails ? JSON.parse(data.recipientDetails).lastName : ''}`}
                  ))</>
                </CRow> */}

                <CRow>
                  {parcel && Array.isArray(parcel) && parcel.map((data, index) => {
                    const recipientDetails = data.recipientDetails ? JSON.parse(data.recipientDetails) : {};
                    const { firstName, lastName } = recipientDetails;
                    return (
                      <CCol key={index}>
                        {`${firstName || ''} ${lastName || ''}`}
                      </CCol>
                    );
                  })}
                </CRow>

                <br/>
                
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

                      {parcel && 
                        <CRow className="mb-3 text-center">
                          <p>Status: {parcel.status.status}  </p>
                        </CRow>
                      }
                    </CCol>
                  </CRow>
                </CCard>

                <br/>

                <CRow>
                  <CFormCheck id="accepted" label="Accepted"/>
                  <CFormCheck id="collected" label="Collected"/>
                  <CFormCheck id="shipped" label="Shipped"/>
                  <CFormCheck id="in-transitted" label="In-Transitted"/>
                  <CFormCheck id="delivered" label="Delivered"/>
                </CRow>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    </div>
  )
}

export default Details