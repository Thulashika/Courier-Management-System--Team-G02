import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CTableDataCell,
  CFormInput,
  CPagination,
  CPaginationItem,
  CImage,
  CCollapse,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CModal,
  CAccordion,
  CAccordionHeader,
  CAccordionItem,
  CAccordionBody,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasBody,
  CCloseButton,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import axios from 'axios'
import NFB from '../../../assets/images/NoData.png'

const List = () => {

  const [data,setData] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalBranches, setTotalBranches] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAll()
    getTotalCount()
  },[page, limit, search])

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name} = `);
    if(parts.length === 2) return parts.pop().split(`;`).shift();
  }

  const getAll = () => {
    axios('http://localhost:6431/branch', {
      method:'GET',
      params:{
        page: page,
        limit: limit,
        search: search,
      },
      withCredentials: true,
      // headers: {
      //   'authentication': `Bearer ${getCookie('token')}`
      // }
    }).then(res => {
      setData(res.data.data)
    }).catch((err) => {
      console.error('Error fetching branches:', err);
    });
  }

  const getTotalCount = () => {
    axios
      .get('http://localhost:6431/branch/count')
      .then((res) => {
        setTotalBranches(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching total count:', err);
      });
  };

  const handleClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this branch?');

    if (confirmDelete) {
      axios(`http://localhost:6431/branch/${id}`, {
        method:'DELETE'
      }).then(res => {
        alert('Successfully Deleted')
        getAll()
      }).catch(err => {
        alert('Failed to delete the branch')
      })
    }
  }

  // Calculate the index range for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalBranches / limit);

  const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index)); // Collapse
    } else {
      setExpandedRows([...expandedRows, index]); // Expand
    }
  };

  const [isTableVisible, setIsTableVisible] = useState(true); // Toggle for entire table visibility

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible); // Toggle table visibility
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const openModal = (branch) => {
    setSelectedBranch(branch);
    setVisibleModal(true);
  };

  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);

  const handleToggleOffcanvas = () => {
    setIsOffcanvasVisible(!isOffcanvasVisible);
  };

  return (

    <CRow>
      <CCol>
        <CCard className='mb-4'>
          <CHeader>
            <strong>Branch List</strong>
            </CHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol>
                <CButton color="primary" onClick={handleToggleOffcanvas} variant='outline'>
                  Show Branches
                </CButton>
                {/* <CButton color="primary" onClick={toggleTableVisibility} className="mb-3" variant='outline'>
                  {isTableVisible ? 'Hide Table' : 'Show Table'}
                </CButton> */}
              </CCol>
              <CCol>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton href='/branch/new_branch' className='me-md-2' color='primary' variant='outline'>AddNew</CButton>
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
            </CRow> */}

{/* <CRow className="mb-3">
  <CTable className='table' bordered hover>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Branch Code</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Branch Name</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Branch Address</CTableHeaderCell>
        <CTableHeaderCell scope='col'>City</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Contact Number</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {paginatedData.length > 0 ? (
        paginatedData.map((branch, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
            <CTableDataCell>{branch.branchCode}</CTableDataCell>
            <CTableDataCell>{branch.branchName}</CTableDataCell>
            <CTableDataCell>{branch.branchAddress}</CTableDataCell>
            <CTableDataCell>{branch.city}</CTableDataCell>
            <CTableDataCell>{branch.contactNumber}</CTableDataCell>
            <CTableDataCell className="d-grid gap-2 d-md-flex"> 
              <Link to={`/branch/updateBranch?id=${branch.id}`}>
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
                onClick={() => handleClick(branch.id)}>
                  <CIcon icon={cilTrash}/>
              </CButton>
            </CTableDataCell>
          </CTableRow> )
      ) ):
      (
        <CTableRow>
          <CTableDataCell colSpan="9">
            <CImage rounded src={NFB} width={300} height={300} align="center"/>
          </CTableDataCell>
        </CTableRow>
        )}
    </CTableBody>
  </CTable>
</CRow> */}


