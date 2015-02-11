<?php

    require_once "config.php";

    $conf = $_GET['conf'] == 'yes';
    
    $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
    mysql_select_db($_CONFIG['dbname_mobile']);

    $sql = "      
    SELECT mobile_footraces.*, 
           DATE_FORMAT(race_when, '%d/%m/%Y %H:%i') as race_date,
           DATE_FORMAT(race_when, '%d/%m/%Y') as race_day,
           DATE_FORMAT(race_when, '%H:%i') as race_hour
      FROM mobile_footraces " .
     (!$conf ? "WHERE race_when between CURDATE() and (CURDATE() + INTERVAL 1 MONTH)" : "") .
    " ORDER BY race_when
    ";
    $result = mysql_query($sql) or die(mysql_error());

    $data = array();
    while ($row = mysql_fetch_assoc($result)) {
        $data[] = array(
          'id' => $row['id'],
          'when' => $row['race_date'],
          'day' => $row['race_day'],
          'hour' => $row['race_hour'],
          'where' => $row['race_where'],
          'length' => $row['race_length'],
          'length2' => $row['race_length2'],
          'length3' => $row['race_length3'],
          'participants' => $row['race_participants'],
          'organizer' => $row['race_organizer'],
          'web' => $row['race_website'],
          'type' => $row['race_type']
        );
    }

    echo json_encode($data);
    mysql_close($conn);

?>