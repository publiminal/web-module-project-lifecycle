import React from 'react'
import Form from './Form'
import TodoList from './TodoList'
import axios from 'axios'

export default class App extends React.Component {
    constructor(){
      super()
      this.state={
        todos:[],
        newTodo:'',
        anyComplete:false
      }
      this.controller = new AbortController(); // cancel axios call.
    }

    
    getTodos = () => {
      axios.get('http://localhost:9000/api/todos', {
        signal: this.controller.signal
     }).then(res => {
           /* console.log('data', res.data.data) */
           this.setState({todos:res.data.data} )
        }).catch(err => console.error(err))
    }
    
    handleChanges = e => {
      // update state with each keystroke
      this.setState({ newTodo: e.target.value })
    };
  
    addNewTodo = (todo) => {
      const newTodo = {completed:false, id:Date.now().toString(), name:todo}
      this.setState({todos:[...this.state.todos, newTodo]}) 
    } 


    // class property to submit form
    handleSubmit = e => {
      e.preventDefault();/* 
      console.log('formSubmit', e) */
      this.addNewTodo(this.state.newTodo)
      this.setState({ newTodo: '' })
      
    }

    toggleTodo = todoId => {
      this.setState({
        todos:this.state.todos.map(todo => {
          if(todo.id === todoId) {
            return { ...todo , completed:!todo.completed}
          }
          return todo
        })
      })

      // this.checkAnyComplete()
    }

    checkAnyComplete = () => {
      const checkComplete = this.state.todos.filter(todo => todo.completed ) 
      const isAnyComplete = checkComplete.length > 0
      console.log('checkAnyComplete', checkComplete.length)
      if(this.checkAnyComplete){
        this.setState({anyComplete:isAnyComplete})
      }
      // console.log('checkAnyComplete', this.state.anyComplete)
      /* return isAnyComplete */
    }

    doHideCompleted = () =>{
      console.log('doHideComplete')
      
      // if(this.state.anyComplete){
        this.setState({ todos: this.state.todos.filter(todo => !todo.completed )})
      // }
    }

    /* on first render calling external data */
    componentDidMount(){
      this.getTodos()
      this.checkAnyComplete()
    }

    componentWillUnmount(){
      this.controller.abort()
    }

    componentDidUpdate(){
      console.log('checkAnyComplete after render', this.state.anyComplete)

      // checkAnyComplete()
    }
  
  render() {


    return (
      <div>
        {/* {!this.state.todos.length && <div>loading data...</div> } */}
        <TodoList  todos={this.state.todos} toggleTodo={this.toggleTodo} />
        <Form 
          handleSubmit={this.handleSubmit} 
          handleChanges={this.handleChanges}
          newTodo={this.state.newTodo}
          doHideCompleted={this.doHideCompleted}    
        />
      </div>
    )
  }
}
