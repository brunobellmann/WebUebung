
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

function tableWidth(size) {
  var table = document.getElementById('worldData')
  switch (size) {
    case 7:
      table.classList.add('td7')
      break
    case 6:
      table.classList.add('td7')
      break
    case 5:
      table.classList.add('td7')
      break
    case 4:
      table.classList.add('td7')
      break
    case 3:
      table.classList.add('td7')
      break
    case 2:
      table.classList.add('td7')
      break
  }
}

function toggleRow(cls, id) {
  var lst = document.getElementsByClassName(cls);
  console.log(document.styleSheets)
  var head = document.getElementById(id)

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
  this.tableWidth(document.getElementById('worldData').rows[0].cells.length)
}

