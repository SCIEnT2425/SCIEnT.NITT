import React, { useEffect, useState } from "react";
import "./Contact.css";
import { useForm } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("movqgara");
  const [isSubmitted, setIsSubmitted] = useState(false); // Local state to track submission

  useEffect(() => {
    if (state.succeeded && !isSubmitted) {
      alert("Message submitted successfully!");
      document.getElementById("contact-form").reset(); // for Clearing the form
      setIsSubmitted(true); // Prevent duplicate alerts
    }
  }, [state.succeeded, isSubmitted]);

  const handleNewSubmission = () => {
    setIsSubmitted(false); // for Allowing new submission
  };

  return (
    <div className="contact-container">
      <div className="headercontact">
        <h1>CONTACT US</h1>
        <p>Reach out for a new project or just say hello</p>
      </div>
      <div className="contact-content">
        <div className="contact-form">
          <h3>SEND US A MESSAGE</h3>
          <form
            id="contact-form"
            onSubmit={(e) => {
              handleNewSubmission(); // Reset submission state
              handleSubmit(e); // Submit the form
            }}
          >
            <input type="text" name="name" placeholder="Your name" required />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" placeholder="Message" required></textarea>
            <button className="submit" type="submit" disabled={state.submitting}>
              SUBMIT
            </button>
          </form>
        </div>
        <div className="contact-info">
          <h3 className="contact-info-header">CONTACT INFO</h3>
          <h4>Call us (Manager:) at:</h4>
          <p>Sivenasan: +91 90925 59610</p>
          <h4>Call us (Student Heads:) at:</h4>
          <p>Alan Prakash: +91 93608 45683</p>
          <p>Arjun B K  : +91 86104 50988</p>
          <p>Alok Verma:  +91 74080 92857</p>
          <h4>Email us at</h4>
          <p>
          scient@nitt.edu
            <br />
          </p>
          <h4>Where to find us</h4>
          <p>NIT Trichy</p>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.701761855082!2d78.8138688748695!3d10.757452689390144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa8d3d71d1d26b%3A0xfb1eb8b4045b0de!2sSCIEnT%20Lab!5e0!3m2!1sen!2sin!4v1723030553957!5m2!1sen!2sin"
              width="250"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;