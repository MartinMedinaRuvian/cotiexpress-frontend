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
        </div>
        <div v-if="usuario.estado === '2'">
            <h3>Su cuenta se encuentra desactivada. Pongase en contacto con el Admin</h3>
        </div>
        <div class="row">
            <div class="col-md-6" v-for="producto in productos" :key="producto.index">
                <TarjetaProducto :producto="producto"/>
            </div>
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
            descripcion:''
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
            })
        }
    },
    components:{
        TarjetaProducto
    }
}
</script>
