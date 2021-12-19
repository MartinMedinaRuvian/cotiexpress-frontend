<template>
    <div class="mt-5">
          <table class="table" v-if="productos.length > 0">
               <thead class="thead-light">
                    <tr>
                         <th scope="col">Código</th>
                         <th scope="col">Descripción</th>
                         <th scope="col">Foto</th>
                         <th scope="col">Precio Unidad</th>
                         <th scope="col">Cantidad</th>
                         <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="producto in productos" :key="producto.codigo">
                         <td>{{ producto.codigo }}</td>
                         <td>{{ producto.descripcion }}</td>
                         <td><img :src="verFoto(producto.foto)" :alt="producto.codigo" width="100px" height="100px"></td>
                         <td>{{ producto.precio_unidad }}</td>
                         <td>{{ producto.cantidad }}</td>
                         <td>
                              <button class="btn btn-outline-warning" @click="editar(producto)"><span class="icon-Lapiz"></span></button>
                         </td>
                    </tr>
               </tbody>
          </table>
          <div class="text-center" v-else>
               <h3>Sin productos, te invitamos a registrar tu primer producto 🤗</h3>
          </div>
    </div>
</template>
<script>
export default {
     props:{
          productos:[]
     },
     methods:{
          editar(producto){
               this.$router.push({ name: 'ProductosEditar', params: { producto }})
          },
          verFoto(nombreFoto){
               return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
          }
     }
}
</script>