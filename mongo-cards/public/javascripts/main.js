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
  staehu9tor0r,9299393939ooo
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
     // var everything = "<ul>";
      var everything ="";
      for (var card in data) {
        var car = data[card];
        everything += "<div class=\"Avatar\">" + "<h2>" + car.Name + "</h2>" + "<img src=\"" + car.URL + "\"" + 
            "</img>" + "<p>" + car.Description + "</p>" + "Element: " + car.Element + "Attack: " + car.Attack + "Defense: " + car.Defense + "</div>";
      }
      //everything += "</ul>";
      $("#cards").html(everything);
    })
  });

  
});