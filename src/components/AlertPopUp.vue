<template>
  <div class="popUp">
    <slot name="username"></slot>
    <slot name="message"></slot>
    <v-btn>Close</v-btn>
  </div>
</template>

<script>


export default {
  name: 'alert-popup',
};


</script>

<style>
.popUp {
  position: absolute;
  top: 35%;
  left: 17%;
  background-color: rgba(169, 169, 169);
  height: 150px;
  width: 200px;
  text-align: center;
}
</style>
