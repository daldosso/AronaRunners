<?php

    require_once "config.php";

    $conf = $_GET['conf'] == 'yes';

    $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
    mysql_select_db($_CONFIG['dbname_mobile']);

    $sql = "
    SELECT athleteId as athlete,
           SUM(race_length) as km,
           count(distinct raceId) as races
      FROM mobile_charts
     INNER JOIN mobile_footraces ON (mobile_charts.raceId = mobile_footraces.id)
    -- INNER Sql518868_1.ip_iscritti_podistica ON (mobile_chars.athleteId = Sql518868_1.ip_iscritti_podistica.ip_id)
     GROUP BY athleteId
    ";

    $result = mysql_query($sql) or die(mysql_error());

    $data = array();
    while ($row = mysql_fetch_assoc($result)) {
        $data[] = array(
          'athlete' => $row['athlete'],
          'km' => $row['km'],
          'races' => $row['races']
        );
    }

    echo json_encode($data);
    mysql_close($conn);

?>