import React from "react";
import _ from "lodash";
import faker from "faker";
import moment from "moment";
import "./Provider.scss";
import Rating from "./Rating";

const reviewSortOptions = [
  "Recommended",
  "Highest Rated",
  "Lowest Rated",
  "Newest Review",
  "Oldest Review"
];

const reviewsPerPage = 2;

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      sortedBy: reviewSortOptions[0],
      currPage: 0,
      provider: {
        ratingScores: [],
      }
    };
  }

  componentDidMount() {
    this.initializeMockReviews();
  }

  initializeMockReviews() {
    const mockReviews = [];
    const pushRandomReview = () => {
      const review = {};
      // review:
      // User name
      // rating: int 1-5
      // Date: date
      // text: String
      // response: STring
      review.id = faker.random.number();
      review.userName = faker.name.findName();
      review.score = faker.random.number({ max: 5, min: 1 });
      review.date = faker.date.recent(20);
      review.reviewText = faker.lorem.sentences();
      review.providerReply = faker.lorem.sentence();
      mockReviews.push(review);
      const provider = {};

      provider.ratingScores = [93, 24, 12, 10, 4];

      this.setState({ reviews: mockReviews, provider });
    };

    _.times(10, pushRandomReview);
  }

  getSortedReviews() {
    return this.state.reviews;
  }

  renderHeader() {
    const { provider } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <a name="reviews" />
            <h3>Reviews</h3>
          </div>
          <hr />
          <div className="col-4">
            <select className="form-control float-right">
              <option>Recommended</option>
              <option>Highest rated</option>
              <option>Lowest rated</option>
              <option>Newest first</option>
              <option>Oldest first</option>
            </select>
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h4>4.4</h4>
            {this.renderStars(4)}
            <br />
            {this.state.reviews.length} reviews
          </div>
          <div className="col-8">
            {provider.ratingScores.map((score, index) => (
              <Rating key={index} index={5 - index} score={score} />
            ))}
          </div>
        </div>
        <br />
      </div>
    );
  }

  renderStars(n) {
    return _.times(n, i => {
      return <i className={"fa fa-star yellow"} key={i} />;
    });
  }

  renderReviews() {
    const { currPage } = this.state;
    const firstIndex = currPage * 2;
    return (
      <div>
        {_.map(
          this.getSortedReviews().slice(firstIndex, firstIndex + 2),
          review => {
            return (
              <div key={review.id}>
                <div>
                  <h6>{review.userName}</h6>
                </div>
                <br />
                <div>{this.renderStars(review.score)}</div>
                <br />
                <div>{review.reviewText}</div>
                <br />
                <div>{moment(review.data).format("MMM D, YYYY")}</div>
                <br />
                <div className="alert alert-secondary" role="alert">
                  {review.providerReply}
                </div>
                <hr />
              </div>
            );
          }
        )}
      </div>
    );
  }

  renderPaginator() {
    const { reviews, currPage } = this.state;

    const pages = Math.round(reviews.length / 2);

    return (
      <div className="center">
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${currPage === 0 ? "disabled" : null}`}>
              <span className="page-link">Previous</span>
            </li>
            {_.times(pages, i => {
              return (
                <li
                  key={i}
                  className={`page-item ${currPage === i ? "active" : null}`}
                  aria-current="page"
                  onClick={() => this.setState({ currPage: i })}
                >
                  <span className="page-link">
                    {i + 1}
                    <span className="sr-only">(current)</span>
                  </span>
                </li>
              );
            })}
            <li
              className={`page-item ${
                currPage === pages - 1 ? "disabled" : null
              }`}
              onClick={() => this.setState({ currPage: currPage + 1 })}
            >
              <a className="page-link">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div id="reviews">
        {this.renderHeader()}
        {this.renderReviews()}
        {this.renderPaginator()}
      </div>
    );
  }
}

export default Reviews;
