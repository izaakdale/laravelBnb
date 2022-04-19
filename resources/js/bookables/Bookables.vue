<template>
    <div>
        <div v-if="loading">
            loading...
        </div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row' + row">
                <div class="col" 
                v-for="(bookable, column) in bookeablesInRow(row)" 
                :key="'row' + row + column">
                    <bookable-list-item
                    :item-title="bookable.title"
                    :item-content="bookable.content"
                    :price="1000"
                    ></bookable-list-item>
                </div>
                <div class="col" v-for="p in placeholdersInRow(row)" :key="'placeholder' + row + p"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem.vue";
export default {
  components: {
    BookableListItem,
  },
  data() {
    return {
      bookables: null,
      loading: false,
      columns: 3,
    };
  },
  computed: {
      rows() {
          return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns);
      }
  },
  methods: {
      bookeablesInRow(row){
          return this.bookables.slice((row-1) * this.columns, row*this.columns)
      },
      placeholdersInRow(row){
          return this.columns - this.bookeablesInRow(row).length;
      }
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.bookables = [
        {
          title: "Goodbyeee",
          content: "World",
        },
        {
          title: "Hellooo",
          content: "Mars",
        },
        {
          title: "Goodbyeee",
          content: "World",
        },
        {
          title: "Goodbyeee",
          content: "World",
        },
        {
          title: "Goodbyeee",
          content: "World",
        },
        {
          title: "Goodbyeee",
          content: "World",
        },
        {
          title: "Hellooo",
          content: "Mars",
        }
      ];
    this.loading = false;
    }, 1000);
  },
};
</script>