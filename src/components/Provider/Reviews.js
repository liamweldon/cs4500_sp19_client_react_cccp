import React from "react";
import _ from "lodash";
import faker from "faker";

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
      currPage: 1,
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
      review.rating = faker.random.number({ max: 5, min: 1 });
      review.date = faker.date.recent(20);
      review.text = faker.lorem.sentences();
      review.response = faker.lorem.sentence();
      mockReviews.push(review);
      this.setState({ reviews: mockReviews });
    };

    _.times(10, pushRandomReview);
  }

  getSortedReviews() {
   return null;
  }

  renderHeader() {
    return (
      <div className="review-header">
        <h4> Reviews </h4>
      </div>
    );
  }

  renderReview(review) {
   return null;
  }

  renderReviews() {
    return (
      <div>
        {_.forEach(this.getSortedReviews(), r => {
          this.renderReview(r);
        })}
      </div>
    );
  }

  renderPaginator() {

  }

  render() {
    return (
      <div className="section" id="reviews">
        {this.renderHeader()}
        {this.renderReviews()}
        {this.renderPaginator()}
      </div>
    );
  }
}

export default Reviews;
