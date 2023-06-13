/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  todolist = [];

  add(todo) {
    if (todo !== 'Invalid Task') {

      this.todolist.push(todo);
    }
  }

  update(index, updatedTodo) {
    if (updatedTodo !== 'Invalid Task' && index < this.todolist.length){
      this.todolist.splice(index, 1);
      this.todolist.splice(index, 0, updatedTodo);
    }
  }

  remove(indexOfTodo) {
    this.todolist.splice(indexOfTodo, 1);
  }

  getAll() {
    return this.todolist;
  }

  get(indexOfTodo) {
    if (indexOfTodo >= this.todolist.length) {
      return null;
    }
    return this.todolist[indexOfTodo];
  }

  clear() {
    this.todolist = [];
  }
}

module.exports = Todo;
