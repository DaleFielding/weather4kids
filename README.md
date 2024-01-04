# Weather 4 Kids
The purpose of this project is to create a website that assists young children with learning about the weather. The site will be intended to be interactive, fun, engaging and provide information in a way that is easier for younger children to understand.

[View the live project here]() <em>... to be added</em>

## User Experience (UX)

### User Stories 
1. As as user, I would like to view the current weather forecast for today in my location and in other cities.
2. As as user, I would like to view the details of the current weather. Such as precipitation, wind etc.
3. As as user, I would like to see imagery relating to the type of weather.
4. As as user, I would like to interact with elements in the site by either clicking with a mouse or by using a keyboard.
5. As as user, I would like to learn about weather through snippets of information.
6. As as user, I would like to provide feedback to the site owner/developer, and for this to be acknowledged.

### Site Objectives
1. To assist young children (ages 4-7) with learning about the weather.
2. To be responsive and functional.
3. To meet all accessibility requirements, allowing anyone to use the site regardless of their abilities/needs.
4. To display reasonably accurate data relating to the weather.

## Design
### Strategy
  Taking into account the intended website, I have:
  - Spoken with a primary school teacher to obtain their opinion on requirements for this age group. They have suggested that children of this age will respond well to; bright/vibrant visuals and interactive elements. Also Information should be concise and the site easy to use.<br>

  - Conducted research into similar sites:
    - [Weather wiz kids](https://www.weatherwizkids.com/) 
    - [Kids weather report](https://kidsweatherreport.com/report/bristol/c) 
    - [Climate kids - weather and climate ](https://climatekids.nasa.gov/) 
    - [DK findout - weather](https://www.dkfindout.com/uk/earth/weather/)<br>
   
    General findings from site research:
    - A couple of the sites display the actual weather through an API. One only provides for a fixed location (Indianapolis), the other shows this for the current location and also has an option to search other locations.
    - Colouring varies between sites. Most have opted for a white background with one or two colours. One site has multiple colours and a blue background.
    - They all contain imagery, some more than others.
    - Kid style fonts are generally used for headings.
    - They all display a logo at the top of the page. 
    - Navigation is towards the top of the page.
    - Footers generally have navigation.
 
  In summary, I believe there is an opportunity to make this website really stand out from the others in terms of the target market.<br>It seems that the majority of other sites tend to be very informative but not overly eye-catching or engaging. I also feel that younger children may be overwhelmed with the vast amount of information displayed. <br>
    
  The strategy is to create a website that meets all of the expectations from the user stories, site objectives and takes into account findings from the research conducted. 

### Scope
  I have listed the possible features below and ranked 1-5 in level of importance/relevance to user needs (1 being most important and viable/feasible):
  | Possible Feature | Rank |
  |---|---|
  | Current weather displayed for today from current location | 1 |
  | Weather icons/images | 1 |
  | Snippets of information | 1 |
  | 404 page | 1 |
  | Site navigation | 1 |
  | Accessibility | 1 |
  | Device/resolution responsivity | 1 |
  | Responses to user action | 1 |
  | Interactive elements | 1 |
  | Contact us/feedback form | 1 |
  | Ability to search for other locations | 1 |
  | Current weather broken down into;<br> &nbsp; morning, afternoon, evening and night | 2 |
  | Audio - weather sounds  | 2 |
  | Logo | 3 |
  | Social links | 3 |
  | Video footage | 4 |
  | Animations | 4 |
  | Quiz | 5 |
  | Weather tips | 5 |

  Following review of scope, I had decided not to include:
  - Video footage 
  - Animations 
  - Quiz
  - Weather tips

  This decision was made as these would extend beyond the necessary requirements for the project and may take more time than appropriate. They will be considered for future implementations.

### Structure 

The site will be designed largely as a single page layout, with the majority of the features within the homepage. The only exception to this will likely be the 404 page.<br> I have listed the pages below including the features they will contain. Not all features will be displayed on initial page load, instead the main content will be replaced when necessary to dynamically change the layout/content using JavaScript and/or covered by a model.

* Homepage:
  * Logo and site name, clicking on these will reload the home page.
  * Location search bar.
  * A heading that lets the user know the city they are in, current temperature and feels like temperature.
  * Current weather information will be displayed for current location; morning, afternoon, evening and night. These will be clickable, and will dynamically change the html in the page with:
    - Snippets of information for learning about the current weather, the user will be able to discover further information by clicking a button.
    - A button to play audio that is relevant to the current weather/snippet.
    - Details relating to current weather such as; precipitation, wind etc.
  * Social media links.
  * Contact/feedback form, when clicked the main content will be replaced with:
    * A form that allows the user to enter their name, email and any feedback or questions. To then press submit and be notified if successful.
  * Interactive elements will be made obvious and easy to use, and when html has dynamically changed to other content there will be a button to indicate how to get back to the home page.
  * Semantic HTML will be used throughout.

* 404 page:
  * Will be consistent in that it shares the same design as the home page, including the logo and the footer, however it will not include the general content from the home page. 
  * A message to the user that they have tried to visit a page in the domain that does not exist.
  * There will be an obvious link/button within the page content that will direct the user to the home page.

