
import React from 'react';
import './Ourservices.css'; // Importing CSS for styling (create this file if needed)

const Ourservices = () => {
   return (
      <div className="services-container">
         <h2>Our Services</h2>
         <div className="service">
            <h3>Express Delivery</h3>
            <p>Fast and reliable express delivery service.</p>
         </div>
         <div className="service">
            <h3>Parcel Tracking</h3>
            <p>Real-time tracking of your parcels.</p>
         </div>
         <div className="service">
            <h3>Secure Packaging</h3>
            <p>Secure packaging to ensure safe delivery.</p>
         </div>
         <div className="service">
            <h3>International Shipping</h3>
            <p>Efficient shipping services worldwide.</p>
         </div>
         <div className="service">
            <h3>Office to Office Service</h3>
            <p>Office to office delivery around the city, where your product will be at your doorstep within 24-48 hours.</p>
            <p>* Offices hold packages for 7 days.</p>
         </div>
      </div>
   );
};

export default Ourservices;
