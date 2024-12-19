import { CCard, CCardBody, CCardText, CCardTitle, CCol, CContainer, CImage, CRow  } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PARCEL_ERRORS } from '../../../const';
import NFRN from '../../../assets/images/NoData.png'
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