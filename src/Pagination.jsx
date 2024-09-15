import { useState } from "react";

function PaginatedTable({ searchData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!searchData || !Array.isArray(searchData)) {
    return <p>No data available</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(searchData.length / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const maxPageNumbersToShow = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 2) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Ngày giao dịch</th>
              <th>Số tiền</th>
              <th>Nội dung</th>
              <th>Mã giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.notes}</td>
                <td>{item.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="mt-3">
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((pageNumber, index) => (
            <li
              key={index}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              } ${pageNumber === "..." ? "disabled" : ""}`}
            >
              {pageNumber === "..." ? (
                <span className="page-link">...</span>
              ) : (
                <button
                  className="page-link"
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              )}
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PaginatedTable;
