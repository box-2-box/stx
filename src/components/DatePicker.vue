<template>
  <div class="date-picker">
    <div v-if="visiblePicker" class="date-modal">
      <div class="date-modal-content">
        <div id="selected-date">
          <div id="selected-year">{{ selectedYear }}</div>
          <div id="selected-day">{{ selectedDateString() }}</div>
        </div>
        <div v-if="visibleYear" class="years"> 
          <button
            v-for="(n, index) in 10" 
            v-on:click="selectYear(n + viewYear-5)"
            v-bind:key="index"
            v-bind:value="n + viewYear-5"
            v-bind:class="(n + viewYear-5) == selectedYear ? 'active' : ''"
          >{{ n + viewYear-5 }}</button>
        </div>
        <div v-if="visibleMonth">
          <div class="year-nav">
            <div>
              <button v-on:click="prevYear">&lt;</button>
            </div>
            <div
              class="current-year"
              v-on:click="viewYears">{{ viewYear }}</div>
            <div>
              <button v-on:click="nextYear">&gt;</button>
            </div>
          </div>
          <div class="months">
            <button 
              v-for="(month, index) in months" 
              v-bind:key="index" 
              v-bind:class="index == viewMonth && selectedYear == viewYear ? 'active' : ''"
              v-on:click="selectMonth(index)"
            >{{ month.substring(0,3) }}</button>
          </div>
        </div>
        <div v-if="visibleDate">
          <div class="month-nav">
            <div>
              <button v-on:click="prevMonth">&lt;</button>
            </div>
            <div
              class="current-month"
              v-on:click="viewMonths">{{ months[viewMonth] }} {{ viewYear }}</div>
            <div>  
              <button v-on:click="nextMonth">&gt;</button>
            </div>
          </div>
          <div class="calendar">
            <div class="dow">S</div>
            <div class="dow">M</div>
            <div class="dow">T</div>
            <div class="dow">W</div>
            <div class="dow">T</div>
            <div class="dow">F</div>
            <div class="dow">S</div>
            <div
              v-for="dow in dayOfWeekVisibleMonth"
              v-bind:key="dow.id"
              class="date"
            ></div>
            <div 
              v-for="(day, index) in daysVisibleMonth"
              v-bind:key="index"
              class="date"
              v-bind:class="(selectedDate == index+1 && viewMonth) == selectedMonth ? 'active' : ''"
              v-on:click="pickDate(index+1)"
            >{{ day }}</div>
          </div>
        </div>
        <div class="  date-modal-footer">
          <a href="" v-on:click.prevent="visiblePicker = !visiblePicker">Close</a>
        </div>
      </div>
    </div>
    <button v-on:click="viewPicker" v-bind:disabled="disabled">
        {{ selectedMonth +1 }}/{{ selectedDate }}/{{ selectedYear }}
      </button>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    date: String,
    disabled: Boolean,
  },
  data() {
    return {
      visiblePicker: false,
      visibleDate: true,
      visibleMonth: false,
      visibleYear: false,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
      selectedYear: new Date(this.date).getFullYear(),
      selectedMonth: new Date(this.date).getMonth(),
      selectedDate: new Date(this.date).getDate(),
      daysVisibleMonth: 0,
      dayOfWeekVisibleMonth: 0,
      viewMonth: new Date(this.date).getMonth(),
      viewYear: new Date(this.date).getFullYear()
    }
  },
  methods: {
    viewPicker() {
      this.visiblePicker = !this.visiblePicker
    },
    updateMonth(month) {
      this.viewMonth = month
      this.daysVisibleMonth = this.getSelectedDate()
      this.dayOfWeekVisibleMonth = this.getSelecetdDayOfWeek()
    },
    updateYear() {
      this.daysVisibleMonth = this.getSelectedDate()
      this.dayOfWeekVisibleMonth = this.getSelecetdDayOfWeek()
    },
    getSelectedDate() {
      return new Date(this.viewYear, this.viewMonth+1, 0).getDate()
    },
    getSelecetdDayOfWeek() {
      return new Date(this.viewYear, this.viewMonth, 1).getDay()
    },
    nextMonth() {
      if (this.viewMonth == 11) {
        this.viewMonth = 0
        this.viewYear++
      } else {
        this.viewMonth++
      }
      this.updateMonth(this.viewMonth)
      this.updateYear()
    },
    prevMonth() {
      if (this.viewMonth == 0) {
        this.viewMonth = 11
        this.viewYear--
      } else {
        this.viewMonth--
      }
      this.updateMonth(this.viewMonth)
      this.updateYear()
    },
    viewMonths() {
      this.visibleMonth = true
      this.visibleDate = false
    },
    selectMonth(month) {
      this.viewMonth = month
      this.updateMonth(this.viewMonth)
      this.visibleMonth = false
      this.visibleDate = true
    },
    nextYear() {
      this.updateYear(++this.viewYear)
    },
    prevYear() {
      this.updateYear(--this.viewYear)
    },
    viewYears() {
      this.visibleMonth = false
      this.visibleYear = true
    },
    selectYear(year){
      this.viewYear = year
      this.visibleMonth = true
      this.visibleYear = false
    },
    pickDate(date) {
      this.selectedMonth = this.viewMonth
      this.selectedYear = this.viewYear
      this.selectedDate = date  
      this.visiblePicker = !this.visiblePicker

      this.$emit('update-date', `${ this.selectedMonth +1 }/${ this.selectedDate }/${ this.selectedYear }`)
    },
    selectedDateString() {
      let d = new Date(this.selectedYear, this.selectedMonth, this.selectedDate) 
      let options = {weekday: 'short', month: 'short', day: 'numeric'}
      return d.toLocaleDateString('en-US', options)
    }
  },
  created() {

    if (this.date.length == 0) {
      let now = new Date(Date.now())
      this.selectedYear = this.viewYear = now.getFullYear()
      this.selectedMonth = this.viewMonth = now.getMonth()
      this.selectedDate = now.getDate()

      this.$emit('update-date', `${ this.selectedMonth +1 }/${ this.selectedDate }/${ this.selectedYear }`)
    }

    this.daysVisibleMonth = this.getSelectedDate()
    this.dayOfWeekVisibleMonth = this.getSelecetdDayOfWeek()
  }
}
</script>

