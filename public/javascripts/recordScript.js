



		var recordDataItem;
		var recordedData;
		var recordsocket;
		var recordDataFlag = false;
			recordedData = [];
		var recordSelection = "off";
			
			var recordsocket = io.connect('http://127.0.0.1:1337');

			recordsocket.on('connect', function (data) {
				//	console.log('record client connected ');
				//	console.log('record connected data ' + data);
			
				jQuery(function ($) {
					recordsocket.on('updateData', function (data) {
						// console.log('record update raw: ' + data);
						if( recordDataFlag) {
							recordDataItem = JSON.parse(data);
						// 	console.log('record updateData.power  ' + recordDataItem.power);
							recordedData.push(data);
						}
					});	
			
				});
			});	
		function recordFunction() {
	//		console.log('start recording');
			$('#recordButton').css('background-color','#f47121');
			recordDataFlag = true;
		}
		function stopRecordFunction() {
		//	console.log('stop recording');
			recordDataFlag = false;
					console.log('record button in stopRecordFunction  is: '+$(".recordButtons-checkbox:checked").val());

			 $(".recordButtons-checkbox").prop("checked", "on")

			$('#recordButton').css('background-color','#e8e8e8');
			// recordsocket.disconnect();
		}
		
		function saveDataFunction() {
					console.log('record button in saveDataFunction is: '+$(".recordButtons-checkbox:checked").val());

			if ( recordDataFlag === true ) {
					stopRecordFunction()
			}
	//		console.log('save data');
	//		console.log('recorded data saved: '+recordedData);
			
		//	recordDataFlag = false;

			// $('#recordButton').css('background-color','#e8e8e8');
						
			// var json = JSON.stringify(recordedData);
			var json = recordedData;
		//	var blob = new Blob([json], {type: "application/json"});
			
			var tsv = JSON2TSV("["+json+"]");
			var blob = new Blob([tsv], {type: "application/csv"});
	
			var url = URL.createObjectURL(blob);
			
			var a = document.createElement('a');
			a.id = "saveDataLinkPlace";
			var date = new Date();
			var fileName = "data."+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+"."+date.getMinutes()+".tsv";
			a.download = fileName;
			a.href = url;
			a.textContent = "Download data as JSON";
			
			saveAs(blob,fileName);
	/*
			
			var parent = document.getElementById("saveDataDiv");
			var linkPlace = document.getElementById("saveDataLinkPlace");
			var linkStuff = document.createElement("p");
			linkStuff.appendChild(a);
			linkStuff.id = "saveDataLinkPlace";
			parent.replaceChild(linkStuff,linkPlace);
			
			*/
			recordedData = []

		}
		
				$( ".recordButtons-checkbox" ).on( "click", function() {

		//	console.log("INIT on click");
				recordSelection = $(".recordButtons-checkbox:checked").val();
			//	console.log("init on? "+PAinitSelection);
				if (recordSelection != "on") {
					console.log("Record ON");
					recordFunction()
		
				} else {
					console.log("Record OFF");
		//						 console.log('record button is: '+$(".recordButtons-checkbox:checked").val());

					if ( recordDataFlag === true ) {
						stopRecordFunction()
						// saveDataFunction()
					}
				}
		 });

