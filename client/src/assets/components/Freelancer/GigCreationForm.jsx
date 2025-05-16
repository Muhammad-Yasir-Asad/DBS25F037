import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const categoryOptions = [
  { value: 3, label: 'Mobile Development' },
  { value: 4, label: 'Web Development' },
  { value: 5, label: 'Game Development' },
  { value: 6, label: 'App Development' },
  { value: 7, label: 'AI & Machine Learning' },
  { value: 8, label: 'Data Science' },
  { value: 9, label: 'UI/UX Design' },
  { value: 10, label: 'Graphic Design' },
  { value: 11, label: 'Video Editing' },
  { value: 12, label: 'Animation & Motion Graphics' },
  { value: 13, label: 'Content Writing' },
  { value: 14, label: 'Copywriting' },
  { value: 15, label: 'Digital Marketing' },
  { value: 16, label: 'SEO Optimization' },
  { value: 17, label: 'Cloud Computing' },
  { value: 18, label: 'Cybersecurity' },
  { value: 19, label: 'DevOps' },
  { value: 20, label: 'Blockchain Development' },
  { value: 21, label: 'AR/VR Development' },
  { value: 22, label: 'Technical Support' }
];

const subSkills = {
  3: [
    { id: 2, name: 'Android' },
    { id: 3, name: 'iOS Development' },
    { id: 4, name: 'Android Development' },
    { id: 5, name: 'Flutter Development' },
    { id: 6, name: 'React Native Development' },
    { id: 7, name: 'Xamarin Development' },
    { id: 8, name: 'Firebase Integration' },
    { id: 9, name: 'Mobile UI/UX Design' },
    { id: 10, name: 'Mobile App Testing (Unit & UI)' },
    { id: 11, name: 'AR/VR Mobile Apps' },
    { id: 12, name: 'Mobile App Security' }
  ],
  4: [
    { id: 13, name: 'HTML5' },
    { id: 14, name: 'CSS3' },
    { id: 15, name: 'JavaScript' },
    { id: 16, name: 'React.js' },
    { id: 17, name: 'Vue.js' },
    { id: 18, name: 'Angular' },
    { id: 19, name: 'Sass/SCSS' },
    { id: 20, name: 'Bootstrap' },
    { id: 21, name: 'Web Accessibility (WCAG)' },
    { id: 22, name: 'Cross-Browser Compatibility' }
  ],
  5: [
    { id: 23, name: 'Unity3D Development' },
    { id: 24, name: 'Unreal Engine Development' },
    { id: 25, name: 'C# Game Programming' },
    { id: 26, name: 'Game Physics' },
    { id: 27, name: '3D Modeling (Blender)' },
    { id: 28, name: 'AI for Games' },
    { id: 29, name: 'Game Animation' },
    { id: 30, name: 'Multiplayer Game Development' },
    { id: 31, name: 'Virtual Reality (VR) Game Development' },
    { id: 32, name: 'Game Monetization' }
  ],
  6: [
    { id: 33, name: 'iOS App Development' },
    { id: 34, name: 'Android App Development' },
    { id: 35, name: 'Cross-Platform App Development (Flutter)' },
    { id: 36, name: 'Cross-Platform App Development (React Native)' },
    { id: 37, name: 'App UI/UX Design' },
    { id: 38, name: 'Mobile App Testing' },
    { id: 39, name: 'Firebase for Mobile Apps' },
    { id: 40, name: 'Mobile App Performance Optimization' },
    { id: 41, name: 'App Deployment (App Store/Google Play)' },
    { id: 42, name: 'App Security' }
  ],
  7: [
    { id: 43, name: 'Machine Learning Algorithms' },
    { id: 44, name: 'Deep Learning' },
    { id: 45, name: 'Natural Language Processing (NLP)' },
    { id: 46, name: 'Reinforcement Learning' },
    { id: 47, name: 'Computer Vision' },
    { id: 48, name: 'TensorFlow' },
    { id: 49, name: 'PyTorch' },
    { id: 50, name: 'AI Ethics' },
    { id: 51, name: 'Model Deployment' },
    { id: 52, name: 'AI Model Evaluation' }
  ],
  8: [
    { id: 53, name: 'Data Preprocessing' },
    { id: 54, name: 'Exploratory Data Analysis (EDA)' },
    { id: 55, name: 'Statistical Analysis' },
    { id: 56, name: 'Data Visualization' },
    { id: 57, name: 'Time Series Analysis' },
    { id: 58, name: 'Big Data Technologies' },
    { id: 59, name: 'SQL for Data Science' },
    { id: 60, name: 'Machine Learning for Data Science' },
    { id: 61, name: 'Data Wrangling' },
    { id: 62, name: 'Data Ethics and Privacy' }
  ],
  9: [
    { id: 63, name: 'User Research' },
    { id: 64, name: 'Wireframing' },
    { id: 65, name: 'Prototyping' },
    { id: 66, name: 'UI Design' },
    { id: 67, name: 'UX Design' },
    { id: 68, name: 'User Flow Creation' },
    { id: 69, name: 'Responsive Design' },
    { id: 70, name: 'Interaction Design' },
    { id: 71, name: 'Usability Testing' },
    { id: 72, name: 'Design Systems' }
  ],
  10: [
    { id: 73, name: 'Adobe Photoshop' },
    { id: 74, name: 'Adobe Illustrator' },
    { id: 75, name: 'Typography' },
    { id: 76, name: 'Branding and Identity' },
    { id: 77, name: 'Print Design' },
    { id: 78, name: 'UX/UI Design for Graphics' },
    { id: 79, name: 'Color Theory' },
    { id: 80, name: 'Infographics Design' },
    { id: 81, name: 'Digital Illustration' },
    { id: 82, name: '3D Graphic Design' }
  ],
  11: [
    { id: 83, name: 'Adobe Premiere Pro' },
    { id: 84, name: 'Final Cut Pro' },
    { id: 85, name: 'Video Color Grading' },
    { id: 86, name: 'Motion Graphics' },
    { id: 87, name: 'Audio Editing for Video' },
    { id: 88, name: 'Green Screen Editing' },
    { id: 89, name: 'Video Compression' },
    { id: 90, name: 'Video Transitions' },
    { id: 91, name: 'Storyboarding' },
    { id: 92, name: 'Video Export and Optimization' }
  ],
  12: [
    { id: 93, name: '2D Animation' },
    { id: 94, name: '3D Animation' },
    { id: 95, name: 'Motion Graphics Design' },
    { id: 96, name: 'Character Animation' },
    { id: 97, name: 'Rigging and Skinning' },
    { id: 98, name: 'Stop Motion Animation' },
    { id: 99, name: 'VFX (Visual Effects)' },
    { id: 100, name: 'Motion Capture' },
    { id: 101, name: 'Animation for Games' },
    { id: 102, name: 'Animation Storytelling' }
  ],
  13: [
    { id: 103, name: 'SEO Content Writing' },
    { id: 104, name: 'Blog Writing' },
    { id: 105, name: 'Technical Writing' },
    { id: 106, name: 'Creative Writing' },
    { id: 107, name: 'Social Media Content Writing' },
    { id: 108, name: 'Content Strategy' },
    { id: 109, name: 'Copy Editing' },
    { id: 110, name: 'Email Newsletter Writing' },
    { id: 111, name: 'Product Description Writing' },
    { id: 112, name: 'Research and Content Curation' }
  ],
  14: [
    { id: 113, name: 'Brand Copywriting' },
    { id: 114, name: 'Ad Copywriting' },
    { id: 115, name: 'Sales Copywriting' },
    { id: 116, name: 'Landing Page Copywriting' },
    { id: 117, name: 'SEO Copywriting' },
    { id: 118, name: 'Social Media Copywriting' },
    { id: 119, name: 'Email Copywriting' },
    { id: 120, name: 'Product Copywriting' },
    { id: 121, name: 'Call-to-Action (CTA) Writing' },
    { id: 122, name: 'Content Strategy for Copywriting' }
  ],
  15: [
    { id: 123, name: 'Search Engine Optimization (SEO)' },
    { id: 124, name: 'Pay-Per-Click (PPC) Advertising' },
    { id: 125, name: 'Content Marketing' },
    { id: 126, name: 'Social Media Marketing' },
    { id: 127, name: 'Email Marketing' },
    { id: 128, name: 'Influencer Marketing' },
    { id: 129, name: 'Affiliate Marketing' },
    { id: 130, name: 'Digital Analytics' },
    { id: 131, name: 'Conversion Rate Optimization (CRO)' },
    { id: 132, name: 'Mobile Marketing' }
  ],
  16: [
    { id: 133, name: 'Search Engine Optimization (SEO)' },
    { id: 134, name: 'Pay-Per-Click (PPC) Advertising' },
    { id: 135, name: 'Content Marketing' },
    { id: 136, name: 'Social Media Marketing' },
    { id: 137, name: 'Email Marketing' },
    { id: 138, name: 'Influencer Marketing' },
    { id: 139, name: 'Affiliate Marketing' },
    { id: 140, name: 'Digital Analytics' },
    { id: 141, name: 'Conversion Rate Optimization (CRO)' },
    { id: 142, name: 'Mobile Marketing' }
  ],
  17: [
    { id: 143, name: 'On-Page SEO' },
    { id: 144, name: 'Off-Page SEO' },
    { id: 145, name: 'Technical SEO' },
    { id: 146, name: 'Keyword Research' },
    { id: 147, name: 'SEO Audits' },
    { id: 148, name: 'Local SEO' },
    { id: 149, name: 'SEO Analytics' },
    { id: 150, name: 'Mobile SEO' },
    { id: 151, name: 'SEO Content Creation' },
    { id: 152, name: 'SEO Link Building' }
  ],
  18: [
    { id: 153, name: 'Amazon Web Services (AWS)' },
    { id: 154, name: 'Microsoft Azure' },
    { id: 155, name: 'Google Cloud Platform (GCP)' },
    { id: 156, name: 'Cloud Architecture' },
    { id: 157, name: 'Cloud Security' },
    { id: 158, name: 'Cloud Migration' },
    { id: 159, name: 'Containerization (Docker/Kubernetes)' },
    { id: 160, name: 'Serverless Computing' },
    { id: 161, name: 'Cloud Cost Management' },
    { id: 162, name: 'Hybrid Cloud Solutions' }
  ],
  19: [
    { id: 163, name: 'Network Security' },
    { id: 164, name: 'Cryptography' },
    { id: 165, name: 'Penetration Testing' },
    { id: 166, name: 'Incident Response' },
    { id: 167, name: 'Security Information and Event Management (SIEM)' },
    { id: 168, name: 'Identity and Access Management (IAM)' },
    { id: 169, name: 'Vulnerability Assessment' },
    { id: 170, name: 'Firewall Management' },
    { id: 171, name: 'Security Auditing' },
    { id: 172, name: 'Compliance and Risk Management' }
  ],
  20: [
    { id: 173, name: 'CI/CD Pipelines' },
    { id: 174, name: 'Infrastructure as Code (IaC)' },
    { id: 175, name: 'Containerization (Docker)' },
    { id: 176, name: 'Orchestration (Kubernetes)' },
    { id: 177, name: 'Version Control (Git)' },
    { id: 178, name: 'Monitoring and Logging' },
    { id: 179, name: 'Automated Testing' },
    { id: 180, name: 'Configuration Management' },
    { id: 181, name: 'Cloud Infrastructure Management' },
    { id: 182, name: 'Collaboration and Agile Practices' }
  ],
  21: [
    { id: 183, name: 'Blockchain Architecture' },
    { id: 184, name: 'Smart Contract Development' },
    { id: 185, name: 'Cryptocurrency Development' },
    { id: 186, name: 'Decentralized Application (dApp) Development' },
    { id: 187, name: 'Blockchain Security' },
    { id: 188, name: 'Blockchain Integration' },
    { id: 189, name: 'Consensus Algorithms' },
    { id: 190, name: 'NFT Development' },
    { id: 191, name: 'Blockchain as a Service (BaaS)' },
    { id: 192, name: 'Blockchain Analytics' }
  ],
  22: [
    { id: 193, name: 'Augmented Reality (AR) Development' },
    { id: 194, name: 'Virtual Reality (VR) Development' },
    { id: 195, name: '3D Modeling for AR/VR' },
    { id: 196, name: 'Unity for AR/VR' },
    { id: 197, name: 'AR/VR UI/UX Design' },
    { id: 198, name: 'AR/VR Interaction Design' },
    { id: 199, name: 'Spatial Computing' },
    { id: 200, name: 'Motion Tracking in AR/VR' },
    { id: 201, name: 'AR/VR Game Development' },
    { id: 202, name: 'AR/VR Deployment and Optimization' }
  ],
  23: [
    { id: 203, name: 'Help Desk Support' },
    { id: 204, name: 'Troubleshooting Hardware Issues' },
    { id: 205, name: 'Software Installation and Configuration' },
    { id: 206, name: 'Network Troubleshooting' },
    { id: 207, name: 'Operating System Support' },
    { id: 208, name: 'Remote Desktop Support' },
    { id: 209, name: 'System and Software Updates' },
    { id: 210, name: 'User Training and Documentation' },
    { id: 211, name: 'IT Ticketing Systems' },
    { id: 212, name: 'Security and Data Backup Support' }
  ]
};

