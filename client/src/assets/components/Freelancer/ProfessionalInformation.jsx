import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Transgender', label: 'Transgender' },
  { value: 'Genderqueer', label: 'Genderqueer' },
  { value: 'Intersex', label: 'Intersex' },
  { value: 'Other', label: 'Other' },
  { value: 'Agender', label: 'Agender' },
  { value: 'Bigender', label: 'Bigender' },
  { value: 'Two-Spirit', label: 'Two-Spirit' },
];

const languageOptions = [
  { value: 'EN', label: 'English' },
  { value: 'ES', label: 'Spanish' },
  { value: 'ZH', label: 'Mandarin' },
  { value: 'AR', label: 'Arabic' },
  { value: 'HI', label: 'Hindi' },
  { value: 'BN', label: 'Bengali' },
  { value: 'PT', label: 'Portuguese' },
  { value: 'RU', label: 'Russian' },
  { value: 'JA', label: 'Japanese' },
  { value: 'KO', label: 'Korean' },
  { value: 'FR', label: 'French' },
  { value: 'DE', label: 'German' },
  { value: 'IT', label: 'Italian' },
  { value: 'TR', label: 'Turkish' },
  { value: 'PL', label: 'Polish' },
  { value: 'NL', label: 'Dutch' },
  { value: 'SV', label: 'Swedish' },
  { value: 'ID', label: 'Indonesian' },
  { value: 'TH', label: 'Thai' },
  { value: 'VI', label: 'Vietnamese' },
  { value: 'ML', label: 'Malay' },
  { value: 'TA', label: 'Tamil' },
  { value: 'TE', label: 'Telugu' },
  { value: 'FA', label: 'Persian' },
];

const educationLevels = [
  { value: 'Matric', label: 'Matric' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'BS', label: 'BS' },
  { value: 'BSc', label: 'BSc' },
  { value: 'MS', label: 'MS' },
  { value: 'MSc', label: 'MSc' },
];

const educationSubjects = {
  Matric: ['Science', 'Arts', 'Commerce', 'Other'],
  Intermediate: ['Pre-medical', 'Pre-engineering', 'Commerce', 'Arts', 'Other'],
  BS: [
    'Computer Science', 'Software Engineering', 'Mechanical Engineering',
    'Electrical Engineering', 'Business Administration', 'Psychology',
    'Education', 'Law', 'Architecture', 'Economics', 'Other',
  ],
  BSc: ['Biology', 'Chemistry', 'Physics', 'Mathematics', 'Economics', 'Computer Science', 'Engineering', 'Other'],
  MS: ['Computer Science', 'Business Administration', 'Mechanical Engineering', 'Electrical Engineering', 'Physics', 'Economics', 'Psychology', 'Data Science', 'Mathematics', 'Other'],
  MSc: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Psychology', 'Sociology', 'Economics', 'Engineering', 'Other'],
};

const ProfessionalInformation = () => {
  const [formData, setFormData] = useState({
    gender: '',
    language: '',
    educationLevel: '',
    educationSubject: '',
  });

  const [educationSubjectsOptions, setEducationSubjectsOptions] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setResponseMessage('');
  };

  const handleEducationLevelChange = (e) => {
    const level = e.target.value;
    setFormData(prev => ({
      ...prev,
      educationLevel: level,
      educationSubject: '',
    }));
    setEducationSubjectsOptions(educationSubjects[level] || []);
    setError('');
    setResponseMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { gender, language, educationLevel, educationSubject } = formData;
    if (!gender || !language || !educationLevel || !educationSubject) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    const userID = parseInt(userId, 10);

    const education = `${educationLevel} - ${educationSubject}`;

    const payload = {
      userID,
      gender,
      education,
      language
    };

    try {
      setLoading(true); 
      const response = await fetch('https://skillhub.runasp.net/api/freelancer/add_Freelancer_information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.data === true) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed.');
      }

      setResponseMessage('Information submitted successfully.');
      localStorage.setItem('freelancerProfileCompleted', 'true');
      setFormData({
        gender: '',
        language: '',
        educationLevel: '',
        educationSubject: '',
      });
      setEducationSubjectsOptions([]);
      navigate('/freelancer/manage_gig');
    } catch (err) {
      console.error('Error submitting:', err.message);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.gender &&
    formData.language &&
    formData.educationLevel &&
    formData.educationSubject;

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Professional Information</h2>
      <p className="text-gray-600 mb-6">
        Tell us a bit about your professional information. This information will be visible to all clients.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Gender</option>
            {genderOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Language</option>
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Education Level</label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleEducationLevelChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Education Level</option>
            {educationLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Education Subject */}
        {formData.educationLevel && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              name="educationSubject"
              value={formData.educationSubject}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Subject</option>
              {educationSubjectsOptions.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
  type="submit"
  disabled={!isFormValid || loading}
  className={`w-full py-2 px-4 flex justify-center items-center rounded-md transition ${
    isFormValid && !loading
      ? 'bg-green-600 text-white hover:bg-green-700'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }`}
>
  {loading ? (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  ) : (
    'Submit'
  )}
</button>

      </form>

      {/* Feedback Messages */}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {responseMessage && <p className="text-green-600 mt-4 text-center">{responseMessage}</p>}
    </div>
  );
};

export default ProfessionalInformation;
