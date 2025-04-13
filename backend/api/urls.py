from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, ResumeViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet)
router.register(r'resumes', ResumeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contacts/test-email/', ContactViewSet.as_view({'post': 'test_email'}), name='test-email'),
] 