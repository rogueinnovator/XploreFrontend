import React, { useRef, useState } from "react";

const TermsAndConditions = () => {
  const ref = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const content = [
    {
      title: "Booking Terms",
      description:
        "By making a booking through TravelEase, you enter into a direct contractual relationship with the accommodation provider. TravelEase acts solely as an intermediary between you and the provider.",
      points: [
        "All rates are per room per night unless stated otherwise",
        "Prices include all applicable taxes and fees unless stated otherwise",
        "Special requests cannot be guaranteed but will be passed on to the property",
      ],
    },
    {
      title: "User Account Terms",
      description:
        "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
    },
    {
      title: "Payment and Cancellation",
      description:
        "Payment terms and cancellation policies vary by property. Generally:",
      points: [
        "Secure payment methods are provided through our platform",
        "Cancellation policies are clearly displayed before booking",
        "Refunds are processed according to the property's policy",
      ],
    },
    {
      title: " Privacy and Data Usage",
      description:
        "We collect and process your data in accordance with our Privacy Policy. By using our services, you consent to such processing and warrant that all data provided by you is accurate.",
    },
    {
      title: "Property Rules",
      description:
        "Each property has its own rules and policies. You agree to comply with these rules during your stay. Common rules include:",
      points: [
        "Check-in and check-out times",
        "Smoking policies",
        "Pet policies",
        "Noise restrictions",
      ],
    },
    {
      title: "Liability Disclaimers",
      description:
        "TravelEase is not liable for any direct or indirect damages arising from the use of our services, including but not limited to:",
      points: [
        "Property conditions or services",
        "Personal injury or property damage",
        "Technical issues or service interruptions",
      ],
    },
  ];

  return (
    <div className="px-5 md:px-10">
      <div className="my-10 space-y-6">
        <h1 className="text-4xl font-bold">Terms And Conditions</h1>
        <p className="text-gray-500">Last Updated February 2 , 2025</p>
      </div>
      <hr></hr>

      {/* Main  */}
      <main className="flex flex-col gap-10 mt-5 md:flex-row ">
        <div className="space-y-4 ">
          <h1 className="text-xl font-bold">Table of content</h1>
          {content.map((term, index) => (
            <button
              key={index}
              onClick={() => {
                ref.current[index].scrollIntoView({ behavior: "smooth" });
                setActiveIndex(index);
              }}
              className={`block text-start text-nowrap font-semibold ${
                activeIndex !== index && "text-gray-600 font-normal"
              }`}
            >
              {index + 1}. {term.title}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-blue-100 border-l-4 border-black">
            <div className="space-y-1">
              <h1 className="font-bold ">Important Notice</h1>
              <p className="text-[#1570EF]">
                Please read these terms carefully before using our services. By
                using TravelEase, you agree to be bound by these terms and
                conditions.
              </p>
            </div>
          </div>

          {content.map((term, index) => {
            return (
              <div
                key={index}
                className="space-y-2"
                ref={(el) => (ref.current[index] = el)}
              >
                <h1 className="text-xl font-bold">
                  {index + 1}. {term.title}
                </h1>
                <p className="text-[#374151]">{term.description}</p>
                <ul className="pl-5 space-y-1 list-disc text-[#374151] marker:text-2xl">
                  {term?.points?.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
          <hr className="py-5"></hr>
          <div className="space-y-3">
            <h1 className="text-xl font-bold">Contact Information</h1>
            <p className="text-[#6B7280]">
              For any questions regarding these terms, please contact our legal
              department:
            </p>

            <p className="text-[#6B7280]">Email: legal@travelease.com </p>
            <p className="text-[#6B7280]">Phone: +1 (555) 123-4567</p>
            <p className="text-[#6B7280]">
              Address: 123 Travel Street, Suite 100, New York, NY 10001
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
