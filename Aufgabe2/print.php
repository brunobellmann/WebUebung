<?php
//PHP file print XML into HTML
    include ("world_data_parse.php");

    $wdp = new WorldDataParser();

    $wdp->saveXML($wdp->parseCSV('world_data_v1.csv'));
    $tableContent = $wdp->printXML('world_data.xml', 'world_data.xsl');

    echo $tableContent;
?>