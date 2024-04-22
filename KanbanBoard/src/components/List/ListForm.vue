<template>
  <!--  add/edit form -->
  <div class="fixed top-10 right-0 ">
    <div class="flex flex-row">
      <div class="mx-10">
        <div class="flex flex-col">
          <button
            @click="showForm = true"
            class=" bg-list_header hover:bg-list_header_hover text-white py-1 px-3 mt-2 justify-between items-center flex flex-row w-60"
          >
            Add new list
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F9F9F9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
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
                v-model="listName"
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
  </div>
  <!--  end of add/edit form -->
  <!--  show lists -->
  <div class="flex flex-wrap items-start py-10 px-5">
    <div
      class="bg-list rounded-xs m-3 w-60 shadow-md flex flex-col"
      v-for="(list, index) in listNames"
      :key="index"
      @drop="dropTask(index)"
      @dragover.prevent
    >
      <div
        class="flex flex-row justify-between items-center bg-list px-3 pt-3 pb-3"
      >
        <h2 class="text-sm font-bold">{{ list.name }}</h2>

        <div class=" ">
          <button
            @click="editList(index)"
            class=" hover:bg-list text-white font-bold py-0 px-0 rounded mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4C1616"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
              ></path>
              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
            </svg>
          </button>
          <button
            @click="deleteList(index)"
            class=" hover:bg-list_header_hove text-white font-bold py-0 px-0 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4C1616"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <!--  End of List Item -->
      <!--  Add New Task Form -->
      <div
        class="bg-stone-200 rounded p-3 mt-2 shadow-md"
        v-for="(task, taskIndex) in list.tasks"
        :key="taskIndex"
        draggable="true"
        @dragstart="dragStart(index, taskIndex)"
      >
        <button
          class=" hover:bg-list_header_hove text-white font-bold py-1 px-2 rounded float-right"
          @click="deleteAddedTask(index)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4C1616"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h3 v-if="task" class="font-bold text-ms">{{ task.title }}</h3>
        <p v-if="task" class="text-ms">{{ task.description }}</p>
      </div>
      <!--  End of Task Item -->
      <!--  Add New Task Form -->
      <div class="flex flex-col">
        <button
          @click="showTaskForm(index)"
          class=" bg-list_header hover:bg-list_header_hove text-white py-1 px-3 mt-2 justify-between items-center flex flex-row w-60"
        >
          Add another card
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF9F3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <form
          v-if="list.showTaskForm"
          class="bg-stone-200 shadow-md px-3 pt-2 pb-2 mb-0 mt-0"
        >
          <div class="mb-2">
            <label
              class="block text-list_header text-sm font-bold mb-2"
              for="taskTitle"
              >Title</label
            >
            <input
              class="rounded w-full py-2 px-3 leading-tight"
              type="text"
              placeholder="Enter task title..."
              id="taskTitle"
              v-model="list.newTask.title"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-list_header text-sm font-bold mb-2"
              for="taskDescription"
              >Description</label
            >
            <textarea
              class="rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="Enter task description..."
              id="taskDescription"
              v-model="list.newTask.description"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="   text-list_header hover:text-slate-600 font-bold text-sm py-1 px-2 rounded "
              @click="addTask(index)"
            >
              Add card
            </button>
            <button
              type="button"
              class="inline-block align-baseline font-bold py-2 px-2 text-sm text-list_header hover:text-slate-600"
              @click="cancelAddTask(index)"
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
export default {
  data() {
    return {
      listName: "",
      showForm: false,
      listNames: JSON.parse(sessionStorage.getItem("listNames")) || [],
      draggedTask: null,
      editingIndex: null,
      isEditing: false,
    };
  },
  methods: {
    addList() {
      if (this.editingIndex !== null) {
        // If editing, update the list at editingIndex
        this.listNames[this.editingIndex].name = this.listName;
        this.editingIndex = null;
      } else {
        // If not editing, add a new list
        this.listNames.push({
          name: this.listName,
          tasks: [],
          newTask: { title: "", description: "" },
          showTaskForm: false,
        });
        if (this.listName === "") {
          alert("Please enter a list name");
          return;
        }
      }
      this.resetForm();
      sessionStorage.setItem("listNames", JSON.stringify(this.listNames));
    },
    editList(index) {
      this.listName = this.listNames[index].name;
      this.showForm = true;
      this.editingIndex = index; // set editingIndex when editing
      this.isEditing = true; // set isEditing to true when editing
    },
    deleteList(index) {
      if (!confirm("Are you sure you want to delete this list?")) {
        return;
      }
      this.listNames.splice(index, 1);
      sessionStorage.setItem("listNames", JSON.stringify(this.listNames));
    },
    showTaskForm(index) {
      this.listNames[index].showTaskForm = true;
    },
    deleteAddedTask(index) {
      if (!confirm("Are you sure you want to delete this task?")) {
        return;
      }
      this.listNames[index].tasks.pop();
      sessionStorage.setItem("listNames", JSON.stringify(this.listNames));
    },

    resetForm() {
      this.showForm = false;
      this.listName = "";
      this.editingIndex = null;
      this.isEditing = false;
    },
    addTask(index) {
      if (
        this.listNames[index].newTask.title === "" ||
        this.listNames[index].newTask.description === ""
      ) {
        alert("Please enter a title and description for the task");
        return;
      }
      this.listNames[index].tasks.push({
        title: this.listNames[index].newTask.title,
        description: this.listNames[index].newTask.description,
      });
      this.listNames[index].newTask.title = "";
      this.listNames[index].newTask.description = "";
      this.listNames[index].showTaskForm = false;
      sessionStorage.setItem("listNames", JSON.stringify(this.listNames));
    },
    cancelAddTask(index) {
      this.listNames[index].showTaskForm = false;
      this.listNames[index].newTask = { title: "", description: "" };
    },
  

    dragStart(listIndex, taskIndex) {
      this.draggedTask = { listIndex, taskIndex };
    },
    dropTask(dropListIndex) {
      if (!this.draggedTask) return;
      const { listIndex, taskIndex } = this.draggedTask;
      const draggedTask = this.listNames[listIndex].tasks.splice(
        taskIndex,
        1
      )[0];
      this.listNames[dropListIndex].tasks.push(draggedTask);
      this.draggedTask = null;
      sessionStorage.setItem("listNames", JSON.stringify(this.listNames));
    },
  },
};
</script>
