# Increment Custom Metric

Original author: @Gordon-BP

Last updated by @Gordon-BP on 7 July 2022

## Overview
This action makes it easy to add and increment a custom metric in the `bot_analytics` table.

## Use cases:
Ever want to record a custom metric but don't want to create a new database table for it? This is the action for you! With this action, you can:
- Define a new metric for your bot
- Add a subMetric if needed
- Increment it by any integer as many times as you want!

This metric will have to follow the same conventions as all the other metrics in the table, meaning the only avaialble fields are:

<img width="382" alt="image" src="https://user-images.githubusercontent.com/77560236/177818558-4af6d002-e013-4b76-8fc8-67da03c58304.png">

## How to use
1. Copy/paste the file `increment-custom-metric.js` into your bot.
2. For the parameters:

<img width="657" alt="image" src="https://user-images.githubusercontent.com/77560236/177818841-08572bc8-c459-42e3-9efa-65bfa139e908.png">


**metric**: Your metric's name

**n**: How much to increment the metric

3. Run your flow and check the database for your cool new metric!

<img width="630" alt="image" src="https://user-images.githubusercontent.com/77560236/177819343-99cbad00-bbf3-40ee-9c8b-714bbcaf145b.png">
