import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
/*   constructor(props){
    super(props)
  } */




  render() {
    return (
      <div id='todos'>     
        {this.props.todos.map( todo => (
          // console.log(todo.name)
           <Todo 
              key={(Date.now()+Math.random()*1).toString()}  
              id={todo.id}  
              info={todo.name} 
              completed={todo.completed}
              toggleTodo={this.props.toggleTodo}
            />
         ))}
      </div>
    )
  }
}
