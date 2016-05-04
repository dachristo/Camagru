var x = 0;
var y = 1;
var intervalId = null;
var intervalId2 = null;
var intervalId3 = null;
var intervalId4 = null;
var intervalId5 = null;
var intervalId6 = null;
var intervalId7 = null;
var intervalId8 = null;
var intervalId9 = null;
var intervalId10 = null;
var intervalId11 = null;
var intervalId12 = null;
var limit = 10;

function stop(t){
    clearInterval(t);
}
function moreVisible(elem)
{
    x += 0.01;
    elem.style.opacity = x;
}

function lessVisible(elem)
{
    y -= 0.01;
    elem.style.opacity = y;
}

function print_galerie(data){
    var json = JSON.parse(data);
    var i = 0;
    var j;
    var html = '';
    while (json[i]){
        j = 5;
        html += '<div class="img" style="padding:20px;background-color:white;"><img width="320" height="240" src="'+json[i].nom+'"><div style="background-color:#afafaf;padding:10px;"><span style="margin:5px"><img onclick="add_like('+json[i].id+')" src="img/heart_16.png"> '+json[i].jaime+'</span>';
        html += '<div><input id="commentaire'+json[i].id+'" style="width:69%;" type="text" placeholder="Votre commentaire..."><button onclick="add_comment('+json[i].id+')">Ajouter</button></div>';
        while (json[i][j]) {
            html += '<div style="margin:5px"><div><span style="font-weight: bold;color:#3646ff">'+json[i][j].login+'</span>   '+json[i][j].commentaire+' <img onclick="add_like_com('+json[i][j].id+')" src="img/heart_16.png"> '+json[i][j].jaime+'</div></div>';
            j++;
        }
        html += '</div></div>';
        i++;
    }
    html += '';
    document.getElementById('ladiv2').innerHTML = html;
}

function load_galerie(){
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        print_galerie(xhr.responseText);
    };
    xhr.open("POST", "load_galerie.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("limit=" + limit);
}

function add_like(id)
{
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            load_galerie();
    };
    xhr.open("POST", "add_like_img.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id);
}

function add_like_com(id)
{
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            load_galerie();
    };
    xhr.open("POST", "add_like_com.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id);
}

function add_comment(id){
    var com = document.getElementById('commentaire'+id).value;
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            load_galerie();
    };
    xhr.open("POST", "add_comment.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id +"&com=" + com);
}

var img;

function hover(id) {
    var elem = document.getElementById(id);
    img = elem.src;
    elem.setAttribute('src', './img/suppression.png');
    elem.setAttribute('width', '640');
    elem.setAttribute('height', '480');
}

function unhover(id) {
    var elem = document.getElementById(id);
    elem.setAttribute('src', img);
}

function supprimer(id){
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            afficher_img();
    };
    xhr.open("POST", "suppr_img.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id);
}

function modif_passwd(){
    var passwd = document.getElementById('passwd').value;
    var logmail = document.getElementById('logmail').value;
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            if (xhr.responseText == 'ok')
            {
                document.getElementById('valide').style.display = 'block';
            }
            else
            {
                document.getElementById('fail').style.display = 'block';
            }
        }
    };
    xhr.open("POST", "modif_passwd.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("logmail=" + logmail + "&password=" + passwd);
}
function forgot()
{
    var login = document.getElementById('login').value;
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            if (xhr.responseText == 'ok')
            {
                document.getElementById('valide').style.display = 'block';
            }
            else
            {
                document.getElementById('fail').style.display = 'block';
            }
        }
    };
    xhr.open("POST", "add_forgot.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("logmail=" + login);
}

