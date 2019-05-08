<template>
  <tr>
    <td>
      <select v-model="stock.action" v-bind:disabled="!isEditMode">
        <option value="">Select...</option>
        <option value="1">Buy</option>
        <option value="2">Sell</option>
      </select>  
    </td>
    <td>
      <date-picker 
        v-bind:date="stock.date"
        v-bind:disabled="!isEditMode"
        v-on:update-date="onUpdateDate" />
    </td>
    <td>
      <input 
        v-model="stock.symbol" 
        v-bind:disabled="!isEditMode"
        type="text">
    </td>
    <td>
      <input 
        v-model="stock.price"
        v-bind:disabled="!isEditMode"
        type="text">
    </td>
    <td>
      <input  
        v-model="stock.shares" 
        v-bind:disabled="!isEditMode"
        type="text">
    </td>
    <td>{{ value }}</td>
    <td>
      <button 
        v-on:click="isEditMode = !isEditMode"
      >{{butText}}</button>
    </td>
    <td>
      <button 
        @click="deleteRow"
      >Delete</button>
    </td>
  </tr>
</template>

<script>
  import DatePicker from './DatePicker.vue'

  export default {
    name: 'stx-row',
    props: {
      stock: Object,
    },
    components: {
      'date-picker': DatePicker,
    },
    data() {
      return {
        isEditMode: false
      }
    },
    computed: {
      butText() {
        return this.isEditMode ? 'Done' : 'Edit'
      },
      value() { 
        let n = this.stock.price * this.stock.shares
        return n.toLocaleString('en', { style: 'currency', currency: 'USD' })
      }
    },  
    methods: {
      saveRow() {
        this.isEditMode = false
      },
      deleteRow() {
        this.$emit('delete-row')
      },
      onUpdateDate(date) {
        this.stock.date = date
      }
    }
  }
  
</script>