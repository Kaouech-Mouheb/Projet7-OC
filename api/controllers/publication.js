const Sequelize = require('sequelize');
const fs = require("fs");

//impporter les models de la base de donnée
const db = require('../models');
const utils = require('../utils/jwt.utils');

exports.createPublication = (req, res, next) => {
    //identifier le posteur de message
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    let publication = {
        UserId: id,
        content: req.body.content,
        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
    db.User.findOne({
            where: {
                id: id
            }
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    'error': 'utilisateur non trouvé, veuillez vous connectez'
                })
            }

            return db.Publication
                .create(publication)
                .then(pub => {
                    return res.status(201).json({
                        'message': 'Publication publié',
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        'error': error
                    })
                });

        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
            })
        });
}
exports.createPublicationText = (req, res, next) => {
    //identifier le posteur de message
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    let publication = {
        UserId: id,
        content: req.body.content,
    };
    db.User.findOne({
            where: {
                id: id
            }
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    'error': 'utilisateur non trouvé, veuillez vous connectez'
                })
            }

            return db.Publication
                .create(publication)
                .then(() => {
                    return res.status(201).json({
                        'message': 'Publication publié',
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        'error': error
                    })
                });

        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
            })
        });
}
exports.getPublications = (req, res, next) => {

    db.Publication.findAll({
            order: Sequelize.literal('updatedAt DESC'),
            include: [{
                    model: db.User,
                    attributes: ['username', 'lastName', 'avatar']
                },
                {
                    model: db.Like,
                    attributes: ['like', 'dislike']
                }
            ]
        })
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({
            'error': "gettallpublication",
            'error': error
        }));
};
/**
 * 
 * exports.getAllPublication = (req, res, next) => {

    models.Publication.findAll({
            order: Sequelize.literal('updatedAt DESC'),
            include: {
                model: models.User,
                attributes: ['username', 'avatar']
            }
        })
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({
            'error': "gettallpublication",
            'error': error
        }));
};

// récupérer une seul publication
exports.getOnePublication = (req, res, next) => {
    models.Publication.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: models.User,
                attributes: ['username', 'avatar']
            }
        })
        .then(publication => {
            res.status(200).json(publication);
        })
        .catch(error => res.status(400).json({
            error
        }));
};
 * exports.updateAvatar = (req, res) => {
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

//modifier la publication
exports.modifyPublication = (req, res) => {
    // récupérer les valeur envoyer par le backend
    if (req.file) {
        let publication = {
            title: req.body.title,
            content: req.body.content,
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        //trouver la publication en question
        models.Publication.findOne({
            where: {
                id: req.params.id
            }
        }).then(pub => {
            //récupérer le nom du fichier 
            const filename = pub.attachment.split('/images/')[1];
            //suprimer le fichier du serveur
            fs.unlink(`images/${filename}`, () => {
                //modifier la publication en question 
                models.Publication.update(publication, {
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    return res.status(200).send({
                        'message': "Publication modifiée"
                    })
                }).catch(error => res.status(400).json({
                    error
                }))
            })

        }).catch(error => res.status(400).json({
            error
        }))
    } else {
        let publication = {
            title: req.body.title,
            content: req.body.content,
        }
        //trouver la publication en question
        models.Publication.findOne({
            where: {
                id: req.params.id
            }
        }).then(() => {
            //modifier la publication en question 
            models.Publication.update(publication, {
                where: {
                    id: req.params.id
                }

            }).then(() => {
                return res.status(200).send({
                    'message': "Publication modifiée"
                })
            })
        }).catch(error => res.status(400).json({
            error
        }))
    }

}
exports.deletePublication = (req, res, next) => {
    try {
        models.Publication.findOne({
            where: {
                id: req.params.id
            }
        }).then(publication => {
            //récupérer le nom du fichier 
            const filename = publication.attachment.split('/images/')[1];
            //supprimer le fichier du dossier image
            fs.unlink(`images/${filename}`, () => {
                models.Publication.sequelize.query(
                    `DELETE Publications, Likes FROM Publications INNER JOIN Likes ON Publications.id = Likes.PublicationId WHERE Publications.id = ${req.params.id}`
                ).then(() => {
                    return res.status(200).send({
                        ' message': "Publication supprimée"
                    })
                }).catch(error => res.status(400).json({
                    error
                }))

            })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            err
        });
    }
}
 */