import dataBase from "../config/dataBase.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function createChoice(req,res){
    const choice = req.body;

    const existSurvey = await dataBase.collection("surveys").find({_id: ObjectId(choice.pollId)}).toArray();
    if(existSurvey.length === 0) return res.status(404).send("for a choice it is necessary to have a survey");

    const repeatTitle = await dataBase.collection("choices").findOne({
        title: choice.title
    });
    if(repeatTitle) return res.status(404).send("no two votes can be the same");
    const expireAt = await dataBase.collection("surveys").findOne({_id: ObjectId(`${choice.pollId}`)});
    const surveyExpired = dayjs().format("DD/MM/YYYY HH:mm");
    if(expireAt < surveyExpired) return res.status(409).send("survey time ended");

    try{
    await dataBase.collection("choices").insertOne(choice);
    }catch (err) {return res.status(500)};

    res.status(201).send("OK");
}

export async function createChoiceId(req,res){
    const pollId = req.params.id;

    const exist = dataBase.collection("choices").findOne({_id:ObjectId(pollId)});
    if(!exist) return res.status(404).send("Is not a option existent");

    const expireAt = await dataBase.collection("surveys").findOne({_id: ObjectId(pollId)});
    const surveyExpired = dayjs().format("DD/MM/YYYY HH:mm");
    if(expireAt < surveyExpired) return res.status(409).send("survey time ended");
    
    try{
        await dataBase.collection("createChoices").insertOne({
            cratedAt: dayjs().format("DD/MM/YYYY HH:mm"),
            choiceId: pollId
        });
        res.status(201).send("OK")
    }catch (err) {return res.status(500)};
}