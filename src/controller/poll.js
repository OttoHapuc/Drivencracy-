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

export async function pollIdChoice(req,res){
    const pollId = req.params.id;
    try{
        const surveyExist = await dataBase.colletion("surveys").findOne({pollId});
        if(!surveyExist) return res. status(404).send("survey not found");
        const choices = await dataBase.collection("choices").find({pollId});
        return res.send(choices)
    }catch (err){return res.status(500).send(err)}
}