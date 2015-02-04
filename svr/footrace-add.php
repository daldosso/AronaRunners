<?php

  require_once "config.php";
  require_once "utils.php";
    
  $idInput = $_POST["id"];
  $id = (int) $idInput;

  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname_mobile']);

  $sql = "update mobile_footraces set race_participants = race_participants + 1 where id = $id";
  mysql_query($sql) or die(mysql_error());
  mysql_close($conn);
  echo "{ \"success\": true }";
?>
