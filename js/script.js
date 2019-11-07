
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

      if (dir===1) {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      } else if (dir===0) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
    }
  }
}

function toggleRow(cls, id) {
  var lst = document.getElementsByClassName(cls);
  var head = document.getElementById(id)
  if (!head.classList.contains('disabled')) {
    if (head.classList.contains('hideRow')) {
      for(var i = 0; i < lst.length; ++i) {
        lst[i].style.display = '';
        document.getElementById(id).classList.remove('hideRow')
      }
    } else {
      for(var i = 0; i < lst.length; ++i) {
        lst[i].style.display = 'none';
        document.getElementById(id).classList.add('hideRow')
      }
    }
  }
}

window.onload = function() {
  var mq = window.matchMedia( "(min-width: 767px) and (max-width: 1199px)" );
  var mq2 = window.matchMedia( "(min-width: 1199px)" );
  
  if (!mq.matches && !mq2.matches) {
    var cls = ['cellphone', 'child', 'electric', 'internet']
    var ids = ['tCellphone', 'tChild', 'tElectric', 'tInternet']
    
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
  } else if (!mq2.matches && mq.matches) {
    var cls = ['electric', 'internet']
    var ids = ['tElectric', 'tInternet']

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
  } else {
    var cls = ['cellphone', 'child', 'electric', 'internet']
    var ids = ['tCellphone', 'tChild', 'tElectric', 'tInternet']
    
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



