
import React from 'react';
import { CContainer, CCallout, CImage, CRow, CCol } from '@coreui/react';
import expressImage from '../../assets/images/express.jpg'; // Adjust the path according to your file structure
import parcelTrackingImage from '../../assets/images/track.jpg'; // Adjust the path according to your file structure
import securePackagingImage from '../../assets/images/pack.jpg'; // Adjust the path according to your file structure
import warehouseImage from '../../assets/images/management.jpg'; // Adjust the path according to your file structure
import officeToOfficeImage from '../../assets/images/office.jpg'; // Adjust the path according to your file structure

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

const Ourservices = () => {
  return (
    <CContainer className="services-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* <div style={backgroundImageStyle}></div> */}
      <CRow className="justify-content-center mb-4">
        <CCol xs="auto">
          <h2 style={headerStyle} className="text-center">Our Services</h2>
        </CCol>
      </CRow>
      <p className="text-end">YOGA Transport goes the extra mile in delivering logistics solutions to our customers with a portfolio of services to ease the needs of the customers.</p>
      <CCallout color="primary" style={calloutStyle}>
        <h3 style={headerStyle}>Express Delivery</h3>
        <CImage
          src={expressImage}
          alt="Express Delivery"
          style={imageStyle}
        />
        <p className="text-end">Fast and reliable express delivery service.</p>
      </CCallout>
      <CCallout color="secondary" style={calloutStyle}>
        <h3 style={headerStyle}>Parcel Tracking</h3>
        <CImage
          src={parcelTrackingImage}
          alt="Parcel Tracking"
          style={imageStyle}
        />
        <p className="text-end">Real-time tracking of your parcels.</p>
      </CCallout>
      <CCallout color="success" style={calloutStyle}>
        <h3 style={headerStyle}>Secure Packaging</h3>
        <CImage
          src={securePackagingImage}
          alt="Secure Packaging"
          style={imageStyle}
        />
        <p className="text-end">Secure packaging to ensure safe delivery.</p>
      </CCallout>
      <CCallout color="danger" style={calloutStyle}>
        <h3 style={headerStyle}>Warehouse Management Solution</h3>
        <CImage
          src={warehouseImage}
          alt="Warehouse Management Solution"
          style={imageStyle}
        />
        <p className="text-end">Efficient management of warehouse operations.</p>
      </CCallout>
      <CCallout color="warning" style={calloutStyle}>
        <h3 style={headerStyle}>Office to Office Service</h3>
        <CImage
          src={officeToOfficeImage}
          alt="Office to Office Service"
          style={imageStyle}
        />
        <p className="text-end">Office to office delivery around the city, where your product will be at your doorstep within 24-48 hours.</p>
        <p className="text-end">* Offices hold packages for 7 days.</p>
      </CCallout>
    </CContainer>
  );
};

export default Ourservices;

