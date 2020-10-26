const UserModel = require('../models/UserModel');

module.exports = {
    create: (req, res) => {
        let user = new UserModel({
           name: req.body.name,
           email: req.body.email,
           password: req.body.hashedPassword //NEEDS ATTENTION
        })
        user.save()
        .then(result => {
            res.json({ success: true, result: result})
        })
        .catch(err => {
             res.json({ success: false, result: err})
            })
    },

    update: (req, res) => {
    UserModel.update({_id: req.body._id}, req.body)
    .then(user => {
        if (!user) res.json({ success: false, result: "user does not exists"})

        res.json(user)
    })
      .catch(err => {
          res.json({ success: false, result: err})
      })
    },

    retrieve: (req, res) => {
        UserModel.find()
        .then(user => {
            if (!user) res.json({ success: false, result: "user not found"})

            res.json({ sucess: true, result: result})
        })
        .catch(err => {
            res.json({ success: false, result: err})
        })
    },

    delete: (req, res) => {
        UserModel.remove({ _id: req.body._id})
        .then(user => {
            if (!user) res.json({ success: false, result: "No user with such ID was found" })
            res.json({ success: true, result: result })
        })
        .catch(err => res.json({success: false, result: err}))
    }
}
