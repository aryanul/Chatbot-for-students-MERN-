import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import email_icon from '../Assest/email.png';
import password_icon from '../Assest/password.png';
import eye_open from '../Assest/watch.png';
import eye_close from '../Assest/closed-eyes.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const auth = useAuth();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!values.email) newErrors.email = 'Email is required';
    if (!values.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(values.email, values.password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (err) {
      console.log(err);
      toast.error("Failed to Sign In", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  useEffect(() => {
  // Prevent scrolling
  document.body.style.overflow = 'hidden'; 
  document.body.style.margin = '0';
  return () => {
    // Restore scroll on unmount
    document.body.style.overflow = '';
    document.body.style.margin = '';
  };
}, []);

  // --- Styles ---
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000000',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '500px',
    background: '#121212',
    padding: window.innerWidth < 500 ? '24px' : '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const textStyle: React.CSSProperties = {
    color: '#FFFFFF',
    fontSize: '2.2rem',
    fontWeight: '700',
    fontFamily: 'Roboto, sans-serif',
  };

  const inputsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: '#1C1C1C',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    height: '2.6rem',
    background: 'transparent',
    outline: 'none',
    color: '#E0E0E0',
    fontSize: '1rem',
    border: 'none',
    padding: '0 10px',
  };

  const errorStyle: React.CSSProperties = {
    color: '#CF6679',
    fontSize: '12px',
    marginTop: '4px',
    paddingLeft: '8px',
  };

  const submitContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  };

  const submitStyle: React.CSSProperties = {
    cursor: 'pointer',
    padding: '12px 24px',
    background: '#333333',
    color: '#FFFFFF',
    borderRadius: '50px',
    fontSize: '1.1rem',
    width: window.innerWidth < 500 ? '80%' : '60%',
    border: 'none',
    transition: 'background-color 0.3s ease',
  };

  const iconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    marginRight: '12px',
    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))',
  };

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit} style={containerStyle} autoComplete="off">
        <div style={headerStyle}>
          <h2 style={textStyle}>Login</h2>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#FFFFFF', margin: '10px 0' }}></div>
        </div>

        <div style={inputsStyle}>
          <div>
            <div style={inputContainerStyle}>
              <img src={email_icon} alt="Email Icon" style={iconStyle} />
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={values.email}
                onChange={handleInput}
                style={inputStyle}
              />
            </div>
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>

          <div>
            <div style={inputContainerStyle}>
              <img src={password_icon} alt="Password Icon" style={iconStyle} />
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleInput}
                style={inputStyle}
              />
              <img
                src={visible ? eye_open : eye_close}
                alt="Toggle Visibility"
                style={{ ...iconStyle, cursor: 'pointer', marginLeft: '8px' }}
                onClick={() => setVisible(!visible)}
              />
            </div>
            {errors.password && <div style={errorStyle}>{errors.password}</div>}
          </div>
        </div>

        <div style={submitContainerStyle}>
          <button
            type="submit"
            style={submitStyle}
            onMouseOver={(e) => (e.currentTarget.style.background = '#444444')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#333333')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
