release: python backend/manage.py migrate && cd frontend && npm run build
web: gunicorn check-in-backend.wsgi