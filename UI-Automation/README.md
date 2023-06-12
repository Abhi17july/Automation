## Running the Automation Project 
Its a maven build project having POM.xml 

Pre-requisite : Start the local server( ng serve or npm start under ng-pc-builder-fe &  
Start backend application under java-pc-builder-be -run PcApplication as java application )


1. Set the java and maven path in system envirorment 
2. run mvn clean install
3. Locate the MyTestRunner file under project and add as per user pref. for 
    feature file path and Stepdefinition in glue .
4. run MyTestRunner.java as java application
