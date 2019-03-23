import React, { Component } from 'react';

class Pagination extends Component {

  render() {
    let {totalPokemons, pageLimit} =this.props;
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPokemons / pageLimit); i++) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = pageNumbers.map(number => {
      return (
        <li class="page-item">
          <a
            class="page-link"
            href='#'
            key={number}
            id={number}
            onClick={this.props.onClick}
          >
            {number}
          </a>
        </li>
      );
    });

    return (
      <nav>
        <ul class="pagination">
          {renderPageNumbers}
        </ul>
      </nav>
    )
  }
}

export default Pagination;
