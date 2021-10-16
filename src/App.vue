<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <LayoutHeader :tabs="[]" app-name="alis_ Component Library" />
    <v-main>
      <!-- bottom padding 48px because of fixed footer -->
      <v-container class="pt-6 pb-12">
        <LibraryContainer />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import LayoutHeader from './layout/LayoutHeader';
import LibraryContainer from './views/LibraryContainer';

export default
{
  name: 'App',
  components:
  {
    LayoutHeader,
    LibraryContainer,
  },
};
</script>
