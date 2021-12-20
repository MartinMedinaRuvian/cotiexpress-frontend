<template>
    <div class="text-center">
        <h3>Pago</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="iniciarSesion()" class="formulario">
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
export default {
    
}
</script>