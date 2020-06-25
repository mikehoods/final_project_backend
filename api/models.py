from django.db import models

# Create your models here.


class Entry(models.Model):
    title = models.CharField(max_length=100)
    entry = models.TextField()
    image = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s %s %s' % (self.title, self.entry, self.image)

    def save(self, *args, **kwargs):
        return super(Entry, self).save(*args, **kwargs)
