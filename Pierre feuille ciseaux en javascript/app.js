let scorejoueur = document.getElementById("score-joueur");
let scoreordi = document.getElementById("score-ordi");
let resetbtn = document.getElementById("reset");
let joueurbtn = [...document.getElementsByClassName("btn-joueur")];
let btnopierre = document.getElementById("opierre");
let btnofeuille = document.getElementById("ofeuille");
let btnociseaux = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextbtn = document.getElementById("next");

const jouerManche = (e) => {
 let choix = e.target.closest(".btn-joueur");
 
 joueurbtn.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", jouerManche);
 });

 choix.classList.remove("desactivated");
 choix.classList.add("active");

 let choixJoueur = choix.id;
 let choixOrdi = faireChoixOrdinateur();

 verifierGagnant(choixJoueur, choixOrdi);

 nextbtn.style.visibility = "visible";          
};


const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const faireChoixOrdinateur = () => { 
    // 0 = pierre 
    // 1 = feuille
    // 2 = ciseaux 
    
    let nbAleatoire = Math.floor(Math.random() * 3);

    switch(nbAleatoire){
        case 0:
           btnopierre.classList.add("active");
           return PIERRE;
        case 1:
           btnofeuille.classList.add("active");
           return FEUILLE;
        case 2:
           btnociseaux.classList.add("active");
           return CISEAUX;
    }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
    if(choixJoueur === choixOrdi) {
        message.textContent = "Egalité!";
        return;
    }

    if(choixJoueur === PIERRE) {
        if(choixOrdi === FEUILLE) {
            return victoireOrdinateur()
        } else if (choixOrdi === CISEAUX) {
            return victoireJoueur();
        }
    }

    if(choixJoueur === FEUILLE) {
        if(choixOrdi === CISEAUX) {
            return victoireOrdinateur()
        } else if (choixOrdi === PIERRE) {
            return victoireJoueur();
        }
    }

    if(choixJoueur === CISEAUX) {
        if(choixOrdi === PIERRE) {
            return victoireOrdinateur()
        } else if (choixOrdi === FEUILLE) {
            return victoireJoueur();
        }
    }
};

const victoireOrdinateur = () => {
    message.textContent = "l'ordinateur a gagné";
    scoreordi.textContent++;
};

const victoireJoueur = () => {
    message.textContent = "Vous avez gagner";
    scorejoueur.textContent++;
};

const preparerNouvelleManche = () => {
    joueurbtn.forEach((btn) => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");
        
        btn.addEventListener("click", jouerManche)
    });

    nextbtn.style.visibility = "hidden";

   btnopierre.classList.remove("active")
   btnofeuille.classList.remove("active")
   btnociseaux.classList.remove("active")

   message.textContent = "A vous de jouez!";
};


nextbtn.addEventListener("click", preparerNouvelleManche);

joueurbtn.forEach((btn) => btn.addEventListener("click", jouerManche));

resetbtn.addEventListener("click", () => {
    scorejoueur.textContent = 0;
    scoreordi.textContent = 0;

    preparerNouvelleManche()
})