const Sequelize = require('sequelize');
const fs = require("fs");

//impporter les models de la base de donnée
const db = require('../models');
const utils = require('../utils/jwt.utils');

exports.createPublication = (req, res, next) => {
    //identifier le posteur de message
    const id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    const publication = {
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
exports.createPublicationText = (req, res, next) => {
    //identifier le posteur de message
    const id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    const publication = {
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
    const id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    db.Publication.findAll({
            include: [{
                    model: db.User,
                    attributes: ['username', 'lastName', 'avatar', 'id'],
                }, {
                    model: db.Like,
                    attributes: ['like']
                }, {
                    order: Sequelize.literal('updatedAt ASC'),
                    model: db.Comment,
                    attributes: ['id', 'comment', 'createdAt', 'updatedAt', 'UserId', 'PublicationId', 'avatar', 'username', 'lastName']

                }

            ],
            // définir l'ordre pour chaque publication
            order: [Sequelize.literal('updatedAt DESC'),
            //définir l'ordre pour un modél précise
                [{
                    model: db.Comment
                }, Sequelize.literal('updatedAt asc')]
            ]


        })
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({
            'error': "gettallpublication",
            'error': error
        }));
};
exports.updatePublication = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    const publication = {
        content: req.body.content,
    }

    db.Publication.findOne({
        where: {
            id: req.params.id
        }
    }).then(() => {
        //modifier la publication en question 
        return db.Publication.update(publication, {
            where: {
                id: req.params.id
            }

        }).then(() => {
            return res.status(200).send({
                'message': "publication modifiée"
            })
        })
    }).catch(error => res.status(400).json({
        'error': error
    }))

}


exports.deletePublication = (req, res, next) => {
    const id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    db.Publication.findOne({
        where: {
            id: req.params.id
        }
    }).then(pub => {
        //si la publication contient une photo
        if(!pub.attachment){
            return db.Publication.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.status(204).json({
                    'message': 'publication supprimé'
                })
            }).catch(error => res.json({
                error
            }))
        }
        //si non
        const filename = pub.attachment.split('/images/')[1];
        //suprimer le fichier du serveur
        fs.unlink(`images/${filename}`, () => {
            //modifier la publication en question 
            db.Publication.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                return res.status(200).send({
                    'message': 'publication supprimé'
                })
            }).catch(error => res.status(400).json({
                error
            }))
        })
       
    }).catch(error => res.json({
        error
    }))


}
