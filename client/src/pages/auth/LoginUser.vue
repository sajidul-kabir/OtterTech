<template>
  <div>
    <form>
      <input type="text" name="username" id="username" placeholder="username" />
      <input type="password" name="password" id="pass" placeholder="password" />
      <button>Login</button>
    </form>
    <p><router-link to="/register">Register</router-link> instead</p>
  </div>
</template>
