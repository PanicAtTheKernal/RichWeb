# Question 1
Stream abstraction is a programming concept where a sequence of data elements are made available over time, also known as streams. Streams transmit data one by one instead of all at once. Streams are useful for processing data where the potential size is unknown or when the data will arrive in the application. 

Streams implement the observer pattern. Streams are placed inside an object called the subject, where observers can subscribe to the subject and be notified of any changes in the subject's state. Observers can react to data as soon as it arrives. An observer is similar to a promise but is different since promises handle a single event once the promise is completed, while observers handle multiple values. 

Streams are useful for modelling various scenarios, such as handling real-time updates or processing large amounts of data without loading all of it at once. An example would be a chat in a livestream where new messages are added in real-time. 
# Question 2
To create an API interface using rxjs, first, you need to create a new Observable Object and inside have an arrow function that uses fetch to call the API. Call subscribe.next() to with the JSON object from the fetch. Next, create a variable called subscriber, which subscribes to the observable, and inside the subscribe function, add an arrow function with how you want to handle the JSON object from the API. Then, after that is done, call unsubscribe on the subscriber variable to prevent a memory leak.

The advantage of streams over promises is that streams handle data in real-time. Stream allows for components to be updated as soon as the values arrive from the server. Another advantage is that they can handle more than one value, like mouse movement, compared to promises, which can't. Another advantage of streams is that several application components can make the same API call to retrieve the same data. Instead of each component calling the API, they only need to subscribe to the observable, which makes only one call to the API and still updates all the components. 

The disadvantage of streams is that they can be overkill for more simple interactions and aren't worth the performance cost versus just using promises. Another disadvantage is that observers can cause memory leaks if not properly managed. Another disadvantage is debugging since it is unknown when the data will arrive. It can make it difficult to find where the bug can be. 
# Question 3
If the functions A, B and C share a global state, then several issues can occur. The first is a race condition where a function can update the state, but other functions might not receive the update. The second issue is that data can be inconsistent from the race condition. This results in the state being updated using out of date values. It's hard to debug the state since it will be hard to figure out which function just updated the state.

To fix these issues, make the state a subject and have each of the functions subscribe to it. This allows a function to update the state, and if another function is also updating the state, it can be notified to cancel the update and try again with the updated value. 