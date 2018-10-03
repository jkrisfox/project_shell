<template>
  <div class="todo field is-grouped">
      <input type="checkbox" class="checkbox" v-bind:id="todo.id"/>
      <div class="control is-expanded">
        <label v-bind:for="todoId">{{todo.subject}}</label>
      </div>
      <div class="date control"><label>{{todo.dueDate | moment("MM-DD-YYYY")}}</label></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ToDo extends Vue {
  @Prop({ default: {} })
  todo!: Object
}
</script>
<style lang="sass" scoped>

</style>

