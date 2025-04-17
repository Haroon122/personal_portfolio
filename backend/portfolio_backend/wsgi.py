import os
import sys

# Add your project directory to the sys.path
project_home = '/home/haroon122/personal_portfolio/backend'  # Change 'yourusername' to your actual username
if project_home not in sys.path:
    sys.path.append(project_home)

# Activate your virtual environment
activate_this = '/home/haroon122/personal_portfolio/env/bin/activate_this.py'  # Update with your virtualenv path
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')

# Import Django's WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
