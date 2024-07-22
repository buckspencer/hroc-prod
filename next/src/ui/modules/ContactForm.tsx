"use client"
import React from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { VscMap, VscMail, VscCallOutgoing } from "react-icons/vsc";

const WEB3FORMS_API_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY;

interface FormData {
  name: string;
  email: string;
  message: string;
  access_key?: string;
  subject?: string;
  from_name?: string;
  botcheck?: boolean;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const userName = useWatch({ 
    control, 
    name: "name", 
    defaultValue: "Someone" 
  });

  React.useEffect(() => {
    setValue('subject', `${userName} sent a message from Website`);
  }, [userName, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, access_key: WEB3FORMS_API_KEY }),
      });

      const json = await response.json();
      // console.log("API Response:", json);

      if (json.success) {
        setIsSuccess(true);
        setMessage(json.message || "Message sent successfully!");

        // Safe call to reset
        if (reset) {
          reset();
        } else {
          console.warn("reset function is not available");
        }
      } else {
        setIsSuccess(false);
        setMessage(json.message || "An error occurred");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Client Error. Please check the console.log for more info");
      console.log(error);
    }
  };
  
  
  return (
    <div className="section flex w-full flex-col">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug lg:text-4xl dark:text-slate-900">
        Have a question about our Parish?
      </h1>

      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-slate-900">
            Contact
          </h2>
          <h2 className="text-lg dark:text-slate-900">
            Holy Resurrection Orthodox Church
          </h2>
          <p className="max-w-sm mt-5">
            Our office staff will ensure all inquiries are answered in a timely manner.
          </p>

          <div className="mt-5">
            <a href="https://maps.app.goo.gl/kyDN1bQ4g8ZmRmp3A" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-slate-500">
                <VscMap className="w-4 h-4" />
                <span>5910 E. 5th Street Tucson, AZ 85711</span>
              </div>
            </a>
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-slate-500">
              <VscMail className="w-4 h-4" />
              <a href="mailto:admin@holyresurrectiontucson.org">admin@holyresurrectiontucson.org</a>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-slate-500">
              <VscCallOutgoing className="w-4 h-4" />
              <a href="tel:+15206222265">(520)-622-2265</a>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-10">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-slate-500 dark:text-slate-900 rounded-md outline-none dark:placeholder:text-slate-700 dark:bg-yellow-600/50 focus:ring-4 ${errors.name
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-slate-600 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                {...register("name", {
                  required: "Full name is required",
                  maxLength: 80
                })}
              />
              {errors.name && (
                <div className="mt-1 text-red-600">
                  <small>{errors.name.message}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">
                Email Address
              </label>
              <input
                id="email_address"
                type="email"
                placeholder="Email Address"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-slate-500 dark:text-slate-900 rounded-md outline-none dark:placeholder:text-slate-700 dark:bg-yellow-600/50 focus:ring-4 ${errors.email
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-slate-600 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                {...register("email", {
                  required: "Enter your email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email"
                  }
                })}
              />
              {errors.email && (
                <div className="mt-1 text-red-600">
                  <small>{errors.email.message}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                id="message"
                placeholder="Your Message"
                className={`w-full px-4 py-3 border-2 placeholder:text-slate-500 dark:text-slate-900 dark:placeholder:text-slate-700 dark:bg-yellow-600/50 rounded-md outline-none h-36 focus:ring-4 ${errors.message
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-slate-600 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                {...register("message", {
                  required: "Enter your Message"
                })}
              />
              {errors.message && (
                <div className="mt-1 text-red-600">
                  <small>{errors.message.message}</small>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 font-semibold text-slate-900 transition-colors bg-slate-300 rounded-md hover:bg-yellow-600/20 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-yellow-600 dark:text-black">
              {isSubmitting ? (
                <svg
                  className="w-5 h-5 mx-auto text-slate-900/60 dark:text-black animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {isSubmitSuccessful && (
            <div className="mt-3 text-sm text-center">
              <span className={message.startsWith('Success') ? 'text-green-500' : 'text-red-500'}>
                {message}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
