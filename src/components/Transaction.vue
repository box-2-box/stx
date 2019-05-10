<template>
  <tr>
    <td>
      <input
        disabled="disabled"
        v-model="stock.id">
    </td>
    <td>
      <select v-model="stock.action" v-bind:disabled="!isEditMode">
        <option value="0">Select...</option>
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
        v-if="!isEditMode"
        @click="isEditMode = true"
      >Edit</button>
      <button 
        v-if="isEditMode"
        @click="saveRow"
      >Save</button>
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
    stock: Object
  },
  components: {
    'date-picker': DatePicker
  },
  data () {
    return {
      isEditMode: false
    }
  },
  computed: {
    butText () {
      return this.isEditMode ? 'Save' : 'Edit'
    },
    value () {
      let n = this.stock.price * this.stock.shares
      return n.toLocaleString('en', { style: 'currency', currency: 'USD' })
    }
  },
  methods: {
    saveRow () {
      this.isEditMode = false
      this.$emit('save-transaction')
    },
    deleteRow () {
      this.$emit('delete-transaction')
    },
    onUpdateDate (date) {
      this.stock.date = date
    }
  }
}
</script>