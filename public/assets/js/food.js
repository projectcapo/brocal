$(document).ready(function () {

  // Function to handle getting data for form fields.
  function getFood() {
    $.get('/api/food', function (data) {
      $('#foodname').val(data.foodname);
      $('#foodtype').val(data.foodtype);
      $('#mealcategory').val(data.mealcategory);
      $('#servings').val(data.servings);
      $('#calories').val(data.calories);
      $('#consumedtime').val(data.consumedtime);

      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {
        setDefaultDate: true,
        defaultDate: new Date(data.goal_end_date)
      });
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
      M.updateTextFields();
    });
  }

  // Function to handle the update event when update is clicked.
  function updateFood(event) {

    $.ajax('/api/food', {
      type: 'POST',
      data: {
        foodname: $('#foodname').val().trim(),
        foodtype: $('#foodtype').val().trim(),
        mealcategory: $('#mealcat').val().trim(),
        servings: $('#servings').val().trim(),
        calories: $('#calories').val().trim(),
        consumedtime: $('#consumedtime').val().trim()
      }
    }).then(function () {
      // Run on Page Load to prepopulate the data.
      //getFood(); 
      M.toast({ html: "Food entry has been updated" });
    });
  }

  // Create / Update
  $("#submit").on("click", function (event) {
      event.preventDefault();
      updateFood();
      location.href = "/view/food";
    
    // Logs to console
    console.log("Click Triggered");
    
  });


});