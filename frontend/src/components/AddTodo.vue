<template>
    <div>
      <input v-model="title" @keyup.enter="submit" placeholder="Add a new to-do" />
      <button @click="submit">Add</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: ''
      };
    },
    methods: {
      submit() {
        if (this.title.trim() !== '') {
          this.$emit('add-todo', this.title);
          this.title = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
div {
  margin-bottom: 20px;
}

input {
  margin-right: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  div {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>

  