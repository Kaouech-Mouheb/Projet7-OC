const bcrypt = require('bcrypt');
const db = require('../models');

const utilsJwt = require('../utils/jwt.utils');

// LOGIQUE METIER //

exports.register = (req, res, next) => {
    // validation de la requête
    if (!req.body.email || !req.body.password || !req.body.username) {
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
    if (Number.isNaN(id)) return res.status(400).end();
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
    let id = utilsJwt.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    let profil = {
        email: req.body.email,
        username: req.body.username,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        bio: req.body.bio,
        isAsmin: req.body.isAdmin
    }
    console.log(profil);
    db.User.findOne({
            where: {
                id: id
            }
        })
        .then(() => {
            db.User.update(profil, {
                    where: {
                        id: id
                    }
                })
                .then(() => {
                    return res.status(200).json({
                        'message': "Publication modifiée"
                    })
                }).catch(error => res.status(400).json({
                    error
                }))
        })
}
exports.updateImage = (req, res) => {
    let id = utilsJwt.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    db.User.findOne({
            where: {
                id: id
            }
        })
        .then(() => {
            db.User.update({
                    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                }, {
                    where: {
                        id: id
                    }
                })
                .then(() => {
                    return res.status(200).send({
                        'message': "Publication modifiée"
                    })
                }).catch(error => res.status(400).json({
                    'error': error
                }))
        })
}

exports.updatePassword = (req, res) => {
    let id = utilsJwt.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    db.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        //comparer les mots de passe des utilisateur
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(403).json({
                        error: 'Ancien Mot de passe incorrect'
                    })
                }
                bcrypt.hash(req.body.newPassword, 10)
                    .then(hash => {
                        db.User.update({
                                password: hash,
                            }, {
                                where: {
                                    id: id
                                }
                            })
                            .then(() => {
                                return res.status(200).json({
                                    'message': "Mot de passe modifier"
                                })
                            }).catch(error => res.status(400).json({
                                'error': error
                            }))

                    })

            }).catch(error => res.status(500).json({
                'Error': error,
                'message': 'bcryptcompare',
            }))
    })

}
exports.deleteAccount = (req, res, next) => {
    let id = utilsJwt.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    db.User.destroy({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                'error': 'No user'
            });
        }

        res.status(204).json({
            'message': 'Compte supprimé'
        })
    }).catch(error => console.log(error))

}