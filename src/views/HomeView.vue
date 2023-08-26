<script setup>
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/task";
import { ref } from 'vue';


const register = ref(true)

const userStore = useUserStore();
const taskStore = useTaskStore();


const email = ref("");
const password = ref("");
const passwordConfirm = ref("")


const swapMask = () => {
  register.value = !register.value
  nullValues()
}

const nullValues = () => {
  email.value = ""
  password.value = ""
  passwordConfirm.value = ""
  userStore.message = ""
}


</script>

<template>
  <div v-if="userStore.user">
    <div class="container mb-2">
      <div class="row">
        <div class="col">
          <h2>You logged in as: {{ userStore.user.user.email }}</h2>
          <p>Do you want to <button class="bg-transparent border-0 text-primary text-decoration-underline w-auto m-0 p-0" @click="userStore.logoutUser(); nullValues();">logout?</button></p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="input-group mb-3">
            <input minlength="4" type="text" v-model="title" class="form-control" placeholder="Write new task">
            <div class="input-group-append">
            <button @click="taskStore.createTask(title, userStore.user.user.id)" class="btn btn-success ms-1" type="button">Create</button>
            </div>
          </div>
        </div>
        <div class="col d-flex justify-content-end" style="max-height:38px;">
          <button @click="taskStore.fetchTasks(userStore.user.user.id)" class="btn btn-primary me-2">Refresh</button>
        </div>
      </div>

      </div>
      <div class="container text-center border">
          <div v-for="task in taskStore.tasks" class="row py-3" id="keys">
              <div class="col" >
                {{ task.title }}
                {{ task.is_complete }}
                {{ task.id }}
              </div>
              <div class="col" >
                <input v-if="task.is_complete" @click="taskStore.updateTaskValue(false, task.id, userStore.user.user.id)" checked type="checkbox" name="checkbox">
                <input v-else type="checkbox" @click="taskStore.updateTaskValue(true, task.id, userStore.user.user.id)" name="checkbox" :id="task.id">
              </div>
          </div>
      </div>
    </div>
  <div v-else>
    <p class="h2 mt-5 text-center">User Authentication</p> 
    <p class="h3 text-center text-danger mb-4" v-if="userStore.message">{{ userStore.message }}</p> 
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div v-if="register" class="col-4 d-flex flex-column gap-2">
          <input placeholder="Write your email" v-model="email">
          <input placeholder="Write your password" v-model="password">
          <button @click="userStore.loginUser(email, password)">Login</button>
          <p class="text-end">Want to <button class="bg-transparent border-0 text-primary text-decoration-underline w-auto m-0 p-0" @click="swapMask">Register</button> insted?</p>
        </div>
        <div v-else class="col-4 d-flex flex-column justify-content-center gap-2">
          <input placeholder="Write your email" v-model="email">
          <input placeholder="Write your password" v-model="password">
          <input placeholder="Cofirm your password" v-model="passwordConfirm">
          <button @click="userStore.createNewUser(email, password, passwordConfirm)">Create Account</button>
          <p class="text-end">Want to <button class="bg-transparent border-0 text-primary text-decoration-underline w-auto m-0 p-0" @click="swapMask">login</button> insted?</p>
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
  #keys:nth-child(even){
    background: rgba(228, 228, 228, 0.26);
  }
</style>