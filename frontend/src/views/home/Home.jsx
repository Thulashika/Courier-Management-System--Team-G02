import React from 'react';
import './Home.css'; 

const Home = () => {
   return (
      <div className="home-container">
         <img src=''/>
         <img src={'/assets/images/homepage.jpg'} alt="Homepage" />
         <section className="hero-section">
            <div className="hero-content">
               <h1>Welcome to Our Courier Management System</h1>
               <p>Efficient, reliable, and secure courier services at your doorstep.</p>
               <button className="btn">Get Started</button>
               <button className="btn">Pick-to-request</button>
              
            </div>
         </section>
         <section className="features-section">
            <div className="feature">
               <h2>Track Your Parcel</h2>
               <p>Real-time tracking of your parcels ensures you are always updated.</p>
            </div>
            <div className="feature">
               <h2> Shipping</h2>
               <p>Efficient shipping services , delivering your parcels on time.</p>
            </div>
            <div className="feature">
               <h2>Secure Packaging</h2>
               <p>Safe and secure packaging to protect your valuable items during transit.</p>
               
            </div>
         </section>
      </div>
   );
};

export default Home;