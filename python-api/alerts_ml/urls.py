from django.urls import path
from .views import classify_alert

urlpatterns = [
    path("classify/", classify_alert, name="classify_alert"),
]
