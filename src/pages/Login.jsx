import { useEffect } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};

function Login() {
  const { loginWithEmailAndPassword } = useLogin();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      loginWithEmailAndPassword(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-5 uppercase">Login</h2>
        <FormInput
          type="email"
          placeholder="Email"
          lebel="Enter your email"
          name="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          lebel=" Password"
          name="password"
        />

        <div className="mt-5 ">
          <button
            className="btn
   btn-neutral btn-block"
          >
            Login
          </button>
        </div>
        <div className="my-5 text-center">
          <p>
            Do not have an account?{" "}
            <Link
              to="/register"
              className="link link-primary text-black font-semibold text-lg"
            >
              Register
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
