// src/Components/Auth/SignIn.js
import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import './Signin.css';
const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const clientId = "439089830733-ldeguqcin7t1tu0iu38u5dgjiilocupt.apps.googleusercontent.com"; // Make sure to set this in your .env file

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: 'email profile',
            });
        };

        gapi.load('client:auth2', initClient);
    }, [clientId]);

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
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Handle successful sign-in (e.g., send data to the server)
            console.log('Form submitted:', formData);
            // Reset form
            setFormData({ email: '', password: '' });
            setErrors({});
        }
    };

    const handleGoogleSignIn = () => {
        const GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.signIn()
            .then((response) => {
                const profile = response.getBasicProfile();
                console.log('Google Sign-In successful!');
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
            })
            .catch((error) => {
                console.error('Error signing in with Google', error);
            });
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
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
                <button type="submit">Sign In</button>
            </form>
            <div style={{ margin: '20px 0' }}>
                <button onClick={handleGoogleSignIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;