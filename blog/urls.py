from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
from news import views

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'news.views.index'),
    url(r'^timebank$', 'news.views.timebank'),
    url(r'^wave$', 'news.views.wave'),
    # url(r'^blog/', include('blog.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
