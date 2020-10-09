import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <div onClick={() => this.props.onLike(movie._id)}>
          <i
            className={movie.liked ? "fa fa-heart" : "fa fa-heart-o"}
            aria-hidden="true"
          ></i>
        </div>
      ),
    },
    {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    let { Movies, onSort, sortColumn } = this.props;

    return (
      <Table
        onSort={onSort}
        data={Movies}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
