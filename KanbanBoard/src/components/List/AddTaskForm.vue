<template>
     <div class="flex flex-col">
        <button
          @click="showTaskForm(index)"
          class=" bg-list_header hover:bg-list_header_hove text-white py-1 px-3 mt-0 justify-between items-center flex flex-row w-60"
        >
        <span>Add another card</span>
          <PlusIcon />
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
</template>

<script>
import PlusIcon from '../icons/PlusIcon.vue';

export default {
    name: "AddTaskForm",
    components:{
        PlusIcon,
    },
    props: ['index', 'list'],
    data(){
        return{
            listName: '',
            showForm: false,
        }
    },
    methods:{
        showTaskForm(index){
            this.$emit('showTaskForm', index)
        },
        addTask(index){
            this.$emit('addTask', index)
        },
        cancelAddTask(index){
            this.$emit('cancelAddTask', index)
        }
    }
}
</script>