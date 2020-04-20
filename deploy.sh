# set in Travis environment:
# $WEBHOST_USER
# $WEBHOST_DOMAIN
# $WEBHOST_ROOT

scp -rp ./public_html/* $WEBHOST_USER@$WEBHOST_DOMAIN:$WEBHOST_ROOT/