function logout()
{
    var xhr = getXMLHttpRequest();
    
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            document.location.href = 'index.php';
    };
    xhr.open("POST", "logout.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

function inscription(callback){
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var email = document.getElementById('email').value;
    var ok;
    var xhr = getXMLHttpRequest();
    if (!password) {
        var elem = document.getElementById("password_error");
        elem.style.display = "block";
        intervalId = setInterval(function () {
            moreVisible(elem)
        }, 25);
        setTimeout(function () {
            stop(intervalId)
        }, 100 * 25);
        setTimeout(function () {
            intervalId2 = setInterval(function () {
                lessVisible(elem)
            }, 25);
        }, 3000);
        setTimeout(function () {
            stop(intervalId2)
        }, 100 * 25 + 3000);
        setTimeout(function () {
            display_none("password_error");
        }, 100 * 25 + 3000);
        ok = 1;
    }
    if (!password2) {
        var elem2 = document.getElementById("password2_error");
        elem2.style.display = "block";
        intervalId3 = setInterval(function () {
            moreVisible(elem2)
        }, 25);
        setTimeout(function () {
            stop(intervalId3)
        }, 100 * 25);
        setTimeout(function () {
            intervalId4 = setInterval(function () {
                lessVisible(elem2)
            }, 25);
        }, 3000);
        setTimeout(function () {
            stop(intervalId4)
        }, 100 * 25 + 3000);
        setTimeout(function () {
            display_none("password2_error");
        }, 100 * 25 + 3000);
        ok = 1;
    }
    if (password != password2) {
        var elem3 = document.getElementById("different");
        elem3.style.display = "block";
        intervalId5 = setInterval(function () {
            moreVisible(elem3)
        }, 25);
        setTimeout(function () {
            stop(intervalId5)
        }, 100 * 25);
        setTimeout(function () {
            intervalId6 = setInterval(function () {
                lessVisible(elem3)
            }, 25);
        }, 3000);
        setTimeout(function () {
            stop(intervalId6)
        }, 100 * 25 + 3000);
        setTimeout(function () {
            display_none("different");
        }, 100 * 25 + 3000);
        ok = 1;
    }
    if (!login) {
        var elem4 = document.getElementById("inexistant");
        elem4.style.display = "block";
        intervalId7 = setInterval(function () {
            moreVisible(elem4)
        }, 25);
        setTimeout(function () {
            stop(intervalId7)
        }, 100 * 25);
        setTimeout(function () {
            intervalId8 = setInterval(function () {
                lessVisible(elem4)
            }, 25);
        }, 3000);
        setTimeout(function () {
            stop(intervalId8)
        }, 100 * 25 + 3000);
        setTimeout(function () {
            display_none("inexistant");
        }, 100 * 25 + 3000);
        ok = 1;
    }
    if (ok == 1) {
        return;
    }
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            callback(xhr.responseText);
    };
    xhr.open("POST", "ajout_utilisateur.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("login=" + login + "&password=" + password + "&password2=" + password2 + "&email=" + email);
}

function login(callback)
{
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    var ok = 0;
    if (!password) {
        elem = document.getElementById("password_error");
        elem.style.display = "block";
        intervalId = setInterval(function () {
            moreVisible(elem)
        }, 25);
        setTimeout(function () {
            stop(intervalId)
        }, 100 * 25);
        setTimeout(function () {
            intervalId2 = setInterval(function () {
                lessVisible(elem)
            }, 25);
        }, 3000);
        setTimeout(function () {
            stop(intervalId2)
        }, 100 * 25 + 3000);
        setTimeout(function () {
            display_none("password_error");
        }, 100 * 25 + 3000);
        ok = 1;
    }
    if (!login) {
        elem2 = document.getElementById("inexistant");
        elem2.style.display = "block";
        intervalId3 = setInterval(function () {
            moreVisible(elem2)
        }, 25);
        setTimeout(function () {
            stop(intervalId3)
        }, 100 * 25);
        setTimeout(function () {
            intervalId4 = setInterval(function () {
                lessVisible(elem2)
            }, 25);
        }, 3000);
        setTimeout(function () {
            stop(intervalId4)
        }, 100 * 25 + 3000);
        setTimeout(function () {
            display_none("inexistant");
        }, 100 * 25 + 3000);
        ok = 1;
    }
    if (ok == 1) {
        return;
    }
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
        }
    };

    xhr.open("POST", "user_connexion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("login=" + login + "&password=" + password);
}

