<template>
    <div class="text-center">
        <div v-if="usuario.estado === '1'">
            <h3>Catálogo de productos</h3>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="select">Seleccione categoria:</label>
                        <select @change="verProductos()" id="select" class="form-select form-control" aria-label="Default select example" v-if="categorias.length > 0" v-model="codigoCategoria">
                            <option :value="categoria.codigo" v-for="categoria in categorias" :key="categoria.codigo" class="text-success">{{categoria.descripcion}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="txtbuscar">Buscar:</label>
                    <input id="txtbuscar" type="text" class="form-control" placeholder="Ingrese descripción del producto" v-model="descripcion" @keypress.enter="verProductos()">
                </div>
            </div>
        <div class="row" v-if="productos.length > 0">
            <div class="col-md-6" v-for="producto in productos" :key="producto.index">
                <TarjetaProducto :producto="producto"/>
            </div>
        </div>
        <div v-else class="mt-5">
            <h4>No se encontraron productos con la categoría seleccionada 😔</h4>
        </div>
        </div>
        <div v-else>
            <h3>Su cuenta se encuentra desactivada. Pongase en contacto con el Admin</h3>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import TarjetaProducto from '@/components/productos/TarjetaProducto'
export default {
    data(){
        return{
            categorias:[],
            codigoCategoria: 1,
            productos:[],
            descripcion:'',
            empresa:{}
        }
    },
    created(){
        this.verCategorias()
        this.verProductos()
    },
    computed:{
        ...mapGetters(['usuario'])
    },
    methods:{
        verCategorias(){
            this.axios.get('categorias')
            .then(respuesta=>{
                console.log(respuesta.data)
                this.categorias = respuesta.data;
            })
        },
        verProductos(){
            const descripcion = {descripcion: this.descripcion}
            this.axios.post('productos/filtro-categoria/' + this.codigoCategoria, descripcion)
            .then(respuesta=>{
                this.productos = respuesta.data;
                this.verEmpresa()
            })
        },
        verEmpresa(){
            const productos = this.productos;
            const productosEmpresa = []
            for(let producto of productos){
                this.axios.get('vendedores/buscar-empresa/' + producto.codigo)
                .then(respuesta=>{
                    console.log(respuesta.data, 'RESPUESTA EMPRESA')
                    producto.empresa = respuesta.data
                    productosEmpresa.push(producto)
                })
            }
            this.productos = productosEmpresa
            console.warn(this.productos, 'PRODUCTOS')
        }
    },
    components:{
        TarjetaProducto
    }
}
</script>
