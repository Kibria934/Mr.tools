import React from "react";
import Blog from "./Blog";

const Blogs = () => {
  return (
    <div>
      <h1 className="text-4xl mt-20 text-center font-bold mb-5">My Answer</h1>
      <Blog
        head={`1. How will you improve the performance of a React Application?`}
      >
        The performance of react application can be improve by some step.
        firstly,We have to optimize our react application. It is neccesary
        strongly to boost up our application speed. Because when data change in
        DOM we want to re-render all. But if it dont happen and react re-render
        only those which we need then its performance will be grate. secondly,
        Bundling and minification is important for it. If we write our code in a
        single page its very difficult to understand for us. It is also herm our
        application. So if we use webpack it can easily control our
        performance.Using immutable data stracture can also improve our app. etc{" "}
      </Blog>
      <Blog
        head={` 2. What are the different ways to manage a state in a React application?`}
      >
        There are four types of state we use to manage our application state.
        These are Local State,Global Stat,Server State,Url State. 'Local state'
        is these state where we manage our data in one or more component, like
        when we count on click it change with useStat() hook. 'Global state' is
        a step which help us in changing our data from another component and
        anywhere we can use it. like authentication process.'sever state' is
        manage those data which is come from external resourse. 'url state' is
        helpful for mange data with change of url pathname.{" "}
      </Blog>
      <Blog
        head={` 3.  Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts`}
      >
        At first we use useState for changing our data onClick of any button. If
        we set [...] it can not changer our data on click. But if we think that
        in future any data might be change than we need to useState. UseState
        return always a paire n is product another is setProduct. On any
        occurance if we set the value in setProduct then it can change or update
        our data but if not then [...] can not be update.
      </Blog>
      <Blog head={` 4.What is a unit test? Why should write unit tests?`}>
        Unit test is process of testing our written code.If we do this it can
        easily find us the early flaws of our application.Unit testing is a
        component of test-driven development , a pragmatic methodology that
        takes a meticulous approach to building a product by means of continual
        testing and revision. if we use it,it can make easiar our debugging
        process. developer can make change easily the code if error.Developer
        can also re-use these code in migrating it in new project.
      </Blog>
      <Blog head={` 5. How does prototypical inheritance work?`}>
        prototypical inheritance is the ability of access object porperties from
        other object.We use a JavaScript prototype to add new properties and
        methods to an existing object constructor. We can then essentially tell
        our JS code to inherit properties from a prototype.prototypical
        inheritance work using this inheritance properties Date objects inherit
        from Date.prototype.Array objects inherit from Array.prototype.Player
        objects inherit from Player.prototype.
      </Blog>
    </div>
  );
};

export default Blogs;
