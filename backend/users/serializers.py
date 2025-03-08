from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']



class RegisterSerializer(serializers.ModelSerializer):
    # Allow email to be empty if desired
    email = serializers.EmailField(required=False, allow_blank=True)
    # Make admin_code optional and allow it to be blank
    admin_code = serializers.CharField(required=False, allow_blank=True, write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'admin_code']

    def create(self, validated_data):
        # Pop admin_code from validated_data, if present.
        admin_code = validated_data.pop('admin_code', None)
        # Create the user using the provided data.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        # If an admin_code is provided and matches our secret, set the user as admin.
        if admin_code and admin_code == "mysecretadmin":
            user.is_staff = True
            user.is_superuser = True
            user.save()
        return user
