import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: localStorage.getItem('usuario') !== null ? JSON.parse(localStorage.getItem('usuario')) : null
  },
  mutations: {
    obtenerUsuario(state, payload){   
      state.usuario = payload;
    }
  },
  actions: {
    guardarUsuario({commit}, payload){
      const usuarioGuardar = {
        codigo: payload.codigo, 
        username: payload.username, 
        tipo: payload.tipo,
        codigo_cliente: payload.codigo_cliente,
        codigo_vendedor: payload.codigo_vendedor,
        codigo_empresa: payload.codigo_empresa,
        estado: payload.estado
      };
      commit('obtenerUsuario', usuarioGuardar);
      localStorage.setItem('usuario', JSON.stringify(usuarioGuardar));
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', null);
      localStorage.removeItem('usuario');
      router.push({name: 'InicioSesion'});
    }
  },
  getters:{
    usuario(state){
      return state.usuario
    }
  },
  modules: {
  }
})
