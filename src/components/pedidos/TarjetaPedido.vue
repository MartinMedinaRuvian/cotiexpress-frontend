<template>
    <div class="tarjeta">
        <div class="row">
            <div class="col-md-12">
                <h6 class="titulo-tarjeta">{{pedido.producto.descripcion}}</h6>
            </div>
            <div class="col-md-12">
                <img :src="verFoto(pedido.producto.foto)" :alt="pedido.producto.codigo" width="100px" height="100px">
            </div>
        </div>
        <div class="form-group">
            <label for="cantidad">Ingrese cantidad a comprar:</label>
            <input id="cantidad" type="number" class="form-control" placeholder="cantidad" min="1" v-model="cantidad" @change="calcularPrecioTotal()">
        </div>
        <div class="form-group ml-5 mt-3">
            <label for="precio-unidad">Precio unidad:</label>
            <p id="precio-unidad" class="precio-unidad">$ <b>{{pedido.producto.precio_unidad}}</b></p>
        </div>
        <div class="form-group ml-5 mt-3">
            <label for="precio-unidad">Precio total:</label>
            <p id="precio-unidad" class="precio-unidad">$ <b>{{precioTotal}}</b></p>
        </div>
        <button class="btn btn-danger ml-5" @click="eliminarPedido()">X</button>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    props:{
        pedido:Object,
    },
    data(){
        return{
            cantidad: 1,
            precioUnidad: this.pedido.producto.precio_unidad,
            precioTotal: this.pedido.producto.precio_unidad,
        }
    },
    methods:{
        ...mapActions(['agregarPedidoPersona', 'eliminarPedidoPersona']),
        verFoto(nombreFoto){
            return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
        },
        calcularPrecioTotal(){
        console.log(this.precioUnidad, 'Precio und')
           this.precioTotal = this.cantidad * this.precioUnidad
        },
        eliminarPedido(){
            this.eliminarPedidoPersona(this.pedido)
        },
    }
}
</script>
<style scoped>
    .tarjeta{
        align-content: center;
        align-items: center;
        display: flex;
        border-radius: 10px;
        padding: 10px;
        margin-top: 10px;
        border: 0.90px solid #00A82D;;
        height: 220px;
    }
    img{
        border-radius: 10px;
        width: 150px;
        height: 150px;
    }
    .titulo-tarjeta{
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