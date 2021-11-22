<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h4 class="mb-4">Mi Empresa</h4>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="actualizar()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Nombre" class="form-control" v-model="empresa.nombre" required>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Direccion" class="form-control" v-model="empresa.direccion" required>
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
            empresa:{},
            mensaje:{ver:false},
        }
    },
    created(){
        this.verEmpresa()
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
        verEmpresa(){
            this.axios.get('empresas/filtro-codigo/' + this.usuario.codigo_empresa)
            .then(respuesta =>{
                if(respuesta.status === 200){
                  this.empresa = respuesta.data
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        actualizar(){
            this.axios.put('empresas/' + this.empresa.codigo, this.empresa)
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