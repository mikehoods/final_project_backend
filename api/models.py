from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Entry(models.Model):
    title = models.CharField(max_length=100)
    entry = models.TextField()
    image = models.CharField(max_length=400)
    username = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s %s %s %s' % (self.title, self.entry, self.image, self.username)

    def save(self, *args, **kwargs):
        return super(Entry, self).save(*args, **kwargs)
