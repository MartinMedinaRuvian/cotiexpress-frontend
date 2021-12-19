<template>
    <div class="text-center">
        <div v-if="usuario.estado === '1'">
                        <!-- Button trigger modal -->
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalGuardarProducto">
                Guardar un nuevo producto
            </button>

            <!-- Modal -->
            <div class="modal fade" id="modalGuardarProducto" tabindex="-1" role="dialog" aria-labelledby="modalGuardarProducto" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title" id="exampleModalLongTitle">Guardar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
            <form @submit.prevent>
            <div class="form group">
                <label for="descripcion">Descripción:</label>
                <input type="text" placeholder="Descripción" v-model="producto.descripcion" class="form-control">
            </div>

            <div class="form group row mt-3">
                <div class="col-md-6">
                    <label for="descripcion">Cantidad:</label>
                    <input type="text" placeholder="Cantidad" v-model="producto.cantidad" class="form-control">
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="precioUnidad">Precio Unidad:</label>
                            <input type="text" placeholder="Precio unidad" v-model="producto.precioUnidad" class="form-control">
                    </div>
                </div>
            </div>


            <div class="form-group mt-4">
                <h5>Fotografía producto:</h5>
                <div class="row">
                    <div class="col-md-12 col-lg-12">
                        <input type="file" class="form-control" name="file" id="file" @change="verImagen" accept="image/*" required>
                        <input @click="subirArchivo()" type="button" value="Seleccionar" class="form-control btn btn-success mt-3" v-if="urlImg === ''">                      
                    </div>
                    <div class="col-md-12 col-lg-12 mt-3">
                        <h5>Imagen seleccionada:</h5>
                        <img  alt="imagen" id="imagenPrevisualizacion" width="200px" height="200px" :src="urlSinFoto">   
                        <button class="btn btn-danger form-control" @click="eliminarImagen()" v-if="urlImg !==''">Eliminar</button>  
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="form-group">
                        <label for="select">Seleccione categoria:</label>
                        <select id="select" class="form-select form-control" aria-label="Default select example" v-if="categorias.length > 0" v-model="producto.codigoCategoria">
                            <option :value="categoria.codigo" v-for="categoria in categorias" :key="categoria.codigo">{{categoria.descripcion}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">Cancelar</button>
                </div>
                <div class="col-md-6">
                    <input type="button" class="btn btn-success form-control" value="Guardar" @click="guardarProducto()">
                </div>
            </div>
             </form>
            </div>
            </div>
        </div>
        </div>
        <h2 class="mt-5" v-if="productos.length > 0">Mis productos</h2>
        <TablaProductos :productos="productos" />
        </div>
        <div v-if="usuario.estado === '2'">
            <h3>Su cuenta se encuentra desactivada. Pongase en contacto con el Admin</h3>
        </div>
        
    </div>
</template>
<script>
import TablaProductos from '@/components/productos/TablaProducto'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            urlImg:'',
            nombreImagen:'',
            producto:{codigoCategoria:1},
            categorias:[],
            productos:[],
            urlSinFoto: this.axios.defaults.baseURL + '/imagenes/sin-foto.png',
            vendedorProducto: {}
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
        subirArchivo(){
            var formData = new FormData();
            var imagefile = document.querySelector('#file');
            formData.append("file", imagefile.files[0]);
            this.axios.post('subir', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((respuesta)=>{
                console.log(respuesta)
                this.nombreImagen = respuesta.data.filename;
                this.traerImagenBack(respuesta.data.filename);
            })
        },
        verImagen(){           
            const $seleccionArchivos = document.querySelector("#file"),
            $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
         
            // Los archivos seleccionados, pueden ser muchos o uno
            const archivos = $seleccionArchivos.files;
            // Si no hay archivos salimos de la función y quitamos la imagen
            if (!archivos || !archivos.length) {
                $imagenPrevisualizacion.src = this.axios.defaults.baseURL + '/imagenes/sin-foto.png';
                return;
            }
            // Ahora tomamos el primer archivo, el cual vamos a previsualizar
            const primerArchivo = archivos[0];
            // Lo convertimos a un objeto de tipo objectURL
            const objectURL = URL.createObjectURL(primerArchivo);
            // Y a la fuente de la imagen le ponemos el objectURL
            $imagenPrevisualizacion.src = objectURL;
        },
        traerImagenBack(path){
            this.urlImg = this.axios.defaults.baseURL + '/imagenes/' + path;
        },
        eliminarImagen(){
            this.axios.delete('subir/' + this.nombreImagen)
            .then(respuesta=>{
                console.log(respuesta)
                this.urlImg = '';
                const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
                const $seleccionArchivos = document.querySelector("#file");
                console.log($seleccionArchivos)
                $imagenPrevisualizacion.src = this.axios.defaults.baseURL + '/imagenes/sin-foto.png';
                $seleccionArchivos.value = '';

            })
            .catch(error=>console.log(error))
        },
        verCategorias(){
            this.axios.get('categorias')
            .then(respuesta=>{
                console.log(respuesta.data)
                this.categorias = respuesta.data;
            })
        },
        guardarProducto(){
            if(this.urlImg !== ''){
                this.producto.foto = this.nombreImagen;
                console.log(this.producto, 'PRODUCTO GUARDAR')
                this.axios.post('productos', this.producto)
                .then(respuesta =>{
                    console.log(respuesta)
                    this.guardarVendedorProducto(respuesta.data.codigo)
                })
            }else{
                alert('Seleccione una foto')
            }
        },
        verProductos(){
            this.axios.get('productos/filtro-vendedor/' + this.usuario.codigo_vendedor)
            .then(respuesta=>{
                console.log(respuesta.data, 'PRODUCTOS  FILTRADOS POR VENDEDOR')
                this.productos = respuesta.data;
            })
        },
        guardarVendedorProducto(codigoProductoGuardado){
            this.vendedorProducto.codigoVendedor = JSON.parse(localStorage.getItem('usuario')).codigo_vendedor
            this.vendedorProducto.codigoProducto = codigoProductoGuardado
            this.axios.post('vendedor-producto', this.vendedorProducto)
            .then(respuesta =>{
                this.guardarVendedorProducto(respuesta.data.codigo)
                window.location = '/productos'
            })
        }
    },
    components:{
        TablaProductos
    }
}
</script>