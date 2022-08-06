<script setup>
import { convertToRp } from '../services/utils.js';

const props = defineProps({
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  cart: {
    type: Array,
    required: true,
    default: [],
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <p>{{ props.date.toLocaleString('id-ID', { day: 'numeric', month: 'long' }) }}</p>
    </div>
    <div class="card-body">
      <template v-for="item in props.cart">
        <hr class="card-liner" />
        <div div class="card-body-text">
          <div>{{ item.jam }}</div>
          <div class="card-body-text-middle">{{ item.nama }}</div>
          <div>{{ convertToRp(item.pengeluaran) }}</div>
        </div>
      </template>
    </div>
    <hr class="card-liner-dark" />
    <div class="card-footer">
      <div class="card-footer-label">Total</div>
      <div class="card-footer-value">{{ convertToRp(props.total) }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  /* flex: 0 0 23%; */
  margin: 1%;
  width: calc(25% - 2%);
  max-width: 320px;
  min-height: 280px;
}

.card-header p {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.card-body-text {
  font-size: 15px;
  display: flex;
  align-items: center;
  padding: 0.25rem 0rem 0.25rem 0.4rem;
  width: 100%;
}

.card-body-text-middle {
  flex: 1;
  margin: 0 0.75rem;
}

.card-liner {
  border-top: 1px solid rgb(222, 222, 222);
}

.card-liner-dark {
  border-top: 1px solid rgb(122, 122, 122);
}

.card-footer {
  display: flex;
  margin-top: 0.25rem;
}
.card-footer-label {
  flex: 1;
  font-weight: bold;
  text-align: right;
  margin-right: 2rem;
}
.card-footer-value {
  font-weight: bold;
}

@media (max-width: 1024px) {
  .card {
    margin: 1.25%;
    width: calc(33% - 2.5%);
  }
}

@media (max-width: 768px) {
  .card {
    margin: 1.5%;
    width: calc(50% - 3%);
  }
}

@media (max-width: 480px) {
  .card {
    margin: 2%;
    width: calc(100% - 4%);
  }
}
</style>