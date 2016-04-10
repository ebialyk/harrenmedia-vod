var drawChartCallback = drawChart;
function runPost() {
	$.post("rest/client/chartData", function(data) {
		drawChartCallback(data);
	});

}
google.setOnLoadCallback(runPost());

function drawChart(data) {
	// var dataaa = JSON.parse(data[0]);
	dataTable = new google.visualization.DataTable();
	var arrayData = new Array();
	[ 'Dates', 'Impressions', 'Profit' ];
	dataTable.addColumn('number', 'Dates');
	dataTable.addColumn('number', 'Impressions');
	dataTable.addColumn('number', 'Profit');
	var i = 0
	for (; i < data.length; i++) {
		dataTable.addRow(data[i]);
	}
	// var dataTable = google.visualization.arrayToDataTable(arrayData);

	var options = {
		title : 'Performance',
		curveType : 'function',
		legend : {
			position : 'bottom'
		}
	};

	var chart = new google.visualization.LineChart(document
			.getElementById('chart_div'));

	chart.draw(dataTable, options);
}
