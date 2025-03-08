# posts/views.py
from rest_framework import viewsets, permissions, filters
from .models import Post
from .serializers import PostSerializer
from django_filters.rest_framework import DjangoFilterBackend

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'content']
    filterset_fields = ['created_at']

    def get_queryset(self):
        user = self.request.user
        # Admins see all posts; non-admins see only their posts.
        if user.is_staff or user.is_superuser:
            return Post.objects.all()
        return Post.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
