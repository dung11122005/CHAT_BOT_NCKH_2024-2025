require('dotenv').config();
import request from 'request';
import chatbotservice from '../services/chatbotservice'
const { Wit, log } = require('node-wit');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const client = new Wit({
    accessToken: process.env.SERVER_ACCESS_TOKEN,
    logger: new log.Logger(log.DEBUG) // optional
});

let gethomepage = (req, res) => {
    return res.render('homepage.ejs');
};

let postwebhook = (req, res) => {

    let body = req.body;
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });
    // Send a 200 OK response if this is a page webhook
    if (body.object === "page") {
        // Returns a '200 OK' response to all requests
        body.entry.forEach(function (entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);


            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });
        res.status(200).send("EVENT_RECEIVED");
        // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }


}




let getwebhook = (req, res) => {
    let VERYFY_TOKEN = process.env.VERYFY_TOKEN;
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === VERYFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}



// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        // function firstTrait(nlp, name) {
        //     return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
        // }
        // let greeting = firstTrait(message.nlp, 'wit$greetings')
        // if (greeting && greeting.confidence > 0.8) {
        //     let ss = "hello"
        // } else {
        //     // default logic
        // }
        response = {
            //"text": `${ss}`

            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    // Send the response message
    callSendAPI(sender_psid, response);
}





// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case 'yes':
            response = { "text": "Thanks!" }
            break;
        case 'no':
            response = { "text": "Oops, try sending another image." }
            break;
        case 'RESTART_BOT':
        case 'GET_STARTED':
            await chatbotservice.hendlegetstarted(sender_psid);
            break;
        case 'BACK_TO_MAIN_MENU':
        case 'MAIN_MENU':

            await chatbotservice.hendlesendmainmenu(sender_psid);
            break;
        case 'LUNCH_MENU':
            await chatbotservice.hendlegetlunchmenu(sender_psid);
            break;
        case 'DINNER_MENU':
            await chatbotservice.hendlegetdinnermenu(sender_psid);
            break;
        case 'SHOW_ROOMS':
            await chatbotservice.hendleshowdetailroom(sender_psid)
            break
        case 'APPETIZER_MENU':
            await chatbotservice.hendledetailviewappetizer(sender_psid);
            break;
        case 'MAIN_DISHIS_MENU':
            await chatbotservice.hendledetailviewdishis(sender_psid);
            break;
        case 'DESSERTS_MENU':
            await chatbotservice.hendledetailviewdesserts(sender_psid);
            break;
        case 'DRINKS_MENU':
            await chatbotservice.hendledetailviewdrinks(sender_psid);
            break;
        case 'MUSIC_MENU':
            await chatbotservice.hendledetailviewmusic(sender_psid);
            break;
        default:
            await chatbotservice.handleException(sender_psid, payload);
        // client.message(payload)
        //     .then(data => {
        //         console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
        //     })
        //     .catch(console.error);
    }

    // Send the message to acknowledge the postback
    // callSendAPI(sender_psid, response);
}





// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
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





let setupprofile = async (req, res) => {
    //call profile facebook API
    // Construct the message body

    let request_body = {
        "get_started": { "payload": "GET_STARTED" },
        "whitelisted_domains": ["https://chat-bot-g69l.onrender.com/"]
    }
    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/v19.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        console.log(body)
        if (!err) {
            console.log('setup user profile succesds')
        } else {
            console.error("Unable to setup user profile:" + err);
        }
    });
    return res.send("setup user profile succesds")
}





let setuppersistentmenu = async (req, res) => {
    //call profile facebook API
    // Construct the message body

    let request_body = {
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "web_url",
                        "title": "YOUTOBE CHANNEL CỦA MÌNH",
                        "url": "https://www.youtube.com/channel/UC0nXI6o5oM9yFGLd_JP_r9A",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "FACEBOOL CỦA MÌNH",
                        "url": "https://www.facebook.com/cotem.khong.90?locale=vi_VN",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "postback",
                        "title": "KHỞI ĐỘNG LẠI BOT",
                        "payload": "RESTART_BOT"
                    }
                ]
            }
        ]
    }
    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/v19.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        console.log(body)
        if (!err) {
            console.log('setup persistent menu succesds')
        } else {
            console.error("Unable to setup user profile:" + err);
        }
    });
    return res.send("setup persistent menu succesds")
}



let handlereservetable = (req, res) => {
    return res.render('reserve-table.ejs')
}





let handlepostreservetable = async (req, res) => {
    try {
        let customerName = "";
        if (req.body.customerName === "") {
            customerName = "Để Trống"
        } else {
            customerName = req.body.customerName
        }

        let response1 = {
            "text": `Thông Tin Khách Hàng Đặt bàn\n
            Họ Và Tên: ${customerName}\n
            Địa Chỉ Email: ${req.body.email}\n
            Số Điện Thoại: ${req.body.phoneNumber}\n`
        }
        //console.log(response1);
        await chatbotservice.callSendAPI(req.body.psid, response1);
        return res.status(200).json({
            message: 'ok'
        })
    } catch (e) {
        console.log('loi post reserve tabel: ', e)
        return res.status(500).json({
            message: 'server error'
        })
    }
}







module.exports = {
    gethomepage: gethomepage,
    postwebhook: postwebhook,
    getwebhook: getwebhook,
    setupprofile: setupprofile,
    setuppersistentmenu: setuppersistentmenu,
    handlereservetable: handlereservetable,
    handlepostreservetable: handlepostreservetable
}