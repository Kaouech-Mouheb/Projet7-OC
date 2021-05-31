//impporter les models de la base de donnée
const db = require('../models');
const utils = require('../utils/jwt.utils');

exports.comment = function (req, res) {
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    console.log(req.body.comment)
    db.Comment.findOne({
            where: {
                UserId: id,
                PublicationId: JSON.parse(req.params.id)
            }
        })
        .then(() => {

            db.Comment.create({
                    PublicationId: JSON.parse(req.params.id),
                    UserId: id,
                    comment: req.body.comment,
                    lastName: req.body.lastName,
                    avatar: req.body.avatar,
                    username: req.body.username
                })
                .then(() => res.status(200).json({
                    'comment': 'Commentaire postulé'
                }))
                .catch(error => res.status(400).json({
                    'error': error

                }))

        })
        .catch(error => res.status(407).json({
            'error': error
        }))


}
exports.deleteComment = function (req, res) {
    let id = utils.getUserId(req.headers.authorization);
    if (Number.isNaN(id)) return res.status(400).end();
    console.log(req.body)
    db.Comment.findOne({
            where: {
                id: req.body.id,
                PublicationId: JSON.parse(req.params.id)
            }
        })
        .then(() => {

            db.Comment.destroy({
                    where: {
                        PublicationId: JSON.parse(req.params.id),
                        id: req.body.id
                    }
                })
                .then(() => res.status(204).json({
                    'message': 'Le commentaire a été supprimé !'
                }))
                .catch(error => res.status(407).json({
                    'error': error
                }))


        })
        .catch(error => res.status(407).json({
            error
        }))

}