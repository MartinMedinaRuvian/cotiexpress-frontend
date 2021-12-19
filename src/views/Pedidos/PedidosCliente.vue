<template>
    <div>
       <div v-if="pedidosPersona.length > 0">
            <div class="col-md-12" v-for="pedido in pedidosPersona" :key="pedido.index">
                <TarjetaPedidoCliente :pedido="pedido" @calcularTotalPedido="calcularTotalPedido()"/>
            </div>
            <div class="col-md-12 total">
                <h3>Total: $ <span class="total-pedido" @click="calcularTotalPedido()">{{total}}</span></h3>
            </div>
            <div class="col-md-12 comprar">
                <button class="btn btn-success">Comprar</button>
            </div>
       </div>
       <div v-else class="text-center">
           <h3>No tienes pedidos, te invitamos a que realices el primero 😊</h3>
           <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/catalogo" class="btn btn-success mt-3">Ver Catálogo</router-link>
       </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import TarjetaPedidoCliente from '@/components/pedidos/TarjetaPedido.vue'
export default {
    data(){
        return{
            total:0
        }
    },
    created(){
        this.calcularTotalPedido()
    },
    computed:{
        ...mapGetters(['pedidosPersona'])
    },
    components:{
        TarjetaPedidoCliente
    },
    methods:{
        calcularTotalPedido(){
            let total = 0;
            let pedidos = this.pedidosPersona;
            for(let pedido of pedidos){
                total += pedido.producto.total
            }
            this.total = total
        }
    }
}
</script>
<style scoped>
    .total{
        margin-top: 40px;
        text-align: right;
    }
    .comprar{
        margin-top: 10px;
        text-align: right;
    }
    .total-pedido{
        font-weight: 700;
    }
</style>