import { response } from "express";
import request from "request";
require('dotenv').config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = 'https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg'
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
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN} `,
            "method": "GET"
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`
                resolve(username)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })

}
let hendlegetstarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getusername(sender_psid);
            let response1 = { "text": `XIN CHÀO ${username} NHÉ, TỚ LÀ DŨNG RẤT VUI ĐƯỢC TRÒ CHUYỆN VỚI CẬU` }
            let response2 = sendgetstartedtemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            //send generic template messenge
            await callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let sendgetstartedtemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "XIN CHÀO BẠN ĐẾN VỚI NHÀ HÀNG CỦA DŨNG",
                    "subtitle": "DƯỚI ĐÂY LÀ MỘT SỐ TÙY CHỌN CỦA NHÀ HÀNG",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU_CHÍNH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "ĐẶT BÀN",
                            "payload": "RESERVE_TABLE",
                        },
                        {
                            "type": "postback",
                            "title": "CÁCH SỬ DỤNG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response
}


module.exports = {
    hendlegetstarted: hendlegetstarted

}