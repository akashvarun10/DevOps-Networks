FROM python:3.9-slim
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 3000
CMD [ "python", "index.py"]
#sample Dockerfile for hello-world python flask app

# to run 
# docker build -t akashvarunp/hey-python-flask:0.0.1.RELEASE .
# docker container run -d -p 4005:3000 akashvarunp/hey-python-flask:0.0.1.RELEASE