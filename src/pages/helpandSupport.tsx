

import { useState, useRef, FormEvent } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import emailjs from '@emailjs/browser';

const FAQContact = () => {
  const [activeQuestion, setActiveQuestion] = useState(-1);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string>("");
  const form = useRef<HTMLFormElement | null>(null);

  const faqs = [
      {
        question: "How do I reset my password?",
        answer: "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the prompts to enter your email address and receive a password reset link."
      },
      {
        question: "How can I change my user role?",
        answer: "User roles can only be modified by the system administrator. If you believe your role needs to be updated, please contact the admin directly."
      },
      {
        question: "What do I do if I can't submit my report?",
        answer: "Ensure that all required fields are filled out and that there are no errors in your report. If the issue persists, check the status of the report in the 'Draft Reports' section to ensure it has been saved correctly."
      },
      {
        question: "How do I delete a report?",
        answer: "Navigate to the report you wish to delete, click on the 'Delete' button, and confirm the deletion when prompted."
      },
      {
        question: "What should I do if I encounter a technical issue?",
        answer: "If you experience any technical issues, please check your internet connection and try logging in again. If the problem persists, contact the system administrator for assistance."
      },
    ];

  const toggleAnswer = (index: number) => {
    setActiveQuestion(activeQuestion === index ? -1 : index);
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

  //   const formData = new FormData(form.current);

    emailjs
      .sendForm(
          "service_rzvfexz", // Replace with your Service ID
          "template_65c9kls", // Replace with your Template ID
          form.current,
          "Bl75QHAcT32ilycWH" // Replace with your Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSent(true);
          setError("");
          form.current?.reset();
        },
        (error) => {
          console.error(error.text);
          setError("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div className="flex flex-wrap justify-center w-full p-8">
      {/* FAQ Section */}
      <div className="w-full lg:w-1/2 p-4">
        <div className="mt-5 flex overflow-hidden w-full">
          <div className="m-8 w-full lg:w-4/5">
            <h1 className="font-bold text-5xl mb-3 text-[#4a154b]">FAQ</h1>
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <div className="flex justify-between items-center py-4" onClick={() => toggleAnswer(index)}>
                  <h2 className="font-bold text-lg">{faq.question}</h2>
                  {activeQuestion === index ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </div>
                {activeQuestion === index && <p className="pb-4 text-black">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Me Section */}
      <div className="w-full lg:w-1/2 p-4">
        <div className="flex flex-col items-center justify-center">
          <form ref={form} onSubmit={sendEmail} className="w-11/12 max-w-lg border shadow-lg rounded-lg p-10">
            <div className="mb-2">
              <label htmlFor="to_name" className="mb-1 font-serif">To Name</label>
              <input type="text" name="to_name" placeholder="Recipient Name" id="to_name" className="w-full px-3 py-2 border bg-transparent rounded-3xl outline-slate-300" required />
            </div>
            <div className="mb-2">
              <label htmlFor="from_name" className="mb-1 font-serif">From Name</label>
              <input type="text" name="from_name" placeholder="Your Name" id="from_name" className="w-full px-3 py-2 border bg-transparent rounded-3xl outline-slate-300" required />
            </div>
            <div className="mb-2">
              <label htmlFor="from_email" className="mb-1 font-serif">From Email</label>
              <input type="email" name="from_email" id="from_email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-3xl bg-transparent outline-slate-300" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="mb-1 font-serif">Message</label>
              <textarea name="message" id="message" placeholder="Your Message here ..." rows={5} className="w-full px-3 py-2 border rounded-3xl bg-transparent outline-slate-300 resize-none" required></textarea>
            </div>
            <button type="submit" className="text-black px-4 py-2 rounded-lg border bg-[#e5d9f298] hover:bg-[#e5d9f2e1]">Send Message</button>
            {isSent && <p className="mt-4 text-green-600">Message sent successfully!</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQContact;
