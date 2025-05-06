FROM public.ecr.aws/lambda/nodejs18.x

# Copy function code
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript (if needed — optional)
RUN npm run build

# Set handler file and exported function
CMD ["index.handler"]