You can use the script below to delete conversation messages older than 7 days

There are two different versions because of the [messaging split](https://github.com/botpress/messaging/blob/master/docs/database.md) that happened in 12.26 

## Before 12.26.0

`
DELETE FROM web_messages wm WHERE wm.sent_on <= (SELECT NOW() - INTERVAL '7 DAY');
DELETE FROM web_conversations wc WHERE wc.created_on <= (SELECT NOW() - INTERVAL '7 DAY');
`

## 12.26.0 or After

`
DELETE FROM public.msg_messages WHERE "sentOn" <= (SELECT NOW() - INTERVAL '7 DAY');
`