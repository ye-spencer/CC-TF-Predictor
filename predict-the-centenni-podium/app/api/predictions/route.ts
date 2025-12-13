import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const model = searchParams.get('model');
  const season = searchParams.get('season');
  const gender = searchParams.get('gender');

    // FAKE DATA for development
    const predictions = [
      {
        eventid: 1,
        eventname: "100m Dash",
        eventtype: "Running",
        gender: gender || "M",
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

  return NextResponse.json({ predictions, teamScores });
}