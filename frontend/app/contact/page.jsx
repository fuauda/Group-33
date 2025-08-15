import React from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const Contact2 = ({
  title = "Contact Us",
  description = "We are here to support your journey toward positive social change in Ethiopia. Whether you have questions, want to give feedback, or explore collaboration opportunities, please reach out. Together, we can strengthen our communities.",
  phone = "(+251) 34567890",
  email = "support@communityconnect.et",
  web = { label: " communityconnect.et", url: "https://communityconnect.et"},
  officeAddress = `Bole Sub-city, Addis Ababa, Ethiopia
                        Near Friendship International School`  
}) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950 font-sans">
      <div className="container">
        <div
          className="mx-auto flex max-w-7xl flex-col justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="mx-auto flex max-w-sm flex-col ">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
            <div className="mx-auto w-fit mt-6  lg:mt-8 lg:mx-0">
              <h3 className="mb-3 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc space-y-3">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200">
                    {web.label}
                  </a>
                </li>
                <li>
    <span className="font-bold">Office Address:</span>
    <p className="whitespace-pre-line ml-5">{officeAddress}</p>
  </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border p-8">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input type="text" id="firstname" placeholder="First Name" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input type="text" id="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" placeholder="Subject" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea placeholder="Type your message here." id="message" />
            </div>
            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold text-lg transition-colors duration-200">
              Send Message</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact2;
