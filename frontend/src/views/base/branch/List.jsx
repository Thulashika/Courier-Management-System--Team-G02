import React, { useContext, useEffect, useState } from 'react'
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
  CImage,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CModal,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasBody,
  CCloseButton,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NFB from '../../../assets/images/NoData.png'
import { AuthContext } from '../../pages/register/AuthProvider'
import addImage from '../../../assets/images/add.gif'
import tableImage from '../../../assets/images/table.gif'
import editIcon from '../../../assets/images/pencil.gif'
import delIcon from '../../../assets/images/trash-bin.gif'
import viewImage from '../../../assets/images/search.gif'

const List = () => {

  const [data,setData] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalBranches, setTotalBranches] = useState(0);
  const [search, setSearch] = useState('');

  const { userDetails } = useContext(AuthContext);

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

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalBranches / limit);

  const [expandedRows, setExpandedRows] = useState([]); 

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index)); 
    } else {
      setExpandedRows([...expandedRows, index]); 
    }
  };

  const [isTableVisible, setIsTableVisible] = useState(true); 

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible); 
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
                  <CImage src={tableImage} height={25} width={25}/>
                  Show Branches
                </CButton>
              </CCol>
              <CCol>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton href='/branch/new_branch' className='me-md-2' color='primary' variant='outline'>
                    <CImage src={addImage} height={25} width={25}/>
                    {'  '}
                    AddNew
                  </CButton>
                </div>
              </CCol>
            </CRow>

            <CRow>
              {paginatedData.length > 0 ? (
                paginatedData.map((branch, index) => (
                  <CCol sm="6" key={index}>
                    <div
                      style={{
                        padding: '20px',
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
                        <CImage src={viewImage} width={25} height={25}/>
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
              <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
                <CModalHeader onClose={() => setVisibleModal(false)}>
                  Branch Details
                </CModalHeader>
                {selectedBranch && (() => {
                  const hasAccess = userDetails.position === 'ADMIN' || 
                                    (userDetails.position === 'MANAGER' && userDetails.branchCode === selectedBranch.branchCode);

                  return hasAccess ? (
                    <>
                      <CModalBody>
                        <p><strong>Branch Code:</strong> {selectedBranch.branchCode}</p>
                        <p><strong>Branch Name:</strong> {selectedBranch.branchName}</p>
                        <p><strong>Branch Address:</strong> {selectedBranch.branchAddress}</p>
                        <p><strong>City:</strong> {selectedBranch.city}</p>
                        <p><strong>Contact Number:</strong> {selectedBranch.contactNumber}</p>
                      </CModalBody>
                      <CModalFooter>
                        <Link to={`/branch/updateBranch?id=${selectedBranch?.id}`}>
                          <CButton color="primary" variant="ghost">
                            <CImage src={editIcon} alt='view' height={25} width={25} />
                          </CButton>
                        </Link>
                        <CButton
                          color="danger"
                          variant="ghost"
                          onClick={() => handleClick(selectedBranch?.id)}
                        >
                          <CImage src={delIcon} alt='view' height={25} width={25} />
                        </CButton>
                      </CModalFooter>
                    </>
                  ) : (
                    <CModalBody>
                      <p>You do not have access to view details of this branch.</p>
                    </CModalBody>
                  );
                })()}
              </CModal>
            </CRow>


            <COffcanvas placement="top" visible={isOffcanvasVisible} onHide={() => setIsOffcanvasVisible(false)}>
              <COffcanvasHeader>
                <h5>Branch Details</h5>
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
                         paginatedData
                         .filter((branch) => {
                           if (userDetails.position === 'ADMIN') {
                             return true;
                           } else {
                             if(userDetails.position === 'MANAGER')
                               return (branch.branchCode === userDetails.branchCode)
                           }
                         })
                        .map((branch, index) => (
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
                                  <CImage src={editIcon} alt='view' height={25} width={25} />
                                </CButton>
                              </Link>
                              <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(branch.id)}>
                                <CImage src={delIcon} alt='view' height={25} width={25} />
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