{/* <CRow className="mb-3">
  <CTable className='table' bordered hover>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Branch Code</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Branch Name</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Branch Address</CTableHeaderCell>
        <CTableHeaderCell scope='col'>City</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Contact Number</CTableHeaderCell>
        <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {paginatedData.length > 0 ? (
        paginatedData.map((branch, index) => (
          <>
            <CTableRow key={index}>
              <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
              <CTableDataCell>{branch.branchCode}</CTableDataCell>
              <CTableDataCell>{branch.branchName}</CTableDataCell>
              <CTableDataCell>{branch.branchAddress}</CTableDataCell>
              <CTableDataCell>{branch.city}</CTableDataCell>
              <CTableDataCell>{branch.contactNumber}</CTableDataCell>
              <CTableDataCell className="d-grid gap-2 d-md-flex">
                <CButton color='info' size='sm' variant='ghost' className="me-md-2" onClick={() => toggleRow(index)}>
                  {expandedRows.includes(index) ? 'Hide Details' : 'View Details'}
                </CButton>
                <Link to={`/branch/updateBranch?id=${branch.id}`}>
                  <CButton color='primary' size='sm' variant='ghost'>
                    <CIcon icon={cilPencil}/>
                  </CButton>
                </Link>
                <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(branch.id)}>
                  <CIcon icon={cilTrash}/>
                </CButton>
              </CTableDataCell>
            </CTableRow>
            
            <CTableRow>
              <CTableDataCell colSpan="7" className="p-0">
                <CCollapse visible={expandedRows.includes(index)}>
                  <div className="p-3">
                    <p><strong>Branch Code:</strong> {branch.branchCode}</p>
                    <p><strong>Branch Name:</strong> {branch.branchName}</p>
                    <p><strong>Address:</strong> {branch.branchAddress}</p>
                    <p><strong>City:</strong> {branch.city}</p>
                    <p><strong>Contact:</strong> {branch.contactNumber}</p>
                  </div>
                </CCollapse>
              </CTableDataCell>
            </CTableRow>
          </>
        ))
      ) : (
        <CTableRow>
          <CTableDataCell colSpan="7">
            <CImage rounded src={NFB} width={300} height={300} align="center"/>
          </CTableDataCell>
        </CTableRow>
      )}
    </CTableBody>
  </CTable>
</CRow> */}

{/* <CRow className="mb-3">
  {paginatedData.length > 0 ? (
    paginatedData.map((branch, index) => (
      <CCol sm="4" key={index}>
        <CCard className="mb-3 border-primary shadow-sm">
          <CCardHeader className="bg-primary text-white">
            <h5>Branch #{branch.branchCode}</h5>
          </CCardHeader>
          <CCardBody>
            <p><strong>Id:</strong> {(page - 1) * limit + index + 1}</p>
            <p><strong>Branch Code:</strong> {branch.branchCode}</p>
            <p><strong>Branch Name:</strong> {branch.branchName}</p>
            <p><strong>Branch Address:</strong> {branch.branchAddress}</p>
            <p><strong>City:</strong> {branch.city}</p>
            <p><strong>Contact Number:</strong> {branch.contactNumber}</p>
            
            <div className="d-flex justify-content-between mt-3">
              <Link to={`/branch/updateBranch?id=${branch.id}`}>
                <CButton color="primary" size="sm" variant="ghost">
                  <CIcon icon={cilPencil} />
                </CButton>
              </Link>
              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(branch.id)}>
                <CIcon icon={cilTrash} />
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    ))
  ) : (
    <CCol className="text-center">
      <CImage rounded src={NFB} width={300} height={300} />
      <p>No Branches Available</p>
    </CCol>
  )}
</CRow> */}

