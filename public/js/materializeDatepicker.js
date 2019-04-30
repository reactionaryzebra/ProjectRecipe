let dateOptions = {
  minDate: new Date()
}
const datepickers = document.querySelectorAll('.datepicker');
const datepickerInstances = M.Datepicker.init(datepickers, dateOptions);