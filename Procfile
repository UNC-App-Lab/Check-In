release: python backend/manage.py migrate && python backend/manage.py runserver && npm run build
web: cd backend && gunicorn backend.wsgi
