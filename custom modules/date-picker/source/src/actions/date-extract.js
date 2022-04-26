if (event.type === 'datePicker') {
  event.state.temp.startDate = event.payload.startDate
  event.state.temp.endDate = event.payload.endDate
}
