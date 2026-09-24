import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { PropertyRequestData } from '../types';
import { saveLead } from '../lib/supabaseService';

export const PropertyRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyRequestData>({
    fullName: '',
    phoneNumber: '',
    preferredLocation: '',
    propertyType: '',
    annualBudget: '',
    moveInDate: '',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      fullName,
      phoneNumber,
      preferredLocation,
      propertyType,
      annualBudget,
      moveInDate,
      requirements,
    } = formData;

    if (!fullName || !phoneNumber || !preferredLocation || !propertyType || !annualBudget) {
      alert('Please fill in all required fields.');
      return;
    }

    // Save lead to Firestore first — guaranteed capture even if WhatsApp fails
    try {
      await saveLead(formData);
    } catch (err) {
      console.error('Failed to save lead:', err);
      // Do not block the user — still open WhatsApp
    }

    const message =
      `Property Request%0A` +
      `Name: ${encodeURIComponent(fullName.trim())}%0A` +
      `Phone: ${encodeURIComponent(phoneNumber.trim())}%0A` +
      `Location: ${encodeURIComponent(preferredLocation)}%0A` +
      `Property Type: ${encodeURIComponent(propertyType)}%0A` +
      `Annual Budget: ${encodeURIComponent(annualBudget.trim())}%0A` +
      `Move-in Date: ${encodeURIComponent(moveInDate || 'Flexible')}%0A` +
      `Notes: ${encodeURIComponent(requirements.trim() || 'None')}`;

    const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

    setSubmitted(true);
    setFormData({
      fullName: '',
      phoneNumber: '',
      preferredLocation: '',
      propertyType: '',
      annualBudget: '',
      moveInDate: '',
      requirements: '',
    });

    const newWindow = window.open(waUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = waUrl;
    }
  };

  return (
    <section id="property-request" className="bg-light">
      <div className="container">
        <span className="eyebrow">Request a Property</span>
        <h2 className="section-title">
          Click the Form Below to See Available Rental Options
        </h2>
        <p className="section-sub">
          Tell us your preferred location, apartment type and budget. We'll match
          you with verified available properties and contact you with the best
          options.
        </p>

        <div className="request-wrap" style={{ marginTop: '40px' }}>
          <div className="request-side">
            <h2>We'll Find It For You</h2>
            <p>
              Skip the endless scrolling. Share your requirements once and our
              team sources matching, verified properties from across Abuja on your
              behalf.
            </p>
            <ul className="request-points">
              <li>
                <span>✔</span>Matched within 24–48 hours
              </li>
              <li>
                <span>✔</span>Verified listings only
              </li>
              <li>
                <span>✔</span>Free, no-obligation service
              </li>
              <li>
                <span>✔</span>Follow-up on WhatsApp or phone
              </li>
            </ul>
          </div>

          <div className="request-form">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field full">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Amaka Johnson"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field full">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="e.g. 080XXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="preferredLocation">Preferred Location *</label>
                  <select
                    id="preferredLocation"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {siteConfig.districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="propertyType">Property Type *</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    {siteConfig.propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="annualBudget">Annual Budget (₦) *</label>
                  <input
                    type="text"
                    id="annualBudget"
                    name="annualBudget"
                    placeholder="e.g. 2,000,000"
                    value={formData.annualBudget}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="moveInDate">Preferred Move-in Date</label>
                  <input
                    type="date"
                    id="moveInDate"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field full">
                  <label htmlFor="requirements">Additional Requirements</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    placeholder="e.g. must have 24hr power, close to a school, pet-friendly..."
                    value={formData.requirements}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Find My Property
              </button>

              {submitted && (
                <div
                  className="form-success show"
                  style={{ marginTop: '16px' }}
                  role="status"
                >
                  Thank you! Your request has been received. A RentABJ Homes
                  representative will contact you shortly with available
                  properties that match your requirements.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
