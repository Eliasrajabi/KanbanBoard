<template>
  <div class="list">
    <h2>{{ title }}</h2>
    <div v-for="(card, index) in cards" :key="index">
      <Card
        :title="card.title"
        :description="card.description"
        @editCard="editCard(index, $event)"
        @deleteCard="deleteCard(index)"
      />
    </div>
    <div class="list-footer">
      <input v-model="newCardTitle" placeholder="Card title" />
      <textarea v-model="newCardDescription" placeholder="Card description"></textarea>
      <button @click="addCard">Add Card</button>
    </div>
  </div>
</template>

<script>
import Card from '../Card/Card.vue';
export default {
  name: 'List',
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newCardTitle: '',
      newCardDescription: '',
    };
  },
  methods: {
    addCard() {
      this.$emit('addCard', {
        title: this.newCardTitle,
        description: this.newCardDescription,
      });
      this.newCardTitle = '';
      this.newCardDescription = '';
    },
    editCard(index, card) {
      this.$emit('editCard', index, card);
    },
    deleteCard(index) {
      this.$emit('deleteCard', index);
    },
  },
};


</script>