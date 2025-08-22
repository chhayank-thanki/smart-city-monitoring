from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Alert
from .ml_model import predict_alert

@api_view(["POST"])
def classify_alert(request):
    text = request.data.get("text")
    if not text:
        return Response({"error": "Text is required"}, status=400)
    
    alert_type, severity = predict_alert(text)
    alert = Alert.objects.create(text=text, predicted_type=alert_type, severity_score=severity)

    return Response({
        "id": alert.id,
        "predicted_type": alert_type,
        "severity_score": severity
    })
