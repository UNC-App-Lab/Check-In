release: python backend/manage.py migrate && npm run build && pipenv && pip install gunicorn
web: gunicorn check-in-backend.wsgi
