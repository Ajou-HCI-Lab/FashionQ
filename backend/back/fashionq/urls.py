from django.urls import path
from . import views

urlpatterns = [
	path('', views.PhotoView.as_view(), name='index'),
	path('posts/', views.PhotoView.as_view(), name='photos_list')
]
