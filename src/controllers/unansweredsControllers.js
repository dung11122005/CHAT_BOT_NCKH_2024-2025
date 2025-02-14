import unansweredsservice from "../services/unansweredsservice";
import request from 'request';


let getAllUnanswereds = async (req, res) => {
    try {
        let data = await unansweredsservice.getAllUnanswereds();
        //console.log('>>>>>>>>>>>>>>', data.data)
        return res.render('unanswereds/getAllUnanswereds.ejs', { listUnanswereds: data.data });
    } catch (error) {

    }
}


let handleDeleteUnanswereds = async (req, res) => {
    try {
        let deleteUnanswereds = await unansweredsservice.handleDeleteUnanswereds(req.params.id);
        if (deleteUnanswereds.errcode != 0) {
            console.log('>>>>>>>>>>>>', errmessage)
        }
        res.redirect('/unanswereds')
    } catch (error) {

    }
}

module.exports = {
    getAllUnanswereds: getAllUnanswereds,
    handleDeleteUnanswereds: handleDeleteUnanswereds
}