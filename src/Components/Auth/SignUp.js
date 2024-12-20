import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countriesData from '../../countriesList.json'; 
import './Signup.css';


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        country: '',
        countryCode: '+1', // Default country code
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.country) newErrors.country = 'Country is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Simulate checking if the account already exists
            const accountExists = false; // Replace with actual check (e.g., API call)

            if (accountExists) {
                // If account exists, navigate to Sign-In page
                navigate('/signin');
            } else {
                // Handle successful sign-up (e.g., send data to the server)
                console.log('Account created:', formData);
                // Reset form
                setFormData({ email: '', password: '', phone: '', country: '', countryCode: '+1' });
                setErrors({});
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                            name="CountryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            style={{ marginRight: '10px' }}
                        >
                            {countriesData.map((country) => (
                                <option key={country.code} value={country.countryCode}>
                                    {country.name} ({country.countryCode})
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone number"
                        />
                    </div>
                    {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="">Select a country</option>
                        {countriesData.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {errors.country && <p className="error ">{errors.country}</p>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;