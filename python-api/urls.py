from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('alerts/', include('alerts_ml.urls')),
    path('geo/', include('geo_intel.urls')),
]
