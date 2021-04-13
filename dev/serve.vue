<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TestlibSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  TestlibSample,
  // }
});
</script>

<template>
  <div id="app">
    <HelloWorld msg="in serve" />
    <testlib-sample />
  </div>
</template>
