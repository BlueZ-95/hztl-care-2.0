import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, firebaseAuth } from "../firebase/firebase.js";

import { doc, setDoc } from "firebase/firestore";

const RegisterForm = (props) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("First Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid")
      .matches(
        /^[A-Za-z0-9._%+-]+@(horizontal|horizontalintegration)\.com$/,
        "Horizontal Email is mandatory"
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
      .then(async (result) => {
        
  
        // We need to change addDac method to setDoc once walletID is available
        setDoc(doc(db, "users", data.email), {
          email: data.email,
          name: data.name,
        }).then(()=> {}).catch((err) => console.log("err", err));
        

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    return false;
  }

  return (
    <div className="relative">
        <img
          src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  The quick, brown fox <br className="hidden md:block" />
                  jumps over a{" "}
                  <span className="text-teal-accent-400">lazy dog</span>
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                  quae.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
                >
                  Learn more
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293lmb-8mb-8A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5mb-8A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
              <div className="w-full xl:px-8 xl:w-8/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl mb-10">
                    <span className="mb-2 bg-theme-bg block h-2 w-14"></span>
                    Sign Up
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8">
                      <label className="text-sm text-theme-bg block font-bold">
                        Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        {...register("name")}
                        className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                          errors.name
                            ? "is-invalid border-theme-01"
                            : "border-theme-bg"
                        }`}
                      />
                      <div className="invalid-feedback text-theme-01 absolute">
                        {errors.name?.message}
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="text-sm text-theme-bg block font-bold">
                        Email
                      </label>
                      <input
                        name="email"
                        type="text"
                        {...register("email")}
                        className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                          errors.email
                            ? "is-invalid border-theme-01"
                            : "border-theme-bg"
                        }`}
                      />
                      <div className="invalid-feedback text-theme-01 absolute">
                        {errors.email?.message}
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="text-sm text-theme-bg block font-bold">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        {...register("password")}
                        className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                          errors.password
                            ? "is-invalid border-theme-01"
                            : "border-theme-bg"
                        }`}
                      />
                      <div className="invalid-feedback text-theme-01 absolute">
                        {errors.password?.message}
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="text-sm text-theme-bg block font-bold">
                        Confirm Password
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                          errors.confirmPassword
                            ? "is-invalid border-theme-01"
                            : "border-theme-bg"
                        }`}
                      />
                      <div className="invalid-feedback text-theme-01 absolute">
                        {errors.confirmPassword?.message}
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none mr-4"
                      >
                        SignUp
                      </button>
                      <button
                        type="button"
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-01 hover:bg-theme-01-hover focus:shadow-outline focus:outline-none mr-4"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RegisterForm;
