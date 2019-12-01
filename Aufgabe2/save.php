<?php
// PHP file to save XML

include 'world_data_parse.php';

$wdp = new WorldDataParser();
$status = $wdp->saveXML($wdp->parseCSV('world_data_v1.csv'));
// print status
if ($status) {
    echo 'XML Savestatus: erfolgreich (1)';
} else {
    echo 'XML Savestatus: nicht erfolgreich (0)';
}

?>