import React, { useState } from 'react';
import "./Login.css";
import { useDispatch } from "react-redux";
import { Inputpass } from "./Inputpass"; 
import { Inputemail } from './Inputemail';
import { login } from '../../features/service/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      const userLogged = resultAction.payload.user;
      onLogin(userLogged);       
      navigate("/");             
    } else {
      console.error("Login fallido:", resultAction);
      alert("Login fallido. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <Inputemail
          className="login-input"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
        />
        <Inputpass
          className="login-input"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
        />
        <button className="login-button" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
