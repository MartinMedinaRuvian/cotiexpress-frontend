<template>
    <div class="mt-5">
          <table class="table">
               <thead class="thead-light">
                    <tr>
                         <th scope="col">Estado</th>
                         <th scope="col">Nombres</th>
                         <th scope="col">Apellidos</th>
                         <th scope="col">Identificación</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="cliente in clientes" :key="cliente.codigo">
                         <td :class="cliente.estado === '1' ? 'bg-success text-white' : 'bg-danger text-white'">{{ cliente.estado === '1' ? 'Activo' : 'Desactivado'}} </td>
                         <td>{{ cliente.nombres }}</td>
                         <td>{{ cliente.apellidos }}</td>
                         <td>{{ cliente.identificacion }}</td>
                         <td>
                             <button class="btn btn-outline-warning" @click="cambiarEstado(cliente)"><span class="icon-Lapiz"></span></button>
                         </td>
                    </tr>
               </tbody>
          </table>
    </div>
</template>
<script>
export default {
     props:{
          clientes:[]
     },
     methods:{
          cambiarEstado(cliente){
               this.axios.post("clientes/cambiar-estado", cliente)
               .then((respuesta) => {
               if (respuesta.status === 200) {
                    window.location = '/clientes';
               }
               })
               .catch((error) => {
               this.crearMensaje(error.response.data.mensaje, "danger");
               }); 
          }
     }
}
</script>