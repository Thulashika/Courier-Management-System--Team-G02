import React, { useEffect, useRef, useState } from 'react'
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
  CLink
} from '@coreui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { CDatePicker } from '@coreui/react-pro';
import { DocsCallout } from '../../components'

const Reports = () => {
  const random = () => Math.round(Math.random() * 100)

  const datePickerRef1 = useRef(null);
  const datePickerRef2 = useRef(null);

  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // Focus the first date picker to open the calendar on render
    if (datePickerRef1.current && datePickerRef1.current.querySelector('input')) {
      datePickerRef1.current.querySelector('input').focus();
    }
  }, []);

  return (

    <CCard className='mb-4'>
      <CCardHeader>Reports</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <label>Status</label>
            <select>
              <option>All</option>
              <option>Item Accepted by Courier</option>
              <option>Collected</option>
              <option>Shipped</option>
              <option>In-Transit</option>
              <option>Arrived At Destination</option>
              <option>Out for Delivery</option>
              <option>Ready to Pickup</option>
              <option>Delivered</option>
              <option>Unsuccessfull Delivery Attempt</option>
            </select>
          </CCol>
          <CCol>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
          </CCol>
        </CRow>
        
        {/* <label>From</label>
        <CDatePicker date="2022/2/16" label="Date Picker" locale="en-US" /> 

        <label>To</label>
        <CDatePicker date="2022/2/16" label="Date Picker" locale="en-US" />  */}

        {/* <div className="row">
          <div ref={datePickerRef1} className="col-sm-6 col-lg-5 mb-3 mb-sm-0">
            <CDatePicker label="From" locale="en-US"/>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div ref={datePickerRef2}>
            <CDatePicker date="2022/2/16" label="To" locale="en-US"/>
            </div>
          </div>
        </div> */}

        <CButton color="info">View Report</CButton>
      </CCardBody>
      <CCardBody>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton color='success' className="me-md-2">Print</CButton>
        </div>

        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope='col'>#</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Date</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Sender</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Recipient</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Amount</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((report,index) => {
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
    </CCard>
     
    
    // <CRow>
    //   <CCol xs={12}>
    //     <DocsCallout
    //       name="Chart"
    //       href="components/chart"
    //       content="React wrapper component for Chart.js 3.0, the most popular charting library."
    //     />
    //   </CCol>
    //   <CCol xs={6}>
    //     <CCard className="mb-4">
    //       <CCardHeader>Bar Chart</CCardHeader>
    //       <CCardBody>
    //         <CChartBar
    //           data={{
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //             datasets: [
    //               {
    //                 label: 'GitHub Commits',
    //                 backgroundColor: '#f87979',
    //                 data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
    //               },
    //             ],
    //           }}
    //           labels="months"
    //         />
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={6}>
    //     <CCard className="mb-4">
    //       <CCardHeader>Line Chart</CCardHeader>
    //       <CCardBody>
    //         <CChartLine
    //           data={{
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //             datasets: [
    //               {
    //                 label: 'My First dataset',
    //                 backgroundColor: 'rgba(220, 220, 220, 0.2)',
    //                 borderColor: 'rgba(220, 220, 220, 1)',
    //                 pointBackgroundColor: 'rgba(220, 220, 220, 1)',
    //                 pointBorderColor: '#fff',
    //                 data: [random(), random(), random(), random(), random(), random(), random()],
    //               },
    //               {
    //                 label: 'My Second dataset',
    //                 backgroundColor: 'rgba(151, 187, 205, 0.2)',
    //                 borderColor: 'rgba(151, 187, 205, 1)',
    //                 pointBackgroundColor: 'rgba(151, 187, 205, 1)',
    //                 pointBorderColor: '#fff',
    //                 data: [random(), random(), random(), random(), random(), random(), random()],
    //               },
    //             ],
    //           }}
    //         />
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={6}>
    //     <CCard className="mb-4">
    //       <CCardHeader>Doughnut Chart</CCardHeader>
    //       <CCardBody>
    //         <CChartDoughnut
    //           data={{
    //             labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    //             datasets: [
    //               {
    //                 backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
    //                 data: [40, 20, 80, 10],
    //               },
    //             ],
    //           }}
    //         />
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={6}>
    //     <CCard className="mb-4">
    //       <CCardHeader>Pie Chart</CCardHeader>
    //       <CCardBody>
    //         <CChartPie
    //           data={{
    //             labels: ['Red', 'Green', 'Yellow'],
    //             datasets: [
    //               {
    //                 data: [300, 50, 100],
    //                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    //                 hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    //               },
    //             ],
    //           }}
    //         />
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={6}>
    //     <CCard className="mb-4">
    //       <CCardHeader>Polar Area Chart</CCardHeader>
    //       <CCardBody>
    //         <CChartPolarArea
    //           data={{
    //             labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    //             datasets: [
    //               {
    //                 data: [11, 16, 7, 3, 14],
    //                 backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
    //               },
    //             ],
    //           }}
    //         />
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    //   <CCol xs={6}>
    //     <CCard className="mb-4">
    //       <CCardHeader>Radar Chart</CCardHeader>
    //       <CCardBody>
    //         <CChartRadar
    //           data={{
    //             labels: [
    //               'Eating',
    //               'Drinking',
    //               'Sleeping',
    //               'Designing',
    //               'Coding',
    //               'Cycling',
    //               'Running',
    //             ],
    //             datasets: [
    //               {
    //                 label: 'My First dataset',
    //                 backgroundColor: 'rgba(220, 220, 220, 0.2)',
    //                 borderColor: 'rgba(220, 220, 220, 1)',
    //                 pointBackgroundColor: 'rgba(220, 220, 220, 1)',
    //                 pointBorderColor: '#fff',
    //                 pointHighlightFill: '#fff',
    //                 pointHighlightStroke: 'rgba(220, 220, 220, 1)',
    //                 data: [65, 59, 90, 81, 56, 55, 40],
    //               },
    //               {
    //                 label: 'My Second dataset',
    //                 backgroundColor: 'rgba(151, 187, 205, 0.2)',
    //                 borderColor: 'rgba(151, 187, 205, 1)',
    //                 pointBackgroundColor: 'rgba(151, 187, 205, 1)',
    //                 pointBorderColor: '#fff',
    //                 pointHighlightFill: '#fff',
    //                 pointHighlightStroke: 'rgba(151, 187, 205, 1)',
    //                 data: [28, 48, 40, 19, 96, 27, 100],
    //               },
    //             ],
    //           }}
    //         />
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default Reports
