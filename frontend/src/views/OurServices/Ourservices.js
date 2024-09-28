
import React, { useState } from 'react';
import { CContainer, CCallout, CImage, CRow, CCol, CButton } from '@coreui/react';
import expressImage from '../../assets/images/express.jpg'; 
import parcelTrackingImage from '../../assets/images/track.jpg'; 
import securePackagingImage from '../../assets/images/pack.jpg'; 
import warehouseImage from '../../assets/images/management.jpg'; 
import officeToOfficeImage from '../../assets/images/office.jpg'; 

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

  return (
    <CContainer className="services-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <CRow className="justify-content-center mb-4">
        <CCol xs="auto">
          <h2 style={headerStyle} className="text-center">Our Services</h2>
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
  );
};

export default Ourservices;
