from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import FileResponse
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import Contact, Resume
from .serializers import ContactSerializer, ResumeSerializer
import os
import logging
import traceback
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Set up logger
logger = logging.getLogger(__name__)

# Create your views here.

def test_email_connection():
    """Test the email connection settings"""
    try:
        # Create a test message
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = settings.CONTACT_EMAIL
        msg['Subject'] = 'Test Email from Portfolio'
        
        body = 'This is a test email to verify the email settings are working correctly.'
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to the SMTP server
        server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.starttls()
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        
        # Send the email
        text = msg.as_string()
        server.sendmail(settings.EMAIL_HOST_USER, settings.CONTACT_EMAIL, text)
        server.quit()
        
        logger.info("Test email sent successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to send test email: {str(e)}")
        logger.error(traceback.format_exc())
        return False

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def _send_contact_email(self, contact):
        try:
            context = {
                'contact': contact
            }
            html_message = render_to_string('contact_email.html', context)
            
            # Log email settings for debugging
            logger.info(f"Email settings: HOST={settings.EMAIL_HOST}, PORT={settings.EMAIL_PORT}, USER={settings.EMAIL_HOST_USER}")
            
            send_mail(
                subject=f'New Contact Form Submission: {contact.subject}',
                message=f'Name: {contact.name}\nEmail: {contact.email}\nSubject: {contact.subject}\nMessage: {contact.message}',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.CONTACT_EMAIL],
                html_message=html_message,
                fail_silently=False,
            )
            logger.info(f"Contact email sent successfully to {settings.CONTACT_EMAIL}")
            return True
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            logger.error(traceback.format_exc())  # Log the full traceback
            return False

    def create(self, request, *args, **kwargs):
        logger.info(f"Received contact form data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            contact = serializer.save()
            email_sent = self._send_contact_email(contact)
            
            response_data = {
                'message': 'Contact form submitted successfully',
                'email_sent': email_sent
            }
            
            if not email_sent:
                response_data['warning'] = 'Form submitted but email notification failed to send'
                response_data['error_details'] = 'Check server logs for more information'
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        logger.error(f"Contact form validation failed: {serializer.errors}")
        return Response({
            'error': 'Invalid data provided',
            'details': serializer.errors,
            'message': 'Please check the form fields and try again'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def test_email(self, request):
        """Test endpoint to verify email functionality"""
        success = test_email_connection()
        if success:
            return Response({
                'message': 'Test email sent successfully. Please check your inbox.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Failed to send test email. Check server logs for details.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Check if file is present in request
            if 'file' not in request.FILES:
                return Response({
                    'message': 'No file provided'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Validate file type
            file = request.FILES['file']
            allowed_types = ['.pdf', '.doc', '.docx']
            file_ext = os.path.splitext(file.name)[1].lower()
            
            if file_ext not in allowed_types:
                return Response({
                    'message': 'Invalid file type. Allowed types: PDF, DOC, DOCX'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Deactivate all existing resumes
            Resume.objects.all().update(is_active=False)
            
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Resume uploaded successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'message': 'Invalid data provided',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'message': 'An error occurred while uploading the resume',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def download(self, request):
        try:
            resume = Resume.objects.filter(is_active=True).first()
            if resume and resume.file:
                if os.path.exists(resume.file.path):
                    return FileResponse(
                        resume.file,
                        as_attachment=True,
                        filename=os.path.basename(resume.file.name)
                    )
                else:
                    return Response({
                        'message': 'Resume file not found on server'
                    }, status=status.HTTP_404_NOT_FOUND)
            return Response({
                'message': 'No active resume found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'message': 'An error occurred while downloading the resume',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
