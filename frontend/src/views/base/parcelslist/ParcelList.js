import React, { useEffect, useState } from 'react'
import { 
  CButton,
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CContainer, 
  CLink, 
  CRow, 
  CTable, 
  CTableBody, 
  CTableDataCell, 
  CTableHead, 
  CTableHeaderCell, 
  CTableRow, 
  CPagination,
  CPaginationItem,
  CBadge, } from '@coreui/react'
  import { CSmartTable } from '@coreui/react-pro';
  import axios from 'axios'
import { DocsLink } from '../../../components'
import { cilEyedropper, cilDelete, cilNote, cilTrash, cilViewStream, cilViewQuilt, cilPencil, cilCamera } from '@coreui/icons'
import CIcon  from '@coreui/icons-react'
import { reference } from '@popperjs/core';

const ParcelList = () => {

  const [data, setData] = useState([])

  const [loading,setLoading] = useState()

  const columns = [
    {
      key: 'Id',
      _style: {minWidth: '10px'},
    },
    {
      key: 'Reference Number',
      _style: {minWidth: '10px'},
    },
    {
      key: 'Sender Name',
      _style: {minWidth: '10px'},
    },
    {
      key: 'Recipient Name',
      _style: {minWidth: '10px'},
    },
    {
      key: 'Status',
      _style: {minWidth: '100px'},
    },
    {
      key: 'Action',
      _style: {minWidth: '10px'},
    },
  ]

  // const userData = [
  //   {
  //     id: 1,
  //     ReferenceNumber: 4738206837,
  //     SenderName: 'Thulasi',
  //     RecipientName: 'Lava',
  //     Status: 'Delivered',

  //   }
  // ]

  const getData = useEffect(() => {
    setLoading(true)
    // fetch('https://apitest.coreui.io/fake_data/users.json')
    // axios('http://localhost:3000/#/parcels/parcel_list',{
    //   method:'get'
    // })
    // .then((response) => response.json())
      // .then((result) => {
      //   setData(result)
      //   setLoading(false)
      // })
  }, [])

  const getStatus = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success'
      case 'Unsuccessfull Delivery Attempt':
        return 'danger'
      case 'Collected':
        return 'primary'
      case 'Item Accepted by Courier':
        return 'info'
      default:
        return 'warning'
    }
  }

  return (
    <CRow>
      <CCard className='mb-4'>
        <CCardHeader>
          <strong>Parcel List</strong>
        </CCardHeader>
        <CCardBody>
          <CContainer className='py-3'>
            <CRow>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton href='/parcels/new_parcels' className='me-md-2' color='primary' variant='outline'>AddNew</CButton>
              </div>
            </CRow>
          </CContainer>

          <CRow className="justify-content-around">
            <CCol xs={4}>
              <label>
                Show
                <input type='number' className='w-25'/>
                entries
              </label>
            </CCol>

            <CCol xs={4}>
              <label>Search: </label>
                <input type='text' className='w-50'/>
            </CCol>
          </CRow>


          {/* <CSmartTable
          columns={columns}
          columnFilter
          columnSorter
          // footer
          items={data}
          itemsPerPageSelect
          // loading={loading}
          pagination
          tableProps={{
            hover: true,
            responsive: true,
          }}
          scopedColumns={{
            status: (item) => (
              <td>
                <CBadge shape='rounded-pill' color={getStatus(item.status)}>{item.status}</CBadge>
              </td>
            ),
            action: (item) => {
              return(
                <td className='py-2'>
                  <CButton
                  color='success'
                  type='Read'
                  size='sm'
                  shape='rounded-0'
                  onClick={() => {

                  }}
                  >
                    <CIcon icon={cilCamera}/>
                  </CButton>
                  
                  <CButton
                  color='info'
                  size='sm'
                  type='Edit'
                  shape='rounded-0'
                  onClick={() => {

                  }}
                  >
                    <CIcon icon={cilPencil}/>
                  </CButton>

                  <CButton 
                  color='danger'
                  size='sm'
                  type='Delete'
                  shape='rounded-0'
                  onClick={() => {

                  }}
                  >
                    <CIcon icon={cilTrash}/>
                  </CButton>
                </td>
              )
            }
          }}
          /> */}

        {/* <CTable columns={columns}/> */}

          <CRow className="justify-content-center">
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>No</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Reference Number</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Sender Name</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Sender Date</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Recipient Name</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Recipient Date</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((parcel,index) => {
                  return <CTableRow key={index}>
                    <CTableDataCell> {index+1} </CTableDataCell>
                    <CTableDataCell> {parcel.referenceNumber} </CTableDataCell>
                    <CTableDataCell> {parcel.senderName} </CTableDataCell>
                    <CTableDataCell> {parcel.recipientName} </CTableDataCell>
                    <CTableDataCell> {parcel.status} </CTableDataCell>
                    <CTableDataCell> 
                      <CLink to={`/read?id=${parcel.referenceNumber}`} className='btn btn-success rounded-0'>
                        <CIcon icon={cilCamera} size='sm'/>view
                      </CLink>
                      <CLink to={`/edit?id=${parcel.referenceNumber}`} className='btn btn-primary rounded-0'>
                        <CIcon icon={cilPencil} size='sm'/>Edit
                      </CLink>
                      <CButton onClick={(referenceNumber) => alert('Successfully Deleted')} className='btn btn-danger rounded-0'>
                        <CIcon icon={cilTrash} size='sm'/>Delete
                        </CButton>
                    </CTableDataCell>
                  </CTableRow>
                })}          
              </CTableBody>
            </CTable>
          </CRow>

          <CRow className="justify-content-end">          
            <CPagination align='end' aria-label='Page navigation'>
              <CPaginationItem>Previous</CPaginationItem>
              <CPaginationItem>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination>
          </CRow>
        </CCardBody>
      </CCard>
    </CRow>
      // {/* <CCard className="mb-4">
      //   <CCardHeader>
      //     Jumbotron
      //     <DocsLink name="CJumbotron" />
      //   </CCardHeader>
      //   <CCardBody>
      //     <CContainer className="py-5" fluid>
      //       <h1 className="display-5 fw-bold">Custom jumbotron</h1>
      //       <p className="col-md-8 fs-4">
      //         Using a series of utilities, you can create this jumbotron, just like the one in
      //         previous versions of Bootstrap. Check out the examples below for how you can remix and
      //         restyle it to your liking.
      //       </p>
      //       <CButton color="primary" size="lg">
      //         Example button
      //       </CButton>
      //     </CContainer>
      //     <CRow className="align-items-md-stretch">
      //       <CCol md={6}>
      //         <div className="h-100 p-5 text-white bg-dark rounded-3">
      //           <h2>Change the background</h2>
      //           <p>
      //             Swap the background-color utility and add a `.text-*` color utility to mix up the
      //             jumbotron look. Then, mix and match with additional component themes and more.
      //           </p>
      //           <CButton color="light" variant="outline">
      //             DocsExample button
      //           </CButton>
      //         </div>
      //       </CCol>
      //       <CCol md={6}>
      //         <div className="h-100 p-5 bg-light border rounded-3">
      //           <h2>Add borders</h2>
      //           <p>
      //             Or, keep it light and add a border for some added definition to the boundaries of
      //             your content. Be sure to look under the hood at the source HTML here as we&#39;ve
      //             adjusted the alignment and sizing of both column&#39;s content for equal-height.
      //           </p>
      //           <CButton color="secondary" variant="outline">
      //             DocsExample button
      //           </CButton>
      //         </div>
      //       </CCol>
      //     </CRow>
      //   </CCardBody>
      // </CCard> */}
  )
}

export default ParcelList
