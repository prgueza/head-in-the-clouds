import { signIn, signUp } from "./auth";

describe("Sign in service test suite", () => {
  const credentials = {
    identifier: "genericuser",
    password: "password",
  };

  test("A successful sign in returns the user information", async () => {
    const response = await signIn(credentials);
    // Duck type check the service response
    expect(response).toStrictEqual({
      user: expect.any(Object),
      token: expect.any(String),
    });
  });

  test("An unsuccessful sign in throws an error", async () => {
    try {
      // This assertion makes using expect within the catch block valid
      expect.assertions(1);
      await signIn({ identifier: null, password: "password" });
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });
});

describe("Sign up service test suite", () => {
  const credentials = {
    username: "genericuser",
    email: "genericemail@gmail.com",
    password: "password",
    confirmPassword: "password",
  };

  test("A successful sign up returns the user information", async () => {
    const response = await signUp(credentials);
    // Duck type check the service response
    expect(response).toStrictEqual({
      user: expect.any(Object),
      token: expect.any(String),
    });
  });

  test("An unsuccessful sign up throws an error", async () => {
    try {
      // This assertion makes using expect within the catch block valid
      expect.assertions(1);
      await signUp({ identifier: null, password: "password" });
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });
});
