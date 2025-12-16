import { query } from "@/app/lib/db";
import { EventPrediction, TeamScore } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";


interface IndividualEventPrediction {
    eventid: number;
    eventname: string;
    eventtype: string;
    gender: string;
    schoolid: string;
    athleteid: number;
    athletefirstname: string;
    athletelastname: string;
    predictedresult: number;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const model = searchParams.get('model');
    const season = searchParams.get('season');
    const gender = searchParams.get('gender');

    if (!model || !season || !gender) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }


    let modelLower = model.toLowerCase();

    let predictions: EventPrediction[];
    let teamScores: TeamScore[];

    if (modelLower === "season-best") {
        console.log("Season Best");
        ({ predictions, teamScores } = await getSeasonBestPredictions(gender, season));
    }
    else if (modelLower === "linear-regression") {
        console.log("Linear Regression");
        ({ predictions, teamScores } = await getLinearRegressionPredictions(gender, season));
    }
    else {
        return NextResponse.json({ error: "Invalid model" }, { status: 400 });
    }
    console.log(predictions);
    console.log(teamScores);
    return NextResponse.json({ predictions, teamScores });
}

function calculateTeamScore(predictions: EventPrediction[]): TeamScore[] {
    return [];
}

function getUnimplementedRandomData(gender: string, season: string): { predictions: EventPrediction[]; teamScores: TeamScore[] } {

    const predictions = [
        {
            eventid: 1,
            eventname: "100m Dash",
            eventtype: "Running",
            gender: gender,
            predictions: [
                {
                    place: 1,
                    athleteid: 101,
                    athletefirstname: "John",
                    athletelastname: "Doe",
                    schoolid: "S1",
                    schoolname: "Sample College",
                    predictedresult: 10.76,
                },
                {
                    place: 2,
                    athleteid: 102,
                    athletefirstname: "Mike",
                    athletelastname: "Smith",
                    schoolid: "S2",
                    schoolname: "College Example",
                    predictedresult: 10.95,
                },
                {
                    place: 3,
                    athleteid: 103,
                    athletefirstname: "Aaron",
                    athletelastname: "Lee",
                    schoolid: "S3",
                    schoolname: "Fictitious U",
                    predictedresult: 11.10,
                },
                {
                    place: 4,
                    athleteid: 104,
                    athletefirstname: "David",
                    athletelastname: "Johnson",
                    schoolid: "S4",
                    schoolname: "Sample College",
                    predictedresult: 11.25,
                },
                {
                    place: 5,
                    athleteid: 105,
                    athletefirstname: "James",
                    athletelastname: "Wilson",
                    schoolid: "S5",
                    schoolname: "Sample College",
                    predictedresult: 11.40,
                },
            ]
        },
        {
            eventid: 2,
            eventname: "Long Jump",
            eventtype: "Field",
            gender: gender || "M",
            predictions: [
                {
                    place: 1,
                    athleteid: 111,
                    athletefirstname: "Chris",
                    athletelastname: "Brown",
                    schoolid: "S1",
                    schoolname: "Sample College",
                    predictedresult: 7.01, // meters
                },
                {
                    place: 2,
                    athleteid: 112,
                    athletefirstname: "Luke",
                    athletelastname: "White",
                    schoolid: "S2",
                    schoolname: "College Example",
                    predictedresult: 6.89,
                },
                {
                    place: 3,
                    athleteid: 113,
                    athletefirstname: "Sam",
                    athletelastname: "Green",
                    schoolid: "S3",
                    schoolname: "Fictitious U",
                    predictedresult: 6.75,
                },
            ]
        }
    ];

    const teamScores = [
        {
            schoolname: "Sample College",
            schoolid: "S1",
            totalscore: 20,
            eventbreakdown: {
                "100m Dash": 10,
                "Long Jump": 10
            }
        },
        {
            schoolname: "College Example",
            schoolid: "S2",
            totalscore: 12,
            eventbreakdown: {
                "100m Dash": 8,
                "Long Jump": 4
            }
        },
        {
            schoolname: "Fictitious U",
            schoolid: "S3",
            totalscore: 8,
            eventbreakdown: {
                "100m Dash": 6,
                "Long Jump": 2
            }
        }
    ];

    return {
        predictions,
        teamScores
    }
}

