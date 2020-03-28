import { writable } from "svelte/store";

const storeKey = "mm-skill-trainer-checklist";
const storedValue = localStorage.getItem(storeKey);
let initialValue = [];

if (storedValue) {
  initialValue = JSON.parse(storedValue);
}

const toDoStore = writable(initialValue);

toDoStore.subscribe(val => {
  localStorage.setItem(storeKey, JSON.stringify(val));
})

export default toDoStore;