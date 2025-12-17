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
    ]


    const randomIndex = Math.floor(randomId % queries.length);

    return queries[randomIndex];
}

