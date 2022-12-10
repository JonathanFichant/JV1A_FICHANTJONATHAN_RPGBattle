/* Texte expliquant ce qu'il se passe a chaque action ainsi qu'une animation
    setTimeout
ATK, PV, MANA pour chaque perso affiches a l'ecran en permanence
Si PV d'un heros <= 0, animation mort ou disparition sprite, passage permanent en true
    Si PV de tous les heros <= 0 alors GAME OVER
PV des monstres visible dans une infobulle quand on passe la souris sur leur sprite
    Si PV d'un monstre <= O, animation mort ou disparition spirte, ne prend plus part aux ripostes
    Si PV de tous les monstres <= 0 alors WIN
Affichage d'un menu d'action quand un perso  est selectionne
    3 actions par perso : Attaque, Defendre, Action Speciale (unique par perso)
        Les actions speciales coutent du mana
        cooldown d'un tour pour chaque action
            une action en cooldown doit avoir un visuel (grisee par ex)*/
// affecte la nouvelle image lorsque la souris survole l'élément function passageDelaSouris(element     )

//Importation des variables de HTML
pacman = document.getElementById("spritePacman");
pacmanJR = document.getElementById("spritePacmanJR");
missPacman = document.getElementById("spriteMissPacman");
document.getElementById("hpPacman").style.visibility = 'hidden';
document.getElementById("hpMissPacman").style.visibility = 'hidden';
document.getElementById("hpPacmanJR").style.visibility = 'hidden';
const atkPacman = 8;
const atkMissPacman = 6;
const atkPacmanJR = 3;
Riposte = 5 ;
ListRiposte = [0,1,2,3] ;
NumberRiposte = 5 ;
pacmanKO = 0;
nbEnnemiKO = 0;

usedBlinky = false;
usedPinky = false;
usedInky = false;
usedClyde = false;

atkBlinky = 3;
atkPinky = 2;
atkInky = 3;
atkClyde = 4;

atkSelect = false;
atkSpeBlinky = 10;
atkSpePinky = 1;
atkSpeInky = 4;
atkSpeClyde = 0;

shieldBlinky = false;
shieldPinky = false;
shieldInky = false;
shieldClyde = false;

cdBlinky = [0,0,0];
cdPinky = [0,0,0];
cdInky = [0,0,0];
cdClyde = [0,0,0];

manaSpeBlinky = 5;
manaSpePinky = 10;
manaSpeInky = 6;
manaSpeClyde = 5;

actifBlinky = false;
actifPinky = false;
actiInky = false;
actifClyde = false;

blinky = document.getElementById("spriteBlinky");
pinky = document.getElementById("spritePinky");
inky = document.getElementById("spriteInky");
clyde = document.getElementById("spriteClyde");

attaque = document.getElementById("atk");
defense = document.getElementById("def");
special = document.getElementById("spe");

