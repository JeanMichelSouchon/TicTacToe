const cases = document.querySelectorAll('.case'); // toutes les balises avec la class .case son sélectionné
const state = {joueurEnCours: 1};
var isEndOfGame = false;

// Ajouter l'événement "click" à chaque case
    cases.forEach((cases) => {
      cases.addEventListener('click', jouerCase);
    });
  

//DEBUT FONCTION JOUERCASE
function jouerCase(event) {
  if (isEndOfGame === true){ // Permet de savoir si la partie est fini 
    console.log("tototototototooto");
    return;//les cases ne sont plus cliquable 
  }else{
    const caseCliquee = event.target; //cible l'event 'click'

    // Vérifier si la case a déjà été jouée
    if (caseCliquee.textContent !== '') { // vérifie si la case cliqué est bien vide
      return;
    }
  
    applyColor(caseCliquee); // applique la couleur selon le joueur
  
    // Vérifier s'il y a une victoire
    if (verifierVictoire()) {
    // annonce le vainqueur
      if (state.joueurEnCours === 1) {
          document.getElementById('result').textContent = "Joueur 1 à Gagné!";
          addScore(state.joueurEnCours); // ajoute un score au joueur 1
          isEndOfGame = true; // établie la fin de partie
      } else {
        document.getElementById('result').textContent = "Joueur 2 à Gagné!";
        addScore(state.joueurEnCours); // ajoute un score au joueur 1
        isEndOfGame = true; // établie la fin de partie
      }
      return;
    }
  
    // Vérifier s'il y a un match nul
    if (verifierMatchNul()) {
      document.getElementById('result').textContent = "Match Nul!"; //annonce le match nul
      isEndOfGame = true;// établie la fin de partie
      return;
    }
  
    // Changer de joueur en cours
    state.joueurEnCours = state.joueurEnCours === 1 ? 2 : 1; // si le joueur en cour est 1 , la variable prend la valeur 2 et inversement
    document.getElementById('joueur').textContent = state.joueurEnCours; // actualise la page pour annoncer le tour du joueur
  }
}
//FIN FONCTION JOUER CASE

//DEBUT FONCTION MATCH NUL
function verifierMatchNul() {
  for (let i = 0; i < 9; i++) {
    if (cases[i].textContent === '') { // vérifie si toutes les cases sont remplies
      return false; // Il reste des cases vides
    }
  }

  return true; // Match nul
}
//FIN FONCTION MATCH NUL

//DEBUT FONCTION VICTOIRE
function verifierVictoire() {
    const combinaisonsGagnantes = [
    //MATRICE DU TIC TAC TOE :
    //[0,1,2]
    //[3,4,5]
    //[6,7,8]
      [0, 1, 2], // Ligne 1
      [3, 4, 5], // Ligne 2
      [6, 7, 8], // Ligne 3
      [0, 3, 6], // Colonne 1
      [1, 4, 7], // Colonne 2
      [2, 5, 8], // Colonne 3
      [0, 4, 8], // Diagonale 1
      [2, 4, 6], // Diagonale 2
    ];
  
    // déclare la variable combinaison qui dépend de combinaison gagnante (récupère les valeurs dans le tableau)
    for (var combinaison of combinaisonsGagnantes) {
      const a = cases[combinaison[0]].textContent;
      const b = cases[combinaison[1]].textContent;
      const c = cases[combinaison[2]].textContent;
      //Vérifie si les valeurs récupéré corresponde à une combinaison gagnante
      if (a !== '' && a === b && b === c) {
        cases[combinaison[0]].style.backgroundColor = "#1bb50d";
        cases[combinaison[1]].style.backgroundColor = "#1bb50d";
        cases[combinaison[2]].style.backgroundColor = "#1bb50d";
        return true; // Victoire trouvée
      }
    }
  
    return false; // Aucune victoire trouvée
}
//FIN FONCTION VICTOIRE

//DEBUT FONCTION RESET
function reset() {
  isEndOfGame = false;
    cases.forEach((cases) => {
      cases.textContent = ''; // Vider chaque case
      cases.style.backgroundColor = 'white';
    });
    

    state.joueurEnCours = 1; // Revenir au joueur 1
    document.getElementById('joueur').textContent = state.joueurEnCours; 
    document.getElementById('result').textContent = '';
  
  }
//FIN FONCTION RESET

//DEBUT FONCTION applyColor
function applyColor(caseCliquee){
  // Mettre le symbole du joueur en cours sur la case
  caseCliquee.textContent = state.joueurEnCours === 1 ? 'X' : 'O';
  caseCliquee.style.backgroundColor = state.joueurEnCours === 1 ? "#2a83f7" : "#ed1aaa";
}
//FIN FONCTION applyColor

//DEBUT FONCTION resetScore
function resetScore(){
  document.getElementById('Score1').textContent = '0';// Remet le score à zero
  document.getElementById('score2').textContent = '0';
}
//FIN FONCTION resetScore

//DEBUT FONCTION addScore
function addScore(winner){
  var scorejoueur1 = document.getElementById('Score1'); // attribut l'identification de la balise a modifier dans la variable
  var scorejoueur2 = document.getElementById('Score2');// attribut l'identification de la balise a modifier dans la variable

  if(winner === 1){
    var score1 = scorejoueur1.innerText; //récupère le text du score 1
    score1 = parseFloat(score1); // le convertie en valeur
    score1 = score1+1; // ajout un score
    scorejoueur1.innerText = score1; // actualise le sore sur la page
  } else {
    var score2 = scorejoueur2.innerText;//récupère le text du score 2
    score2 = parseFloat(score2);// le convertie en valeur
    score2 = score2+1;// ajout un score
    scorejoueur2.innerText = score2;// actualise le sore sur la page
  }
}
//FIN FONCTION addScore