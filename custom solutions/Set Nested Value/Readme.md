# Set Nested Value

Original author: @ptrckbp

Last updated by @ptrckbp on 4 June 2022

## Overview
This custom action extends the builtin `set-variable` action to enable developers to add and modify nth-level fields within an object.

## Use cases:
Imagine you have an object like:
```
temp:{
  data:{
    resources:{
      field1: "Foo"
    }
  }
}
```

and you want to change it to:
```
temp:{
  data:{
    resources:{
      field1: "Bar"
    }
  }
}
```

Just run this action with the following parameters:

<img width="671" alt="image" src="https://user-images.githubusercontent.com/77560236/172642372-723a9d46-609a-4e59-8aad-50f8412e7b7b.png">

## How to use
1. Create a node and add this action to it.
2. Fill out parameters as desired:

    **Scope:** Either `user`, `session`, or `temp`

    **Key:** The path to the field, separated by periods (".")

    **Value:** The end value to set the field to

### Note:
This action will create any fields or object levels that don't exist. If no value is specified, the field will be undefined.
