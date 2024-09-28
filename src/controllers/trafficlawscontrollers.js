import trafficlawsservice from "../services/trafficlawsservice"
import request from 'request';


let getAlltrafficlaws = async (req, res) => {
    try {
        let data = trafficlawsservice.getAlltrafficlaws()
        console.log('>>>>>>>>>>>>>>', data.data)
        return res.render('trafficlaws/getAllTrafficlaws.ejs', { listTrafficlaws: data.data });
    } catch (error) {

    }

}




let displayCreatetrafficlaws = async (req, res) => {
    try {
        return res.render('trafficlaws/createTrafficlaws.ejs');
    } catch (error) {

    }

}


let handleCreatetrafficlaws = async (req, res) => {
    try {
        let create = trafficlawsservice.handleCreatetrafficlaws(req.body)
        if (create.errcode != 0) {
            console.log('>>>>>>>>>>>>', errmessage);
        }
        res.redirect('/trafficlaws')
    } catch (error) {

    }

}

module.exports = {
    getAlltrafficlaws: getAlltrafficlaws,
    displayCreatetrafficlaws: displayCreatetrafficlaws,
    handleCreatetrafficlaws: handleCreatetrafficlaws
}