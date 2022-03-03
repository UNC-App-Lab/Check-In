release: python backend/manage.py migrate && npm run build
web: cd backend && python manage.py collectstatic --no-input; && gunicorn backend.wsgi
