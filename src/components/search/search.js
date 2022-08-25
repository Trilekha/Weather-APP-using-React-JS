import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoAPIURL, geoAPIoptions } from "../../api"

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = (inputValue) => {
        return fetch(`${geoAPIURL}/cities?namePrefix=${inputValue}`, geoAPIoptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name},${city.countryCode}`,
                        }

                    })
                }
            })
            .catch(err => console.error(err));
    }
    return (
        <>
        <label className="title">Weather</label>
        <AsyncPaginate placeholder="search for city"
            debounceTimeout={600} //gap between each request
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
        </>
    )
}

export default Search;