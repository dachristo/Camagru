<?php
include 'connexion.php';
session_start();
$login = (isset($_POST["login"])) ? htmlentities($_POST["login"]) : NULL;
$password = (isset($_POST["password"])) ? htmlentities($_POST["password"]) : NULL;

$grain = 'b54sFmjJ52';
$sel = 'a12Gfd51gzR';
$sha1 = sha1($grain.$password.$sel);

$req = $dbh->prepare('select 1 from UTILISATEUR where login = :login and password = :passwd');
$req->execute(array('login' => $login, 'passwd' => $sha1);
if ($donnees = $req->fetch()) {
    echo "OK";
    $_SESSION["login"] = $login;;
}
