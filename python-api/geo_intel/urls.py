from django.urls import path
from .views import get_geo_intel

urlpatterns = [
    path("nearest-service/", get_geo_intel, name="nearest_service"),
]
