release: python backend/manage.py migrate && npm run build && serve -s build -l 8000
web: gunicorn check-in-backend.wsgi
