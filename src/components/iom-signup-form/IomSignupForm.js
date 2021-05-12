import React, { useState } from "react";
import { Link } from "react-router-dom";

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

/*
IomSignupForm

This component is in charge of handling the user input and dispatching the signUp 
action forwarding the user information.

Every field must be filled in and the password must match for the action to be dispatched. 
Again, very basic validation implemented, ideally more information should be displayed for
the user to know what went wrong.
*/

const IomSignupForm = ({ isLoading, signUp }) => {
  const [username, setUsername] = useState("genericuser");
  const [email, setEmail] = useState("genericemail@gmail.com");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [validUserFields, setValidUserFields] = useState(true);
  const [validPasswordFields, setValidPasswordFields] = useState(true);

  /*
    As in the signIn form validation results are returned aswell as saved
    to the component's data so the submit handler can use the validation
    results immediately
  */
  const validateUserFields = (fields = []) => {
    const isValid = fields.every((f) => f.length);
    setValidUserFields(isValid);
    return isValid;
  };

  const validatePasswordFields = (fields = []) => {
    const [password, confirmPassword] = fields;
    const isValid = fields.every((f) => f.length);
    const passwordsMatch = password === confirmPassword;
    setValidPasswordFields(isValid && passwordsMatch);
    return isValid && passwordsMatch;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateUserFields([username, email]);
    const passwordsMatch = validatePasswordFields([password, confirmPassword]);
    if (isValid && passwordsMatch) {
      signUp({ username, email, password, confirmPassword });
    }
  };

  return (
    <div className="iom-auth-panel__form">
      <EuiTitle size="s">
        <h3>Signup for a sunny day!</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiForm component="form" onSubmit={handleSubmit}>
        <EuiFormRow label="Username" isInvalid={!validUserFields}>
          <EuiFieldText
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Email" isInvalid={!validUserFields}>
          <EuiFieldText
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow
          className="iom-auth-panel__form-row"
          label="Password"
          isInvalid={!validPasswordFields}
        >
          <EuiFieldPassword
            type="dual"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow
          className="iom-auth-panel__form-row"
          label="Confirm password"
          isInvalid={!validPasswordFields}
        >
          <EuiFieldPassword
            type="dual"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <div className="iom-auth-panel__form-footer">
          <EuiButton
            className="iom-auth-panel__form-button"
            type="submit"
            isLoading={isLoading}
            fill
          >
            Sign up
          </EuiButton>
          <Link to="/auth/login">
            <EuiLink className="iom-auth-panel__form-link">
              Already registered?
            </EuiLink>
          </Link>
        </div>
      </EuiForm>
    </div>
  );
};

export default IomSignupForm;
