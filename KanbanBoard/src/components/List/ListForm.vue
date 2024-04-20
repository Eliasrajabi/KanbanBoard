<template>
  <div class="container mx-auto px-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showForm = true">Add to List</button>
    <form v-if="showForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="listName">List Name</label>
        <input 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="text" 
          placeholder="Enter list name..."
          id="listName"
          v-model="listName">
      </div>
      <div class="flex items-center justify-between">
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          @click="addList">Submit
        </button>
        <button 
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
          @click="showForm = false">Cancel
        </button>
      </div>
    </form>
    <div v-for="(list, index) in listNames" :key="index" class="bg-white shadow-md rounded p-8 m-4" @drop="dropTask(index)" @dragover.prevent>
      <h2 class="font-bold text-xl mb-2">{{ list.name }}</h2>
      <button @click="editList(index)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
      <button @click="deleteList(index)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
      <button @click="showTaskForm(index)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2">Add Task</button>
      <form v-if="list.showTaskForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="taskTitle">Task Title</label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Enter task title..."
            id="taskTitle"
            v-model="list.newTask.title">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="taskDescription">Task Description</label>
          <textarea 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Enter task description..."
            id="taskDescription"
            v-model="list.newTask.description"></textarea>
        </div>
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          @click="addTask(index)">Submit
        </button>
      </form>
      <div v-for="(task, taskIndex) in list.tasks" :key="taskIndex" class="bg-gray-200 rounded p-4 mt-2" draggable="true" @dragstart="dragStart(index, taskIndex)">
        <h3 class="font-bold text-lg mb-2">{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listName: '',
      showForm: false,
      listNames: [],
      draggedTask: null
    }
  },
  methods: {
    addList() {
      this.listNames.push({ name: this.listName, tasks: [], newTask: { title: '', description: '' }, showTaskForm: false });
      this.listName = '';
      this.showForm = false;
    },
    editList(index) {
      this.listName = this.listNames[index].name;
      this.listNames.splice(index, 1);
      this.showForm = true;
    },
    deleteList(index) {
      this.listNames.splice(index, 1);
    },
    showTaskForm(index) {
      this.listNames[index].showTaskForm = true;
    },
    addTask(index) {
      this.listNames[index].tasks.push({ title: this.listNames[index].newTask.title, description: this.listNames[index].newTask.description });
      this.listNames[index].newTask.title = '';
      this.listNames[index].newTask.description = '';
      this.listNames[index].showTaskForm = false;
    },
    dragStart(listIndex, taskIndex) {
      this.draggedTask = { listIndex, taskIndex };
    },
    dropTask(dropListIndex) {
      if (!this.draggedTask) return;
      const { listIndex, taskIndex } = this.draggedTask;
      const draggedTask = this.listNames[listIndex].tasks.splice(taskIndex, 1)[0];
      this.listNames[dropListIndex].tasks.push(draggedTask);
      this.draggedTask = null;
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>
