import React, { useCallback, useEffect, useState } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'
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


const filteredStaffByType = (type) => {
  return paginatedData.filter(staff => staff.position === type);
};

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
                    Show Staffs
                  </CButton>
                </CCol>
                <CCol>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton href='/staff/new_branchstaff' className='me-md-2' color='primary' variant='outline'>
                      <CIcon icon={cilPlus}/>
                      {'  '}
                      AddNew
                    </CButton>
                  </div>
                </CCol>
            </CRow>

            {/* <CRow className="mb-3">
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
            </CRow> */}

{/* <CRow className="mb-3">
  <CButton 
    color='primary' 
    onClick={() => setShowOffcanvas(true)}
  >
    Show Table
  </CButton>
</CRow> */}

{/* <COffcanvas
  visible={showOffcanvas}
  onHide={() => setShowOffcanvas(false)}
  placement="top"
>
  <COffcanvasHeader>
    <COffcanvasTitle>Staff Table</COffcanvasTitle>
    <CButton 
      className="btn-close"
      color='secondary'
      onClick={() => setShowOffcanvas(false)}
    />
  </COffcanvasHeader>
  <COffcanvasBody>
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
          paginatedData.map((staff, index) => (
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
        ) : (
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
  </COffcanvasBody>
</COffcanvas> */}

            {/* Modal to display the table */}
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
                      paginatedData.map((staff, index) => (
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


            {/* <CRow className="mb-3">
  {paginatedData.length > 0 ? (
    paginatedData.map((staff, index) => {
      // Define border color based on staff type
      let borderColor;
      switch (staff.position) {
        case 'ADMIN':
          borderColor = '#007bff';  // Blue for Admin
          break;
        case 'MANAGER':
          borderColor = '#17a2b8';  // Info (Cyan) for Manager
          break;
        case 'STAFF':
          borderColor = '#28a745';  // Green for Staff
          break;
        case 'DELIVERY_PERSON':
          borderColor = '#ffc107';  // Yellow for Delivery Person
          break;
        default:
          borderColor = '#ddd';  // Default gray border
      }

      return (
        <CCol sm="4" key={index}>
          <CCard className="mb-3" style={{ borderColor: borderColor, borderWidth: '2px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)' }}>
            <CCardBody>
              <h5 className="card-title">Staff ID: {staff.staffId}</h5>
              <p><strong>Staff Name:</strong> {staff.fullName}</p>
              <p><strong>Branch:</strong> {staff.branch}</p>
              <p><strong>Position:</strong> {staff.position}</p>
              <p><strong>Email:</strong> {staff.email}</p>
              <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
              <div className="d-flex justify-content-end">
                <Link to={`/staff/updateStaff?id=${staff.id}`}>
                  <CButton color='primary' size='sm' variant='ghost' className="me-md-2">
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(staff.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      );
    })
  ) : (
    <CCol>
      <CImage rounded src={NFS} width={300} height={300} align="center" />
    </CCol>
  )}
  </CRow> */}

{/* <CRow className="mb-3">
{paginatedData.length > 0 ? (
paginatedData.map((staff, index) => (
  <CAccordion key={index} className="mb-3">
    <CAccordionItem itemKey={index}>
      <CAccordionHeader>
        <strong>{staff.fullName} ({staff.staffId})</strong> - {staff.position}
      </CAccordionHeader>
      <CAccordionBody>
        <p><strong>Branch:</strong> {staff.branch}</p>
        <p><strong>Email:</strong> {staff.email}</p>
        <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
        <div className="d-flex justify-content-end">
          <Link to={`/staff/updateStaff?id=${staff.id}`}>
            <CButton color='primary' size='sm' variant='ghost' className="me-md-2">
              <CIcon icon={cilPencil} />
            </CButton>
          </Link>
          <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(staff.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  </CAccordion>
))
) : (
<CCol>
  <CImage rounded src={NFS} width={300} height={300} align="center" />
</CCol>
)}
</CRow> */}

{/* <CRow className="mb-3">
<div className="mb-4 d-flex justify-content-center">
  <CButton color="primary" onClick={() => setSelectedType('ADMIN')} active={selectedType === 'ADMIN'} className="me-2">
    ADMIN
  </CButton>
  <CButton color="info" onClick={() => setSelectedType('MANAGER')} active={selectedType === 'MANAGER'} className="me-2">
    MANAGER
  </CButton>
  <CButton color="success" onClick={() => setSelectedType('STAFF')} active={selectedType === 'STAFF'} className="me-2">
    STAFF
  </CButton>
  <CButton color="warning" onClick={() => setSelectedType('DELIVERY_PERSON')} active={selectedType === 'DELIVERY_PERSON'} className="me-2">
    DELIVERY PERSON
  </CButton>
</div>

{paginatedData.length > 0 ? (
  paginatedData.map((staff, index) => (
    <CCol sm="3" key={index} className="mb-4">
      <div
        className={`staff-card ${staff.position.toLowerCase()}`}
        style={{
          border: `2px solid ${getBorderColor(staff.position)}`,
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div>
          <strong>{staff.fullName} ({staff.staffId})</strong>
          <p>{staff.position}</p>
          <p>{staff.branch}</p>
          <p>{staff.email}</p>
          <p>{staff.contactNumber}</p>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Link to={`/staff/updateStaff?id=${staff.id}`}>
            <CButton color="primary" size="sm" variant="ghost" className="me-2">
              <CIcon icon={cilPencil} />
            </CButton>
          </Link>
          <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </div>
      </div>
    </CCol>
  ))
) : (
  <CCol>
    <CImage rounded src={NFS} width={300} height={300} align="center" />
  </CCol>
)}
</CRow> */}

<CRow className="justify-content-center mb-3">
  <CAccordion activeItemKey={selectedType} className="w-50">
    {/* ADMIN */}
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
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </div>
          ))
        ) : (
          <p>No ADMIN staff found</p>
        )}
      </CAccordionBody>
    </CAccordionItem>

    {/* MANAGER */}
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
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </div>
          ))
        ) : (
          <p>No MANAGER staff found</p>
        )}
      </CAccordionBody>
    </CAccordionItem>

    {/* STAFF */}
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
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </div>
          ))
        ) : (
          <p>No STAFF found</p>
        )}
      </CAccordionBody>
    </CAccordionItem>

    {/* DELIVERY_PERSON */}
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
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                  <CIcon icon={cilTrash} />
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


