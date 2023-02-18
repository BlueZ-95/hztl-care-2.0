import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { db, firebaseAuth } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const LoginForm = (props: any): JSX.Element => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    // display form data on success
    createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);
        // We need to change addDac method to setDoc once walletID is available
        addDoc(collection(db, 'users'), {
          email: data.email,
          mobile: data.mobile,
          name: data.name,
          walletId: 'walletId',
        }).catch((err) => console.log('err', err));

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
    <div className="">
      <h2 className="">SignUp</h2>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="-5">
              <label>Name</label>
              <input
                name="name"
                type="text"
                {...register('name')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <br />
          </div>
          <div className="">
            <div className="">
              <label>Email</label>
              <input
                name="email"
                type="text"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <br />
          </div>
          <div className="">
            <div className="">
              <label>Mobile No.</label>
              <input
                name="mobile"
                type="text"
                {...register('mobile')}
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.mobile?.message}</div>
            </div>
            <br />
          </div>
          <div className="">
            <div className="">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <br />
            <div className="">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
            </div>
            <br />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Register
            </button>
            <button type="button" onClick={() => reset()} className="btn btn-secondary">
              Reset
            </button>
          </div>
        </form>
      </div>
      <p>Already have an account?</p>
    </div>
  );
};

export default LoginForm;
