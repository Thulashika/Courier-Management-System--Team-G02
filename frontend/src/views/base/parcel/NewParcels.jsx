import React, { useContext, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PARCEL_ERRORS } from '../../../const';
import delIcon from '../../../assets/images/trash-bin.gif'
import addImage from '../../../assets/images/add.gif'
import saveImage from '../../../assets/images/check.gif'
import cancelImage from '../../../assets/images/delete.gif'
import { AuthContext } from '../../pages/register/AuthProvider';

const NewParcels = () => {

  const [parcel, setParcel] = useState({
    senderDetails: {
      firstName: '',
      lastName: '',
      address: '',
      contactNumber: '',
      NIC:'',
      date: '',
      time: '',
      branchProcessed: ''
    },
    recipientDetails: {
      firstName: '',
      lastName: '',
      address: '',
      contactNumber: '',
      NIC:'',
      date: '',
      time: '',
      branchProcessed: ''
    },
    parcelDetails: [{
      referenceNumber: '',
      weight: '',
      deliveryCharge: '',
      totalAmount: '',
      dueAmount: '',
      paymentMethod:'', 
      status:''
    }],
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...parcel.parcelDetails];
    newData[index][name] = value;

    if (name === 'weight' || name === 'deliveryCharge') {
      const weight = parseFloat(newData[index].weight) || 0;
      const deliveryCharge = parseFloat(newData[index].deliveryCharge) || 0;
      newData[index].totalAmount = (weight*350 + deliveryCharge).toFixed(2);
      newData[index].dueAmount = (newData[index].totalAmount - deliveryCharge).toFixed(2);
    }

    setParcel({...parcel, parcelDetails: newData});
  };

  const addItem = () => {
    setParcel({
      ...parcel,
      parcelDetails: [
        ...parcel.parcelDetails,
        {
          referenceNumber: '',
          weight: '',
          deliveryCharge: '',
          totalAmount: '',
          dueAmount: '',
          paymentMethod:'',
          status: ''
        }
      ]
    })
  };

  const deleteItem = (index) => {
    const newData =  [...parcel.parcelDetails];
    newData.splice(index, 1);
    setParcel({...parcel, parcelDetails: newData})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setError('');
    setIsValid(true);
  
    console.log('Parcel State:', parcel);
  
    const BCregex = /^(?:P)?[0-9]{4}$/;
    const Nameregex = /^[A-Za-z\s]{1,50}$/;
    const CNregex = /^(07[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/; 
    const nicPattern = /^(?:\d{12}|\d{9}[Vv])$/;
  
    for (const item of parcel.parcelDetails) {
      if (item.referenceNumber.length !== 5) {
        console.log('Error: Reference number length is not 5');
        setError(PARCEL_ERRORS.NUMBER_LENGTH_VALIDATION);
        setIsValid(false);
        return;
      }
  
      if (!BCregex.test(item.referenceNumber)) {
        console.log('Error: Reference number format is invalid');
        setError(PARCEL_ERRORS.NUMBER_FORMAT_VALIDATION);
        setIsValid(false);
        return;
      }
    }
  
    const validateName = (name) => Nameregex.test(name);
  
    if (!validateName(parcel.senderDetails.firstName) || !validateName(parcel.senderDetails.lastName)) {
      console.log('Error: Sender name format is invalid');
      setError(PARCEL_ERRORS.NAME_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }
  
    if (!validateName(parcel.recipientDetails.firstName) || !validateName(parcel.recipientDetails.lastName)) {
      console.log('Error: Recipient name format is invalid');
      setError(PARCEL_ERRORS.NAME_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }
  
    const validateContactNumber = (number) => CNregex.test(number) && number.length === 10;
  
    if (!validateContactNumber(parcel.senderDetails.contactNumber)) {
      console.log('Error: Sender contact number is invalid');
      setError(PARCEL_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }
  
    if (!validateContactNumber(parcel.recipientDetails.contactNumber)) {
      console.log('Error: Recipient contact number is invalid');
      setError(PARCEL_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }

    const validateNICNumber = (number) => nicPattern.test(number) && number.length === 12;
  
    if (!validateNICNumber(parcel.senderDetails.NIC)) {
      console.log('Error: Sender NIC number is invalid');
      setError(PARCEL_ERRORS.NIC_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }
  
    if (!validateNICNumber(parcel.recipientDetails.NIC)) {
      console.log('Error: Recipient NIC number is invalid');
      setError(PARCEL_ERRORS.NIC_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }
  
    const validStatuses = ['ACCEPTED', 'Processed_and_Ready_to_Ship', 'SHIPPING', 'DELIVERED'];
    
    for (const item of parcel.parcelDetails) {
      if (!validStatuses.includes(item.status)) {
        console.log('Error: Invalid status');
        setError(PARCEL_ERRORS.STATUS_FORMAT_VALIDATION);
        setIsValid(false);
        return;
      }
    }

    if (isValid) {
      axios
        .post('http://localhost:6431/parcel', parcel)
        .then((res) => {
          if (res.data.statusCode === 201) {
            navigate('/parcels');
          } else {
            alert('Not created successfully');
          }
        })
        .catch((err) => {
          if (err.response?.data?.statusCode === 500) {
            alert(err.response.data.statusMessage);
            return;
          }
          alert('Created not successfully');
        });
    }
  };
  
  const { userDetails } = useContext(AuthContext)

  const STATUS_FLOW = [
    'ACCEPTED',
    'Processed_and_Ready_to_Ship',
    'SHIPPING',
    'DELIVERED',
  ];
  
  const getAvailableStatuses = (currentStatus) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    if (currentIndex === -1) {
      return ['ACCEPTED']; 
    }
    return STATUS_FLOW.slice(currentIndex, currentIndex + 2); 
  };
  

  return (
    <>
    { userDetails.position === 'STAFF' ?
      <CRow>
        <CCol xs={12}>
          <CCard className='mb-3'>
            <CCardHeader>
              <strong>New Parcel</strong>
            </CCardHeader>
          </CCard>
          <CCard className='mb-4'>
            <CCardHeader>
              <CRow className='justify-content-around'>
                <CCol xs={6}>
                  <strong>Sender Information</strong>
                </CCol>
                <CCol xs={6}>
                  <strong>Recipient Information</strong>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Name</CInputGroupText>
                      <CFormInput
                        type='text'
                        placeholder='First Name'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            senderDetails: { ...parcel.senderDetails, firstName: e.target.value }
                          })
                        }
                        required
                      />
                      <CFormInput
                        type='text'
                        placeholder='Last Name'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            senderDetails: { ...parcel.senderDetails, lastName: e.target.value }
                          })
                        }
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Name</CInputGroupText>
                      <CFormInput
                        type='text'
                        placeholder='First Name'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            recipientDetails: { ...parcel.recipientDetails, firstName: e.target.value }
                          })
                        }
                        required
                      />
                      <CFormInput
                        type='text'
                        placeholder='Last Name'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            recipientDetails: { ...parcel.recipientDetails, lastName: e.target.value }
                          })
                        }
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
                {!isValid && error === PARCEL_ERRORS.NAME_FORMAT_VALIDATION && <p>{error}</p>}

                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Address</CInputGroupText>
                      <CFormInput
                        type='text'
                        onChange={(e) =>
                          setParcel({ ...parcel, senderDetails: { ...parcel.senderDetails, address: e.target.value } })
                        }
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Address</CInputGroupText>
                      <CFormInput
                        type='text'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            recipientDetails: { ...parcel.recipientDetails, address: e.target.value }
                          })
                        }
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Contact Number</CInputGroupText>
                      <CFormInput
                        type='text'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            senderDetails: { ...parcel.senderDetails, contactNumber: e.target.value }
                          })
                        }
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Contact Number</CInputGroupText>
                      <CFormInput
                        type='text'
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            recipientDetails: { ...parcel.recipientDetails, contactNumber: e.target.value }
                          })
                        }
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
                {!isValid && error === PARCEL_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                {!isValid && error === PARCEL_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}

                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>NIC</CInputGroupText>
                      <CFormInput
                        type='text'
                        onChange={(e) =>{
                          const nicPattern = /^(?:\d{12}|\d{9}[Vv])$/;
                          if(nicPattern.test(e.target.value)) {
                            setParcel({
                              ...parcel,
                              senderDetails: { ...parcel.senderDetails, NIC: e.target.value }
                            })
                          }
                        }}
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>NIC</CInputGroupText>
                      <CFormInput
                        type='text'
                        onChange={(e) =>{
                          const nicPattern = /^(?:\d{12}|\d{9}[Vv])$/;
                          if(nicPattern.test(e.target.value)) {
                            setParcel({
                              ...parcel,
                              recipientDetails: { ...parcel.recipientDetails, NIC: e.target.value }
                            })
                          }
                        }}
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
                {!isValid && error === PARCEL_ERRORS.NIC_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                {!isValid && error === PARCEL_ERRORS.NIC_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}

                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Date</CInputGroupText>
                      <CFormInput
                        type='date'
                        value={parcel.senderDetails.date}
                        onChange={(e) => setParcel({
                          ...parcel,
                          senderDetails: {
                            ...parcel.senderDetails,
                            date: e.target.value
                          }
                        })}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Time</CInputGroupText>
                      <CFormInput
                        type='time'
                        value={parcel.senderDetails.time}
                        onChange={(e) => setParcel({
                          ...parcel,
                          senderDetails: {
                            ...parcel.senderDetails,
                            time: e.target.value
                          }
                        })}
                        required
                      />
                    </CInputGroup>
                  </CCol>

                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Date</CInputGroupText>
                      <CFormInput
                        type='date'
                        value={parcel.recipientDetails.date}
                        onChange={(e) => setParcel({
                          ...parcel,
                          recipientDetails: {
                            ...parcel.recipientDetails,
                            date: e.target.value
                          }
                        })}
                        min={parcel.senderDetails.date}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Time</CInputGroupText>
                      <CFormInput
                        type='time'
                        value={parcel.recipientDetails.time}
                        onChange={(e) => setParcel({
                          ...parcel,
                          recipientDetails: {
                            ...parcel.recipientDetails,
                            time: e.target.value
                          }
                        })}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Branch Processed</CInputGroupText>
                      <CFormSelect
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            senderDetails: { ...parcel.senderDetails, branchProcessed: e.target.value }
                          })
                        }
                        required
                      >
                        <option value=''>Please Select Branch</option>
                        <option value='JAFFNA'>Jaffna</option>
                        <option value='COLOMBO'>Colombo</option>
                      </CFormSelect>
                    </CInputGroup>
                  </CCol>
                  <CCol xs={6}>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>Pickup Branch</CInputGroupText>
                      <CFormSelect
                        onChange={(e) =>
                          setParcel({
                            ...parcel,
                            recipientDetails: { ...parcel.recipientDetails, branchProcessed: e.target.value }
                          })
                        }
                        required
                      >
                        <option value=''>Please Select Branch</option>
                        <option value='JAFFNA'>Jaffna</option>
                        <option value='COLOMBO'>Colombo</option>
                      </CFormSelect>
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md={12}>
                    <CCard className='mb-3'>
                      <CCardHeader>
                        <strong>Parcel Details</strong>
                      </CCardHeader>
                    </CCard>

                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Reference Number</CTableHeaderCell>
                          <CTableHeaderCell>Weight</CTableHeaderCell>
                          <CTableHeaderCell>Delivery Charge</CTableHeaderCell>
                          <CTableHeaderCell>Total Amount</CTableHeaderCell>
                          <CTableHeaderCell>Due Amount</CTableHeaderCell>
                          <CTableHeaderCell>paymentMethod</CTableHeaderCell>
                          <CTableHeaderCell>Status</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {parcel.parcelDetails && parcel.parcelDetails.map((item, index) => (
                          <CTableRow key={index}>

                            <CTableDataCell>
                              <CFormInput
                                type='text'
                                name='referenceNumber'
                                value={item.referenceNumber}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                              />
                            </CTableDataCell>
                            {!isValid && error === PARCEL_ERRORS.NUMBER_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                            {!isValid && error === PARCEL_ERRORS.NUMBER_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}

                            <CTableDataCell>
                              <CFormInput
                                type='int'
                                name='weight'
                                value={item.weight}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                              />
                            </CTableDataCell>

                            <CTableDataCell>
                              <CFormInput
                                type='int'
                                name='deliveryCharge'
                                value={item.deliveryCharge}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                              />
                            </CTableDataCell>

                            <CTableDataCell>
                              <CFormInput
                                type='number'
                                name='totalAmount'
                                value={item.totalAmount}
                                readOnly
                              />
                            </CTableDataCell>

                            <CTableDataCell>
                              <CFormInput
                                type='number'
                                name='dueAmount'
                                value={item.dueAmount}
                                readOnly
                              />
                            </CTableDataCell>

                            <CTableDataCell>
                              <CFormSelect  
                                type='select'
                                name='paymentMethod'
                                value={item.paymentMethod}
                                onChange={(e) => handleInputChange(index, e)}                    
                                required
                                >
                                  <option value=''>Please Select Method</option>
                                  <option value='CASH ON'>Cash on</option>
                                  <option value='CASH ON DELIVERY'>Cash on delivery</option>
                                  <option value='ONLINE PAYMENT'>Online payment</option>
                                  <option value='CARD PAYMENT'>Card payment</option>
                              </CFormSelect>
                            </CTableDataCell>

                            <CTableDataCell>
                              <CFormSelect  
                                type='select'
                                name='status'
                                value={item.status}
                                onChange={(e) => handleInputChange(index, e)}                    
                                required
                                >
                                  <option value=''>Please Select Status</option>
                                   {getAvailableStatuses(item.status).map((status) => (
                                      <option key={status} value={status}>{status}</option>
                                    ))}
                              </CFormSelect>
                            </CTableDataCell>

                            <CTableDataCell>
                              <CButton
                                color='danger'
                                variant='ghost'
                                onClick={() => deleteItem(index)}
                              >
                                <CImage src={delIcon} height={25} width={25}/>
                              </CButton>
                            </CTableDataCell>
                            
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>

                    <CRow className="mb-3">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton type='button' className='me-md-2' color='primary' variant='outline' onClick={addItem}>
                          <CImage src={addImage} height={25} width={25}/>
                          {'  '}
                          Add Parcel
                        </CButton>
                      </div>
                    </CRow>
                  </CCol>
                </CRow>

                <div className='d-grid gap-2 d-md-flex'>
                  <CButton color='success' type='submit' variant='outline'>
                    <CImage src={saveImage} height={25} width={25}/>
                    {'  '}
                    Save
                  </CButton>
                  <CButton 
                    color='secondary' 
                    type='submit' 
                    variant='outline'
                    onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/parcels') : ''} 
                  >
                    <CImage src={cancelImage} height={25} width={25}/>
                    {'  '}
                    Cancel
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    : 
    ' '
    }
    </>
  );
};

export default NewParcels;

