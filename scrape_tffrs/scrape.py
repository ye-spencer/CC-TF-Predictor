"""


Desired Output Database Dictionaries:

Track Meet : 
{
    MeetID : INT
     - In the link with meet info
     - TFFRS created
    MeetName : STRING
     - In the file with each result
    Location : STRING
     - Manually fill in by research
    StartDate : STRING
     - Each meet date, we add all to set and find earliest
     - Meet date is a row with each result
    EndDate : STRING
     - Each meet date, we add all to set and find latest
     - Meet date is a row with each result
}

Athlete ID:
{
    AthleteID : INT
     - In the link with athlete info
    AthleteName : STRING
     - In the file next to each result
    Gender : STRING
     - Potentially from file name/which school we downloading from
}

AthleteSeason:
{
    AthleteSeasonID : INT
     - Auto Increment 
    AthleteID : INT 
     - In the link with athlete info
    SchoolID : STRING 
     - Potentially from file name/which school we downloading from 
    SeasonType : STRING 
     - Potentially from file name/which school we downloading from 
     - Indoor/Outdoor
    SeasonYear : INT
     - Potentially from file name/which school we downloading from
    ClassYear : INT 
     - In the file next to each result
}

DidEvent:
{
    PerformanceID : INT
     - Auto Increment 
    AthleteSeasonID : INT 
     - We have season info and athlete id from link, so can do a lookup
    MeetID : INT 
     - In the link with meet info
    EventID : INT 
     - In the link with event info
}

NOTE: Can we drop MeetEventID, too much extra work tbh for not a lot of gang (only meet records)


"""

# Probably can calculate all of each for each season, with school already set (potentially with the name as the FK)