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
                table.append('<tr><td>'+id+'</td><td>'+name+'</td><td>'+birthrate+'</td></tr>')
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
    console.log(form)
    
    $.ajax({
        type: "GET",
        url: "/items",
        data: form[0].value,
        contentType: "text/plain",
        async: true,
        beforeSend: function(jqXHR, settings) {
            console.log(settings.url);
        },
        success: function(data) {
            console.log()
            var table = $('#table_body')
            //to empty the table
            table.empty()
            for (var i = 0; i < data.length; i++) {
                var name = data[i].name
                var id = data[i].id
                var birthrate = data[i].birth_rate_per_1000
                //var vervollständigen und unten den td string anpassen
                table.append('<tr><td>'+id+'</td><td>'+name+'</td><td>'+birthrate+'</td></tr>')
            }
        }, error: function(jqXHR, text, err) {
        // Handle error if occured
        }
    });

});