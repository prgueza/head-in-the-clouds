import React, { useState } from "react";
import { Link } from "react-router-dom";

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

/*
IomSigninForm

This component is in charge of handling the user input and dispatching the singIn 
action forwarding the user information and whether or not he/she wishes to stay 
logged in after the tab or browser is closed.

Both the identifier and password fields must be filled in for the action to be dispatched. 
Here I have implemented a very basic validation but ideally it should be more explicit 
about what fields fail and why.
*/

const IomSigninForm = ({ isLoading, signIn }) => {
  const [identifier, setIdentifier] = useState("genericuser");
  const [password, setPassword] = useState("password");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isValid, setIsValid] = useState(true);

  /*  
    Validates fields and sets the isValid property for showing
    the errors  within the form. As state updates may be asynchronous
    return the result so the handleSignIn function can use it
    immediately 
  */
  const validateFields = (fields = []) => {
    const isValid = fields.every((f) => f.length);
    setIsValid(isValid);
    return isValid;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const isValid = validateFields([identifier, password]);
    if (isValid) {
      signIn({ identifier, password, keepLoggedIn });
    }
  };

  return (
    <div className="iom-auth-panel__form">
      <EuiTitle size="s">
        <h3>Sign in to your account.</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiForm component="form" onSubmit={handleSignIn}>
        <EuiFormRow
          isInvalid={!isValid}
          label="Username or email"
          helpText="This is usually the email you registered with."
        >
          <EuiFieldText
            name="identifier"
            value={identifier}
            onChange={(e) => {
              console.log(e);
              setIdentifier(e.target.value);
            }}
          />
        </EuiFormRow>
        <EuiFormRow
          isInvalid={!isValid}
          label="Password"
          className="iom-auth-panel__form-row"
        >
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

export default IomSigninForm;
