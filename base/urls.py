from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),

    path('users/', views.getUsers, name='users'),
    path('users/register/', views.registerUser, name='register'),
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='user-profile'),
    path('users/profile/update', views.updateUserProfile,
         name='user-profile-update'),
    path('users/delete/<str:pk>/', views.deleteUsers, name='delete-user'),
    path('users/detail/<str:pk>/', views.getUserByID, name="get-user-by-id"),
    path('users/update/<str:pk>/', views.updateUserAdmin, name="update-user-admin"),

    path('products/admin/image/',
         views.uploadImage, name="upload-image"),
    path('orders/admin/all/', views.getOrdersAdmin, name='all-orders'),
    path('order/getOrderDetailByID/<str:pk>/', views.getOrderByIDAdmin,
         name="admin-order-detail"),

    path('products/', views.getProducts, name='products'),
    path('products/create/', views.createProduct, name="create-product"),
    path('products/update/<str:pk>/', views.updateProduct, name='update-product'),
    path('products/delete/<str:pk>/', views.deleteProduct, name="delete-product"),
    path('products/admin/<str:pk>/',
         views.getProductByID, name="admin-get-product"),
    path('product/addReview/<str:pk>/',
         views.createReview, name="add-review"),
    path('products/<str:pk>/', views.getProduct, name='product'),

    path('order/add/', views.addOrderItems, name="order-add"),
    path('getOrders/', views.getOrdersByUserId, name="get-orders")
]
