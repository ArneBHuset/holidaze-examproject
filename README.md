# Holidaze - Luxury Accommodation Booking Platform 🏝️

Holidaze is a modern website that allows users to book venues and villas worldwide.
The platform serves both customers, who want to book venues, and see upcoming bookings, and venue managers, who can list, manage, and edit their venues and bookings.

This project was developed as part of the Noroff Project Exam 2, showcasing  front-end development skills with a focus on user experience, responsive design, and seamless integration with an external API.

## EXAM REQUIREMENTS
The client has specified the following requirements in the form of User Stories:
1. A user may view a list of Venues
2. A user may search for a specific Venue
3. A user may view a specific Venue page by id
4. A user may view a calendar with available dates for a Venue
5. A user with a stud.noroff.no email may register as a customer
6. A registered customer may create a booking at a Venue
7. A registered customer may view their upcoming bookings
8. A user with a stud.noroff.no email may register as a Venue manager
9. A registered Venue manager may create a Venue
10. A registered Venue manager may update a Venue they manage
11. A registered Venue manager may delete a Venue they manage
12. A registered Venue manager may view bookings for a Venue they manage
13. A registered user may login
14. A registered user may update their avatar
15. A registered user may logout

#### Required Links
The Product Owner has requested links to the following:

1. A Gantt chart for project timing
2. A design prototype
3. A style guide
4. A kanban project board
5. A repository link
6. A hosted application demo link

#### DISCALIMER
The API used for this project is provided by Noroff. Other student have access to this API and can post data. Be aware that venuesposts and profile details might contain some weird stuff :)

## ✨ Features

#### Customer-Facing
- Browse a selection of luxurious venues and villas
- Search for venues based on location, price, and availability
- View detailed venue pages with media galleries, descriptions and a calendar overview
- Book venues and view upcoming bookings
- User Authentication: Register, log in, and manage your profile
- Edit your profile, including updating your avatar and other details

#### Admin (Venue Manager) Features
- Register as a venue manager (for users with a stud.noroff.no email)
- Create new venues with custom descriptions, media, and pricing
- Manage bookings for each venue, view guests, and edit or delete venues

## 🌐 Live Demo

Check out the live version of Holidaze here:

[Findmyholidaze](https://findmyholidaze.netlify.app)

## Planning

[Github projects](https://github.com/users/ArneBHuset/projects/17/views/1)

## Figma
## Authors

#### Arne Bjelde Hustveit

- [Linkedin](www.linkedin.com/in/arne-bjelde-hustveit-48ab31276)
- [Github](https://github.com/ArneBHuset)
- [Portfolio](https://arnehustveit.myportfolio.com/)


## 🚀 About Me

Studying Interaction design at the University of Bergen, finishing my bachelors June 2025 (180ECTS)

Studying frontend-development at Noroff School of Technolgy, finishing October 2024 (60ECTS)

#### Project feedback or other inquieries?
#### Get in touch! 😊

arne_hustveit@hotmail.com


## 🛠 Tech Stack

#### Frontend:
- React (v18+)
- TypeScript
- Material UI (MUI)
- Redux for state management
- Yup and React Hook Form for form validation
- Full calendar for displaying bookings made
- Dayjs for handling time and date

#### Backend:
- Project Integrated with the Holidaze API (from Noroff API Documentation)

#### Build Tools:

- Vite
- Jest for unit testing
- ESLint and Prettier for code quality and formatting
- Husky for commit hooks
- JetBrains Webstorm IDE used for development


#### Hosting:
- Netlify for deployment and hosting


## 🚀 Running locally

1. Clone the project

```bash
  git clone https://github.com/ArneBHuset/holidaze-examproject.git
```

2. Project should be in root folder, if not:

```bash
   cd holidaze-examproject
```

3. Set up environment variables

```bash
VITE_NOROFF_API_KEY='your key'
```

4. Install dependencies

```bash
  npm install
```

5. Start the development server

```bash
  npm run dev
```


## 🧪 Running Tests

The project uses Jest for unit testing. To run the tests, use the following command:

```bash
  npm run test
```

## 💡 Lessons Learned

#### Type Safety with TypeScript:

This project was developed using TypeScript to maintain typesafety. One challenge encountered was ensuring compatibility between Day.js and TypeScript types. Day.js’s dynamic date handling sometimes conflicted with stricter TypeScript type expectations, especially when dealing with null or undefined values in date objects. AI tools proved helpful in creating interfaces and ensuring i did not miss any references. Best practices when it comes to typesafety is a complex field, and something i learn more about for each project i undertake.

#### FullCalendar Integration:

FullCalendar was used to display booking made and availability. Customizing FullCalendar to match the design while also handling complex booking logic provided insights into its flexibility and how event data can be manipulated dynamically within the app, especially in combination with Day.js for date manipulation.

#### MUI Customization & Reusable Components:

In this project i dug deeper into how i could use MUI to create reusable components that matched the project’s design vision. I created custom button styles, input components, and modal layouts by overriding MUI’s default themes and using its sx prop for specific style overrides. This approach allowed me to maintain consistency across the app while reducing code duplication and enhancing maintainability. Creating a well structured component library early on proved time-efficient for the rest of the project

#### API intergration
Handling various user stories through API integration, including both a customer side and venue managers side.

#### Validation
Implementing form validation using Yup and React Hook Form, particularly for user registration and venue creation.

#### State managment
Efficient state handling with Redux to manage bookings, venues, and user authentication across the app.

#### Responsiveness
Leveraging MUI to ensure a seamless experience across devices, focusing on user experience and accessibility.

#### Improvements
With a 6 week timeframe, one can only do so much. This is primarly a frontend-prject, but in a real scenario i would spend more time conducting UX-research, validating the design through user testing, interviews and observations.

In regards to the more technical, i would start by creating an TS interface structure early on to keep it cleaner. I would also focus more on accessibility within in the code.

## 🖌️ Style Guide
The design of Holidaze follows a consistent visual style, using the Cinzel and Lora fonts, and adhering to a luxury theme with the following color palette:

#### Color	Hex
Primary Dark	#121212
Primary Light	#404040
Holidaze color	#F88349
Background gray-white #E8EDF0
Background white  #FCFCFC
Background effect	#49BEF8
Error #ac1b00
Success	#67F849
## 🤝 Acknowledgements

- [MaterialUI](https://mui.com/material-ui/getting-started/)
- [stackoverflow](https://stackoverflow.com/)

#### AI tools
AI tools have been used for this project, not to do the developing and solve the broad problems, but as a tool to debug, proivde JSdocs, ensure typesafety and to improve small codeblocks where necessary. 


