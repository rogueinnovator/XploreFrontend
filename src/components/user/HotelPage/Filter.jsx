import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import { useSearchContext } from "../../../context/SearchContext";
// DESKTOP FILTER
const Filter = () => {
    const { filters, setFilters } = useSearchContext();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                    ? [...prev.amenities, value]
                    : prev.amenities.filter((item) => item !== value)
                : value,
        }));
    };

    const filterOptions = {
        starRating: ["5", "4", "3"],
        propertyType: ["House", "Resort", "Apartment"],
        amenities: ["Pool", "Spa", "Gym", "Free Wifi"]
    };
    return (
        <div className="hidden md:block w-56 p-3 rounded-lg shadow-md bg-white border">
            <h2 className="text-xl font-bold">Filter</h2>

            {/* PRICE RANGE */}
            <label className="block mt-3 mb-2 text-sm font-medium">Price Range</label>
            <input
                type="range"
                name="price"
                min="0"
                max="1000"
                value={filters.price}
                onChange={handleChange}
                className="w-full h-2 rounded-lg bg-gray-200 accent-blue-700"
            />
            <div className="flex justify-between text-xs">
                <span>$0</span>
                <span>${filters.price}</span>
            </div>
            {/* OTHER FILTERS  */}
            {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key} className="mt-3">
                    <h3 className="text-black/80 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <div className="flex flex-col px-2 py-1 space-y-2">
                        {options.map((option) => (
                            <label key={option} className="flex items-center space-x-2 text-sm text-gray-600">
                                <input
                                    type={key === "amenities" ? "checkbox" : "radio"}
                                    name={key}
                                    value={option}
                                    checked={
                                        key === "amenities"
                                            ? filters.amenities.includes(option)
                                            : filters[key] === option
                                    }
                                    onChange={handleChange}
                                    className="w-4 h-4 border border-gray-600/40 rounded-md checked:bg-blue-500 cursor-pointer"
                                />
                                <span>{option}{key === "starRating" && " Star"}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
// MOBILE FILTER
const FilterPopUp = ({ setShowPopUp, filterOption, checkBox }) => {
    const { filters, setFilters } = useSearchContext();
    const [searchTerm, setSearchTerm] = useState("");
    let filteredValues = [];
    const filterData = {
        starRating: ["5", "4", "3"],
        propertyType: ["House", "Resort", "Apartment"],
        amenities: ["Pool", "Spa", "Gym", "Free Wifi"]
    };
    if (filterOption === "starRating") {
        filteredValues = filterData.starRating.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    else if (filterOption === "propertyType") {
        filteredValues = filterData.propertyType.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    else {
        filteredValues = filterData.amenities.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    // HANDLE CHANGES
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked);
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                    ? [...prev.amenities, value]
                    : prev.amenities.filter((item) => item !== value)
                : value,
        }));
    };

    return (
        <div className="z-20">
            <h2 className="flex justify-center" onClick={() => setShowPopUp(false)}>
                <ChevronDown size={30} color="gray" />
            </h2>
            <div className="mx-3 pt-3">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-100 rounded-lg outline-none"
                />
            </div>
            <div className="flex flex-col px-7 pt-3 space-y-2">
                {filteredValues.length > 0 ? (
                    filteredValues.map((option) => (
                        <label key={option} className="flex items-center space-x-2 text-lg text-gray-600">
                            <input
                                type={checkBox ? "checkbox" : "radio"}
                                name={filterOption}
                                value={option}
                                checked={checkBox ? filters.amenities.includes(option) : filters[filterOption] === option}
                                onChange={handleChange}
                                className="w-4 h-4 border border-gray-600/40 rounded-md checked:bg-blue-500 cursor-pointer"
                            />
                            <span>{option}</span>
                        </label>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No matching results</p>
                )}
            </div>
        </div>
    );
};

FilterPopUp.propTypes = {
    setShowPopUp: PropTypes.func.isRequired,
    filterOption: PropTypes.array.isRequired,
    checkBox: PropTypes.bool.isRequired,
};

export { Filter, FilterPopUp };
