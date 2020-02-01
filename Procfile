release: python backend/manage.py migrate && npm run build && npm install -g serve && serve -s build
web: gunicorn check-in-backend.wsgi

