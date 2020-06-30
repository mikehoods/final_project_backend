from tastypie.resources import ModelResource
from api.models import Entry
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from django.contrib.auth import get_user_model

User = get_user_model()

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = "user"
        excludes = ["email", "password", "is_active", "is_staff", "is_superuser"]
        allowed_methods = ['get']
        # authentication = BasicAuthentication()
        # authorization = DjangoAuthorization()
        authorization = Authorization()

class EntryResource(ModelResource):
    class Meta:
        queryset = Entry.objects.all()
        resource_name = 'entry'
        # authentication = BasicAuthentication()
        # authorization = DjangoAuthorization()
        authorization = Authorization()