import math
from .data import emergency_services

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

def find_nearest_service(lat, lon):
    nearest = None
    min_distance = float("inf")
    for service in emergency_services:
        dist = haversine(lat, lon, service["lat"], service["lon"])
        if dist < min_distance:
            min_distance = dist
            nearest = service
    return nearest, round(min_distance, 2)

def generate_route_link(lat, lon, dest_lat, dest_lon):
    return f"https://www.google.com/maps/dir/{lat},{lon}/{dest_lat},{dest_lon}"
