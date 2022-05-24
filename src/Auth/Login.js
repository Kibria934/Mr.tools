import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import auth from "../firebase.init";
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
    const [token]=UseToken(user||gUser)
  const [myError, setMyError] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';
  

  useEffect(() => {
    if (error|| gError) {
      switch (error.code) {
        case "auth/user-not-found":
          setMyError("Your have no account.Please crate an account first");
          break;
        case "auth/wrong-password":
          setMyError("Your have no account.Please crate an account first");
          break;
        default:
          setMyError(error.code|| gError.code);
          break;
      }
    }
    setMyError(gError?.message || error?.message);
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token,from,navigate, error,gUser]);

  if (loading || gLoading) {
    <Loading/>
  }

  const onSubmit = (data) => {
    setEmail(data.email);
    console.log(data);

    signInWithEmailAndPassword(data.email, data.password);
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };
  return (
    <div className="h-screen items-center flex justify-center">
      <div class="card  flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-200">
        <div class="card-body">
          <h2 className="text-center text-3xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                class="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors?.email?.type === "required" && (
                <span className="text-red-700 m-1">Email is required</span>
              )}
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="email"
                class="input input-bordered"
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

              {gError && (
                <label class="label">
                  <span class="label-text-alt link link-hover">
                    Forgot password?
                  </span>
                </label>
              )}
            </div>
            {<p>{myError}</p>}
            <button type="submit" class="btn mt-5 w-full btn-primary">
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
            class="btn btn-success hover:btn-accent"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
