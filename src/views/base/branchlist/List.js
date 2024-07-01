import React, { useState } from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
  CHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CFormLabel,
  CTableDataCell,
} from '@coreui/react'
import { DocsExample } from '../../../components'
import { Link } from 'react-router-dom'
import { data } from 'autoprefixer'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const List = () => {

  const [data,setData] = useState([])

  const handleClick = (code) => {
    alert('Successfully Deleted')
  }

  return (

//     <div>
//     <h3>Branch List</h3>
//     <div>
//       <div>
//         <div className='d-flex justify-content-end'>
//           <Link to='/create' className='btn btn-sm btn-primary'>+ Add New</Link>
//         </div>

//         <label> Show <input type='number' className='w-25'/></label>
       
//         <label>Search: <input type='text'/> </label>

//         <table className='table'>
//           <thead>
//             <tr>
//               <th> # </th>
//               <th> Branch Code </th>
//               <th> Branch Address </th>
//               <th> City </th>
//               <th> Country </th>
//               <th> Contact # </th>
//               <th> Action </th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((branch, index) => {
//               return <tr key={index}>
//                 <td>{index +1}</td>
//                 <td>{branch.code}</td>
//                 <td>{branch.address}</td>
//                 <td>{branch.city}</td>
//                 <td>{branch.country}</td>
//                 <td>{branch.contact}</td>
//                 <td>
//                   <Link to={`/edit?id=${branch.code}`} className='bi bi-pencil-square btn btn-sm btn-primary'/>
//                   <button className='bi bi-trash-fill btn btn-sm btn-danger' onClick={() => handleClick(branch.code)}/>
//                 </td>
//               </tr>
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
// </div>

    <CRow>
      <CCol>
        <CCard>
          <CHeader>
            <strong>Branch List</strong>
            </CHeader>
          <CCardBody>
            <CRow className="mb-3">
              <div className='d-flex justify-content-end'>
                <Link to='/branch/new_branch' className='btn btn-sm btn-primary'>Add New</Link>
              </div>
            </CRow>

            <CRow className="mb-3">
              <CCol sm={6}>
                <label> Show <input type='number' className='w-25'/></label>
              </CCol>
              <CCol sm={6}>
                <label>Search: <input type='text'/> </label>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Branch Code</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Branch Address</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>City</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Country</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Contact Number</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((branch, index) => {
                      <CTableRow key={index}>
                      <CTableDataCell>{index+1}</CTableDataCell>
                      <CTableDataCell>{branch.code}</CTableDataCell>
                      <CTableDataCell>{branch.address}</CTableDataCell>
                      <CTableDataCell>{branch.city}</CTableDataCell>
                      <CTableDataCell>{branch.country}</CTableDataCell>
                      <CTableDataCell>{branch.contact}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/edit?id=${branch.code}`}>
                        <CButton color='primary' size='sm'>
                          <CIcon content={cilPencil}/>
                        </CButton>
                        </Link>
                        <CButton
                        color='danger'
                        size='sm'
                        onClick={() => handleClick(branch.code)}>
                          <CIcon content={cilTrash}/>
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  })}
                </CTableBody>
              </CTable>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    // <CRow>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Breadcrumb</strong>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           The breadcrumb navigation provides links back to each previous page the user navigated
    //           through and shows the current location in a website or an application. You don’t have
    //           to add separators, because they automatically added in CSS through{' '}
    //           <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before">
    //             {' '}
    //             <code>::before</code>
    //           </a>{' '}
    //           and{' '}
    //           <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content">
    //             {' '}
    //             <code>content</code>
    //           </a>
    //           .
    //         </p>
    //         <DocsExample href="components/breadcrumb">
    //           <CBreadcrumb>
    //             <CBreadcrumbItem>
    //               <CLink href="#">Home</CLink>
    //             </CBreadcrumbItem>
    //             <CBreadcrumbItem active>Library</CBreadcrumbItem>
    //           </CBreadcrumb>
    //           <CBreadcrumb>
    //             <CBreadcrumbItem>
    //               <CLink href="#">Home</CLink>
    //             </CBreadcrumbItem>
    //             <CBreadcrumbItem>
    //               <CLink href="#">Library</CLink>
    //             </CBreadcrumbItem>
    //             <CBreadcrumbItem active>Data</CBreadcrumbItem>
    //           </CBreadcrumb>
    //           <CBreadcrumb>
    //             <CBreadcrumbItem>
    //               <CLink href="#">Home</CLink>
    //             </CBreadcrumbItem>
    //             <CBreadcrumbItem>
    //               <CLink href="#">Library</CLink>
    //             </CBreadcrumbItem>
    //             <CBreadcrumbItem>
    //               <CLink href="#">Data</CLink>
    //             </CBreadcrumbItem>
    //             <CBreadcrumbItem active>Bootstrap</CBreadcrumbItem>
    //           </CBreadcrumb>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default List
