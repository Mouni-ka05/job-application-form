import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../animations/job-apply.json';
import './JobApplicationForm.css';

function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    jobRole: '',
    resume: null,
    coverLetter: '',
    linkedin: '',
    portfolio: '',
    experience: '',
    skills: [],
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const skillsList = ['React', 'Node.js', 'HTML', 'CSS', 'Python'];
  const jobRoles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      const updatedSkills = checked
        ? [...formData.skills, value]
        : formData.skills.filter((skill) => skill !== value);
      setFormData({ ...formData, skills: updatedSkills });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      const newValue = name === 'email' ? value.toLowerCase() : value;
      setFormData({ ...formData, [name]: newValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z ]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Name must contain only letters and spaces';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email (use lowercase and valid format)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.jobRole) {
      newErrors.jobRole = 'Please select a job role';
    }

    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('✅ Form submitted:', formData);
      setSubmittedData(formData);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>🧑‍💼 Job Application Form</h1>

      <Lottie loop animationData={animationData} play style={{ width: 200, height: 200, margin: 'auto' }} />

      <form className="job-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Basic Information</legend>

          <label>Full Name <span className="required">*</span>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </label>

          <label>Email <span className="required">*</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>Phone <span className="required">*</span>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <div className="form-group full-width">
            <label>Gender <span className="required">*</span></label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
              </label>
              <label>
                <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
              </label>
            </div>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <label>Job Role <span className="required">*</span>
            <select name="jobRole" value={formData.jobRole} onChange={handleChange}>
              <option value="">--Select--</option>
              {jobRoles.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
            {errors.jobRole && <span className="error">{errors.jobRole}</span>}
          </label>
        </fieldset>

        <fieldset>
          <legend>Additional Info</legend>

          <div className="form-group full-width">
            <label>Resume Upload <span className="required">*</span></label>
            <input type="file" name="resume" onChange={handleChange} />
            {errors.resume && <span className="error">{errors.resume}</span>}
          </div>

          <label>Cover Letter
            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange}></textarea>
          </label>

          <label>LinkedIn Profile
            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
          </label>

          <label>Portfolio URL
            <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} />
          </label>

          <label>Years of Experience
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>Skills:</label>
          <div className="skills-container">
            {skillsList.map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleChange}
                />
                {skill}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit">Submit Application</button>

        {submittedData && (
          <div className="submitted">
            <h3>Form Submitted Successfully ✅</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}

export default JobApplicationForm;
