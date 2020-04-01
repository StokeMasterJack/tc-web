To update an existing workshop:
    1. Go to https://checkvist.com/checklists#main
    2. Make your changes to one of the "Xxx Training" outlines
    4. Run the RefreshXxxOutline.kt script
        This will generate a new xxx-outline.json file under client/src/data/outlines/
    5. Redeploy react app (see below)

To add a new workshop:
    1. Go to https://checkvist.com/checklists#main
    2. Copy one of the "Xxx Training" outlines (be sure to make it public)
    3. Add a new entry to data/workshops.json
    4. Update outlines map (and imports) at the top of service.js
    4. Create a new RefreshXxxOutline.kt
        Running this will generate a new xxx-outline.json
        file under client/src/data/outlines/

To add an open enrollment class to the schedule:
    Add it to events.json

Then [deploy the app](./deploying-app-update.md)

