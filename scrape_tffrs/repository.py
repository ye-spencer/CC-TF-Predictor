# Repository.py
# File with database connection and functions to insert data

def _convert_result_to_decimal(result : str):
    # TODO
    pass

def insert_event(event_id : int, event_name : str, is_relay : bool):
    print("REPOSITORY: Inserting Event " + event_name + " with ID " + str(event_id) + " and is relay " + str(is_relay))
    # NOTE: manually add event type and metric to database using a constants file
    pass 

def insert_athlete(athlete_id : int, athlete_first_name : str, athlete_last_name : str, athlete_gender : str):
    print("REPOSITORY: Inserting Athlete " + athlete_first_name + " " + athlete_last_name + " with ID " + str(athlete_id) + " and Gender " + athlete_gender)
    pass

def insert_athlete_performance(meet_id : int, athlete_id : int, event_id : int, school_id : str, result : str, wind_info : str):
    print("REPOSITORY: Inserting Athlete Performance with Meet ID " + str(meet_id) + " and Athlete ID " + str(athlete_id) + " and Event ID " + str(event_id) + " and School ID " + school_id + " and Result " + result + " and Wind Info " + wind_info)
    # NOTE: must also add athlete_season if needed
    pass

def insert_relay_team_performance(meet_id : int, athletes : tuple, event_id : int, school_id : str, result : str, wind_info : str):
    print("REPOSITORY: Inserting Relay Team Performance with Meet ID " + str(meet_id) + " and Athletes " + str(athletes) + " and Event ID " + str(event_id) + " and School ID " + school_id + " and Result " + result + " and Wind Info " + wind_info)
    # NOTE: must also add athlete_season if needed
    # NOTE: check if it has 4 people, and add those to relay team members if needed
    pass

def insert_meet(meet_id : int, meet_name : str, meet_date : str):
    print("REPOSITORY: Inserting Meet " + meet_name + " with ID " + str(meet_id) + " and Date " + meet_date)
    # NOTE: must also include updating end/start with knowledge
    pass