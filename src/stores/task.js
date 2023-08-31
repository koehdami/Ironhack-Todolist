import { defineStore } from "pinia"
import supabase from "../lib/supabase"
import { ref } from "vue"

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .order('id', { ascending: false })

    if (error) console.log("Error: ", error);
    else{
      tasks.value = data;
    }
    console.log("tasks: ", tasks.value);
  }

  const createTask = async (input, id) =>{
    const { error } = await supabase
    .from("tasks")
    .insert({user_id:id, title:input})
    if(error) console.log(error)
    else fetchTasks()
  }

  const deleteTask = async (id) => {
    const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    if(error) console.log(error)
    else fetchTasks()
  }

  // get value from currently active edit input and update in DB
  const editTask = async (id) =>{
    const updateValue = document.querySelector(`input[name="taskInput_${id}"]`)
    const title = document.querySelector("#taskTitle_" + id)
    if(updateValue){
      const { data, error } = await supabase
      .from('tasks')
      .update({ "title": updateValue.value })
      .eq('id', id)
      .select()
      if(error) console.log("Error: " + error)
      else console.log(data)
    }
    title.innerHTML = updateValue.value
  }
  

const updateTaskValue = async (updateValue, matchValue) => {
  const { data, error } = await supabase
  .from('tasks')
  .update({"is_complete": updateValue })
  .eq("id", matchValue)
  .select()
  if(error) console.log("Error" + error)
  else fetchTasks()
}
  return { tasks, fetchTasks, createTask, updateTaskValue, deleteTask, editTask}
})