function function_checkFinDeTour () {

    if (nbEnnemiKO == 3) {
        infos.innerHTML = "";
        infos2.innerHTML = "VICTOIRE !";
        infos3.innerHTML = "";
        exit();
    }
    if (usedBlinky == true ) {
        if (shieldBlinky == true) {
            spriteBlinky.setAttribute("src","Defense.gif");}
        else {
            spriteBlinky.setAttribute("src","Blinky2.gif"); }}

    if (usedPinky == true) {
        if (shieldPinky == true) {
            spritePinky.setAttribute("src","Defense.gif");}
        else {
            spritePinky.setAttribute("src","Pinky2.gif");}}

    if (usedInky == true) {
        if (shieldInky == true) {
            spriteInky.setAttribute("src","Defense.gif");}
        else {
        spriteInky.setAttribute("src","Inky2.gif");}}

    if (usedClyde == true) {
        if (shieldClyde == true) {
            spriteClyde.setAttribute("src","Defense.gif");}
        else {
        spriteClyde.setAttribute("src","Clyde2.gif");}}


    // Passage au tour ennemi et riposte
    if ((usedBlinky == true || usedBlinky == "KO") && (usedPinky == true || usedPinky == "KO" )&& (usedInky == true || usedInky == "KO" ) && (usedClyde == true || usedClyde == "KO" )) {
        turn.innerHTML = "Tour Ennemi" ;
        infos.innerHTML =" ";
        infos2.innerHTML =" ";
        infos3.innerHTML =" ";


        if (hpPacman.innerHTML > 0)  { 
            setTimeout(function() {
                function_riposte(atkPacman,infos); },1500);}
        else {
            pacmanKO = 1;
        }
        if (hpMissPacman.innerHTML > 0)  { 
            setTimeout(function() {    
            function_riposte(atkMissPacman,infos2); },3000-1500*pacmanKO); }
        if (hpPacmanJR.innerHTML > 0)  { 
                setTimeout(function() {
                function_riposte(atkPacmanJR,infos3); },4500-1500*nbEnnemiKO); }
            
    

        //Retour au tour joueur, remise à zéro des utilisations des joueurs encore en vie

        setTimeout(function() {
            turn.innerHTML = "Tour Joueur";
                    document.getElementById("spriteBlinky").style.backgroundColor = "black";
                    document.getElementById("spritePinky").style.backgroundColor = "black";
                    document.getElementById("spriteInky").style.backgroundColor = "black";
                    document.getElementById("spriteClyde").style.backgroundColor = "black";

                    if (usedBlinky == true ) {
                        usedBlinky = false;
                        spriteBlinky.setAttribute("src","Blinky.gif"); }
                    if (usedPinky == true) {
                        usedPinky = false; 
                        spritePinky.setAttribute("src","Pinky.gif");}
                    if (usedInky == true) {
                        usedInky = false; 
                        spriteInky.setAttribute("src","Inky.gif");}
                    if (usedClyde == true) {
                        usedClyde = false;
                        spriteClyde.setAttribute("src","Clyde.gif"); }
                    shieldBlinky = false;
                    shieldPinky = false;
                    shieldInky = false;
                    shieldClyde = false;
                    // baisse des cooldown
                    for (let i = 0; i<3;i++) {
                    cdBlinky[i]-=1;
                    cdPinky[i]-=1;
                    cdInky[i]-=1;
                    cdClyde[i]-=1;
                    }
                    //Reégénération mana
                    manaBlinky.innerHTML -= -1;
                    manaPinky.innerHTML -= -1;
                    manaInky.innerHTML -= -1;
                    manaClyde.innerHTML -= -1;
        ;},6000-1500*nbEnnemiKO);
        
    }
}

function function_blank(){ //Efface le bloc info
    infos.innerHTML =" ";
    infos2.innerHTML =" ";
    infos3.innerHTML =" ";
    atkSelect = false;
    speSelect = false;
    document.getElementById("atk").style.backgroundColor = "black" ;
    document.getElementById("atk").style.color = "white" ;
    document.getElementById("def").style.backgroundColor = "black" ;
    document.getElementById("def").style.color = "white" ;
    document.getElementById("spe").style.backgroundColor = "black" ;
    document.getElementById("spe").style.color = "white" ; 
}

pacman.onclick = function() {
    if (hpPacman.innerHTML > 0 ){
        if (atkSelect == true) {
            function_attaque(hpPacman); 
        } 
        if (speSelect == true) {
            attaqueSpecial(hpPacman);
        }
        if (hpPacman.innerHTML <= 0){
            spritePacman.setAttribute("src","DeathPacman.gif");
        }
    }
}
missPacman.onclick = function() {
    if (hpMissPacman.innerHTML > 0 ) {
         if (atkSelect == true) {
            function_attaque(hpMissPacman); 
        }
        if (speSelect == true) {
            attaqueSpecial(hpMissPacman);
        }
        if (hpMissPacman.innerHTML <= 0 ) { 
            spriteMissPacman.setAttribute("src","DeathPacman.gif");
        }
    } 
}

pacmanJR.onclick = function() {
    if (hpPacmanJR.innerHTML > 0) {
        if (atkSelect == true) {
            function_attaque(hpPacmanJR); 
        }
        if (speSelect == true) {
            attaqueSpecial(hpPacmanJR);
        }
        if (hpPacmanJR.innerHTML <= 0) {
            spritePacmanJR.setAttribute("src","DeathPacman.gif");
        }
    }
}

