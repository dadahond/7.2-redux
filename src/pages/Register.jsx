import { useEffect } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  return { displayName, email, password };
};
function Register() {
  const { registerWithEmailAndPassword } = useRegister();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      registerWithEmailAndPassword(data.displayName, data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full ">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-5 uppercase">
          Register
        </h2>
        <FormInput
          type="text"
          placeholder="Name"
          lebel="Enter your Name"
          name="name"
        />
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
        <FormInput
          type="password"
          placeholder=" Repeat Password"
          lebel="Password"
        />
        <div className="mt-5 ">
          <button
            className="btn
     btn-neutral btn-block"
          >
            Register
          </button>
        </div>
        <div className="my-5 text-center">
          <p>
            Already have an account?{" "}
            <Link
              to="/Login"
              className="link link-primary text-black text-lg font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
