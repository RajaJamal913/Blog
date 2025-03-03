from rest_framework import viewsets, permissions, filters
from .models import Task
from .serializers import TaskSerializer
from django_filters.rest_framework import DjangoFilterBackend

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['status', 'due_date']
    
    def get_queryset(self):
        # Users see only their own tasks
        return Task.objects.filter(assigned_user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(assigned_user=self.request.user)
