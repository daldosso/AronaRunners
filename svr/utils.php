<?php
	require_once "config.php";

	function getConn() {
		$conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
		mysql_select_db($_CONFIG['dbname']);
		return $conn;
	}

	function closeConn($conn) {
		mysql_close($conn);
	}

	function cleanInput($input) {
		$input = htmlspecialchars(stripslashes($input));
        $input = str_ireplace("script", "blocked", $input);
        $input = mysql_real_escape_string($input);

		return $input;
	}

	function cleanPOST($input) {
		if (isset($_POST[$input])) {
			return cleanInput($_POST[$input]);
		} else {
			return '';
		}
	}

	function cleanGET($input) {
		if (isset($_GET[$input])) {
			return cleanInput($_GET[$input]);
		} else {
			return '';
		}

	}	

?>

	
