# GateReady

## Introduction
GateReady is a cutting-edge airport time management application designed to streamline and enhance the travel experience for air passengers. With real-time updates and personalized recommendations, GateReady ensures that travelers are well-informed, efficiently guided, and able to make the most of their time at the airport.

## Features
- **TSA Wait Time Calculation**: Provides real-time TSA security check wait times.
- **Airport Arrival Time Calculation**: Offers calculated airport arrival times based on flight schedules and current conditions.
- **Side Quest Recommendations**: Suggests activities and amenities post-TSA checks, tailored to individual preferences.
- **Gate Time Calculator**: Estimates the time needed to reach the departure gate from TSA checkpoints.
- **User Activity History**: Tracks user preferences for more personalized future recommendations.
- **Miscellaneous Time Management**: Helps manage various pre-flight activities for a stress-free airport experience.

## Backend Setup
To get started with GateReady, follow these steps:

## Dependencies

This project requires the following Python libraries:

- `django-heroku`
- `psycopg2-binary`
- `django`
- `googlemaps`

## Backend Installation

To install these dependencies, you can use `pip`. It's recommended to use a virtual environment to avoid conflicts with other projects or system-wide packages.

### Setting up a Virtual Environment (Optional but Recommended)

If you don't have virtualenv installed, install it first:

```bash
pip install virtualenv
pip install django
pip install django-heroku
pip install google maps
pip install psycopg2-binary

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Front End Setup

## Front End Dependencies

- `node latest version`
- `React`
- `Material UI`
- `CSS`

## Steps:
```
  cd gateready-app/
  npm intsall
  npm start
```
HTTP Requests Used
```
'gates/get-gate/’ - returns a json containing the details of all the gates
'gates/get-walk-time/’ - returns the time taken to walk from any point to the certain gate
'arrival-time/calculate-arrival/’ - returns the time it will take from current location to the airport
'tsa-wait-time/get-wait-time/’ - returns the current TSA wait time
'departure-time/get-dt/’ - returns the time the boarding stops for a selected flight
'misc-time/get-shop/’ - returns a json containing all the shops present
‘misc-time/get-walk-time/’ - returns the time it will take to walk from any point to a certain shop
'recommend/get-rec/’ - returns the recommended places to visit based on user preferences and location
'flight-details/get-flight-details/’ - returns the details of a flight with a certain flight number
```
