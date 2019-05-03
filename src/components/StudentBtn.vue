<template>
<div fill-height>
  <!-- <v-layout align-center justify-center> -->
    <div class="btnContainer">
      <div class="btnRow1">
        <v-btn id="btnGreen" round light class="button btnGreen"><span class="text-wrap">GOT IT</span></v-btn>
        <v-btn id="btnRed" class="button btnRed"><span class="text-wrap">NOT UNDERSTOOD</span></v-btn>
      </div>
      <div class="btnRow2">
        <v-btn id="btnBlue" class="button btnBlue"><span class="text-wrap">MORE INFO</span></v-btn>
        <v-btn id="btnYellow" class="button btnYellow"><span class="text-wrap">INTERESTING</span></v-btn>
      </div>
    </div>
  <!-- </v-layout> -->
  <!-- <div id="container1"> -->

    <!-- </div> -->
</div>

</template>

<script>
export default {
  name: 'StudentBtn',
  props: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .btnRow1 {
    // display: inline-block;
  }
  .btnRow2 {
    // display: inline-block;
  }

  .btnContainer {
    border: 1px solid red;
    display: inline-block;
    text-align: center;
    min-width: 350px;
  }
  .text-wrap{
  white-space: normal;
  }
  #btnGreen {
    color: rgb(51, 255, 0);
    background-color: green;
  }
.btnGreen {
  color: rgb(51, 255, 0);
  background-color: green;
}
  #btnRed {
    background-color: red;
  }
.btnRed {
  color: #fff;
  background-color: red;
}
  #btnBlue {
    background-color: blue;
  }
.btnBlue {
  color: #fff;
  background-color: Blue;
}
  #btnYellow {
    background-color: yellow;
  }
.btnYellow {
  color: rgb(195, 182, 0);
  background-color: yellow;
}
// .btnGreen:hover {
//   background-color: #3e8e41
//   }
// .btnGreen:active {
//   background-color: #3e8e41;
// }

.button {
  width: 150px;
  height: 150px;
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

@media (min-width: 450px) {
  .button {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 900px) {
  .button {
    width: 250px;
    height: 250px;
  }
}


// .button:active {

//   box-shadow: 0 5px #666;
//   transform: translateY(4px);
// }
// </style>
