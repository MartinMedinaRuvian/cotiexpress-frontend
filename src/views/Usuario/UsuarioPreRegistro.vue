<template>
    <div class="text-center">
        <h1><span>Coti</span><span class="color-verde-principal">Express</span></h1>
        <div class="row">
            <div class="col-lg-6 col-md-6 mt-5">   
                <div class="card">
                    <div class="card-header">
                        <img src="../../assets/usuarioVendedor.svg" alt="" class="img-fluid"> <br>      
                    </div>
                    <div class="card-body">
                         <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/vendedor-registro" class="btn btn-success mt-2">Soy Vendedor</router-link>
                    </div>
                </div>
               
            </div>
            <div class="col-lg-6 col-md-6 mt-5"> 
                <div class="card">
                    <div class="card-header">
                        <img src="../../assets/usuarioCliente2.svg" alt="" class="img-fluid"> <br>  
                    </div>
                    <div class="card-body">
                        <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/cliente-registro" class="btn btn-success mt-2">Soy Cliente</router-link>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    .card-header > img{
        width: 300px;
        height: 300px;
    }
</style>