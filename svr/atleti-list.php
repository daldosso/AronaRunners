<?php

	require_once "config.php";
	
	$conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
	mysql_select_db($_CONFIG['dbname']);

  $id = htmlspecialchars($_GET["id"]);
  $where1 = '';
  if (isset($id)) {
    $where = "WHERE UPPER(CONCAT(ip_nome, ' ', ip_cognome)) LIKE '%$id%' OR UPPER(ip_cognome) LIKE '%$id%' OR UPPER(ip_nome) LIKE '%$id%'";
  }

  	$select = "      
    SELECT ip_iscritti_podistica.*, CONCAT(ip_cognome, ' ', ip_nome) as ip_name
      FROM ip_iscritti_podistica
      %s
     ORDER BY ip_cognome, ip_nome
  	";

    $sql = sprintf($select, $where);
  	$result = mysql_query($sql) or die(mysql_error());

  	$data = array();
  	while ($row = mysql_fetch_assoc($result)) {
	    $data[] = array(
          'id' => $row['ip_id'],
          'lastname' => $row['ip_cognome'],
          'firstname' => $row['ip_nome'],
          'name' => $row['ip_name'],
          'photo' => $row['ip_foto']
      	);
  	}

	echo json_encode($data);
	mysql_close($conn);

?>