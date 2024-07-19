import React, { useState } from 'react'
import { 
  CCard, 
  CCardBody, 
  CCol, 
  CCardHeader, 
  CRow, 
  CButton, 
  CTable, 
  CTableBody, 
  CTableHead, 
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormLabel,
  CFormSelect,
  CFormInput
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import CIcon from '@coreui/icons-react';
import { cilPrint } from '@coreui/icons';
import axios from 'axios';

const Reports = () => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All')
  const [data, setData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleViewReport = (e) => {
    // e.preventDefult()

    if (!fromDate || !toDate || !status) {
      alert("Please select a date range and status.");
      return;
    }

    // const sampleData = [
    //   {
    //     date: '2024-07-01',
    //     sender: 'John Doe',
    //     recipient: 'Jane Doe',
    //     amount: 100,
    //     status: 'Delivered'
    //   },
    //   {
    //     date: '2024-07-02',
    //     sender: 'Alice',
    //     recipient: 'Bob',
    //     amount: 150,
    //     status: 'Shipped'
    //   },
    //   // Add more sample data if needed
    // ];

    // const filteredData = sampleData.filter(item => {
    //   const itemDate = new Date(item.date)
    //   const from = new Date(fromDate)
    //   const to = new Date(toDate)

    //   return (
    //     (status === 'All' || item.status === status) && 
    //     itemDate >= from &&
    //     itemDate <= to
    //   )
    // })

    // setData(filteredData);
    // setShowReport(true);

//     try {
//       const response = await axios.get('http://localhost:6431/report', {
//         params: {
//           fromDate,
//           toDate,
//           status,
//         },
//       });
//       setData(response.data);
//       setShowReport(true);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

    axios('http://localhost:6431/report', {
      method: 'GET'
    }).then(res => {
      setData(res.data)
      setShowReport(true)
    }).catch(err => {
      console.error('Error fetching data:', err)
    })
}

  return (

    <CCard className='mb-4'>
      <CCardHeader>Reports</CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol xs={3}>
            <CFormLabel >Status</CFormLabel>
            {/* className="col-sm-2 col-form-label" */}
            <CFormSelect 
              className="mb-3" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All</option>
              <option>Accepted</option>
              <option>Collected</option>
              <option>Shipped</option>
              <option>In-Transit</option>
              <option>Delivered</option>
            </CFormSelect>
          </CCol>

          <CCol xs={3}>
            <CFormInput 
              label='From' 
              type='date' 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </CCol>

          <CCol xs={3}>
            <CFormInput 
              label='To' 
              type='date'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
            />
          </CCol>

          <CCol xs={3}>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton 
              color="info"
              onClick={() => handleViewReport()}>
                View Report
            </CButton>
            </div>
          </CCol>
        </CRow>
      </CCardBody>

    {showReport && (
       <CCardBody>
       <CRow className="mb-3">
         <div className="d-grid gap-2 d-md-flex justify-content-md-end">
           <CButton 
             color='success' 
             className="me-md-2"
             onClick={() => window.print()}>
             <CIcon icon={cilPrint} />
             Print
           </CButton>
         </div>
       </CRow>

       <CTable>
         <CTableHead>
           <CTableRow>
             <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
             <CTableHeaderCell scope='col'>Date</CTableHeaderCell>
             <CTableHeaderCell scope='col'>Sender</CTableHeaderCell>
             <CTableHeaderCell scope='col'>Recipient</CTableHeaderCell>
             <CTableHeaderCell scope='col'>Amount</CTableHeaderCell>
             <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
           </CTableRow>
         </CTableHead>
         <CTableBody>
           {data && data.map((report,index) => {
             return <CTableRow key={index}>
               <CTableDataCell> {index+1} </CTableDataCell>
               <CTableDataCell> {report.date} </CTableDataCell>
               <CTableDataCell> {report.sender} </CTableDataCell>
               <CTableDataCell> {report.recipient} </CTableDataCell>
               <CTableDataCell> {report.amount} </CTableDataCell>
               <CTableDataCell> {report.status} </CTableDataCell>
             </CTableRow>
           })}          
         </CTableBody>
       </CTable>
     </CCardBody>
    )}
     
    </CCard>
  )
}

export default Reports
