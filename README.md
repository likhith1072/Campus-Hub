**🎓 Campus Hub**

**🔗 Live Link**: https://campus-hub-inky.vercel.app/

Campus Hub is a modern web application that allows users to discover schools, view details, and add new institutions.
Built with Next.js, Context API, and TiDB Cloud (MySQL), it provides a smooth experience with real-time updates.

**🚀 Features**

🏫 School Management – Add new schools with images and details.

📋 Show Schools – Browse all schools stored in TiDB Cloud.

📰 Recent Posts Section – View the 6 most recently added schools on the homepage.

🔍 Responsive UI – Fully responsive design with Tailwind CSS.

🎉 Notifications – Toast messages for success and error handling.

⚡ Fast Routing – Client-side navigation with Next.js.

**🛠️ Tech Stack**

Frontend: Next.js, React, Context API

Database: TiDB Cloud (MySQL)

ORM/Driver: `mysql2/promise`  

UI/Styling: Tailwind CSS, Lucide Icons

Deployment: Vercel

📂 Project Structure
```
Campus-Hub/
│── app/
│   ├── addSchool/        # Add school page
│   ├── api/              # API routes (Next.js server functions)
│   ├── components/       # Reusable components
│   │   ├── Header.js
│   │   ├── SchoolCard.js
│   │   └── SchoolsFetcher.js
│   ├── showSchools/      # Show all schools page
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Home page
│
│── certs/                # SSL certificates for DB connection
│   └── ca.pem
│
│── context/              # Context API (state management)
│
│── lib/                  # Database & Firebase configs
│   ├── db.js
│   └── firebase.js
│---.env
└── README.md
```

## 🚀 Getting Started

### 1️⃣ Clone the repo
```
git clone https://github.com/likhith1072/Campus-Hub.git
cd Campus-Hub
```
2️⃣ Install dependencies
```
npm install
```
3️⃣ Environment variables

Create a .env.local file in the root:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_NODE_ENV=development

MYSQL_HOST=gateway01.ap-southeast-1.prod.aws.tidbcloud.com
MYSQL_PORT=4000
MYSQL_USER=your_tidb_user
MYSQL_PASSWORD=your_tidb_password
MYSQL_DATABASE=test

# TiDB SSL certificate (base64 encoded)
CA_PEM=your_base64_encoded_ca_cert
```
🔐 Setting up TiDB SSL locally

TiDB Cloud requires SSL.

✅ Step 1:Download the CA cert from TiDB Cloud dashboard (ca.pem).

✅ Step 2:And move the ca.pem to certs folder as shown in project structure

✅ Step 3: Open Terminal in your project root
   ```
   cd "C:\Users\DELL\OneDrive\Documents\Web Development projects\campus-hub"
   ```
✅ Step 4:Encode ca.pem to Base64
Run this in Terminal:
you should be in C:\Users\DELL\OneDrive\Documents\Web Development projects\campus-hub then
```
[Convert]::ToBase64String((Get-Content -path .\cert\ca.pem -Encoding byte)) > ca.pem.base64
```
This will create a new file ca.pem.base64 in your project root.

✅ Step 5:Copy the encoded value

Open the new file ca.pem.base64 in VS Code or Notepad.

Copy the whole (very long) single-line string.

✅ Step 6:Add it to environment variables
For deployment On Vercel, just paste the same CA_PEM into your project’s Environment Variables.
No need to upload ca.pem — it’s read directly from CA_PEM.

🗄 Database Schema
```
The schools table is automatically created if it doesn’t exist:
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  UNIQUE KEY unique_school (name, address, city)
);
```
▶️ Run locally
```
npm run dev
```
Visit http://localhost:3000
.

