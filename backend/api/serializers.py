from rest_framework import serializers
from .models import Contact, Resume

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']
    
    def validate_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long")
        return value.strip()
    
    def validate_email(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Email cannot be empty")
        return value.strip()
    
    def validate_subject(self, value):
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError("Subject must be at least 3 characters long")
        return value.strip()
    
    def validate_message(self, value):
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long")
        return value.strip()

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['file', 'is_active']
    
    def validate_file(self, value):
        if not value:
            raise serializers.ValidationError("No file was submitted")
        
        # Check file size (max 5MB)
        if value.size > 5 * 1024 * 1024:  # 5MB in bytes
            raise serializers.ValidationError("File size must be less than 5MB")
        
        return value 