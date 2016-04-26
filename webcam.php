<?php session_start(); ?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Camagru">
    <meta name="keywords" content="HTML,CSS,JavaScript">
    <meta name="author" content="Damien Christophe">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body>
<div class="global">
<?php
    include 'header.php';
?>
    <div class="container">
    <!-- au millieu -->
        <div style="padding-left:3%;padding-top:2%;">
           <div class="webcam">
               <button id="stop" onclick="stop()">Stop</button>
               <button id="start" onclick="start()">Start</button>
               <button id="snapshot" onclick="snapshot()">Snapshot</button>
               <div style="padding: 2%;">
                   <video id="video" style="float:left;padding-left:2%;" width="640" height="480" autoplay></video>
                   <canvas id="canvas" style="padding-left:2%;display:none" width="640" height="480"></canvas>
               </div>
           </div>

            <div id="ladiv">
                <?php
                include "connexion.php";
                $req = $dbh->prepare('SELECT id,nom FROM image where id_utilisateur = (select id from utilisateur where login = :login) order by id desc');
                $req->execute(array('login' => $_SESSION['login']));
                while ($donnees = $req->fetch()) {
                    ?><div class="img" onclick="supprimer(<?php echo $donnees['id']?>)"><img id="<?php echo $donnees['id']?>" onmouseover="hover(<?php echo $donnees['id']?>);" onmouseout="unhover(<?php echo $donnees['id']?>);" src="<?php echo $donnees['nom']?>"></div><?php
                }
                ?>
            </div>
        </div>
    </div>
<?php
include 'footer.php';
?>
</div>
<script src="js/application.js"></script>
<script src="js/webcam.js"></script>
</body>
</html>
