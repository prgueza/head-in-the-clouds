import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import authActions from "../../store/actions/auth";

// Elastic UI Components
import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiButton,
  EuiLink,
  EuiTitle,
  EuiFieldPassword,
} from "@elastic/eui";

const IomSigninForm = ({ isLoading, signIn }) => {
  const [identifier, setIdentifier] = useState("genericuser");
  const [password, setPassword] = useState("password");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn({ identifier, password, keepLoggedIn });
  };

  return (
    <div className="iom-auth-panel__form">
      <EuiTitle size="s">
        <h3>Sign in to your account.</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiForm component="form" onSubmit={handleSignIn}>
        <EuiFormRow
          label="Username or email"
          helpText="This is usually the email you registered with :)"
        >
          <EuiFieldText
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow className="iom-auth-panel__form-row" label="Password">
          <EuiFieldPassword
            type="dual"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow hasChildLabel={false}>
          <EuiSwitch
            className="iom-auth-panel__form-switch"
            name="switch"
            label="Keep me logged in!"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <div className="iom-auth-panel__form-footer">
          <EuiButton
            className="iom-auth-panel__form-button"
            isLoading={isLoading}
            type="submit"
            fill
          >
            Log in
          </EuiButton>
          <Link to="/auth/signup">
            <EuiLink className="iom-auth-panel__form-link">
              Not registered yet?
            </EuiLink>
          </Link>
        </div>
      </EuiForm>
    </div>
  );
};

export default connect(null, authActions)(IomSigninForm);
