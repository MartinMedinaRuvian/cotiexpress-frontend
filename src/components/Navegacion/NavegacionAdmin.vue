<template>
    <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
  <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span class="text-dark">Coti</span><span class="color-verde-principal">Express</span></router-link>   
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="icon-Menu"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      
      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/categorias" class="text-dark">Categorías</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/vendedores" class="text-dark">Vendedores</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/clientes" class="text-dark">Clientes</router-link>
      </li>
  
      <li class="nav-item ml-4">
        <button @click="cerrarSesion" data-toggle="collapse" data-target=".navbar-collapse.show" class="btn btn-outline-success">Cerrar sesión</button>
      </li>

    </ul>
  </div>
</nav>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(['cerrarSesion'])
  }
}
</script>