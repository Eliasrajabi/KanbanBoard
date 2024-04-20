<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="card-footer">
      <button @click="editMode = !editMode">{{ editMode ? 'Save' : 'Edit' }}</button>
      <button @click="deleteCard">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
    };
  },
  methods: {
    deleteCard() {
      this.$emit('deleteCard');
    },
  },
};
</script>
