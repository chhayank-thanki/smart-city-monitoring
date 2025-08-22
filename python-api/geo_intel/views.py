from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import find_nearest_service, generate_route_link

@api_view(["POST"])
def get_geo_intel(request):
    lat = request.data.get("lat")
    lon = request.data.get("lon")

    if lat is None or lon is None:
        return Response({"error": "Latitude and Longitude required"}, status=400)

    nearest, distance = find_nearest_service(lat, lon)
    route_link = generate_route_link(lat, lon, nearest["lat"], nearest["lon"])

    return Response({
        "nearest_service": nearest,
        "distance_km": distance,
        "route_link": route_link
    })
