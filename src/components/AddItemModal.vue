<script setup>
import { ref } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  onSave: {
    type: Function,
    required: true,
  },
})

const form = ref({
  nama: '',
  pengeluaran: '',
  tanggal: '',
  jam: '',
});

function onClickSubmit() {
  form.value.tanggal = new Date().toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const jamRaw = new Date().toLocaleString('id-ID', { hour: 'numeric', minute: 'numeric' }).split('.');
  form.value.jam = jamRaw[0].concat(':', jamRaw[1]);

  console.log(form.value)
  props.onSave(form.value);
}
</script>

<template>
  <div v-if="show" class="modal" @click.stop="$emit('close')">
    <div @click="e => e.stopPropagation()" class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Tambah Entri</h3>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="nama">Nama</label>
          <input type="text" class="form-control" id="nama" v-model="form.nama" placeholder="Nama">
        </div>
        <div class="form-group">
          <label for="pengeluaran">Harga</label>
          <input type="number" class="form-control" id="pengeluaran" v-model="form.pengeluaran"
            placeholder="Pengeluaran">
        </div>
      </div>
      <div class="modal-footer">
        <Button type="button" color="grey" @click="$emit('close')">BATAL</Button>
        <Button type="button" @click="onClickSubmit">KIRIM</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>


.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 1rem;
  min-width: 275px;
  border: 1px solid #888;
  max-width: 500px;
  border-radius: 2px;
}

.modal-header {
  margin-bottom: 0.5rem;
}

.modal-title {
  font-weight: bold;
}

.form-group {
  margin-bottom: 0.5rem;
}

.form-group label {
  display: block;
}
.form-group input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid lightgray;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  column-gap: 0.5rem;
  margin-top: 1rem;
}
</style>