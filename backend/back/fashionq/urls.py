from django.urls import path
from . import views

urlpatterns = [
	# path('', views.PhotoView.as_view(), name='index'),
	path('dataframe/', views.dataframe, name='dataframe'),
	path('posts/', views.PhotoView.as_view(), name='photos_list')
]
