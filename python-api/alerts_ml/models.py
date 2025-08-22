from django.db import models

class Alert(models.Model):
    text = models.TextField()
    predicted_type = models.CharField(max_length=50)
    severity_score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.predicted_type} ({self.severity_score})"
