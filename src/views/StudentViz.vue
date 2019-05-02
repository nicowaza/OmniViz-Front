<template>
  <div>
    <v-layout row>
      <!-- <v-flex class="hidden-xs-only">
        <Panel/>
      </v-flex> -->
      <!-- <v-flex xs12 md6> -->
        <v-container fill-height>
          <v-layout align-center justify-center>
            <v-flex>
              <studentBtn/>
            </v-flex>

          </v-layout>
        </v-container>
      <!-- </v-flex> -->
      <!-- <v-flex  class="hidden-xs-only">
        <Panel/>
      </v-flex> -->
    </v-layout>
  </div>
</template>

<script>

// import Header from '../components/Header.vue';
import StudentBtn from '../components/StudentBtn.vue';
import Panel from '../components/Panel.vue';

export default {
  components: {
    StudentBtn,
    Panel,
  },
  name: 'studentViz',
};
</script>

<style>

</style>
