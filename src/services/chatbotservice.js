import { response } from "express";
import { interactive } from "node-wit";
import db from "../models/index"
import request from "request";
require('dotenv').config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = ''
let callSendAPI = async (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    await sendmarkreadmessenge(sender_psid)
    await sendtypingon(sender_psid)
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





let sendtypingon = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v19.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message send typingon!')
        } else {
            console.error("Unable to send typingon:" + err);
        }
    });
}
let sendmarkreadmessenge = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v19.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message send typingon!')
        } else {
            console.error("Unable to send typingon:" + err);
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
            let response1 = await { "text": `XIN CHÀO ${username} NHÉ, TỚ LÀ CHATBOT LUẬT GIAO THÔNG RẤT VUI ĐƯỢC TRÒ CHUYỆN VỚI CẬU` }
            let response2 = await getstartedtemplate();
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
let getstartedtemplate = async () => {
    let response = await {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "HCMUE CHÀO BẠN",
                    "subtitle": "DƯỚI ĐÂY LÀ MỘT SỐ TÙY CHỌN HCMUE",
                    "image_url": 'https://jobtest.vn/hrblog/wp-content/uploads/2022/07/hoc-phi-dai-hoc-su-pham-tphcm-anh-1.jpg',
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "PAGE HCMUE",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_TUYEN_SINH}`,
                            "title": "HCMUE ONLINE",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true //false : open the webview in new tab
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
                        "title": "ĐẠI HỌC SƯ PHẠM TPHCM",
                        "subtitle": "CHẤT LƯỢNG - SÁNG TẠO - NHÂN VĂN",
                        "image_url": 'https://www.dongphucthienphuoc.vn/wp-content/uploads/2023/01/logo-truong-dai-hoc-su-pham-hcmue-mang-y-nghia-gi.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CÔNG TÁC CHÍNH TRỊ",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "PAGE CÁC KHOA",
                                "payload": "DINNER_MENU",
                            }
                        ],
                    }, {
                        "title": "THÔNG TIN TUYỂN SINH",
                        "subtitle": "HCMUE là ngôi trường đào tạo giáo viên tốt nhất phía nam",
                        "image_url": 'https://cdn.tuoitre.vn/471584752817336320/2024/7/10/screenshot20240710-185451gallery-17206125470211857750614.jpg',
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_TUYEN_SINH}`,
                                "title": "THÔNG TIN TUYỂN SINH",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //false : open the webview in new tab
                            }
                        ],
                    }, {
                        "title": "THÔNG TIN THÊM VỀ HCMUE",
                        "subtitle": "Ho Chi Minh City University of Education HCMUE) được thành lập ngày 27 tháng 10 năm 1976",
                        "image_url": 'https://vnn-imgs-f.vgcloud.vn/2018/04/27/17/cu-soc-cua-giang-vien-ngay-dau-vao-sai-gon-sau-giai-phong-3.jpg',
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
                        "title": "CÔNG TÁC CHÍNH TRỊ",
                        "subtitle": "PHÒNG CÔNG TÁC CHÍNH TRỊ & HỌC SINH SINH VIÊN",
                        "image_url": 'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/459276323_885002870275661_8392065913991818974_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LDrWb7pOBowQ7kNvgFdc-ne&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=AIIr1go3rm28oazFQUI0Rrr&oh=00_AYDWL9kgbQIng3NERu6DInrI5Nr8znGrDtxMkA3ikssekw&oe=66FFEFE9',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "CTCC_MENU",
                            }
                        ],
                    }, {
                        "title": "PAGE PHÒNG CTCC & HỌC SINH SINH VIÊN",
                        "subtitle": "Fanpage dùng để cung cấp thông tin về công tác sinh viên tại Trường Đại học Sư phạm TP. Hồ Chí Minh",
                        "image_url": 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/456036919_869074158535199_4201510221674934249_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=02py9k3CNwkQ7kNvgEwKZPn&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=AfGEstJMQQGQU-_JgOnphbi&oh=00_AYBZJ5ouxXWsIXu_r2VDudg6pNJItbKc_KAbpHNdFRb1xg&oe=66FFFF99',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "PAGE_CTCC_MENU",
                            }
                        ],
                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
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
                        "title": "KHOA CÔNG NGHỆ THÔNG TIN",
                        "subtitle": "NĂNG ĐỘNG - HIỆN ĐẠI - SÁNG TẠO",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/CNTT.png',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "APPETIZER_MENU",
                            }
                        ],
                    }, {
                        "title": "KHOA GIÁO DỤC TIỂU HỌC",
                        "subtitle": "TẤT CẢ VÌ SỰ NGHIỆP GIÁO DỤC",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/TH.png',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "MAIN_DISHIS_MENU",
                            }
                        ],
                    }, {
                        "title": "KHOA TOÁN - TIN HỌC",
                        "subtitle": "CHẤT LƯỢNG – HỘI NHẬP – PHÁT TRIỂN",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/Toan1.png',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "DESSERTS_MENU",
                            }
                        ],
                    }, {
                        "title": "KHOA NGỮ VĂN",
                        "subtitle": "SÁNG TẠO - NHÂN VĂN - THỰC TIỄN",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/van.png',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "DRINKS_MENU",
                            }
                        ],
                    }, {
                        "title": "KHOA LỊCH SỬ",
                        "subtitle": "BIẾT QUÁ KHỨ - HIỂU HIỆN TẠI - XÂY ĐẮP TƯƠNG LAI",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/SU.png',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "MUSIC_MENU",
                            }
                        ],
                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI TRANG CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}





