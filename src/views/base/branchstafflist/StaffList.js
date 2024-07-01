import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCol,
  CLink,
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
import { DocsExample } from '../../../components'

import AngularImg from '../../../assets/images/angular.jpg'
import ReactImg from '../../../assets/images/react.jpg'
import VueImg from '../../../assets/images/vue.jpg'
import { Link } from 'react-router-dom'

const slidesLight = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23AAA%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23F5F5F5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23BBB%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23E5E5E5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
]

const StaffList = () => {

  const [data, setData] = useState([])

  const handleClick = (id) => {
      alert('Successfully Deleted')
  }

  return (
    // <div>
    // <h3>Staff List</h3>
    // <div>
    //     <div>
    //         <div className='d-flex justify-content-end'>
    //         <Link to='/' className='btn btn-sm btn-primary'>+ Add New</Link>
    //         </div>
    //         <label> Show <input type='number' className='w-25'/> entries </label>
    //         <label> Search: <input type='text'/></label>

    //         <table className='table'>
    //             <thead>
    //                 <tr>
    //                     <th> Id </th>
    //                     <th> Staff </th>
    //                     <th> Email </th>
    //                     <th> Branch </th>
    //                     <th> Action </th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {data.map((staff, index) => {
    //                     return <tr key={index}>
    //                         <td> {index+1} </td>
    //                         <td> {staff.name} </td>
    //                         <td> {staff.email} </td>
    //                         <td> {staff.branch} </td>
    //                         <td>
    //                             <Link to={`/edit?id=${staff.id}`} className='bi bi-pencil-square btn btn-sm btn-primary'/>
    //                             <button className='bi bi-trash-fill btn btn-sm btn-danger' onClick={() => handleClick(staff.id)}/>
    //                         </td>
    //                     </tr>
    //                 })}
    //             </tbody>
    //         </table>
    //         <text>Showing {``} to {``} of {} entries</text>
    //         <button>Previous</button>
    //         <button>Next</button>
    //     </div>
    // </div>
    // </div>

    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Staff List</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              {/* <CLink to='/' className='d-flex justify-content-end btn btn-sm btn-primary'>+AddNew</CLink> */}
              <div className='d-flex justify-content-end'>
                  <Link to='/branch_staff/new_branchstaff' className='btn btn-sm btn-primary'>Add New</Link>
              </div>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <label> Show <input type='number' className='w-25'/> entries </label>
              </CCol>
              <CCol md={6}>
                <label> Search: <input type='text'/></label>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Staff Name</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Email</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Branch</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Telephone Number</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {data.map((staff, index) => {
                  return <CTableRow key={index}>
                      <CTableDataCell> {index+1} </CTableDataCell>
                      <CTableDataCell> {staff.name} </CTableDataCell>
                      <CTableDataCell> {staff.email} </CTableDataCell>
                      <CTableDataCell> {staff.branch} </CTableDataCell>
                      <CTableDataCell> {staff.telephoneNo} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/edit?id=${staff.id}`} className='bi bi-pencil-square btn btn-sm btn-primary'/>
                          <CButton className='bi bi-trash-fill btn btn-sm btn-danger' onClick={() => handleClick(staff.id)}/>
                      </CTableDataCell>
                    </CTableRow>
                  })}
                </CTableBody>
              </CTable>
            </CRow>
            
            <CRow>
              <CPagination align='end' aria-label='Page navigation'>
                <CPaginationItem>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    // <CRow>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>Carousel</strong> <small>Slide only</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">Here’s a carousel with slides</p>
    //         <DocsExample href="components/carousel">
    //           <CCarousel>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={ReactImg} alt="slide 1" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={AngularImg} alt="slide 2" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={VueImg} alt="slide 3" />
    //             </CCarouselItem>
    //           </CCarousel>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>Carousel</strong> <small>With controls</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Adding in the previous and next controls by <code>controls</code> property.
    //         </p>
    //         <DocsExample href="components/carousel/#with-controls">
    //           <CCarousel controls>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={ReactImg} alt="slide 1" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={AngularImg} alt="slide 2" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={VueImg} alt="slide 3" />
    //             </CCarouselItem>
    //           </CCarousel>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>Carousel</strong> <small>With indicators</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           You can attach the indicators to the carousel, lengthwise the controls, too.
    //         </p>
    //         <DocsExample href="components/carousel/#with-indicators">
    //           <CCarousel controls indicators>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={ReactImg} alt="slide 1" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={AngularImg} alt="slide 2" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={VueImg} alt="slide 3" />
    //             </CCarouselItem>
    //           </CCarousel>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>Carousel</strong> <small>With captions</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           You can add captions to slides with the <code>&lt;CCarouselCaption&gt;</code> element
    //           within any <code>&lt;CCarouselItem&gt;</code>. They can be immediately hidden on
    //           smaller viewports, as shown below, with optional{' '}
    //           <a href="https://coreui.io//utilities/display">display utilities</a>. We hide them
    //           with <code>.d-none</code> and draw them back on medium-sized devices with{' '}
    //           <code>.d-md-block</code>.
    //         </p>
    //         <DocsExample href="components/carousel/#with-captions">
    //           <CCarousel controls indicators>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={ReactImg} alt="slide 1" />
    //               <CCarouselCaption className="d-none d-md-block">
    //                 <h5>First slide label</h5>
    //                 <p>Some representative placeholder content for the first slide.</p>
    //               </CCarouselCaption>
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={AngularImg} alt="slide 2" />
    //               <CCarouselCaption className="d-none d-md-block">
    //                 <h5>Second slide label</h5>
    //                 <p>Some representative placeholder content for the first slide.</p>
    //               </CCarouselCaption>
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={VueImg} alt="slide 3" />
    //               <CCarouselCaption className="d-none d-md-block">
    //                 <h5>Third slide label</h5>
    //                 <p>Some representative placeholder content for the first slide.</p>
    //               </CCarouselCaption>
    //             </CCarouselItem>
    //           </CCarousel>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>Carousel</strong> <small>Crossfade</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Add <code>transition=&#34;crossfade&#34;</code> to your carousel to animate slides
    //           with a fade transition instead of a slide.
    //         </p>
    //         <DocsExample href="components/carousel/#crossfade">
    //           <CCarousel controls transition="crossfade">
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={ReactImg} alt="slide 1" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={AngularImg} alt="slide 2" />
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={VueImg} alt="slide 3" />
    //             </CCarouselItem>
    //           </CCarousel>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>Carousel</strong> <small>Dark variant</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Add <code>dark</code> property to the <code>CCarousel</code> for darker controls,
    //           indicators, and captions. Controls have been inverted from their default white fill
    //           with the <code>filter</code> CSS property. Captions and controls have additional Sass
    //           variables that customize the <code>color</code> and <code>background-color</code>.
    //         </p>
    //         <DocsExample href="components/carousel/#dark-variant">
    //           <CCarousel controls indicators dark>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={slidesLight[0]} alt="slide 1" />
    //               <CCarouselCaption className="d-none d-md-block">
    //                 <h5>First slide label</h5>
    //                 <p>Some representative placeholder content for the first slide.</p>
    //               </CCarouselCaption>
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={slidesLight[1]} alt="slide 2" />
    //               <CCarouselCaption className="d-none d-md-block">
    //                 <h5>Second slide label</h5>
    //                 <p>Some representative placeholder content for the first slide.</p>
    //               </CCarouselCaption>
    //             </CCarouselItem>
    //             <CCarouselItem>
    //               <img className="d-block w-100" src={slidesLight[2]} alt="slide 3" />
    //               <CCarouselCaption className="d-none d-md-block">
    //                 <h5>Third slide label</h5>
    //                 <p>Some representative placeholder content for the first slide.</p>
    //               </CCarouselCaption>
    //             </CCarouselItem>
    //           </CCarousel>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default StaffList
