<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h4>Bienvenido {{ usuario === null ? '' : usuario.username }}</h4>
        <p>Mi Perfil</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="actualizar()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Nombres" class="form-control" v-model="cliente.nombres" required>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Apellidos" class="form-control" v-model="cliente.apellidos" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Identificacion" class="form-control" v-model="cliente.identificacion" disabled>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Teléfono" class="form-control" v-model="cliente.telefono">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Direccion" class="form-control" v-model="cliente.direccion">
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
            cliente:{},
            mensaje:{ver:false},
        }
    },
    created(){
        this.vercliente()
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
        vercliente(){
            this.axios.get('clientes/' + this.usuario.codigo)
            .then(respuesta =>{
                if(respuesta.status === 200){
                  this.cliente = respuesta.data
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        actualizar(){
            this.axios.put('clientes/' + this.cliente.codigo, this.cliente)
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