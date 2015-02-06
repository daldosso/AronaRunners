<?php

    require_once "config.php";
    require_once "utils.php";
    $mysqli = new mysqli($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass'],  $_CONFIG['dbname_mobile']);
  
    $requestBody = file_get_contents('php://input');
    $obj = json_decode($requestBody);
    $op = $obj->{'op'};
    $race = $obj->{'race'};
    $when = $mysqli->real_escape_string($race->{'when'});
    $where = $mysqli->real_escape_string($race->{'where'});
    $length = $mysqli->real_escape_string($race->{'length'});
    $length2 = $mysqli->real_escape_string($race->{'length2'});
    $length3 = $mysqli->real_escape_string($race->{'length3'});
    $organizer = $mysqli->real_escape_string($race->{'organizer'});
    $type = $mysqli->real_escape_string($race->{'type'});
    $web = $mysqli->real_escape_string($race->{'web'});
  
?>