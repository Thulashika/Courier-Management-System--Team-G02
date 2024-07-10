import React from 'react';
import './Findus.css'; // Import CSS for styling (create this file if needed)

const Findus = () => {
   return (
      <div className="find-us-container">
         <h2>Find Us</h2>
         <div className="location">
            <h3>Main Office</h3>
            <p>123 Main Street</p>
            <p>New York, NY 10001</p>
            <p>Phone: (123) 456-7890</p>
         </div>
         <div className="location">
            <h3>Branch Office</h3>
            <p>456 Branch Avenue</p>
            <p>Los Angeles, CA 90001</p>
            <p>Phone: (456) 789-0123</p>
         </div>
      </div>
   );
};

export default Findus;