function function_riposte(atkMonstre,nInfo){ // fonction riposte
    NumberRiposte = Math.floor(Math.random()*ListRiposte.length);
    Riposte = ListRiposte[NumberRiposte];

    if (Riposte == 0) {
        if (shieldBlinky == true) {
            nInfo.innerHTML = "Blinky esquive !";}
        else{
                pvBlinky.innerHTML -= atkMonstre;
            nInfo.innerHTML = "Blinky subit " + atkMonstre + " dégâts !";
            spriteBlinky.setAttribute("src","Deadghost.gif");
            if (pvBlinky.innerHTML <= 10) {
                document.getElementById("pvBlinky").style.color = "red";}
            if (pvBlinky.innerHTML <= 0) {
                usedBlinky ="KO";
                ListRiposte.splice(NumberRiposte,1);
                spriteBlinky.setAttribute("src","KO.gif");}
        } 
    }  
    if (Riposte == 1) {
        if (shieldPinky == true) {
            nInfo.innerHTML = "Pinky esquive !";}
        else{
            pvPinky.innerHTML -= atkMonstre;
            nInfo.innerHTML = "Pinky subit " + atkMonstre + " dégâts !";
            spritePinky.setAttribute("src","Deadghost.gif");
            if (pvPinky.innerHTML <= 10) {
                document.getElementById("pvPinky").style.color = "red";}
            if (pvPinky.innerHTML <= 0) {
                usedPinky ="KO";
                ListRiposte.splice(NumberRiposte,1);
                spritePinky.setAttribute("src","KO.gif");
            }
    }}
    if (Riposte == 2) {
        if (shieldInky == true) {
            nInfo.innerHTML = "Inky esquive !";}
        else{
            pvInky.innerHTML -= atkMonstre;
            nInfo.innerHTML = "Inky subit " + atkMonstre + " dégâts !";
            spriteInky.setAttribute("src","Deadghost.gif");
            if (pvInky.innerHTML <= 10) {
                document.getElementById("pvInky").style.color = "red";}
            if (pvInky.innerHTML <= 0) {
                usedInky ="KO";
                ListRiposte.splice(NumberRiposte,1);
                spriteInky.setAttribute("src","KO.gif");
            }}
    }
    if (Riposte == 3) {
        if (shieldClyde == true) {
            nInfo.innerHTML = "Clyde esquive !";}
        else{
            pvClyde.innerHTML -= atkMonstre;
            nInfo.innerHTML = "Clyde subit " + atkMonstre + " dégâts !";
            spriteClyde.setAttribute("src","Deadghost.gif");
            if (pvClyde.innerHTML <= 10) {
                document.getElementById("pvClyde").style.color = "red";}
            if (pvClyde.innerHTML <= 0) {
                usedClyde ="KO";
                ListRiposte.splice(NumberRiposte,1);
                spriteClyde.setAttribute("src","KO.gif");
            }
        }
    }
    if (usedBlinky =="KO" && usedPinky =="KO" && usedInky == "KO" && usedClyde == "KO"){ // DEFAITE
        infos.innerHTML = "";
        infos2.innerHTML = "DEFAITE";
        infos3.innerHTML = "";
        exit();
    }
}

function function_attaque(cible){ // fonction attaque :
    //Statut du heros passe a used, l'ennemi perd des pv, verif si tour ennemi, riposte, retour au tour du joueur

    // Apres l'attaque, passage a used
    if (actifBlinky == true) {
        cible.innerHTML -= atkBlinky ;
        usedBlinky = true;
        actifBlinky = false;
        infos.innerHTML = "Vous infligez " + atkBlinky + " dégâts !" ;
        cdBlinky = [2,0,0];
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }
    if (actifPinky == true) {
        cible.innerHTML -= atkPinky ;
        usedPinky = true;
        actifPinky = false;
        infos.innerHTML = "Vous infligez " + atkPinky + " dégâts !" ;
        cdPinky = [2,0,0];
        atkSpePinky += 3;
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }
    if (actifInky == true) {
        cible.innerHTML -= atkInky ;
        usedInky = true;
        actifInky = false;
        infos.innerHTML = "Vous infligez " + atkInky + " dégâts !" ;
        cdInky = [2,0,0];
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }
    if (actifClyde == true) {
        cible.innerHTML -= atkClyde ;
        usedClyde = true;
        actifClyde = false;
        infos.innerHTML = "Vous infligez " + atkClyde + " dégâts !" ;
        cdClyde = [2,0,0];
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }
    document.getElementById("spriteBlinky").style.backgroundColor = "black";
    document.getElementById("spritePinky").style.backgroundColor = "black";
    document.getElementById("spriteInky").style.backgroundColor = "black";
    document.getElementById("spriteClyde").style.backgroundColor = "black";

    atkSelect = false;
    document.getElementById("atk").style.backgroundColor = "black" ;
    document.getElementById("atk").style.color = "white" ;

    // Passage au tour ennemi et riposte
    setTimeout(function(){
        function_checkFinDeTour ()},1000);
}
    
