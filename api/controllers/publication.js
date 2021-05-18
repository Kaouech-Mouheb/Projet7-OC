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
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

    db.Publication.findAll({
            order: Sequelize.literal('updatedAt DESC'),
            include: [{
                    model: db.User,
                    attributes: ['username', 'lastName', 'avatar']
                }, {
                    model: db.Like,
                    attributes: ['like']
                }

            ]
        })
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({
            'error': "gettallpublication",
            'error': error
        }));
};
exports.updatePublication = (req, res) => {
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    let publication = {
        content: req.body.content,
    }

    db.Publication.findOne({
        where: {
            id: req.params.id
        }
    }).then(pub => {
        //vérifier si vous êtes le propiétaire de cette publication
        if (pub.UserId != id) {
            return res.status(409).json({
                'error': "vous n'êtes pas autorisé à modifier cette publication"
            })
        }
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
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();

        db.Publication.findOne({
            where:{
                id: req.params.id
            }
        }).then(pub =>{
            if (pub.UserId != id) {
                return res.status(409).json({
                    'error': "vous n'êtes pas autorisé à supprimer cette publication"
                })
            }
            return db.Publication.destroy({
                where:{
                    id: req.params.id
                }
            })
            .then(() =>{
                res.status(204).json({
                    'message': 'publication supprimé'
                })
            }).catch(error => res.json({error}))
        }).catch(error => res.json({error}))


}