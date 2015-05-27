import React, { Component } from 'react';

import ApiService from '../../services/ApiService.js';
import FeedbackStore from '../../stores/FeedbackStore.js';
import FeedbackItem from './FeedbackItem.jsx';
import Empty from '../Empty.jsx';

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = { feedback: FeedbackStore.feedback };
  }

  componentDidMount() {
    FeedbackStore.addChangeListener(this._onChange);
    ApiService.feedback();
  }

  componentWillUnmount() {
    FeedbackStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="ppsp-scroll-outer">
        {this._getView()}
      </div>
    );
  }

  _getView() {
    let feedback = this.state.feedback;

    if (feedback) {
      let reviews = this.state.feedback.reviews;

      return reviews.map((review, key) =>
          <FeedbackItem
            key={key}
            score={review.rating}
            avatar={review.user.avatar}
            text={review.review}
          />
      );
    } else {
      return <Empty title="У нас пока что нет отзывов :(" text="Вы можете написать первый!" />;
    }
  }

  _onChange() {
    this.setState({ feedback: FeedbackStore.feedback });
  }
}
