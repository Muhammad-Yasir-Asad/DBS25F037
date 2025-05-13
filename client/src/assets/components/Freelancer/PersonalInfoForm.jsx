  import React, { useState, useEffect } from 'react';
  import Select from 'react-select';
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  import { useNavigate } from 'react-router-dom';

  const countryOptions = [
    { value: 'PK', label: 'Pakistan' },
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'IN', label: 'India' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'CN', label: 'China' },
    { value: 'JP', label: 'Japan' },
    { value: 'RU', label: 'Russia' },
    { value: 'BR', label: 'Brazil' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'MX', label: 'Mexico' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'KR', label: 'South Korea' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'AE', label: 'United Arab Emirates' },
  ];

  const PersonalInfoForm = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      bio: '',
      profilePicture: null,
    });
    

    const [descriptionCount, setDescriptionCount] = useState(0);
    const [profilePreview, setProfilePreview] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
      const token = localStorage.getItem('auth-token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded); // For debugging
      if (decoded?.nameid) {
        setUserId(decoded.nameid);
      } else {
        console.warn('User ID not found in token');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

    }, []);

    // Form validation
    useEffect(() => {
      const isValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    /^\d{11}$/.test(formData.phone) &&
    formData.country !== '' &&
    formData.bio.trim().length >= 250 &&
    formData.profilePicture !== null;

  setIsFormValid(isValid);
    }, [formData]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'bio') {
        setDescriptionCount(value.length);
      }
      setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (e) => {
      const value = e.target.value;
      if (/^\d{0,11}$/.test(value)) {
        setFormData({ ...formData, phone: value });
      }
    };

    const handleCountryChange = (selectedOption) => {
      setFormData({ ...formData, country: selectedOption.value });
    };



    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, profilePicture: file });
        setProfilePreview(URL.createObjectURL(file));
      }
    };

    const resetForm = () => {
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        bio: '',
        profilePicture: null,
      });
      setProfilePreview(null);
      setDescriptionCount(0);
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userId) {
        setSubmitError('User not authenticated');
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      const userIdAsInt = parseInt(userId, 10);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append('userID', userIdAsInt);
  formDataToSend.append('firstName', formData.firstName);
  formDataToSend.append('lastName', formData.lastName);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('country', formData.country);
  formDataToSend.append('bio', formData.bio);

  if (formData.profilePicture) {
    formDataToSend.append('profilePicture', formData.profilePicture);
  }
        

        const token = localStorage.getItem('authToken');
        const response = await axios.post(
          `https://skillhub.runasp.net/api/auth/personal-information`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data.data === false) {
          setSubmitError('Phone number is already taken. Please use a different number.');
          return;
        }
    

        if (response.data.data === true) {
          setSubmitSuccess(true);
          resetForm();
          navigate("/freelancer/professional_information");
        } else {
          throw new Error(response.data.message || 'Request failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
    
        if (error.response) {
          if (error.response.status === 400 && error.response.data.errors) {
            const errorMessages = Object.values(error.response.data.errors)
              .flat()
              .join('\n');
            setSubmitError(errorMessages);
          } else {
            setSubmitError(error.response.data.message || 'Request failed');
          }
        } else {
          setSubmitError(error.message || 'Failed to connect to server');
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
        <p className="text-gray-600 mb-6">
          Tell us a bit about yourself. This information will appear on your public profile.
        </p>

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Your profile information has been saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter 11-digit phone number"
            />
            {formData.phone && formData.phone.length !== 11 && (
              <p className="text-sm text-red-500 mt-1">
                Phone number must be exactly 11 digits.
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <Select
              name="country"
              options={countryOptions}
              value={countryOptions.find(option => option.value === formData.country)}
              onChange={handleCountryChange}
              placeholder="Select your country"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {profilePreview && (
              <div className="mt-4">
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bio"
              value={formData.description}
              onChange={handleChange}
              required
              minLength={100}
              maxLength={500}
              rows={5}
              placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              {descriptionCount} / 600 characters
            </p>
            {formData.bio.length > 0 && formData.bio.length < 250 && (
              <p className="text-sm text-red-500 mt-1">
                Description must be at least 250 characters.
              </p>
            )}
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-2 px-4 rounded-md transition ${
                isFormValid && !isSubmitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default PersonalInfoForm;