import { 
  CButton,
  CCallout,
  CCard, 
  CCardBody, 
  CCardImageOverlay, 
  CCardText, 
  CCarousel,  
  CCarouselItem, 
  CCol, 
  CCollapse, 
  CContainer, 
  CForm, 
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CImage, 
  CNav, 
  CNavbar, 
  CNavbarBrand, 
  CNavbarNav, 
  CNavItem, 
  CNavLink, 
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibInstagram, cibLinkedin, cibWhatsapp, cilClock, cilEnvelopeClosed, cilPhone } from '@coreui/icons'
import yoga from '../../../src/assets/images/YT.png'
import background1 from '../../assets/images/t1.png'
import background2 from '../../assets/images/del2.jpg'
import background3 from '../../assets/images/pB2.webp'
import trackImg from '../../assets/images/tra1.png'
import companyImg from '../../assets/images/Company.png'
import aboutusImg from '../../../src/assets/images/AU.jpg'
import aboutImg from '../../../src/assets/images/white.avif'
import whiteImg from '../../assets/images/white.png'
import expressImage from '../../assets/images/express.jpg'; 
import parcelTrackingImage from '../../assets/images/track.jpg'; 
import securePackagingImage from '../../assets/images/pack.jpg'; 
import warehouseImage from '../../assets/images/management.jpg'; 
import officeToOfficeImage from '../../assets/images/office.jpg'; 
import backgroundImage from '../../assets/images/background_1.jpg';
import ContactUs_1 from '../../assets/images/ContactUs_1.jpg';

const calloutStyle = {
  position: 'relative',
  color: 'gray',
  background: 'white',
  padding: '2rem',
  marginBottom: '2rem',
};

const headerStyle = {
  color: 'blue',
};

const imageStyle = {
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  margin: '1rem 0',
};

