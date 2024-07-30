// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Landingpage.css';
// function Landingpage() {
//   return (
//     <div>
//         <div className="landing-container">
//     <h1>Courier Management System</h1>
//     <div className="buttons">
//       <Link to="/home" className="btn">Courier Management System</Link>
//       {/* <Link to="/registion" className="btn">User</Link> */}
//       <Link to="/login" className="btn">Login</Link>
//     </div>
//   </div>
//   </div>
//   )
// }

// export default Landingpage

import { 
  CButton,
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCardImage, 
  CCardImageOverlay, 
  CCardText, 
  CCardTitle, 
  CCarousel, 
  CCarouselCaption, 
  CCarouselItem, 
  CCol, 
  CCollapse, 
  CContainer, 
  CForm, 
  CFormInput, 
  CFormLabel, 
  CImage, 
  CNav, 
  CNavbar, 
  CNavbarBrand, 
  CNavbarNav, 
  CNavItem, 
  CNavLink, 
  CRow,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs} from '@coreui/react'
import React from 'react'
import CIcon from '@coreui/icons-react'
import CourierServicesImg from '../../assets/images/delivery-courier.jpg'
import { cibFacebook, cibInstagram, cibLinkedin, cibWhatsapp, cilClock, cilEnvelopeClosed, cilPhone } from '@coreui/icons'
import yoga from '../../../src/assets/images/YT.png'
import background2 from '../../assets/images/d1.avif'
import background1 from '../../assets/images/t1.jpg'
import background3 from '../../assets/images/pB2.webp'
import trackImg from '../../assets/images/Blurr.jpg'
import companyImg from '../../assets/images/Company.png'
import aboutusImg from '../../../src/assets/images/AboutUs.jpg'
import aboutImg from '../../../src/assets/images/white.avif'
import whiteImg from '../../assets/images/white.png'

