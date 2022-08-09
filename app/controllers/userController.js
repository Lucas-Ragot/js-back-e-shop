const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        // register a user here
        try {
            // !! votre code à partir d'ici
            const {firstname, lastname, email, password, passwordConfirm} = req.body
            for(const field in req.body){
                let body = req.body;
                if(!body[field]){
                    return res.render('register',{error:`${field} non renseigné`})
                }
            }
            // verif email here avec email-validator
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if(!emailValidator.validate(email)){
                return res.render('register',{error:`Email incorrect`})
            }else if(user){
                return res.render('register',{error:`Cette email est déjà utilisé`})
            }
            
            // verif password === password confirm
            if(password !== passwordConfirm){
                return res.render('register',{error:`Les mots de passe ne sont pas identique`})
            }
            // Hash password with salt
            req.body.password = await bcrypt.hash(password,10)
            // Attribuer un rôle ici, vous devrez auparavant en sélectionner un depuis la BDD : le role customer.
            const role = await Role.findOne({
                where:{
                    name:'customer'
                }
            })
            await User.create({
                name:`${firstname} ${lastname}`,
                email:email,
                password:req.body.password,
                role_id:role.id,
            });
            // sauvegarder user

            // !! ne pas modifier cette ligne
            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;
