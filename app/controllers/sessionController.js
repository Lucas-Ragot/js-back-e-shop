const bcrypt = require('bcrypt');
const { User, Role } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    // post data here and create session
    login: async (req, res) => {
        try {
            let error = ''
            const { email, password } = req.body;
            // !! Votre code à partir d'ici
            const user = await User.findOne({
                where: {
                    email:email
                },
                include: 'role'
            });
            // console.log(user)
            if(!user){
                error = `l'utilisateur n'existe pas !`
                return res.render('login',{error})
            }else if(! await bcrypt.compare(password, user.password)){
                error = `Mot de passe incorrect`
                return res.render('login',{error})
            }else{
                req.session.user = user
                req.session.user.password = undefined
            }


            // On récupère user avec le role
            // Est-ce que l'utilisateur existe en BDD ?
            // Sélectionner user avec email et inclure le role, si on ne le trouve pas :
            //      on envoie un message d'erreur dans un objet:  {error: `l'utilisateur n'existe pas !`} et on render `login` en lui passant l'erreur
            // Sinon on continue.

            // Le mot de passe est il correct ?
            // On compare le mots de passe du formulaire avec celui de l'utilisateur
            //      Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: `Mot de passe incorrect`} et on render `login` en lui passant l'erreur

            // On ajoute user a la session

            // On enlève le mot de passe de la session.

            // !! Ne pas modifier cette ligne
            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        // !! Votre code ici
        req.session.user = undefined;
        res.redirect('/');
    },
};

module.exports = sessionController;
