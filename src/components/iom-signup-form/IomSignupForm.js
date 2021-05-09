import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import authActions from "../../store/actions/auth";

// Elastic UI Components
import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiButton,
  EuiLink,
  EuiTitle,
  EuiFieldPassword,
} from "@elastic/eui";

const IomSignupForm = ({ isLoading, signUp }) => {
  const [username, setUsername] = useState("genericuser");
  const [email, setEmail] = useState("genericemail@gmail.com");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ username, email, password, confirmPassword });
  };

  return (
    <div className="auth-panel__form">
      <EuiTitle size="s">
        <h3>Signup for a sunny day!</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiForm component="form" onSubmit={handleSubmit}>
        <EuiFormRow label="Username">
          <EuiFieldText
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Email">
          <EuiFieldText
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Password">
          <EuiFieldPassword
            type="dual"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Confirm password">
          <EuiFieldPassword
            type="dual"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <div className="auth-panel__form-footer">
          <EuiButton type="submit" isLoading={isLoading} fill>
            Sign up
          </EuiButton>
          <Link to="/auth/login">
            <EuiLink>Already registered?</EuiLink>
          </Link>
        </div>
      </EuiForm>
    </div>
  );
};

export default connect(null, authActions)(IomSignupForm);
