FROM nginx:alpine
COPY frontend/nginx.conf.template /etc/nginx/nginx.conf.template
COPY frontend/docker-entrypoint.sh /
WORKDIR /usr/share/nginx/html
COPY frontend/build .
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD [ "nginx", "-g", "daemon off;" ]