async function getSeasonBestPredictions(gender: string, season: string): Promise<{ predictions: EventPrediction[]; teamScores: TeamScore[] }> {


    const [year, seasonType] = season.split("-");
    console.log(year, seasonType);

    try {
        const [
            trackSeasonRecords,
            fieldSeasonRecords
        ] = await Promise.all([
            query<IndividualEventPrediction>(
                `
                SELECT 
                    P.EventID,
                    TE.EventName,
                    TE.Eventtype,
                    Ath.gender,
                    P.AthleteSeasonID,
                    A.schoolid,
                    Ath.athletefirstname,
                    Ath.athletelastname,
                    Ath.athleteid,
                    MIN(P.Resultvalue) AS predictedresult
                FROM Performance AS P
                JOIN CentennialConferenceEvents AS CCE ON P.EventID = CCE.EventID
                JOIN AthleteSeason AS A ON P.AthleteSeasonID = A.AthleteSeasonID
                JOIN Athlete AS Ath ON A.AthleteID = Ath.AthleteID
                JOIN TrackEvent AS TE ON P.EventID = TE.EventID
                WHERE Ath.Gender = '${gender}'
                    AND A.SeasonYear = '${year}'
                    AND A.SeasonType = '${seasonType}'
                    AND (TE.Eventtype = 'sprints' OR TE.Eventtype = 'distance')
                GROUP BY P.EventID, TE.EventName, TE.Eventtype, Ath.gender, P.AthleteSeasonID, A.schoolid, Ath.athletefirstname, Ath.athletelastname, Ath.athleteid
                `),
            query<IndividualEventPrediction>(
                `
                SELECT 
                    P.EventID,
                    TE.EventName,
                    TE.Eventtype,
                    Ath.gender,
                    P.AthleteSeasonID,
                    A.schoolid,
                    Ath.athletefirstname,
                    Ath.athletelastname,
                    Ath.athleteid,
                    MAX(P.Resultvalue) AS predictedresult
                FROM Performance AS P
                JOIN CentennialConferenceEvents AS CCE ON P.EventID = CCE.EventID
                JOIN AthleteSeason AS A ON P.AthleteSeasonID = A.AthleteSeasonID
                JOIN Athlete AS Ath ON A.AthleteID = Ath.AthleteID
                JOIN TrackEvent AS TE ON P.EventID = TE.EventID
                WHERE Ath.Gender = '${gender}'
                    AND A.SeasonYear = '${year}'
                    AND A.SeasonType = '${seasonType}'
                    AND (TE.Eventtype = 'jumps' OR TE.Eventtype = 'throws')
                GROUP BY P.EventID, TE.EventName, TE.Eventtype, Ath.gender, P.AthleteSeasonID, A.schoolid, Ath.athletefirstname, Ath.athletelastname, Ath.athleteid
                `),
        ]);

        console.log(trackSeasonRecords, fieldSeasonRecords);

        // Convert to EventPrediction[]
        const eventRecords: Record<string, IndividualEventPrediction[]> = {};

        [...trackSeasonRecords, ...fieldSeasonRecords].forEach((record: IndividualEventPrediction) => {
            if (!eventRecords[record.eventid]) {
                eventRecords[record.eventid] = [];
            }
            eventRecords[record.eventid].push(record);
        });

        // For each event, sort by predictedresult, asc for jumps and throws, desc for sprints and distance
        Object.entries(eventRecords).forEach(([eventid, records]) => {
            eventRecords[eventid] = records.sort((a, b) => {
                if (a.eventtype === 'jumps' || a.eventtype === 'throws') {
                    return b.predictedresult - a.predictedresult;
                } else {
                    return a.predictedresult - b.predictedresult;
                }
            });
        });

        const predictions: EventPrediction[] = [];

        // For each event, create an EventPrediction object
        Object.entries(eventRecords).forEach(([eventid, records]) => {
            const eventPrediction: EventPrediction = {
                eventid: parseInt(eventid),
                eventname: records[0].eventname,
                eventtype: records[0].eventtype,
                gender: records[0].gender,
                predictions: records.map((record, index) => ({
                    place: index + 1,
                    athleteid: record.athleteid,
                    athletefirstname: record.athletefirstname,
                    athletelastname: record.athletelastname,
                    schoolid: record.schoolid,
                    schoolname: record.schoolid, // Note: This is using schoolid as schoolname for now
                    predictedresult: record.predictedresult, // TODO: Convert to readable
                }))
            };
            predictions.push(eventPrediction);
        });

        console.log(eventRecords);

        return {
            predictions: predictions,
            teamScores: []
        };
    } catch (error) {
        console.error('Error fetching season best predictions:', error);
        return getUnimplementedRandomData(gender, season);
    }
}

async function getLinearRegressionPredictions(gender: string, season: string): Promise<{ predictions: EventPrediction[]; teamScores: TeamScore[] }> {
    return getUnimplementedRandomData(gender, season);
}

