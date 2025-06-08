# FrontAdmin - Inventory Management System

FrontAdmin is an Angular-based inventory management system with a comprehensive set of features for managing products, categories, suppliers, users, and generating reports.

## Features

- **User Authentication**: Secure login system with token-based authentication
- **Dashboard**: Overview of system operations with quick access cards
- **Product Management**: Add, edit, and delete products with stock tracking
- **Category Management**: Organize products into categories
- **Supplier Management**: Maintain supplier information
- **Inventory Transactions**: 
  - Product registration (incoming inventory)
  - Product output (sales/outgoing inventory)
- **Reporting**: Visual analytics with ApexCharts integration
- **User Management**: Create and manage system users

## Technologies Used

- **Frontend**: Angular 16
- **UI Components**: Bootstrap 5
- **Charts**: ApexCharts
- **Authentication**: JWT
- **State Management**: RxJS Subjects and BehaviorSubjects
- **Forms**: Reactive Forms with extensive validation
- **HTTP**: HttpClient with interceptors
- **Modals**: Custom modal system
- **Tables**: DataTables integration

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd front-admin

   npm install

src/
├── app/
│   ├── core/                  # Core services
│   ├── interfaces/            # TypeScript interfaces
│   ├── modules/               # Feature modules
│   │   ├── administration/    # Dashboard module
│   │   ├── auth/              # Authentication module
│   │   ├── categories-administration/
│   │   ├── output-products/
│   │   ├── registration-products/
│   │   ├── reports/
│   │   └── suppliers-administration/
│   ├── services/              # Data services
│   ├── shared/                # Shared components
│   ├── utils/                 # Interceptors and guards
│   └── *.module.ts            # Main application modules
├── assets/                    # Static assets
└── environments/              # Environment configurations
