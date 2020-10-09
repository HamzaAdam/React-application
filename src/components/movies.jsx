import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import ListGroups from "../components/common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: "",
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genre: getGenres() });
  }

  handleDelete = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };

  handleLike = (id) => {
    const movies = [...this.state.movies];
    const movie = movies.filter((m) => m._id === id)[0];
    movie.liked = !movie.liked;
    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleEmptyTable(currentPage) {
    this.setState({ currentPage });
    console.log(currentPage);
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const Movies = Paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: Movies };
  };

  render() {
    const {
      currentPage,
      genre,
      selectedGenre,
      searchQuery,
      pageSize,
      sortColumn,
    } = this.state;

    const { data, totalCount } = this.getPagedData();

    return this.state.movies.length === 0 ? (
      "There are no movies in database"
    ) : (
      <>
        <div className="row">
          <div className="col-3">
            <ListGroups
              items={genre}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 10 }}
            >
              New Movie
            </Link>
            <p>Showing {totalCount} movies in database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              Movies={data}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
