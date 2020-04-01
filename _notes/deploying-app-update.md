Just converted firebase functions to typescript.


Deployment steps - client - only:

0. Optional (only if node_modules folder has been deleted)
   From the tc-web/client dir:
   npm install
1. From the tc-web/client dir:
   npm run-script build
2. From the tc-web dir:
   firebase deploy --only hosting


Deployment steps - functions - only:
0. Optional (only if node_modules folder has been deleted)
   From the tc-web/functions dir:
   npm install
1. From the tc-web dir:
   firebase deploy --only functions
   note: this will automatically compile the ts

