<template>
    <div class="tarjeta">
        <img :src="verFoto(producto.foto)" :alt="producto.codigo" width="100px" height="100px">
        <h6 class="titulo-tarjeta">{{producto.descripcion}}</h6>
        <p class="precio">Precio: $ <b>{{producto.precio_unidad}}</b></p>    
        <div class="contenedor-pedir row">
            <div class="col-md-6">
                <label for="cantidad" class="titulo-cantidad">Cantidad:</label>
            <input type="number" placeholder="Cantidad" class="input-cantidad" v-model="cantidad" min="1" :max="producto.cantidad" :disabled="pedidosPersona.indexOf(pedidosPersona.find(pedido => pedido.producto.descripcion === producto.descripcion)) >= 0">
            <span><p>{{producto.cantidad}} UND disponibles.</p></span>
            </div>
            <div class="col-md-6">
                <button class="btn btn-success boton" @click="pedirProducto()" disabled>Pedir</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    props:{
        producto:Object
    },
    data(){
        return{
            cantidad: 1
        }
    },
    computed:{
        ...mapGetters(['pedidosPersona'])
    },
    methods:{
        ...mapActions(['agregarPedidoPersona']),
        verFoto(nombreFoto){
            return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
        },
        pedirProducto(){
            const infoProducto = {
                descripcion: this.producto.descripcion,
                foto: this.producto.foto,
                precio_unidad: this.producto.precio_unidad,
                cantidadComprar: this.cantidad,
                stock: this.producto.cantidad,
                total: this.producto.precio_unidad * this.cantidad,
                empresa: this.producto.empresa
            }
            const pedidoPersona = {
                producto: infoProducto
            }
            this.agregarPedidoPersona(pedidoPersona)
        },
        verCatalogoVendedor(vendedor){
            this.$router.push({ name: 'ProductosPorVendedor', params: { vendedor }})
        }
    }
}
</script>
<style scoped>
    .tarjeta{
        border-radius: 10px;
        padding: 10px;
        margin-top: 10px;
        border: 0.90px solid #00A82D;;
        height: 520px;
    }
    img{
        border-radius: 10px;
        width: 100%;
        height: 300px;
    }
    .titulo-tarjeta{
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
        font-weight: 700;
        color: #00A82D;
        margin-bottom: 25px;
    }
    .titulo-empresa{
        font-size: 17px;
        margin-top: 10px;
        text-align: left;
        font-weight: 700;
        color: #00A82D;;
    }
    .titulo-empresa:hover {
        color: blue;
        cursor: pointer !important;
    }
    .precio {
        font-size: 20px;
    }
    p{
        text-align: left;
    }
    .boton{
        width: 200px;
    }
    .input-cantidad{
        width: 110px;
        font-size: 20px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .contenedor-pedir{
        margin-top:30px;
    }
    .titulo-cantidad{
        font-size: 20px;
        font-weight: 700;
        margin-right: 10px;
    }
</style>