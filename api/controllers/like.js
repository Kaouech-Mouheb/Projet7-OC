//impporter les models de la base de donnée
const db = require('../models');
const utils = require('../utils/jwt.utils');

exports.like = async function (req, res) {
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    const likeHere = await db.Like.findOne({
        where: {
            UserId: id,
            PublicationId: req.params.id
        }
    })
    if (likeHere) {
        await likeHere.destroy()
            .then(() => res.status(200).json({
                'message': 'like destroy'
            }))
            .catch(error => res.status(400).json({
                'error':error
            }))
    } else {
        await db.Like.create({
                PublicationId: req.params.id,
                UserId: id,
                like:req.body.like
            })
            .then(like => res.status(200).json({
                'likes': like
            }))
            .catch(error => res.status(400).json({
                'error':error
            }))
    }
}