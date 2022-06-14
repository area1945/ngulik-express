const models = require("../../models")
const contact = models.Contact
const commonHelper = require("../../helpers/common")

exports.list = (req, res) => {

   
    let limit = 10;
    let offset = 5;

    contact.findAll({
          offset: offset, 
          limit: limit,
          order: [
            ['id', 'DESC']
          ]
        }).then((data) => {
            let response = {
                "message": "Contact list successfully",
                "data": data,
            }
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
        });
}


exports.create = (req, res) => {
    let formData = req.body
    formData.name = commonHelper.toSlug(formData.name)

    let newData = new contact(formData);
    let result = newData.save();
    result.then((data) => {
        let response = {
            "message": "Contact created successfully",
            "data": data,
        }
        res.send(response);
    })
    .catch((error) => {
        console.log(error);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    let formData = req.body;
    let result = contact.update(formData, { where: { id: id } });
    result.then((data) => {
        let response = {
            "message": "Contact udpated successfully",
            "data": formData,
        }
        res.send(response);
    })
    .catch((error) => {
        console.log(error);
    });
}

exports.detail = (req, res) => {
    contact.findByPk(req.params.id).
        then((data) => {
             let response = {
                "message": "Contact finded successfully",
                "data": data,
            }
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.delete = (req, res) => {
    let id = req.params.id
    contact.destroy({ where: { id: id } }).
        then((data) => {
            res.status(200).json({
                message: "Contact deleted successfully",
                data: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}