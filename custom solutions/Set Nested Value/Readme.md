# Set Nested Value

This action will allow you to change or set the value of a nested field. For example, if you have:
```
temp:{
  data:{
    response:{
      field1: "foo"
      }
   }
}
```
and you want to change the value of `field1` to "bar", you cannot use the builtin `Set Value` function. Instead, you'll need to call this custom action with the following parameters:

Scope: temp

Key: data.response.field1

Value: bar

Then the object will look like:
```
temp:{
  data:{
    response:{
      field1: "bar"
      }
   }
}
```
