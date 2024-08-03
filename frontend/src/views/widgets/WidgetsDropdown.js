import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CCard,
  CContainer,
  CCardImage,
  CCardBody,
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
  CCardImageOverlay,
  CCardText,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsD,
  CWidgetStatsE,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartDoughnut, CChartLine, CChartPie, CChartPolarArea } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilBuilding, cilChartPie, cilOptions } from '@coreui/icons'
import parcel from '../../assets/images/parcel.png'
import staff from '../../assets/images/S.jpg'
import axios from 'axios'
import background1 from '../../assets/images/t1.avif'
import background2 from '../../assets/images/B.jpg'
import background3 from '../../assets/images/12.jpg'
import branch from '../../assets/images/b10.png'
import parcel1 from '../../assets/images/TP.avif'
import parcelDelivered from '../../assets/images/deliver1.jpg'
import collectParcel from '../../assets/images/collected.avif'
import accept from '../../assets/images/accept.png'
import shipped from '../../assets/images/ship.jpg'
import intransit from '../../assets/images/IT.avif'
import CustomCard from './CustomCard'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const [data, setData] = useState({})

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

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CContainer className='mb-4'>
      <CRow className={props.className} xs={{ gutter: 4 }}>
        <CCol sm={4} xl={4} xxl={3}>
          <CWidgetStatsA
            // progress={{ value: 75 }}
            color="primary"
            value={
              <>
                <h1>{data.acceptCount}</h1>{' '}
              </>
            }
            title="Accepted"
            
            chart={
              <CChartLine
                ref={widgetChartRef1}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-primary'),
                      data: [65, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={4} xl={4} xxl={3}>
          <CWidgetStatsA
            color="info"
            value={
              <>
                <h1>{data.collectCount}</h1>{' '}
              </>
            }
            title="Collected"
            
            chart={
              <CChartLine
                ref={widgetChartRef2}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-info'),
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={4} xl={4} xxl={3}>
          <CWidgetStatsA
            color="warning"
            value={
              <>
                <h1>{data.shipCount}</h1>{' '}
              </>
            }
            title="Shipped"
            
            chart={
              <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
            }
          />
        </CCol>
        <CCol sm={4} xl={4} xxl={3}>
          <CWidgetStatsA
            color="danger"
            value={
              <>
                <h1>{data.deliverCount}</h1>{' '}
              </>
            }
            title="Delivered"
            
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                    'January',
                    'February',
                    'March',
                    'April',
                  ],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        {/* <CCol sm={4} xl={4} xxl={3}>
          <CWidgetStatsB
            color="success"
            value={
              <>
                <h1>{data.deliverCount}</h1>{' '}
              </>
            }
            title="Delivered"
            
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                    'January',
                    'February',
                    'March',
                    'April',
                  ],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 6,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsC
            color="dark"
            value={
              <>
                <h1>{data.parcelCount}</h1>{' '}
              </>
            }
            title="Total Parcels"
            
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-info'),
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 5,
                      hitRadius: 10,
                      hoverRadius: 6,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsD
            color="light"
            value={
              <>
                <h1>{data.deliverCount}</h1>{' '}
              </>
            }
            title="Total staff"
            
            chart={
              <CChartPie
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 6,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsE
            color="secondary"
            value={
              <>
                <h1>{data.deliverCount}</h1>{' '}
              </>
            }
            title="Total Branches"
            
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-primary'),
                      data: [65, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 6,
                    },
                  },
                }}
              />
            }
          />
        </CCol> */}
      </CRow>
      {/* <CCarousel controls indicators>
        <CCarouselItem>
          <CCard className='justify-content-center'>
            <CImage className="d-block w-100" src={background1} alt="slide 1" height={700}/>
             <CCardImageOverlay>
              <CRow xs={{ cols: 1, gutter: 10 }} md={{ cols: 3 }} className='mb-4 '>
                <CustomCard source={accept} sourceCount={data.acceptCount} text='Accepted'></CustomCard>
                <CustomCard source={collectParcel} sourceCount={data.collectCount} text='Collected'></CustomCard>
                <CustomCard source={shipped} sourceCount={data.shipCount} text='Shipped'></CustomCard>
                <CustomCard source={intransit} sourceCount={data.intransitCount} text='In-Transit'></CustomCard>
                <CustomCard source={parcelDelivered} sourceCount={data.deliverCount} text='Delivered'></CustomCard>
                <CustomCard source={branch} sourceCount={data.branchCount} text='Total Branches'></CustomCard>
                <CustomCard source={parcel1} sourceCount={data.parcelCount} text='Total Parcels'></CustomCard>
                <CustomCard source={staff} sourceCount={data.staffCount} text='Total Staff'></CustomCard>
              </CRow>     
            </CCardImageOverlay>
          </CCard>    
          <CCarouselCaption className="d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>

        <CCarouselItem>
        <CCard className='justify-content-center'>
            <CImage className="d-block w-100" src={background2} alt="slide 1" height={700}/>
            <CCardImageOverlay> 
              <CRow xs={{ cols: 1, gutter: 10 }} md={{ cols: 3 }} className='mb-4 '>
                <CustomCard source={accept} sourceCount={data.acceptCount} text='Accepted'></CustomCard>
                <CustomCard source={collectParcel} sourceCount={data.collectCount} text='Collected'></CustomCard>
                <CustomCard source={shipped} sourceCount={data.shipCount} text='Shipped'></CustomCard>
                <CustomCard source={intransit} sourceCount={data.intransitCount} text='In-Transit'></CustomCard>
                <CustomCard source={parcelDelivered} sourceCount={data.deliverCount} text='Delivered'></CustomCard>
                <CustomCard source={branch} sourceCount={data.branchCount} text='Total Branches'></CustomCard>
                <CustomCard source={parcel1} sourceCount={data.parcelCount} text='Total Parcels'></CustomCard>
                <CustomCard source={staff} sourceCount={data.staffCount} text='Total Staff'></CustomCard>
              </CRow>     
            </CCardImageOverlay>
          </CCard>   
          <CCarouselCaption className="d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </CCarouselCaption>
        </CCarouselItem>

        <CCarouselItem>
        <CCard className='justify-content-center'>
            <CImage className="d-block w-100" src={background3} alt="slide 1" height={700} />
            <CCardImageOverlay> 
              <CRow xs={{ cols: 1, gutter: 10 }} md={{ cols: 3 }} className='mb-4 '>
                <CustomCard source={accept} sourceCount={data.acceptCount} text='Accepted'></CustomCard>
                <CustomCard source={collectParcel} sourceCount={data.collectCount} text='Collected'></CustomCard>
                <CustomCard source={shipped} sourceCount={data.shipCount} text='Shipped'></CustomCard>
                <CustomCard source={intransit} sourceCount={data.intransitCount} text='In-Transit'></CustomCard>
                <CustomCard source={parcelDelivered} sourceCount={data.deliverCount} text='Delivered'></CustomCard>
                <CustomCard source={branch} sourceCount={data.branchCount} text='Total Branches'></CustomCard>
                <CustomCard source={parcel1} sourceCount={data.parcelCount} text='Total Parcels'></CustomCard>
                <CustomCard source={staff} sourceCount={data.staffCount} text='Total Staff'></CustomCard>
              </CRow>     
            </CCardImageOverlay>
          </CCard> 
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel> */}
  </CContainer>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