// Sélection des perso
blinky.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        if (usedBlinky == false) {
            function_blank();
            actifBlinky = true;
            document.getElementById("spriteBlinky").style.backgroundColor = "white"; //mise en valeur du perso sélectionné
            actifPinky = false;
            document.getElementById("spritePinky").style.backgroundColor = "black";
            actifInky = false;
            document.getElementById("spriteInky").style.backgroundColor = "black";
            actifClyde = false;
            document.getElementById("spriteClyde").style.backgroundColor = "black";
            infos.innerHTML = "Attaque : "+ atkBlinky + " dégâts";
            infos2.innerHTML = "Special : "+ atkSpeBlinky + " dégâts sur une cible";
            infos3.innerHTML = "Coût : " + manaSpeBlinky + " mana";

                // affichage des capacités, grisé si inutilisable

            if (cdBlinky[0] > 0) {
                document.getElementById("atk").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("atk").style.backgroundColor = "black" ;
            }
            if (cdBlinky[1]> 0) {
                document.getElementById("def").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("def").style.backgroundColor = "black" ;
            }
            if (cdBlinky[2]> 0 || manaBlinky.innerHTML < manaSpeBlinky ){
                document.getElementById("spe").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("spe").style.backgroundColor = "black" ;
            }
        }
    }
}
pinky.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        if (usedPinky == false) {
            function_blank();
            actifBlinky = false;
            document.getElementById("spriteBlinky").style.backgroundColor = "black";
            actifPinky = true;
            document.getElementById("spritePinky").style.backgroundColor = "white";
            actifInky = false;
            document.getElementById("spriteInky").style.backgroundColor = "black";
            actifClyde = false;
            document.getElementById("spriteClyde").style.backgroundColor = "black";
            infos.innerHTML = "Attaque : " + atkPinky + " dégâts";
            infos2.innerHTML = "Special : " + atkSpePinky + " dégâts. +3 / tour si pas utilisé";
            infos3.innerHTML = "Coût : " + manaSpePinky + " mana";
           
            if (cdPinky[0] > 0) {
                document.getElementById("atk").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("atk").style.backgroundColor = "black" ;
            }
            if (cdPinky[1]> 0) {
                document.getElementById("def").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("def").style.backgroundColor = "black" ;
            }
            if (cdPinky[2]> 0|| manaPinky.innerHTML < manaSpePinky ) {
                document.getElementById("spe").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("spe").style.backgroundColor = "black" ;
            }
        }
    }
}
inky.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        if (usedInky == false) {
            function_blank();
            actifBlinky = false;
            document.getElementById("spriteBlinky").style.backgroundColor = "black";
            actifPinky = false;
            document.getElementById("spritePinky").style.backgroundColor = "black";
            actifInky = true;
            document.getElementById("spriteInky").style.backgroundColor = "white";
            actifClyde = false;
            document.getElementById("spriteClyde").style.backgroundColor = "black";
            infos.innerHTML = "Attaque : "+ atkInky + " dégâts";
            infos2.innerHTML = "Special : " + atkSpeInky + " dégâts sur toutes les cibles";
            infos3.innerHTML = "Coût : " + manaSpeInky + " mana";

            if (cdInky[0] > 0) {
                document.getElementById("atk").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("atk").style.backgroundColor = "black" ;
            }
            if (cdInky[1]> 0) {
                document.getElementById("def").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("def").style.backgroundColor = "black" ;
            }
            if (cdInky[2]> 0 || manaInky.innerHTML < manaSpeInky ) {
                document.getElementById("spe").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("spe").style.backgroundColor = "black" ;
            }
        }
    }
}
clyde.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        if (usedClyde == false) {
            function_blank();
            actifBlinky = false;
            document.getElementById("spriteBlinky").style.backgroundColor = "black";
            actifPinky = false;
            document.getElementById("spritePinky").style.backgroundColor = "black";
            actifInky = false;
            document.getElementById("spriteInky").style.backgroundColor = "black";
            actifClyde = true;
            document.getElementById("spriteClyde").style.backgroundColor = "white";
            infos.innerHTML = "Attaque : " + atkClyde + " dégâts";
            infos2.innerHTML = "Special : dégâts aléatoire entre 0 et 10";
            infos3.innerHTML = "Coût : " + manaSpeClyde + " mana" ;

            if (cdClyde[0] > 0) {
                document.getElementById("atk").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("atk").style.backgroundColor = "black" ;
            }
            if (cdClyde[1]> 0) {
                document.getElementById("def").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("def").style.backgroundColor = "black" ;
            }
            if (cdClyde[2]> 0|| manaClyde.innerHTML < manaSpeClyde ) {
                document.getElementById("spe").style.backgroundColor = "grey" ;
            } else {
                document.getElementById("spe").style.backgroundColor = "black" ;
            }
        }
    }
}
 