{/* <CRow>
  <div style={{ marginBottom: '20px' }}>
    <CButton color="primary" onClick={() => setSelectedType('ADMIN')} active={selectedType === 'ADMIN'} className="me-2">
    ADMIN
    </CButton>
    <CButton color="info" onClick={() => setSelectedType('MANAGER')} active={selectedType === 'MANAGER'} className="me-2">
    MANAGER
    </CButton>
    <CButton color="success" onClick={() => setSelectedType('STAFF')} active={selectedType === 'STAFF'} className="me-2">
    STAFF
    </CButton>
    <CButton color="warning" onClick={() => setSelectedType('DELIVERY_PERSON')} active={selectedType === 'DELIVERY_PERSON'} className="me-2">
    DELIVERY PERSON
    </CButton>
  </div>

  {filteredData.length > 0 ? (
    filteredData.map((staff, index) => (
      <CCol sm="3" key={index}>
        <div
          style={{
          padding: '20px',
          marginBottom: '20px',
          border: `2px solid ${
          selectedType === 'ADMIN' ? '#0d6efd'   
          : selectedType === 'MANAGER' ? '#0dcaf0'
          : selectedType === 'STAFF' ? '#198754' 
          : selectedType === 'DELIVERY_PERSON' ? '#ffc107' 
          : '#ddd' 
          }`,
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.15)';
          }}
        >
        <div>
          <p><strong>Staff ID:</strong> {staff.staffId}</p>
          <p><strong>Branch:</strong> {staff.branch}</p>
          <p><strong>Position:</strong> {staff.position}</p>
        </div>

        {isRegistered(staff) && (
        <CCollapse visible={expandedRows.includes(staff.id)}>
        <div style={{ marginTop: '10px', transition: 'all 0.3s' }}>
          <p><strong>Full Name:</strong> {staff.fullName}</p>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
        </div>
        </CCollapse>
        )}

        <div style={{ marginTop: '10px' }}>
        {isRegistered(staff) && (
        <CButton
          color="primary"
          size="sm"
          variant="ghost"
          onClick={() => toggleRow(staff.id)}  // Toggle the details
          className="me-md-2"
        >
          {expandedRows.includes(staff.id) ? 'Hide Details' : 'Show Details'}
        </CButton>
        )}
        <Link to={`/staff/updateStaff?id=${staff.id}`}>
        <CButton color="primary" size="sm" variant="ghost" className="me-md-2">
          <CIcon icon={cilPencil} />
        </CButton>
        </Link>
        <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
        <CIcon icon={cilTrash} />
        </CButton>
        </div>
        </div>
      </CCol>
    ))
    ) : (
    <CCol>
    <p>No staff available for this type.</p>
    </CCol>
  )}
</CRow> */}

            {/* <CRow>
              {paginatedData.length > 0 ? (
                paginatedData.map((staff, index) => (
                  <CCol sm="6" key={index}>
                    <div
                      style={{
                        padding: '20px',
                        marginBottom: '20px',
                        // backgroundColor: isRegistered(staff) ? '#e6ffe6' : '#bbb',  // Highlight unregistered staff
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <div>
                        <h5>ID: {(page - 1) * limit + index + 1}</h5>
                        <p><strong>Staff ID:</strong> {staff.staffId}</p>
                        <p><strong>Branch:</strong> {staff.branch}</p>
                        <p><strong>Position:</strong> {staff.position}</p>
                      </div>

                      {expandedRows.includes(staff.id) && (
                        <div style={{ marginTop: '10px', transition: 'all 0.3s' }}>
                          <p><strong>Email:</strong> {staff.email}</p>
                          <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                        </div>
                      )}

                      <div style={{ marginTop: '10px' }}>
                        <CButton
                          color="primary"
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleRow(staff.id)}  // Toggle the details
                          className="me-md-2"
                        >
                          {expandedRows.includes(staff.id) ? 'Hide Details' : 'Show Details'}
                        </CButton>
                        <Link to={`/staff/updateStaff?id=${staff.id}`}>
                          <CButton color="primary" size="sm" variant="ghost" className="me-md-2">
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </Link>
                        <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                ))
              ) : (
                <CCol>
                  <p>No staff available</p>
                </CCol>
              )}
            </CRow> */}

            {/* <CRow>
            {paginatedData.length > 0 ? (
    paginatedData.map((staff, index) => (
      <CCol sm="6" key={index}>
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            // backgroundColor: isRegistered(staff) ? '#e6ffe6' : '#ffcccc',  // Green for registered, red for unregistered
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <div>
            <p><strong>Staff ID:</strong> {staff.staffId}</p>
            <p><strong>Branch:</strong> {staff.branch}</p>
            <p><strong>Position:</strong> {staff.position}</p>
          </div>

          {isRegistered(staff) && expandedRows.includes(staff.id) && (
            <div style={{ marginTop: '10px', transition: 'all 0.3s' }}>
              <p><strong>Full Name:</strong> {staff.fullName}</p>
              <p><strong>Email:</strong> {staff.email}</p>
              <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            {isRegistered(staff) && (
              <CButton
                color="primary"
                size="sm"
                variant="ghost"
                onClick={() => toggleRow(staff.id)}  // Toggle the details
                className="me-md-2"
              >
                {expandedRows.includes(staff.id) ? 'Hide Details' : 'Show Details'}
              </CButton>
            )}
            <Link to={`/staff/updateStaff?id=${staff.id}`}>
              <CButton color="primary" size="sm" variant="ghost" className="me-md-2">
                <CIcon icon={cilPencil} />
              </CButton>
            </Link>
            <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(staff.id)}>
              <CIcon icon={cilTrash} />
            </CButton>
          </div>
        </div>
      </CCol>
    ))
  ) : (
    <CCol>
      <p>No staff available</p>
    </CCol>
  )}
            </CRow> */}

