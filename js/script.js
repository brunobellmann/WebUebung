// sorting table function
function sortTable(dir) {
  var table, rows, switching, i, x, y, shouldSwitch
  table = document.getElementById('worldData')
  switching = true

  while (switching) {
    switching = false
    rows = table.rows

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false
      x = rows[i].getElementsByTagName('TD')[1]
      y = rows[i + 1].getElementsByTagName('TD')[1]
      // sort descending
      if (dir===1) {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      // sort ascending
      } else if (dir===0) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    // switch rows
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
    }
  }
}

// toggle column
function toggleColumn(cls, id) {
  var lst = document.getElementsByClassName(cls);
  var head = document.getElementById(id)
  if (!head.classList.contains('disabled')) {
    // show column
    if (head.classList.contains('hideColumn')) {
      for(var i = 0; i < lst.length; ++i) {
        lst[i].style.display = '';
        document.getElementById(id).classList.remove('hideColumn')
      }
      // hide column
    } else {
      for(var i = 0; i < lst.length; ++i) {
        lst[i].style.display = 'none';
        document.getElementById(id).classList.add('hideColumn')
      }
    }
  }
}

// make sticky navbar
window.onscroll = function() {scrollNav()};

function scrollNav() {
  var header = document.getElementById("navWrapper");
  var sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// handle responsive table column count
window.onload = function() {
  var mq = window.matchMedia( "(min-width: 769px) and (max-width: 1199px)" );
  var mq2 = window.matchMedia( "(min-width: 1199px)" );
  // less than 769px (phones)
  if (!mq.matches && !mq2.matches) {
    var cls = ['cellphone', 'child', 'electric', 'internet']
    var ids = ['tCellphone', 'tChild', 'tElectric', 'tInternet']
    // hide last four columns
    for(var j = 0; j < ids.length; j++) {
      var head = document.getElementById(ids[j])
      head.classList.add('disabled')
    }  

    for(var j = 0; j < cls.length; j++) {
      var cols = document.getElementsByClassName(cls[j])
      for(var i = 0; i < cols.length; ++i) {
        cols[i].style.display = 'none';
      }
    } 
    // less than 1199px (tablets)
  } else if (!mq2.matches && mq.matches) {
    var cls = ['electric', 'internet']
    var ids = ['tElectric', 'tInternet']
    // hide last two columns
    for(var j = 0; j < ids.length; j++) {
      var head = document.getElementById(ids[j])
      head.classList.add('disabled')
    }  

    for(var j = 0; j < cls.length; j++) {
      var cols = document.getElementsByClassName(cls[j])
      for(var i = 0; i < cols.length; ++i) {
        cols[i].style.display = 'none';
      }
    }  
    // Desktops
  } else {
    var cls = ['cellphone', 'child', 'electric', 'internet']
    var ids = ['tCellphone', 'tChild', 'tElectric', 'tInternet']
    //show all columns
    for(var j = 0; j < ids.length; j++) {
      var head = document.getElementById(ids[j])
      head.classList.remove('disabled')
    }  

    for(var j = 0; j < cls.length; j++) {
      var cols = document.getElementsByClassName(cls[j])
      for(var i = 0; i < cols.length; ++i) {
        cols[i].style.display = '';
      }
    }
  }
}



