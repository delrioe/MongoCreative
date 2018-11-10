$(document).ready(function() {
  $("#postCard").click(function() {
    var myobj = { Name: $("#name").val(), URL: $("#picture").val(), Description: $("#description").val(), Element: $("#element").val(), Attack: $("#attack").val(), Defense: $("#defense").val() };
    
    jobj = JSON.stringify(myobj);
    $("#json").html(jobj);
    var url = "comment";
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

$("#getComments").click(function() {
  var url = 'comment?q=' + $('#query').val();
    $.getJSON(url, function(data) {
      console.log(data);
      //var everything = "<ul>";
      var everything ="";
      for (var comment in data) {
        com = data[comment];
        //everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
        everything += "<div class=\"card bg-dark text-white\"> <div class=\"card-body\"> Name: " + com.Name + " -- Comment: " + com.Comment + "</div> </div>";
      }
      everything += "<br>";
      $("#comments").html(everything);
    })
  });
  */
  
});