<?php

    require_once "config.php";
    require_once "utils.php";
    $mysqli = new mysqli($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass'],  $_CONFIG['dbname_mobile']);
  
    $requestBody = file_get_contents('php://input');
    $obj = json_decode($requestBody);
    $op = $obj->{'op'};
    $race = $obj->{'race'};
    $race_name = '';
    $when = $mysqli->real_escape_string($race->{'when'});
    $where = $mysqli->real_escape_string($race->{'where'});
    $length = $mysqli->real_escape_string($race->{'length'});
    $length2 = $mysqli->real_escape_string($race->{'length2'});
    $length3 = $mysqli->real_escape_string($race->{'length3'});
    $organizer = $mysqli->real_escape_string($race->{'organizer'});
    $type = $mysqli->real_escape_string($race->{'type'});
    $web = $mysqli->real_escape_string($race->{'web'});
    $result = array('success' => 'true');
    if ($op == "C") {
        if ($when == "") {
            $result['success'] = 'false';
            $result['message'] = 'data e ora mancanti';
        } elseif ($where == "") {
            $result['success'] = 'false';
            $result['message'] = 'luogo mancante';
        } else {
            $query = "INSERT INTO mobile_footraces(race_name, race_when, race_where, race_length, 
                                                   race_length2, race_length3, race_organizer, race_website, race_type)
                      VALUES ('$race_name', '$when', '$where', '$length', '$length2', '$length3', '$organizer', '$web', '$type')";
        }
    }
    echo json_encode($result);
    $mysqli->query($query);  
?>