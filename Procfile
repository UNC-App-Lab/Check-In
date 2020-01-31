release: python backend/manage.py migrate && npm run build && npm install -g serve 
web: gunicorn check-in-backend.wsgi
