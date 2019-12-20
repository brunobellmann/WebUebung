$(document).ready(function () {
    
    $.ajax({
        type: "GET",
        url: "/items/",
        async: true,
        success: function(data) {
            var table = $('#table_body')
            for (var i = 0; i < data.length; i++) {
                var name = data[i].name
                var id = data[i].id
                var birthrate = data[i].birth_rate_per_1000
                var cell_phones = data[i].cell_phones_per_100
                var children = data[i].children_per_woman
                var elec = data[i].electricity_consumption_per_capita
                var inet = data[i].internet_user_per_100
                table.append('<tr><td>'+id+'</td><td>'+name+'</td><td>'+birthrate+'</td><td>'+cell_phones+'</td><td>'+children+'</td><td>'+elec+'</td><td>'+inet+'</td></tr>')
            }
        }, error: function(jqXHR, text, err) {
        // Handle error if occured
        }
    });

    $.ajax({
        type: "GET",
        url: "/properties",
        async: true,
        success: function(data) {
            var $dropdown = $("#prop_selection");
            for (var i = 0; i < data.length; i++) {
                $dropdown.append($("<option />").val(i).text(data[i]));
            }
            
        }, error: function(jqXHR, text, err) {
        // Handle error if occured
        }
    });
    
});

$("#country_filter").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this).serializeArray();
    
    $.ajax({
        type: "GET",
        url: "/items/" + form[0].value,
        data: {},
        async: true,
        success: function(data) {
            var table = $('#table_body')
                //to empty the table
                table.empty()
            if (data != "No such id " + form[0].value + " in database"){
                var id = data.id
                var name = data.name
                var birthrate = data.birth_rate_per_1000
                var cell_phones = data.cell_phones_per_100
                var children = data.children_per_woman
                var elec = data.electricity_consumption_per_capita
                var inet = data.internet_user_per_100
                //var vervollständigen und unten den td string anpassen
                table.append('<tr><td>'+id+'</td><td>'+name+'</td><td>'+birthrate+'</td><td>'+cell_phones+'</td><td>'+children+'</td><td>'+elec+'</td><td>'+inet+'</td></tr>')
            } else {
                //call /items??
            }
        }, error: function(jqXHR, text, err) {
        // Handle error if occured
        }
    });

});