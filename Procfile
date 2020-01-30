release: python backend/manage.py migrate && npm run build && npm install -g serve && serve -s build -l 8000
web: gunicorn check-in-backend.wsgi
