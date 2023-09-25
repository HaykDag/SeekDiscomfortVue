<template>
  <div class="notFound-cnt">
    <h1>NOT FOUND</h1>
    <h2>404</h2>
    <router-link :to="{ name: 'home' }" class="notFound-link">
      <span class="notFound-link">Go Home</span>
    </router-link>
  </div>
</template>

<style>
.notFound-cnt {
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.notFound-link {
  text-decoration: none;
  font-weight: bold;
  color: teal;
}
</style>
