import React, { Component } from 'react';

import ApiService from '../../services/ApiService.js';
import NavActions from '../../actions/NavActions.js';
import TasksStore from '../../stores/TasksStore.js';
import Button from '../Button.jsx';

export default class LeaveFeedback extends Component {
  constructor(props) {
    super(props);

    let tasks = TasksStore.tasks;

    this.state = {
        task: tasks ? tasks.filter(task => task.action === 'leave_feedback')[0] : null
      , text: ''
      , points: 10
    }
  }

  handler() {
    if (!this.state.text) {
      return false;
    }

    ApiService.feedbackLeave({
        review: this.state.text
      , rating: this.state.points
    });
  }

  onTextChange(e) {
    this.setState({ text: e.target.value });
  }

  onPointsChange(e) {
    this.setState({ points: e.target.value });
  }

  render() {
    return (
      <div className="ppsp-task-feedback-bl">
        <div className="ppsp-scroll-outer full-height">
          <div className="ppsp-scroll-card">
            <form className="ppsp-feed-form">
              <div className="ppsp-feed-head">
                <span className="point">{`+${this.state.task ? this.state.task.points : 0} олдиков`}</span>
                <div className="title">Оставить отзыв</div>
              </div>

              <div className="ppsp-feed-controls">
                <div className="psp-contr-label">Напишите свой отзыв</div>
                <textarea cols="30" rows="10" className="psp-contr-textarea" onChange={this.onTextChange.bind(this)}></textarea>
              </div>

              <div className="ppsp-feed-points">
                <div className="psp-contr-label">Поставьте оценку нашему сервису</div>
                <div className="ppsp-feed-select">
                  <select className="ppsp-contr-select" defaultValue="10" onChange={this.onPointsChange.bind(this)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <option key={num} value={num}>{num}</option>)}
                  </select>
                </div>
              </div>

              <div className="text_right">
                <Button
                  title="Сохранить"
                  classMod="ppsp-feed-btn ppsp-blue-btn type-active"
                  onClick={this.handler.bind(this)}
                />
              </div>
            </form>
          </div>

          <Button
            title="< Назад"
            classMod="ppsp-grey-btn ppsp-task-back-btn"
            onClick={NavActions.back}
          />
        </div>
      </div>
    );
  }
}
