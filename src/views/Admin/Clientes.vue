<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h3>Clientes:</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <input @keypress="verClientes()" type="text" class="form-control text-center formulario" placeholder="Ingrese nombre del cliente" v-model="filtro">
            <button class="btn btn-outline-success" @click="verClientes()"><span class="icon-Lupa"></span></button>
        </div>
        <Tabla :clientes="clientes"/>
    </div>
</template>
<script>
import Tabla from '@/components/clientes/TablaClientes.vue'
import Mensaje from '@/components/Mensaje.vue'
export default {
    data(){
        return{
            clientes:[],
            mensaje:{ver:false},
            filtro:''
        }
    },
    created(){
        this.verClientes()
    },
    methods:{
        verClientes(){
            const filtro = {
                nombres: this.filtro
            }
            this.axios.post('clientes/filtro-nombres', filtro)
            .then(respuesta =>{
                console.log(respuesta)
                this.clientes = respuesta.data
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    },
    components:{
        Tabla,
        Mensaje
    }
}
</script>