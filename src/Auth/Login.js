import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import auth from "../firebase.init";
import { motion } from "framer-motion";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../SharedPage/Loading";
import UseToken from "../Hook/UseToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [token] = UseToken(user || gUser);
  const [myError, setMyError] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (error || gError) {
      switch (error?.code) {
        case "auth/user-not-found":
          setMyError("Your have no account.Please crate an account first");
          break;
        case "auth/wrong-password":
          setMyError("Your Your password is wrong.");
          break;
        default:
          setMyError(error?.code || gError?.code);
          break;
          console.log(error?.code, gError?.code);
      }
    }
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate, error, gUser]);

  if (loading || gLoading) {
    <Loading />;
  }

  const onSubmit = (data) => {
    setEmail(data.email);
    signInWithEmailAndPassword(data.email, data.password);
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
      transition={{ duration: 0.2 }}
      className="h-screen items-center flex justify-center"
    >
      <div className="card  flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-200">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold">Login</h2>
          {/* --------------- alert box for error ------------- */}
          {error && (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{myError}</span>
              </div>
            </div>
          )}
          {/* ---------------------- */}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors?.email?.type === "required" && (
                <span className="text-red-700 m-1">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="email"
                className="input input-bordered"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              {errors?.password?.type === "required" && (
                <span className="text-red-700 m-1">Password is required</span>
              )}
              {errors?.password?.type === "minLength" && (
                <span className="text-red-700 m-1">
                  Please Provide more than 6 characters
                </span>
              )}

              {error?.code && "auth/wrong-password" && (
                <label className="label">
                  <span className="label-text-alt link text-error link-hover">
                    Forgot password?
                  </span>
                </label>
              )}
            </div>
            <button type="submit" className="btn mt-5 w-full btn-primary">
              Login
            </button>
            <p>
              Are new in Mr.tools?{" "}
              <Link className="btn-link" to={"/signup"}>
                Create an account
              </Link>
            </p>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogle}
            className="btn btn-success hover:btn-accent"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
