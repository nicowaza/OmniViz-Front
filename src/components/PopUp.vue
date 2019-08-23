<template>
  <div style="position: absolute; width: 100vw; height: 100vh; background:rgba(160, 152, 152, 0.5); left: 0; bottom: 0; z-index: 10">
    <div class="popUp">
      <div class="confirmMessage">
        <slot name="confirmMessage"></slot>
      </div>
      <div class="alert-controls">
        <slot name="alert-controls"></slot>
      </div>
    </div>
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(246, 246, 223);
  height: 100px;
  width: 220px;
  text-align: center;
  color: black;
  -webkit-box-shadow: 0px 0px 20px 0px #202520;
  -moz-box-shadow:    0px 0px 20px 0px #202520;
  box-shadow: 0px 0px 20px 0px #202520;
  border-radius: 4px;
  /* background-color: rgba(160, 152, 152, 0.5) */
}
.confirmMessage {
  padding-top: 5px;
}
</style>
