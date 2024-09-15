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
  function searchTable(e) {
    if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
      const searchInput = document.getElementById("searchInput");
      setSearchParam(searchInput.value);
    }
  }

  function getOption(event) {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  }

  return (
    <>
      <div class="container mt-5">
        <h1 class="text-center mb-4">Kiểm tra sao kê</h1>
        <div class="input-group search-bar">
          <select
            id="selectSearch"
            onChange={getOption}
            values={selectedOption}
          >
            <option value="amount">Số tiền</option>
            <option value="notes">Nội dung</option>
            <option value="code">Mã giao dịch</option>
          </select>
          <input
            class="form-control"
            id="searchInput"
            type="text"
            placeholder="Search..."
            onKeyDown={searchTable}
          />
          <button class="btn btn-primary" onClick={searchTable}>
            Tìm kiếm
          </button>
        </div>
        <PaginatedTable searchData={searchData} />
      </div>
    </>
  );
}

export default App;
