import React from "react";
import _ from "lodash";
import faker from "faker";
import moment from "moment";
import "./Provider.scss";

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
      currPage: 1
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
      this.setState({ reviews: mockReviews });
    };

    _.times(10, pushRandomReview);
  }

  getSortedReviews() {
    return this.state.reviews;
  }

  renderHeader() {
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
            <i className="fa fa-star cs4500-yellow wd-font-size-2-em" />
            <i className="fa fa-star cs4500-yellow wd-font-size-2-em" />
            <i className="fa fa-star cs4500-yellow wd-font-size-2-em" />
            <i className="fa fa-star cs4500-yellow wd-font-size-2-em" />
            <i className="fa fa-star cs4500-yellow wd-font-size-2-em" />
            <br />
            {this.state.reviews.length} reviews
          </div>
          {/*<div className="col-8">*/}
            {/*{provider.ratingScores.map((score, index) => (*/}
              {/*<Rating key={index} index={5 - index} score={score} />*/}
            {/*))}*/}
          {/*</div>*/}
        </div>
        <br />
      </div>
    );
  }

  renderStars(n) {
    return _.times(n, i => {
      return <i className={"fa fa-star"} key={i} />;
    });
  }

  renderReviews() {
    return (
      <div>
        {_.map(this.getSortedReviews().slice(0, 2), review => {
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
              <div>{review.providerReply}</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  renderPaginator() {}

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
