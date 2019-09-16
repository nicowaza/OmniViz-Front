<template>
<div>
   <div class="popUp">
    <slot name="alert"></slot>
  </div>
  <div>
    <slot name="alert-controls"></slot>
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
  border-radius: 5pxa(160, 152, 152, 0.5)
}
.confirmMessage {
  padding-top: 5px;
}
</style>
