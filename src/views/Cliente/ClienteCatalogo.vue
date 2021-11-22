<template>
    <div class="text-center">
        <h3>Catálogo de productos</h3>
        <div class="col-md-6">
            <div class="form-group">
                <label for="select">Seleccione categoria:</label>
                <select id="select" class="form-select form-control" aria-label="Default select example" v-if="categorias.length > 0" v-model="codigoCategoria">
                    <option :value="categoria.codigo" v-for="categoria in categorias" :key="categoria.codigo" class="text-success">{{categoria.descripcion}}</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            categorias:[],
            codigoCategoria: 1
        }
    },
    created(){
        this.verCategorias()
    },
    methods:{
        verCategorias(){
            this.axios.get('categorias')
            .then(respuesta=>{
                console.log(respuesta.data)
                this.categorias = respuesta.data;
            })
        }
    }
}
</script>
