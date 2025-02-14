import { where } from "sequelize"
import db from "../models/index"

let getAllUnanswereds = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Unanswereds.findAll();
            resolve({
                errcode: 0,
                errmessage: "get all Unanswereds success",
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}


let handleDeleteUnanswereds = async (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === null || inputId === 'null') {
                resolve({
                    errcode: 1,
                    errmessage: "id null"
                })
            }

            let deleteUnanswereds = await db.Unanswereds.destroy({
                where: { id: inputId }
            })


            resolve({
                errcode: 0,
                errmessage: "delete Unanswereds success"
            })
        } catch (e) {

            reject(e)
        }
    })
}

module.exports = {
    getAllUnanswereds: getAllUnanswereds,
    handleDeleteUnanswereds: handleDeleteUnanswereds
}