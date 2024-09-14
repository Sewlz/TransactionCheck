import { useState, useEffect } from "react";
import lodash from "lodash";
import jsonData from "./data/transactions.json";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import PaginatedTable from "./Pagination";
function App() {
  const [searchParam, setSearchParam] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("amount");
  useEffect(() => {
    if (searchParam === "" || searchParam === null) {
      setSearchData([]);
    } else {
      const filterFields = {
        code: "code",
        amount: "amount",
        notes: "notes",
      };
      setSearchData(
        lodash.filter(jsonData, (item) => {
          const field = filterFields[selectedOption];
          if (field === "amount") {
            return item[field] == parseInt(searchParam);
          }
          return item[field].includes(searchParam);
        })
      );
    }
  }, [searchParam]);
  function searchTable() {
    const searchInput = document.getElementById("searchInput");
    setSearchParam(searchInput.value);
  }
  function getOption(event) {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  }

  return (
    <>
      <div class="container mt-5">
        <h2>Transaction Checker</h2>
        <div class="input-group search-bar">
          <select
            id="selectSearch"
            onChange={getOption}
            values={selectedOption}
          >
            <option value="amount">Amount</option>
            <option value="notes">Note</option>
            <option value="code">Code</option>
          </select>
          <input
            class="form-control"
            id="searchInput"
            type="text"
            placeholder="Search..."
          />
          <button class="btn btn-primary" onClick={searchTable}>
            Search
          </button>
        </div>
        <PaginatedTable searchData={searchData} />
      </div>
    </>
  );
}

export default App;
