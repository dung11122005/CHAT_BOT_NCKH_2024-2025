import trafficlawsservice from "../services/trafficlawsservice"
import request from 'request';


let getAlltrafficlaws = async (req, res) => {
    try {
        let data = await trafficlawsservice.getAlltrafficlaws()
        //console.log('>>>>>>>>>>>>>>', data.data)
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
        let create = await trafficlawsservice.handleCreatetrafficlaws(req.body)
        if (create.errcode != 0) {
            console.log('>>>>>>>>>>>>', errmessage);
        }
        res.redirect('/trafficlaws')
    } catch (error) {

    }
}



let displayUpdatetrafficlaws = async (req, res) => {
    try {

        let dataTrafficlawsId = await trafficlawsservice.displayUpdatetrafficlaws(req.params.id)

        if (dataTrafficlawsId.errcode != 0) {
            res.redirect('/trafficlaws')
        }

        return res.render('trafficlaws/updateTrafficlaws.ejs', { Trafficlaws: dataTrafficlawsId.data });
    } catch (error) {

    }

}


let handleUpdatetrafficlaws = async (req, res) => {
    try {
        let update = await trafficlawsservice.handleUpdatetrafficlaws(req.body, req.body.id)
        if (update.errcode != 0) {
            console.log('>>>>>>>>>>>>', errmessage);
        }
        res.redirect('/trafficlaws')
    } catch (error) {

    }
}

let handleDeletetrafficlaws = async (req, res) => {
    try {
        let deleteTrafficlaws = await trafficlawsservice.handleDeletetrafficlaws(req.params.id)
        if (deleteTrafficlaws.errcode != 0) {
            console.log('>>>>>>>>>>>>', errmessage);
        }
        res.redirect('/trafficlaws')
    } catch (error) {

    }
}

module.exports = {
    getAlltrafficlaws: getAlltrafficlaws,
    displayCreatetrafficlaws: displayCreatetrafficlaws,
    handleCreatetrafficlaws: handleCreatetrafficlaws,
    displayUpdatetrafficlaws: displayUpdatetrafficlaws,
    handleUpdatetrafficlaws: handleUpdatetrafficlaws,
    handleDeletetrafficlaws: handleDeletetrafficlaws
}