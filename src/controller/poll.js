import dataBase from "../config/dataBase.js";
import dayjs from "dayjs";

export async function pollCreateSurvey(req, res){
    const survey = req.body
    if(survey.expireAt === "") {
        const monthSum = Number(dayjs().format("MM"));
        await dataBase.collection("surveys").insertOne({
            ...survey, 
            expireAt: dayjs().format(`DD/0${monthSum+1}/YYYY HH:mm`)
        })
       return res.status(201).send("OK");
    }
    await dataBase.collection("surveys").insertOne(survey);
    res.status(201).send("OK");
}

export async function pollCollectionSurvey(req,res){
    res.send(dataBase.collection("surveys").find().toArray());
}