import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CHeader,
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
import CIcon from '@coreui/icons-react';
import { cilCheckAlt, cilTrash, cilX } from '@coreui/icons';
// import ParcelService from '../../../services/ParcelService';

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
      paymentMethod:'', // cash on delivery or cash on or online payment or card payment
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
  
    // Reset error and validity state
    setError('');
    setIsValid(true);
  
    // Log current parcel state
    console.log('Parcel State:', parcel);
  
    // Define validation regexes
    const BCregex = /^(?:P)?[0-9]{4}$/;
    const Nameregex = /^[A-Za-z\s]{1,50}$/;
    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;
  
    // Validate parcel details
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
  
    // Validate sender and recipient names
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
  
    // Validate contact numbers
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
  
    // Validate status for each parcel detail
    const validStatuses = ['ACCEPTED', 'COLLECTED', 'SHIPPED', 'IN-TRANSIT', 'DELIVERED'];
    for (const item of parcel.parcelDetails) {
      if (!validStatuses.includes(item.status)) {
        console.log('Error: Invalid status');
        setError(PARCEL_ERRORS.STATUS_FORMAT_VALIDATION);
        setIsValid(false);
        return;
      }
    }
    

    // If all validations pass, send the request
    const confirmSubmit = window.confirm('Are you sure you want to submit this form?');

    if (isValid && confirmSubmit) {
      axios
        .post('http://localhost:6431/parcel', parcel)
        .then((res) => {
          if (res.data.statusCode === 201) {
            alert('Created Successfully')
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
      // ParcelService.createParcel(parcel)
    }
  };
  
  

  return (
    <CRow>
      <CHeader>
        <strong>New Parcel</strong>
      </CHeader>
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
            {!isValid && error === PARCEL_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION && <p>{error}</p>}
            {!isValid && error === PARCEL_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION && <p>{error}</p>}

            <CRow>
              <CCol xs={6}>
                <CInputGroup className='mb-3'>
                  <CInputGroupText>NIC</CInputGroupText>
                  <CFormInput
                    type='text'
                    onChange={(e) =>
                      setParcel({
                        ...parcel,
                        senderDetails: { ...parcel.senderDetails, NIC: e.target.value }
                      })
                    }
                    required
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={6}>
                <CInputGroup className='mb-3'>
                  <CInputGroupText>NIC</CInputGroupText>
                  <CFormInput
                    type='text'
                    onChange={(e) =>
                      setParcel({
                        ...parcel,
                        recipientDetails: { ...parcel.recipientDetails, NIC: e.target.value }
                      })
                    }
                    required
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            {!isValid && error === PARCEL_ERRORS.NIC_LENGTH_VALIDATION && <p>{error}</p>}
            {!isValid && error === PARCEL_ERRORS.NIC_FORMAT_VALIDATION && <p>{error}</p>}

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
                    required
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
                    required
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

            <CCardHeader>
              <strong>Parcel Details</strong>
            </CCardHeader>

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
                    {!isValid && error === PARCEL_ERRORS.NUMBER_LENGTH_VALIDATION && <p>{error}</p>}
                    {!isValid && error === PARCEL_ERRORS.NUMBER_FORMAT_VALIDATION && <p>{error}</p>}

                    <CTableDataCell>
                      <CFormInput
                        type='number'
                        name='weight'
                        value={item.weight}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                      />
                    </CTableDataCell>

                    <CTableDataCell>
                      <CFormInput
                        type='number'
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
                        required>
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
                        required>
                          <option value=''>Please Select Status</option>
                          <option value='ACCEPTED'>Accepted</option>
                          <option value='COLLECTED'>Collected</option>
                          <option value='SHIPPED'>Shipped</option>
                          <option value='IN-TRANSIT'>In-transit</option>
                          <option value='DELIVERED'>Delivered</option>
                      </CFormSelect>
                    </CTableDataCell>

                    <CTableDataCell>
                      <CButton
                        color='danger'
                        variant='ghost'
                        onClick={() => deleteItem(index)}
                      >
                        <CIcon icon={cilTrash}/>
                      </CButton>
                    </CTableDataCell>
                    
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <CRow className="mb-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton type='button' className='me-md-2' color='primary' variant='outline' onClick={addItem}>Add Parcel</CButton>
              </div>
            </CRow>

            <div className='d-grid gap-2 d-md-flex'>
              <CButton color='success' type='submit'>
                <CIcon icon={cilCheckAlt}/>
                Submit
              </CButton>
              <CButton 
                color='secondary' 
                type='submit' 
                onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/parcel') : ''} 
              >
                <CIcon icon={cilX}/>
                Cancel
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CRow>
  );
};

export default NewParcels;

