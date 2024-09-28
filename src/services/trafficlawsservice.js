import db from "../models/index"



let getAlltrafficlaws = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.public.Trafficlaws.findAll()
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
            if (data == null || data.purpose == '') {
                resolve({
                    errcode: 1,
                    errmessage: "data null"
                })
            }
            db.public.Trafficlaws.create({
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

module.exports = {
    getAlltrafficlaws: getAlltrafficlaws,
    handleCreatetrafficlaws: handleCreatetrafficlaws
}