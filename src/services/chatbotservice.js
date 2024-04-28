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
            let response2 = getstartedtemplate();
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
let getstartedtemplate = () => {
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



let hendlesendmainmenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getmainmenutemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getmainmenutemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "MENU CỦA NHÀ HÀNG",
                        "subtitle": "CHÚNG TÔI HÂN HẠNH MANG ĐẾN CHO BẠN MỘT BỮA ĂN THẬT NGON MIỆNG",
                        "image_url": 'https://www.hoteljob.vn/files/marketing-nha-hang-nhung-y-tuong-doc-dao-hieu-qua-tonglago.com1.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BỮA TRƯA",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "BỮA TỐI",
                                "payload": "DINNER_MENU",
                            }
                        ],
                    }, {
                        "title": "GIỜ MỞ CỬA",
                        "subtitle": "T2-T6 10AM - 11PM | T7 5PM - 10PM | CN 5PM - 10PM",
                        "image_url": 'https://www.hoteljob.vn/files/Anh-HTJ-Hong/van-hoa-am-thuc-phuong-tay-7.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT BÀN",
                                "payload": "RESERVE_TABLE",
                            }
                        ],
                    }, {
                        "title": "KHÔNG GIAN NHÀ HÀNG",
                        "subtitle": "NHÀ HÀNG CÓ SỨC CHỨA LÊN TỚI 500 KHÁCH NGỒI VÀ TƯƠNG TỰ TIỆC ĐÁM CƯỚI",
                        "image_url": 'https://www.hoteljob.vn/files/Anh-HTJ-Hong/van-hoa-an-buffet-5.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}



let hendlegetlunchmenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getlunchmenutemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getlunchmenutemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "MÓN KHAI VỊ",
                        "subtitle": "NHÀ HÀNG CHÚNG TÔI CÓ RẤT NHIỀU MÓN KHAI VỊ HẤP DẪN",
                        "image_url": 'https://cdn.tgdd.vn/Files/2022/04/04/1423782/goi-y-8-mon-nguoi-khai-vi-cho-nhung-buoi-tiec-hoi-hop-voi-gia-dinh-202204040912057499.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "APPETIZER_MENU",
                            }
                        ],
                    }, {
                        "title": "MÓN CHÍNH",
                        "subtitle": "NHÀ HÀNG CHÚNG TÔI CÓ RẤT NHIỀU MÓN ĂN, ĐẶC SẢN TỪNG VÙNG MIỀN",
                        "image_url": 'https://haithuycatering.com/image/5c16265d51046d5028912183/original.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "MAIN_DISHIS_MENU",
                            }
                        ],
                    }, {
                        "title": "MÓN TRÁNG MIỆNG",
                        "subtitle": "MÓN TRÁNG MIỆNG CỦA NHÀ HÀNG CHÚNG TÔI SẼ LÀM CHO QUÝ KHÁCH HÀI LÒNG",
                        "image_url": 'https://suckhoedoisong.qltns.mediacdn.vn/Images/phamhiep/2016/08/09/1_11.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "DESSERTS_MENU",
                            }
                        ],
                    }, {
                        "title": "ĐỒ UỐNG",
                        "subtitle": "THỨC UỐNG CỦA NHÀ HÀNG CHÚNG TÔI RẤT PHONG PHÚ VÀ NGON MIỆNG",
                        "image_url": 'https://vus.edu.vn/wp-content/uploads/2023/12/do-uong-tieng-anh.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "DRINKS_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}



let hendlegetdinnermenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getdinnermenutemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getdinnermenutemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "MÓN KHAI VỊ",
                        "subtitle": "NHÀ HÀNG CHÚNG TÔI CÓ RẤT NHIỀU MÓN KHAI VỊ HẤP DẪN",
                        "image_url": 'https://cdn.tgdd.vn/Files/2022/04/04/1423782/goi-y-8-mon-nguoi-khai-vi-cho-nhung-buoi-tiec-hoi-hop-voi-gia-dinh-202204040912057499.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "APPETIZER_MENU",
                            }
                        ],
                    }, {
                        "title": "MÓN CHÍNH",
                        "subtitle": "NHÀ HÀNG CHÚNG TÔI CÓ RẤT NHIỀU MÓN ĂN, ĐẶC SẢN TỪNG VÙNG MIỀN",
                        "image_url": 'https://haithuycatering.com/image/5c16265d51046d5028912183/original.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "MAIN_DISHIS_MENU",
                            }
                        ],
                    }, {
                        "title": "MÓN TRÁNG MIỆNG",
                        "subtitle": "MÓN TRÁNG MIỆNG CỦA NHÀ HÀNG CHÚNG TÔI SẼ LÀM CHO QUÝ KHÁCH HÀI LÒNG",
                        "image_url": 'https://suckhoedoisong.qltns.mediacdn.vn/Images/phamhiep/2016/08/09/1_11.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "DESSERTS_MENU",
                            }
                        ],
                    }, {
                        "title": "ĐỒ UỐNG",
                        "subtitle": "THỨC UỐNG CỦA NHÀ HÀNG CHÚNG TÔI RẤT PHONG PHÚ VÀ NGON MIỆNG",
                        "image_url": 'https://vus.edu.vn/wp-content/uploads/2023/12/do-uong-tieng-anh.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "DRINKS_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}



module.exports = {
    hendlegetstarted: hendlegetstarted,
    hendlesendmainmenu: hendlesendmainmenu,
    hendlegetlunchmenu: hendlegetlunchmenu,
    hendlegetdinnermenu: hendlegetdinnermenu
}