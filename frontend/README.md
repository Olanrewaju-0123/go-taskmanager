# Task Manager Frontend

A modern React frontend for the Task Manager application, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 **Features**

- ✅ **Create Tasks** - Add new tasks with a simple form
- ✅ **View Tasks** - Display all tasks in a clean list
- ✅ **Edit Tasks** - Inline editing for task titles
- ✅ **Complete Tasks** - Toggle task completion status
- ✅ **Delete Tasks** - Remove tasks with confirmation
- ✅ **Real-time Updates** - Immediate UI feedback
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Smooth loading experiences

## 🛠️ **Tech Stack**

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite (super fast development)
- **Styling**: Tailwind CSS (utility-first CSS)
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React (beautiful SVG icons)
- **Notifications**: React Hot Toast
- **State Management**: React Hooks with custom hooks

## 📁 **Project Structure**

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Application header
│   │   ├── TaskForm.tsx    # Task creation form
│   │   ├── TaskItem.tsx    # Individual task display
│   │   └── TaskList.tsx    # Task list container
│   ├── hooks/              # Custom React hooks
│   │   └── useTasks.ts     # Task management logic
│   ├── services/           # API services
│   │   └── api.ts          # HTTP client setup
│   ├── types/              # TypeScript type definitions
│   │   └── task.ts         # Task interfaces
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 16+ and npm
- Go backend running on port 8080
- PostgreSQL database running

### **1. Install Dependencies**

```bash
npm install
```

### **2. Start Development Server**

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### **3. Build for Production**

```bash
npm run build
```

### **4. Preview Production Build**

```bash
npm run preview
```

## 🔧 **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 **API Integration**

The frontend communicates with the Go backend API:

- **Base URL**: `http://localhost:8080`
- **Endpoints**:
  - `GET /tasks` - Fetch all tasks
  - `POST /tasks` - Create new task
  - `PUT /tasks/{id}` - Update task
  - `DELETE /tasks/{id}` - Delete task

## 🎨 **Styling**

- **Tailwind CSS** for utility-first styling
- **Custom color scheme** with primary colors
- **Responsive design** for all screen sizes
- **Smooth transitions** and hover effects
- **Accessible components** with proper focus states

## 📱 **Responsive Design**

- **Mobile-first** approach
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interface elements
- **Optimized spacing** for different devices

## 🔒 **Error Handling**

- **User-friendly error messages**
- **Toast notifications** for success/error feedback
- **Graceful fallbacks** for failed operations
- **Retry mechanisms** for failed requests

## 🚀 **Deployment**

The frontend can be deployed to any static hosting service:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 🤝 **Contributing**

1. Follow the existing code style
2. Add TypeScript types for new features
3. Include proper error handling
4. Test on different screen sizes
5. Ensure accessibility compliance

## 📄 **License**

This project is open source and available under the MIT License.
