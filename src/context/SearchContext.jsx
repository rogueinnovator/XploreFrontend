import { createContext, useContext, useEffect, useState } from "react";
import { useGetSearchHotels } from "../api/user-api";

const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        price: 50,
        starRating: "",
        propertyType: "",
        amenities: []
    });

    const params = new URLSearchParams(filters).toString();
    console.log(filters);
    const { refetch } = useGetSearchHotels(params, { enabled: false });
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 2000);
        return () => clearTimeout(handler);
    }, [filters]);

    const fetchData = async () => {
        try {
            const response = await refetch();
            console.log("Filtered Data:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <SearchContext.Provider value={{ filters, setFilters }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;
export const useSearchContext = () => useContext(SearchContext);
