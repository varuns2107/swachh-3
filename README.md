# Swachh Saathi

Swachh Saathi is a civic sustainability web application built to help residents of Delhi report, understand, and respond to everyday civic issues in a simple and structured way. The platform aims to reduce confusion faced by citizens while dealing with municipal problems by providing clear categorization, priority identification, and guidance.

---

## Introduction

Urban cities like Delhi face frequent civic challenges related to waste management, sanitation, water supply, air quality, transportation, and energy infrastructure. While citizens are often affected by these issues, they may not know the correct authority to approach or the steps required to resolve the problem.

Swachh Saathi addresses this gap by offering a single interface where users can describe an issue in natural language and receive relevant information and guidance. The application focuses on usability, clarity, and accessibility rather than complexity.

---

## Problem Statement

Delhi residents encounter multiple sustainability-related issues on a daily basis. Reporting these problems is often difficult due to fragmented systems, lack of clarity about responsibilities, and absence of proper feedback mechanisms. As a result, issues remain unresolved or are reported multiple times without coordination.

Swachh Saathi aims to streamline this process by organizing citizen complaints, identifying issue types, and highlighting priority areas that require immediate attention.

---

## Key Objectives

- Simplify the process of reporting civic issues  
- Improve awareness about different categories of civic problems  
- Help users understand the severity and urgency of reported issues  
- Encourage community participation through duplicate issue detection  
- Provide basic insights into area-level civic health  

---

## Features

### Citizen-Focused Features
- Text-based reporting of civic issues  
- Natural language input for ease of use  
- Automatic categorization of issues  
- Identification of issue priority levels  
- Detection of duplicate issues already reported  
- Display of recommended actions for users  

### Insight & Monitoring Features
- Overview of reported issues  
- Identification of high-priority issues  
- Area-wise insights based on issue density  
- Basic tracking of issue status  

---

## Supported Issue Categories

- Waste Management  
- Water Supply and Leakage  
- Sanitation and Sewage Overflow  
- Air Pollution  
- Transportation and Road Issues  
- Energy and Electrical Hazards  
- Noise Pollution  

---

## Technology Stack

### Frontend
- React with Vite for fast development and performance  
- Tailwind CSS for responsive and clean UI design  

### Backend
- Flask (Python) for lightweight API handling  
- Rule-based and ML-assisted issue classification logic  

### Deployment
- Frontend deployed on Vercel  
- Backend deployed on Render  

---

## Live Application

- **Frontend URL:** https://swachh.netlify.app/
- **Backend URL:** https://swachh-saathi.onrender.com  

---

## Application Flow

1. User enters a description of a civic issue  
2. The system analyzes the input and categorizes the issue  
3. Priority level is determined based on issue characteristics  
4. Duplicate reports are identified to increase reliability  
5. User receives guidance and relevant information  

---

## How to Run Locally

### Frontend Setup
```bash
npm install
npm run dev
