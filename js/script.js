
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
  var value = document.getElementById(id).value
  console.log(id)
  console.log(this.value)
  if (value==='show') {
    for(var i = 0; i < lst.length; ++i) {
      console.log(1)
      lst[i].style.display = 'none';
    }
    document.getElementById(id).value = 'hide'
  } else if (value==='hide') {
    for(var i = 0; i < lst.length; ++i) {
      lst[i].style.display = '';
    }
    document.getElementById(id).value = 'show'
  }
  
}