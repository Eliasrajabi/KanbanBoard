<template>
  <AddListForm
    :showForm="showForm"
    :listName="listName"
    :isEditing="isEditing" 
    @addList="addList"
    @closeForm="resetForm"
    
  />

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
        class="flex flex-row justify-between items-center bg-list px-3 pt-1 pb-2"
        
      >
        <h2 class="text-sm font-bold">{{ list.name }} </h2>

        <div class=" " >
          <button
            @click="editList(index)"
            class="hover:bg-list text-white font-bold py-0 px-0 rounded mr-2"
          >
            <EdithIcon />
          </button>
          <button
            @click="deleteList(index)"
            class="hover:bg-list_header_hove text-white font-bold py-0 px-0 rounded"
          >
            <RemoveIcon />
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
          class="hover:bg-list_header_hove text-white font-bold py-1 px-2 rounded float-right"
          @click="deleteAddedTask(index)"
        >
          <RemoveIcon />
        </button>

        <h3 v-if="task" class="font-bold text-ms">{{ task.title }}</h3>
        <p v-if="task" class="text-ms">{{ task.description }}</p>
      </div>

      <!--  Add New Task Form -->
      <AddTaskForm
        :index="index"
        :list="list"
        @showTaskForm="showTaskForm"
        @addTask="addTask"
        @cancelAddTask="cancelAddTask"
      />
    </div>
  </div>
</template>

<script>
import RemoveIcon from "../icons/RemoveIcon.vue";
import EdithIcon from "../icons/EdithIcon.vue";
import AddTaskForm from "./AddTaskForm.vue";
import AddListForm from "./AddListForm.vue";
export default {
  name: "ListForm",
  components: {
    RemoveIcon,
    EdithIcon,
    AddTaskForm,
    AddListForm,
  },
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
    addList(listName) {
      if (this.editingIndex !== null) {
        // If editing, update the list at editingIndex
        this.listNames[this.editingIndex].name = listName;
        this.editingIndex = null;
        this.isEditing = false;
      } else {
        // If not editing, add a new list
        this.listNames.push({
          name: listName,
          tasks: [],
          newTask: { title: "", description: "" },
          showTaskForm: false,
        });
        if (listName === "") {
          alert("Please enter a list name");
          return;
        }
      }
      this.resetForm();
      sessionStorage.setItem("listNames", JSON.stringify(this.listNames));
    },
    editList(index) {
      this.showForm = true;
      this.listName = this.listNames[index].name;
      this.editingIndex = index; // set editingIndex when editing
      this.isEditing = true;
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
