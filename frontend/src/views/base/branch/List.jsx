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

  return (

    <CRow>
      <CCol>
        <CCard className='mb-4'>
          <CHeader>
            <strong>Branch List</strong>
            </CHeader>
          <CCardBody>
            <CRow className="mb-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton href='/branch/new_branch' className='me-md-2' color='primary' variant='outline'>AddNew</CButton>
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
            </CRow>

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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
