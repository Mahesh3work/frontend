# Stage 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy only dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci
# RUN npm install -g @angular/cli

# Copy rest of source
COPY . .


# Accept dynamic build args
ARG API_URL
ARG AUTH_URL

# Replace placeholder values in environment.prod.ts
RUN sed -i "s|apiUrl: ''|apiUrl: '$API_URL'|g" src/environments/environment.prod.ts
RUN sed -i "s|authUrl: ''|authUrl: '$AUTH_URL'|g" src/environments/environment.prod.ts

RUN npm run build -- --configuration=production --project=UserRoleManagment

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app
COPY --from=build /app/dist/user-role-managment/browser/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]