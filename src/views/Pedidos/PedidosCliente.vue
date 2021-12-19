<template>
    <div>
       <div v-if="pedidosPersona.length > 0">
            <div class="col-md-12" v-for="pedido in pedidosPersona" :key="pedido.index">
                <TarjetaPedidoCliente :pedido="pedido" @calcularTotalPedido="calcularTotalPedido()" @esElMismoVendedor="esElMismoVendedor()" @cotizar="cotizar()"/>
            </div>
            <div class="col-md-12 total">
                <h3>Total: $ <span class="total-pedido" @click="calcularTotalPedido()">{{total}}</span></h3>
            </div>
            <div class="col-md-12 comprar">
                <button class="btn btn-success">Comprar</button>
            </div>
            <div class="col-md-12 comprar">
                <a :href="urlWhatsapp" target="_blank" class="btn btn-primary" :disabled="!elMismoVendedor">{{!elMismoVendedor ? 'Solo se puede cotizar cuando los productos son de un mismo vendedor' : 'Cotizar Productos'}}</a>
            </div>
       </div>
       <div v-else class="text-center">
           <h3>No tienes pedidos, te invitamos a que realices el primero 😊</h3>
           <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/catalogo" class="btn btn-success mt-3">Ver Catálogo</router-link>
       </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import TarjetaPedidoCliente from '@/components/pedidos/TarjetaPedido.vue'
export default {
    data(){
        return{
            total:0,
            elMismoVendedor: false,
            urlWhatsapp: ''
        }
    },
    created(){
        this.calcularTotalPedido()
        this.esElMismoVendedor()
        this.cotizar()
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
        },
        esElMismoVendedor(){
            const primerPedido = this.pedidosPersona[0];
            const pedidos = this.pedidosPersona
            for(let pedido of pedidos){
                if(primerPedido.producto.empresa.nombre !== pedido.producto.empresa.nombre){
                    this.elMismoVendedor = false;
                    break;
                }else{
                    this.elMismoVendedor = true;
                }
            }
        },
        cotizar(){
            const telefonoEmpresa = this.pedidosPersona[0].producto.empresa.telefono
            const pedidos = this.pedidosPersona
            let mensaje = 'Para cotizar los siguientes productos: '
            for(let pedido of pedidos){
                mensaje += pedido.producto.cantidadComprar + ' ' + pedido.producto.descripcion + ' con precio de $ ' + pedido.producto.precio_unidad + '. '
            } 
            this.urlWhatsapp = "https://api.whatsapp.com/send?phone=+57" + telefonoEmpresa + "&text=" + mensaje;
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