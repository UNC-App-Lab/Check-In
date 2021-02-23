from ../models import Checkin  
from django_pandas.io import read_frame  
import mpld3
from mpld3 import plugins
import matplotlib.pyplot as plt

def plotFunction():
    # Get all the data
    queryset = Checkin.objects.all()
    print(queryset)

    # pandas testing
    df = read_frame(queryset)
    print(df.head())
    df['hasPID'].value_counts().plot.pie()

plotFunction()