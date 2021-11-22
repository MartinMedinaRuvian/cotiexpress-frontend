<template>
  <div id="app" class="container">
    <NavegacionLanding v-if="usuario === null"/>
    <NavegacionCliente v-if="usuario !== null && usuario.tipo == '1'"/>
    <NavegacionVendedor v-if="usuario !== null && usuario.tipo =='2'"/>
    <NavegacionAdmin v-if="usuario !== null && usuario.tipo =='3'"/>
    <router-view class="contenedor-vistas"/>
    <Footer/>
  </div>
</template>
<script>
import NavegacionLanding from './components/Navegacion/NavegacionLanding.vue'
import NavegacionCliente from './components/Navegacion/NavegacionCliente.vue'
import NavegacionVendedor from './components/Navegacion/NavegacionVendedor.vue'
import NavegacionAdmin from './components/Navegacion/NavegacionAdmin.vue'
import Footer from './components/parciales/Footer.vue'
import { mapGetters } from "vuex";
export default {
  components: { 
    NavegacionLanding, 
    NavegacionCliente, 
    NavegacionVendedor,
    NavegacionAdmin,
    Footer 
  },
  computed:{
    ...mapGetters(['usuario'])
  }
  
}
</script>