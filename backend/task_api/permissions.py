from rest_framework import permissions

class IsAuthorOrAdmin(permissions.BasePermission):
    """
    Custom permission to allow only the author of a blog post or an admin to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions: only allow if the user is the author or a staff member.
        return obj.author == request.user or request.user.is_staff