const deliveryOptions = [
  { value: '1', label: '1 day Delivery' },
  { value: '2', label: '2 days Delivery' },
  { value: '3', label: '3 days Delivery' },
];

const GigCreationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: null,
    description: '',
    imageFile: null,
    videoFile: null,
    packages: [
      { title: '', description: '', deliveryTime: '1', price: 5, skills: [] },
      { title: '', description: '', deliveryTime: '', price: '', skills: [] },
      { title: '', description: '', deliveryTime: '', price: '', skills: [] }
    ]
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userId, setUserId] = useState(null);
  const [packageResponse, setPackageResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const Loader = () => (
  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
    <div
      style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #333',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        animation: 'spin 1s linear infinite',
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

  const MAX_SKILLS = [3, 5, 8];

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
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
    const validateForm = () => {
      const basicValid = formData.packages[0].skills.length > 0 &&
                       formData.packages[0].skills.length <= MAX_SKILLS[0];
      const standardValid = formData.packages[1].skills.length <= MAX_SKILLS[1];
      const premiumValid = formData.packages[2].skills.length <= MAX_SKILLS[2];
      
      return (
        formData.title.length >= 1 &&
        formData.title.length <= 80 &&
        formData.category !== null &&
        formData.description.length >= 120 &&
        formData.description.length <= 1200 &&
        formData.imageFile !== null &&
        formData.videoFile !== null &&
        basicValid &&
        standardValid &&
        premiumValid
      );
    };
    setIsValid(validateForm());
  }, [formData]);

  const handleSkillSelection = (packageIndex, skillId) => {
    setFormData(prev => {
      const newPackages = [...prev.packages];
      const packageSkills = newPackages[packageIndex].skills;
      const skillIndex = packageSkills.indexOf(skillId);

      if (skillIndex === -1) {
        if (packageSkills.length < MAX_SKILLS[packageIndex]) {
          packageSkills.push(skillId);
        }
      } else {
        packageSkills.splice(skillIndex, 1);
      }

      return { ...prev, packages: newPackages };
    });
  };

  const handlePackageChange = (packageIndex, field, value) => {
    setFormData(prev => {
      const newPackages = [...prev.packages];
      newPackages[packageIndex][field] = value;
      return { ...prev, packages: newPackages };
    });
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'image') {
        setFormData(prev => ({ ...prev, imageFile: file }));
        setImagePreview(reader.result);
      } else {
        setFormData(prev => ({ ...prev, videoFile: file }));
        setVideoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
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
        }`}
      />
    </div>
  );

    const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isValid || !userId) return;

  setLoading(true);
  setSubmitError('');

  try {
    const token = localStorage.getItem('auth-token');
    const userIdInt = parseInt(userId, 10);

    // 1️⃣ Create Gig
    const gigFormData = new FormData();
    gigFormData.append('userId', userIdInt);
    gigFormData.append('title', formData.title);
    gigFormData.append('categoryId', formData.category.value);
    gigFormData.append('description', formData.description);
    gigFormData.append('gigPicture', formData.imageFile);
    gigFormData.append('gigvideo', formData.videoFile);

    const gigRes = await axios.post(
      'https://skillhub.runasp.net/api/Gig/add_Freelancer_Gig',
      gigFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log('Gig response:', gigRes.data);
    const gigId = parseInt(gigRes.data.gigId, 10);
    console.log('Extracted gigId:', gigId);

    // 2️⃣ Create Packages & Link Skills
    const packageTypes = ['Basic', 'Standard', 'Premium'];

    for (let i = 0; i < formData.packages.length; i++) {
      const pkg = formData.packages[i];

      // require basic package
      if (i === 0 && (!pkg.price || !pkg.deliveryTime || !pkg.description)) {
        throw new Error('Basic package is required');
      }
      // skip incomplete non-basic packages
      if (i !== 0 && (!pkg.price || !pkg.deliveryTime || !pkg.description)) {
        console.log(`Skipping package #${i} (incomplete)`);
        continue;
      }

      // 2.1) Create the package
      const pkgRes = await axios.post(
        'https://localhost:7067/api/GigPackage/add',
        {
          gigId,
          price: Number(pkg.price),
          deliveryDays: parseInt(pkg.deliveryTime, 10),
          description: pkg.description,
          packageType: packageTypes[i]
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // assume backend returns { packageId: 77 }
      const packageId = pkgRes.data.packageId;
      console.log(`Created package #${i}, id=${packageId}`);

      // 2.2) Link each selected skill
      for (const skillId of pkg.skills) {
        await axios.post(
          'https://localhost:7067/api/GigPackageSkill/add_GigPackageSkill',
          {
            packageSkillId: 0,
            packageId: packageId,
            skillId: skillId
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`  → linked skill ${skillId} to package ${packageId}`);
      }
    }

    // 3️⃣ Success
    setSubmitSuccess(true);
    setTimeout(() => navigate('/gigs'), 2000);

  } catch (err) {
    console.error('Submission error:', err);
    if (err.response) {
      console.error('  → response data:', err.response.data);
    }
    setSubmitError(err.response?.data?.message || err.message);

  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Gig</h1>

      {submitError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{submitError}</div>}
      {submitSuccess && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">Gig created successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Gig Title</label>
          <div className="flex border rounded-md p-2">
            <span className="mr-2">I will</span>
            <textarea
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              maxLength={80}
              placeholder="do something I'm really good at"
              className="flex-1 resize-none outline-none"
              rows={2}
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-red-500">
              {formData.title.length === 0 && 'Title is required'}
            </span>
            <span className="text-gray-500">{formData.title.length}/80</span>
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select
            options={categoryOptions}
            value={formData.category}
            onChange={(selected) => setFormData(prev => ({ ...prev, category: selected }))}
            className="react-select-container"
            classNamePrefix="react-select"
          />
          {!formData.category && (
            <span className="text-red-500 text-sm mt-1">Category is required</span>
          )}
        </div>

        {/* Description Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <div data-color-mode="light">
            <MDEditor
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              height={400}
              preview="live"
              textareaProps={{
                placeholder: 'Describe your gig in detail...',
              }}
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-red-500">
              {formData.description.length === 0 && 'Description is required'}
            </span>
            <span className="text-gray-500">{formData.description.length}/1200</span>
          </div>
        </div>

        {/* Media Uploads */}
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
        {formData.category && (
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
                    {formData.packages.map((pkg, index) => (
                      <td key={index} className="py-4 px-2">
                        {type === 'select' ? (
                          <Select
                            options={deliveryOptions}
                            value={deliveryOptions.find(opt => opt.value === pkg.deliveryTime)}
                            onChange={(selected) => handlePackageChange(index, 'deliveryTime', selected.value)}
                            classNamePrefix="react-select"
                          />
                        ) : type === 'price' ? (
                          <PriceInput
                            value={pkg.price}
                            onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                          />
                        ) : (
                          <textarea
                            value={pkg[field]}
                            onChange={(e) => handlePackageChange(index, field, e.target.value)}
                            maxLength={maxLength}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="w-full p-2 border rounded-md focus:ring-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                            rows={2}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {subSkills[formData.category.value]?.map((skill, skillIndex) => (
                  <tr key={skill.id} className="hover:bg-gray-50">
                    <td className="text-sm text-gray-600 py-4 pr-4">{skill.name}</td>
                    {formData.packages.map((pkg, pkgIndex) => (
                      <td key={pkgIndex} className="py-4 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={pkg.skills.includes(skill.id)}
                          onChange={() => handleSkillSelection(pkgIndex, skill.id)}
                          className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          disabled={
                            !pkg.skills.includes(skill.id) &&
                            pkg.skills.length >= MAX_SKILLS[pkgIndex]
                          }
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
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-md text-lg font-medium ${
            isValid
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Publish Gig
        </button>
      </form>
    </div>
  );
};

export default GigCreationForm;