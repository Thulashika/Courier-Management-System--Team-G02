import React, { useContext, useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsC,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifUs,
  cibTwitter,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilChartPie,
} from '@coreui/icons'

import avatar1 from '../../assets/images/avatars/10.jpg'
import avatar2 from '../../assets/images/avatars/Lava1.jpeg'
import avatar3 from '../../assets/images/avatars/3.jpg'
import avatar4 from '../../assets/images/avatars/Jukereyans.jpg'
import avatar5 from '../../assets/images/avatars/Ashan1.jpeg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { AuthContext } from '../pages/register/AuthProvider'
import axios from 'axios'
import userImg from '../../assets/images/cus.gif'
import totalstaffImg from '../../assets/images/customer.gif'
import staffImg from '../../assets/images/staff.gif'
import delivery_personImg from '../../assets/images/delPer.gif'
import HIImage from '../../assets/images/hi.gif'

const Dashboard = () => {

  const [data, setData] = useState({})
  
  const progressGroupExample1 = [
    { title: 'Monday', value1: data?.dailyParcelCounts?.[0]?.currentParcelCount, value2: data?.dailyParcelCounts?.[0]?.oldParcelCount },
    { title: 'Tuesday', value1: data?.dailyParcelCounts?.[1]?.currentParcelCount, value2: data?.dailyParcelCounts?.[1]?.oldParcelCount },
    { title: 'Wednesday', value1: data?.dailyParcelCounts?.[2]?.currentParcelCount, value2: data?.dailyParcelCounts?.[2]?.oldParcelCount },
    { title: 'Thursday', value1: data?.dailyParcelCounts?.[3]?.currentParcelCount, value2: data?.dailyParcelCounts?.[3]?.oldParcelCount },
    { title: 'Friday', value1: data?.dailyParcelCounts?.[4]?.currentParcelCount, value2: data?.dailyParcelCounts?.[4]?.oldParcelCount },
   ];

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Thulashika Balachandran',
        new: true,
        registered: 'March 24, 2024',
      },
      district: { name: 'Jaffna', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 06, 2024 - Jul 05, 2024',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Lavanya Arunthavaraja',
        new: false,
        registered: 'March 24, 2024',
      },
      district: { name: 'Trinco', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 06, 2024 - Jul 05, 2024',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Kinthujan Prabakaran', new: true, registered: 'March 24, 2024' },
      district: { name: 'Killinochi', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 06, 2024 - Jul 05, 2024',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Jukereyans Winslow', new: true, registered: 'March 24, 2024' },
      district: { name: 'Colombo', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 06, 2024 - Jul 05, 2024',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Ashan Dineth Mindada Waravita',
        new: true,
        registered: 'March 24, 2024',
      },
      district: { name: 'Kandy', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 06, 2024 - Jul 05, 2024',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
  ]

  const { userDetails } = useContext(AuthContext);

  useEffect(() => {
    getTotalCount()
  }, [])

  const getTotalCount = () => {
    axios
      .get('http://localhost:6431/dashboard/count')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching total count:', err);
      });
  };

  const getDaysOfWeek = () => {
    const days = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Adjust to the start of the week (Monday)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
    for (let i = 0; i < 5; i++) { // Loop only for 5 days (Monday to Friday)
      const date = new Date();
      date.setDate(today.getDate() + mondayOffset + i); // Calculate each weekday date
      const dayName = date.toLocaleString('en-US', { weekday: 'long' }); // Full weekday name
      days.push(dayName);
    }
    return days;
  };
  
  const daysOfWeek = getDaysOfWeek();
  

  return (
    <>
      {userDetails.position === 'ADMIN' ? 
      <>
      <WidgetsDropdown className="mb-4" />
      <CRow>
        <CCol xs={12} md={12} xl={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="Users" className="card-title mb-0">
                    Users
                  </h4>
                  <div className="small text-body-secondary">January 1, 2024 - December 31, 2024</div>
                </CCol>
              </CRow>
              <MainChart />
            </CCardBody>
          </CCard>
        </CCol>        
      </CRow>

      {/* <CRow xs={{ gutter: 4 }}>
        <CCol xs={12} md={12} xl={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol xs={6}>
                  <CWidgetStatsC
                    className="mb-3"
                    icon={<CIcon icon={cilChartPie} height={36} />}
                    color='success'
                    text="Customers"
                    title="Widget title"
                    value={
                      <>
                        <h1>
                          <span>{data.userCount}</span>
                          <span style={{ marginLeft: '10px', fontSize: '14px', color: 'light' }}>
                          </span>
                        </h1>
                      </>
                    }    
                  />
                </CCol>
                <CCol xs={6}>
                  <CWidgetStatsC
                    className="mb-3"
                    icon={<CIcon icon={cilChartPie} height={36} />}
                    color="primary"
                    inverse
                    progress={{ value: 75 }}
                    text="Widget helper text"
                    title="Widget title"
                    value={
                      <>
                        <h1>
                          <span>{data.staffCount}</span>
                          <span style={{ marginLeft: '10px', fontSize: '14px', color: 'light' }}>
                          </span>
                        </h1>
                      </>
                    }    
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={6}>
                  <CWidgetStatsC
                    className="mb-3"
                    icon={<CIcon icon={cilChartPie} height={36} />}
                    color='success'
                    text="Widget helper text"
                    title="Widget title"
                    value={
                      <>
                        <h1>
                          <span>{data.userCount}</span>
                          <span style={{ marginLeft: '10px', fontSize: '14px', color: 'light' }}>
                          </span>
                        </h1>
                      </>
                    }    
                  />
                </CCol>
                <CCol xs={6}>
                  <CWidgetStatsC
                    className="mb-3"
                    icon={<CIcon icon={cilChartPie} height={36} />}
                    color="primary"
                    inverse
                    progress={{ value: 75 }}
                    text="Widget helper text"
                    title="Widget title"
                    value={
                      <>
                        <h1>
                          <span>{data.staffCount}</span>
                          <span style={{ marginLeft: '10px', fontSize: '14px', color: 'light' }}>
                          </span>
                        </h1>
                      </>
                    }    
                  />
                </CCol>
              </CRow>
            </CCardBody>  
          </CCard>
        </CCol>
      </CRow> */}

      <CRow xs={{ gutter: 4 }}>
        <CCol xs={12} md={12} xl={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol xs={6}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="danger"
                    icon={<CImage src={userImg} height={30} />}
                    padding={false}
                    title="Customers"
                    value={
                      <>
                        <h1>
                          {data.userCount}
                        </h1>
                      </>
                    }    
                  />
                </CCol>
                <CCol xs={6}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="danger"
                    // icon={<CIcon icon={cibstude} height={24} />}
                    icon={<CImage src={totalstaffImg} height={28}/>}
                    padding={false}
                    title="Total Staff"
                    value={
                      <>
                        <h1>
                          {data.totalStaffCount}
                        </h1>
                      </>
                    } 
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={6}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="danger"
                    icon={<CImage src={staffImg} height={28}/>}
                    padding={false}
                    title="Staff"
                    value={
                      <>
                        <h1>
                          {data.staffCount}
                        </h1>
                      </>
                    }    
                  />
                </CCol>
                <CCol xs={6}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="danger"
                    icon={<CImage src={delivery_personImg} height={28}/>}
                    padding={false}
                    title="Delivery_Person"
                    value={
                      <>
                        <h1>
                          {data.delivery_personCount}
                        </h1>
                      </>
                    } 
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      

      {/* <WidgetsBrand className="mb-4" withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Parcels {' & '} Sales</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs={12} md={12} xl={12}>
                    <CRow>
                      {/* <CCol xs={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3">
                          <div className="text-body-secondary text-truncate small">New Parcels</div>
                          <div className="fs-5 fw-semibold">{data.totalCurrentParcelCount}</div>
                        </div>
                      </CCol> */}
                      <CCol xs={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                          <div className="text-body-secondary text-truncate small">
                            Total Parcels
                          </div>
                          <div className="fs-5 fw-semibold">{data.totalOldParcelCount}</div>
                        </div>
                      </CCol>
                    </CRow>
                    <hr className="mt-0" />
                    {daysOfWeek.map((day, index) => {
                    const dayData = data?.dailyParcelCounts?.find(item => item.day === day);

                    return (
                      <div className="progress-group mb-4" key={index}>
                        <div className="progress-group-prepend">
                          <span className="text-body-secondary small">{day}</span>
                        </div>
                        <div className="progress-group-bars">
                          {/* <CProgress
                            thin
                            color="info"
                            value={dayData?.newParcelCount || 0}
                            title={`New: ${dayData?.newParcelCount || 0}`}
                          /> */}
                          <CProgress
                            thin
                            color="info"
                            value={dayData?.oldParcelCount || 0}
                            title={`Old: ${dayData?.oldParcelCount || 0}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                  </CCol>
                  {/* <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol xs={6}>
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                          <div className="text-body-secondary text-truncate small">Pageviews</div>
                          <div className="fs-5 fw-semibold">78,623</div>
                        </div>
                      </CCol>
                      <CCol xs={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-body-secondary text-truncate small">Organic</div>
                          <div className="fs-5 fw-semibold">49,123</div>
                        </div>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />

                    {progressGroupExample2.map((item, index) => (
                      <div className="progress-group mb-4" key={index}>
                        <div className="progress-group-header">
                          <CIcon className="me-2" icon={item.icon} size="lg" />
                          <span>{item.title}</span>
                          <span className="ms-auto fw-semibold">{item.value}%</span>
                        </div>
                        <div className="progress-group-bars">
                          <CProgress thin color="warning" value={item.value} />
                        </div>
                      </div>
                    ))}

                    <div className="mb-5"></div>

                    {progressGroupExample3.map((item, index) => (
                      <div className="progress-group" key={index}>
                        <div className="progress-group-header">
                          <CIcon className="me-2" icon={item.icon} size="lg" />
                          <span>{item.title}</span>
                          <span className="ms-auto fw-semibold">
                            {item.value}{' '}
                            <span className="text-body-secondary small">({item.percent}%)</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <CProgress thin color="success" value={item.percent} />
                        </div>
                      </div>
                    ))}
                  </CCol> */}
                </CRow>

                <br />

                {/* <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead className="text-nowrap">
                    <CTableRow>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        District
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        Payment Method
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tableExample.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.user.name}</div>
                          <div className="small text-body-secondary text-nowrap">
                            <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                            {item.user.registered}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.district.name}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex justify-content-between text-nowrap">
                            <div className="fw-semibold">{item.usage.value}%</div>
                            <div className="ms-3">
                              <small className="text-body-secondary">{item.usage.period}</small>
                            </div>
                          </div>
                          <CProgress thin color={item.usage.color} value={item.usage.value} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={item.payment.icon} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="small text-body-secondary text-nowrap">Last login</div>
                          <div className="fw-semibold text-nowrap">{item.activity}</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable> */}
              </CCardBody>
          </CCard>
        </CCol>
      </CRow> 
      </>
      :
      <CCard className='text-center'>
        <h3><CImage src={HIImage} height={500} width={1212}/>Welcome {userDetails.fullName}</h3>
      </CCard>
}
    </>
  )
}

export default Dashboard
