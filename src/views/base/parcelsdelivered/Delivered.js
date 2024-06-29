import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
  CLink,
  CButton,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CTableHeaderCell,
  CTableRow,
  CTableHead,
  CTable,
  CTableBody,
  CContainer,
} from '@coreui/react'
import { DocsExample } from '../../../components'

const Navs = () => {

  const [data, setData] = useState([])

  return (
    <CCard className='mb-4'>
      <CCardHeader>
        <strong>Parcel List</strong>
      </CCardHeader>
      <CCardBody>
        <CContainer className='py-3'>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton href='' className='me-md-2' color='primary' variant='outline'>+AddNew</CButton>
          </div>
        </CContainer>
        <CRow className=''>
          <CCol >
            <div className=''>
              <label>
                Show
                <input type='number' className='w-25'/>
                entries
              </label>
            </div>
          </CCol>

          <CCol >
            <div className=''>
              <label>Search: </label>
                <input type='text' className='w-50'/>
            </div>
          </CCol>
        </CRow>

        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope='col'>#</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Reference Number</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Sender Name</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Recipient Name</CTableHeaderCell>
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
                  <CLink to={`/read?id=${parcel.referenceNumber}`} className='btn btn-success rounded-0'>view</CLink>
                  <CLink to={`/edit?id=${parcel.referenceNumber}`} className='btn btn-primary rounded-0'>Edit</CLink>
                  <CButton onClick={(referenceNumber) => alert('Successfully Deleted')} className='btn btn-danger rounded-0'>Delete</CButton>
                </CTableDataCell>
              </CTableRow>
            })}          
          </CTableBody>
        </CTable>
        <CPagination align='end' aria-label='Page navigation'>
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
    // <CRow>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Tabs</strong>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           The basic React tabs example uses the <code>variant=&#34;tabs&#34;</code> props to
    //           generate a tabbed interface.
    //         </p>
    //         <DocsExample href="components/tabs/#example">
    //           <CTabs activeItemKey="profile">
    //             <CTabList variant="tabs">
    //               <CTab itemKey="home">Home</CTab>
    //               <CTab itemKey="profile">Profile</CTab>
    //               <CTab itemKey="contact">Contact</CTab>
    //               <CTab disabled itemKey="disabled">
    //                 Disabled
    //               </CTab>
    //             </CTabList>
    //             <CTabContent>
    //               <CTabPanel className="p-3" itemKey="home">
    //                 Home tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" itemKey="profile">
    //                 Profile tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" itemKey="contact">
    //                 Contact tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" itemKey="disabled">
    //                 Disabled tab content
    //               </CTabPanel>
    //             </CTabContent>
    //           </CTabs>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Tabs</strong> <small>Unstyled</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           If you don’t provide the <code>variant</code> prop, the component will default to a
    //           basic style.
    //         </p>
    //         <DocsExample href="components/tabs/#unstyled">
    //           <CTabs activeItemKey="profile">
    //             <CTabList>
    //               <CTab itemKey="home">Home</CTab>
    //               <CTab itemKey="profile">Profile</CTab>
    //               <CTab itemKey="contact">Contact</CTab>
    //               <CTab disabled itemKey="disabled">
    //                 Disabled
    //               </CTab>
    //             </CTabList>
    //             <CTabContent>
    //               <CTabPanel className="p-3" itemKey="home">
    //                 Home tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" itemKey="profile">
    //                 Profile tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" itemKey="contact">
    //                 Contact tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" itemKey="disabled">
    //                 Disabled tab content
    //               </CTabPanel>
    //             </CTabContent>
    //           </CTabs>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Tabs</strong> <small>Pills</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Take that same code, but use <code>variant=&#34;pills&#34;</code> instead:
    //         </p>
    //         <DocsExample href="components/tabs/#unstyled">
    //           <CTabs activeItemKey={2}>
    //             <CTabList variant="pills">
    //               <CTab aria-controls="home-tab-pane" itemKey={1}>
    //                 Home
    //               </CTab>
    //               <CTab aria-controls="profile-tab-pane" itemKey={2}>
    //                 Profile
    //               </CTab>
    //               <CTab aria-controls="contact-tab-pane" itemKey={3}>
    //                 Contact
    //               </CTab>
    //               <CTab aria-controls="disabled-tab-pane" disabled itemKey={4}>
    //                 Disabled
    //               </CTab>
    //             </CTabList>
    //             <CTabContent>
    //               <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={1}>
    //                 Home tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" aria-labelledby="profile-tab-pane" itemKey={2}>
    //                 Profile tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" aria-labelledby="contact-tab-pane" itemKey={3}>
    //                 Contact tab content
    //               </CTabPanel>
    //               <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={4}>
    //                 Disabled tab content
    //               </CTabPanel>
    //             </CTabContent>
    //           </CTabs>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Tabs</strong> <small>Underline</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Take that same code, but use <code>variant=&#34;underline&#34;</code> instead:
    //         </p>
    //         <DocsExample href="components/tabs/#unstyled">
    //           <CTabs activeItemKey={2}>
    //             <CTabList variant="underline">
    //               <CTab aria-controls="home-tab-pane" itemKey={1}>
    //                 Home
    //               </CTab>
    //               <CTab aria-controls="profile-tab-pane" itemKey={2}>
    //                 Profile
    //               </CTab>
    //               <CTab aria-controls="contact-tab-pane" itemKey={3}>
    //                 Contact
    //               </CTab>
    //               <CTab aria-controls="disabled-tab-pane" disabled itemKey={4}>
    //                 Disabled
    //               </CTab>
    //             </CTabList>
    //             <CTabContent>
    //               <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
    //                 Home tab content
    //               </CTabPanel>
    //               <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
    //                 Profile tab content
    //               </CTabPanel>
    //               <CTabPanel className="py-3" aria-labelledby="contact-tab-pane" itemKey={3}>
    //                 Contact tab content
    //               </CTabPanel>
    //               <CTabPanel className="py-3" aria-labelledby="disabled-tab-pane" itemKey={4}>
    //                 Disabled tab content
    //               </CTabPanel>
    //             </CTabContent>
    //           </CTabs>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Tabs</strong> <small>Underline border</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Take that same code, but use <code>variant=&#34;underline-border&#34;</code> instead:
    //         </p>
    //         <DocsExample href="components/tabs/#unstyled">
    //           <CTabs activeItemKey={2}>
    //             <CTabList variant="underline-border">
    //               <CTab aria-controls="home-tab-pane" itemKey={1}>
    //                 Home
    //               </CTab>
    //               <CTab aria-controls="profile-tab-pane" itemKey={2}>
    //                 Profile
    //               </CTab>
    //               <CTab aria-controls="contact-tab-pane" itemKey={3}>
    //                 Contact
    //               </CTab>
    //               <CTab aria-controls="disabled-tab-pane" disabled itemKey={4}>
    //                 Disabled
    //               </CTab>
    //             </CTabList>
    //             <CTabContent>
    //               <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
    //                 Home tab content
    //               </CTabPanel>
    //               <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
    //                 Profile tab content
    //               </CTabPanel>
    //               <CTabPanel className="py-3" aria-labelledby="contact-tab-pane" itemKey={3}>
    //                 Contact tab content
    //               </CTabPanel>
    //               <CTabPanel className="py-3" aria-labelledby="disabled-tab-pane" itemKey={4}>
    //                 Disabled tab content
    //               </CTabPanel>
    //             </CTabContent>
    //           </CTabs>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default Navs
