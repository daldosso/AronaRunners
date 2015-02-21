<?php

    require_once "config.php";
    require_once "utils.php";
    $mysqli = new mysqli($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass'], $_CONFIG['dbname_mobile']);
    $mysqli_athlets = new mysqli($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass'], $_CONFIG['dbname']);

    $sql = "
    SELECT athleteId as athlete,
           SUM(race_length) as km,
           count(distinct raceId) as races
      FROM mobile_charts
     INNER JOIN mobile_footraces ON (mobile_charts.raceId = mobile_footraces.id)
     GROUP BY athleteId
    ";

    $sql_athlets_template = "select CONCAT(ip_cognome, ' ', ip_nome) as athleteName from ip_iscritti_podistica where ip_id = ";

    if ($stmt = $mysqli->prepare($sql)) {
        $stmt->execute();
        $stmt->bind_result($athlete, $km, $races);
        $data = array();
        while ($stmt->fetch()) {
            $sql_athlets = $sql_athlets_template . $athlete;
            if ($stmt_athlets = $mysqli_athlets->prepare($sql_athlets)) {
                $stmt_athlets->execute();
                $stmt_athlets->bind_result($athleteName);
                $stmt_athlets->fetch();
                $data[] = array(
                  'athlete' => $athleteName,
                  'km' => $km,
                  'races' => $races
                );
                $stmt_athlets->close();
            }
        }
        $stmt->close();
    }
    echo json_encode($data);

    $mysqli->close($conn);
?>