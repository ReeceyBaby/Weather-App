This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Notes

- API request is limited to 20
- Material UI has been used for table, text inputs and dialog/modals - this was mentioned on the job spec so this was the library I chose - it's not something I've used lately except for this challenge so the implementation may not follow the documentation in all use cases
- Typescript has been used for the API endpoint, the documentation surrounding this wasn't great so I've created a type based on my best interpretation
- I had noticed during development that the API occassionally does fail so I introduced a check for an 'ok' response, if that happens while you are testing please try again later once the API is up again
- While using material UI I have set a base theme (limited) and some generic styles in global.css but most styling is handled with tailwind - ideally I'd only stick to a single approach to styling but with the time restraints I used what I knew to deliver the UI
- Date sort - this is performed with an alphabetical 'sort' which isn't ideal for dates - for a more robust solution I'd be tempted to use a third party library to handle all things date related
- Alert search/filter - currently only searches on the 'description' property but could be extended to any property fairly easily
- The description column in table has a fixed height - users can scroll this so they don't have to click on the row to open the alert in a modal dialog
- When clicking on a row alert a dialog modal is presented with some additional details - this is my judgement on what users may expect to see
- Badge colours - without knowing the scope of the data it's hard to determine the range and therefore colours for the different text values so I've just mapped a few for now
- Responsive - I've made a small attempt to display the UI and table column content differently depending on device width - this could be pushed a lot further but is a bit of a judgement call and also good discussion point/s
- IDE - I used VSCode since I'm familair with it but have used WebStorm in the past so would have no issues using it in the future