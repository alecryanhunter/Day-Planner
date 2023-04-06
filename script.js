// This function holds all the scripting for the page and waits until the page
// has loaded to execute any of it.
$(document).ready($(function () {

  // When clicking on any save button, it pulls the value of sibling textarea
  // via DOM traversal, trims the whitespace and stores it in Local Storage.
  // It uses the id on the parent div as the storage key.
  $(".saveBtn").on("click",function(){
    var hourIndex = $(this).parent()[0].id;
    var eventsText = $(this).siblings("textarea")[0].value.trim();
    localStorage.setItem(hourIndex,eventsText);
  })
  
  // Takes the current time and formats it into 24 hour output
  var currentHour = Number(dayjs().format("HH"));
  // Creates an array of the time slots
  var hourSlots = $(".container-lg").children();
  for (i=0;i<hourSlots.length;i++) {
    // Get the id of the current time slot the loop is on
    var hourId = hourSlots[i].id;
    // Turns that id into a number. Want both hour and currentHour to be numbers
    // so arithmetic functions properly
    var hour = Number(hourId.slice(hourId.search("-")+1));
    // This checks the id of the time slot against the currentHour, determining
    // whether it is in present, future, or past.
    if (currentHour<=hour) {
      if (hour===currentHour) {
        $(hourSlots[i]).addClass("present")
      } else {
        $(hourSlots[i]).addClass("future")
      }
    } else {
      $(hourSlots[i]).addClass("past")
    }
    
    // This section of the for loop pulls the stored values from Local Storage
    // and puts them in their relevant text areas.
    var stored = localStorage.getItem(hourId)
    $("#"+hourId).children("textarea").val(stored);
  }
  
  // Displays the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D"))
}));