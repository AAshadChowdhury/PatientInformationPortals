# Patient Information Portal

Welcome to the Patient Information Portal application! This README file provides detailed information on how to access and use the various features of the application.
## CQRS Process with MediatR and CRUD with Code-First .NET Core Framework

This application follows the CQRS (Command Query Responsibility Segregation) process using MediatR for handling commands and queries. Additionally, it implements CRUD (Create, Read, Update, Delete) operations with a Code-First approach using the .NET Core framework.

## Features

### Patient Entry Form

The Patient Entry Form allows you to add new patients to the system. Follow these steps to access the patient entry form:

1. Open the application in a web browser.
2. Navigate to the patient entry form page.
3. Fill in the required information for the patient, such as name, disease information, and epilepsy status.
4. Select the NCDs (Non-Communicable Diseases) and Allergies for the patient using the provided multi-select fields.
5. Click the "Save" button to add the patient to the system.

### Patient List

The Patient List displays all the patients in the system. To access the patient list, follow these steps:

1. Open the application in a web browser.
2. Navigate to the patient list page.
3. View the list of patients, including their name, epilepsy status, and action buttons for editing/previewing and deleting.


## Installation

To install and run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the terminal or command prompt and navigate to the project solution directory.
3. Run the `Update-Database` command in the Package Manager Console to apply migrations to the local database server. Use the following connection string: `Data Source=(localdb)\MSSQLLocalDB; Initial Catalog=Patientdb`.
4. Execute the SQL script file named `PatientPortalQuery.sql` provided in this GitHub project. Uncomment and insert the necessary test data queries to populate the tables.
5. Start the application in Visual Studio by selecting multiple startup projects. Ensure that both the frontend and backend APIs are included.
6. Open a web browser and navigate to [https://localhost:7185](https://localhost:7185) to access the application.

Please note that the connection string and port number may vary based on your specific setup and configuration.
