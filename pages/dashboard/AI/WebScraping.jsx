import { useState } from "react";

function WebScraping() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/WebScraping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setStart(true);
    setResults([]);

    try {
      const response = await fetchData();
      setResults(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="px-4 pt-4  w-full dark:text-white">
      <h1 className="font-medium md:text-xl">
        Web Scraping system
        <span className="text-sm"> - Product Search</span>
      </h1>
      <div className="flex flex-col  md:flex-row items-center justify-center gap-2 pb-4 pt-4 md:pt-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Product Name"
          className="md:w-1/2 w-full text-sm  px-6 py-2 rounded-full dark:text-black"
        />
        <button
          className="font-semibold text-white dark:text-gray-900 hover:underline rounded-full px-6 py-1 dark:bg-white bg-darkSecondary border dark:border-white border-black"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading && (
        <div
          div
          className="flex flex-row justify-center items-center  font-medium md:text-2xl text-black dark:text-white px-4  md:h-[calc(75vh)] h-[calc(65vh)] "
        >
          Loading...
        </div>
      )}
      {results.length > 0 && !start && (
        <p className="flex flex-row justify-center items-center  font-medium md:text-2xl text-black dark:text-white px-4  md:h-[calc(75vh)] h-[calc(65vh)]">
          No results found.
        </p>
      )}

      {!start && (
        <div className="flex flex-row justify-center items-center  font-medium md:text-2xl text-black dark:text-white px-4  md:h-[calc(75vh)] h-[calc(65vh)]">
          Not Started yet :(
        </div>
      )}
      {results.length > 0 && (
        <div className="px-4 overflow-auto w-full no-scrollbar md:h-[calc(75vh)] h-[calc(65vh)] ">
          {results.map((result, index) => (
            <div
              key={index}
              className="my-2 bg-white dark:bg-darkSecondary shadow-md p-4 rounded-xl flex flex-col md:flex-row "
            >
              <img
                className="md:w-1/2 object-cover rounded-lg"
                src={result["Product Image"]}
                alt="product image"
              />
              <div className="p-4  md:space-y-2">
                <h3 className="font-semibold md:text-xl">
                  {result["Product Title"]}
                </h3>
                <div className="flex flex-row items-center justify-between font-semibold">
                  {/* <p className="">{result["Overall Rating"]}</p> */}
                  <p className="">{result["Total Reviews"]}</p>
                </div>

                <div className="flex flex-row items-center justify-between font-semibold">
                  <p className="text-lg">{result["Product Price"]}</p>
                  <p className="">{result["Availability"]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebScraping;
