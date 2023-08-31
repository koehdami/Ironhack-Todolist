<script setup>
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/task";
import { ref } from "vue";

const register = ref(true);

const userStore = useUserStore();
const taskStore = useTaskStore();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const swapMask = () => {
  register.value = !register.value;
  nullValues();
};

const nullValues = () => {
  email.value = "";
  password.value = "";
  passwordConfirm.value = "";
  userStore.message = "";
};


const editToggle = (id, edit) => {
  const taskRow = document.querySelector(`taskRow_${id}`)
  if(edit){
    document.querySelector(`#taskRow_${id}`).classList = "row"
    document.querySelector(`#taskRowEdit_${id}`).classList = "d-none"
  }else{
    document.querySelector(`#taskRow_${id}`).classList = "d-none"
    document.querySelector(`#taskRowEdit_${id}`).classList = "row d-flex justify-content-center"
  }
}

// editTaskTitle -> change p to input and get value from 


taskStore.fetchTasks()
</script>

<template>
  <div class="mt-3" v-if="userStore.user">
    <div class="container mb-2">
      <div class="row">
        <div class="col p-0">
          <h2>You logged in as: {{ userStore.user.user.email }}</h2>
          <p>
            Do you want to
            <button
              class="bg-transparent border-0 text-primary text-decoration-underline w-auto m-0 p-0"
              @click="
                userStore.logoutUser();
                nullValues();
              "
            >
              logout?
            </button>
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-5 col-8 p-sm-0 px-2">
          <div class="input-group mb-3">
            <input
              minlength="4"
              type="text"
              v-model="title"
              class="form-control"
              placeholder="Write new task"
            />
            <div class="input-group-append">
              <button
                @click="taskStore.createTask(title, userStore.user.user.id); title=''"
                class="btn btn-success ms-1"
                type="button"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center border p-0">
      <div v-for="task in taskStore.tasks" class="container-fluid py-3" id="keys">
        <div :id="'taskRow_' + task.id" class="row">
          <div :id="'editBtn_' + task.id" class="col-2">
            <button @click="editToggle(task.id, false)" class="btn btn-primary">Edit</button>
          </div>
          <div class="col">
            <p class="d-flex justify-content-center align-items-center h-100 m-0" :id="'taskTitle_' + task.id">{{ task.title }}</p>
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <input
              @click="taskStore.updateTaskValue(task.is_complete, task.id)"
              :checked="task.is_complete"
              type="checkbox"
              name="checkbox"
              class="checkbox-round"
              :id="'checkbox_' + task.id"
            />
          </div>
        </div>
        <div :id="'taskRowEdit_' + task.id" class="d-none">
          <div class="col-sm-4 col-6">
            <input class="form-control" type="text" :value=task.title :name="'taskInput_' + task.id">
          </div>
          <div :id="'saveBtn_' + task.id" class="col-sm-2 col-3 px-1">
            <button @click="taskStore.editTask(task.id); editToggle(task.id, true)" class="btn btn-success w-100">Save</button>
          </div>
          <div :id="'deleteBtn_' + task.id" class="col-sm-2 col-3 px-1">
            <button @click="taskStore.deleteTask(task.id); editToggle(task.id, true);" class="btn btn-danger w-100">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="h1 mt-5 text-center">User Authentication</p>
    <p class="h3 text-center text-danger mb-4" v-if="userStore.message">
      {{ userStore.message }}
    </p>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div v-if="register" class="col-4 d-flex flex-column gap-2">
          <input class="form-control" type="text" placeholder="Write your email" v-model="email" />
          <input class="form-control" type="password" placeholder="Write your password" v-model="password" />
          <div>
            <button class="btn btn-primary w-100" @click="userStore.loginUser(email, password)">Login</button>
            <p style="font-size:14px;" class="fw-lighter text-end my-1">
              Want to
              <button
                class="bg-transparent border-0 text-primary text-decoration-underline w-auto m-0 p-0"
                @click="swapMask"
              >
                Register
              </button>
              insted?
            </p>
          </div>
        </div>
        <div
          v-else
          class="col-4 d-flex flex-column justify-content-center gap-2"
        >
          <input class="form-control" type="text" placeholder="Write your email" v-model="email" />
          <input class="form-control" type="password" placeholder="Write your password" v-model="password" />
          <input class="form-control" type="password" placeholder="Confirm your password" v-model="passwordConfirm" />
          <div>
            <button
              class="btn btn-primary w-100"
              @click="userStore.createNewUser(email, password, passwordConfirm)"
            >
              Create Account
            </button>
            <p style="font-size:14px;" class="fw-lighter text-end my-1">
              Want to
              <button
                class="bg-transparent border-0 text-primary text-decoration-underline w-auto m-0 p-0"
                @click="swapMask"
              >
                login
              </button>
              insted?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <ul>
    <li v-for="task in taskStore.tasks">
      {{ task.title }} - {{ task.is_complete }}
    </li>
  </ul>  -->
</template>

<style>
#keys:nth-child(even) {
  background: rgba(228, 228, 228, 0.26);
}

.checkbox-round {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #ddd;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.checkbox-round:checked {
    background-color: #66bb6a;
}
</style>
