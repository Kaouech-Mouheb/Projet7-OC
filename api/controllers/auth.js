const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const utilsJwt = require('../utils/jwt.utils');

// LOGIQUE METIER //

exports.register = (req, res, next) => {
    // validation de la requête
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Veuillez remplir toutes les champs"
        });
    }
    // on vérifie si l'utlisateur existe déja
    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    'error': 'Cette utilisateur existe déjà veuillez vous connectez'
                })
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        isAdmin: false,
                    }
                    db.User.create(user)
                        .then(newUser => {
                            return res.status(201).json({
                                'id': newUser.id,
                                'admin': newUser.isAdmin
                            })
                        })
                        .catch(error => {
                            return res.status(501).json({
                                'message': error
                            })
                        })
                })
        })
        .catch(error => {
            return res.status(500).json({
                'error': error
            })
        })
};

exports.login = (req, res, next) => {
    // validation de la requête
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            'error': 'Veuillez remplir toutes les champs'
        })
    }
    //Vérification si l'user existe
    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    'error': 'utilisateur n\'est pas trouvé, veuillez vous enregistrez'
                })
            }
            //comparer les mots de passe des utilisateur
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(403).json({
                            error: 'Mot de passe incorrect'
                        })
                    }
                    res.status(200).json({
                        'userId': user.id,
                        'token': utilsJwt.generateToken(user),
                        'isAdmin': user.isAdmin,
                        'avatar': user.avatar,
                    })
                }).catch(error => res.status(500).json({
                    'Error': error,
                    'message': 'bcryptcompare',
                }))
        })
        .catch(error => {
           return res.status(500).json({
                'error': error
            })
        })
};