{/* <CRow className="mb-3">
  {paginatedData.length > 0 ? (
    paginatedData.map((staff, index) => (
      <CCol sm="4" key={index} className="mb-4">
        <CCard>
          <CCardHeader>
            {staff.fullName}
          </CCardHeader>
          <CCardBody>
            <p><strong>Staff Id:</strong> {staff.staffId}</p>
            <p><strong>Branch:</strong> {staff.branch}</p>
            <p><strong>Position:</strong> {staff.position}</p>
            <p><strong>Email:</strong> {staff.email}</p>
            <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
            <Link to={`/staff/updateStaff?id=${staff.id}`}>
              <CButton color="primary" size="sm" className="me-md-2">
                <CIcon icon={cilPencil} />
              </CButton>
            </Link>
            <CButton color="danger" size="sm" onClick={() => handleClick(staff.id)}>
              <CIcon icon={cilTrash} />
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    ))
  ) : (
    <CCol>
      <CImage rounded src={NFS} width={300} height={300} align="center" />
    </CCol>
  )}
</CRow> */}

{/* <CListGroup>
  {paginatedData.length > 0 ? (
    paginatedData.map((staff, index) => (
      <CListGroupItem key={index}>
        <div><strong>Id:</strong> {(page - 1) * limit + index + 1}</div>
        <div><strong>Staff Id:</strong> {staff.staffId}</div>
        <div><strong>Full Name:</strong> {staff.fullName}</div>
        <div><strong>Branch:</strong> {staff.branch}</div>
        <div><strong>Position:</strong> {staff.position}</div>
        <div><strong>Email:</strong> {staff.email}</div>
        <div><strong>Contact Number:</strong> {staff.contactNumber}</div>
        <div>
          <Link to={`/staff/updateStaff?id=${staff.id}`}>
            <CButton color="primary" size="sm" className="me-md-2">
              <CIcon icon={cilPencil} />
            </CButton>
          </Link>
          <CButton color="danger" size="sm" onClick={() => handleClick(staff.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </div>
      </CListGroupItem>
    ))
  ) : (
    <CListGroupItem>
      <CImage rounded src={NFS} width={300} height={300} align="center" />
    </CListGroupItem>
  )}
</CListGroup> */}

