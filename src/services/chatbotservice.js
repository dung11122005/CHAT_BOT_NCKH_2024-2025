import { response } from "express";
import request from "request";
require('dotenv').config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v19.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let getusername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        let username = '';
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "GET",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                username = `${response.first_name}${response.last_name}`
                resolve(username)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
        return username
    })

}
let hendlegetstarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getusername(sender_psid);
            let response = { "text": `XIN CHÀO ${username} NHÉ, TỚ LÀ DŨNG RẤT VUI ĐƯỢC TRÒ CHUYỆN VỚI CẬU` }
            await callSendAPI(sender_psid, response)
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    hendlegetstarted: hendlegetstarted

}