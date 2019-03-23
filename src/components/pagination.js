import React, { Component } from 'react';

class Pagination extends Component {

  onClick = (pages) => {
    if (pages[0] < 1 || pages[0] > pages[1]) {
      return;
    } else {
      return this.props.onClick(pages[0])
    }
  }

  render() {
    let {totalPokemons, pageLimit, currentPage} =this.props;
    let pageNumbers = [];

    let totalPages = Math.ceil(totalPokemons / pageLimit);
    let firstPage;
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage < 5) {
        firstPage = 1;
      } else if (totalPages - currentPage < 5) {
        firstPage = totalPages-9;
      } else {
        firstPage = currentPage -5;
      }
      for (let i = firstPage; i <= (firstPage+9); i++) {
        pageNumbers.push(i);
      }
    }

    let renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          className={+currentPage === number ? "page-item active": "page-item"}>
          <a
            className="page-link"
            href='#'
            key={number}
            id={number}
            onClick={(e) => this.onClick([e.target.innerText, totalPages])}
          >
            {number}
          </a>
        </li>
      );
    });
    console.log(totalPokemons / pageLimit);
    return (
      <nav>
        <ul
          className="pagination">
            <li
              className={currentPage <= 1 ? "page-item disabled": "page-item"}>
                <a
                  href='#'
                  className="page-link"
                  onClick={() => this.onClick([1, totalPages])}
                >
                  First
                </a>
            </li>
            <li
              className={currentPage <= 1 ? "page-item disabled": "page-item"}>
                <a
                  href='#'
                  className="page-link"
                  onClick={() => this.onClick([+currentPage - 1, totalPages])}
                >
                  Previous
                </a>
            </li>
            {renderPageNumbers}
            <li
              className={currentPage >= totalPages ? "page-item disabled": "page-item"}>
                <a
                  href='#'
                  className="page-link"
                  onClick={() => this.onClick([+currentPage + 1, totalPages])}
                >
                  Next
                </a>
            </li>
            <li
              className={currentPage >= totalPages ? "page-item disabled": "page-item"}>
                <a
                  href='#'
                  className="page-link"
                  onClick={() => this.onClick([totalPages, totalPages])}
                >
                  Last
                </a>
            </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination;