let hendledetailviewappetizer = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewappetizertemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewappetizertemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "HCMUE KHOA CNTT",
                        "subtitle": "https://hcmue.edu.vn/vi/khoa-bo-mon/khoa-cntt",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/CNTT.png',

                    }, {
                        "title": "PAGE KHOA CNTT",
                        "subtitle": "https://www.facebook.com/FITHCMUE/",
                        "image_url": 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-1/197112880_157116983105233_7668388981866602039_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=616b0e&_nc_ohc=dOBWbFD6htUQ7kNvgHrDyrr&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=APZqXEcof2vrCXFeGUFRe_s&oh=00_AYCztEmMjuMEcB2IgoCJTaBzV1le4nbRV9DYzCv1Fohisg&oe=6721A8BC',

                    }, {
                        "title": "PAGE THÔNG TIN ĐOÀN HỘI CNTT",
                        "subtitle": "https://www.facebook.com/doanhoicntt.hcmue/?locale=vi_VN",
                        "image_url": 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-1/459545064_1299850701430497_5543728634499576365_n.jpg?stp=dst-jpg_s200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=Aj6GbqL8RkcQ7kNvgGWuk5b&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=AYRvcEg9HqnXqQqadKrs4Md&oh=00_AYCb45ySxVQFvdHn_O5H4FeNZss_IdxBsqOuHYyz5u2U-g&oe=67001009',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI TRANG CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}



let hendledetailviewroomCTCC = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewroomCTCCtemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewroomCTCCtemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "TIN TỨC - SỰ KIỆN",
                        "subtitle": "https://ctsv.hcmue.edu.vn/",
                        "image_url": 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/A_SP_HCMUE.jpg/800px-A_SP_HCMUE.jpg',

                    }, {
                        "title": "CHÍNH SÁCH SINH VIÊN",
                        "subtitle": "https://ctsv.hcmue.edu.vn/?top-category=7",
                        "image_url": 'https://jobtest.vn/hrblog/wp-content/uploads/2022/07/hoc-phi-dai-hoc-su-pham-tphcm-anh-4.jpg',

                    }, {
                        "title": "HỖ TRỢ SINH VIÊN",
                        "subtitle": "https://www.facebook.com/doanhoicntt.hcmue/?locale=vi_VN",
                        "image_url": 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/116745704_1123555441379245_2652313142206196076_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=VNhHDX2YXwgQ7kNvgEi_QmA&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=AKgWSVz4Pjz82YQLv4exVSR&oh=00_AYDSXl0gm8ef3_9SI9GZirX0vW83qTNgohxdf6Lr82mWPw&oe=6721AB15',

                    }, {
                        "title": "HỌC BỔNG",
                        "subtitle": "https://www.facebook.com/doanhoicntt.hcmue/?locale=vi_VN",
                        "image_url": 'https://www.vietjack.com/thong-tin-tuyen-sinh/images/truong-dai-hoc-su-pham-tp-ho-chi-minh-179842.PNG',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI TRANG CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}


let hendledetailviewpageroomCTCC = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewpageroomCTCCtemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewpageroomCTCCtemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Phòng CTCT và Học sinh, sinh viên Trường Đại học Sư phạm TP.HCM",
                        "subtitle": "https://www.facebook.com/phongctct.hcmue/?locale=vi_VN",
                        "image_url": 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/A_SP_HCMUE.jpg/800px-A_SP_HCMUE.jpg',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI TRANG CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}



