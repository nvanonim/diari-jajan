<script setup>
import { onMounted, ref } from 'vue';
import Button from './components/Button.vue';
import DailyCart from './components/DailyCart.vue';
import { getAllItems } from './services/items.js';
import { convertToRp, months } from './services/utils';

const today = ref(new Date());
const totalThisMonth = ref(0);
const itemList = ref([]);

onMounted(() => {
  getItemList();
})

const getItemList = async () => {
  try {
    const res = await getAllItems();
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const items = await res.json()
    const groupedItems = items.reduce((group, item) => {
      const tanggalArr = item.tanggal.split(' ');
      const tanggal = tanggalArr[2] + '-' + (months.indexOf(tanggalArr[1].toLowerCase()) + 1) + '-' + tanggalArr[0];
      if (months.indexOf(tanggalArr[1].toLowerCase()) + 1 === today.value.getMonth() + 1) {
        // Add Total Amount this month
        totalThisMonth.value += item.pengeluaran;

        // Add to group
        const tanggalObj = new Date(tanggal)

        group[tanggalObj] = group[tanggalObj] ?? []
        group[tanggalObj] = [...group[tanggalObj], item]
      }
      return group
    }, {})
    console.log(groupedItems)

    itemList.value = groupedItems;
  } catch (error) {
    alert(error + '\n' + "Please run the json-server first and try again")
  }
}

function clicked() { console.log("asdasd") }
</script>

<template>
  <header class="info-head">
    <h2>Diari Jajan {{ today.toLocaleString('id-ID', { month: 'long', year: 'numeric' }) }}</h2>
    <div class="info-sum">Pengeluaran Bulan Ini {{ convertToRp(totalThisMonth) }}</div>
    <Button type="button" @click="clicked">
      TAMBAH ITEM
    </Button>
  </header>

  <main>
    <div class="cart-list">
      <template v-for="(item, key) in itemList">
        <DailyCart :date="new Date(key)" :cart="item"
          :total="item.reduce((prev, curr) => prev + curr.pengeluaran, 0)" />
        <DailyCart :date="new Date(key)" :cart="item"
          :total="item.reduce((prev, curr) => prev + curr.pengeluaran, 0)" />
      </template>
    </div>
  </main>
</template>

<style scoped>
  .info-head {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .info-head h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: -0.3rem;
  }
  .info-sum {
    margin-bottom: 0.5rem;
  }
  .cart-list {
    display: flex;
    flex-wrap: wrap;
    /* gap: 1rem; */
  }

  @media (max-width: 1024px) {
    .cart-list {
      justify-content: center;
    }
  }
</style>
