import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useForm } from "react-hook-form";

function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { searchByName } = useContext(SearchContext);

  const handleChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      if (e.key === "Enter") {
        handleSearch(query);
      }
    },
    [setQuery]
  );

  const handleSearch = useCallback(
    async (query) => {
      if (query) {
        await searchByName(query.search);
        router.push(`/search/${query}`);
      }
    },
    [searchByName, router]
  );

  return (
    <form action="/search/" method="get" onSubmit={handleSubmit(handleSearch)}>
      <div className="flex sm:hidden">
        <div className="relative w-full">
          <input
            {...register("search")}
            name="search"
            type="search"
            className=" block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:outline-none"
            placeholder="Buscar pelo nome"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-black bg-yellow-300 rounded-r-lg border hover:bg-yellow-500  focus:outline-none focus:ring-yellow-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
