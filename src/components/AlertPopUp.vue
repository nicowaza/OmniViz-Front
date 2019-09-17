<template>
  <div>
    <div class="popUp">
      <slot style= "margin: 15px auto;" name="alert"></slot>
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
  top: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  background-color: rgba(36, 148, 54, 0.972);
   -webkit-box-shadow: 3px 4px 7px #202520;
   -moz-box-shadow:    3px 4px 7px #202520;
   box-shadow:         3px 4px 7px #202520;
  height: 50px;
  width: 300px;
  text-align: center;
  border-radius: 5px
}
</style>
