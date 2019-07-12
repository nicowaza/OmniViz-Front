<template>
  <v-container>
    <form action=""
      autocomplete="off"
      >
      <v-text-field
      label="email"
      placeholder="Email"
      :value="loginEmail"
      @input="setLoginEmail"
      ></v-text-field>

      <v-text-field
      label="Password"
      placeholder="Password"
      type="password"
      autocomplete="new-password"
      :value="loginPassword"
      @input="setLoginPassword"
      ></v-text-field>
    </form>

    <v-btn color="green" dark @click="login">
      <v-icon class="mr-2">fingerprint</v-icon>
      Login
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'CreateClass',
};
</script>

<style>

</style>
