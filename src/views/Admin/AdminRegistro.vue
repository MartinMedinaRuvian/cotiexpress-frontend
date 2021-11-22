<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <h1><span>So</span><span class="color-verde-principal">Mar</span></h1>
    <p>Registro como Admin</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="guardarUsuario()" class="">
        <div class="form-group">
            <input
            type="password"
            placeholder="Contraseña Super Admin"
            class="form-control"
            v-model="passwordSuperAdmin"
            />
        </div>
        <div class="form-group row mb-3">
            <input
            type="text"
            placeholder="Usuario"
            class="form-control col-md-6"
            v-model="usuario.username"
            />
            <input
            type="password"
            placeholder="Contraseña"
            class="form-control col-md-6"
            v-model="usuario.password"
            />
          </div>         
          <div class="form-group">
            <button class="btn btn-success">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    <div class="footer-formulario mt-3">
      <p>¿Ya tienes una cuenta?</p>
      <router-link
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
        to="/"
        class="color-verde-principal link-crear-cuenta"
        >Iniciar sesión</router-link
      >
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/Mensaje";
export default {
  data() {
    return {
      mensaje: { ver: false },
      usuario: {},
      passwordSuperAdmin: '',
      passwordSuperAdminEstablecida: 'si2021.'
    };
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    guardarUsuario() {
        if(this.passwordSuperAdmin === this.passwordSuperAdminEstablecida){
            this.usuario.tipo = '3';
            this.axios.post("usuarios", this.usuario)
            .then((respuesta) => {
            if (respuesta.status === 200) {
                this.$router.push({ name: "InicioSesion" });
            }
            })
            .catch((error) => {
            this.crearMensaje(error.response.data.mensaje, "danger");
            });
        }else{
            this.crearMensaje('Contraseña de super Admin incorrecta', "danger");
        }
    },
  },
  components: {
    Mensaje,
  },
};
</script>