let hendledetailviewdishis = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewdishistemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewdishistemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "HCMUE KHOA GDTH",
                        "subtitle": "https://hcmue.edu.vn/vi/khoa-bo-mon/khoa-gdth",
                        "image_url": 'https://hcmue.edu.vn/images/Faculty_Logos/TH.png',

                    }, {
                        "title": "PAGE CỔNG THÔNG TIN KHOA GDTH",
                        "subtitle": "https://www.facebook.com/congthongtinkhoagdth/",
                        "image_url": 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/456705553_973468437911911_8619797593824065497_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=8yhTQJJvY8sQ7kNvgF2h18W&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYDEUb70EmId0DmDPrJN8PffwmyJjNbVJ4-KDkZ8QmhGRQ&oe=67000C7B',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}






let hendledetailviewdesserts = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewdessertstemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewdessertstemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "CHÈ VẢI HẠT SEN",
                        "subtitle": "Chè vải hạt sen là món chè thanh mát, thơm ngon, bổ dưỡng được nhiều người yêu thích, đặc biệt là vào những ngày hè nóng bức",
                        "image_url": 'https://cdn.tgdd.vn/Files/2017/05/29/987245/cach-nau-che-vai-hat-sen-an-la-phai-khen-1-760x367.jpg',

                    }, {
                        "title": "BÁNH DA LỢN",
                        "subtitle": "Bánh da lợn là món bánh dân dã, quen thuộc với nhiều người Việt Nam. Món bánh này có hương vị thơm ngon, béo ngậy",
                        "image_url": 'https://thamhiemmekong.com/wp-content/uploads/2019/10/banh-da-lon-2.jpg',

                    }, {
                        "title": "BÁNH CHUỐI",
                        "subtitle": "Heo rừng là thực phẩm quý hiếm, được nhiều người yêu thích bởi hương vị thơm ngon, bổ dưỡng",
                        "image_url": 'https://vcdn-giadinh.vnecdn.net/2021/11/30/240528902-2582695311876336-658-5315-8703-1638235172.jpg',

                    }, {
                        "title": "BÁNH NGỌT",
                        "subtitle": "Bánh ngọt là món tráng miệng phổ biến nhất trong nhà hàng",
                        "image_url": 'https://vcdn1-dulich.vnecdn.net/2016/08/23/banhngon2-1471922491.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=JLN0JUIPBwClQeiatvJWQQ',

                    }, {
                        "title": "KEM",
                        "subtitle": "Kem là một món tráng miệng lạnh, ngọt ngào",
                        "image_url": 'https://cdn.tgdd.vn/2022/10/CookDishThumb/cach-trang-tri-kem-ly-kem-vien-xinh-xan-va-dep-mat-thumb-620x620.jpg',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}





let hendledetailviewdrinks = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewdrinkstemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewdrinkstemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "NƯỚC TRÁI CÂY",
                        "subtitle": "Nước trái cây là nguồn cung cấp vitamin, khoáng chất và chất chống oxy hóa dồi dào",
                        "image_url": 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/posts/uong-nuoc-ep-1.webp',

                    }, {
                        "title": "BIA",
                        "subtitle": "Bia là một thức uống phổ biến trên toàn thế giới và được ưa chuộng bởi hương vị thơm ngon, sảng khoái",
                        "image_url": 'https://media.baoquangninh.vn/upload/image/202403/medium/2188102_b90cef472719fd947dd8a9c1c43e5917.jpg',

                    }, {
                        "title": "RƯỢU",
                        "subtitle": "Rượu là một loại đồ uống có cồn được sản xuất từ quá trình lên men tinh bột, đường hoặc trái cây",
                        "image_url": 'https://www.hoteljob.vn/files/Anh-Hoteljob-Ni/Nam-2019/Thang-6/Bo-sung-3/huong-dan-cach-gioi-thieu-ruou-vang-danh-cho-nhan-vien-nha-hang-02.jpg',

                    }, {
                        "title": "COCA COLA",
                        "subtitle": "Coca-Cola là một loại nước ngọt có ga nổi tiếng với lịch sử lâu đời",
                        "image_url": 'https://pos.nvncdn.com/d5d413-108013/ps/20230228_XddB8N1HrvD8pzEU.jpeg',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}



