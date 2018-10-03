<template>
  <div>
    <h1>ToDos</h1>
    <ToDo v-for="todo in todos" v-bind:key="todo.id" v-bind:todo="todo"></ToDo>
    <div class="form">

    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import ToDo from '@/components/ToDo.vue';

@Component({ components: { ToDo } })
export default class ToDos extends Vue {
  @Prop({ default: [] })
  todos!: Object[];

  mounted() {
    axios.get('/api/todos')
      .then((response) => {
        this.todos = response.data.todos;
      });
  }
}
</script>

