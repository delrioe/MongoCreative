$(document).ready(function() {
    $("#postCard").click(function() {
        //var elementTest = $("#element").val();
        var e = document.getElementById("element");
        var elementTest = e.options[e.selectedIndex].value;
        console.log(elementTest);
        var cardBackground = "";
        var elementURL = "";

        switch ($("#element").val()) {
            case "fire":
                cardBackground = "#ba6b66";
                elementURL = "images/Fire.png";
                break;
            case "earth":
                cardBackground = "#da8550";
                elementURL = "images/Earth.png";
                break;
            case "water":
                cardBackground = "#6196ed";
                elementURL = "images/Water.png";
                break;
            case "wind":
                cardBackground = "#c1c0bf";
                elementURL = "images/Wind.png";
                break;
        }
        console.log(cardBackground + "------" + elementURL);
        var myobj = { Name: $("#name").val(), URL: $("#picture").val(), Description: $("#description").val(), Element: elementURL, Attack: $("#attack").val(), Defense: $("#defense").val(), Color: cardBackground };

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
    
  $("#deleteCards").click(function() {
    $.ajax({
      url: 'card',
      type: "DELETE",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    })
    //get rid of everything in the comments div too
    $("#cards").html("");
  });

    $("#getCards").click(function() {
        var url = 'card?q=' + $('#query').val();
        $.getJSON(url, function(data) {
            console.log(data);
            // var everything = "<ul>";
            var everything = "";
            for (var card in data) {
                var car = data[card];
                console.log(card.Color);

                everything += "<div class=\"Avatar\" style=\"background-color:" + car.Color + "\">" + "<img id=\"img_element\" src=\"" + 
                    car.Element + "\">" + "<h2>" + car.Name + "</h2>" + "<img src=\"" + car.URL + "\"" + "</img>" + 
                    "<div id=\"description_box\"" + "<p>" + car.Description + "</p>" + "</div>" + "<br>" + "<p>" + "Attack: " + car.Attack + "Defense: " + car.Defense + "</p>" + "</div>";
            }
            //everything += "</ul>";
            $("#cards").html(everything);
        })
    });


});
