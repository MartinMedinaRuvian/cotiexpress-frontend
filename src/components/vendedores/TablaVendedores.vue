<template>
    <div class="mt-5">
          <table class="table">
               <thead class="thead-light">
                    <tr>
                         <th scope="col">Estado</th>
                         <th scope="col">Nombres</th>
                         <th scope="col">Apellidos</th>
                         <th scope="col">Identificación</th>
                         <th scope="col">Acción</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="vendedor in vendedores" :key="vendedor.codigo">
                         <td :class="vendedor.estado === '1' ? 'bg-success text-white' : 'bg-danger text-white'">{{ vendedor.estado === '1' ? 'Activo' : 'Desactivado'}} </td>
                         <td>{{ vendedor.nombres }}</td>
                         <td>{{ vendedor.apellidos }}</td>
                         <td>{{ vendedor.identificacion }}</td>
                         <td>
                              <button class="btn btn-outline-warning ml-2" @click="cambiarEstado(vendedor)"><span class="icon-pencil"></span></button>
                         </td>
                    </tr>
               </tbody>
          </table>
    </div>
</template>
<script>
export default {
     props:{
          vendedores:[]
     },
     methods:{
          cambiarEstado(vendedor){
               this.axios.post("vendedores/cambiar-estado", vendedor)
               .then((respuesta) => {
               if (respuesta.status === 200) {
                    window.location = '/vendedores';
               }
               })
               .catch((error) => {
               this.crearMensaje(error.response.data.mensaje, "danger");
               }); 
          }
     }
}
</script>