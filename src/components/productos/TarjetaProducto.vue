<template>
    <div class="tarjeta">
        <img :src="verFoto(producto.foto)" :alt="producto.codigo" width="100px" height="100px">
        <h6 class="titulo-tarjeta">{{producto.descripcion}}</h6>
        <p>Precio: $ <b>{{producto.precio_unidad}}</b></p>
        <h6 class="titulo-tarjeta">{{empresa.nombre}}</h6>
        <div class="contenedor-pedir row">
            <div class="col-md-6">
                <label for="cantidad" class="titulo-cantidad">Cantidad:</label>
            <input type="number" placeholder="Cantidad" class="input-cantidad" v-model="cantidad" min="1">
            </div>
            <div class="col-md-6">
                <button class="btn btn-success boton" @click="pedirProducto()">Pedir</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props:{
        producto:Object
    },
    data(){
        return{
            empresa: {},
            cantidad: 1
        }
    },
    created(){
        this.verEmpresa()
    },
    methods:{
        ...mapActions(['agregarPedidoPersona']),
        verFoto(nombreFoto){
            return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
        },
        verEmpresa(){
            this.axios.get('vendedores/buscar-empresa/' + this.producto.codigo)
            .then(respuesta=>{
                console.log(respuesta.data)
                this.empresa = respuesta.data;
            })
        },
        pedirProducto(){
            const infoProducto = {
                descripcion: this.producto.descripcion,
                foto: this.producto.foto,
                precio_unidad: this.producto.precio_unidad,
                cantidadComprar: this.cantidad,
                total: this.producto.precio_unidad * this.cantidad
            }
            const pedidoPersona = {
                producto: infoProducto
            }
            this.agregarPedidoPersona(pedidoPersona)
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
        height: 530px;
    }
    img{
        border-radius: 10px;
        width: 100%;
        height: 300px;
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
        margin-top:45px;
    }
    .titulo-cantidad{
        font-size: 20px;
        font-weight: 700;
        margin-right: 10px;
    }
</style>