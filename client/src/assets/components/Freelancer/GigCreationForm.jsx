import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import axios from 'axios';
import { commands } from '@uiw/react-md-editor';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const categoryOptions = [
  { value: 23, label: 'Development' },
  { value: 24, label: 'Design' },
  { value: 25, label: 'Writing' },
  { value: 26, label: 'Marketing' },
  { value: 27, label: 'Analytics & Data' },
  { value: 28, label: 'Multimedia' },
];

const deliveryOptions = [
  { value: '1', label: '1 day Delivery' },
  { value: '2', label: '2 days Delivery' },
  { value: '3', label: '3 days Delivery' },
  { value: '5', label: '5 days Delivery' },
  { value: '7', label: '7 days Delivery' },
];

const revisionOptions = [
  { value: '0', label: 'No Revisions' },
  { value: '1', label: '1 Revision' },
  { value: '2', label: '2 Revisions' },
  { value: '3', label: '3 Revisions' },
  { value: '5', label: '5 Revisions' },
];

const GigCreationForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [packages, setPackages] = useState([
    {
      title: '',
      description: '',
      deliveryTime: '1',
      price: 5,
      wordsIncluded: 500,
      revisions: '2',
      features: {
        proofreading: true,
        research: true,
        citations: true,
        styleGuide: false,
        illustrations: 0,
      },
    },
    {
      title: '',
      description: '',
      deliveryTime: '',
      price: '',
      wordsIncluded: '',
      revisions: '',
      features: {
        proofreading: false,
        research: false,
        citations: false,
        styleGuide: false,
        illustrations: 0,
      },
    },
    {
      title: '',
      description: '',
      deliveryTime: '',
      price: '',
      wordsIncluded: '',
      revisions: '',
      features: {
        proofreading: false,
        research: false,
        citations: false,
        styleGuide: false,
        illustrations: 0,
      },
    },
  ]);

  const [packageErrors, setPackageErrors] = useState([false, false, false]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.nameid || decoded.sub);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const packageValidations = packages.map((pkg, index) => {
      if (index === 0) {
        return (
          pkg.title.length >= 1 &&
          pkg.description.length >= 1 &&
          pkg.deliveryTime !== '' &&
          pkg.price >= 5
        );
      }
      return true;
    });

    const isValidForm =
      title.length >= 1 &&
      title.length <= 80 &&
      category !== null &&
      description.length >= 120 &&
      description.length <= 1200 &&
      imageFile !== null &&
      videoFile !== null &&
      packageValidations.every(valid => valid);

    setIsValid(isValidForm);
    setPackageErrors(packageValidations.map(valid => !valid));
  }, [title, category, description, imageFile, videoFile, packages]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (value) => setDescription(value || '');

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'image') {
        setImageFile(file);
        setImagePreview(reader.result);
      } else {
        setVideoFile(file);
        setVideoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    if (field.startsWith('features.')) {
      const [_, feature] = field.split('.');
      updatedPackages[index].features[feature] = value;
    } else {
      updatedPackages[index][field] = value;
    }
    setPackages(updatedPackages);
  };

  const PriceInput = ({ value, onChange, error }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500">$</span>
      </div>
      <input
        type="number"
        value={value}
        onChange={onChange}
        min="5"
        step="5"
        className={`pl-7 pr-3 py-2 border rounded-md w-full focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
        } transition-colors`}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block">Minimum $5 required</span>
      )}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || !userId) return;

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('category', category.value);
    formData.append('description', description);
    formData.append('image', imageFile);
    formData.append('video', videoFile);
    formData.append('packages', JSON.stringify(packages));

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('https://api.yourservice.com/gigs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        setTimeout(() => navigate('/gigs'), 2000);
      }
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to create gig');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Gig</h1>

      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Gig created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gig Title</label>
          <div className="flex  border rounded-lg p-3 bg-white">
            <span className="mr-2 text-gray-500 font-bold">I will</span>
            <textarea
              value={title}
              onChange={handleTitleChange}
              maxLength={80}
              placeholder="do something I'm really good at"
              className="flex-1 resize-none outline-none bg-transparent"
              rows={2}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-red-500 text-sm">
              {title.length === 0 && 'Title is required'}
            </span>
            <span className="text-gray-500 text-sm">{title.length}/80</span>
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <Select
            options={categoryOptions}
            onChange={setCategory}
            placeholder="Select a category"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: category ? '#e5e7eb' : '#ef4444',
                '&:hover': { borderColor: '#3b82f6' }
              })
            }}
          />
          {!category && (
            <span className="text-red-500 text-sm mt-1">Category is required</span>
          )}
        </div>

        {/* Description Editor */}
        <div className="mb-8">
  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
  <div data-color-mode="light" className="border rounded-lg overflow-hidden bg-white">
    <MDEditor
      value={description}
      onChange={handleDescriptionChange}
      height={400}
      preview="live"
      commands={[
        commands.title1,
        commands.title2,
        commands.title3,
        commands.divider,
        commands.bold,
        commands.italic,
        commands.strikethrough,
        commands.divider,
        commands.link,
        commands.quote,
        commands.code,
        commands.divider,
        commands.unorderedListCommand,
        commands.orderedListCommand,
        commands.checkedListCommand,
      ]}
      extraCommands={[]}
      textareaProps={{
        placeholder: 'Describe your gig in detail...',
        className: 'text-gray-800'
      }}
      style={{
        backgroundColor: '#fff',
        color: '#1f2937'
      }}
    />
  </div>


  <div className="flex justify-between text-sm mt-2">
    <span className="text-red-500">
      {description.length === 0 && 'Description is required'}
      {description.length > 0 && description.length < 120 && 
        'Minimum 120 characters recommended'}
    </span>
    <span className={`text-sm ${
      description.length > 1200 ? 'text-red-500' : 'text-gray-500'
    }`}>
      {description.length}/1200
    </span>
  </div>
