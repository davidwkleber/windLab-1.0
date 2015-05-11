

$(document).ready(function() {
	
	    $("#topFrameBody").click(function(event){
			var target = event.target;
			console.log("got into main "+target.id);
			console.log(target.name);

			switch(target.id) {
				case "tourFrame":
							console.log("got into tourFrame");	
					window.parent.$("#rightFrame").empty();
					window.parent.$("#rightFrame").load("./rightFrame/tourFrameContent/index.html");
					break;
				case "powerCurveGraph":
					console.log("got into powerGraph");
					window.parent.$("#rightFrame").empty();
					window.parent.$("#rightFrame").load("./rightFrame/graphs/powerCurveGraph.html");
					break;
				case "timeDomainGraph":
					console.log("got into timeGraph");
					window.parent.$("#rightFrame").empty();
					window.parent.$("#rightFrame").load("./rightFrame/graphs/lineGraph.html");
				//	window.parent.$("#rightFrame").load("record.html");

				break;
				default :
					console.log("id is: "+target.id);
					break;
			}
	
		})

	})