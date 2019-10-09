import uuidv4 from 'uuid/v4'

export default function reducer(state, action){
    switch(action.type) {
        case "GET_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        case "ADD_TODO":
            // const newTodo ={
            //     id: uuidv4(),
            //     text: action.payload,
            //     complete: false
            // }
            const addedTodo = [...state.todos, action.payload]
            return {
                ...state,
                todos: addedTodo
            }
        case "UPDATE_TODO":
            
            const updatedTodoIndex = state.todos.findIndex(
                t => t.id === state.currentTodo.id
            )
           const updatedTodos =[
                ...state.todos.slice(0, updatedTodoIndex),
                action.payload,
                ...state.todos.slice(updatedTodoIndex +1)
           ]
           return {
               ...state,
               currentTodo:{},
               todos: updatedTodos
           }
        case "SET_CURRENT_TODO": 
            return {
                ...state,
                currentTodo: action.payload
            }
           
        case "TOGGLE_TODO":
             const toggledTodos = state.todos.map(t => t.id === action.payload.id ?
                 action.payload  : t
             )
            return {
                ...state,
                todos: toggledTodos
            }
        case "REMOVE_TODO":
            const filteredTodos = state.todos.filter(t => t.id !== action.payload.id)    
            return {
                ...state,
                todos: filteredTodos,
                currentTodo: {}
            }
        default:
            return state;
    }
}