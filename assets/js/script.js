
console.log("Bien Chargé mon script !");
// ----------------déclarer mon variables---------------------//
const SECRET_KEY = "$2a$10$9Q9BgWTlVTxMMctt8ReIQO4ODlo8OgxJgWA3/fxqQMoRyXsUJsN9O";
const BIN_ID = "655634d154105e766fd0e5e1"
const API_URL = "https://api.jsonbin.io/v3";
let message = document.querySelector("message");
let objetForm;
let getBinResponse;
let array = [];
// const donnees  = {
//     "adresses ": [
//       {
//         "name": "Goerges",
//         "rue": "1O rue ventôse parcc les vieux cyprès ",
//         "code-postal": "13013",
//         "ville": "MARSEILLE"
//       },
//       {
//         "name": "Benoit",
//         "rue": "22 yramen  Axele",
//         "code-postal": "13002",
//         "ville": "MARSEILLE"
//       },
//       {
//         "name": "Joseph",
//         "rue": "Ranian",
//         "code-postal": "12000",
//         "ville": "Hannover",
//         "pays": "ALLEMAGNE"
//       },
//       {
//         "name": "ORIANT",
//         "rue": "54 boulevard lavéran",
//         "code-postal": "13013",
//         "ville": "MARSEILLE",
//         "pays": "FRANCE"
//       }
//     ]
//   }


await getBin()
async function getBin() {
    const res = await fetch(`${API_URL}/b/${BIN_ID}`, {
        method: "GET",
        headers: {
            "X-Master-Key": SECRET_KEY,
            "Content-Type": 'application/json'
        },
    })
    getBinResponse = await res.json();
}

console.log(getBinResponse.record);


getBinResponse.record.forEach(bin => {
    array.push(bin)
});
async function envoyer() {
    const res = await fetch(`${API_URL}/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
            "X-Master-Key": SECRET_KEY,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(array)

    });
    let response = await res.json()
    console.log(response);
}
// await createBin();
// async function createBin() {
//     const res = await fetch(`${API_URL}/b`, {
//         method: "POST",
//         headers: {
//             "X-Master-Key": SECRET_KEY,
//             "Content-Type": 'application/json'
//         },
//         body: JSON.stringify(donnees)
//     })
// }

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let passe = document.querySelector("#moteDePasse").value;
    let confirmPasse = document.querySelector("#confirmMoteDepasse").value;

    if (passe == '') {
        alert("S'il vous plaît mettez votre mote de passe !")
    }
    else if (confirmPasse == '') {
        alert("S'il vous plaît confirmer votre mote de passe !")
    } else if (passe != confirmPasse) {
        alert("\nMote de passe n'est pas identique: Essayez un notre fois...")
        return false;
    } else {
        let ecouteForm = new FormData(form);
        objetForm = Object.fromEntries(ecouteForm);
        console.log("objet form : ", objetForm);
        array.push(objetForm)
        envoyer();
        let inputName = document.querySelector("#nom").value;
        let headerActive = document.createElement("h3");
        form.innerText = `Bienvane ${inputName} Vous êtes bien inscrit dans notre site`;
        
        document.body.appendChild(headerActive);
    }


})