attaque.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        if (document.getElementById("atk").style.backgroundColor != "grey" ){
            atkSelect = true;
            document.getElementById("atk").style.backgroundColor = "white" ;
            document.getElementById("atk").style.color = "black" ;
            if (document.getElementById("def").style.backgroundColor != "grey" ){
                document.getElementById("def").style.backgroundColor = "black" ;
                document.getElementById("def").style.color = "white" ;}
            if (document.getElementById("spe").style.backgroundColor != "grey" ){
                    document.getElementById("spe").style.backgroundColor = "black" ;
                    document.getElementById("spe").style.color = "white" ; }
        }
    }
}
defense.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        atkSelect = false;
        if (document.getElementById("def").style.backgroundColor != "grey" ){
                document.getElementById("spriteBlinky").style.backgroundColor = "black";
                document.getElementById("spritePinky").style.backgroundColor = "black";
                document.getElementById("spriteInky").style.backgroundColor = "black";
                document.getElementById("spriteClyde").style.backgroundColor = "black";
                document.getElementById("atk").style.backgroundColor = "black" ; // Désélection d'Attaque et Spécial
                document.getElementById("atk").style.color = "white" ;
                document.getElementById("spe").style.backgroundColor = "black" ;
                document.getElementById("spe").style.color = "white" ; 
                
                if (actifBlinky == true) {
                    usedBlinky = true;
                    actifBlinky = false;
                    infos3.innerHTML = "Blinky se protège pour le prochain tour !" ;
                    shieldBlinky = true;
                    cdBlinky = [0,2,0];
                    }
                if (actifPinky == true) {
                    usedPinky = true;
                    actifPinky = false;
                    infos3.innerHTML = "Pinky se protège pour le prochain tour !" ;
                    shieldPinky = true;
                    cdPinky = [0,2,0];
                    atkSpePinky += 3;
                }
                if (actifInky == true) {
                    usedInky = true;
                    actifInky = false;
                    infos3.innerHTML = "Inky se protège pour le prochain tour !" ;
                    shieldInky = true;
                    cdInky = [0,2,0];
                }
                if (actifClyde == true) {
                    usedClyde = true;
                    actifClyde = false;
                    infos3.innerHTML = "Clyde se protège pour le prochain tour !" ;
                    shieldClyde = true;
                    cdClyde = [0,2,0];
                }
                
                // Passage au tour ennemi et riposte
                setTimeout(function(){
                    function_checkFinDeTour ()},1000);
        }
    }
}
special.onclick = function() {
    if (turn.innerHTML== "Tour Joueur") {
        atkSelect = false;
        speSelect = true;
        if (document.getElementById("spe").style.backgroundColor != "grey" ) {        
            if (document.getElementById("atk").style.backgroundColor != "grey" ){
                    document.getElementById("atk").style.backgroundColor = "black" ;
                    document.getElementById("atk").style.color = "white" ;}
            if (document.getElementById("def").style.backgroundColor != "grey" ){
                    document.getElementById("def").style.backgroundColor = "black" ;
                    document.getElementById("def").style.color = "white" ;}
            document.getElementById("spe").style.backgroundColor = "white" ;
            document.getElementById("spe").style.color = "black" ;
        
            if (actifInky == true) {
                //attaque de zone sur les 3 ennemis
                hpPacman.innerHTML -= atkSpeInky ;
                hpMissPacman.innerHTML -= atkSpeInky;
                hpPacmanJR.innerHTML -= atkSpeInky;
                usedInky = true;
                actifInky = false;
                infos.innerHTML = "Vous infligez " + atkSpeInky + " dégâts à tous les ennemis !" ;
                cdInky = [0,0,2];
                manaInky.innerHTML -= 6
                //Vérification si un des ennemis touchés est KO
                if (pacmanKO == 0){
                    if (hpPacman.innerHTML <= 0) {
                        pacmanKO = 1;
                        spritePacman.setAttribute("src","DeathPacman.gif");
                    }
                }
                if (hpPacman.innerHTML <= 0 || hpMissPacman.innerHTML <= 0 || hpPacmanJR.innerHTML <= 0) {
                    nbEnnemiKO = 1;
                }
                if ((hpPacman.innerHTML <= 0 && hpMissPacman.innerHTML <= 0) || (hpPacman.innerHTML <= 0 && hpPacmanJR.innerHTML <= 0) || (hpMissPacman.innerHTML <= 0 && hpPacmanJR.innerHTML <= 0)) {
                    nbEnnemiKO = 2;
                }
                if (hpPacman.innerHTML <= 0 && hpMissPacman.innerHTML <= 0 && hpPacmanJR.innerHTML <= 0) {
                    nbEnnemiKO = 3;
                }
                document.getElementById("spriteBlinky").style.backgroundColor = "black";
                document.getElementById("spritePinky").style.backgroundColor = "black";
                document.getElementById("spriteInky").style.backgroundColor = "black";
                document.getElementById("spriteClyde").style.backgroundColor = "black";

                speSelect = false;
                document.getElementById("spe").style.backgroundColor = "black" ;
                document.getElementById("spe").style.color = "white" ;
                setTimeout(function(){
                    function_checkFinDeTour ()},1500);
            }
        }
    }
}

