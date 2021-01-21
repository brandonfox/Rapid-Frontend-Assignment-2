<template>
<div>
    <section class="todoapp">
        <header class="header">
            <h1>{{ title }}</h1>
            <input class="new-todo" placeholder="What needs to be done?" v-on:keyup.enter="createTodo" autofocus>
        </header>

        <!-- This section should be hidden by default and shown when there are todos -->
        <section class="main" v-if="todos.length">
            <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allChecked">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
              <li :class="{ completed: task.isDone, editing: task === editing }" v-for="task in shownTodos" v-bind:key="todos.indexOf(task)">
                <div class="view">
                  <input class="toggle" type="checkbox" v-model="task.isDone">
                  <label @dblclick="startEditing(task)">{{task.text}}</label>
                  <button class="destroy" @click="destroyTodo(task)"></button>
                </div>
                <input class="edit"
                       @keyup.esc="cancelEditing"
                       @keyup.enter="finishEditing"
                       @blue="finishEditing"
                       :value="task.text">
              </li>
            </ul>
        </section>
        <!-- This footer should hidden by default and shown when there are todos -->
        <footer class="footer" v-if="todos.length">
            <!-- This should be `0 items left` by default -->
            <span class="todo-count"><strong>{{activeTodos.length}}</strong> item{{ ((activeTodos.length !== 1)? 's' : '')}} left</span>
            <!-- Remove this if you don't implement routing -->
            <ul class="filters">
                <li>
                    <a :class="{ selected: !this.$route.params.tab }" href="#/">All</a>
                </li>
                <li>
                    <a :class="{selected: this.$route.params.tab === 'active'}" href="#/active">Active</a>
                </li>
                <li>
                    <a :class="{selected: this.$route.params.tab === 'completed'}" href="#/completed">Completed</a>
                </li>
            </ul>
            <!-- Hidden if no completed items are left ↓ -->
            <button @click="clearCompleted" v-show="completedTodos.length" class="clear-completed">Clear completed</button>
        </footer>
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <!-- Remove the below line ↓ -->
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <!-- Change this out with your name and url ↓ -->
        <p>Created by <a href="http://todomvc.com">you</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
</div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'todo-app-vue';
export default {
  name: 'todo',
  data() {
      return {
        title: 'Hello!',
        todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
        editing: null,
      }
  },
  watch: {
      todos: {
        deep: true,
        handler(newValue) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
        }
      },
  },
  props: ['tab'],
  computed: {
    activeTodos() {
      return this.todos.filter(t => !t.isDone);
    },
    completedTodos() {
      return this.todos.filter(t => t.isDone);
    },
    allChecked: {
      get: function() {
        return this.todos.filter(t => !t.isDone).length === 0;
      },
      set: function(newValue){
        this.todos.forEach(t => t.isDone = newValue)
      }
    },
    shownTodos() {
      if(this.tab === 'active') return this.activeTodos
      else if (this.tab === 'completed') return this.completedTodos
      else return this.todos
    }
  },
  methods: {
    createTodo(event) {
      const textbox = event.target;
      this.todos.push({ text: textbox.value, isDone: false });
      textbox.value = '';
    },
    startEditing(todo){
      this.editing = todo;
    },
    finishEditing(event){
      if(!this.editing) { return; }
      const textbox = event.target;
      this.editing.text = textbox.value.trim();
      this.editing = null;
    },
    cancelEditing() {
      this.editing = null;
    },
    destroyTodo(todo){
      const index = this.todos.indexOf(todo);
      this.todos.splice(index,1)
    },
    clearCompleted() {
      this.todos = this.activeTodos;
    },
  }
}
</script>