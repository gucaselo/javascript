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
    
    // Append data filteres into the table
    result.forEach(value => {
        var rows = tbody.append('tr')
        Object.entries(value).forEach(([key, value]) => {
            var data = rows.append('td');
            data.text(value);
    })

    // Empty form after table is generated with filtered data
    d3.select('#datetime').property('value', "");
    })

}

// Function to return date range from the dataset
function dateRange (data) {
    var dates = data.map(info => info.datetime)
    dates.sort(function (first, last) {
        return first - last;
    });
    var startDate = dates[0]; 
    var endDate = dates[dates.length-1];
    console.log(`Date range is from (${startDate}) to (${endDate})`)
}

dateRange(tableData);