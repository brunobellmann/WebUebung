<?php
//PHP file print XML into HTML
    include ("world_data_parse.php");

    $dataClass = new WorldDataParser();
    $text = $dataClass->printXML('xml/csvData.xml', 'test');

    echo $text;

?>