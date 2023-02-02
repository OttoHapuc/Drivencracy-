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
    const surveyExpired = dayjs().format("DD/M/YYYY HH:mm:ss");
    if(expireAt < surveyExpired) return res.status(409).send("survey time ended");

    await dataBase.collection("choices").insertOne(choice);
    res.status(201).send("OK");
}