import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Contactus.css';

class Contactus extends Component {
   state = {
      name: '',
      email: '',
      message: ''
   };

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic (e.g., send data to backend)
      console.log('Form submitted:', this.state);
      // Clear form fields
      this.setState({
         name: '',
         email: '',
         phone: '',
         message: ''
      });
   }

   render() {
      return (
         <div className="contactus-container">
            <h2>Contact Us</h2>
            <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                  <label>
                     Name
                     <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                  </label>
               </div>
               <div className="form-group">
                  <label>
                     Email
                     <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                  </label>
               </div>
               <div className="form-group">
                  <label>
                     Phone Number
                     <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} />
                  </label>
               </div>
               <div className="form-group">
                  <label>
                     Message
                     <textarea name="message" value={this.state.message} onChange={this.handleChange} rows="4" required></textarea>
                  </label>
               </div>
               <button type="submit">Submit</button>
               <div className="feature">

                  <p><h4>REQUEST A CALLBACK.</h4>
                     We will Contact in the shortest time.


                  </p>

                  <p>Don't have an account? <Link to="/registion">Registration</Link></p>
               </div>
            </form>
         </div>
      );
   }
}

export default Contactus;

