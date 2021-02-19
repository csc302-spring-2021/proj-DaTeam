FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /
WORKDIR /usr/share/nginx/html
COPY ./build .
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD [ "nginx", "-g", "daemon off;" ]
