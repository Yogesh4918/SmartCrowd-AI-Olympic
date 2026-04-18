FROM nginx:alpine

# Copy custom nginx config to listen on standard Cloud Run $PORT
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy the static assets into the nginx container
COPY . /usr/share/nginx/html

# Expose port (Cloud Run sets this to 8080 by default)
EXPOSE 8080
