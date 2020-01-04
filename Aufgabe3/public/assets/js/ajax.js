$(document).ready(function () {
    
    $.ajax({
        type: "GET",
        url: "/items",
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

    console.log(form)

    if (form[0].value && !form[1].value) {
        $.ajax({
            type: "GET",
            url: "/items/" + form[0].value,
            data: {},
            async: true,
            success: function(data) {
                var table = $('#table_body')
                //to empty the table
                table.empty()
                if (typeof data === 'object'){
                    var id = data.id
                    var name = data.name
                    var birthrate = data.birth_rate_per_1000
                    var cell_phones = data.cell_phones_per_100
                    var children = data.children_per_woman
                    var elec = data.electricity_consumption_per_capita
                    var inet = data.internet_user_per_100
                    //var vervollständigen und unten den td string anpassen
                    table.append('<tr><td>'+id+'</td><td>'+name+'</td><td>'+birthrate+'</td><td>'+cell_phones+'</td><td>'+children+'</td><td>'+elec+'</td><td>'+inet+'</td></tr>')
                }
            }, error: function(jqXHR, text, err) {
                alert('No such id ' + form[0].value + ' in database')
            }
        });
    } else { // form[1].value

        var ids = form[1].value.split("-")

        $.ajax({
            type: "GET",
            url: "/items/" + ids[0] + "/" + ids[1] ,
            data: {},
            async: true,
            success: function(data) {
                var table = $('#table_body')
                //to empty the table
                table.empty()
                if (Array.isArray(data)){
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
                }
            }, error: function(jqXHR, text, err) {
                alert('Range not possible')
            }
        });
    }
});

//Properties
$("#show_selected_prop").click(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var prop = $("#prop_selection :selected").val();
    console.log(prop)
    $.ajax({
        type: "GET",
        url: "/properties/" + prop,
        data: {},
        async: true,
        success: function(data) {
            console.log(data)
            $('td:nth-child(' + prop+1 + '),th:nth-child(' + prop+1 + ')').show();
            //TODO: show if not showed (denke ich)
        }, error: function(jqXHR, text, err) {
            alert('No such property value')
        }
    });
    

})

$("#hide_selected_prop").click(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var prop = $("#prop_selection :selected").val();

    $.ajax({
        type: "GET",
        url: "/properties/" + prop,
        data: {},
        async: true,
        success: function(data) {
            $('td:nth-child(' + prop+1 + '),th:nth-child(' + prop+1 + ')').hide();
        }, error: function(jqXHR, text, err) {
            alert('No such property available')
        }
    });
    

})

//Country Add
$("#country_add").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this).serializeArray();
    var data = {}
    data['name'] = form[0].value
    data['birthrate'] = form[1].value
    data['cellphones'] = form[2].value

    $.ajax({
        type: "POST",
        url: "/items",
        data: data,
        async: true,
        success: function(data) {

            var table = $('#table_body')
                //to empty the table
                table.empty()
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
                alert('Added country ' + data['name'] + ' to list!')
        }, error: function(jqXHR, text, err) {
            alert('Not all of three properties are given.')
        }
    });

})

//Delete last country
$("#country_delete").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this).serializeArray();
    
    if (form[0].value === "") {
        $.ajax({
            type: "DELETE",
            url: "/items",
            data: {},
            async: true,
            success: function(data) {
                var table = $('#table_body')
                //to empty the table
                table.empty()
                // check if data is arry oder failure text message
                if (Array.isArray(data[0])){
                    var data = data[0]
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
                }
                alert('Deleted last country: ' + data[1].name + ' !')
            }, error: function(jqXHR, text, err) {
                alert('No items to delete!')
            }
        });
    } else {
        $.ajax({
            type: "DELETE",
            url: "/items/" + form[0].value,
            data: {},
            async: true,
            success: function(data) {
                var table = $('#table_body')
                //to empty the table
                table.empty()
                if (data.length > 0){
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
                }
                alert('Item ' + form[0].value + ' deleted successfully')
            }, error: function(jqXHR, text, err) {
                alert('No such id ' + form[0].value + ' in database')
            }
        });
    }

});

