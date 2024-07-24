from django.urls import path
from .views import RoomView
from .views import CreateRoomView
from .views import GetRoom
# this is our api entry point now we can set up our react to
# communicate with this entry point 
urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view())
]

