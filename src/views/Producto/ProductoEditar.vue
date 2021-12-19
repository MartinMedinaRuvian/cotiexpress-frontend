<template>
    <div class="text-center">
        <h4>Editar {{ producto.descripcion }}</h4>
        <img :src="urlImg" alt="img-foto" width="200px" height="200px">
        <div class="form group mt-3">
                <label for="descripcion">Descripción:</label>
                <input type="text" placeholder="Descripción" v-model="producto.descripcion" class="form-control">
            </div>

            <div class="form group row mt-3">
                <div class="col-md-6">
                    <label for="descripcion">Cantidad:</label>
                    <input type="text" placeholder="Cantidad" v-model="producto.cantidad" class="form-control">
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="precioUnidad">Precio Unidad:</label>
                            <input type="text" placeholder="Precio unidad" v-model="producto.precio_unidad" class="form-control">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <button class="btn btn-secondary form-control" @click="cancelar">Cancelar</button>
                </div>
                <div class="col-md-6">
                    <input type="button" class="btn btn-success form-control" value="Actualizar"  @click="actualizar(producto.codigo)">
                </div>
            </div>
        <Mensaje :mensaje="mensaje"/>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje.vue'
export default {
    data(){
        return{
            mensaje:{ver:false},
            urlImg:''
        }
    },
    props:{
        producto:Object
    }, 
    created(){
        this.traerImagenBack();
    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        cancelar(){
            this.$router.push({ name: 'Productos'})
        },
        actualizar(codigo){
            this.axios.put('productos/' + codigo, this.producto)
            .then(respuesta=>{
                if(respuesta.status === 200){
                    this.$router.push({ name: 'Productos'})
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        traerImagenBack(){
            this.urlImg = this.axios.defaults.baseURL + '/imagenes/' + this.producto.foto;
        },
    },
    components:{
        Mensaje
    }
}
</script>