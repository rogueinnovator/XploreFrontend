const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-blue-800">
          Xplore.pk Privacy Policy
        </h1>
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <p className="mb-6">
            Thank you for using xplore.pk . Your privacy is important to us, and
            we are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, and share information when you
            use our services.
          </p>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            1. Information We Collect
          </h2>
          <p className="mb-2">We collect the following types of information:</p>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-blue-600">Personal Information:</strong>{" "}
              When you register or interact with our platform, we may collect
              your name, email address, phone number, and other relevant
              details.
            </li>
            <li>
              <strong className="text-blue-600">Usage Data:</strong> We may
              collect information about how you interact with our platform,
              including IP address, browser type, and device information.
            </li>
            <li>
              <strong className="text-blue-600">
                Cookies and Tracking Technologies:
              </strong>{" "}
              We use cookies and similar technologies to enhance user experience
              and analyze usage patterns.
            </li>
          </ul>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            2. How We Use Your Information
          </h2>
          <p className="mb-2">We use the collected information to:</p>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>Provide and improve our services.</li>
            <li>Personalize your experience on our platform.</li>
            <li>
              Communicate with you, including sending OTPs, service updates, and
              promotional messages.
            </li>
            <li>Ensure security and prevent fraudulent activities.</li>
          </ul>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            3. How We Share Your Information
          </h2>
          <p className="mb-2">
            We do not sell or trade your personal data. However, we may share it
            with:
          </p>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-blue-600">Service Providers:</strong>{" "}
              Third-party partners who assist in operating our platform.
            </li>
            <li>
              <strong className="text-blue-600">Legal Authorities:</strong> If
              required by law, we may disclose your information to comply with
              legal obligations.
            </li>
          </ul>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            4. Data Retention and Deletion
          </h2>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>
              If a user registers but does not verify their OTP, we may retain
              their data for [X] days before automatic deletion.
            </li>
            <li>
              Verified users' data will be retained as long as necessary to
              provide our services.
            </li>
            <li>
              Users can request data deletion by contacting us at [Your Contact
              Email].
            </li>
          </ul>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            5. Security Measures
          </h2>
          <p className="mb-6">
            We implement industry-standard security measures to protect user
            data. However, no method of transmission over the internet is 100%
            secure.
          </p>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            6. Third-Party Links
          </h2>
          <p className="mb-6">
            Our platform may contain links to third-party websites. We are not
            responsible for their privacy practices, so please review their
            policies separately.
          </p>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            7. Changes to This Policy
          </h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. Any changes
            will be communicated via email or through our platform.
          </p>
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            8. Contact Us
          </h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact
            us at: [Your Contact Email or Address].
          </p>
          <p className="font-semibold">
            By using xplore.pk, you agree to the terms of this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
