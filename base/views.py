# rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

# serializers
from .serializers import OrderSerializer, ProductSerializer, UserSerializer, UserSerializerWithToken
from .models import Product, Order, OrderItem, ShippingAdress,Review

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# multiple filter
from django.db.models import Q

# pagination
from django.core.paginator import Paginator

# registerUser error
from rest_framework import status

# password hasher
from django.contrib.auth.hashers import make_password

# permissions
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = []
    return Response(routes)


##### PRODUCT VIEWS ###########################################
@api_view(['GET','PUT'])
def getProducts(request):

    if request.method=="GET":
        products=Product.objects.all()
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)

    data = request.data
    if data == {} or data["query"]==None:
        products = Product.objects.all()
    else:
        products = Product.objects.filter(
            Q(name__icontains=data['query'])|Q(brand__icontains=data['query'])|Q(category__icontains=data['query'])
        )

    p = Paginator(products,6)
    if data == {} or data["pageNumber"]==None:
        pageNumber = 1
    else:
        pageNumber=data['pageNumber']

    products=p.page(pageNumber)
    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data,"page":pageNumber,"pages":p.num_pages})


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

##############################################################


########## PROFILE VIEWS #####################################
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data
    serializer = UserSerializerWithToken(user, many=False)

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data["password"])

    user.save()
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        msg = {'detail': 'User Already exists'}
        return Response(msg, status.HTTP_400_BAD_REQUEST)
##############################################################


######## ORDER VIEWS #########################################
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    data = request.data
    user = request.user

    orderItems = data["OrderItems"]

    if orderItems and len(orderItems) == 0:
        return Response({'detail': "no order item found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"]
        )
        shippingAdress = ShippingAdress.objects.create(
            order=order,
            address=data['shippingAdress']['adress'],
            city=data['shippingAdress']['city'],
            postalCode=data['shippingAdress']['postalCode'],
            country=data['shippingAdress']['country'],
        )

        for item in orderItems:
            product = Product.objects.get(_id=item['_id'])
            OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item['amount'],
                price=item['price'],
                image=product.image.url
            )

            product.countInStock -= item['amount']
            if (product.countInStock < 0):
                product.countInStock = 0
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrdersByUserId(request):
    try:
        user = request.user
        filtered_orders = user.order_set.all()
        serializer = OrderSerializer(filtered_orders, many=True)
        return Response(serializer.data)
    except:
        return Response({"detail": "error getting orders"}, status=status.HTTP_400_BAD_REQUEST)



###### ADMIN VIEWS ###########################################
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUsers(request,pk):
    user = User.objects.get(id=pk)
    if user:
        user.delete()
    return Response("Deleted.")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserByID(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUserAdmin(request,pk):
    user = User.objects.get(id=pk)
    data=request.data

    user.first_name=data["name"]
    user.email=data["email"]
    user.username=data["name"]
    user.is_staff=data["isAdmin"]

    user.save()
    serializer = UserSerializerWithToken(user,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    if product:
        product.delete()
    return Response("Deleted.")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user = user,
        name= "Sample name",
        brand = "Sample brand",
        category = "Sample category",
        description = "Sample description",
        price = 0,
        countInStock = 0
    )
    product.save()

    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    product = Product.objects.get(_id=pk)
    data = request.data

    product.name= data["name"]
    product.brand = data["brand"]
    product.category = data["category"]
    product.description = data["description"]
    product.price = data["price"]
    product.countInStock = data["countInStock"]

    product.save()
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProductByID(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data =request.data
    product_id= data["product_id"]
    product = Product.objects.get(_id=product_id)

    product.image=request.FILES.get('image')
    product.save()
    return Response("image was uploaded")

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrdersAdmin(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrderByIDAdmin(request,pk):
    order = Order.objects.get(_id=pk)
    serializer = OrderSerializer(order,many=False)
    return Response(serializer.data)
##############################################################


##############       ADD REVIEW    ##########################
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createReview(request,pk):
    try:
        data = request.data
        user = request.user
        product = Product.objects.get(_id=pk)

        review = Review.objects.create(
            product = product,
            user = user,
            name = data["rating"],
            rating = data["rating"],
            comment = data["comment"],
            username=data["username"],
        )

        num = product.numReviews
        totalRate =product.rating * num
        totalRate+=data["rating"]
        num+=1

        product.numReviews = num
        product.rating = totalRate/num
        product.save()

        '''
        totalRate =product.rating * product.numReviews
        product.numReviews+=1
        product.rating=(totalRate+data["rating"])/product.numReviews
        product.save()
        '''
        return Response("New review added.")
    except:
        return Response({"detail":"something goes wrong 'createReview function'"},status=status.HTTP_400_BAD_REQUEST)

##############################################################