# set in Travis environment:
# $WEBHOST_USER
# $WEBHOST_DOMAIN
# $WEBHOST_ROOT

sed -i 's/{{DATE_TODAY}}/$(date +'%b %e, %Y')' ./public_html/index.html

scp -rp ./public_html/* $WEBHOST_USER@$WEBHOST_DOMAIN:$WEBHOST_ROOT/