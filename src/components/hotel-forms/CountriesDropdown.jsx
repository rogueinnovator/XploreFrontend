import React, { useEffect, useState } from "react";

const CountriesDropdown = ({ formData, handleNestedChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries from REST API
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        countryNames.sort(); // Sort alphabetically
        setCountries(countryNames);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  return (
    <div className="flex flex-col w-11/12">
      <h2 className="text-xl font-bold text-start">Location</h2>
      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        value={formData.location.country}
        onChange={(e) => handleNestedChange(e, "location")}
        required
        className="rounded-md py-1 border border-gray-500"
      >
        <option value="" disabled>Select your country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesDropdown;
