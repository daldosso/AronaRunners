<?php

  require_once "config.php";
  require_once "utils.php";

  $raceId = (int) $_POST["raceId"];
  $athleteId = (int) $_POST["athleteId"];

  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname_mobile']);

  $sql = "select count(1) counter from mobile_charts where raceId = $raceId and athleteId = $athleteId";
  $result = mysql_query($sql) or die(mysql_error());
  $row = mysql_fetch_assoc($result);
  if ($row['counter'] == 0) {
    $sql = "insert into mobile_charts(raceId, athleteId) values ($raceId, $athleteId)";
    mysql_query($sql) or die(mysql_error());
  }

  mysql_close($conn);
  echo "{ \"success\": true }";
?>
