---
layout: default
title: Student Blog
---


<head>
    <meta charset="UTF-8">
    {% seo %}
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#157878">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="stylesheet" href="{{ '/assets/css/style.css?v=' | append: site.github.build_revision | relative_url }}">
    {% include head-custom.html %}
    <style>
        body {
            text-align: center;
        }

        .container {
            display: inline-block;
            text-align: left; /* Reset text-align for the content inside the container */
        }
                .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .header-left {
            font-size: 0.9em;
            color: #666;
        }

        .header-right a {
            margin-left: 20px;
            text-decoration: none;
            color: #333;
            font-weight: bold;
        }

    </style>
<body>
<div class="header">
    <div class="header-left">
        CompSci Blogs
        <br>
        August 2023 to June 2024
    </div>
    <div class="header-right">
        <a href="/brawlhalla/login">Log In</a>  <a href="/brawlhalla/signup">Sign Up</a>
        <a href="/brawlhalla/profile" class="profile-button">View your Profile</a>
    </div>
</div>
</body>

</head>

![Lebron and Wade](images/lebronandwade.webp)