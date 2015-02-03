<?php

	require_once "config.php";
  require_once "utils.php";
	
  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
	mysql_select_db($_CONFIG['dbname']);

  $id = cleanGET("id");

  	$sql = "      
    SELECT *
      FROM ip_iscritti_podistica
     WHERE ip_id = $id 
  	";
  	$result = mysql_query($sql) or die(mysql_error());

  	$data = array();
  	while ($row = mysql_fetch_assoc($result)) {
	    $data[] = array(
          'lastname' => $row['ip_cognome'],
          'firstname' => $row['ip_nome'],
          'photo' => $row['ip_foto']
      	);
  	}

	echo json_encode($data);
	mysql_close($conn);

?>