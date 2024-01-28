from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import random
from datetime import datetime
from misc_time.models import Shop
import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from math import radians, sin, cos, sqrt, atan2
import json

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Radius of the Earth in kilometers

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance


def get_rec(request):
        shops = Shop.objects.all()
        # recommendation = []
        user_preferences = ["Tech Zone", "Culinary Masterpieces", "Fitness Zone"]
        # Serialize the data to JSON
        lat,lng = request.GET.get('origin').split(',')  # Expected format: 'lat,lng'
        data = {"shops": requests.get('http://127.0.0.1:8000/misc-time/get-shop/').json() }
        df_shops = pd.DataFrame(data["shops"]["shops"])

        vectorizer = TfidfVectorizer()
        features = vectorizer.fit_transform(df_shops["name"])

        # Train a basic Naive Bayes classifier
        classifier = MultinomialNB()
        classifier.fit(features, df_shops["shop_type"])

        # def get_proximity_aware_recommendations(user_preferences, user_latitude, user_longitude):

                # Read user coordinates from a JSON file
        try:
            user_latitude = float(lat)
            user_longitude = float(lng)

            # Get proximity-aware recommendations for the user with user-provided location
            # proximity_aware_recommendations = get_proximity_aware_recommendations(user_preferences, user_latitude, user_longitude)
                        # Combine user preferences into a single input
            input_data = user_preferences
            
            # Vectorize the input using the same TF-IDF vectorizer
            input_features = vectorizer.transform(input_data)
            
            # Predict preferences using the trained classifier
            predicted_preferences = classifier.predict(input_features)
            
            # Calculate distances and filter recommendations based on proximity
            df_shops["distance"] = df_shops.apply(lambda row: calculate_distance(user_latitude, user_longitude, row["latitude"], row["longitude"]), axis=1)
            recommendations = df_shops[df_shops["shop_type"] == predicted_preferences[0]].sort_values(by="distance").head(2)["name"].tolist()
            
            proximity_aware_recommendations =  recommendations

            # Print recommendations
            # print("User Location (Latitude:", user_latitude, "Longitude:", user_longitude, ")")
            # print("Proximity-Aware Recommendations:")
            # for recommendation in proximity_aware_recommendations:
            #     print("- " + recommendation)

        # except FileNotFoundError:
        #     print("Error: user_coordinates.json not found.")
        except (ValueError, TypeError):
            print("Error: Invalid JSON format in user_coordinates.json.")
        return JsonResponse({'rec': proximity_aware_recommendations})