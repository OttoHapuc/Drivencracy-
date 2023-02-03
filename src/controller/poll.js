import dataBase from "../config/dataBase.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb"
export async function pollCreateSurvey(req, res) {
    const survey = req.body
    try {
        if (survey.expireAt === "") {
            const monthSum = Number(dayjs().format("MM"));
            await dataBase.collection("surveys").insertOne({
                ...survey,
                expireAt: dayjs().format(`DD/0${monthSum + 1}/YYYY HH:mm`)
            })
            return res.status(201).send("OK");
        }
        await dataBase.collection("surveys").insertOne(survey);
        res.status(201).send("OK");
    } catch (err) { res.status(500).send(err) }
}

export async function pollCollectionSurvey(req, res) {
    res.send(await dataBase.collection("surveys").find().toArray());
}

export async function pollIdChoice(req, res) {
    const pollId = req.params.id;
    try {
        const surveyExist = await dataBase.collection("surveys").findOne({_id: ObjectId(pollId) });
        if (!surveyExist) return res.status(404).send("survey not found");
        const choices = await dataBase.collection("choices").find({pollId: ObjectId(pollId)}).toArray();
        return res.send(choices);
    } catch (err) { return res.status(500).send(err) };
}

export async function pollIdResult(req, res) {
    const pollId = req.params.id;

    try {
        const survey = await dataBase.collection("surveys").findOne({ _id: ObjectId(pollId) });
        if(!survey) return res.status(404).send("survey not found");
        const choice = await dataBase.collection("choices").find({ pollId: ObjectId(pollId) }).toArray();
        const vote = choice.length;
        let theMostVotedChoice;
        let max = 0;
        for (let i = 0; i < vote; i++) {
            const surv = choice[i]._id;
            const element = await dataBase.collection("createChoices").find(({choiceId: ObjectId(surv)})).toArray();
            console.log(element);
            console.log(choice[i].title)
            if (element.length > max) { max = element.length; theMostVotedChoice = choice[i].title }
        }
        res.send({
            ...survey,
            result: {title: theMostVotedChoice, votes: max}
        })
    } catch (err) { res.status(500).send(err) }
}