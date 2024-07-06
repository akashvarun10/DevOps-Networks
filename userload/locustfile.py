# Simple Get Response User Load Test
from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task
    def my_task(self):
        self.client.get("/")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
