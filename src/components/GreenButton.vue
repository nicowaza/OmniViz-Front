<template>
  <div>
    <div class="elevation-24 btn btnGreen textAlign">Everything's ok</div>
  </div>
</template>

<script>
export default {
  name: 'GreenBtn',
};
</script>

<style>
.btn {
  width: 280px;
  height: 280px;
  padding: 0px 25px;
  font-size: 14px;
  text-align: center;
  /* cursor: pointer; */
  outline: none;
  border: none;
  border-radius: 15px;
  /* box-shadow: 0 9px #999; */
  white-space: pre-wrap;
}
.textAlign {
  display: flex; /* contexte sur le parent */
  flex-direction: column; /* direction d'affichage verticale */
  justify-content: center; /* alignement vertical */
}

.btnGreen {
  background-color: green;
}

@media (min-width: 430px) {
  .btn {
    width: 310px;
    height: 310px;
  }
}

@media (min-width: 820px) {
  .btn {
    width: 400px;
    height: 400px;
  }
}
</style>
