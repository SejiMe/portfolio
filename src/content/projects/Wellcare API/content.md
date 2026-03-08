---
title: "Wellcare API "
year: "2024"
layout: "../../../layouts/ProjectLayout.astro"
description: "A Backend Web API Server for processing Core Features for In-House Systems."
link: "https://github.com/SejiMe/portfolio/tree/main/public/APILogbookCensored.png"
technologies: [".NET", "C#", "SQL Server", "Entity Framework Core", "Dapper"]
img_alt: "WellCare API (CLDH)"
img_path: "/APILogbookCensored.png"
---

## Overview

Developed a robust backend Web API server using .NET and C# to handle core features for in-house systems. The API is designed to efficiently process and manage data, providing seamless integration with various client applications. Key functionalities include data retrieval, manipulation, and storage, all while ensuring high performance and security.

I prepared the API server to be easily extendable by using Vertical Slice Architecture, which allows for better separation of concerns and maintainability. The API is built with scalability in mind, utilizing SQL Server for data storage and leveraging Entity Framework Core and Dapper for efficient data access and manipulation.

---


## Architecture and Design

**Vertical Slice Architecture** was implemented to organize the codebase to focus on features rather than technical layers. The project will only have userbase of internal employees, so I focused on optimizing the API for internal use, ensuring that it can handle high volumes of requests while maintaining low latency. The API is designed to be easily extendable, allowing for the addition of new features and endpoints without significant refactoring.

**Entity Framework** is used for easily scaffolding of COTS database as well as to handle internal developed database.

### Scope

I have limited the codebase to not include **CQRS** design to not overcomplicate the codebase considering the number of developers that will maintain the codebase in the current and future. I have also limited the codebase to not include **MediatR** library to avoid unnecessary abstraction and complexity in the codebase, as well as to avoid adding an additional dependency to the project. The API is designed to be easily extendable, allowing for the addition of new features and endpoints without significant refactoring, so I focused on implementing a clean and maintainable codebase that can be easily understood and modified by developers of varying experience levels.


