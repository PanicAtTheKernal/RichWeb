# Question 1
Props are parameters that are passed to the components. These props can be accessed inside the component
```javascript
//Creating a new component and passing props
<component exampleProp="This is an example"></component>

//How to access the props within a component
function component(props) {
    return <p>{props.exampleProp}</p>
}
```

States store information for the component which can be used to update values in the component
```JavaScript
// How to use state
function component() {
    const [exampleState, setExampleState] = useState("Example of how to set inital state")

    return <p>{exmpleState}</p>
}
```

# Question 2
A functor is a function that can be used to apply to each element in an array. For example the map function in Javascript can loop through an array, modify it and return the result as a new array.

```JavaScript
const exampleArray [0,1,2,3,4,5]
// This map funciton will map through each element and add 100 to the element. The new array is added to the mappedArray variable
const mappedArray = exampleArray.map((elementInArray) => {
    return elementInArray + 100
})
```

# Question 3
#### Callbacks:
- Advantage: Callbacks are easy to write, understand and implement for more simple senarios. 
- Disadvantage: Callback can result in callback hell where callbacks are constantly nested which affect maintainablilty
#### Promises:
- Advantage: Don't issue with callback hell since the synctax for promises is easy to read, this is done with chaining where one promise is chained after another
- Disavantage: For simple tasks a lot of boilerplate code is required compared to callbacks

#### Streams:
- Advantage: Can handle large amounts of data in a without using all the memory 
- Disadvantage: Only useful for more complex senarios like real time data but not simple tasks because of the amount of work it requires

# Question 4
Box model has 4 layers, margin, border, padding and content. Margin repsents how far away the border should be from other tags. Border is a visual outline of the box, padding is distance between the content and borders.

```css
.box {
    margin: 5px; /*Set the border away from other tags by 5px*/
    border: 3px solid black; /*Sets a 3px border around the box*/
    padding: 5px; /*Pushes the content 5px from the border*/
}
```

# Question 5
- User types url to browser
- The browser sends the url to the server
- Server sends back all the media content such as html, css, javascript, images, etc
- Once the assets have been loaded, the browser begins to parse the html content and DOM is created
- The javascript begins to execute and page is rendered to the user