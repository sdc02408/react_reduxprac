import {createAction,handleActions} from 'redux-actions';


const CHANGE_INPUT = 'todos/CHANGE_INPUT';//인풋값을 변경함
const INSERT = 'todos/INSERT'; //새로운 TODO를 등록함
const TOGGLE = 'todos/TOGGLE'; //TODO를 체크/체크 해제함
const REMOVE = 'todos/REMOVE';//TODO를 제거함

export const changeInput = createAction( CHANGE_INPUT,input => input);

let id =3; //insert가 호출될때마다 1씩 더해진다.
//
// export const insert = text => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false
//   }
// });
export const insert = createAction(INSERT,text => ({
  id: id++,
  text,
  done:false
}));

export const toggle = createAction(TOGGLE, id => id)

export const remove = createAction (REMOVE,id => id)

const initialState ={
  input: '',
  todos:[
    {id:1,
    text:'리덕스 배우기',
    done: true},
    {id:2,
      text:'리덕스 사용하기',
      done: false},
  ]
};

const todos = handleActions({
  [CHANGE_INPUT]: (state, {payload:input}) => ({ ...state, input }),
  [INSERT]: (state, {payload:todo}) => ({
    ...state,
    todos: state.todos.concat(todo),
  }),
  [TOGGLE]: (state, {payload:id}) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,),
  }),
  [REMOVE]: (state, {payload:id}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  }),
},
  initialState,);
export default todos;
