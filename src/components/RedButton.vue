<template>
  <div>
    <div class="button btnRed">I DON'T GET IT</div>
  </div>
</template>

<script>
export default {
  name: 'RedBtn',
};
</script>

<style>
.button {
  width: 125px;
  height: 125px;
  padding: 0px 25px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
  white-space: pre-wrap;
}
.btnRed {
  background-color: red;
}

@media (min-width: 430px) {
  .button {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 970px) {
  .button {
    width: 250px;
    height: 250px;
  }
}
</style>