</div>
        {/* Media Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-50">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
                className="hidden"
              />
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600">
                  {imagePreview ? 'Change Image' : 'Upload Image (required)'}
                </p>
              </div>
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 mx-auto max-h-48 rounded-lg" />
            )}
          </div>

          <div className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-50">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
              />
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">
                  {videoPreview ? 'Change Video' : 'Upload Video (required)'}
                </p>
              </div>
            </label>
            {videoPreview && (
              <video src={videoPreview} controls className="mt-4 mx-auto max-h-48 rounded-lg" />
            )}
          </div>
        </div>

        {/* Packages Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Packages & Pricing</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500 pb-4"></th>
                {['Basic', 'Standard', 'Premium'].map((tier, index) => (
                  <th key={tier} className={`text-center pb-4 ${index === 0 ? 'text-blue-600' : 'text-gray-700'}`}>
                    <div className={`p-3 rounded-lg ${index === 0 ? 'bg-blue-50' : ''}`}>
                      {tier}
                      {index === 0 && <span className="text-red-500 ml-1">*</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['title', 'Package Title', 'text', 35],
                ['description', 'Description', 'text', 100],
                ['deliveryTime', 'Delivery Time', 'select', null],
                ['price', 'Price (USD)', 'price', null],
              ].map(([field, label, type, maxLength]) => (
                <tr key={field} className="hover:bg-gray-50">
                  <td className="text-sm text-gray-600 py-4 pr-4">{label}</td>
                  {packages.map((pkg, index) => (
                    <td key={index} className="py-4 px-2">
                      {type === 'select' ? (
                        <Select
                          options={deliveryOptions}
                          value={deliveryOptions.find(opt => opt.value === pkg.deliveryTime)}
                          onChange={(selected) => handlePackageChange(index, 'deliveryTime', selected.value)}
                          classNamePrefix="react-select"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderColor: packageErrors[index] ? '#ef4444' : '#e5e7eb',
                              minWidth: '120px'
                            })
                          }}
                        />
                      ) : type === 'price' ? (
                        <PriceInput
                          value={pkg.price}
                          onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                          error={packageErrors[index]}
                        />
                      ) : (
                        <textarea
                          value={pkg[field]}
                          onChange={(e) => handlePackageChange(index, field, e.target.value)}
                          maxLength={maxLength}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          className={`w-full p-2 border rounded-md focus:ring-2 ${
                            packageErrors[index] ? 'border-red-500 focus:ring-red-200' : 
                            'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                          }`}
                          rows={2}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {[
                ['proofreading', 'Proofreading & Editing'],
                ['research', 'Additional Research'],
                ['citations', 'References & Citations'],
                ['styleGuide', 'Style Guide Formatted'],
              ].map(([field, label]) => (
                <tr key={field} className="hover:bg-gray-50">
                  <td className="text-sm text-gray-600 py-4 pr-4">{label}</td>
                  {packages.map((pkg, index) => (
                    <td key={index} className="py-4 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={pkg.features[field]}
                        onChange={(e) => handlePackageChange(index, `features.${field}`, e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-sm text-gray-500">
            * Required fields for Basic package
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
            isValid
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Publish Gig
        </button>
      </form>
    </div>
  );
};

export default GigCreationForm;