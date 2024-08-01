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
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilBuilding, cilOptions } from '@coreui/icons'
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
      <CCarousel controls indicators>
        <CCarouselItem>
          <CCard className='justify-content-center'>
            <CImage className="d-block w-100" src={background1} alt="slide 1" height={700}/>
            <CCardImageOverlay> 
              <CRow xs={{ cols: 1, gutter: 10 }} md={{ cols: 3 }} className='mb-4 '>
                <CustomCard source={branch} sourceCount={data.branchCount} text='Total Branches'></CustomCard>
                <CustomCard source={parcel1} sourceCount={data.parcelCount} text='Total Parcels'></CustomCard>
                <CustomCard source={staff} sourceCount={data.staffCount} text='Total Staff'></CustomCard>
                <CustomCard source={accept} sourceCount={data.acceptCount} text='Accepted'></CustomCard>
                <CustomCard source={collectParcel} sourceCount={data.collectCount} text='Collected'></CustomCard>
                <CustomCard source={shipped} sourceCount={data.shipCount} text='Shipped'></CustomCard>
                <CustomCard source={intransit} sourceCount={data.intransitCount} text='In-Transit'></CustomCard>
                <CustomCard source={parcelDelivered} sourceCount={data.deliverCount} text='Delivered'></CustomCard>
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
              <CustomCard source={branch} sourceCount={data.branchCount} text='Total Branches'></CustomCard>
                <CustomCard source={parcel1} sourceCount={data.parcelCount} text='Total Parcels'></CustomCard>
                <CustomCard source={staff} sourceCount={data.staffCount} text='Total Staff'></CustomCard>
                <CustomCard source={accept} sourceCount={data.acceptCount} text='Accepted'></CustomCard>
                <CustomCard source={collectParcel} sourceCount={data.collectCount} text='Collected'></CustomCard>
                <CustomCard source={shipped} sourceCount={data.shipCount} text='Shipped'></CustomCard>
                <CustomCard source={intransit} sourceCount={data.intransitCount} text='In-Transit'></CustomCard>
                <CustomCard source={parcelDelivered} sourceCount={data.deliverCount} text='Delivered'></CustomCard>
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
              <CustomCard source={branch} sourceCount={data.branchCount} text='Total Branches'></CustomCard>
                <CustomCard source={parcel1} sourceCount={data.parcelCount} text='Total Parcels'></CustomCard>
                <CustomCard source={staff} sourceCount={data.staffCount} text='Total Staff'></CustomCard>
                <CustomCard source={accept} sourceCount={data.acceptCount} text='Accepted'></CustomCard>
                <CustomCard source={collectParcel} sourceCount={data.collectCount} text='Collected'></CustomCard>
                <CustomCard source={shipped} sourceCount={data.shipCount} text='Shipped'></CustomCard>
                <CustomCard source={intransit} sourceCount={data.intransitCount} text='In-Transit'></CustomCard>
                <CustomCard source={parcelDelivered} sourceCount={data.deliverCount} text='Delivered'></CustomCard>
              </CRow>     
            </CCardImageOverlay>
          </CCard> 
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
  </CContainer>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
