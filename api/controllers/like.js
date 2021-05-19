//impporter les models de la base de donnée
const db = require('../models');
const utils = require('../utils/jwt.utils');

exports.like = async function (req, res) {
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    db.Like.findOne({
            where: {
                UserId: id,
                PublicationId: JSON.parse(req.params.id)
            }
        })
        .then(like => {
            if (like) {
                db.Like.destroy({
                    where:{
                        UserId:id,
                        PublicationId: JSON.parse(req.params.id)
                    }
                })
                    .then(() => res.status(204).json({
                        'message': 'like destroy'
                    }))
                    .catch(error => res.status(407).json({
                        error
                    }))
            } else {
                db.Like.create({
                        PublicationId: JSON.parse(req.params.id),
                        UserId: id,
                        like: req.body.like
                    })
                    .then(like => res.status(200).json({
                        'likes': like
                    }))
                    .catch(error => res.status(400).json({
                        'error': error
                    }))
            }

        })
        .catch(error => res.status(407).json({
            error
        }))


}