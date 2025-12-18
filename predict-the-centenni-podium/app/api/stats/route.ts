// API Route: Get database statistics
import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

export async function GET() {
    try {
        interface CountResult {
            count: string | number;
        }

        interface SeasonRangeResult {
            min_year: number;
            max_year: number;
        }

        // Get counts
        const [
            schoolCount,
            athleteCount,
            performanceCount,
            eventCount,
            meetCount,
            seasonRange
        ] = await Promise.all([
            // School count
            query<CountResult>('SELECT COUNT(*) as count FROM School'),
            // Athlete count
            query<CountResult>('SELECT COUNT(DISTINCT AthleteID) as count FROM Athlete'),
            // Performance count
            query<CountResult>('SELECT COUNT(*) as count FROM Performance'),
            // Event count
            query<CountResult>('SELECT COUNT(DISTINCT EventID) as count FROM TrackEvent'),
            // Meet count
            query<CountResult>('SELECT COUNT(DISTINCT MeetID) as count FROM TrackMeet'),
            // Season range
            query<SeasonRangeResult>(`
        SELECT 
          MIN(SeasonYear) as min_year,
          MAX(SeasonYear) as max_year
        FROM AthleteSeason
      `)
        ]);

        const stats = {
            schools: Number(schoolCount[0]?.count || 0),
            athletes: Number(athleteCount[0]?.count || 0),
            performances: Number(performanceCount[0]?.count || 0),
            events: Number(eventCount[0]?.count || 0),
            meets: Number(meetCount[0]?.count || 0),
            minYear: seasonRange[0]?.min_year || 2010,
            maxYear: seasonRange[0]?.max_year || 2025
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

