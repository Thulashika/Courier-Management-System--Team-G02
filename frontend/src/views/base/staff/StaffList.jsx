import React, { useCallback, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CImage,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { debounce } from 'lodash'
import NFS from '../../../assets/images/NoData.png'

const StaffList = () => {

  const [data,setData] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalStaff, setTotalStaff] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAll()
    getTotalCount();
  },[page, limit])


  useEffect(() => {
    getAll(search)
  },[search])

  const getAll = useCallback(
    debounce(async (query) => {
      try {
        const response = await axios.get('http://localhost:6431/staff', {
          params: { page: page,
                  limit: limit,
                  search: query ? query : {} },
          // headers: {
          //   'authentication': `Bearer ${localStorage.getItem('token')}`
          // }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 500), // Debounce delay in milliseconds
    []
  );

  const getTotalCount = () => {
    axios
      .get('http://localhost:6431/staff/count')
      .then((res) => {
        setTotalStaff(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching total count:', err);
      });
  };

  const handleClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this staff?');

    if (confirmDelete) {
      axios(`http://localhost:6431/staff/${id}`, {
        method:'DELETE'
      }).then(res => {
        alert('Successfully Deleted')
        getAll()
      }).catch(err => {
        alert('Failed to delete the staff')
      })
    }
  }

  // Calculate the index range for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalStaff / limit);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Staff List</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton href='/staff/new_branchstaff' className='me-md-2' color='primary' variant='outline'>AddNew</CButton>
              </div>
            </CRow>

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

            <CRow className="mb-3">
              <CTable className='table' bordered hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Staff Id</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Staff Name</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Branch</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Position</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Email</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Contact Number</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  
                {paginatedData.length > 0 ? (
                  paginatedData.map((staff, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
                      <CTableDataCell> {staff.staffId} </CTableDataCell>
                      <CTableDataCell> {staff.fullName} </CTableDataCell>
                      <CTableDataCell> {staff.branch} </CTableDataCell>
                      <CTableDataCell> {staff.position} </CTableDataCell>
                      <CTableDataCell> {staff.email} </CTableDataCell>
                      <CTableDataCell> {staff.contactNumber} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/staff/updateStaff?id=${staff.id}`}>
                          <CButton 
                            color='primary' 
                            size='sm' 
                            variant='ghost' 
                            className="me-md-2">
                              <CIcon icon={cilPencil}/>
                          </CButton>
                        </Link>
                        <CButton color='danger'
                          size='sm'
                          variant='ghost' onClick={() => handleClick(staff.id)}
                        >
                          <CIcon icon={cilTrash}/>
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ):
                (
                  <CTableRow>
                    <CTableDataCell colSpan="9">
                      <CImage rounded src={NFS} width={300} height={300} align="center"/>
                    </CTableDataCell>
                  </CTableRow>
                  )}      
                </CTableBody>
              </CTable>

              { limit >= 1 ? 
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
              : null }
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StaffList