function Landingpage() {
  return (
    <CRow className='mb-3'>
      <CCard>
        <CRow className='mb-3'>
        {/* colorScheme="light" variant="underline-border justify-content-end" */}
          <CNavbar className="bg-body-tertiary" expand="lg" >
            <CContainer fluid>
              <CNavbarBrand href='/' color='info'>
                <CImage src={yoga} height={75} width={75}/>
                Yoga Tansport
                <div>
                  <h6>We keep improving to serve you better!</h6>
                </div>
              </CNavbarBrand>
              <CCollapse className='navbar-collapse justify-content-end' visible>
                <CNavbarNav>
                  <CNavItem>
                    <CIcon icon={cilPhone} size="xl" style={{'--ci-primary-color': 'orange'}} />
                    Call Us:
                    <CNavLink href='' active>
                    0762110846
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CIcon icon={cilEnvelopeClosed} size="xl" style={{'--ci-primary-color': 'orange'}} />
                    Email Us:
                    <CNavLink href='' active>
                      lasibala24@gmail.com
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CIcon icon={cilClock} size="xl" style={{'--ci-primary-color': 'orange'}} />
                    Opening Hours:
                    <CNavLink href='' active>
                      Mon-Fri: 8am – 7pm
                    </CNavLink>
                  </CNavItem>
                </CNavbarNav>
                <CButton type='submit' color='warning' href='/login'>
                  Login
                </CButton> 
            </CCollapse>
            </CContainer>
          </CNavbar>
        </CRow>
      </CCard>

      <CRow className='mb-3'>
        {/* <CCard className="mb-3 bg-dark text-black"> */}
          {/* <CCardImage 
            src={CourierServicesImg} 
            style={{width:'100%', 
                    height: '75%', 
                    background:'linear-gradient(rgba(4,0,50,0.5), rgba(4,0,50,0.3))',
                    backgroundSize:'hover', 
                    backgroundPosition:'center'
                  }}
          /> */}
          {/* <CCardImageOverlay> */}
          {/* <CNavbar expand="lg" colorScheme="dark" className="bg-dark">
            <CRow className='mb-3'>
              <CCol xs>
                <CTabs activeItemKey={2} expand="lg">
                  <CTabList variant="underline">
                    <CTab aria-controls="home-tab-pane" itemKey={1}>Home</CTab>
                    <CTab aria-controls="service-tab-pane" itemKey={2}>Our Services</CTab>
                    <CTab aria-controls="brnach-tab-pane" itemKey={3}>Branch</CTab>
                    <CTab aria-controls="find-tab-pane" itemKey={4}>Find Us</CTab>
                    <CTab aria-controls="contact-tab-pane" itemKey={5}>Contact Us</CTab>
                  </CTabList>
                </CTabs>
              </CCol>
              <CCol xs>
                <CTabs activeItemKey="profile" >
                  <CTabList>
                    <CTab itemKey={1}>
                      <CIcon icon={cibFacebook} size="xl" style={{'--ci-primary-color': 'white'}} />
                    </CTab>
                    <CTab itemKey="profile">
                      <CIcon icon={cibInstagram} size="xl" style={{'--ci-primary-color': 'red'}} />
                    </CTab>
                    <CTab itemKey="contact">
                      <CIcon icon={cibWhatsapp} size="xl" style={{'--ci-primary-color': 'red'}} />
                    </CTab>
                    <CTab itemKey="disabled">
                      <CIcon icon={cibLinkedin} size="xl" style={{'--ci-primary-color': 'red'}} />
                    </CTab>
                  </CTabList>
                </CTabs>
              </CCol>
            </CRow>
            </CNavbar> */}
            {/* <CRow>
            <CNavbar expand="lg" colorScheme="dark" className="bg-dark">
              <CCol xs>
                <CNav as="nav" variant="underline" expand="lg" layout="fill">
                  <CCollapse className='navbar-collapse'  variant="underline-border" visible>
                    <CNavbarNav>
                      <CNavItem>
                        <CNavLink href=''>
                          Home
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink href=''>
                          Our Services
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink href=''>
                          Branch
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink href=''>
                          Find Us
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink href=''>
                          Contact Us
                        </CNavLink>
                      </CNavItem>
                    </CNavbarNav>
                </CCollapse>
                </CNav>
              </CCol>

              <CCol xs>
                <CNav as="nav" expand="lg" layout="fill" className="justify-content-end ">
                  <CCollapse className='navbar-collapse'>
                  <CNavbarNav>
                    <CNavItem>
                      <CNavLink href="#" active>
                        <CIcon icon={cibFacebook} size="xl" style={{'--ci-primary-color': 'red'}} />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink href="#">
                        <CIcon icon={cibInstagram} size="xl" style={{'--ci-primary-color': 'red'}} />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink href="#">
                        <CIcon icon={cibWhatsapp} size="xl" style={{'--ci-primary-color': 'red'}} />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink href="#">
                        <CIcon icon={cibLinkedin} size="xl" style={{'--ci-primary-color': 'red'}} />
                      </CNavLink>
                    </CNavItem>
                  </CNavbarNav>
                  </CCollapse>
                </CNav>
              </CCol>
              </CNavbar>
            </CRow> */}

            {/* <CRow className="mb-4 ">
              <CCardTitle className="text-center">
                <strong className="d-grid gap-2 d-md-flex justify-content-md-start">Yoga Transport</strong>
              </CCardTitle>
            </CRow> */}
            
            {/* <CRow className="mb-4">
              <CCardText className="text-center">
              <CRow className="mb-2"/>
                <h1 className="d-grid gap-2 d-md-flex justify-content-center">Courier Service in Srilanka</h1>
              </CCardText>
            </CRow>       */}
          {/* </CCardImageOverlay> */}
        {/* </CCard> */}
      </CRow>

      <CCard>
        <CRow>
          <CCol>
            <CCarousel controls indicators dark>
              <CCarouselItem>
                <CImage className="d-block w-100" src={background1} alt="slide 1"  height={700}/>
                <CCardImageOverlay>
                  <CContainer>
                    <CCardText className="d-none d-md-block">
                    <h1 style={{ color: 'black' }}><br/>Welcome to Our<br/> Courier Management System</h1>
                    <p style={{ color: 'black' }}>Efficient, reliable, and secure courier services at your doorstep.</p>
                    </CCardText>
                  </CContainer>
                </CCardImageOverlay>
              </CCarouselItem>

              <CCarouselItem>
                <CImage className="d-block w-100" src={background2} alt="slide 2" height={700}/>
              </CCarouselItem>

              <CCarouselItem>
                <CImage className="d-block w-100" src={background3} alt="slide 3" height={700}/>
                <CCardImageOverlay>
                  <CContainer>
                    <CCardText className="d-none d-md-block">
                    <h1 style={{ color: 'black' }}>
                      <br/>The Largest Domestic<br/>
                      Courier Service<br/>
                      Provider in Srilanka
                    </h1>
                    <p style={{ color: 'black' }}>
                      We offer a complete array of services which can be tailor made to<br/>
                      provide the best logistics to corporate entities and to suit<br/>
                      individual needs
                    </p>
                    </CCardText>
                  </CContainer>
                </CCardImageOverlay>
              </CCarouselItem>
            </CCarousel>
          </CCol>
        </CRow>
      </CCard>

      <CRow className="mb-5"></CRow>

      <CCard>
        <CImage className="d-block w-100" src={trackImg} alt="slide 1"  height={700}/>
        <CCardImageOverlay>
          <br/><br/><br/><br/>
          <CContainer>
            <CCardText className="d-none d-md-block d-md-flex justify-content-center">
              <h1 style={{ color: 'white' }}><strong>Track Your Item</strong></h1>
            </CCardText>
          </CContainer>

          <div className=" min-vh-50 d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                <CCol md={12}>
                  <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h3><strong>Track & Trace</strong></h3>
                    <CRow className="mb-3"/>
                    <CRow className="mb-3 text-center">
                        <CFormInput 
                          className="col-sm-4 col-form-label"
                          placeholder='Tracking Number'
                          type="text" 
                          id="inputTrackingNumber"
                          // value={trackingNumber} 
                          // onChange={(e) => setTrackingNumber(e.target.value)}
                        />                      
                    </CRow>

                    <CRow>
                      <div className="d-grid gap-2 col-6 mx-auto">
                        <CButton color="secondary">Track</CButton>
                      </div>
                    </CRow>
                    {/* {error && (
                      <CRow className="mb-3 text-center">
                        <p style={{ color: 'red' }}>{error}</p>
                      </CRow>
                    )} */}

                    {/* {parcel > 0 && parcel.status.map((trackParcel, index) => (
                      <CRow key={index} className="mb-3 text-center">
                        <p>Status: {trackParcel.status}</p>
                      </CRow>
                    ))} */}


                      {/* {parcel && 
                        <CRow className="mb-3 text-center">
                          <p>Status: {parcel.status.status}  </p>
                        </CRow>
                      } */}
                      </CForm>
                  </CCardBody>
                  </CCard>
                  </CCol>
                </CRow>
              {/* </CCard> */}
              </CContainer>
            {/* </CRow> */}
          </div>
        </CCardImageOverlay>
      </CCard>

      <CRow className="mb-5"></CRow>

      <CCard>
        <CImage className="d-block w-100" src={companyImg} alt="slide 1"  height={700}/>
        <CCardImageOverlay>
          <div className=" min-vh-50 d-flex flex-row align-items-center">
            <CContainer>
            <br/><br/><br/><br/>              
              <CRow>
                <CCol md={6}>
                  <h1 style={{ color: 'black' }}><strong>The Company</strong></h1>
                </CCol>
                <CCol md={6}>
                  <h6 style={{ color: 'black' }}>
                    Yoga Transport is the largest and most experienced Domestic Courier
                    Service Company in the Srilanka handling timesnsitive documents
                    and packages for corporate and individual clients for over 34 years.
                    Over the years it has harnessed its dedication and devotion towards
                    the customer concerns. Its services and operational systems are
                    tailor made which could cater to the varying needs of the
                    customers. Speed, Security, Reliability and Accountability are
                    considered paramount in its services afforded to every customer.
                  </h6>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </CCardImageOverlay>
      </CCard>

      <CRow className="mb-5"></CRow>

      <CCard>
        <CImage className="d-block w-100" src={aboutImg} alt="slide 1"  height={700}/>
        <CCardImageOverlay>
          <div className=" min-vh-50 d-flex flex-row align-items-center">
            <CContainer>
            <br/><br/><br/><br/>
              <CRow>
                <CCol md={6}>
                  <h1><strong>About Us</strong></h1><br/>
                  <p>
                     Yoga Transport (Private) Ltd. was incorporated in 1987 with the approval granted by<br/>
                     then Foreign Investment Advisory Committee for the provision of Logistics Support<br/>
                     Service. Yoga was able to earn its reputation for efficiency and reliability from its<br/>
                     inception, servicing many industries in the country, including Corporate Sector,<br/>
                     Banking, Finance, Insurance, Legal, Healthcare, Entertainment, Government,<br/>
                     Plantation, Manufacturing Industry and also the Individual consumer market<br/>
                     counting over 34 years of experience in the courier/logistics field. It has thus<br/>
                     acquired adequate expertise and experience over the years to provide its services<br/>
                     with superior quality and maintain market leadership in domestic express delivery.<br/>
                     The company has grown into a strong brand in the logistic industry in Sri Lanka,<br/>
                     recognized for its customized services, Speed, Security, Reliability and<br/>
                     Accountability with a large branch network distributed across the country. We are<br/>
                     committed to continually enhancing our operations across the region while pursuing<br/>
                     opportunities for business growth in emerging markets. We undertake packages for<br/>
                     collection or delivery; whether you are an individual, small business or a large<br/>
                     enterprise, we provide affordable logistic solutions. There are no set size or weight<br/>
                     limits, and we are ready to surpass all boundaries in giving you the freedom and<br/>
                     convenience of sending items to any location in Sri Lanka.</p>
                </CCol>
                <CCol md={6}>
                  <div className="clearfix">
                    <CImage align="center" rounded className="d-block d-flex w-100" height={400} src={aboutusImg} alt="slide 1"/>
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </CCardImageOverlay>
      </CCard>

      <CRow className="mb-5"></CRow>

      <CCard>
        <CImage className="d-block w-100" src={whiteImg} alt="slide 1"  height={700}/>
        <CCardImageOverlay>
            <CContainer className="justify-content-center">
              <br/><br/><br/><br/>
              <CCardText className="d-none d-md-block justify-content-center">
                <p style={{ color: 'orange' }}>Opportunity in every direction</p>
                <h1 style={{ color: 'black' }}><strong>Our Services</strong></h1>
                <h6 style={{ color: 'grey' }}>
                  Pronto Lanka goes extra mile in delivering logistics solutions to our customers with a<br/> 
                  portfolio of services to ease the needs of the customers.
                </h6>
              </CCardText>
          </CContainer>

          <div className=" min-vh-50 d-flex flex-row align-items-center">

          </div>
          </CCardImageOverlay>
      </CCard>
    </CRow>
  )
}

export default Landingpage