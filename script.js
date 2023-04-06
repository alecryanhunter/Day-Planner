$(document).ready($(function () {

  // This trims the whitespace, but still allows whitespace to be entered, as a
  // delete function.
  $(".saveBtn").on("click",function(){
    var hourIndex = $(this).parent()[0].id;
    var eventsText = $(this).siblings("textarea")[0].value.trim();
    localStorage.setItem(hourIndex,eventsText);
  })
  
  // Coerces the current time into a number for arithmetic purposes
  var currentHour = Number(dayjs().format("HH"));
  var hourSlots = $(".container-lg").children()
  for (i=0;i<hourSlots.length;i++) {
    var hourId = hourSlots[i].id
    var hour = Number(hourId.slice(hourId.search("-")+1))
    if (currentHour<=hour) {
      if (hour===currentHour) {
        $(hourSlots[i]).addClass("present")
      } else {
        $(hourSlots[i]).addClass("future")
      }
    } else {
      $(hourSlots[i]).addClass("past")
    }
  }

  // This function loops over the time blocks on the page and replaces whatever
  // text is there with the text from Local Storage.
  for (i=0;i<hourSlots.length;i++) {
    var stored = localStorage.getItem(hourSlots[i].id)
    $("#"+hourSlots[i].id).children("textarea").val(stored);
  }
  
  // Displays the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D"))
}));