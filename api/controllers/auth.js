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
exports.getUserAccount = (req, res) => {
    //identification du demandeur
    let id = utilsJwt.getUserId(req.headers.authorization);
    db.User.findOne({

            attributes: {
                exclude: ["password"]
            },
            where: {
                id: id
            }
        }).then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({
            'error': error
        }));
}
exports.getAllUsers = (req, res) => {
    db.User.findAll({
            attributes: {
                exclude: ["password"]
            },
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({
            'error': error
        }));

}
exports.updateProfil = (req, res) => {
    let id = utilsJwt.getUserId(req.headers.authorization)
    let profil = {
        email: req.body.email,
        username: req.body.username,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        bio: req.body.bio,
        isAsmin: req.body.isAdmin
    }
    console.log(profil);
    db.User.findOne({
        where:{
            id:id
        }
    })
    .then(() =>{
        db.User.update( profil,{
            where:{
                id:id
            }
        })
        .then(() => {
            return res.status(200).send({
                'message': "Publication modifiée"
            })
        }).catch(error => res.status(400).json({
            error
        }))
    })
}
exports.updateAvatar = (req, res) => {
    //identification du demandeur
    let id = utilsJwt.getUserId(req.headers.authorization);
    models.User.findOne({
            where: {
                id: id
            }
        })
        .then(user => {
            //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
            if (user.isAdmin == JSON.parse(req.body.Admin)) {
                console.log('Modif ok pour le post :');
                //si la requête contienne le nom changer le nom
                models.User
                    .update({
                        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    }, {
                        where: {
                            id: id
                        }
                    })
                    .then(() => res.json({
                        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }))
                    .catch(err => res.status(500).json(err))

            } else {
                res.status(401).json({
                    'error': 'Utilisateur non autorisé à modifier ce post'
                })
            }
        })
        .catch(error => res.status(500).json(error));
}