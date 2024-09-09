const { func } = require('joi');
const { v4: uuidv4 } = require('uuid');

function genererNumeroCompte(typeCompte=1) {
    const uuid = uuidv4().replace(/-/g, ''); // Supprime les tirets

    const numeroUnique = uuid.substring(0, 10);

    let prefixe;
    if (typeCompte === 1) {
        prefixe = 'CUR';  // Préfixe pour compte courant
    } else if (typeCompte === 2) {
        prefixe = 'SAV';  // Préfixe pour compte d'épargne
    } else {
        throw new Error('Type de compte invalide');
    }
    const numeroCompteBancaire = `${prefixe}${numeroUnique}`;
    return numeroCompteBancaire;
}


function getTypeTransaction(type) {
    if (type === 1) {
        return 'Crédit';
    } else if (type === 2) {
        return 'Débit';
    } else {
        throw new Error('Type de transaction invalide');
    }
    
}

module.exports = { genererNumeroCompte, getTypeTransaction };