function Landingpage() {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showMore, setShowMore] = useState({
    express: false,
    tracking: false,
    packaging: false,
    warehouse: false,
    office: false,
  });

  const toggleShowMore = (section) => {
    setShowMore((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const locationParagraphStyle = {
    margin: '0',
    color: '#333333', // Dark gray color
    fontSize: '1.2rem',
    textAlign: 'center', // Center align text
    fontFamily: 'Open Sans, sans-serif',
 };

 const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover', // Ensure the image covers the entire section
  backgroundPosition: 'center', // Center the image
  padding: '20px', // Add padding for better spacing
  color: 'white', // Ensure text is readable on the background
};

// const headerStyle = {
//   marginBottom: '2rem',
//   textAlign: 'center',
//   color: 'black',
//   fontSize: '3rem',
//   fontFamily: 'Georgia, serif',
//   fontWeight: 'bold',
// };

const locationStyle = {
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  marginBottom: '1rem',
  padding: '1rem',
};

const locationHeaderStyle = {
  marginTop: '0',
  color: '#003366', // Dark blue color
  fontSize: '1.5rem',
  textAlign: 'center', // Center align header
  fontFamily: 'Georgia, serif',
};

  return (
    <CRow className='mb-3'>
      <CCard>
        <CRow className='mb-3'>
        {/* colorScheme="light" variant="underline-border justify-content-end" */}
          <CNavbar className={`bg-body-tertiary ${scrolled ? 'd-none' : ''}`} expand="lg" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
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
        <CCard className="mb-3 bg-dark text-black">
          <CCardImageOverlay>
            <CRow>
              <CNavbar colorScheme="dark" className={`bg-dark ${scrolled ? 'visible' : 'd-none'}`} expand="lg" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
                <CCol xs={6}>
                  <CNav as="nav" expand="lg" layout="fill">
                    <CCollapse className='navbar-collapse w-100'  variant="underline-border" visible>
                      <CNavbarNav>
                        <CNavItem>
                          <CNavLink href='/landingPage'>
                            <h6>Yoga Tansport</h6>
                          </CNavLink>
                        </CNavItem>
                      </CNavbarNav>
                    </CCollapse>
                  </CNav>
                </CCol>

                <CCol xs={4}>
                  <CNav as="nav" variant="underline" expand="lg" layout="fill">
                    <CCollapse className='navbar-collapse'  variant="underline-border" visible>
                      <CNavbarNav>
                        <CNavItem>
                          <CNavLink href='/landingPage'>
                            Home
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink href='/'>
                            Our Services
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink href='/branch'>
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

                <CCol xs={2}>
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
            </CRow>

            {/* <CRow className="mb-4 ">
              <CCardTitle className="text-center">
                <strong className="d-grid gap-2 d-md-flex justify-content-md-start">Yoga Transport</strong>
              </CCardTitle>
            </CRow>
            
            <CRow className="mb-4">
              <CCardText className="text-center">
              <CRow className="mb-2"/>
                <h1 className="d-grid gap-2 d-md-flex justify-content-center">Courier Service in Srilanka</h1>
              </CCardText>
            </CRow>       */}
          </CCardImageOverlay>
        </CCard>
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
                <CCardImageOverlay>
                  <CContainer>
                    <CCardText className="d-none d-md-block text-end">
                    <h1 style={{ color: 'black' }}>
                      Opportunity In Every Direction
                    </h1>
                    <p style={{ color: 'black' }}>
                      We offer a complete array of services which can be tailor made to provide the best logistics to<br/>
                      corporate entities and suit individual needs
                    </p>
                    </CCardText>
                  </CContainer>
                </CCardImageOverlay>
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
              <h1 style={{ color: 'black' }}><strong>Track Your Item</strong></h1>
            </CCardText>
          </CContainer>

          <div className=" min-vh-50 d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                <CCol md={12}>
                    <CCardBody>
                      <CForm>
                        <h3 className="text-dark"><strong>Track & Trace</strong></h3>
                      <CRow className="mb-3"/>
                      <CRow className="mb-3 text-center">
                          <CFormInput 
                            className="col-sm-4 col-form-label"
                            placeholder='Tracking Number'
                            type="text" 
                            id="inputTrackingNumber"
                            style={{ backgroundColor: 'transparent', color: 'black' }}
                            // value={trackingNumber} 
                            // onChange={(e) => setTrackingNumber(e.target.value)}
                          />                      
                      </CRow>

                      <CRow>
                        <div className="d-grid gap-2 col-4 mx-auto">
                          <CButton color="dark">Track</CButton>
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
                  </CCol>
                </CRow>
              </CContainer>
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
                  <h1 className="text-dark"><strong>About Us</strong></h1><br/>
                  <p className="text-dark">
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
                    <CImage align="center" rounded className="d-block d-flex w-100" height={450} src={aboutusImg} alt="slide 1"/>
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </CCardImageOverlay>
      </CCard>

      {/* <CRow className="mb-5"></CRow> */}

      <CCard>
        {/* <CImage className="d-block w-100" src={whiteImg} alt="slide 1"  height={700}/>
        <CCardImageOverlay> */}
            {/* <CContainer className="justify-content-center">
              <br/><br/><br/><br/>
              <CCardText className="d-none d-md-block justify-content-center">
                <p style={{ color: 'orange' }}>Opportunity in every direction</p>
                <h1 style={{ color: 'black' }}><strong>Our Services</strong></h1>
                <h6 style={{ color: 'grey' }}>
                  Pronto Lanka goes extra mile in delivering logistics solutions to our customers with a<br/> 
                  portfolio of services to ease the needs of the customers.
                </h6>
              </CCardText>
            </CContainer> */}

            <CContainer className="services-container" style={{ position: 'relative', overflow: 'hidden' }}>
              <CRow className="justify-content-center mb-4">
                <CCol xs="auto">
                  <h1 style={headerStyle} className="text-center">Our Services</h1>
                </CCol>
              </CRow>
              <p className="text-end">YOGA Transport goes the extra mile in delivering logistics solutions to our customers with a portfolio of services to ease the needs of the customers.</p>
      
              {/* Express Delivery Section */}
              <CCallout color="primary" style={calloutStyle}>
                <h3 style={headerStyle}>Express Delivery</h3>
                <CImage
                  src={expressImage}
                  alt="Express Delivery"
                  style={imageStyle}
                />
                {/* <p className="text-end">Fast and reliable express delivery service.</p> */}
                <p><strong>Express delivery service:</strong> Provides the fastest shipping options with guaranteed delivery times.</p>
                {showMore.express && (
                  <p>This service ensures that your packages are delivered as quickly as possible, with real-time tracking and priority handling. Our express delivery covers both local and international destinations.</p>
                )}
                <CButton onClick={() => toggleShowMore('express')} color="link">
                  {showMore.express ? 'Read Less' : 'Read More'}
                </CButton>
              </CCallout>
      
              {/* Parcel Tracking Section */}
              <CCallout color="secondary" style={calloutStyle}>
                <h3 style={headerStyle}>Parcel Tracking</h3>
                <CImage
                  src={parcelTrackingImage}
                  alt="Parcel Tracking"
                  style={imageStyle}
                />
                {/* <p className="text-end">Real-time tracking of your parcels.</p> */}
                <p><strong>Parcel tracking service:</strong> Allows you to monitor your parcel&apos;s journey in real-time.</p>
                {showMore.tracking && (
                  <p>With our advanced tracking system, you can view the current status of your shipment, estimated delivery times, and any updates along the way. Stay informed with instant notifications and detailed tracking reports.</p>
                )}
                <CButton onClick={() => toggleShowMore('tracking')} color="link">
                  {showMore.tracking ? 'Read Less' : 'Read More'}
                </CButton>
              </CCallout>
              
              {/* Secure Packaging Section */}
              <CCallout color="success" style={calloutStyle}>
                <h3 style={headerStyle}>Secure Packaging</h3>
                <CImage
                  src={securePackagingImage}
                  alt="Secure Packaging"
                  style={imageStyle}
                />
                {/* <p className="text-end">Secure packaging to ensure safe delivery.</p> */}
                <p><strong>Secure packaging service:</strong> Ensures that your items are packed safely for transport.</p>
                {showMore.packaging && (
                  <p>Our secure packaging solutions use high-quality materials and techniques to prevent damage during transit. Whether you’re shipping fragile items or bulk goods, we guarantee safe and intact delivery.</p>
                )}
                <CButton onClick={() => toggleShowMore('packaging')} color="link">
                  {showMore.packaging ? 'Read Less' : 'Read More'}
                </CButton>
              </CCallout>
      
              {/* Warehouse Management Section */}
              <CCallout color="danger" style={calloutStyle}>
                <h3 style={headerStyle}>Warehouse Management Solution</h3>
                <CImage
                  src={warehouseImage}
                  alt="Warehouse Management Solution"
                  style={imageStyle}
                />
                {/* <p className="text-end">Efficient management of warehouse operations.</p> */}
                <p><strong>Warehouse management service:</strong> Streamlines inventory management and order fulfillment.</p>
                {showMore.warehouse && (
                  <p>Our warehouse management solutions optimize storage, reduce handling time, and improve order accuracy. Advanced software integration and real-time inventory tracking ensure your goods are always managed efficiently.</p>
                )}
                <CButton onClick={() => toggleShowMore('warehouse')} color="link">
                  {showMore.warehouse ? 'Read Less' : 'Read More'}
                </CButton>
              </CCallout>
              
              {/* Office to Office Service Section */}
              <CCallout color="warning" style={calloutStyle}>
                <h3 style={headerStyle}>Office to Office Service</h3>
                <CImage
                  src={officeToOfficeImage}
                  alt="Office to Office Service"
                  style={imageStyle}
                />
                {/* <p className="text-end">Office to office delivery around the city, where your product will be at your doorstep within 24-48 hours.</p> */}
                <p className="text-end">* Offices hold packages for 7 days.</p>
                <p><strong>Office to office delivery service:</strong> Provides fast and convenient delivery between business locations.</p>
                {showMore.office && (
                  <p>This service is ideal for urgent business documents, packages, and other office materials. Our office-to-office service ensures timely delivery with the convenience of pickup and drop-off scheduling.</p>
                )}
                <CButton onClick={() => toggleShowMore('office')} color="link">
                  {showMore.office ? 'Read Less' : 'Read More'}
                </CButton>
              </CCallout>
            </CContainer>

          <div className=" min-vh-50 d-flex flex-row align-items-center">

          </div>
          {/* </CCardImageOverlay> */}
      </CCard>

      {/* <CRow className="mb-5"></CRow> */}

      {/* <CCard> */}
        <CContainer fluid style={backgroundStyle}>
          <CRow className="justify-content-center">
              <div style={headerStyle}>
                <h2>Find Us</h2>
              </div>
          </CRow>
          <CRow className="justify-content-center">
              <div style={locationStyle}>
                <h3 style={locationHeaderStyle}>Main Office</h3>
                <p style={locationParagraphStyle}>123 Main Street</p>
                <p style={locationParagraphStyle}>New York, NY 10001</p>
                <p style={locationParagraphStyle}>Phone: (123) 456-7890</p>
              </div>
              <div style={locationStyle}>
                <h3 style={locationHeaderStyle}>Branch Office</h3>
                <p style={locationParagraphStyle}>456 Branch Avenue</p>
                <p style={locationParagraphStyle}>Los Angeles, CA 90001</p>
                <p style={locationParagraphStyle}>Phone: (456) 789-0123</p>
              </div>
          </CRow>
        </CContainer>
      {/* </CCard> */}

      <CRow className="mb-5"></CRow>

      {/* <CCard> */}
        <CContainer style={{ width: '80%', margin: '0 auto' }}>
          <CRow className='align-items-center'>
            <CCol xs={12} md={6}>
              <CCard style={{ width: '100%', padding: '0.5rem', minHeight: '200px' }}>
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Contact Us</strong></h2>
                <CCardBody style={{ padding: '0.5rem' }}>
                    <CForm className="row g-2" >
                      <CRow className='mb-2'>
                        <CCol xs={12}>
                          <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                            Name:
                          </CFormLabel>
                          <CFormInput 
                            type='text' 
                            name="name" 
                          //  value={this.state.name} 
                          //   onChange={this.handleChange} 
                            required 
                            style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                              Email:
                          </CFormLabel>
                          <CFormInput 
                              type='email' 
                              name="email" 
                            //  value={this.state.email} 
                            //  onChange={this.handleChange} 
                              required 
                              style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                              Phone Number:
                          </CFormLabel>                                  
                          <CFormInput 
                              type='tel' 
                              name="phone" 
                            //  value={this.state.phone} 
                            //  onChange={this.handleChange} 
                              style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                            Message:
                          </CFormLabel>
                          <CFormTextarea
                            name="message"
                          //  value={this.state.message}
                          //  onChange={this.handleChange}
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: '50px', marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }}
                            required
                          />
                        </CCol>
                        <CCol xs={12}>
                          <button 
                            type="submit" 
                            className="btn btn-primary mt-1" 
                            style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}
                          >
                            Submit
                          </button>
                        </CCol>
                      </CRow>
                    </CForm>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} md={6} className="d-flex align-items-center justify-content-center">
              <CImage src={ContactUs_1} width={300} />
            </CCol>
          </CRow>
        </CContainer>
      {/* </CCard> */}
    </CRow>
  )
}

export default Landingpage