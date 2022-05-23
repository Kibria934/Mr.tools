import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import auth from "../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const [myError, setMyError] = useState("");
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [sendEmailVerification, sending, verifyError] = useSendEmailVerification(auth);


  // if (gError || error) {
  //   console.log(gError?.message || error?.message);
  // }
  if (loading || gLoading|| updating||sending) {
    <p>Loading...</p>;
  }

  // ------ ERROR HANDALING ------
  useEffect(() => {
    if (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setMyError("Your email already in used");
          break;
        default:setMyError(error.code)
          break;
      }
    }
    if(updateError){
      console.log(updateError.message);
      
    }
    console.log(user);
   
  }, [user, error]);

  const onSubmit = async(data) => {
    setEmail(data.email);
    const name=data.name;
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification
    alert('Updated profile');
    console.log(data.name);
    
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };
  return (
    <div className="h-screen items-center flex justify-center">
      <div class="card  flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-200">
        <div class="card-body">
          <h3 className="text-center text-3xl font-bold">Sign Up</h3>
          {/* ------------------ */}
          {error  &&
            (
              <div class="alert mt-4 alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
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
          {/* ---------------- */}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="name"
                name="name"
                placeholder="Name"
                class="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors?.name?.type === "required" && (
                <span className="text-red-700 m-1">Your Name is required</span>
              )}
            </div>

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

            <button type="submit" class="btn mt-5 w-full btn-primary">
              Login
            </button>
            <p>Already have an account? <Link to='/login' className='btn-link'>Login here</Link></p>
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

export default Signup;
