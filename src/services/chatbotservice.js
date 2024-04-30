import { response } from "express";
import request from "request";
require('dotenv').config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = 'https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg'
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
                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                    }, {
                        "title": "ĐÊM ÂM NHẠC",
                        "subtitle": "ÂM NHẠC LÀ LIỀU THUỐC CHỮA LÀNH MỌI VẾT THƯƠNG",
                        "image_url": 'https://bazaarvietnam.vn/wp-content/uploads/2022/06/Harpers-Bazaar-san-khau-ca-nhac-ta%CC%A3i-Da-Lat_LULULOLA_03-scaled.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "MUSIC_MENU",
                            }
                        ],
                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                        "title": "SÒ HUYẾT TỨ XUYÊN",
                        "subtitle": "Sò huyết sốt Tứ Xuyên là món ăn khá nổi tiếng và được ưa chuộng bởi hương vị thơm ngon, đậm đà và cay nồng đặc trưng của ẩm thực Tứ Xuyên",
                        "image_url": 'https://beptruong.edu.vn/wp-content/uploads/2016/01/mon-so-huyet-sot-tu-xuyen.jpg',

                    }, {
                        "title": "GỎI NGÓ XEN",
                        "subtitle": "Gỏi ngó sen tôm thịt là món ăn thanh mát, giòn ngon, thích hợp để giải ngán trong những ngày hè nóng bức",
                        "image_url": 'https://www.unileverfoodsolutions.com.vn/dam/global-ufs/mcos/phvn/vietnam/calcmenu/recipes/VN-recipes/vegetables-&-vegetable-dishes/g%E1%BB%8Fi-ng%C3%B3-sen-t%C3%B4m-th%E1%BB%8Bt/Goi-Ngo-Sen_Web.jpg',

                    }, {
                        "title": "GỎI CỦ HỦ DỪA",
                        "subtitle": "Gỏi củ hủ dừa là món ăn thanh mát, giòn ngon, thích hợp cho những ngày hè nóng bức",
                        "image_url": 'https://amthuc10phut.vn/wp-content/uploads/2022/11/goi-cu-hu-dua-tom-thit.jpg',

                    }, {
                        "title": "CÀNG CUA BÁCH HOA",
                        "subtitle": "Món ăn này có hương vị thơm ngon, hấp dẫn và cách bày trí bắt mắt, mang đến sự sang trọng cho mâm cỗ",
                        "image_url": 'https://monngonmoingay.com/wp-content/uploads/2015/08/IMG-4078-cang-cua-bach-hoa.png',

                    }, {
                        "title": "SƯỜN KINH ĐÔ",
                        "subtitle": "Sườn Kinh Đô là món ăn độc đáo với hương vị thơm ngon, đậm đà, mang đậm dấu ấn của ẩm thực Trung Hoa",
                        "image_url": 'https://haithuycatering.com/image/5c14717b51046d1d87e6fc36/thumbnail.jpg',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                        "title": "CÁ LÓC HẤP BẦU",
                        "subtitle": "Cá lóc hấp bầu là món ăn dân dã, thanh mát, bổ dưỡng và được nhiều người yêu thích",
                        "image_url": 'https://pastaxi-manager.onepas.vn/content/uploads/articles/huanphan/quan-an-ngon/ca-loc-hap-bau-quan-an-ngon-1.jpg',

                    }, {
                        "title": "TÔM NƯỚNG PHOMAI",
                        "subtitle": "Tôm nướng phô mai là món ăn thơm ngon, béo ngậy, hấp dẫn được nhiều người yêu thích",
                        "image_url": 'https://i-giadinh.vnecdn.net/2022/12/24/Buoc-6-Thanh-pham-6-3320-1671873498.jpg',

                    }, {
                        "title": "HEO RỪNG 7 MÓN",
                        "subtitle": "Heo rừng là thực phẩm quý hiếm, được nhiều người yêu thích bởi hương vị thơm ngon, bổ dưỡng",
                        "image_url": 'https://vietpho.com.vn/public/uploads/files/Tin%20Tuc/z4285777440778_d6fb69b018eb0649da2ca45f8f1a1d90.jpg',

                    }, {
                        "title": "GÀ NƯỚNG LU",
                        "subtitle": "Món ăn này được chế biến bằng cách nướng gà nguyên con trong lu đất, tạo nên hương vị đặc trưng",
                        "image_url": 'https://chumrestaurant.com/wp-content/uploads/2021/11/Ga-nuong-lu-500x500-1.jpg',

                    }, {
                        "title": "LẨU CUA ĐỒNG",
                        "subtitle": "Lẩu cua đồng là món ăn dân dã, quen thuộc trong mâm cơm của người Việt Nam, đặc biệt là vào những ngày se lạnh",
                        "image_url": 'https://gasbanmai.com/wp-content/uploads/2023/05/lau-cua-dong.jpg',

                    }, {
                        "title": "QUAY TRỞ LẠI",
                        "subtitle": "QUAY TRỞ LẠI MENU CHÍNH",
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                        "image_url": 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/9.jpg',
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
                        "type": "postback",
                        "title": "ĐẶT BÀN",
                        "payload": "RESERVE_TABLE",
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
    hendlegetdinnermenu: hendlegetdinnermenu,
    hendledetailviewappetizer: hendledetailviewappetizer,
    hendledetailviewdishis: hendledetailviewdishis,
    hendledetailviewdesserts: hendledetailviewdesserts,
    hendledetailviewdrinks: hendledetailviewdrinks,
    hendledetailviewmusic: hendledetailviewmusic,
    hendleshowdetailroom: hendleshowdetailroom
}