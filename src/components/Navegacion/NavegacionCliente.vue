<template>
    <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
  <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span class="text-dark">Coti</span><span class="color-verde-principal">Express</span></router-link>   
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="icon-Menu"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      
      <li class="nav-item ml-4" v-if="usuario.estado === '1'">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/cliente-perfil" class="text-dark">Mi Perfil</router-link>
      </li>

      <li class="nav-item ml-4" v-if="usuario.estado === '1'">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/catalogo" class="text-dark">Catálogo</router-link>
      </li>

      <li class="nav-item ml-4" v-if="usuario.estado === '1'">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/pedidos-cliente" class="text-dark">Mis Pedidos <span class="numero-pedidos">{{pedidosPersona.length}}</span></router-link>
      </li>
  
      <li class="nav-item ml-4">
        <button @click="cerrarSesion" data-toggle="collapse" data-target=".navbar-collapse.show" class="btn btn-outline-success">Cerrar sesión</button>
      </li>

    </ul>
  </div>
</nav>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['usuario', 'pedidosPersona'])
  },
  methods:{
    ...mapActions(['cerrarSesion'])
  }
}
</script>
<style scoped>
  .numero-pedidos{
    background-color: #00A82D;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
  }
</style>
