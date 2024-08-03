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
                {console.log(parcel)}
                Recipient : <br/>
                    FullName:{`${parcel?.recipientFirstName} ${parcel?.recipientLastName}`}<br/>
                    Address:{parcel?.recipientAddress}<br/>
                    Telphone Number:{parcel?.recipientContactNumber}<br/>
                    Status:{parcel?.status}
                </CRow>
                {/* <CRow>
                  <>parcel & parcel.map((data, index) => ()
                    {`${data.recipientDetails ? JSON.parse(data.recipientDetails).firstName : ''} ${data.recipientDetails ? JSON.parse(data.recipientDetails).lastName : ''}`}
                  ))</>
                </CRow> */}

                {/* <CRow>
                {console.log(parcel)}
                  {parcel && Array.isArray(parcel) && parcel.map((data, index) => {
                    {console.log(parcel)}
                    const recipientDetails = data.recipientDetails ? JSON.parse(data.recipientDetails) : {};
                    const { recipientFirstName, recipientLastName } = recipientDetails;
                    return (
                      <CCol key={index}>
                        {`${recipientFirstName || ''} ${recipientLastName || ''}`}
                      </CCol>
                    );
                  })}
                </CRow> */}

                <br/>
                
                {/* <CCard>
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
                </CCard> */}

                <br/>

                {/* <CRow>
                  <CFormCheck id="accepted" label="Accepted"/>
                  <CFormCheck id="collected" label="Collected"/>
                  <CFormCheck id="shipped" label="Shipped"/>
                  <CFormCheck id="in-transitted" label="In-Transitted"/>
                  <CFormCheck id="delivered" label="Delivered"/>
                </CRow> */}

                <br/>

                {/* <div className="position-relative m-4">
                  <div className="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 1px;">
                    <div className="progress-bar" style="width: 50%"></div>
                  </div>
                  <CButton type="button" className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">1</CButton>
                  <CButton type="button" className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">2</CButton>
                  <CButton type="button" className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">3</CButton>
                </div> */}
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