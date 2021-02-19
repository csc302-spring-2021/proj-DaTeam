FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
WORKDIR /usr/share/nginx/html
COPY ./build .
CMD [ "nginx", "-g", "daemon off;" ]
