import { query } from '../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    // Get randomId query parameter
    const randomId = parseInt(request.nextUrl.searchParams.get('randomId') || '0');

    const { caption, random_query } = getRandomQuery(randomId);

    try {
        const result = await query(random_query);
        return NextResponse.json(
            {
                "caption": caption,
                "result": result,
                "query": random_query
            }
        )
    }
    catch (error) {
        return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
    }
}

function getRandomQuery(randomId: number): { caption: string, random_query: string } {

    // Mapping from English Caption to Query
    const queries: { caption: string, random_query: string }[] = [
        {
            caption: "All Schools",
            random_query: "SELECT schoolname FROM school"
        },
        {
            caption: "Number of people named Mike",
            random_query: "SELECT COUNT(*) FROM athlete WHERE athletefirstname = 'Mike'"
        },
        {
            caption: "Spencer Ye's best results in 400m distances",
            random_query: `SELECT MIN(p.ResultValue) AS PersonalBest
                            FROM Performance p
                            JOIN AthleteSeason ats ON p.AthleteSeasonID = ats.AthleteSeasonID
                            JOIN Athlete a ON ats.AthleteID = a.AthleteID
                            JOIN TrackEvent e ON p.EventID = e.EventID
                            WHERE a.AthleteLastName = 'Ye' 
                            AND a.AthleteFirstName = 'Spencer'
                            AND e.EventName LIKE '%400%'
                            AND e.IsRelay = FALSE
                            GROUP BY a.AthleteFirstName, a.AthleteLastName, e.EventName;`
        },
        {
            caption: "The entire Johns Hopkins roster for the 2025 indoor season",
            random_query: `SELECT DISTINCT 
                                a.AthleteFirstName || ' ' || a.AthleteLastName || ' (' || ats.ClassYear || ')' AS FullNameInfo
                            FROM Athlete a
                            JOIN AthleteSeason ats ON a.AthleteID = ats.AthleteID
                            WHERE ats.SchoolID = 'Johns_Hopkins'
                            AND ats.SeasonYear = 2025
                            AND ats.SeasonType = 'Indoor';`
        },
        {
            caption: "Mirra Klimov's best results each season",
            random_query: `SELECT 
                                ats.SeasonYear || ' ' || ats.SeasonType || ' ' || e.EventName || ' ' || MIN(p.ResultValue) AS SeasonInfo
                            FROM Performance p
                            JOIN AthleteSeason ats ON p.AthleteSeasonID = ats.AthleteSeasonID
                            JOIN Athlete a ON ats.AthleteID = a.AthleteID
                            JOIN TrackEvent e ON p.EventID = e.EventID
                            WHERE a.AthleteLastName = 'Klimov'
                            AND a.AthleteFirstName = 'Mirra'
                            AND e.IsRelay = FALSE
                            GROUP BY ats.SeasonYear, ats.SeasonType, e.EventName;`
        },
        {
            caption: "Athletes that participated in the most relays",
            random_query: `SELECT 
                                a.AthleteFirstName || ' ' || a.AthleteLastName || ' (' || s.SchoolName || ') ' || ' ' || COUNT(DISTINCT rtm.RelayTeamID) AS FullNameInfo,
                                COUNT(DISTINCT rtm.RelayTeamID) AS RelayCount
                            FROM RelayTeamMembers rtm
                            JOIN AthleteSeason ats ON rtm.AthleteSeasonID = ats.AthleteSeasonID
                            JOIN Athlete a ON ats.AthleteID = a.AthleteID
                            JOIN School s ON ats.SchoolID = s.SchoolID
                            GROUP BY a.AthleteID, a.AthleteFirstName, a.AthleteLastName, s.SchoolName
                            ORDER BY RelayCount DESC
                            LIMIT 10;`
        },
        {
            caption: "Number of seniors from each school that graduated in 2025",
            random_query: `SELECT 
                                s.SchoolName || ' ' || COUNT(DISTINCT a.AthleteID) AS Result,
                                COUNT(DISTINCT a.AthleteID) AS SeniorCount
                            FROM AthleteSeason ats
                            JOIN School s ON ats.SchoolID = s.SchoolID
                            JOIN Athlete a ON ats.AthleteID = a.AthleteID
                            WHERE ats.ClassYear = 'SR'
                            AND ats.SeasonYear = 2025
                            GROUP BY s.SchoolID, s.SchoolName
                            ORDER BY SeniorCount DESC;`
        }
    ]


    const randomIndex = Math.floor(randomId % queries.length);

    return queries[randomIndex];
}

