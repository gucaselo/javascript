// from data.js
var tableData = data;

// Select button "Filter Table" and "Submit" event
var button = d3.select('#filter-btn')
var form = d3.select('form')

// Event handlers based on clicks or hitting enter
button.on('click',updateTable);
form.on('submit', updateTable);

// Function to update table info
function updateTable() {

    // User date input
    var inputData = d3.select('#datetime').property('value')
    
    // Prevent default behavior 
    d3.event.preventDefault();
    
    // Filter dataset based on user input
    var result = tableData.filter(date => date.datetime === inputData)
    
    // Select table body tag
    var tbody = d3.select('tbody')
    
    // Clear previous results
    tbody.html('');
    
    // Append data filtered into the table
    if (result.length !== 0) {
        result.forEach(value => {
            var rows = tbody.append('tr')
            Object.entries(value).forEach(([key, value]) => {
                var data = rows.append('td');
                data.text(value);
            }) 
        })
    }
    // If array is empty due to out of range user input then insert a message
    else {
        tbody.append('tr')
        .append('td')
        .attr('colspan', '7')
        .text(dateRange())
        .style('text-align', 'center');
    }
    // Empty form after table is generated with filtered data
    d3.select('#datetime').property('value', "");
}

// // Function to return date range from the dataset
function dateRange() {

    var dates = tableData.map(info => info.datetime)
    dates.sort(function (first, last) {
        return first - last;
    });
    var startDate = dates[0]; 
    var endDate = dates[dates.length-1];
    output = `No UFO records found; dates are from (${startDate}) to (${endDate})`

    return output
}
