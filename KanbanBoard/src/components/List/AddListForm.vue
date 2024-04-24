<template>
  <div class="fixed top-10 right-0 ">
    <div class="flex-row mx-10">
      <div class="flex flex-col">
        <button
          @click="showForm = true"
          class=" bg-list_header hover:bg-list_header_hover text-white py-1 px-3 mt-2 justify-between items-center flex flex-row w-60"
        >
          <span>Add a list</span>
          <PlusIcon />
        </button>

        <form v-if="showForm" class="bg-stone-200 shadow-md rounded">
          <div class="px-4 py-2">
            <label
              class="block text-list_header text-sm font-bold mb-2"
              for="listName"
            >
              {{ isEditing ? "Edit List Name" : "List Name" }}
            </label>
            <input
              class="shadow rounded py-2 px-3  text-gray-500 leading-tight"
              type="text"
              placeholder="Enter a list name..."
              id="listName"
              :value="listName"
             @input="updateListName"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="px-3 py-2 font-bold text-sm text-list_header hover:text-slate-700"
              @click="addList"
            >
              {{ isEditing ? "Update" : "Add list" }}
            </button>
            <button
              class="px-3 font-bold text-sm text-list_header hover:text-slate-700"
              @click="resetForm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../icons/PlusIcon.vue';

export default {
    name: 'AddListForm',
  props: [ 'showForm', 'listName', 'isEditing'],

  components: {
    PlusIcon,
  },

   methods: {
    addList() {
      this.$emit('addList', this.listName);
      this.$emit('closeForm');
    },
    resetForm() {
      this.$emit('closeForm');
       },
    updateListName(event) {
      this.$emit('update:listName', event.target.value);
    },
  },
};
</script>