<template>
    <div class="text-center container-inicio-sesion">
        <Mensaje :mensaje="mensaje"/>
        <h1><span>Coti</span><span class="color-verde-principal">Express</span></h1>
        <p class="mt-4">Iniciar sesión</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="iniciarSesion()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Usuario" class="form-control" v-model="usuario.username">
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
       <div class="footer-formulario mt-3">
            <p>¿No tiene una cuenta?</p>
        <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/pre-registro" class="color-verde-principal link-crear-cuenta">Crear cuenta</router-link>
       </div>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje'
import { mapActions } from 'vuex'
export default {
    data() {
       return{
           usuario:{},
           usuarioIngresado:{},
           mensaje:{ver:false}
       }
    },
    methods:{
        ...mapActions(['guardarUsuario', 'guardarInfo', 'cerrarSesion']),
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        iniciarSesion(){
            this.axios.post('usuarios/inicioSesion', this.usuario)
            .then((respuesta)=>{
                if(respuesta.status === 200){                    
                    this.usuarioIngresado = respuesta.data;
                    if(this.usuarioIngresado.tipo == 1){
                        this.guardarInfoCliente();
                    }else{
                        this.guardarInfoVendedor();
                    }
                }
            })
            .catch((error) => {
              this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        guardarInfoVendedor(){
            this.axios.get('vendedores/' + this.usuarioIngresado.codigo)
            .then(respuesta =>{
                if(respuesta.status === 200){
                  this.usuarioIngresado.codigo_cliente = null,
                  this.usuarioIngresado.codigo_vendedor = respuesta.data.codigo;
                  this.usuarioIngresado.codigo_empresa = respuesta.data.codigo_empresa;
                  this.usuarioIngresado.estado = respuesta.data.estado;
                  this.guardarUsuario(this.usuarioIngresado);                
                  this.$router.push({ name: 'Productos'})
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        guardarInfoCliente(){
            this.axios.get('clientes/' + this.usuarioIngresado.codigo)
            .then(respuesta =>{
                if(respuesta.status === 200){
                  this.usuarioIngresado.codigo_vendedor = null;
                  this.usuarioIngresado.codigo_cliente = respuesta.data.codigo;
                  this.usuarioIngresado.estado = respuesta.data.estado;
                  this.guardarUsuario(this.usuarioIngresado);
                  this.$router.push({ name: 'Catalogo'})
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
    },
    components:{
        Mensaje
    }
}
</script>