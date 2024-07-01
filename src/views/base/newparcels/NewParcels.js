import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CHeader, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { DocsExample } from '../../../components'

const NewParcels = () => {
  const [visible, setVisible] = useState(false)
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  return (
    <CRow>
      <CCol>
        <CHeader>
          <strong>New Parcel</strong>
        </CHeader>
        <CCard className='mb-4'>
          <CCardHeader>
            <div className='row'>
              <div className='col'>
                <strong>Sender Information</strong>
              </div>
              <div className='col'>
                <strong>Recipient Information</strong>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <div className='row'>
              <div className='col'>
                <label>Name</label>
                <input className='w-100'/>
              </div>
              <div className='col'>
                <label>Name</label>
                <input className='w-100'/>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <label>Address</label>
                <input className='w-100'/>
              </div>
              <div className='col'>
                <label>Address</label>
                <input className='w-100'/>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <label>Contact </label>
                <input className='w-100'/>
              </div>
              <div className='col'>
                <label>Contact </label>
                <input className='w-100'/>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <text>Type</text>
              </div>
              <div className='col'>
                <label>Branch Processed</label>
                <select className='form-select' aria-label='default select'>
                  <option selected>Please select here</option>
                  <option value='Jaffna'>Jaffna</option>
                  <option value='Kandy'>Kandy</option>
                  <option value='Mannar'>Mannar</option>
                  <option value='Galle'>Galle</option>
                  <option value='Trinco'>Trinco</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <text></text>
              </div>
              <div className='col'>
                <label>Pickup Branch</label>
                <select className='form-select' aria-label='default select'>
                  <option selected>Please select here</option>
                  <option value='Jaffna'>Jaffna</option>
                  <option value='Kandy'>Kandy</option>
                  <option value='Mannar'>Mannar</option>
                  <option value='Galle'>Galle</option>
                  <option value='Trinco'>Trinco</option>
                </select>
              </div>
            </div>

            <div>
              <p className='font-monospace'>Parcel Details</p>
              <CTable bordered>
                <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>weight</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Height</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Delivery Charge</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Total Amount</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Due Amount</CTableHeaderCell>
                </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell><input/></CTableDataCell>
                    <CTableDataCell><input/></CTableDataCell>
                    <CTableDataCell><input/></CTableDataCell>
                    <CTableDataCell><input/></CTableDataCell>
                    <CTableDataCell><input/></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell >Total</CTableDataCell>
                    <CTableDataCell>value</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <CButton href='' color='primary' className='me-md-2'>Add Item</CButton>
            </div>
          </CCardBody>

          <div className='d-grid gap-2 mx-auto'>
            <span>
              <CButton href='' color='primary' className='me-md-2'>Save</CButton>
              <CButton href='' color='secondary' className='me-md-2'>Cancel</CButton>
            </span>
          </div>

        </CCard>
      </CCol>
    </CRow>

    // <CRow>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Collapse</strong>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">You can use a link or a button component.</p>
    //         <DocsExample href="components/collapse">
    //           <CButton
    //             color="primary"
    //             href="#"
    //             onClick={(e) => {
    //               e.preventDefault()
    //               setVisible(!visible)
    //             }}
    //           >
    //             Link
    //           </CButton>
    //           <CButton color="primary" onClick={() => setVisible(!visible)}>
    //             Button
    //           </CButton>
    //           <CCollapse visible={visible}>
    //             <CCard className="mt-3">
    //               <CCardBody>
    //                 Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
    //                 richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
    //                 anderson cred nesciunt sapiente ea proident.
    //               </CCardBody>
    //             </CCard>
    //           </CCollapse>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Collapse</strong> <small> Horizontal</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">You can use a link or a button component.</p>
    //         <DocsExample href="components/collapse#horizontal">
    //           <CButton
    //             className="mb-3"
    //             color="primary"
    //             onClick={() => setVisibleHorizontal(!visibleHorizontal)}
    //             aria-expanded={visibleHorizontal}
    //             aria-controls="collapseWidthExample"
    //           >
    //             Button
    //           </CButton>
    //           <div style={{ minHeight: '120px' }}>
    //             <CCollapse id="collapseWidthExample" horizontal visible={visibleHorizontal}>
    //               <CCard style={{ width: '300px' }}>
    //                 <CCardBody>
    //                   This is some placeholder content for a horizontal collapse. It&#39;s hidden by
    //                   default and shown when triggered.
    //                 </CCardBody>
    //               </CCard>
    //             </CCollapse>
    //           </div>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Collapse</strong> <small> multi target</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           A <code>&lt;CButton&gt;</code> can show and hide multiple elements.
    //         </p>
    //         <DocsExample href="components/collapse#multiple-targets">
    //           <CButton color="primary" onClick={() => setVisibleA(!visibleA)}>
    //             Toggle first element
    //           </CButton>
    //           <CButton color="primary" onClick={() => setVisibleB(!visibleB)}>
    //             Toggle second element
    //           </CButton>
    //           <CButton
    //             color="primary"
    //             onClick={() => {
    //               setVisibleA(!visibleA)
    //               setVisibleB(!visibleB)
    //             }}
    //           >
    //             Toggle both elements
    //           </CButton>
    //           <CRow>
    //             <CCol xs={6}>
    //               <CCollapse visible={visibleA}>
    //                 <CCard className="mt-3">
    //                   <CCardBody>
    //                     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
    //                     richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
    //                     anderson cred nesciunt sapiente ea proident.
    //                   </CCardBody>
    //                 </CCard>
    //               </CCollapse>
    //             </CCol>
    //             <CCol xs={6}>
    //               <CCollapse visible={visibleB}>
    //                 <CCard className="mt-3">
    //                   <CCardBody>
    //                     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
    //                     richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
    //                     anderson cred nesciunt sapiente ea proident.
    //                   </CCardBody>
    //                 </CCard>
    //               </CCollapse>
    //             </CCol>
    //           </CRow>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default NewParcels
