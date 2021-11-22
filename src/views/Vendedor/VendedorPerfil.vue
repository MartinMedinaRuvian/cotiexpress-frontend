<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h4 class="mb-4">Mi Perfil</h4>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="actualizar()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Nombres" class="form-control" v-model="vendedor.nombres" required>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Apellidos" class="form-control" v-model="vendedor.apellidos" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Identificacion" class="form-control" v-model="vendedor.identificacion" disabled>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Teléfono" class="form-control" v-model="vendedor.telefono">
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control" v-model="vendedor.email">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" @click="actualizar()">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje.vue'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            vendedor:{},
            mensaje:{ver:false},
        }
    },
    created(){
        this.verVendedor()
    },
    computed:{
        ...mapGetters(['usuario'])
    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        verVendedor(){
            this.axios.get('vendedores/' + this.usuario.codigo)
            .then(respuesta =>{
                if(respuesta.status === 200){
                  this.vendedor = respuesta.data;
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        actualizar(){
            this.axios.put('vendedores/' + this.vendedor.codigo, this.vendedor)
            .then((respuesta)=>{
                if(respuesta.status === 200){
                   this.crearMensaje(respuesta.data.mensaje, 'success')
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    },
    components:{
        Mensaje
    }
}
</script>