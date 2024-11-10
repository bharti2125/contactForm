import React, { useState } from "react";
import axios from "axios";

function BackgroundContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: "",
    message: "",
    consent: false,
  });

   const handleOnSubmit = async ()=>{
   try {
    const response =await  axios.post("http://localhost:4000/data",{
      firstName: formData.firstName,
      lastName:  formData.lastName,
      email:  formData.email,
      query:  formData.query,
      message:  formData.message,
    });
    console.log(response.data);
    alert(response.data.message);
   } catch(error) {
    console.error("There was an error submitting the form:", error);
   }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/data", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        query: formData.query,
        message: formData.message,
      });
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));

    if (e.target.name === "query") {
      setErrors((prev) => ({ ...prev, query: "" }));
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "This field is required.";
    if (!formData.lastName) newErrors.lastName = "This field is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.consent) newErrors.consent = "To Submit this form, Please consent to being contacted.";
    if (!formData.query) newErrors.query = "Please select a Query Type.";
    if (!formData.message) newErrors.message = "This field is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // alert("Thanks for completing the form. We'll be touch in soon!");
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <div className="content-form">
        <h1 className="heading">Contact Us:</h1>
        <form onSubmit={handleOnChange}>
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "error" : ""}`}
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <div
              className={`invalid-feedback ${errors.firstName ? "active" : ""}`}
            >
              {errors.firstName}
            </div>
          </div>
          <br />
          <div className="col-sm-6">
            <label for="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "error" : ""}`}
              value={formData.lastName}
              onChange={handleChange}
              id="lastName"
            />
            <div
              className={`invalid-feedback ${errors.lastName ? "active" : ""}`}
            >
              {errors.lastName}
            </div>
          </div>
          <br />
          <br />
          <div className="col-12">
            <label for="email" className="form-label">
              Email Address
            </label>
            <br />
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "error" : ""}`}
              value={formData.email}
              placeholder="xyz@gmail.com"
              onChange={handleChange}
            />
            <div className={`invalid-feedback ${errors.email ? "active" : ""}`}>
              {errors.email}
            </div>
          </div>
          <br />
          <br />
          <div className="col-12">
            <label for="query" className="form-label">
              Query Type
            </label>
            <br />
            <div className="query-selector">
              <div className="form-control">
                <input
                  type="radio"
                  id="General-Enquiry"
                  name="query"
                  value="General-Enquiry"
                  onChange={(e) =>
                    setFormData({ ...formData, query: e.target.value })
                  }
                />
                General Enquiry
              </div>
              <div className="form-control">
                <input
                  type="radio"
                  id="Support-Request"
                  name="query"
                  value="Support-Request"
                  onChange={(e) =>
                    setFormData({ ...formData, query: e.target.value })
                  }
                />
                Support-Request
              </div>
              <div
                className={`invalid-feedback ${errors.query ? "active" : ""}`}
              >
                {errors.query}
              </div>
            </div>
          </div>
          <br />
          <br />
          <label for="name" className="form-label">
            Message
          </label>
          <br />
          <textarea
            id="message"
            rows="5"
            className={`form-control ${errors.message ? "error" : ""}`}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write something here:"
          />
          <div className={`invalid-feedback ${errors.message ? "active" : ""}`}>
            {errors.message}
          </div>
          <br />
          <br />
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="consent"
              checked={formData.consent}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, consent: e.target.checked }))
              }
            />
            <label className="form-check-label" for="consent">
              I consent to being contacted by the team
            </label>
            <div
              className={`invalid-feedback ${errors.consent ? "active" : ""}`}
            >
              {errors.consent}
            </div>
          </div>
          <br />
          <br />
          <button type="submit" className="btn" onClick={handleOnSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BackgroundContent;
