<?php

	require_once "config.php";
	
	$conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
	mysql_select_db($_CONFIG['dbname']);

  	$sql = "      
    SELECT *
      FROM ip_iscritti_podistica
     ORDER BY ip_cognome, ip_nome
  	";
  	$result = mysql_query($sql) or die(mysql_error());

  	$data = array();
  	while ($row = mysql_fetch_assoc($result)) {
	    $data[] = array(
          'id' => $row['ip_id'],
          'lastname' => $row['ip_cognome'],
          'firstname' => $row['ip_nome'],
          'photo' => $row['ip_foto']
      	);
  	}

	echo json_encode($data);
	mysql_close($conn);

?>