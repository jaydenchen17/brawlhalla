---
layout: default
title: Lebron's Laundry List
permalink: /todo
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title style="color: #FDB927;">Lebron's Laundry List</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #552583;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background-color: #FFFFFF;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #FDB927;
            margin-bottom: 20px;
        }
        input[type="text"],
        input[type="date"],
        input[type="time"] {
            width: calc(100% - 100px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            width: 100px;
            padding: 10px;
            background-color: #FDB927;
            color: #552583;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #FFD700;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 10px;
            background-color: #F9F9F9;
            border-radius: 5px;
            margin-bottom: 10px;
            position: relative;
        }
        li:last-child {
            margin-bottom: 0;
        }
        .completed {
            text-decoration: line-through;
            color: #552583;
        }
        .btn-container {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        .btn-container button {
            margin-left: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 style="color: #FDB927;">Lebron's Laundry List</h1>
        <input type="text" id="taskInput" placeholder="Enter task...">
        <input type="date" id="taskDate">
        <input type="time" id="taskTime">
        <button onclick="addTask()">Add Task</button>
        <button onclick="sortAndDisplayTasks()">Sort Tasks</button>
        <ul id="taskList"></ul>
    </div>
    <script>
        function addTask() {
            var description = document.getElementById("taskInput").value;
            var date = document.getElementById("taskDate").value;
            var time = document.getElementById("taskTime").value;
            fetch('http://127.0.0.1:8086/api/todo/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: description, date: date, time: time })
            })
            .then(response => response.json())
            .then(data => {
                fetchTaskList();
            });
        }
        function fetchTaskList() {
            fetch('http://127.0.0.1:8086/api/todo/list')
            .then(response => response.json())
            .then(taskList => {
                var taskListHtml = '';
                taskList.forEach(task => {
                    taskListHtml += `<li${task.completed ? ' class="completed"' : ''}>${task.description}
                        <span style="margin-left: 10px;">Date: ${task.date}</span>
                        <span style="margin-left: 10px;">Time: ${task.time}</span>
                        <div class="btn-container">
                            <button onclick="completeTask('${task.description}')">Complete</button>
                            <button onclick="deleteTask('${task.description}')">Delete</button>
                        </div>
                    </li>`;
                });
                document.getElementById("taskList").innerHTML = taskListHtml;
            });
        }
        function sortTasks(taskList) {
            for (let i = 0; i < taskList.length; i++) {
                for (let j = 0; j < taskList.length - i - 1; j++) {
                    let dateA = new Date(taskList[j].date + 'T' + taskList[j].time);
                    let dateB = new Date(taskList[j + 1].date + 'T' + taskList[j + 1].time);
                    if (dateA > dateB) {
                        let temp = taskList[j];
                        taskList[j] = taskList[j + 1];
                        taskList[j + 1] = temp;
                    }
                }
            }
            return taskList;
        }
        function sortAndDisplayTasks() {
            fetch('http://127.0.0.1:8086/api/todo/list')
            .then(response => response.json())
            .then(taskList => {
                taskList = sortTasks(taskList);
                var taskListHtml = '';
                taskList.forEach(task => {
                    taskListHtml += `<li${task.completed ? ' class="completed"' : ''}>${task.description}
                        <span style="margin-left: 10px;">Date: ${task.date}</span>
                        <span style="margin-left: 10px;">Time: ${task.time}</span>
                        <div class="btn-container">
                            <button onclick="completeTask('${task.description}')">Complete</button>
                            <button onclick="deleteTask('${task.description}')">Delete</button>
                        </div>
                    </li>`;
                });
                document.getElementById("taskList").innerHTML = taskListHtml;
            });
        }
        function completeTask(description) {
            fetch('http://127.0.0.1:8086/api/todo/complete/' + encodeURIComponent(description), {
                method: 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                fetchTaskList();
            });
        }
        function deleteTask(description) {
            fetch('http://127.0.0.1:8086/api/todo/delete/' + encodeURIComponent(description), {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                fetchTaskList();
            });
        }
        fetchTaskList();
    </script>
</body>
</html>

## Time space complexity: exponential (N^2)
