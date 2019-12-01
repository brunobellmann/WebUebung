<?php
// PHP file to parse CSV into XML
include 'world_data_parse.php';

$wdp = new WorldDataParser();
// print pre element with array
echo '<pre>', print_r($wdp->parseCSV('world_data_v1.csv'), 1), '</pre>';
?>