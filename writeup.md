This is a project from Traversy Media@youtube. I learned the following:

1. The {} in function parameters. 
    It's surprising but all my bugs are from this syntax. {} denotes a field from a big object when used in function parameter.
    It extracts only that field and pass to the function and offers great conciseness. Normally a language would require function 
    calls pass same type and same amount of arguments as function definition, a dynamic typed language would require same amount, 
    but javascript requires nothing. This makes function pipeline, another fundamental programming problem, unstable.

2. How to update states in React.js.
    React doesn't support state=new_state syntax, instead, it needs you to construct a new state then setState(new_state). That's 
    why there is paradigm for updating React states.
    Add: new_state = [...state, new_record]
    delete: new_state = state.filter() because filter will return a new object
    update: new_record = state.map() because map returns a new object as well

3. Context and reducer.
    The paradigm for state management in React is to create state in parent component and pass down the method for setting upon action.
    When the states are complicated or components tree is too deep, the passing down behavior becomes problematic. This is where context
    comes in. It takes in the states and provides to all other components directly through a provider component. It can be think of a 
    parent component purely about data, not UI. 
    When the state updating rule is too complex, a simple set method can't cut it. And the reducer comes to rescue. The reducer provides 
    a set function called "dispatch" which passes the action information to a function which can construct complicated logic to set states
    based on the action information. The function uses switch/case syntax to handle different scenarios.
    Context and reducer together tackle the state management complexity.

There is a second part of this project that implements the backend. I coded it as well and here are the takeaways:

1. Function pipeline.
    Front end sends http request to a URL called API endpoint, the method and the URL together fires a function which utilizes the the payload
    to interact with the database. The variables here are the data format and the URLs.

2. Backtick string.
    Another surprise from javascript. To escape a variable from a string, the variable needs to be warped like this: ${variableName}, and the 
    string needs to be wrapped in backticks `...` instead of single quote '...'. This is a real bumper for someone just comes to javascript.
