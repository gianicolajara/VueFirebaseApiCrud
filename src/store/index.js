import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contador: 150,
    tasks: [],
    task: {
      id: '',
      name: '',
      selected: [],
      urgente: '',
      number: 0,
    },
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    incrementar(state, payload) {
      state.contador = state.contador + payload
    },
    disminuir(state, payload) {
      state.contador = state.contador - payload
    },
    set(state, payload) {
      state.tasks.push(payload)
      console.log(state.tasks)
    },
    eliminar(state, payload) {
      state.tasks = state.tasks.filter((value) => value.id !== payload)
    },
    update(state, payload) {
      state.tasks = state.tasks.map((value) =>
        value.id === payload.id ? payload : value,
      )
    },
    cargar(state, payload) {
      state.tasks = payload
      console.log(state.tasks)
    },
  },
  actions: {
    logout({ commit }) {
      commit('setUser', null)
      router.push('/login')
      localStorage.removeItem('usuario')
    },
    async loginUser({ commit }, user) {
      try {
        const data = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfGN_4xwfZvR4rcehYkGoeOEbsLosXvjU`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true,
            }),
          },
        )
        const logindb = await data.json()
        if (logindb.error) {
          console.log(logindb)
          return
        }
        commit('setUser', logindb)
        router.push('/form')
        localStorage.setItem('usuario', JSON.stringify(logindb))
      } catch (error) {
        console.log(error)
      }
    },
    async registerUser({ commit }, user) {
      try {
        const data = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfGN_4xwfZvR4rcehYkGoeOEbsLosXvjU`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true,
            }),
          },
        )
        const userdb = await data.json()

        if (userdb.error) {
          console.log(userdb.error.message)
          return
        }
        commit('setUser', userdb)
        localStorage.setItem('usuario', JSON.stringify(userdb))
      } catch (error) {
        console.log(error)
      }
    },
    async cargarFirebase({ commit, state }) {
      if (localStorage.getItem('usuario')) {
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      } else if (!localStorage.getItem('usuario')) {
        return commit('setUser', null)
      } else {
        return commit('setUser', null)
      }
      try {
        const res = await fetch(
          `https://vue-practica-a9094-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`,
        )
        const datadb = await res.json()
        console.log(datadb)
        const arrayData = []
        for (let id in datadb) {
          arrayData.push(datadb[id])
        }
        commit('cargar', arrayData)
      } catch (error) {
        console.log(error)
      }
    },
    accionIncrementar({ commit }, numero) {
      commit('incrementar', numero)
    },
    accionDisminuir({ commit }, numero) {
      commit('disminuir', numero)
    },
    accionBoton({ commit }, objeto) {
      if (objeto.estado) {
        commit('incrementar', objeto.numero)
      } else {
        commit('disminuir', objeto.numero)
      }
    },
    async setTareas({ commit, state }, task) {
      try {
        const res = await fetch(
          `https://vue-practica-a9094-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${task.id}.json?auth=${state.user.idToken}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          },
        )
        const data = await res.json()

        commit('set', data)
      } catch (error) {
        console.log(error)
      }
    },
    async deteleTareas({ commit, state }, id) {
      try {
        await fetch(
          `https://vue-practica-a9094-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,
          {
            method: 'DELETE',
          },
        )
        commit('eliminar', id)
      } catch (error) {
        console.log(error)
      }
    },
    async updateTask({ commit, state }, task) {
      try {
        const res = await fetch(
          `https://vue-practica-a9094-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${task.id}.json?auth=${state.user.idToken}`,
          {
            method: 'PATCH',
            body: JSON.stringify(task),
          },
        )
        const datadb = await res.json()
        commit('update', datadb)
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    getTask: (state) => (id) => {
      return state.tasks.find((value) => value.id === id)
    },
    userAuth: (state) => {
      return !!state.user
    },
  },
  modules: {},
})
