import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
import { debounce } from 'lodash'
import NFS from '../../../assets/images/NoData.png'
import { AuthContext } from '../../pages/register/AuthProvider'
import addImage from '../../../assets/images/add.gif'
import tableImage from '../../../assets/images/table.gif'
import editIcon from '../../../assets/images/pencil.gif'
import delIcon from '../../../assets/images/trash-bin.gif'

const StaffList = () => {

  const {userDetails} = useContext(AuthContext)

  const [data,setData] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
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
    }, 500), 
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

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalStaff / limit);
 
const [selectedType, setSelectedType] = useState('ADMIN'); 

const getAccordionStyle = (color) => ({
  border: `2px solid var(--cui-${color})`,
  boxShadow: `0 4px 8px rgba(${getShadowColor(color)}, 0.3)`,
  padding: '10px',
  borderRadius: '5px',
});

const getStaffCardStyle = (color) => ({
  background: `rgba(var(--cui-${color}-rgb), 0.1)`,
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '10px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 4px 12px rgba(${getShadowColor(color)}, 0.4)`,
  },
});

const getShadowColor = (color) => {
  switch (color) {
    case 'primary':
      return '0, 123, 255';
    case 'success':
      return '40, 167, 69';
    case 'warning':
      return '255, 193, 7';
    case 'info':
      return '23, 162, 184';
    default:
      return '0, 0, 0';
  }
};

const [showModal, setShowModal] = useState(false);

