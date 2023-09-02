import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref();
  const message = ref("");

  const createNewUser = async (email, password, confirmPassword) => {
    if(password === confirmPassword){
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
  
      if (error) message.value = error.message;
      else {
        user.value = data;
      }
    }else{
      message.value = "Passwords don't match, Re-Enter correctly."
    }
  }

  const loginUser = async (email, password) => { 
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if(error){
      console.log("Error " + error)
      message.value = "Wrong login data"
    }
    else {
      ("Data: ", console.log(data))
      user.value = data;
      return data;
    }
  }

  const logoutUser = async () => { 
    const { error } = await supabase.auth.signOut()
    if(error) console.log("Error: " + error)
    else{
      user.value = null
    }
  }


  return {user, message, createNewUser, loginUser, logoutUser}
})