<template>
    <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
  <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span class="text-dark">Coti</span><span class="color-verde-principal">Express</span></router-link>   
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="icon-Menu"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      
      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/" class="text-dark">Inicio</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/nosotros" class="text-dark">Acerca de nosotros</router-link>
      </li>
  
       <li class="nav-item ml-4">
        <router-link id="btn-ingresar-salir" data-toggle="collapse" data-target=".navbar-collapse.show" to="/pre-registro" class="btn btn-outline-success btn-sm btn-registro">Registrate</router-link> 
       </li>

      <li class="nav-item ml-4">
        <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/inicio-sesion" class="color-verde-principal">Iniciar sesión</router-link>
      </li>

    </ul>
  </div>
</nav>
</template>