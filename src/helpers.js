export default {
  toCurrency (value) {
    return value.toLocaleString('en', { style: 'currency', currency: 'USD' })
  }
}
