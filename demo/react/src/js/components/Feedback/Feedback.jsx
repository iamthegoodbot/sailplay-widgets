import React from 'react';

import FeedbackStore from '../../stores/FeedbackStore.js';
import FeedbackItem from './FeedbackItem.jsx';
import Empty from '../Empty.jsx';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = { feedback: FeedbackStore.feedback };
  }

  componentDidMount() {
    FeedbackStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    FeedbackStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    console.log(this.state.feedback);

    return (
      <div className="ppsp-scroll-outer">
        {this._getView()}
      </div>
    );
  }

  _getView() {
    let list = [
      <FeedbackItem score={10} avatar="dist/img/image-sample.png" text="Отличный сайт. Возможна доставка в терминалы самовывоза QIWI. Это очень удобно!" />,
      <FeedbackItem score={10} text="Прекрасный магазин, закупаюсь в нем не первый год. PS хотелось бы более адекватных цен на все товары, а не на некоторые, посмотрите на своих конкурентов и сравните с ними!" />,
      <FeedbackItem score={10} avatar="dist/img/image-sample.png" text="Отличный сайт. Возможна доставка в терминалы самовывоза QIWI. Это очень удобно!"/>,
      <FeedbackItem score={10} text="Отличный сайт. Возможна доставка в терминалы самовывоза QIWI. Это очень удобно!"/>,
      <FeedbackItem score={10} text="Отличный сайт. Возможна доставка в терминалы самовывоза QIWI. Это очень удобно!"/>
    ];

    return this.props.isAuth ?
      list :
      <Empty title="У нас пока что нет отзывов :(" text="Вы можете написать первый!" />;
  }

  _onChange() {
    this.setState({ feedback: FeedbackStore.feedback });
  }
}