{/* <CRow>
  {paginatedData.length > 0 ? (
    paginatedData.map((staff, index) => (
      <CCol sm="6" md="4" key={index} className="mb-3">
        <div className="grid-item">
          <h5>{staff.fullName}</h5>
          <p><strong>Staff Id:</strong> {staff.staffId}</p>
          <p><strong>Branch:</strong> {staff.branch}</p>
          <p><strong>Position:</strong> {staff.position}</p>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
          <Link to={`/staff/updateStaff?id=${staff.id}`}>
            <CButton color="primary" size="sm" className="me-md-2">
              <CIcon icon={cilPencil} />
            </CButton>
          </Link>
          <CButton color="danger" size="sm" onClick={() => handleClick(staff.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </div>
      </CCol>
    ))
  ) : (
    <CCol>
      <CImage rounded src={NFS} width={300} height={300} align="center" />
    </CCol>
  )}
</CRow> */}


            {/* <CAccordion>
              {paginatedData.length > 0 ? (
                paginatedData.map((staff, index) => (
                  <CAccordionItem key={index} itemKey={index.toString()}>
                    <CAccordionHeader>{staff.fullName} (Staff Id: {staff.staffId})</CAccordionHeader>
                    <CAccordionBody>
                      <p><strong>Branch:</strong> {staff.branch}</p>
                      <p><strong>Position:</strong> {staff.position}</p>
                      <p><strong>Email:</strong> {staff.email}</p>
                      <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
                      <Link to={`/staff/updateStaff?id=${staff.id}`}>
                        <CButton color="primary" size="sm" className="me-md-2">
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </Link>
                      <CButton color="danger" size="sm" onClick={() => handleClick(staff.id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CAccordionBody>
                  </CAccordionItem>
                ))
              ) : (
                <CAccordionItem>
                  <CImage rounded src={NFS} width={300} height={300} align="center" />
                </CAccordionItem>
              )}
            </CAccordion> */}

{/* <CRow>
  {paginatedData.length > 0 ? (
    paginatedData.map((staff, index) => (
      <CCol sm="4" key={index} className="tile-item mb-3">
        <div className="tile">
          <h6>{staff.fullName}</h6>
          <p><strong>Staff Id:</strong> {staff.staffId}</p>
          <p><strong>Branch:</strong> {staff.branch}</p>
          <p><strong>Position:</strong> {staff.position}</p>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Contact Number:</strong> {staff.contactNumber}</p>
          <Link to={`/staff/updateStaff?id=${staff.id}`}>
            <CButton color="primary" size="sm" className="me-md-2">
              <CIcon icon={cilPencil} />
            </CButton>
          </Link>
          <CButton color="danger" size="sm" onClick={() => handleClick(staff.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </div>
      </CCol>
    ))
  ) : (
    <CCol>
      <CImage rounded src={NFS} width={300} height={300} align="center" />
    </CCol>
  )}
</CRow> */}

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StaffList
