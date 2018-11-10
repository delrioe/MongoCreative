$(document).ready(function() {
    $("#postCard").click(function() {
        var elementTest = $("#element").val();
        var cardBackground = "";
        var elementURL = "";
        if ($("#element").val() === "default") {
            var x = Math.floor((Math.random() * 4) + 1);
            switch (x) {
                case 1:
                    elementTest = "fire";
                    break;
                case 2:
                    elementTest = "water";
                    break;
                case 3:
                    elementTest = "wind";
                    break;
                case 4:
                    elementTest = "earth";
                    break;
            }
        }
        switch (elementTest) {
            case "fire":
                cardBackground = "images/fireBackground.jpeg";
                elementURL = "images/Fire.png";
                break;
            case "earth":
                cardBackground = "images/earthBackground.jpeg";
                elementURL = "images/Earth.png";
                break;
            case "water":
                cardBackground = "images/waterBackground.jpeg";
                elementURL = "images/Water.png";
                break;
            case "wind":
                cardBackground = "images/windBackground.jpeg";
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

                everything += "<div class=\"Avatar\" style=\"background-image: url(" + car.Color + ")\">" + "<img id=\"img_element\" src=\"" + 
                    car.Element + "\">" + "<h2>" + car.Name + "</h2>" + "<img src=\"" + car.URL + "\"" + "</img>" + 
                    "<div id=\"description_box\"" + "<p>" + car.Description + "</p>" + "</div>" + "<br>" + "<p>" + "Attack: " + car.Attack + "Defense: " + car.Defense + "</p>" + "</div>";
            }
            //everything += "</ul>";
            $("#cards").html(everything);
        })
    });


});