// Attaque spéciale de chaque perso

function attaqueSpecial(cible) {
    if (actifBlinky == true) {
        //attaque basique plus forte
        cible.innerHTML -= atkSpeBlinky ;
        usedBlinky = true;
        actifBlinky = false;
        infos.innerHTML = "Vous infligez " + atkSpeBlinky + " dégâts !" ;
        cdBlinky = [0,0,2];
        manaBlinky.innerHTML -= manaSpeBlinky;
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }
    
    if (actifPinky == true) {
        // attaque dont les dégâts augmentent passivement tant qu'elle n'est pas utilisé
        cible.innerHTML -= atkSpePinky ;
        usedPinky = true;
        actifPinky = false;
        infos.innerHTML = "Vous infligez " + atkSpePinky + " dégâts !" ;
        cdPinky = [0,0,2];
        manaPinky.innerHTML -= manaSpePinky;
        atkSpePinky = 1
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }

    if (actifClyde == true) {
        //attaque aléatoire entre 0 et 10
        atkSpeClyde = Math.floor(Math.random()*11);
        cible.innerHTML -= atkSpeClyde;
        usedClyde = true;
        actifClyde = false;
        infos.innerHTML = "Vous infligez " + atkSpeClyde + " dégâts !" ;
        cdClyde = [0,0,2];
        manaClyde.innerHTML -= manaSpeClyde;
        if (cible.innerHTML <= 0) {
            nbEnnemiKO += 1;
        }
    }
    document.getElementById("spriteBlinky").style.backgroundColor = "black";
    document.getElementById("spritePinky").style.backgroundColor = "black";
    document.getElementById("spriteInky").style.backgroundColor = "black";
    document.getElementById("spriteClyde").style.backgroundColor = "black";

    speSelect = false;
    document.getElementById("spe").style.backgroundColor = "black" ;
    document.getElementById("spe").style.color = "white" ;
    setTimeout(function(){
        function_checkFinDeTour ()},1000);
}

// Infobulle

document.getElementById("spritePacman").onmouseover=function() {
   document.getElementById("hpPacman").style.visibility = 'visible';
}

document.getElementById("spriteMissPacman").onmouseover=function() {
    document.getElementById("hpMissPacman").style.visibility = 'visible';
}

document.getElementById("spritePacmanJR").onmouseover=function() {
    document.getElementById("hpPacmanJR").style.visibility = 'visible';
}

document.getElementById("spritePacman").onmouseout=function() {
    document.getElementById("hpPacman").style.visibility = 'hidden';
}

document.getElementById("spriteMissPacman").onmouseout=function() {
    document.getElementById("hpMissPacman").style.visibility = 'hidden';
}

document.getElementById("spritePacmanJR").onmouseout=function() {
    document.getElementById("hpPacmanJR").style.visibility = 'hidden';
}