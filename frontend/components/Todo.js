import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div 
        className={`todo${this.props.hidden ? ' hidden' : ''}`} 
        onClick={() => this.props.toggleTodo(this.props.id)} 
      >
        {this.props.info} { this.props.completed && <span>✔️</span>}
      </div>
    )
  }
}
