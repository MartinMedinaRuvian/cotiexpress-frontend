<template>
    <div>
        <div class="col-md-12" v-for="pedido in pedidosPersona" :key="pedido.index">
            <TarjetaPedidoCliente :pedido="pedido"/>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import TarjetaPedidoCliente from '@/components/pedidos/TarjetaPedido.vue'
export default {
    computed:{
        ...mapGetters(['pedidosPersona'])
    },
    components:{
        TarjetaPedidoCliente
    }
}
</script>