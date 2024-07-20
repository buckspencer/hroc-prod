// components/ContactForm.tsx
"use client";

import { useState } from 'react';
import { VscMap, VscMail, VscCallOutgoing } from 'react-icons/vsc';
import { useForm } from 'react-hook-form';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm({ }: Partial<{}>) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormValues>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      setMessage('Success. Message sent successfully');
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSuccess(false);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="section flex w-full flex-col">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug lg:text-4xl dark:text-slate-900">
      Have a question about our Parish?
      </h1>

      <div className="grid my-10">
        <div className="my-10 mx-auto">
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
              <a href="https://maps.app.goo.gl/kyDN1bQ4g8ZmRmp3A" target="_blank">
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
        
      </div>
    </div>
  );
};