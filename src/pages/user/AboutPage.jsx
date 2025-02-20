import React from "react";
import OfficeImage from "../../../public/office_image.jpg";
import {
  HotelIcon,
  User2Icon,
  StarIcon,
  Globe2Icon,
  SearchIcon,
  Shield,
  Headset,
  CheckCircle,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div>
      {/* Images Section*/}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-white">
        {/* Background Image */}
        <img
          src={OfficeImage}
          alt="About Explore"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 px-6 text-center md:px-12">
          <h1 className="text-2xl font-bold md:text-4xl">About Explore</h1>
          <p className="max-w-2xl mx-auto mt-2 text-sm md:mt-4 md:text-lg">
            Your trusted partner in discovering perfect accommodations
            worldwide. We’re committed to making travel planning simple,
            enjoyable, and memorable.
          </p>
        </div>
      </div>

      {/* Our mission section*/}
      <section className="px-6 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Mission Text */}
          <div className="mb-8 text-start lg:w-1/2 lg:text-left lg:mb-0">
            <h2 className="mb-4 text-2xl font-bold ">Our Mission</h2>
            <p className="mb-4 text-gray-600">
              At Explore, our mission is to revolutionize the way people
              discover and book accommodations. We believe that finding the
              perfect place to stay should be as exciting as the journey itself.
            </p>
            <p className="text-gray-600">
              Through innovative technology and personalized service, we strive
              to create memorable travel experiences for millions of travelers
              worldwide.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-1/2 ">
            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <HotelIcon className="mr-4 text-3xl text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">10,000+</h3>
                <p className="text-sm text-gray-500">Hotels Worldwide</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <User2Icon className="mr-4 text-3xl text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">1M+</h3>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <Globe2Icon className="mr-4 text-3xl text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">100+</h3>
                <p className="text-sm text-gray-500">Countries</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <StarIcon className="mr-4 text-3xl text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">4.8/5</h3>
                <p className="text-sm text-gray-500">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer section*/}
      <section className="max-w-6xl px-6 py-12 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center">What We Offer</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Smart Search */}
          <div className="flex items-start p-6 bg-white border rounded-lg shadow-md">
            <SearchIcon className="mr-4 text-blue-500 size-20" />
            <div>
              <h3 className="text-xl font-semibold">Smart Search</h3>
              <p className="text-gray-600">
                Advanced filtering and sorting options to help you find the
                perfect accommodation quickly and easily.
              </p>
            </div>
          </div>

          {/* Secure Booking */}
          <div className="flex items-start p-6 bg-white border rounded-lg shadow-md">
            <Shield className="mr-4 text-blue-500 size-20" />
            <div>
              <h3 className="text-xl font-semibold">Secure Booking</h3>
              <p className="text-gray-600">
                Safe and secure payment processing with instant confirmation and
                booking guarantee.
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-start p-6 bg-white border rounded-lg shadow-md">
            <Headset className="mr-4 text-blue-500 size-20" />
            <div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer service to assist you with any
                questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision section*/}
      <section className="flex flex-col items-start gap-8 p-6 text-start md:flex-row md:p-12">
        {/* Image Section */}
        <div className="w-full h-full md:w-1/2">
          <img
            src={OfficeImage}
            alt="Team Collaboration"
            className="w-full shadow-lg rounded-xl"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 md:text-left">
          <h2 className="text-2xl font-bold md:text-3xl">Our Vision</h2>
          <p className="mt-4 text-gray-600">
            We envision a future where travel planning is effortless and
            enjoyable. Our platform continuously evolves to meet the changing
            needs of modern travelers, incorporating the latest technology and
            industry best practices.
          </p>

          {/* Bullet Points */}
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500" />
              Innovative booking solutions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500" />
              Personalized travel experiences
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500" />
              Global accommodation network
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
