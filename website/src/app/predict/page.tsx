'use client'

import React, { useState } from 'react';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    Confidence_Level: 5,
    Self_Assessed_Skill_Level_in_WebDev: 5,
    Interest_Level_in_WebDev: 5,
    Self_Assessed_Skill_Level_in_GameDev: 5,
    Interest_Level_in_GameDev: 5,
    Self_Assessed_Skill_Level_in_CyberSecurity: 5,
    Interest_Level_in_CyberSecuirty: 5,
    Self_Assessed_Skill_Level_in_DataScience: 5,
    Interest_Level_in_DataScience: 5,
    Self_Assessed_Skill_Level_in_MobileDev: 5,
    Interest_Level_in_MobileDev: 5,
    Self_Assessed_Skill_Level_in_ProductManager: 5,
    Interest_Level_in_ProductManager: 5,
    Self_Assessed_Skill_Level_in_UIUX: 5,
    Interest_Level_in_UIUX: 5,
    Self_Assessed_Skill_Level_in_SoftEng: 5,
    Interest_Level_in_SoftEng: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      console.log(response)
      const result = await response.json()
      alert(`Prediction: ${result.Prediction}`)
    } catch (error) {
      alert('An error occurred. Please try again.')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Confidence_Level">How confidence are you about your current programming skills? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Confidence_Level"
          value={formData.Confidence_Level}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_WebDev">How would you rate your skills in Web Development? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_WebDev"
          value={formData.Self_Assessed_Skill_Level_in_WebDev}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_WebDev">How interested are you in Web Development? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_WebDev"
          value={formData.Interest_Level_in_WebDev}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_GameDev">How would you rate your skills in Game Development? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_GameDev"
          value={formData.Self_Assessed_Skill_Level_in_GameDev}
          onChange={handleChange}
        />
      </div>
      <div>  
        <label htmlFor="Interest_Level_in_GameDev">How interested are you in Game Development? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_GameDev"
          value={formData.Interest_Level_in_GameDev}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_CyberSecurity">How would you rate your skills in Cyber Security? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_CyberSecurity"
          value={formData.Self_Assessed_Skill_Level_in_CyberSecurity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_CyberSecuirty">How interested are you in Cyber Security? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_CyberSecuirty"
          value={formData.Interest_Level_in_CyberSecuirty}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_DataScience">How would you rate your skills in Data Science? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_DataScience"
          value={formData.Self_Assessed_Skill_Level_in_DataScience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_DataScience">How interested are you in Data Science? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_DataScience"
          value={formData.Interest_Level_in_DataScience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_MobileDev">How would you rate your skills in Mobile Development? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_MobileDev"
          value={formData.Self_Assessed_Skill_Level_in_MobileDev}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_MobileDev">How interested are you in Mobile Development? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_MobileDev"
          value={formData.Interest_Level_in_MobileDev}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_ProductManager">How would you rate your skills in Product Management? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_ProductManager"
          value={formData.Self_Assessed_Skill_Level_in_ProductManager}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_ProductManager">How interested are you in Product Management? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_ProductManager"
          value={formData.Interest_Level_in_ProductManager}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_UIUX">How would you rate your skills in UI/UX Design? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_UIUX"
          value={formData.Self_Assessed_Skill_Level_in_UIUX}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_UIUX">How interested are you in UI/UX Design? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_UIUX"
          value={formData.Interest_Level_in_UIUX}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Self_Assessed_Skill_Level_in_SoftEng">How would you rate your skills in Software Engineering? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Self_Assessed_Skill_Level_in_SoftEng"
          value={formData.Self_Assessed_Skill_Level_in_SoftEng}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Interest_Level_in_SoftEng">How interested are you in Software Engineering? :</label>
        <input
          type="number"
          min={1}
          max={10}
          name="Interest_Level_in_SoftEng"
          value={formData.Interest_Level_in_SoftEng}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
