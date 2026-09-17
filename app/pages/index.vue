<script setup lang="ts">
    const standings = ["test","test2", "Peepee", "Poopoo"]
</script>

<template>
    <h1>DCES</h1>
    <div class="standings-carousel">
    <UCarousel
        :items="standings"
        :loop="true"
        :autoplay="{ delay: 7000 }"
        :navigation-enabled="false"
        :pagination-enabled="true"
        :active="false"
        class="w-full"
        :ui="{
            item: 'basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
        }"
    >
  <template #default="{ item }">
    <Standings :testname="item" />
  </template>
</UCarousel>
    </div>

    
</template>