<style>
.date-picker {
  font-size: 14px;
  font-family: sans-serif;
}
.date-modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.date-modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 240px;
}
.date-modal-footer {
  padding: 10px 0 0;
  border-top: solid 1px #ddd;
  margin-top: 10px;
}
.date-modal-footer a {
  color: #0000dd;
}
.active {
  background-color: #0000dd;
  color: #fff;
}
.calendar {
  display: inline-grid;
  grid-template-columns: repeat(7, 30px);
  grid-template-rows: auto;
  grid-gap: 5px;
}
.date, .dow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}
.dow {
  font-size: .9em;
  color: #888
}
.date.active {
  border-radius: 50%;
}
.date:hover {
  background-color:#eee;
  border-radius: 50%;
  cursor: pointer;
}

.month-nav, .year-nav {
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  margin: 20px 0;
}
.month-nav div, .year-nav div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.current-month:hover, .current-year:hover {
  cursor: pointer;
  color: #0000dd;
}
.months button {
  width: calc(33% - 22px);
  display: inline-block;
  margin: 5px 10px;
  padding: 10px 2px;
  border: none;
  cursor: pointer;
  font-size: 1em;
}
.months button:hover {
  background-color: #ddd;
}
.years button {
  padding: 10px;
  display: block;
  cursor: pointer;
  width: 100%;  
  background-color: #fff;
  border: solid 1px #ccc;
  border-bottom-width: 0;
}
.years button:last-child {
  border-bottom-width: 1px;
}
.years button:hover {
  background-color: #ddd;
  color: #0000dd;
}
.years button.active {
  background-color: #0000dd;
  color: #fff;
}
#selected-date {
  background-color: #0000dd;
  color: #fff;
  padding: 10px;
}
#selected-day {
  font-size: 2em;
}
</style>