<template>
    <li>
      <input type="checkbox" v-model="completed" @change="updateTodo" />
      <span :class="{ done: completed }">{{ todo.title }}</span>
      <button @click="editTodo">Edit</button>
      <button @click="deleteTodo">Delete</button>
    </li>
  </template>
  
  <script>
  export default {
    props: ['todo'],
    data() {
      return {
        completed: this.todo.completed,
      };
    },
    methods: {
      updateTodo() {
        this.$emit('update-todo', this.todo.id, { completed: this.completed });
      },
      editTodo() {
        const newTitle = prompt('Edit the todo:', this.todo.title);
        if (newTitle) {
          this.$emit('update-todo', this.todo.id, { title: newTitle });
        }
      },
      deleteTodo() {
        this.$emit('delete-todo', this.todo.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .done {
    text-decoration: line-through;
  }
  </style>
  
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  button {
    margin-left: 10px;
  }
  </style>
  