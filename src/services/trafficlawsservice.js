import { where } from "sequelize"
import db from "../models/index"



let getAlltrafficlaws = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trafficlaws.findAll()
            resolve({
                errcode: 0,
                errmessage: "get all Trafficlaws success",
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreatetrafficlaws = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data === null || data.purpose === '') {
                resolve({
                    errcode: 1,
                    errmessage: "data null"
                })
            }
            await db.Trafficlaws.create({
                purpose: data.purpose,
                answer_01: data.answer_01,
                answer_02: data.answer_02,
                answer_03: data.answer_03
            })
            resolve({
                errcode: 0,
                errmessage: "create Trafficlaws success"
            })
        } catch (e) {

            reject(e)
        }
    })
}


let displayUpdatetrafficlaws = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === null || inputId === 'null') {
                resolve({
                    errcode: 1,
                    errmessage: "id null"
                })
            }
            let data = await db.Trafficlaws.findOne({
                where: {
                    id: inputId
                }
            })

            if (data === null) {
                resolve({
                    errcode: 2,
                    errmessage: "data null"
                })
            }
            resolve({
                errcode: 0,
                errmessage: "create Trafficlaws success",
                data: data
            })
        } catch (e) {

            reject(e)
        }
    })
}


let handleUpdatetrafficlaws = (data, inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === null || inputId === 'null') {
                resolve({
                    errcode: 1,
                    errmessage: "id null"
                })
            }

            let dataTrafficlaws = await db.Trafficlaws.findOne({
                where: {
                    id: inputId
                }
            })

            dataTrafficlaws.purpose = data.purpose
            dataTrafficlaws.answer_01 = data.answer_01
            dataTrafficlaws.answer_02 = data.answer_02
            dataTrafficlaws.answer_03 = data.answer_03

            await dataTrafficlaws.save()

            resolve({
                errcode: 0,
                errmessage: "update Trafficlaws success"
            })
        } catch (e) {

            reject(e)
        }
    })
}


let handleDeletetrafficlaws = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === null || inputId === 'null') {
                resolve({
                    errcode: 1,
                    errmessage: "id null"
                })
            }

            let deleteTrafficlaws = await db.Trafficlaws.destroy({
                where: { id: inputId }
            })


            resolve({
                errcode: 0,
                errmessage: "delete Trafficlaws success"
            })
        } catch (e) {

            reject(e)
        }
    })
}

module.exports = {
    getAlltrafficlaws: getAlltrafficlaws,
    handleCreatetrafficlaws: handleCreatetrafficlaws,
    displayUpdatetrafficlaws: displayUpdatetrafficlaws,
    handleUpdatetrafficlaws: handleUpdatetrafficlaws,
    handleDeletetrafficlaws: handleDeletetrafficlaws
}