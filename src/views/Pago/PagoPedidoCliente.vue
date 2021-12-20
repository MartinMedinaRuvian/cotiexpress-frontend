<template>
    <div class="text-center">
        <h3>Pago</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="guardarPedido()" class="formulario">
                    <div class="form-group mt-4">
                        <label for="" class="col-md-12">Seleccione metodo de pago:</label>
                            <select class="form-select form-control col-md-12" aria-label="Default select example">
                            <option value="1" selected>Tarjeta de debito </option>
                            <option value="2">Tarjeta de credito</option>
                            <option value="3">Efectivo (Efecty-Baloto)</option> 
                            </select>
                    </div>         
                    <div class="form-group mt-3">
                        <input type="text" placeholder="Número de tarjeta" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Nombre del titular" class="form-control">
                    </div>
                    <div class="form-group row">
                        <input type="text" placeholder="Fecha de vencimiento (MM / AA)" class="form-control col-md-6">
                        <input type="password" placeholder="Código de seguridad" class="form-control col-md-6">
                    </div>
                    <div class="form-group mt-5 row">
                        <button type="submit" class="btn btn-success col-md-6">Aceptar</button>
                        <img src="../../assets/tarjetas.svg" alt="foto-tarjetas" width="200px" height="30px">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data(){
        return {
            pedido: {}
        }
    },
    computed:{
        ...mapGetters(['pedidosPersona'])
    },
    methods:{
        ...mapActions(['eliminarTodosLosPedidos']),
        guardarPedido (){
            const pedidos = this.pedidosPersona;
            if(pedidos.length > 0){
                for(let pedido of pedidos){
                    let pedidoGuardar={
                        cantidad: pedido.producto.cantidadComprar,
                        precioUnidad: pedido.producto.precio_unidad
                    }
                    console.log(pedidoGuardar, 'PEDIDO GUARDAR')
                    this.axios.post('pedido', pedidoGuardar)
                    .then(respuesta =>{
                        console.log(respuesta, 'RESPUESTA PEDIDP')
                        let codigoPedido = respuesta.data.codigo
                        let cantidadGuardar = pedido.producto.stock - pedido.producto.cantidadComprar
                        this.guardarPedidoVendedor(codigoPedido, pedido.producto.empresa.codigo, pedido.producto.codigo, pedido.producto.total, cantidadGuardar)
                    })
                    pedidoGuardar = {}
                }
            }
        },
        guardarPedidoCliente (codigoPedido, totalCompra, codigoPedidoProducto, codigoPedidoVendedor, codigoProducto, cantidadGuardar){
            const codigoCliente = JSON.parse(localStorage.getItem('usuario')).codigo_cliente
            const pedidoClienteGuardar = {
                codigoPedido: codigoPedido,
                codigoCliente: codigoCliente
            }
            console.log(pedidoClienteGuardar, 'PEDIDO CLIENTE GUARDAR')
            this.axios.post('pedido-cliente', pedidoClienteGuardar)
            .then(respuesta =>{
                console.log(respuesta, 'RESPUESTA PEDIDO CLIE')
                this.guardarFactura(totalCompra, codigoPedidoProducto, codigoPedidoVendedor, respuesta.data.codigo, codigoProducto, cantidadGuardar)
            })
        },
        guardarPedidoVendedor (codigoPedido, codigoEmpresa, codigoProducto, totalCompra, cantidadGuardar){
            const pedidoVendedorGuardar = {
                codigoPedido: codigoPedido,
                codigoEmpresa: codigoEmpresa
            }
            console.log(pedidoVendedorGuardar, 'PEDIDO VENDEDOR GUARDAR')
            this.axios.post('pedido-vendedor', pedidoVendedorGuardar)
            .then(respuesta =>{
                console.log(respuesta, 'RESPUESA VENDE')
                this.guardarPedidoProducto(codigoPedido, codigoProducto, totalCompra, respuesta.data.codigo, cantidadGuardar)
            })
        },
        guardarPedidoProducto (codigoPedido, codigoProducto, totalCompra, codigoPedidoVendedor, cantidadGuardar){
            const pedidoProductoGuardar = {
                codigoPedido: codigoPedido,
                codigoProducto: codigoProducto
            }
            this.axios.post('pedido-producto', pedidoProductoGuardar)
            .then(respuesta =>{
                console.log(respuesta, 'RESPUESTA PRODUC')
                this.guardarPedidoCliente(codigoPedido, totalCompra, respuesta.data.codigo, codigoPedidoVendedor, codigoProducto, cantidadGuardar);
            })
        },
        guardarFactura (totalCompra, codigoPedidoPedidoProducto, codigoPedidoVendedor, codigoPedidoCliente, codigoProducto, cantidadGuardar){
            const facturaGuardar = {
                total: totalCompra,
                codigoPedidoProducto: codigoPedidoPedidoProducto,
                codigoPedidoVendedor: codigoPedidoVendedor,
                codigoPedidoCliente: codigoPedidoCliente
            }
            this.axios.post('factura', facturaGuardar)
            .then(respuesta =>{
                console.log(respuesta, 'RESPUESTA factura')
                this.actualizarProducto(codigoProducto, cantidadGuardar)
                this.eliminarTodosLosPedidos()
                this.$router.push({ name: 'Catalogo'})
            })
        },
        actualizarProducto(codigoProducto, cantidadGuardar){
            const productoGuardar = {
                cantidad: cantidadGuardar
            }
            this.axios.put('productos/' + codigoProducto, productoGuardar)
            .then(respuesta=>{
               console.log(respuesta)
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    }
}
</script>