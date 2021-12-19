<template>
    <div class="tarjeta">
        <div class="row">
            <div class="col-md-12">
                <h6 class="titulo-tarjeta">{{pedido.producto.descripcion}}</h6>
                <h6>De: {{pedido.producto.empresa.nombre}}</h6>
            </div>
            <div class="col-md-12">
                <img :src="verFoto(pedido.producto.foto)" :alt="pedido.producto.codigo" width="100px" height="100px">
            </div>
        </div>
        <div class="form-group">
            <label for="cantidad">Cantidad a comprar:</label>
            <h2>{{cantidad}}</h2>
        </div>
        <div class="form-group ml-5 mt-3">
            <label for="precio-unidad">Precio unidad:</label>
            <p id="precio-unidad" class="precio-unidad">$ <b>{{pedido.producto.precio_unidad}}</b></p>
        </div>
        <div class="form-group ml-5 mt-3">
            <label for="precio-unidad">Precio total:</label>
            <p id="precio-unidad" class="precio-unidad">$ <b>{{this.pedido.producto.total}}</b></p>
        </div>
        <button class="btn btn-danger ml-5" @click="eliminarPedido()">X</button>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props:{
        pedido:Object,
    },
    data(){
        return{
            cantidad: this.pedido.producto.cantidadComprar,
            precioUnidad: this.pedido.producto.precio_unidad
        }
    },
    methods:{
        ...mapActions(['agregarPedidoPersona', 'eliminarPedidoPersona']),
        verFoto(nombreFoto){
            return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
        },
        calcularPrecioTotal(){
        console.log(this.precioUnidad, 'Precio und')
           this.pedido.producto.total = this.cantidad * this.precioUnidad
        },
        eliminarPedido(){
            this.eliminarPedidoPersona(this.pedido)
            this.$emit("calcularTotalPedido");
            this.$emit("esElMismoVendedor");
            this.$emit("cotizar");
        }
    }
}
</script>
<style scoped>
    .tarjeta{
        align-content: center;
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        border-radius: 10px;
        padding: 10px;
        margin-top: 10px;
        border: 0.90px solid #00A82D;;
        height: 295px;
    }
    img{
        border-radius: 10px;
        width: 150px;
        height: 150px;
    }
    .titulo-tarjeta{
        width: 200px;
        font-size: 20px;
        margin-top: 10px;
        text-align: left;
        font-weight: 700;
        color: #00A82D;;
    }
    p{
        text-align: left;
    }
    .precio-unidad{
        font-size: 25px;
    }
</style>