let hendledetailviewmusic = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getditailviewmusictemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getditailviewmusictemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "ÂM NHẠC",
                        "subtitle": "T2 - T6 từ 7PM30 - 10PM, T7 từ 8PM - 11PM, CN từ 7PM - 11PM",
                        "image_url": 'https://bizweb.dktcdn.net/100/127/787/files/295575282-502817108186499-3820513038597196827-n.jpg?v=1670473477126',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://tuyensinhmut.edu.vn/wp-content/uploads/2022/09/truong-dai-hoc-su-pham-tphcm-1.jpeg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}






let hendleshowdetailroom = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getimageroomtempale();
            let response2 = getbuttonroomtemplate();
            // send teck masseges
            await callSendAPI(sender_psid, response1)
            await callSendAPI(sender_psid, response2)
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getimageroomtempale = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://i.gifer.com/Sfs.gif",
                "is_reusable": true
            }
        }
    }
    return response
}
let getbuttonroomtemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "NHÀ HÀNG CÓ THỂ PHỤC VỤ TỐI ĐA 500 KHÁCH",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "QUAY LẠI",
                        "payload": "BACK_TO_MAIN_MENU",
                    }, {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                        "title": "ĐẶT BÀN",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false : open the webview in new tab
                    }
                ]
            }
        }
    }
    return response
}



// Gửi tin nhắn tới Wit.ai và xử lý kết quả
let handleException = async (senderId, messageText) => {
    try {
        fetch(`https://api.wit.ai/message?v=20240921&q=${encodeURIComponent(messageText)}`, {
            headers: {
                'Authorization': `Bearer ${process.env.SERVER_ACCESS_TOKEN}`,  // Thêm dấu nháy kép
            }
        })
            .then(response => response.json())
            .then(async data => {
                const intent = data.intents && data.intents.length > 0 ? data.intents[0].name : null;
                const confidence = data.intents && data.intents.length > 0 ? data.intents[0].confidence : 0;
                let replyMessage1 = 'Tôi không hiểu bạn hỏi gì, hoặc câu hỏi không liên quan đến Luật giao thông'
                let replyMessage2 = null
                let replyMessage3 = null
                let imageUrl = null

                let answer = await db.Trafficlaws.findOne({
                    where: {
                        purpose: intent
                    }
                })

                try {
                    if (answer != null) {
                        replyMessage1 = answer.answer_01
                        replyMessage2 = answer.answer_02
                        replyMessage3 = answer.answer_03
                        imageUrl = answer.image
                    } else {
                        await db.Unanswereds.create({
                            question: messageText
                        })
                    }
                } catch (error) {

                }




                //console.log('>>>>>>>>>>>>  answer_01', answer_01)

                // Gửi tin nhắn phản hồi lại cho người dùng
                await sendMessage(senderId, replyMessage1, imageUrl);
                await sendMessage(senderId, replyMessage2);
                await sendMessage(senderId, replyMessage3);
            })
            .catch(error => {
                console.error('Error from Wit.ai:', error);
            });
    } catch (error) {

    }

};

// Gửi tin nhắn phản hồi lại Facebook Messenger
function sendMessage(senderId, text, imageUrl = null) {

    // Kiểm tra nếu có hình ảnh, thì gửi ảnh
    if (imageUrl) {
        messageData = {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url: imageUrl,
                        is_reusable: true
                    }
                }
            }
        };
    }

    fetch(`https://graph.facebook.com/v15.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipient: { id: senderId },
            message: { text: text },
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}




module.exports = {
    hendlegetstarted: hendlegetstarted,
    hendlesendmainmenu: hendlesendmainmenu,
    hendlegetlunchmenu: hendlegetlunchmenu,
    hendlegetdinnermenu: hendlegetdinnermenu,
    hendledetailviewappetizer: hendledetailviewappetizer,
    hendledetailviewdishis: hendledetailviewdishis,
    hendledetailviewdesserts: hendledetailviewdesserts,
    hendledetailviewdrinks: hendledetailviewdrinks,
    hendledetailviewmusic: hendledetailviewmusic,
    hendleshowdetailroom: hendleshowdetailroom,
    callSendAPI: callSendAPI,
    handleException: handleException,
    hendledetailviewroomCTCC: hendledetailviewroomCTCC,
    hendledetailviewpageroomCTCC: hendledetailviewpageroomCTCC
}