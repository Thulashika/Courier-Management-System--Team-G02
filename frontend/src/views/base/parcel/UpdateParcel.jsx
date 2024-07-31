import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PARCEL_ERRORS } from '../../../const';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import Query from '../../../const'

function useQuery() {
  const {search} = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}
// Query()

const UpdateParcels = () => {

  const query = useQuery()

  const [parcel, setParcel] = useState({
    senderDetails: {
      firstName: '',
      lastName: '',
      address: '',
      contactNumber: '',
      NIC:'',
      date: '',
      branchProcessed: ''
    },
    recipientDetails: {
      firstName: '',
      lastName: '',
      address: '',
      contactNumber: '',
      NIC:'',
      date: '',
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
    // parcelDetails: [], // Ensure this is initialized as an empty array
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

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

  const UpdateItem = () => {
    
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

  useEffect(() => {
    if(query.get('type') === 'edit') {
      setIsEdit(true)
    } else {
      setIsEdit(false)
    };
    
    axios(`http://localhost:6431/parcel/${query.get('id')}`, {
      method: 'get'
    }).then(res => {
      const data = res.data;
      if (Array.isArray(data.parcelDetails)) {
        setParcel(data);
      } else {
        setParcel({
          ...data,
          parcelDetails: parcel.parcelDetails // or handle the error accordingly
        });
      }
    });
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Reset error and validity state
    setError('');
    setIsValid(true);
  
    // Log current parcel state
    console.log('Parcel State:', parcel);
  
    // Define validation regexes
    const Nameregex = /^[A-Za-z\s]{1,50}$/;
    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;
  
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
    const confirmUpdate = window.confirm('Are you sure you want to update this form?');

    if (isValid && confirmUpdate) {
      axios
        .put(`http://localhost:6431/parcel/${query.get('id')}`, parcel)
        .then((res) => {
          if (res.data.statusCode === 201) {
            alert('Updated successfully')
            navigate('/parcels');
          } else {
            alert('Not updated successfully');
          }
        })
        .catch((err) => {
          if (err.response?.data?.statusCode === 500) {
            alert(err.response.data.statusMessage);
            return;
          }
          alert('Updated not successfully');
        });
    }
  };
  
  

  return (
    <CRow>
      <CHeader>
        <strong>{ isEdit ? 'Update Parcel' : 'View Parcel' }</strong>
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
                    disabled={!isEdit}
                    defaultValue={parcel?.senderDetails.firstName}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.senderDetails.lastName}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.recipientDetails.firstName}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.recipientDetails.lastName}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.senderDetails.address}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.recipientDetails.address}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.senderDetails.contactNumber}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.recipientDetails.contactNumber}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.senderDetails.NIC}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.recipientDetails.NIC}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.senderDetails.date}
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
                    disabled={!isEdit}
                    defaultValue={parcel?.recipientDetails.date}
                    min={parcel.senderDetails.date}
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
                    disabled={!isEdit}
                    value={parcel?.senderDetails.branchProcessed}
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
                    disabled={!isEdit}
                    value={parcel?.recipientDetails.branchProcessed}
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
                {parcel.parcelDetails && parcel.parcelDetails.map((item, index) => {
                    return ( <CTableRow key={index}>
                    <CTableDataCell>
                      <CFormInput
                        type='text'
                        name='referenceNumber'
                        value={item.referenceNumber}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                        readOnly = {true}
                        defaultValue={parcel?.parcelDetails.referenceNumber}
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
                        disabled={!isEdit}
                        defaultValue={parcel?.parcelDetails.weight}
                      />
                    </CTableDataCell>

                    <CTableDataCell>
                      <CFormInput
                        type='number'
                        name='deliveryCharge'
                        value={item.deliveryCharge}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                        disabled={!isEdit}
                        defaultValue={parcel?.parcelDetails.deliveryCharge}
                      />
                    </CTableDataCell>

                    <CTableDataCell>
                      <CFormInput
                        type='number'
                        name='totalAmount'
                        value={item.totalAmount}
                        readOnly
                        defaultValue={parcel?.parcelDetails.totalAmount}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type='number'
                        name='dueAmount'
                        value={item.dueAmount}
                        readOnly
                        defaultValue={parcel?.parcelDetails.dueAmount}
                      />
                    </CTableDataCell>

                    <CTableDataCell>
                      <CFormSelect  
                        type='select'
                        name='paymentMethod'
                        value={item.paymentMethod}
                        onChange={(e) => handleInputChange(index, e)}                    
                        required
                        disabled={!isEdit}
                        defaultValue={parcel?.parcelDetails.paymentMethod}
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
                        disabled={!isEdit}
                        defaultValue={parcel?.parcelDetails.status}
                      >
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
                        disabled={!isEdit}
                        onClick={() => deleteItem(index)}
                      >
                        <CIcon icon={cilTrash}/>
                      </CButton>
                    </CTableDataCell>
                    
                  </CTableRow> )
                })}
              </CTableBody>
            </CTable>

            { isEdit && <CRow className="mb-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton type='button' className='me-md-2' color='primary' variant='outline' onClick={UpdateItem}>Update Parcel</CButton>
              </div>
            </CRow>}

            <div className='d-grid gap-2 d-md-flex'>
              {isEdit && <CButton color='success' type='submit'>
                Update
              </CButton>}
              <CButton 
                color='secondary' 
                type='submit' 
                onClick={() => window.confirm('Are you sure you want to cancel this update form?') ? navigate('/parcels') : ''} 
              >
                {isEdit ? 'Cancel': 'Done'}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CRow>
  );
};

export default UpdateParcels;

