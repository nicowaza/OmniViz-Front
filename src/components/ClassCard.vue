<template>
<div>
  <v-card
      class="elevation-24"
      v-bind:class="{ visible: isOpen }"
    >
      <v-img
        height="80px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      <div style="display: flex; justify-content: space-between;">
        <v-card-title style="color: white; font-size: 15px; text-transform: uppercase"><slot name="title"></slot></slot></v-card-title>
        <v-btn id="btnRound" @click="toogleOpening(index)"><v-icon>swap_vertical_circle</v-icon></v-btn>
      </div>

      </v-img>
      <v-layout style="margin-top: 15px">
        <v-flex>
          <h3 style="padding: 15px"><slot name="teacher"></slot></h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-flex style="align-self: center; padding-right: 15px;">
          <v-avatar
            size="56px"
          >
            <img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              alt="Avatar"
            >
          </v-avatar>
        </v-flex>
      </v-layout>
      <h3 style="padding-left: 15px; margin: 20px 0 10px;"><slot name="day"></slot></h3>
      <div style="display: flex; margin: 10px 0; ">
        <div style="padding-left: 15px"><slot name="startClass"></slot></div>
        <div style="padding-left: 15px"><slot name="endClass"></slot>
        </div>
      </div>
      <h3 style="padding-left: 15px;"><slot name="subject"></slot></h3>
      <p style="height: 60px; width: 210px; overflow: auto; padding: 5px 15px 15px 15px; margin-bottom: 0;"
      ><slot name="description"></p>
      <v-layout justify-space-around>
        <div><slot name="join"></slot></div>
        <div><slot name="timeline"></slot></div>
        <v-btn ><slot name="edit"></slot></v-btn>
      </v-layout>
    </v-card>
</div>

</template>

<script>
export default {
  name: 'classCard',
};

</script>

<style>
  .v-card {
    width: 200px;
    height: auto;
    padding: 5px;
    margin: 15px;
    background-color:#a592a4;
    border-radius: 10px;
  };

</style>
