$(document).ready(function() {
  $("#postCard").click(function() {
    var myobj = { Name: $("#name").val(), URL: $("#picture").val(), Description: $("#description").val(), Element: $("#element").val(), Attack: $("#attack").val(), Defense: $("#defense").val() };
    
    jobj = JSON.stringify(myobj);
    $("#json").html(jobj);
    var url = "card";
    $.ajax({
      url: url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    })
  });
  /*
  $("#deleteComments").click(function() {
    $.ajax({
      url: 'comment',
      type: "DELETE",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    })
    //get rid of everything in the comments div too
    $("#comments").html("");
  });
*/
$("#getCards").click(function() {
  var url = 'card?q=' + $('#query').val();
    $.getJSON(url, function(data) {
      console.log(data);
      var everything = "<ul>";
      var everything ="";
      for (var card in data) {
        var car = data[card];
        everything += "<li> Name: " + com.Name + " -- URL: " + com.URL + "Description: " + com.Description + "Element: " + com.Element + "Attack: " + com.Attack + "Defense: " + com.Defense + "</li>";
      }
      everything += "</ul>";
      $("#cards").html(everything);
    })
  });

  
});