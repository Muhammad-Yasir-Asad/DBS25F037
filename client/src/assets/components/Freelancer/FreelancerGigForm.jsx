import React, { useState } from 'react';
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
  { value: 22, label: 'Technical Support' },
];

const FreelancerGigForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded?.nameid;

    const payload = {
      userId: parseInt(userId),
      title,
      description,
      categoryId: category?.value,
    };

    try {
      setLoading(true);
      const res = await axios.post('https://skillhub.runasp.net/api/Gig/add_Freelancer_Gig', payload);
      const gigId = res.data?.gigId || res.data;
      navigate('/add-package', { state: { gigId } });
    } catch (err) {
      console.error('Failed to create gig:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4" data-color-mode="light">
      <h2 className="text-2xl font-bold mb-4">Create Freelancer Gig</h2>

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter your gig title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <MDEditor value={description} onChange={setDescription} />
      </div>

      <div>
        <label className="block font-medium mb-1">Category</label>
        <Select
          options={categoryOptions}
          value={category}
          onChange={setCategory}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Gig'}
      </button>
    </form>
  );
};

export default FreelancerGigForm;
