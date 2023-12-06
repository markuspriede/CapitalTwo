'use client'
import React from 'react';
import { useRouter } from 'next/navigation'

const EnrollmentPage: React.FC = () => {
  const router = useRouter();

  const linkStyle: React.CSSProperties = {
    color: '#0070f3',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '5px',
    marginBottom: '5px',
    display: 'block',
  };

  const handleGetStartedClick = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Additional logic can be added here if needed

    // Navigate back to the sign-in page
    router.push('/'); // Replace with the actual path of your sign-in page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '800px',height:'800px', padding: '40px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '40px', marginBottom: '40px', marginTop: '40px', textAlign: 'center' }}>
          Enrollment
        </h1>
        <h2 style={{fontSize: '25px', marginBottom: '40px', marginTop: '40px', textAlign: 'center' }}>
          Enter your personal information.
        </h2>

        <form onSubmit={handleGetStartedClick}>
          <div style={{ marginBottom: '50px', marginTop:'40px' }}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="ssnOrItin">Social Security Number or ITIN:</label>
            <input
              type="text"
              id="ssnOrItin"
              name="ssnOrItin"
              placeholder="Enter your SSN or ITIN"
              style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <a style={linkStyle} onClick={() => console.log('Use Bank Account Number Instead')}>
          Use Bank Account Number Instead
        </a>

          <div style={{ marginBottom: '50px', marginTop: '50px' }}>
            <label htmlFor="dob">Date of Birth (mm/dd/yyyy):</label>
            <input
              type="text"
              id="dob"
              name="dob"
              placeholder="Enter your date of birth"
              style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            style={{
              backgroundColor: '#0070f3',
              marginTop: '50px',
              color: '#fff',
              padding: '15px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              width: '100%',
            }}
            type="submit"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentPage;