#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    # This folder needs to be created for collectstatic
    Path(os.path.join(os.path.dirname(__file__), "../build/static")).mkdir(parents=True, exist_ok=True)
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
