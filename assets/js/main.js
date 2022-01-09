		var flyFrom = "";
		var flyTo = "";
		var dateFrom = "01/12/2021";
		var dateTo = "01/03/2022";
		var nights_in_dst_from = 5;
		var nights_in_dst_to = 5;
		var flight_type = "round";
		var limit = 5;
		var sort = "price";

		var places = [
			"africa",
			"asia",
			"europe",
			"north-america",
			"oceania"
		];

		var messageArr = [];
		// var bookButtonArr = [];
		var dealsObj = document.getElementById('deals');
		// var bookButtonObj = document.getElementById('bookButtons');
		var api_key = config.API_KEY;

		function searchDeals() {
			dealsObj.innerHTML = '';
			messageArr = [];

			nights_in_dst_from = document.getElementById("daysOfStay").value;
			nights_in_dst_to = document.getElementById("daysOfStay").value;

			if (document.getElementById("departures").value == 'Nederland') {
				flyFrom = "AMS,RTM,EIN";
			} else {
				flyFrom = document.getElementById("departures").value;
			}

			if(document.getElementById("arrivals").value == 'worldwide') {
				findFlightsWorldwide(flyFrom, nights_in_dst_from, nights_in_dst_to);
			} else {
				flyTo = document.getElementById("arrivals").value;
				findFlightsContinent(flyFrom, flyTo, nights_in_dst_from, nights_in_dst_to);
			}
		};

		function findFlightsWorldwide(flyFrom, nights_in_dst_from, nights_in_dst_to) {
			for (x in places) {
				flyTo = places[x];

				var kiwi_url = "https://tequila-api.kiwi.com/v2/search?fly_from="+flyFrom+"&fly_to="+flyTo+"&dateFrom="+dateFrom+"&dateTo="+dateTo+"&nights_in_dst_from="+nights_in_dst_from+"&nights_in_dst_to="+nights_in_dst_to+"&flight_type="+flight_type+"&sort="+sort+"&limit="+limit;

				$.ajax({
					url: kiwi_url,
					datatype: 'json',
					headers: {
						apikey: api_key
					}
				}).done(function(reply){
					var flights = reply["data"];
					console.log(flights);
					for (y in flights) {
						var flight = flights[y];
						var message = "Van " + flight["cityFrom"] + " naar " + flight["cityTo"] + " voor <b>€" + flight["price"] + "</b>." + "<a href='" + flight["deep_link"] + "' target='_blank'><button class='bookButton'>Book</button></a>";
						messageArr.push(message);
						// var bookButtonMessage = "<a href='" + flight["deep_link"] + "' target='_blank'><button class='bookButton'>Book</button></a>";
						// bookButtonArr.push(bookButtonMessage);
					}
					dealsObj.innerHTML = messageArr.join('</br>');
					// bookButtonObj.innerHTML = bookButtonArr.join('</br');
				});
			}
		}

		function findFlightsContinent(flyFrom, flyTo, nights_in_dst_from, nights_in_dst_to) {
			// for (x in places) {
			// 	flyTo = places[x];

				var kiwi_url = "https://tequila-api.kiwi.com/v2/search?fly_from="+flyFrom+"&fly_to="+flyTo+"&dateFrom="+dateFrom+"&dateTo="+dateTo+"&nights_in_dst_from="+nights_in_dst_from+"&nights_in_dst_to="+nights_in_dst_to+"&flight_type="+flight_type+"&sort="+sort+"&limit="+limit;

				$.ajax({
					url: kiwi_url,
					datatype: 'json',
					headers: {
						apikey: api_key
					}
				}).done(function(reply){
					var flights = reply["data"];
					console.log(flights);
					for (y in flights) {
						var flight = flights[y];
						var message = "Van " + flight["cityFrom"] + " naar " + flight["cityTo"] + " voor <b>€" + flight["price"] + "</b>." + "<a href='" + flight["deep_link"] + "' target='_blank'><button class='bookButton'>Book</button></a>";
						messageArr.push(message);
						// var bookButtonMessage = "<a href='" + flight["deep_link"] + "' target='_blank'><button class='bookButton'>Book</button></a>";
						// bookButtonArr.push(bookButtonMessage);
					}
					dealsObj.innerHTML = messageArr.join('</br>');
					// bookButtonObj.innerHTML = bookButtonArr.join('</br');
				});
			// }
		}