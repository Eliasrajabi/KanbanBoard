<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(list, index) in lists" :key="index">
        <List :title="list.title" :cards="list.cards" @editCard="editCard(index, $event)" @deleteCard="deleteCard(index)" />
      </div>
    </div>
    <div class="mt-4">
      <input v-model="newListTitle" placeholder="List title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <button @click="emitAddList" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add List</button>
    </div>
  </div>
</template>

<script>
import List from '../List/List.vue';

export default {
  name: 'Board',
  components: {
    List,
  },
  props: {
    lists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newListTitle: '',
    };
  },
  methods: {
    emitAddList() {
      if (this.newListTitle.trim() !== '') {
        this.$emit('add-list', {
          title: this.newListTitle,
          cards: [],
        });
        this.newListTitle = '';
      }
    },
  },
};
</script>