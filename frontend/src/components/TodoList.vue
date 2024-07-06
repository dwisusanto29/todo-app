<template>
    <div>
      <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodo" placeholder="Enter a new to-do" />
        <button type="submit">Add To-Do</button>
      </form>
      <ul>
        <TodoItem 
          v-for="todo in todos" 
          :key="todo.id" 
          :todo="todo" 
          @update-todo="updateTodo"
          @delete-todo="deleteTodo" 
        />
      </ul>
    </div>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue';
  
  export default {
    components: {
      TodoItem,
    },
    data() {
      return {
        todos: [],
        newTodo: '',
      };
    },
    created() {
      this.fetchTodos();
    },
    methods: {
      async fetchTodos() {
        const response = await fetch('http://localhost:3000/todos');
        this.todos = await response.json();
      },
      async addTodo() {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: this.newTodo, completed: false }),
        });
        const newTodo = await response.json();
        this.todos.push(newTodo);
        this.newTodo = '';
      },
      async updateTodo(id, updatedData) {
        await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        this.fetchTodos();
      },
      async deleteTodo(id) {
        await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
        });
        this.fetchTodos();
      },
    },
  };
  </script>
  
  
  <style scoped>
.todo-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

@media (max-width: 600px) {
  .todo-list {
    padding: 10px;
  }
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input[type="checkbox"] {
  margin-right: 10px;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ff1a1a;
}

@media (max-width: 600px) {
  li {
    flex-direction: column;
    align-items: flex-start;
  }
  
  button {
    margin-top: 10px;
  }
}
</style>

  