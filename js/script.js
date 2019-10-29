window.onload = function () {

    var obj = document.getElementById('btn1');
    console.log(obj);

    obj.addEventListener("click", function () {
        alert(obj.id);
    });

}