import { defineStore } from "pinia"
import supabase from "../lib/supabase"
import { ref } from "vue"

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const fetchTasks = async (id) => {
    const { data, error } = await supabase
      .from('tasks')
      .select()

    if (error) console.log("Error: ", error);
    else{
      let userTasks = []
      for(let entrie of data){
        if(entrie.user_id == id){
          userTasks.push(entrie)
        }
      }
      tasks.value = userTasks;
    }
    console.log("tasks: ", tasks.value);
  }

  const createTask = async (input, id) =>{
    const { error } = await supabase
    .from("tasks")
    .insert({user_id:id, title:input})
    if(error) console.log(error)
    else fetchTasks(id)
  }
  

const updateTaskValue = async (updateValue, matchValue, id) => {
  const { data, error } = await supabase
  .from('tasks')
  .update({"is_complete": updateValue })
  .eq("id", matchValue)
  .select()
  if(error) console.log("Error" + error)
}
  return { tasks, fetchTasks, createTask, updateTaskValue}
})