const filteredStaffByType = (type) => {
  return data.filter((staff) => {
    if (userDetails.position === 'ADMIN') {
      return staff.position === type;
    } else if (userDetails.position === 'MANAGER') {
      return staff.branch === userDetails.branchCode && ['STAFF', 'DELIVERY_PERSON'].includes(staff.position) && staff.position === type;
    }
    return false; 
  });
};

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Staff List</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol>
                  <CButton 
                    color='primary' 
                    variant='outline'
                    onClick={() => setShowModal(true)}
                    className="mb-3"
                  >
                    <CImage src={tableImage} height={25} width={25}/>
                    Show Staffs
                  </CButton>
                </CCol>
                <CCol>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton href='/staff/new_branchstaff' className='me-md-2' color='primary' variant='outline'>
                      <CImage src={addImage} height={25} width={25}/>
                      {'  '}
                      AddNew
                    </CButton>
                  </div>
                </CCol>
            </CRow>
            
            <CModal visible={showModal} onClose={() => setShowModal(false)} size="xl" alignment="center" scrollable >
              <CModalHeader>
                <CModalTitle>Staff Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
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
                      paginatedData
                      .filter((staff) => {
                        if (userDetails.position === 'ADMIN') {
                          return true;
                        } else {
                          if(userDetails.position === 'MANAGER')
                            return (staff.branch === userDetails.branchCode &&
                              ['STAFF', 'DELIVERY_PERSON'].includes(staff.position))
                        }
                      })
                      .map((staff, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
                          <CTableDataCell>{staff.staffId}</CTableDataCell>
                          <CTableDataCell>{staff.fullName}</CTableDataCell>
                          <CTableDataCell>{staff.branch}</CTableDataCell>
                          <CTableDataCell>{staff.position}</CTableDataCell>
                          <CTableDataCell>{staff.email}</CTableDataCell>
                          <CTableDataCell>{staff.contactNumber}</CTableDataCell>
                          <CTableDataCell>
                            <Link to={`/staff/updateStaff?id=${staff.id}`}>
                              <CButton 
                                color='primary' 
                                size='sm' 
                                variant='ghost' 
                                className="me-md-2">
                                  <CImage src={editIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </Link>
                            <CButton color='danger'
                              size='sm'
                              variant='ghost' onClick={() => handleClick(staff.id)}
                            >
                              <CImage src={delIcon} alt='view' height={25} width={25} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="9">
                          <CImage rounded src={NFS} width={300} height={300} align="center"/>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>

                {limit >= 1 ? (
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
                ) : null}
              </CModalBody>
              <CModalFooter>
                <CButton color='secondary' onClick={() => setShowModal(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>

            {userDetails.position === 'ADMIN' ?
              <CRow className="justify-content-center mb-3">
                <CAccordion activeItemKey={selectedType} className="w-50">
                  <CAccordionItem itemKey="ADMIN">
                    <CAccordionHeader
                      className="bg-primary text-white"
                      onClick={() => setSelectedType(selectedType === 'ADMIN' ? null : 'ADMIN')}
                    >
                      <strong>ADMIN</strong>
                    </CAccordionHeader>
                    <CAccordionBody style={getAccordionStyle('primary')}>
                      {filteredStaffByType('ADMIN').length > 0 ? (
                        filteredStaffByType('ADMIN').map((staff, index) => (
                          <div key={index} className="staff-item" style={getStaffCardStyle('primary')}>
                            <p><strong>{staff.staffId}</strong></p>
                            <p><strong>Staff Name:</strong> {staff.fullName} </p>
                            <p><strong>Branch:</strong> {staff.branch}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                            <div className="d-flex justify-content-end">
                              <Link to={`/staff/updateStaff?id=${staff.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-2">
                                  <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                                <CImage src={delIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No ADMIN staff found</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>

                  <CAccordionItem itemKey="MANAGER">
                    <CAccordionHeader
                      className="bg-success text-white"
                      onClick={() => setSelectedType(selectedType === 'MANAGER' ? null : 'MANAGER')}
                    >
                      <strong>MANAGER</strong>
                    </CAccordionHeader>
                    <CAccordionBody style={getAccordionStyle('success')}>
                      {filteredStaffByType('MANAGER').length > 0 ? (
                        filteredStaffByType('MANAGER').map((staff, index) => (
                          <div key={index} className="staff-item" style={getStaffCardStyle('success')}>
                            <p><strong>{staff.staffId}</strong></p>
                            <p><strong>Staff Name:</strong> {staff.fullName} </p>
                            <p><strong>Branch:</strong> {staff.branch}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                            <div className="d-flex justify-content-end">
                              <Link to={`/staff/updateStaff?id=${staff.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-2">
                                  <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                                <CImage src={delIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No MANAGER staff found</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>

                  <CAccordionItem itemKey="STAFF">
                    <CAccordionHeader
                      className="bg-warning text-white"
                      onClick={() => setSelectedType(selectedType === 'STAFF' ? null : 'STAFF')}
                    >
                      <strong>STAFF</strong>
                    </CAccordionHeader>
                    <CAccordionBody style={getAccordionStyle('warning')}>
                      {filteredStaffByType('STAFF').length > 0 ? (
                        filteredStaffByType('STAFF').map((staff, index) => (
                          <div key={index} className="staff-item" style={getStaffCardStyle('warning')}>
                            <p><strong>{staff.staffId}</strong></p>
                            <p><strong>Staff Name:</strong> {staff.fullName} </p>
                            <p><strong>Branch:</strong> {staff.branch}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                            <div className="d-flex justify-content-end">
                              <Link to={`/staff/updateStaff?id=${staff.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-2">
                                  <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                                <CImage src={delIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No STAFF found</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>

                  <CAccordionItem itemKey="DELIVERY_PERSON">
                    <CAccordionHeader
                      className="bg-info text-white"
                      onClick={() => setSelectedType(selectedType === 'DELIVERY_PERSON' ? null : 'DELIVERY_PERSON')}
                    >
                      <strong>DELIVERY PERSON</strong>
                    </CAccordionHeader>
                    <CAccordionBody style={getAccordionStyle('info')}>
                      {filteredStaffByType('DELIVERY_PERSON').length > 0 ? (
                        filteredStaffByType('DELIVERY_PERSON').map((staff, index) => (
                          <div key={index} className="staff-item" style={getStaffCardStyle('info')}>
                            <p><strong>{staff.staffId}</strong></p>
                            <p><strong>Staff Name:</strong> {staff.fullName} </p>
                            <p><strong>Branch:</strong> {staff.branch}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                            <div className="d-flex justify-content-end">
                              <Link to={`/staff/updateStaff?id=${staff.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-2">
                                  <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                                <CImage src={delIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No DELIVERY PERSON staff found</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              </CRow>
              :
              <CRow className="justify-content-center mb-3">
                <CAccordion activeItemKey={selectedType} className="w-50">
                  <CAccordionItem itemKey="STAFF">
                    <CAccordionHeader
                      className="bg-warning text-white"
                      onClick={() => setSelectedType(selectedType === 'STAFF' ? null : 'STAFF')}
                    >
                      <strong>STAFF</strong>
                    </CAccordionHeader>
                    <CAccordionBody style={getAccordionStyle('warning')}>
                      {filteredStaffByType('STAFF').length > 0 ? (
                        filteredStaffByType('STAFF').map((staff, index) => (
                          <div key={index} className="staff-item" style={getStaffCardStyle('warning')}>
                            <p><strong>{staff.staffId}</strong></p>
                            <p><strong>Staff Name:</strong> {staff.fullName} </p>
                            <p><strong>Branch:</strong> {staff.branch}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                            <div className="d-flex justify-content-end">
                              <Link to={`/staff/updateStaff?id=${staff.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-2">
                                <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                              <CImage src={delIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No STAFF found</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>

                  <CAccordionItem itemKey="DELIVERY_PERSON">
                    <CAccordionHeader
                      className="bg-info text-white"
                      onClick={() => setSelectedType(selectedType === 'DELIVERY_PERSON' ? null : 'DELIVERY_PERSON')}
                    >
                      <strong>DELIVERY PERSON</strong>
                    </CAccordionHeader>
                    <CAccordionBody style={getAccordionStyle('info')}>
                      {filteredStaffByType('DELIVERY_PERSON').length > 0 ? (
                        filteredStaffByType('DELIVERY_PERSON').map((staff, index) => (
                          <div key={index} className="staff-item" style={getStaffCardStyle('info')}>
                            <p><strong>{staff.staffId}</strong></p>
                            <p><strong>Staff Name:</strong> {staff.fullName} </p>
                            <p><strong>Branch:</strong> {staff.branch}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                            <div className="d-flex justify-content-end">
                              <Link to={`/staff/updateStaff?id=${staff.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-2">
                                <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                              <CImage src={delIcon} alt='view' height={25} width={25} />
                              </CButton>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No DELIVERY PERSON staff found</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              </CRow>
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StaffList