function readData(sData) {
    if (sData == "OK") {
        if (NomDuFichier == "index.php" || NomDuFichier == '')
            document.location.href = "webcam.php";
        if (NomDuFichier == "inscription.php") {
            var elem = document.getElementById("valide");
            elem.style.display = "block";
            intervalId = setInterval(function () {
                moreVisible(elem)
            }, 25);
            setTimeout(function () {
                stop(intervalId)
            }, 100 * 25);
            setTimeout(function () {
                intervalId2 = setInterval(function () {
                    lessVisible(elem)
                }, 25);
            }, 3000);
            setTimeout(function () {
                stop(intervalId2)
            }, 100 * 25 + 3000);
            setTimeout(function () {
                display_none("valide");
            }, 100 * 25 + 3000);
        }
    }
    else {
        if (NomDuFichier == "inscription.php") {
            if (sData == "different") {
                var elem3 = document.getElementById("different");
                elem3.style.display = "block";
                intervalId5 = setInterval(function () {
                    moreVisible(elem3)
                }, 25);
                setTimeout(function () {
                    stop(intervalId5)
                }, 100 * 25);
                setTimeout(function () {
                    intervalId6 = setInterval(function () {
                        lessVisible(elem3)
                    }, 25);
                }, 3000);
                setTimeout(function () {
                    stop(intervalId6)
                }, 100 * 25 + 3000);
                setTimeout(function () {
                    display_none("different");
                }, 100 * 25 + 3000);
            }
            if (sData == "password") {
                var elem = document.getElementById("password_error");
                elem.style.display = "block";
                intervalId = setInterval(function () {
                    moreVisible(elem)
                }, 25);
                setTimeout(function () {
                    stop(intervalId)
                }, 100 * 25);
                setTimeout(function () {
                    intervalId2 = setInterval(function () {
                        lessVisible(elem)
                    }, 25);
                }, 3000);
                setTimeout(function () {
                    stop(intervalId2)
                }, 100 * 25 + 3000);
                setTimeout(function () {
                    display_none("password_error");
                }, 100 * 25 + 3000);
            }
            if (sData == "password2") {
                var elem2 = document.getElementById("password2_error");
                elem2.style.display = "block";
                intervalId3 = setInterval(function () {
                    moreVisible(elem2)
                }, 25);
                setTimeout(function () {
                    stop(intervalId3)
                }, 100 * 25);
                setTimeout(function () {
                    intervalId4 = setInterval(function () {
                        lessVisible(elem2)
                    }, 25);
                }, 3000);
                setTimeout(function () {
                    stop(intervalId4)
                }, 100 * 25 + 3000);
                setTimeout(function () {
                    display_none("password2_error");
                }, 100 * 25 + 3000);
            }
            if (sData == "login vide") {
                var elem4 = document.getElementById("inexistant");
                elem4.style.display = "block";
                intervalId7 = setInterval(function () {
                    moreVisible(elem4)
                }, 25);
                setTimeout(function () {
                    stop(intervalId7)
                }, 100 * 25);
                setTimeout(function () {
                    intervalId8 = setInterval(function () {
                        lessVisible(elem4)
                    }, 25);
                }, 3000);
                setTimeout(function () {
                    stop(intervalId8)
                }, 100 * 25 + 3000);
                setTimeout(function () {
                    display_none("inexistant");
                }, 100 * 25 + 3000);
            }
            if (sData == "login") {
                var elem5 = document.getElementById("login_error");
                elem5.style.display = "block";
                intervalId9 = setInterval(function () {
                    moreVisible(elem5)
                }, 25);
                setTimeout(function () {
                    stop(intervalId9)
                }, 100 * 25);
                setTimeout(function () {
                    intervalId10 = setInterval(function () {
                        lessVisible(elem5)
                    }, 25);
                }, 3000);
                setTimeout(function () {
                    stop(intervalId10)
                }, 100 * 25 + 3000);
                setTimeout(function () {
                    display_none("login_error");
                }, 100 * 25 + 3000);
            }
            if (sData == "email") {
                var elem6 = document.getElementById("email_error");
                elem6.style.display = "block";
                intervalId12 = setInterval(function () {
                    moreVisible(elem6)
                }, 25);
                setTimeout(function () {
                    stop(intervalId12)
                }, 100 * 25);
                setTimeout(function () {
                    intervalId11 = setInterval(function () {
                        lessVisible(elem6)
                    }, 25);
                }, 3000);
                setTimeout(function () {
                    stop(intervalId11)
                }, 100 * 25 + 3000);
                setTimeout(function () {
                    display_none("email_error");
                }, 100 * 25 + 3000);
            }
        }
        if (NomDuFichier == "index.php") {
            var elem = document.getElementById("error");
            elem.style.display = "block";
            intervalId5 = setInterval(function () {
                moreVisible(elem)
            }, 25);
            setTimeout(function () {
                stop(intervalId5)
            }, 100 * 25);
            setTimeout(function () {
                intervalId6 = setInterval(function () {
                    lessVisible(elem)
                }, 25);
            }, 3000);
            setTimeout(function () {
                stop(intervalId6)
            }, 100 * 25 + 3000);
            setTimeout(function () {
                display_none("error");
            }, 100 * 25 + 3000);
        }
    }
}

function display_none(id) {
    document.getElementById(id).style.display = "none";
    x = 0;
    y = 1;
}

function getXMLHttpRequest() {
    var xhr = null;

    if(window.XMLHttpRequest || window.ActiveXObject){
        if(window.ActiveXObject){
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }else{
            xhr = new XMLHttpRequest();
        }
    }else{
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return;
    }
    return xhr;
}

var CheminComplet = document.location.href;
var NomDuFichier = CheminComplet.substring(CheminComplet.lastIndexOf( "/" )+1 );
if (NomDuFichier == "index.php")
    document.getElementById('home').classList.add('active');
else if (NomDuFichier == "galerie.php")
    document.getElementById('galerie').classList.add('active');
else if (NomDuFichier == "webcam.php")
    document.getElementById('webcam').classList.add('active');
else
    document.getElementById('logo').classList.add('active');
