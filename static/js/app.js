// from data.js
var tableData = data;

// Select button "Filter Table" and "Submit" event
var button = d3.select('#filter-btn')
var form = d3.select('form')

// Load table on windows load
d3.select(window).on('load', renderTable)

// Event handlers based on clicks or hitting enter
button.on('click',updateTable);
form.on('submit', updateTable);

// Function to update table info
function updateTable() {

    // User date input
    // var inputData = d3.select('#datetime').property('value')
    
    // Prevent default behavior 
    d3.event.preventDefault();
    
    // Filter dataset based on user input
    // var result = tableData.filter(date => date.datetime === inputData)
    var result = advancedSearch()
    
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
    // else if (result === 'outofrange') {
    //     tbody.append('tr')
    //     .append('td')
    //     .attr('colspan', '7')
    //     .text(dateRange())
    //     .style('text-align', 'center');
    // }
    else if (result.length === 0) {
        tbody.append('tr')
        .append('td')
        .attr('colspan', '7')
        .text('No UFO records found; remove some filters and try again!')
        .style('text-align', 'center');
    }
    // Empty forms after table is generated with filtered data
    d3.selectAll('input').property('value', "");
}

// // // Function to return date range from the dataset
// function dateRange() {

//     var dates = tableData.map(info => info.datetime)
//     dates.sort(function (first, last) {
//         return first - last;
//     });
//     var startDate = dates[0]; 
//     var endDate = dates[dates.length-1];
//     output = `No UFO records found; dates are from (${startDate}) to (${endDate})`

//     return output
// }

function advancedSearch() {
    var inputDate = d3.select('#datetime').property('value');
    var inputCity = d3.select('#city').property('value');
    var inputState = d3.select('#state').property('value');
    var inputCountry = d3.select('#country').property('value');
    var inputShape = d3.select('#shape').property('value');
    
    var result = tableData;

    if (inputDate) {
        result = result.filter(date => date.datetime === inputDate);}
    if (inputCity) {
        result = result.filter(date => date.city === inputCity);
    }
    if (inputState) {
        result = result.filter(date => date.state === inputState);
    }
    if (inputCountry) {
        result = result.filter(date => date.country === inputCountry);
    }
    if (inputShape) {
        result = result.filter(date => date.shape === inputShape);
    }

    // // If only user input was the data and it didnt return any result then assign value of 1
    // if (inputDate && inputCity === "" && inputState === "" && inputCountry === "" && inputShape === "") {
    //     if (result.length === 0) {
    //         result = 'outofrange';
    //     }
    // }
    return result
}

// Function to rendle table on page load
function renderTable() {

    // Prevent default behavior 
    d3.event.preventDefault();

    // Select table body tag
    var tbody = d3.select('tbody');

     // Clear previous results
     tbody.html('');

     tableData.forEach(value => {
        var rows = tbody.append('tr')
        Object.entries(value).forEach(([key, value]) => {
            var data = rows.append('td');
            data.text(value);
        }) 
    })

}