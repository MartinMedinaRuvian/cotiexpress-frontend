<template>
    <div class="text-center">
        <div v-if="vendedor === undefined">
            <h5>Debes seleccionar un vendedor en el catálogo de productos.</h5>
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/catalogo" class="btn btn-success mt-3">Ver Catálogo</router-link>
        </div>
        <div v-else>
            <h3 class="mb-4">Productos de {{vendedor.nombre}}</h3>
            <div class="row">
                <div class="col-md-6" v-for="producto in productos" :key="producto.index">
                    <TarjetaProductoVendedor :producto="producto"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TarjetaProductoVendedor from '@/components/productos/TarjetaProductoVendedor'
export default {
    components:{
        TarjetaProductoVendedor
    },
    props:{
        vendedor:{}
    },
    data() {
        return {
            productos: []
        }
    },
    created(){
        this.verProductos()
    },
    methods:{
        verProductos(){
            if(this.vendedor !== undefined){
                console.log(this.vendedor.codigo, 'CODIGO')
                this.axios.get('productos/filtro-empresa/' + this.vendedor.codigo)
                .then(respuesta=>{
                    console.log(respuesta.data, 'PRODUCTOS  FILTRADOS POR VENDEDOR')
                    this.productos = respuesta.data;
                })
            }
        },
    }
}
</script>