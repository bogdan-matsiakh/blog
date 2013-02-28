from django.db import models
from django.contrib import admin

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length = 30)
    text = models.TextField()
    createdate = models.DateTimeField('Date of the creation')
    
    def __unicode__(self):
        return self.title
    
admin.site.register(Article)