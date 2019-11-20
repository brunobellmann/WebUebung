<?php

// PHP file for basic class with main functions
class WorldDataParser {
    
    function parseCSV(string $path) {
        echo 'Hello World';
    }

    function saveXML(array $data) {
        echo 'Hello World';
    }

    function printXML(string $xmlpath, string $xsltpath) {
        $xmldata = simplexml_load_file($xmlpath) or die("Failed to load");
        return $xmldata->employee[0]->firstname;
    }
        
}
?>