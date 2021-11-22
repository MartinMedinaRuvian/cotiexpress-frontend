<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h3>Vendedores</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <input @keypress="verVendedores()" type="text" class="form-control text-center formulario" placeholder="Ingrese nombre del vendedor" v-model="filtro">
            <button class="btn btn-outline-success" @click="verVendedores()"><span class="icon-Lupa"></span></button>
        </div>
        <Tabla :vendedores="vendedores"/>
    </div>
</template>
<script>
import Tabla from '@/components/vendedores/TablaVendedores.vue'
import Mensaje from '@/components/Mensaje.vue'
export default {
    data(){
        return{
            vendedores:[],
            mensaje:{ver:false},
            filtro:''
        }
    },
    created(){
        this.verVendedores()
    },
    methods:{
        verVendedores(){
            let filtro = this.filtro
            this.axios.get('vendedores/' + filtro)
            .then(respuesta =>{
                console.log(respuesta)
                this.vendedores = respuesta.data
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