{/* <CListGroup>
  {paginatedData.length > 0 ? (
    paginatedData.map((branch, index) => (
      <CListGroupItem key={index} onClick={() => toggleExpand(index)}>
        <div className="d-flex justify-content-between">
          <span><strong>Branch #{branch.branchCode}</strong></span>
          <CButton size="sm" variant="ghost">
            {expandedIndex === index ? "Hide Details" : "Show Details"}
          </CButton>
        </div>
        <CCollapse visible={expandedIndex === index}>
          <div className="mt-2">
            <p><strong>Branch Name:</strong> {branch.branchName}</p>
            <p><strong>Branch Address:</strong> {branch.branchAddress}</p>
            <p><strong>City:</strong> {branch.city}</p>
            <p><strong>Contact Number:</strong> {branch.contactNumber}</p>

            <div className="d-flex justify-content-between">
              <Link to={`/branch/updateBranch?id=${branch.id}`}>
                <CButton color="primary" size="sm" variant="ghost">
                  <CIcon icon={cilPencil} />
                </CButton>
              </Link>
              <CButton
                color="danger"
                size="sm"
                variant="ghost"
                onClick={() => handleClick(branch.id)}
              >
                <CIcon icon={cilTrash} />
              </CButton>
            </div>
          </div>
        </CCollapse>
      </CListGroupItem>
    ))
  ) : (
    <p>No branches available</p>
  )}
</CListGroup> */}

            {/* <CRow>
              {paginatedData.length > 0 ? (
                paginatedData.map((branch, index) => (
                  <CCol sm="6" key={index}>
                    <div className="border p-3 text-center shadow-sm">
                      <h5>{branch.branchCode}</h5>
                      <CButton
                        color="primary"
                        size="sm"
                        variant="outline"
                        onClick={() => openModal(branch)}
                      >
                        View Details
                      </CButton>
                    </div>
                  </CCol>
                ))
              ) : (
                <CCol>
                  <p>No branches available</p>
                </CCol>
              )}
            </CRow> */}

            <CRow>
              {paginatedData.length > 0 ? (
                paginatedData.map((branch, index) => (
                  <CCol sm="6" key={index}>
                    <div
                      style={{
                        padding: '20px',
                        // backgroundColor: 'black',
                        border: '1px solid #bbb',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <h5 style={{ marginBottom: '10px' }}>{branch.branchCode}</h5>
                      <CButton
                        color="primary"
                        size="sm"
                        variant="outline"
                        onClick={() => openModal(branch)}
                      >
                        View Details
                      </CButton>
                    </div>
                  </CCol>
                ))
              ) : (
                <CCol>
                  <p>No branches available</p>
                </CCol>
              )}
            </CRow>

            <CRow className="mb-3">
              {/* Modal for displaying detailed branch information */}
              <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
                <CModalHeader onClose={() => setVisibleModal(false)}>
                  Branch Details
                </CModalHeader>
                {selectedBranch && (
                  <CModalBody>
                    <p><strong>Branch Code:</strong> {selectedBranch.branchCode}</p>
                    <p><strong>Branch Name:</strong> {selectedBranch.branchName}</p>
                    <p><strong>Branch Address:</strong> {selectedBranch.branchAddress}</p>
                    <p><strong>City:</strong> {selectedBranch.city}</p>
                    <p><strong>Contact Number:</strong> {selectedBranch.contactNumber}</p>
                  </CModalBody>
                )}
                <CModalFooter>
                  <Link to={`/branch/updateBranch?id=${selectedBranch?.id}`}>
                    <CButton color="primary" variant="ghost">
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </Link>
                  <CButton
                    color="danger"
                    variant="ghost"
                    onClick={() => handleClick(selectedBranch?.id)}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CModalFooter>
              </CModal>
            </CRow>

{/* <CAccordion>
  {paginatedData.length > 0 ? (
    paginatedData.map((branch, index) => (
      <CAccordionItem key={index} itemKey={index}>
        <CAccordionHeader>
          Branch #{branch.branchCode}
        </CAccordionHeader>
        <CAccordionBody>
          <p><strong>Branch Name:</strong> {branch.branchName}</p>
          <p><strong>Branch Address:</strong> {branch.branchAddress}</p>
          <p><strong>City:</strong> {branch.city}</p>
          <p><strong>Contact Number:</strong> {branch.contactNumber}</p>

          <div className="d-flex justify-content-between">
            <Link to={`/branch/updateBranch?id=${branch.id}`}>
              <CButton color="primary" size="sm" variant="ghost">
                <CIcon icon={cilPencil} />
              </CButton>
            </Link>
            <CButton
              color="danger"
              size="sm"
              variant="ghost"
              onClick={() => handleClick(branch.id)}
            >
              <CIcon icon={cilTrash} />
            </CButton>
          </div>
        </CAccordionBody>
      </CAccordionItem>
    ))
  ) : (
    <p>No branches available</p>
  )}
</CAccordion> */}

            {/* Collapsible Table */}
            {/* <CCollapse visible={isTableVisible}>
              <CRow className="mb-3">
                <CTable className="table" bordered hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Branch Code</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Branch Address</CTableHeaderCell>
                      <CTableHeaderCell scope="col">City</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((branch, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
                          <CTableDataCell>{branch.branchCode}</CTableDataCell>
                          <CTableDataCell>{branch.branchName}</CTableDataCell>
                          <CTableDataCell>{branch.branchAddress}</CTableDataCell>
                          <CTableDataCell>{branch.city}</CTableDataCell>
                          <CTableDataCell>{branch.contactNumber}</CTableDataCell>
                          <CTableDataCell className="d-grid gap-2 d-md-flex">
                            <Link to={`/branch/updateBranch?id=${branch.id}`}>
                              <CButton color="primary" size="sm" variant="ghost" className="me-md-2">
                                <CIcon icon={cilPencil} />
                              </CButton>
                            </Link>
                            <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(branch.id)}>
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7">
                          <CImage rounded src={NFB} width={300} height={300} align="center" />
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
            </CCollapse> */}            

            {/* Offcanvas for the table */}
            <COffcanvas placement="top" visible={isOffcanvasVisible} onHide={() => setIsOffcanvasVisible(false)}>
              <COffcanvasHeader>
                <h5>Branch Details</h5>
                {/* <CButton color="secondary" size="sm" onClick={handleToggleOffcanvas}>
                  Close
                </CButton> */}
                <CCloseButton className="text-reset" onClick={() => setIsOffcanvasVisible(false)} />
              </COffcanvasHeader>
              <COffcanvasBody>
                <CRow className="mb-3">
                  <CTable className="table" bordered hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Code</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Address</CTableHeaderCell>
                        <CTableHeaderCell scope="col">City</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((branch, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{(page - 1) * limit + index + 1}</CTableDataCell>
                            <CTableDataCell>{branch.branchCode}</CTableDataCell>
                            <CTableDataCell>{branch.branchName}</CTableDataCell>
                            <CTableDataCell>{branch.branchAddress}</CTableDataCell>
                            <CTableDataCell>{branch.city}</CTableDataCell>
                            <CTableDataCell>{branch.contactNumber}</CTableDataCell>
                            <CTableDataCell className="d-grid gap-2 d-md-flex">
                              <Link to={`/branch/updateBranch?id=${branch.id}`}>
                                <CButton color="primary" size="sm" variant="ghost" className="me-md-2">
                                  <CIcon icon={cilPencil} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(branch.id)}>
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan="7">
                            <CImage rounded src={NFB} width={300} height={300} align="center" />
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                </CRow>
              </COffcanvasBody>
            </COffcanvas>

            {/* { limit >= 1 ? 
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
          : null } */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
