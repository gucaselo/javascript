// from data.js
var tableData = data;
// console.log(tableData[0].city)

// Select button "Filter Table" and "Submit" event
var button = d3.select('#filter-btn')
var form = d3.select('form')

// User date input
var inputData = d3.select('#datetime').property('value')

button.on('click', function() {
    var inputData = d3.select('#datetime').property('value')
    console.log(inputData);
})

form.on('submit', function() {
    var inputData = d3.select('#datetime').property('value')
    d3.event.preventDefault();
    var result = tableData.filter(date => date.datetime === inputData)
    var tbody = d3.select('tbody')
    result.forEach(value => {
        var rows = tbody.append('tr')
        Object.entries(value).forEach(([key, value]) => {
            var data = rows.append('td');
            data.text(value);
        })
            
    })
    // tbody.append('tr').append('td')

    console.log(result);
})