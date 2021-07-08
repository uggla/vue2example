<template>
  <div class="container">
    <div class="hello">
      <h1>
        {{ msg }}
      </h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br />
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
          >vue-cli documentation</a
        >.
      </p>
      <b-table :data="data">
        <b-table-column field="id" label="ID" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column field="name" label="Name" numeric v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="url" label="Url" numeric v-slot="props">
          <a :href="props.row.url">{{ props.row.url }}</a>
        </b-table-column>
        <b-table-column
          field="image.medium"
          label="Image"
          numeric
          v-slot="props"
        >
          <a :href="props.row.image.original"
            ><img :src="props.row.image.medium"
          /></a>
        </b-table-column>
      </b-table>
      <img :src="pokemon.image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import seriesService from "@/services/series.service";
import pokemonService from "@/services/pokemon.service";
import PokemonData from "@/services/pokemon.service";

declare module "vue/types/vue" {
  interface Vue {
    data: Array<unknown>;
    pokemon: typeof PokemonData;
  }
}

@Component({
  mounted() {
    const pokemon_name = "pikachu";
    seriesService
      .getSeries()
      .then((response) => (this.data = response.map((item) => item.show)));

    pokemonService.fetchPokemon(pokemon_name).then((pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;
    });
  },
  data() {
    return {
      data: [],
      pokemon: PokemonData,
    };
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
