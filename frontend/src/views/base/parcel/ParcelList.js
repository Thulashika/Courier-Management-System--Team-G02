import React, { useEffect, useState } from 'react'
import { 
  CButton,
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CContainer,
  CRow, 
  CTable, 
  CTableBody, 
  CTableDataCell, 
  CTableHead, 
  CTableHeaderCell, 
  CTableRow, 
  CPagination,
  CPaginationItem,
  CFormInput, } from '@coreui/react'
import axios from 'axios'
import { cilTrash, cilPencil } from '@coreui/icons'
import CIcon  from '@coreui/icons-react'
import { Link } from 'react-router-dom';
import eyeIcon from '../../../assets/images/eye.png'
import QRCode from 'qrcode.react'; // Import QRCode library

const ParcelList = () => {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalParcels, setTotalParcels] = useState(0);
  const [search, setSearch] = useState('');

  const getStatus = (status) => {
    switch (status) {
      case 'COLLECTED':
        return 'primary'
      case 'ACCEPTED':
        return 'info'
      case 'SHIPPED':
        return 'secondary'
      case 'IN-TRANSIT':
        return 'warning'
      case 'DELIVERED':
        return 'success' 
      default:
        return 'danger'
    }
  }

  useEffect(() => {
    getAll()
    getTotalCount();
  }, [page, limit]); //search

  const getAll = () => {
    axios('http://localhost:6431/parcel', {
      method:'GET',
      params:{
        page: page,
        limit: limit,
      // search: search,
      },
    }).then(res => {
      setData(res.data)
    }).catch((err) => {
      console.error('Error fetching parcels:', err);
    });
  }

  const getTotalCount = () => {
    axios
      .get('http://localhost:6431/parcel/count')
      .then((res) => {
        setTotalParcels(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching total count:', err);
      });
  };

  const handleClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this parcel?');

    if(confirmDelete){
      axios(`http://localhost:6431/parcel/${id}`, {
        method:'DELETE'
      }).then(res => {
        alert('Successfully Deleted')
        getAll()
      }).catch(err => {
        alert('Failed to delete the parcel') // Handle error appropriately
      })
    }
  }

  const totalPages = Math.ceil(totalParcels / limit);

  return (
    <CRow>
      <CCard className='mb-4'>
        <CCardHeader>
          <strong>Parcel List</strong>
        </CCardHeader>
        <CCardBody>
          <CContainer className='py-3'>
            <CRow className="mb-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton href='/parcels/new_parcels' className='me-md-2' color='primary' variant='outline'>AddNew</CButton>
              </div>
            </CRow>
          </CContainer>

          <CRow className="mb-3">
            <CCol xs={6}>
                <CFormInput 
                  label='Show entries:' 
                  type='number' 
                  className='w-25' 
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
            </CCol>

            <CCol xs={6}>
                <CFormInput 
                  label='Search:' 
                  type='text' 
                  className='w-50'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
            </CCol>
          </CRow>

          <CRow className="justify-content-center">
            <CTable className='table' bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Reference Number</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Sender Name</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Sender Date</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Recipient Name</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Recipient Date</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">QR Code</CTableHeaderCell> {/* Add QR Code column */}
                  <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              
              {data.length > 0 ? (
                  data.map((parcel, index) => (
                    <CTableRow key={index}>
                    <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
                      <CTableDataCell>{parcel.referenceNumber}</CTableDataCell>
                      <CTableDataCell>{`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</CTableDataCell>
                      <CTableDataCell>{parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : ''}</CTableDataCell>
                      <CTableDataCell>{`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</CTableDataCell>
                      <CTableDataCell>{parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : ''}</CTableDataCell>
                      <CTableDataCell> <span className={`badge text-bg-${getStatus(parcel.status)}`}>{parcel.status}</span></CTableDataCell>
                      <CTableDataCell>
                        <QRCode value={`Parcel ID: ${parcel.id}`} size={50} /> {/* Generate QR Code */}
                      </CTableDataCell>
                      <CTableDataCell> 
                        <Link to={`/parcels/read?id=${parcel.id}`}>
                          <CButton
                            color='dark'
                            size='sm'
                            variant='ghost'
                            className="me-md-2">
                            <img src={eyeIcon} alt='view' height={20} width={20}/>
                          </CButton>
                        </Link>
                        
                        <Link to={`/parcels/updateParcel?id=${parcel.id}`}>
                          <CButton 
                            color='primary' 
                            size='sm' 
                            variant='ghost' 
                            className="me-md-2">
                              <CIcon icon={cilPencil}/>
                          </CButton>
                          </Link>

                          <CButton
                            color='danger'
                            size='sm'
                            variant='ghost'
                            onClick={() => handleClick(parcel.id)}>
                              <CIcon icon={cilTrash}/>
                          </CButton>

                      </CTableDataCell>
                    </CTableRow>
                  ))
                ):
                (
                  <CTableRow>
                    <CTableDataCell colSpan="9">No parcels found</CTableDataCell>
                  </CTableRow>
                  )}          
              </CTableBody>
            </CTable>
          </CRow>

          <CRow className="justify-content-end">
            <CPagination align="end" aria-label="Page navigation">
              <CPaginationItem disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Previous
              </CPaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <CPaginationItem key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                Next
              </CPaginationItem>
            </CPagination>
          </CRow>
        </CCardBody>
      </CCard>
    </CRow>
  )
}

export default ParcelList
