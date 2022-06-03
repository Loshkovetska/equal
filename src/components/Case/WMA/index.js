import wimage from '../../../images/cases/wma/WMA7.png'
import image1 from '../../../images/cases/wma/image1.png'
import image2 from '../../../images/cases/wma/image2.png'
import image3 from '../../../images/cases/wma/image3.png'
import image4 from '../../../images/cases/wma/image4.png'
import image5 from '../../../images/cases/wma/image5.png'
import image6 from '../../../images/cases/wma/image6.png'




export const wma =   {
    id: 1,
    title: 'WMA',
    link: '/WMA',
    types: ['B2B MARKETPLACE', 'MOBILE APP'],
    src: wimage,
    info: `<ul>
      <li class="slide-wrap">
       <div class="slide-up">
        <h3>CLIENT</h3>
        <p>Neorise</p>
        </div>
      </li>
      <li  class="slide-wrap">
      <div class="slide-up">  <h3>ROLE</h3>
        <p>
UX & UI design / Product Design</p> </div>
      </li>
      <li  class="slide-wrap">
      <div class="slide-up">  <h3>Project</h3>
        <p>
Mobile App / Management System</p> </div>
      </li>
      <li  class="slide-wrap">
      <div class="slide-up">  <h3>CLIENT SAYS</h3>
        <p>«We were really impressed with their design thinking and their UX skills»</p>
           <p class="grey">Patrick D'Cruze, Director, Neorise</p>
           </div>

      </li>
    </ul>`,
    description: `
      <div>
       <div class="slide-wrap title"> <h1 class="slide-up  wma-desk">workshop mechanic APP</h1>
       <h1 class="slide-up wma-mob">WMA</h1></div>

       <div class="parallax appear">        <video
       disablePictureInPicture
       class=""
       preload="true"
       autoplay="true"
       muted="true"
       loop="true"
       src="https://equal.design/videos/wmavideo1.mp4"
     >
       <source src="https://equal.design/videos/wmavideo1.mp4" type="video/mp4" />
     </video>
</div>
<div class="case__content-info list-mob">
       <ul>
      <li class="slide-wrap">
       <div class="slide-up">
        <h3>CLIENT</h3>
        <p>Neorise</p>
        </div>
      </li>
      <li  class="slide-wrap">
      <div class="slide-up">  <h3>ROLE</h3>
        <p>
UX & UI design / Product Design</p> </div>
      </li>
      <li  class="slide-wrap">
      <div class="slide-up">  <h3>Project</h3>
        <p>
Mobile App / Management System</p> </div>
      </li>
      <li  class="slide-wrap">
      <div class="slide-up">  <h3>CLIENT SAYS</h3>
        <p>«We were really impressed with their design thinking and their UX skills»</p>
         <p class="grey">Patrick D'Cruze, Director, Neorise</p>
        </div>

      </li>
    </ul>
</div>
<div class="slide-wrap slide-up"> <strong class="w-888">Company Neorise first approached us for urgent implementation of a UX/UI design concept for the taxi application of their client. After we completed the work, they were so happy with the results that they returned to us for an MVP of their internal project. <br/> <br/>
Workshop Mechanic App helps to manage the internal processes of an automobile repair workshop. Our task was to study their business processes and develop ideas for an intuitive and efficient app that is easy to use.</strong></div>

      </div>
      <div>
         <div class="parallax appear"> <img src=${image2} alt="" /></div>
        <div class="slide-wrap slide-up"><h2 class="slide-up">Challenge</h2></div>
        <div class="slide-wrap">  <p class="slide-up w-659">The idea of the Workshop Mechanic App was to collect all the typical automobile repair workshop tasks and display them in one place, easy to access and manage for both mechanics and their managers. <br/>
The first obstacle was implementing the necessary functionality for two target personas ― all in the same user interface. In every workshop, there are mechanics who perform the repair, and managers who monitor their performance. <br/>
The second challenge was to structure and facilitate interaction between the mechanic and the platform. Every specialist must have unified and precise instructions on how to approach the repair. A checklist would allow the workshop to maintain service standards: even if it's the mechanic's first day at a new job, they would immediately understand the workflow and get started. </p>
        </div>
        </div>
      <div class="slide-wrap slide-up"><h2 class="slide-up">Solutions</h2></div>
<div>
      <div class="slide-wrap">  <p class="slide-up  w-659">We ideated two utterly different workflows that didn't intersect to make the app satisfying for both managers and mechanics. First, we concentrated on mechanics: created a feed of available workshop jobs and assigned tasks, added detailed descriptions of cars and what needs to be done to each ticket. To start working, mechanics need only to click one button.  <br />
As for managers, we added additional functionality. For example, only managers could add new cars, assign tasks, and onboard new mechanics. <br />
Organizing the app navigation this way, we developed an app that is convenient for both managers and mechanics and doesn't contain any redundant features. <br />
        <br />
        To continue the design process coherently, based on the site map, our designers began to work on the landing page. To consistently continue the design process, based on the site map, our designers began designing with the landing page. Since the landing page includes methods for the visitor to get into contact with the company, its development reveals insights into further promotion of the platform.</p></div>
</div>
         <div class="parallax appear">  <img src=${image3} alt="" /></div>
     <div class="slide-wrap slide-up"><h2 class="slide-up">Development</h2></div>
     <div>
      <div class="slide-wrap">

        <p class="slide-up w-659">First, we created user scenarios: Mechanic and Manager. For each, we conducted in-detail research to discover what functionality would be helpful for them. Then, we elaborated a user flow and created a list of possible features. Based on that hypothesis, we then created wireframes. After we tested the wireframes and made sure that the user flow, as we see it, matches reality, we designed a clickable prototype.
      </p>
      </div>
     </div>
      <div class="parallax appear">    <img  src=${image4} alt="" /></div>
      <div>
        <div class="slide-wrap slide-up"><h2 class="slide-up">Features</h2></div>
        <ol>
          <li class="slide-wrap slide-up">
            <h3>Customer experience</h3>
            <p class=" w-659">
We didn't just focus on user experience but on customer experience, which is how the work happens in a repair shop and the interactions that mechanics have with their managers and colleagues. An interesting detail is that we only needed to make an app for the tablet. Therefore, navigation was to be thought of to be comfortable for mechanics to use on the spot. Mechanics should quickly click a couple of buttons to take a task or mark it done. We implemented big buttons and large headers that are very convenient for fast use of the app. </p>
          </li>
          <li class="slide-wrap slide-up">
            <h3>Status update</h3>
            <p class=" w-659">
All managers and mechanics can see the status of orders (Available, Work in progress, Waiting for parts). This feature simplifies the work and eliminates the confusion when two mechanics work on the same car or order the same car parts.</p>
          </li>
          <div>
          <div class="parallax appear">  <img  src=${image5} alt="" /></div>
<div>
          <li class="slide-wrap slide-up">
            <h3>PIN</h3>
            <p class=" w-659">
Every mechanic has a unique number that they wear on their uniform. We decided to use it as a PIN code for entering the app. The productivity of each mechanic is tracked carefully. Based on their activity, they receive raises or bonuses. We wanted to make sure that there are no accidental logins to another person's account. </p>
          </li>
           <li class="slide-wrap slide-up">
            <h3>Car parts stocking</h3>
            <p class=" w-659">
It is possible to order car parts inside the app. After the audit, mechanics can choose what details they need in a special window or re-direct the order to the manager. In two clicks, it is possible to add to the cart and confirm the order. It streamlines the repair process and increases customer satisfaction in the long run.           </li>
        </ol>
      </div>
            <div class="parallax appear">    <img  src=${image6} alt="" /></div>
     <div class="slide-wrap slide-up"><h2 class="slide-up">Results</h2></div>
<div class="slide-wrap">
      <strong class="slide-up w-888">We have been working on the project for X months. As a result, we created a clickable prototype of a multifaceted platform that improves interactions inside the workshop and facilitates the workflow. The client was satisfied with the results, and we are still in touch, polishing the last details. Now the MVP is at the stage of pre-release. </strong>

</div>


`,
  }
