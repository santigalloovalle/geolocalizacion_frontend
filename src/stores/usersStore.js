import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { alert } from '../alerts.js'

export const useUsersStore = defineStore('users', () => {
  
  const users= ref([])
  const URL_USERS = 'http://localhost:3000/users/'

  const readUsers = async (cordY, cordX) => {
    try {
      const cord = `${cordY},${cordX}`
      const response = await axios({
        url: URL_USERS+`${cord}`,
        method: 'GET',
      })
      console.log(response.data)
      users.value = response.data
      return users.value;
      } catch (error) {
        console.log(error);
      }
  }

  const createUsers = async (useName, useLastName, useDocument, useDirection, useCordinates) => {    
    try {
      // console.log(useName, useLastName, useDocument, useDirection, useCordinates)
      const response = await axios({
        url: URL_USERS,
        method: 'POST',
        data: {
          useNombre: useName,
          useApellido: useLastName,
          useDocumento: useDocument,
          useDireccion: useDirection,
          useCordinates: useCordinates,
        }
      })
      
        alert('success', 'Usuario creado correctamente', 'success')
      } catch (error) {
        console.log(error);
      }
  }

  return { readUsers, createUsers, users }
})